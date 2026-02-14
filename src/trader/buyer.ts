import { getLogger } from "@logtape/logtape";
import { getOrders, getPriceRange, getState, sendOrder } from "~/api";
import { ProductsAnalytics, type ProductType } from "~/server";

const logger = getLogger(["trader", "buyer"]);

const ProductsAnalyticsList = Object.values(ProductsAnalytics);

const buyIf = async (
  product: ProductType,
  args: {
    Me: any;
    Metrics: any;
    Inventory: any;
  },
) => {
  const { Key, Id, MaxInventory } = product;
  const context = logger.with({ Key });

  // Verify if max inventory is reached, and if so, skip buy
  const productInventoryAmount = args.Inventory[Key] || 0;
  if (productInventoryAmount >= MaxInventory) {
    context.info(`[{Key}] Max inventory reached ${MaxInventory}, skipping buy`);
    return;
  }

  const range = await getPriceRange(Id, {
    withPrecision: 2,
  });
  const orders = await getOrders(Id);

  // Find the best offer to buy, where the price is market
  const sellOrders = orders.filter(
    (order) =>
      order.side === "sell" && order.orderType === "market" && order.qty >= 1,
  );
  if (sellOrders.length === 0) return;

  const buyAmount = sellOrders.reduce((acc, order) => acc + order.qty, 0);
  const expectValue = buyAmount * +range.Min;

  // Verify if we had the money to buy
  if (args.Metrics.cash >= expectValue) {
    context.info(
      [
        "[{Key}] Found ({buyAmount} units) at min. market price (${rangeMin}) with expected value of ${expectValue}, buying all",
      ].join(" "),
      {
        buyAmount: buyAmount.toFixed(1),
        rangeMin: range.Min,
        expectValue: expectValue.toFixed(1),
      },
    );

    // Buy all
    await sendOrder({
      orderType: "limit",
      side: "buy",
      productId: Id,
      qty: Math.floor(buyAmount),
      price: +range.Min,
      regionId: 1,
      npcAllow: true,
    });
  } else {
    // Not enought money, buy the maximum possible amount
    // First validate that the current cash is positive
    const availableCash = args.Metrics.cash < 0 ? 0 : args.Metrics.cash;
    const maxBuyAmount = Math.round(availableCash / +range.Min);
    const expectValue = maxBuyAmount * +range.Min;

    context.info(
      [
        "[{Key}] Not enough money (${availableCash}) to buy all ({buyAmount})",
        "buying a total of {maxBuyAmount} units to ${minValue} per unit,",
        "expected value: ${expectValue}",
      ].join(" "),
      {
        minValue: range.Min,
        availableCash: availableCash.toFixed(1),
        maxBuyAmount: maxBuyAmount.toFixed(1),
        expectValue: expectValue.toFixed(1),
      },
    );

    await sendOrder({
      orderType: "limit",
      side: "buy",
      productId: Id,
      qty: maxBuyAmount,
      price: +range.Min,
      regionId: 1,
      npcAllow: true,
    });
  }
};

const MINIMUM_VALUE_IN_CASH_FOR_BUYER = 10_000;

const buyer = async () => {
  const { Inventory, Me, Metrics } = await getState();
  if (Metrics.cash < MINIMUM_VALUE_IN_CASH_FOR_BUYER) {
    logger.warn(
      `Not enough cash for buy, the current cash is: $${Metrics.cash}`,
    );
    return;
  }

  for (const product of ProductsAnalyticsList) {
    try {
      await buyIf(product, {
        Me,
        Metrics,
        Inventory,
      });
    } catch (error) {
      console.error(`Error buying ${product.Name}: `, error);
    } finally {
      await Bun.sleep(777);
    }
  }
};

export { buyer };
