import { getLogger } from "@logtape/logtape";
import type {
  ExternOrderType,
  GetPriceRangeResponseType,
  GetStateType,
  TransferWarehouseResponseType,
} from "~/d";
import { toTruncate } from "~/utility";
import { CookiesSingleton } from "~/cookies";

const logger = getLogger("trader");

const cookiesSingleton = CookiesSingleton.getInstance();

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
      Cookie: cookiesSingleton.getCookies(),
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36 Edg/144.0.0.0",
    },
  });

  const result = (await stream.json()) as GetPriceRangeResponseType;
  const average = result.product.averagePrice;
  const BAND_PCT = 0.15; // ±15%
  const DELTA = 0.01;

  const withPrecision = args.withPrecision;
  return {
    Avg: toTruncate(average, withPrecision).toString(),
    Min: toTruncate(average * (1 - BAND_PCT) + DELTA, withPrecision).toString(),
    Max: toTruncate(average * (1 + BAND_PCT), withPrecision).toString(),
  };
};

const getOrders = async (productId: number) => {
  const stream = await fetch(
    `https://playtradecraft.com/api/state?orderFilterProductId=${productId}`,
    {
      headers: {
        Cookie: cookiesSingleton.getCookies(),
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36 Edg/144.0.0.0",
      },
    },
  );

  const result = (await stream.json()) as {
    orders: ExternOrderType[];
  };
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
        Cookie: cookiesSingleton.getCookies(),
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36 Edg/144.0.0.0",
      },
    },
  );
  const stream = (await response.json()) as TransferWarehouseResponseType;
  if (response.ok && stream.ok === true) return;
  logger.error("Error transferring item, caused by: {error}", {
    error: stream,
  });
};

const getState = async () => {
  const response = await fetch("https://playtradecraft.com/api/state", {
    headers: {
      "Content-Type": "application/json",
      Cookie: cookiesSingleton.getCookies(),
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36 Edg/144.0.0.0",
    },
  });

  const stream = (await response.json()) as GetStateType;
  const inventory = stream.gs.inventory;
  const me = stream.me;
  const metrics = stream.metrics;

  return {
    Me: me,
    Metrics: metrics,
    Inventory: inventory,
  };
};

type OrderBaseType = {
  side: "buy" | "sell";
  productId: number;
  qty: number;
  regionId: number;
  npcAllow: boolean;
};

type OrderLimitType = OrderBaseType & {
  orderType: "limit";
  price: number;
};

type OrderMarketType = OrderBaseType & {
  orderType: "market";
};

const sendOrder = async (args: OrderLimitType | OrderMarketType) => {
  const response = await fetch("https://playtradecraft.com/api/orders", {
    method: "POST",
    body: JSON.stringify(args),
    headers: {
      "Content-Type": "application/json",
      Cookie: cookiesSingleton.getCookies(),
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36 Edg/144.0.0.0",
    },
  });
  const stream = (await response.json()) as { ok: boolean };
  if (response.ok && stream.ok === true) {
    return;
  }
  logger.error("Failed to place order, caused by:", {
    error: stream,
  });
};

const cancelOrder = async (orderId: string) => {
  const response = await fetch(
    `https://playtradecraft.com/api/orders/${orderId}`,
    {
      method: "DELETE",
      headers: {
        Cookie: cookiesSingleton.getCookies(),
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36 Edg/144.0.0.0",
      },
    },
  );

  if (!response.ok) {
    logger.error(`Failed to cancel order ${orderId}`);
  }
};

const getMineOrders = async () => {
  const stream = await fetch(
    `https://playtradecraft.com/api/state?mineOrdersOnly=1`,
    {
      headers: {
        "Content-Type": "application/json",
        Cookie: cookiesSingleton.getCookies(),
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36 Edg/144.0.0.0",
      },
    },
  );

  const result = (await stream.json()) as {
    orders: ExternOrderType[];
  };
  return result.orders;
};

export {
  getPriceRange,
  getOrders,
  getMineOrders,
  getBalance,
  getBestSellOffer,
  transferWarehouse,
  getState,
  sendOrder,
  cancelOrder,
};
