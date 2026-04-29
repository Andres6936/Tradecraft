import { getMineOrders } from "~/api";

const result = await getMineOrders();
if (result.statusCode === 401) {
  throw new Error("Unauthorized 401");
}

const { orders } = result.body;

for (const order of orders) {
  console.log(
    `${String(order.productName).padEnd(15, " ")} - ${String(order.side).padStart(4, " ")} - ${String(order.qty.toFixed(0)).padStart(6, " ")}`,
  );
}
