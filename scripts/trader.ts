import { getOrders, getPriceRange, getState, sendOrder } from "~/api";
import { ProductsAnalytics, ProductsTrade, type ProductTradeType, type ProductType } from "~/server";


const ProductsTradeList = Object.values(ProductsTrade);
const ProductsAnalyticsList = Object.values(ProductsAnalytics);

const { Inventory, Me, Metrics } = await getState();

const buyIf = async (product: ProductType) => {
  const { Name, Id } = product;
  const range = await getPriceRange(Id, {
    withPrecision: 2
  });
  const orders = await getOrders(Id);

  // Find the best offer to buy, where the price is market
  const sellOrders = orders.filter(
    (order) => order.side === "sell" && order.price === null && order.qty >= 1,
  );
  if (sellOrders.length === 0) return;

  const buyAmount = sellOrders.reduce((acc, order) => acc + order.qty, 0);;
  const expectValue = buyAmount * (+range.Min);
  console.log(`Found (${buyAmount} units) ${Name} at min. market price ($${range.Min}) with expected value of $${expectValue}`)

  // Verify if we had the money to buy
  if (Metrics.cash >= expectValue) {
    console.log(`Buying all ${Name} at min. market price ($${range.Min}) with total of ${buyAmount} units`)

    // Buy all
    await sendOrder({
      orderType: 'limit',
      side: 'buy',
      productId: Id,
      qty: Math.floor(buyAmount),
      price: +range.Min,
      regionId: 1,
      npcAllow: true,
    })
  } else {
    // Not enought money, buy the maximum possible amount
    const maxBuyAmount = Math.floor(Metrics.cash / (+range.Min));
    console.log(`Not enought money, buying ${Name} at min. market price ($${range.Min}) with total of ${maxBuyAmount} units`)

    await sendOrder({
      orderType: 'limit',
      side: 'buy',
      productId: Id,
      qty: maxBuyAmount,
      price: +range.Min,
      regionId: 1,
      npcAllow: true,
    })
  }
}

for (const product of ProductsAnalyticsList) {
  await buyIf(product)

  console.log("----------------")
  await Bun.sleep(777);
}

const sellIf = async (product: ProductTradeType) => {
  const { Key, Id, KeepMinInventory } = product;
  const productInventoryAmount = Inventory[Key];
  if (productInventoryAmount && productInventoryAmount > KeepMinInventory) {
    // Implement logic to sell products to best offer
    console.log(`Inventory of ${productInventoryAmount - KeepMinInventory} ${Key}`);
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
      return
    }

    // Get the amount of buy amount of orders
    const buyAmount = marketOrders.reduce((acc, order) => acc + order.qty, 0);
    // Determine the amount of inventory to sell
    const sellAmount = Math.min(productInventoryAmount - KeepMinInventory, buyAmount);

    console.log(`Found ${marketOrders.length} market orders with a total of ${buyAmount} units to market price`);
    console.log(`Selling ${Math.floor(sellAmount)} units at ${range.Max} price`);

    await sendOrder({
      orderType: 'limit',
      side: 'sell',
      productId: Id,
      qty: Math.floor(sellAmount),
      price: +range.Max,
      regionId: 1,
      npcAllow: true,
    })
  } else {
    console.log(`No inventory of ${Key} to sell, the amount of ${productInventoryAmount} is less than the minimum required ${KeepMinInventory}`);
  }
}

for (const product of ProductsTradeList) {
  await sellIf(product)

  console.log("----------------")
  await Bun.sleep(777);
}
