import { getLogger } from "@logtape/logtape";
import { differenceInMinutes, parseISO } from "date-fns";

import type { ExternOrderType } from "~/types/d";

import { getMineOrders, getState, sendOrder } from "~/api";
import { ProductsSellerList, MAXIMUM_SELL_AMOUNT } from "./setup";

const logger = getLogger("seller");

type ProductSellerType = (typeof ProductsSellerList)[number];

const sellerIf = async (args: {
  product: ProductSellerType;
  orders: ExternOrderType[];
  Inventory: any;
}) => {
  // Filter the list of orders and sort the list from the latest to the oldest
  const currentOrdersOfProduct = args.orders
    .filter(
      (order) =>
        order.productId === args.product.Id &&
        order.productKey === args.product.Key,
    )
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  const amountInInventory = args.Inventory[args.product.Key];

  // Get the first order for the product (with the latest date)
  const [latestOrder] = currentOrdersOfProduct;
  if (!latestOrder) {
    // If not exist order of sell and has inventory, sell
    if (amountInInventory > MAXIMUM_SELL_AMOUNT) {
      // Enough inventory, sell the product
      logger.info(
        "Enough inventory ({amountInInventory}), sell {maximumSellAmount} of product {productKey}",
        {
          productKey: args.product.Key,
          amountInInventory: amountInInventory.toFixed(1),
          maximumSellAmount: MAXIMUM_SELL_AMOUNT,
        },
      );

      await sendOrder({
        orderType: "market",
        side: "sell",
        productId: args.product.Id,
        qty: MAXIMUM_SELL_AMOUNT,
        regionId: 1,
        npcAllow: true,
      });
      await Bun.sleep(777);
    }
  } else {
    // If exist the order, check the difference of minutes from the latest order
    const minutesFromPublish = parseISO(latestOrder.createdAt);
    const diffInMinutes = differenceInMinutes(new Date(), minutesFromPublish);

    // If enough time passed since last order, sell the product
    if (diffInMinutes > args.product.OfferMarket.SeparationIntervalMinutes) {
      if (amountInInventory < MAXIMUM_SELL_AMOUNT) {
        // Not enough inventory, skip
        return;
      }

      logger.info(
        "Enough time passed since last order ({diffInMinutes} min.), sell {maximumSellAmount} of product {productKey}",
        {
          productKey: args.product.Key,
          amountInInventory: amountInInventory.toFixed(1),
          maximumSellAmount: MAXIMUM_SELL_AMOUNT,
          diffInMinutes,
        },
      );

      await sendOrder({
        orderType: "market",
        side: "sell",
        productId: args.product.Id,
        qty: MAXIMUM_SELL_AMOUNT,
        regionId: 1,
        npcAllow: true,
      });
      await Bun.sleep(777);
    }
  }
};

const main = async () => {
  const { Inventory, Me, Metrics } = await getState();
  const orders = await getMineOrders();

  for (const productSeller of ProductsSellerList) {
    try {
      await sellerIf({
        product: productSeller,
        orders,
        Inventory,
      });
    } catch (error) {
      logger.error("Error selling market of {Name}, caused by: {error}", {
        Name: productSeller.Name,
        error,
      });
    }
  }
};

export { main };
