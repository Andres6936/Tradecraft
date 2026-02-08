import { getBalance, getBestSellOffer, getOrders, getPriceRange } from "./src/api";
import { PRODUCTS } from "./src/server";

const products = Object.values(PRODUCTS);
for (const product of products) {
  console.log("-----------");

  const [ranges, orders] = await Promise.all([
    getPriceRange(product.Id),
    getOrders(product.Id),
  ]);

  const balance = getBalance(orders);
  const bestOfferSell = getBestSellOffer(orders);

  const { Avg, Min, Max } = ranges;
  console.log(`${product.Name} (${Avg}) / Min: (${Min}) Max: (${Max}) `);

  const { BuyOrdersCount, SellOrdersCount, BuyAmountCount, SellAmountCount } =
    balance;

  console.log(`Buy (Count): ${BuyOrdersCount}`);
  console.log(`Buy (Amount): ${BuyAmountCount}`);

  if (bestOfferSell.StatusCode === 201) {
    const { PriceMarketCount, Amount } = bestOfferSell;
    console.log(
      `Sell (Count): ${SellOrdersCount} / [Price Market: ${PriceMarketCount} | Amount: ${Amount}]`,
    );
    console.log(`Sell (Amount): ${SellAmountCount}`);
  } else if (bestOfferSell.StatusCode === 205) {
    const { BestSellOffer, Amount } = bestOfferSell;
    console.log(`Sell (Count): ${SellOrdersCount}`);
    console.log(
      `Sell (Amount): ${SellAmountCount} / [Best Price: ${BestSellOffer} | Amount: ${Amount}]`,
    );
  } else {
    console.log(`Sell (Count): ${SellOrdersCount}`);
    console.log(`Sell (Amount): ${SellAmountCount}`);
  }

  await Bun.sleep(777);
}
