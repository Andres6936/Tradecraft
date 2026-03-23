import { getLogger } from "@logtape/logtape";
import type {
  ExternOrderType,
  GetPriceRangeResponseType,
  GetStateType,
  TransferWarehouseResponseType,
} from "~/d";
import { toTruncate } from "~/utility";

const logger = getLogger("trader");

type OptionsFetch = {
  headers: Record<string, string>;
}

const getPriceRange = async (
  args: {
    productId: number,
    withPrecision?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  },
  options: OptionsFetch,
) => {
  const stream = await fetch(`https://playtradecraft.com/api/state/product`, {
    method: "POST",
    body: JSON.stringify({
      productId: args.productId,
    }),
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const result = (await stream.json()) as GetPriceRangeResponseType;
  const average = result.product.averagePrice;
  const BAND_PCT = 0.15; // ±15%
  const DELTA = 0.01;

  const withPrecision = args.withPrecision;
  return {
    Avg: toTruncate(average, withPrecision || 1),
    Min: toTruncate(average * (1 - BAND_PCT) + DELTA, withPrecision || 1),
    Max: toTruncate(average * (1 + BAND_PCT), withPrecision || 1),
    History: result.product.priceHistory,
  };
};

const getOrders = async (productId: number,   options: OptionsFetch,) => {
  const stream = await fetch(
    `https://playtradecraft.com/api/state?orderFilterProductId=${productId}`,
    {
      headers: {
        ...options.headers,
      },
    },
  );

  const result = (await stream.json()) as {
    orders: ExternOrderType[];
  };
  return result.orders;
};

const getBalance = (orders: ExternOrderType[],   ) => {
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
},   options: OptionsFetch,) => {
  const response = await fetch(
    "https://playtradecraft.com/api/transfer-to-main",
    {
      method: "POST",
      body: JSON.stringify(args),
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    },
  );
  const stream = (await response.json()) as TransferWarehouseResponseType;
  if (response.ok && stream.ok === true) return;
  logger.error("Error transferring item, caused by: {error}", {
    error: stream,
  });
};

const getState = async (  options: OptionsFetch,) => {
  const response = await fetch("https://playtradecraft.com/api/state", {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
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

const sendOrder = async (args: OrderLimitType | OrderMarketType,   options: OptionsFetch,) => {
  const response = await fetch("https://playtradecraft.com/api/orders", {
    method: "POST",
    body: JSON.stringify(args),
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
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

const cancelOrder = async (orderId: string,   options: OptionsFetch ,) => {
  const response = await fetch(
    `https://playtradecraft.com/api/orders/${orderId}`,
    {
      method: "DELETE",
      headers: {
        ...options.headers,
      },
    },
  );

  if (!response.ok) {
    logger.error(`Failed to cancel order ${orderId}`);
  }
};

const getMineOrders = async (  options: OptionsFetch,) => {
  const stream = await fetch(
    `https://playtradecraft.com/api/state?mineOrdersOnly=1`,
    {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    },
  );

  const result = (await stream.json()) as {
    orders: ExternOrderType[];
  };
  return result.orders;
};

type LoginType = {
  email: string;
  password: string;
}

const login = async (args: LoginType, options: OptionsFetch) => {
  const response = await fetch(
    `https://playtradecraft.com/auth/login`,
    {
      method: "POST",
      body: JSON.stringify(args),
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    },
  );
  const stream = (await response.json()) as { ok: boolean };
  if (response.ok && stream.ok === true) {
    const cookies = response.headers.getSetCookie();
    // Parse all cookies into an object
    const cookiesObject: Record<string, string> = {};
    for (const cookie of cookies) {
      const [nameValue] = cookie.split(';');
      if (!nameValue) continue;
      const [name, value] = nameValue.split('=');
      if (!name || !value) continue;
      cookiesObject[name.trim()] = value;
    }

    return {
      statusCode: 200,
      body: { message: "Login successful", token: cookiesObject.token }
    } as const;
  }

  logger.error("Failed to login, caused by:", {
    error: stream,
  });
  return {
    statusCode: 501,
    body: { message: "Server error" }
  } as const;
};

export {
  getPriceRange,
  getOrders,
  getMineOrders,
  getBalance,
  getBestSellOffer,
  getState,
  sendOrder,
  cancelOrder,
  transferWarehouse,
  login,
};
