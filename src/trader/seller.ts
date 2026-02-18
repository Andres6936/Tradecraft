import { getLogger } from "@logtape/logtape";
import { getOrders, getPriceRange, getState, sendOrder } from "~/api";
import { ProductsTrade, type ProductTradeType } from "~/server";

const logger = getLogger(["trader", "seller"]);

const ProductsTradeList = Object.values(ProductsTrade);

const sellIf = async (
  product: ProductTradeType,
  args: {
    Me: any;
    Metrics: any;
    Inventory: any;
  },
) => {
  const { Key, Id, KeepMinInventory } = product;
  const context = logger.with({ Key });

  const productInventoryAmount = args.Inventory[Key];
  if (productInventoryAmount && productInventoryAmount > KeepMinInventory) {
    // Implement logic to sell products to best offer
    const orders = await getOrders(Id);

    // Find all order where the price is of market
    const marketOrders = orders.filter(
      (order) =>
        order.side === "buy" && order.orderType === "market" && order.qty >= 1,
    );
    if (marketOrders.length === 0) {
      return;
    }

    // Get the amount of buy amount of orders
    const buyAmount = marketOrders.reduce((acc, order) => acc + order.qty, 0);
    // Determine the amount of inventory to sell
    const sellAmount = Math.floor(
      Math.min(productInventoryAmount - KeepMinInventory, buyAmount),
    );
    if (sellAmount < 1) {
      context.info(
        [
          "[{Key}] Not enough inventory to sell, the amount of {productInventoryAmount}",
          "is less than the minimum required {KeepMinInventory}",
        ].join(" "),
        {
          productInventoryAmount: productInventoryAmount.toFixed(1),
          KeepMinInventory,
        },
      );
      return;
    }

    const range = await getPriceRange(Id, {
      withPrecision: 2,
    });

    const expectedProfit = Math.floor(sellAmount * +range.Max);
    context.info(
      [
        "[{Key}] Found {marketOrdersAmount} market orders with a total of {buyAmount}",
        "units to max. price ${rangeMax}, selling {sellAmount} units, expected profit ${expectedProfit}",
      ].join(" "),
      {
        marketOrdersAmount: marketOrders.length,
        buyAmount: buyAmount.toFixed(1),
        rangeMax: range.Max,
        sellAmount: sellAmount.toFixed(1),
        expectedProfit: expectedProfit.toFixed(1),
      },
    );

    await sendOrder({
      orderType: "limit",
      side: "sell",
      productId: Id,
      qty: sellAmount,
      price: +range.Max,
      regionId: 1,
      npcAllow: false,
    });
  }
};

const seller = async () => {
  const { Inventory, Me, Metrics } = await getState();
  for (const product of ProductsTradeList) {
    try {
      await sellIf(product, {
        Me,
        Metrics,
        Inventory,
      });
    } catch (error) {
      console.error(`Error selling ${product.Key}: `, error);
    } finally {
      await Bun.sleep(777);
    }
  }
};

export { seller };
