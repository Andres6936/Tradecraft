// Order Types

type ExternOrderBaseType = {
  _id: string;
  ownerUserId: string;
  productId: number;
  productKey: string;
  productName: string;
  unit: string;
  qty: number;
  side: "buy" | "sell";
  regionId: number;
  regionName: string;
  createdAt: string;
  isNPC: boolean;
  npcAllow: boolean;
};

type ExternOrderLimitType = ExternOrderBaseType & {
  orderType: "limit";
  price: number;
};

type ExternOrderMarketType = ExternOrderBaseType & {
  orderType: "market";
};

type ExternOrderType = ExternOrderLimitType | ExternOrderMarketType;

// Product Types

type GetPriceRangeResponseType = {
  ok: boolean;
  product: ExternProductStateType;
};

type ExternProductStateType = {
  id: number;
  key: string;
  name: string;
  unit: string;
  basePrice: number;
  averagePrice: number;
  priceHistory: ExternPriceHistoryType[];
  currentPrice: any;
};

type ExternPriceHistoryType = {
  t: number;
  p: number;
};

export type { ExternOrderType, GetPriceRangeResponseType };
