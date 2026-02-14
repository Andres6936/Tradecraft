import { getMineOrders } from "~/api";

const orders = await getMineOrders();

for (const order of orders) {
  console.log(
    `${String(order.productName).padEnd(15, " ")} - ${String(order.side).padStart(4, " ")} - ${String(order.qty.toFixed(0)).padStart(6, " ")}`,
  );
}
