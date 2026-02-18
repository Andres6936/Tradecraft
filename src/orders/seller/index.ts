import type { ExternOrderType } from "~/types/d";
import { getLogger } from "@logtape/logtape";
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

  // Get the first order for the product (with the latest date)
  const [latestOrder] = currentOrdersOfProduct;
  if (!latestOrder) {
    // If not exist order of sell and has inventory, sell
    const amountInInventory = args.Inventory[args.product.Key];

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
    }
  } else {
  }
};

const main = async () => {
  const { Inventory, Me, Metrics } = await getState();
  const orders = await getMineOrders();

  for (const productSeller of ProductsSellerList) {
    await sellerIf({
      product: productSeller,
      orders,
      Inventory,
    });
  }
};

export { main };
