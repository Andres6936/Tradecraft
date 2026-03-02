import { getLogger } from "@logtape/logtape";
import { differenceInMinutes, parseISO } from "date-fns";
import {
  cancelOrder,
  getMineOrders,
  getPriceRange,
  getState,
  sendOrder,
} from "~/api";
import { ProductsSupplyBuyerList } from "./setup";
import type { ExternOrderType } from "~/types/d";

const logger = getLogger(["buyer"]);

type ProductSupplyBuyer = (typeof ProductsSupplyBuyerList)[number];

const buyIf = async (args: {
  product: ProductSupplyBuyer;
  orders: ExternOrderType[];
  Inventory: any;
  Metrics: any;
}) => {
  const [isEnough] = isEnoughInventory(args);
  if (isEnough) {
    // If the amount in inventory is greater than the keep inventory amount, do nothing
    // the product is enough supply
    return;
  }

  // First sort the orders from the latest to the oldest,
  // then search if exist a vigent order of product
  const existOrder = args.orders
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .find(
      (order) => order.productId === args.product.Id && order.side === "buy",
    );

  if (existOrder) {
    // If exist the order, check the difference of minutes from the latest order
    const minutesFromPublish = parseISO(existOrder.createdAt);
    const diffInMinutes = differenceInMinutes(new Date(), minutesFromPublish);

    if (diffInMinutes > 60) {
      // Cancel the order and put an new order with updated prices
      await cancelOrder(existOrder._id);
      await Bun.sleep(777);
      // Send new order of buy with update values
      await sendBuyOrder(args);

      // Continue to next product
      return;
    }

    // The order is vigent, so wait other cycle
    return;
  }

  await sendBuyOrder(args);
};

const isEnoughInventory = (args: {
  product: ProductSupplyBuyer;
  Inventory: any;
}): [boolean, number] => {
  const amountInInventory = args.Inventory[args.product.Key] || 0;
  return [
    amountInInventory >= args.product.Supply.StopWhenInventoryReach,
    amountInInventory,
  ];
};

const sendBuyOrder = async (args: {
  product: ProductSupplyBuyer;
  orders: ExternOrderType[];
  Inventory: any;
  Metrics: any;
}) => {
  const [_, amountInInventory] = isEnoughInventory(args);

  // If the product not is enough, get the amount to buy to reach the minimum in inventory
  const amountToBuy = Math.floor(
    args.product.Supply.StopWhenInventoryReach - amountInInventory,
  );
  if (amountToBuy < 1) {
    // Avoid saturating the inventory
    return;
  }

  // Get the minimum price of product
  const { Min } = await getPriceRange({
    productId: args.product.Id,
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
  const orders = await getMineOrders();
  for (const productSupply of ProductsSupplyBuyerList) {
    try {
      await buyIf({
        product: productSupply,
        orders,
        Inventory,
        Metrics,
      });
    } catch (error) {
      logger.error("Error buying supply product {Name}, casued by: {error}", {
        Name: productSupply.Name,
        error,
      });
    }
  }
};

export { main };
