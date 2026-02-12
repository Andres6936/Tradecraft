import { getOrders, getPriceRange } from "~/api";

const Cookies = process.env.COOKIES || "";

const ProductsTrade = {
  Microchip: {
    Key: "microchip",
    Id: 69,
    KeepMinInventory: 1000,
  },
};

const ProductsTradeList = Object.values(ProductsTrade);

const sellProduct = async (args: {
  orderType: "limit" | "market";
  side: "buy" | "sell";
  productId: number;
  qty: number;
  price: number;
  regionId: number;
  npcAllow: boolean;
}) => {
  const response = await fetch("https://playtradecraft.com/api/orders", {
    method: "POST",
    body: JSON.stringify(args),
    headers: {
      "Content-Type": "application/json",
      Cookie: Cookies,
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36 Edg/144.0.0.0",
    },
  });
  const stream = await response.json();
  if (response.ok && stream.ok === true) {
    return;
  }
  console.error("Failed to place order:", stream);
};

const response = await fetch("https://playtradecraft.com/api/state", {
  headers: {
    "Content-Type": "application/json",
    Cookie: Cookies,
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36 Edg/144.0.0.0",
  },
});

const stream = await response.json();
const inventory = stream.gs.inventory;
const me = stream.me;
const metrics = stream.metrics;

for (const product of ProductsTradeList) {
  const { Key, Id, KeepMinInventory } = product;
  const productInventoryAmount = inventory[Key];
  if (productInventoryAmount && productInventoryAmount > KeepMinInventory) {
    // Implement logic to sell products to best offer
    console.log(`Inventory of ${productInventoryAmount - KeepMinInventory} ${Key}s`);
    const range = await getPriceRange(Id, {
      withPrecision: 2
    });
    const orders = await getOrders(Id);

    // Find all order where the price is of market
    const marketOrders = orders.filter(
      (order) => order.side === "buy" && order.price === null && order.qty >= 1,
    );
    if (marketOrders.length === 0) {
      console.log(`No market orders found for ${Key}`);
      continue;
    }

    // Get the amount of buy amount of orders
    const buyAmount = marketOrders.reduce((acc, order) => acc + order.qty, 0);

    console.log(`Found ${marketOrders.length} market orders with a total of ${buyAmount} units to market price`);
    console.log(`Selling ${buyAmount} units at ${range.Max} price`);

    await sellProduct({
      orderType: 'limit',
      side: 'sell',
      productId: Id,
      qty: Math.floor(buyAmount),
      price: +range.Max,
      regionId: 1,
      npcAllow: true,
    })
  }
}
