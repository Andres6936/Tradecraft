const PRODUCTS = {
  Butter: {
    Id: 25,
    Name: "Butter",
  },
  Computer: {
    Id: 93,
    Name: "Computer",
  },
  Furniture: {
    Id: 49,
    Name: "Furniture",
  },
  Shoes: {
    Id: 111,
    Name: "Shoes",
  },
  Smartphone: {
    Id: 94,
    Name: "Smartphone",
  },
  Sneakers: {
    Id: 113,
    Name: "Sneakers",
  },
} as const;

const Cookies =
  "_ga=GA1.1.441914417.1766004593; lang=en; token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2OTQzMTdiZGExMzY3MzRmM2MxNGQ4ZWEiLCJlbWFpbCI6ImFkYW5AZ3JyLmxhIiwibGFuZ3VhZ2UiOiJlbiIsImlhdCI6MTc3MDAzODQyNSwiZXhwIjoxNzcwNjQzMjI1fQ.J4ccesIHvin_X8Jb0jaPLGzbVyO3WezmkQNXORM5kx4; _ga_G00BHW6280=GS2.1.s1770563675$o102$g0$t1770563675$j60$l0$h0";

const getRangePrices = async (productId: number) => {
  const stream = await fetch(`https://playtradecraft.com/api/state/product`, {
    method: "POST",
    body: JSON.stringify({
      productId,
    }),
    headers: {
      "Content-Type": "application/json",
      Cookie: Cookies,
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36 Edg/144.0.0.0",
    },
  });

  const result = await stream.json();
  const average = result.product.averagePrice;
  const BAND_PCT = 0.15; // ±15%

  return {
    Avg: average.toFixed(1),
    Min: (average * (1 - BAND_PCT)).toFixed(1),
    Max: (average * (1 + BAND_PCT)).toFixed(1),
  };
};

const getOrders = async (productId: number) => {
  const stream = await fetch(
    `https://playtradecraft.com/api/state?orderFilterProductId=${productId}`,
    {
      headers: {
        Cookie: Cookies,
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36 Edg/144.0.0.0",
      },
    },
  );

  const result = await stream.json();
  return result.orders;
};

const getBalance = (orders: any[]) => {
  const buyOrders = orders.filter((it) => it.side === "buy");
  const sellOrders = orders.filter((it) => it.side === "sell");

  const BuyOrdersCount = buyOrders.length;
  const SellOrdersCount = sellOrders.length;

  const BuyAmountCount = buyOrders.reduce((acc, order) => acc + order.qty, 0);
  const SellAmountCount = sellOrders.reduce((acc, order) => acc + order.qty, 0);

  return {
    BuyOrdersCount,
    SellOrdersCount,
    BuyAmountCount,
    SellAmountCount,
  };
};

const getBestSellOffer = (orders: any[]) => {
  const sellOrders = orders.filter((it) => it.side === "sell");
  if (sellOrders.length === 0) {
    return {
      StatusCode: 404,
      Message: "No sell orders found",
    } as const;
  }

  const priceMarketCount = sellOrders.filter((it) => !it.price);

  if (priceMarketCount.length > 0) {
    return {
      StatusCode: 201,
      PriceMarketCount: priceMarketCount.length,
      Amount: priceMarketCount.reduce(
        (acc, order) => acc + order.qty,
        0,
      ),
    } as const;
  }

  const bestSellOffer = sellOrders.sort((a, b) => a.price - b.price).at(0);
  return {
    StatusCode: 205,
    BestSellOffer: bestSellOffer.price,
    Amount: bestSellOffer.qty,
  } as const;
};

const products = Object.values(PRODUCTS);
for (const product of products) {
  console.log("-----------");

  const [ranges, orders] = await Promise.all([
    getRangePrices(product.Id),
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
