import { getLogger } from "@logtape/logtape";
import { parseISO, differenceInMinutes } from "date-fns";

import { cancelOrder, getMineOrders } from "~/api";
import {
  MAXIMUM_AGE_IN_MINUTES,
  ProductsCancelOrphansOrderListKey,
} from "./setup";

const logger = getLogger("trader");

const deleteOrphansOrders = async (orders: any[]) => {
  for (const order of orders) {
    const minutesFromPublish = parseISO(order.createdAt);
    const differenceInMin = differenceInMinutes(new Date(), minutesFromPublish);
    if (differenceInMin > MAXIMUM_AGE_IN_MINUTES) {
      logger.info(
        `Cancel order of ${order.productName} with ${order.qty} units, type ${order.orderType}, older than ${MAXIMUM_AGE_IN_MINUTES} minutes`,
      );
      // Cancel the order for avoid the orphan order
      await cancelOrder(order._id);
      await Bun.sleep(777);
    }
  }
};

const main = async () => {
  const orders = (await getMineOrders())
    // Filter the orders where the product is important product
    .filter((order) =>
      ProductsCancelOrphansOrderListKey.includes(order.productKey),
    );

  const buyOrders = orders.filter((order) => order.side === "buy");

  const sellOrders = orders.filter((order) => order.side === "sell");

  await deleteOrphansOrders(buyOrders);
  await deleteOrphansOrders(sellOrders);
};

export { main };
