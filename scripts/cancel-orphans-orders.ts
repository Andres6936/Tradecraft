import { parseISO, differenceInMinutes } from "date-fns";
import { ProductsAnalytics } from "~/server";

const Cookies = process.env.COOKIES || "";

const ProductsAnalyticsList = Object.values(ProductsAnalytics);
const ProductsAnalyticsListKey = ProductsAnalyticsList.map((it) => it.Key);

const cancelOrder = async (orderId: string) => {
  const response = await fetch(`https://playtradecraft.com/api/orders/${orderId}`, {
    method: "DELETE",
    headers: {
      Cookie: Cookies,
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36 Edg/144.0.0.0",
    },
  });

  if (!response.ok) {
    console.error(`Failed to cancel order ${orderId}`);
  }
};

const stream = await fetch(
  `https://playtradecraft.com/api/state?mineOrdersOnly=1`,
  {
    headers: {
      "Content-Type": "application/json",
      Cookie: Cookies,
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36 Edg/144.0.0.0",
    },
  },
);

const result = await stream.json();
const orders = result.orders
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
