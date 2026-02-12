import { getOrders, getPriceRange, getState, sendOrder } from "~/api";

const ProductsTrade = {
  Microchip: {
    Key: "microchip",
    Id: 69,
    KeepMinInventory: 1000,
  },
};

const ProductsTradeList = Object.values(ProductsTrade);


const { Inventory, Me, Metrics } = await getState();

for (const product of ProductsTradeList) {
  const { Key, Id, KeepMinInventory } = product;
  const productInventoryAmount = Inventory[Key];
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

    await sendOrder({
      orderType: 'limit',
      side: 'sell',
      productId: Id,
      qty: Math.floor(buyAmount),
      price: +range.Max,
      regionId: 1,
      npcAllow: true,
    })
  } else {
    console.log(`No inventory of ${Key} to sell, the amount of ${productInventoryAmount} is less than the minimum required ${KeepMinInventory}`);
  }
}
