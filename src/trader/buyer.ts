import { getOrders, getPriceRange, getState, sendOrder } from "~/api";
import { ProductsAnalytics, type ProductType } from "~/server";


const ProductsAnalyticsList = Object.values(ProductsAnalytics);

const buyIf = async (product: ProductType, args: {
  Me: any,
  Metrics: any,
  Inventory: any,
}) => {
  const { Name, Key, Id, MaxInventory } = product;

  // Verify if max inventory is reached, and if so, skip buy
  const productInventoryAmount = args.Inventory[Key] || 0;
  if (productInventoryAmount >= MaxInventory) {
    console.log(`Max inventory reached for ${Name}, skipping buy`);
    return
  };

  const range = await getPriceRange(Id, {
    withPrecision: 2
  });
  const orders = await getOrders(Id);

  // Find the best offer to buy, where the price is market
  const sellOrders = orders.filter(
    (order) => order.side === "sell" && order.orderType === "market" && order.qty >= 1,
  );
  if (sellOrders.length === 0) return;

  const buyAmount = sellOrders.reduce((acc, order) => acc + order.qty, 0);;
  const expectValue = buyAmount * (+range.Min);
  console.log(`Found (${buyAmount} units) ${Name} at min. market price ($${range.Min}) with expected value of $${expectValue}`)

  // Verify if we had the money to buy
  if (args.Metrics.cash >= expectValue) {
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
    const maxBuyAmount = Math.round(args.Metrics.cash / (+range.Min));
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

const buyer = async () => {
  const { Inventory, Me, Metrics } = await getState();
  for (const product of ProductsAnalyticsList) {
    try {
      await buyIf(product, {
        Me,
        Metrics,
        Inventory,
      })
    } catch (error) {
      console.error(`Error buying ${product.Name}: `, error);
    } finally {
      console.log("----------------")
      await Bun.sleep(777);
    }
  }
}

export { buyer };
