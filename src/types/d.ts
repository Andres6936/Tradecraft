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

export type {ExternOrderType}
