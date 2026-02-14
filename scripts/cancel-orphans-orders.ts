import { parseISO, differenceInMinutes } from "date-fns";
import { cancelOrder, getMineOrders } from "~/api";
import { ProductsAnalytics } from "~/server";

const ProductsAnalyticsList = Object.values(ProductsAnalytics);
const ProductsAnalyticsListKey = ProductsAnalyticsList.map((it) => it.Key);

const orders = await getMineOrders()
  // Filter the orders where the product is important product
  .filter((order) => ProductsAnalyticsListKey.includes(order.productKey));

const buyOrders = orders
  .filter((order) => order.side === "buy");

const sellOrders = orders
  .filter((order) => order.side === "sell");

const MAXIMUM_AGE_IN_MINUTES = 5;

const deleteOrphansOrders = async (orders: any[]) => {
  for (const order of orders) {
    const minutesFromPublish = parseISO(order.createdAt);
    const differenceInMin = differenceInMinutes(new Date(), minutesFromPublish);
    if (differenceInMin > MAXIMUM_AGE_IN_MINUTES) {
      // Cancel the order for avoid the orphan order
      await cancelOrder(order._id);
    }
  }
}

await deleteOrphansOrders(buyOrders);
await deleteOrphansOrders(sellOrders);
