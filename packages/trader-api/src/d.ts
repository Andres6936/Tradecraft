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

// Deposit Types

type TransferWarehouseResponseType = {
  ok: boolean;
  transferred: number;
  productKey: string;
  remainingInTile: number;
  volumeFactor: number;
  usedSpace: number;
  freeSpaceAfter: number;
};

// State Types

type GetStateType = {
  metrics: Metrics;
  gs: Gs;
  me: Me;
  tiles: TilesType[];
};

type Metrics = {
  netWorth: number;
  cash: number;
  invValue: number;
};

type Me = {
  userId: string;
  nick: string;
  status: string;
  showNudge: boolean;
  animationEnabled: boolean;
  soundEnabled: boolean;
  musicEnabled: boolean;
  ambientSoundsEnabled: boolean;
  showNotification: boolean;
  language: string;
  avatar: string;
};

type Gs = {
  _id: string;
  isGlobal: boolean;
  userId: string;
  cash: number;
  selectedRegion: number;
  selectedProductId: number;
  tick: number;
  tickAnchorAt: any;
  loanTotalBorrowed: number;
  loanTotalRepaid: number;
  loanInterestAccrued: number;
  loanDailyInterestAccrued: number;
  carbonTotal: number;
  carbonToday: number;
  carbonDay: string;
  totalVolumeUsed: number;
  totalStorageCapacity: number;
  govTradeBuyToday: number;
  govTradeSellToday: number;
  govTradeDay: string;
  xp: number;
  netWorth: number;
  lastDailyClaimDate: string;
  lastStorageFeeAt: any;
  createdAt: string;
  updatedAt: string;
  __v: number;
  inventory: Record<string, number>;
  storageInventory: Record<string, number>;
  loanInterestDay: string;
  depositTotalDeposited: number;
  depositTotalInterestPaid: number;
  depositTotalWithdrawn: number;
};

type TilesType = DepositTile | FactoryTile;

type BaseTile = {
  _id: string
  id: number
  x: number
  y: number
  regionId: number
  ownerUserId: string
  alert: boolean
  busy: boolean
  createdAt: string
  retailRevenueToday: number;
  retailRevenueTotal: number;
  retailUnitsSoldToday: number;
  retailUnitsSoldTotal: number;
  localStorage: LocalStorage
}

type FactoryTile = BaseTile & {
  disabledSaleProducts: any[]
  kind: "factory"
  perfPct: number
  prodPartial: number
  prodTotal: number
  productKey: string
  updatedAt: string
  disabledConsumptionInputs: any[]
  employees: Employee[]
  isRented: boolean
  maxEmployeeCapacity: number
  level: number
  upgrading: boolean
  upgradeEndsAt: any
  upgradeStartedAt: any
  upgradeTargetLevel: any
  hasActiveListing: boolean
  beneficiaryUserId: any
  currentRentalId: any
}

type DepositTile = BaseTile & {
  beneficiaryUserId: any;
  currentRentalId: any;
  disabledConsumptionInputs: any[];
  disabledSaleProducts: any[];
  isRented: boolean;
  kind: "depot";
  level: number;
  maxEmployeeCapacity: number;
  perfPct: number;
  prodPartial: number;
  prodTotal: number;
  productKey: string;
  updatedAt: string;
  upgradeEndsAt: any;
  upgradeStartedAt: any;
  upgradeTargetLevel: any;
  upgrading: boolean;
  hasActiveListing: boolean;
};

type Employee = {
  instanceId: string
  hiredAt: string
  _id: string
}

type LocalStorage = {
  productKey: string;
  storedQty: number;
  capacity: number;
};

// Daily P/L Types

type GetProductDailyPLTypes = {
  ok: boolean;
  records: RecordDailyType[];
};

type RecordDailyType = {
  productKey: string;
  productName: string;
  iconUrl: string;
  unit: string;
  buyQty: number;
  sellQty: number;
  buyAmount: number;
  sellAmount: number;
  citySellQty: number;
  citySellAmount: number;
  profit: number;
  profitMargin: number;
};

// Errors

type ExternalUnauthorizedError = {
  error: "unauthorized"
};

export type {
  ExternOrderType,
  GetPriceRangeResponseType,
  TransferWarehouseResponseType,
  GetStateType,
  GetProductDailyPLTypes,
  ExternalUnauthorizedError,
  TilesType,
};
