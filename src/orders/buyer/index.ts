import { getLogger } from "@logtape/logtape";
import { getPriceRange, getState, sendOrder } from "~/api";
import { ProductsSupplyBuyerList } from "./setup";

const logger = getLogger(["buyer"]);

type ProductSupplyBuyer = (typeof ProductsSupplyBuyerList)[number];

const buyIf = async (args: {
  product: ProductSupplyBuyer;
  Inventory: any;
  Metrics: any;
}) => {
  const amountInInventory = args.Inventory[args.product.Key] || 0;
  if (amountInInventory > args.product.Supply.StopWhenInventoryReach) {
    // If the amount in inventory is greater than the keep inventory amount, do nothing
    // the product is enough supply
    return;
  }

  // If the product not is enough, get the amount to buy to reach the minimum in inventory
  const amountToBuy = Math.floor(
    args.product.Supply.StopWhenInventoryReach - amountInInventory,
  );
  if (amountToBuy < 1) {
    // Avoid saturating the inventory
    return;
  }

  // Get the minimum price of product
  const { Min } = await getPriceRange(args.product.Id, {
    withPrecision: 2,
  });

  const expectValue = Math.floor(amountToBuy * +Min);
  if (expectValue >= args.Metrics.cash) {
    logger.warn(
      "Not enough cash (${cash}) to buy {amountToBuy} units of {productKey}",
      {
        cash: args.Metrics.cash,
        amountToBuy: amountToBuy.toFixed(1),
        productKey: args.product.Key,
      },
    );
    return;
  }

  logger.info(
    [
      "Buying {amountToBuy} of {productKey} to ${minPrice} to reach",
      "{keepInventory} units in inventory, expect value: ${expectValue}",
    ].join(" "),
    {
      amountToBuy: amountToBuy.toFixed(1),
      productKey: args.product.Key,
      minPrice: Min,
      keepInventory: args.product.Supply.StopWhenInventoryReach,
      expectValue,
    },
  );

  await sendOrder({
    orderType: "limit",
    price: +Min,
    side: "buy",
    productId: args.product.Id,
    qty: amountToBuy,
    regionId: 1,
    npcAllow: false,
  });
  await Bun.sleep(777);
};

const main = async () => {
  const { Inventory, Metrics } = await getState();
  for (const productSupply of ProductsSupplyBuyerList) {
    await buyIf({
      product: productSupply,
      Inventory,
      Metrics,
    });
  }
};

export { main };
