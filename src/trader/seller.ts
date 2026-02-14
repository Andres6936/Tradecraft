import { getLogger } from "@logtape/logtape";
import { getOrders, getPriceRange, getState, sendOrder } from "~/api";
import { ProductsTrade, type ProductTradeType } from "~/server";

const logger = getLogger(['trader', 'seller']);

const ProductsTradeList = Object.values(ProductsTrade);

const sellIf = async (product: ProductTradeType, args: {
  Me: any,
  Metrics: any,
  Inventory: any,
}) => {
  const { Key, Id, KeepMinInventory } = product;
  const productInventoryAmount = args.Inventory[Key];
  if (productInventoryAmount && productInventoryAmount > KeepMinInventory) {
    // Implement logic to sell products to best offer
    logger.info(`Inventory of ${productInventoryAmount} with minimum ${KeepMinInventory} units of ${Key}`);
    const range = await getPriceRange(Id, {
      withPrecision: 2
    });
    const orders = await getOrders(Id);

    // Find all order where the price is of market
    const marketOrders = orders.filter(
      (order) => order.side === "buy" && order.price === null && order.qty >= 1,
    );
    if (marketOrders.length === 0) {
      logger.info(`No market orders found for ${Key}`);
      return
    }

    // Get the amount of buy amount of orders
    const buyAmount = marketOrders.reduce((acc, order) => acc + order.qty, 0);
    // Determine the amount of inventory to sell
    const sellAmount = Math.floor(Math.min(productInventoryAmount - KeepMinInventory, buyAmount));
    if (sellAmount < 1) {
      logger.info(`Not enough inventory to sell ${Key}`);
      return;
    }

    logger.info(`Found ${marketOrders.length} market orders with a total of ${buyAmount} units to max. price ${range.Max}`);
    logger.info(`Selling ${sellAmount} units at ${range.Max} price, expected profit ${Math.floor(sellAmount * (+range.Max))}`);

    await sendOrder({
      orderType: 'limit',
      side: 'sell',
      productId: Id,
      qty: sellAmount,
      price: +range.Max,
      regionId: 1,
      npcAllow: true,
    })
  } else {
    logger.info(`No inventory of ${Key} to sell, the amount of ${productInventoryAmount} is less than the minimum required ${KeepMinInventory}`);
  }
}

const seller = async () => {
  const { Inventory, Me, Metrics } = await getState();
  for (const product of ProductsTradeList) {
    try {
      await sellIf(product, {
        Me,
        Metrics,
        Inventory,
      })
    } catch (error) {
      console.error(`Error selling ${product.Key}: `, error);
    } finally {
      await Bun.sleep(777);
    }
  }
}

export { seller };
