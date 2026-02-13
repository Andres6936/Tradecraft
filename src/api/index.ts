import { toTruncate } from "~/utility";

const Cookies = process.env.COOKIES || "";

const getPriceRange = async (
  productId: number,
  args: {
    withPrecision: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  } = { withPrecision: 1 },
) => {
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
  const DELTA = 0.01;

  const withPrecision = args.withPrecision;
  return {
    Avg: toTruncate(average, withPrecision).toString(),
    Min: toTruncate((average * (1 - BAND_PCT) + DELTA), withPrecision).toString(),
    Max: toTruncate(average * (1 + BAND_PCT), withPrecision).toString(),
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
      Amount: priceMarketCount.reduce((acc, order) => acc + order.qty, 0),
    } as const;
  }

  const bestSellOffer = sellOrders.sort((a, b) => a.price - b.price).at(0);
  return {
    StatusCode: 205,
    BestSellOffer: bestSellOffer.price,
    Amount: bestSellOffer.qty,
  } as const;
};

const transferWarehouse = async (args: {
  regionId: number;
  x: number;
  y: number;
  id: number;
  amount: number;
}) => {
  const response = await fetch(
    "https://playtradecraft.com/api/transfer-to-main",
    {
      method: "POST",
      body: JSON.stringify(args),
      headers: {
        "Content-Type": "application/json",
        Cookie: Cookies,
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36 Edg/144.0.0.0",
      },
    },
  );
  const stream = await response.json();
  if (response.ok && stream.ok === true) return;
  console.error("Error transferring item", stream);
};

const getState = async () => {
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

  return {
    Me: me,
    Metrics: metrics,
    Inventory: inventory,
  }
}

const sendOrder = async (args: {
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

export {
  getPriceRange,
  getOrders,
  getBalance,
  getBestSellOffer,
  transferWarehouse,
  getState,
  sendOrder,
};
