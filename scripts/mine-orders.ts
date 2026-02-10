const Cookies = process.env.COOKIES || "";

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
const orders = result.orders;

for (const order of orders) {
  console.log(
    `${String(order.productName).padEnd(15, " ")} - ${String(order.side).padStart(4, " ")} - ${String(order.qty.toFixed(0)).padStart(6, " ")}`,
  );
}
