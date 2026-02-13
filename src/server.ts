const Priority = {
  High: 1,
  Medium: 500,
  Low: 1000,
} as const;

type ProductType = {
  Id: number;
  Name: string;
  Order: number;
  Priority: (typeof Priority)[keyof typeof Priority];
  MaxInventory: number;
};

const ProductsAnalytics = {
  Computer: {
    Id: 93,
    Name: "Computer",
    Order: 899,
    Priority: Priority.High,
    MaxInventory: Infinity,
  },
  Smartphone: {
    Id: 94,
    Name: "Smartphone",
    Order: 540,
    Priority: Priority.High,
    MaxInventory: Infinity,
  },
  Lumber: {
    Id: 48,
    Name: "Lumber",
    Order: 320,
    Priority: Priority.Medium,
    MaxInventory: Infinity,
  },
  Circuit: {
    Id: 92,
    Name: "Circuit",
    Order: 232,
    Priority: Priority.Medium,
    MaxInventory: Infinity,
  },
  Furniture: {
    Id: 49,
    Name: "Furniture",
    Order: 227,
    Priority: Priority.High,
    MaxInventory: Infinity,
  },
  Log: {
    Id: 47,
    Name: "Log",
    Order: 152,
    Priority: Priority.Medium,
    MaxInventory: 100_000,
  },
  Beeswax: {
    Id: 55,
    Name: "Beeswax",
    Order: 111,
    Priority: Priority.Medium,
    MaxInventory: 100_000,
  },
  Shoes: {
    Id: 111,
    Name: "Shoes",
    Order: 105,
    Priority: Priority.Medium,
    MaxInventory: 100_000,
  },
  Microchip: {
    Id: 69,
    Name: "Microchip",
    Order: 40,
    Priority: Priority.Low,
    MaxInventory: 10_000,
  },
  Butter: {
    Id: 25,
    Name: "Butter",
    Order: 36,
    Priority: Priority.Low,
    MaxInventory: Infinity,
  },
} as const satisfies Record<string, ProductType>;

const FactoryInspectTransfer = {
  Bread: {
    Key: "bread",
    Kind: "factory",
    // Value in percentage of max tolerance of storage
    Tolerance: 25,
    // Value in percentage of offset used for transfer
    Offset: 5,
  },
  Flour: {
    Key: "flour",
    Kind: "factory",
    // Value in percentage of max tolerance of storage
    Tolerance: 25,
    // Value in percentage of offset used for transfer
    Offset: 5,
  },
  Orange: {
    Key: "orange",
    Kind: "farm",
    // Value in percentage of max tolerance of storage
    Tolerance: 25,
    // Value in percentage of offset used for transfer
    Offset: 5,
  },
  Cherry: {
    Key: "cherry",
    Kind: "farm",
    // Value in percentage of max tolerance of storage
    Tolerance: 25,
    // Value in percentage of offset used for transfer
    Offset: 5,
  },
  Sheep: {
    Key: "sheep",
    Kind: "farm",
    // Value in percentage of max tolerance of storage
    Tolerance: 99,
    // Value in percentage of offset used for transfer
    Offset: 0.5,
  },
  Yarn: {
    Key: "cotton_yarn",
    Kind: "factory",
    // Value in percentage of max tolerance of storage
    Tolerance: 25,
    // Value in percentage of offset used for transfer
    Offset: 5,
  },
  Fabric: {
    Key: "cotton_fabric",
    Kind: "factory",
    // Value in percentage of max tolerance of storage
    Tolerance: 25,
    // Value in percentage of offset used for transfer
    Offset: 5,
  },
  Pants: {
    Key: "pants",
    Kind: "factory",
    // Value in percentage of max tolerance of storage
    Tolerance: 25,
    // Value in percentage of offset used for transfer
    Offset: 5,
  },
  Shirt: {
    Key: "shirt",
    Kind: "factory",
    // Value in percentage of max tolerance of storage
    Tolerance: 25,
    // Value in percentage of offset used for transfer
    Offset: 5,
  },
  Trout: {
    Key: "trout",
    Kind: "farm",
    // Value in percentage of max tolerance of storage
    Tolerance: 95,
    // Value in percentage of offset used for transfer
    Offset: 2,
  },
  Corn: {
    Key: "corn",
    Kind: "farm",
    // Value in percentage of max tolerance of storage
    Tolerance: 25,
    // Value in percentage of offset used for transfer
    Offset: 5,
  },
  Tree: {
    Key: "tree",
    Kind: "farm",
    // Value in percentage of max tolerance of storage
    Tolerance: 25,
    // Value in percentage of offset used for transfer
    Offset: 5,
  },
  Grape: {
    Key: "grape",
    Kind: "farm",
    // Value in percentage of max tolerance of storage
    Tolerance: 25,
    // Value in percentage of offset used for transfer
    Offset: 5,
  },
  Wine: {
    Key: "wine",
    Kind: "factory",
    // Value in percentage of max tolerance of storage
    Tolerance: 25,
    // Value in percentage of offset used for transfer
    Offset: 5,
  },
  Log: {
    Key: "log",
    Kind: "factory",
    // Value in percentage of max tolerance of storage
    Tolerance: 25,
    // Value in percentage of offset used for transfer
    Offset: 5,
  },
} as const;

type FactoryType =
  (typeof FactoryInspectTransfer)[keyof typeof FactoryInspectTransfer];

const FactoryInspectTransferList = Object.values(FactoryInspectTransfer);

const QuestionIsFactoryInspectTransfer = (args: {
  key: string;
  kind: string;
}): [FactoryType, true] | [undefined, false] => {
  const factory = FactoryInspectTransferList.find(
    (factory) => factory.Kind === args.kind && factory.Key === args.key,
  );
  // Tuple: [Factory coincidence, Is factory to inspect]
  if (factory) return [factory, true];
  return [undefined, false];
};

const ProductsTrade = {
  Microchip: {
    Key: "microchip",
    Id: 69,
    KeepMinInventory: 1000,
  },
  Shoes: {
    Key: "shoes",
    Id: 111,
    KeepMinInventory: 500,
  },
  Caviar: {
    Key: "caviar",
    Id: 105,
    KeepMinInventory: 0,
  },
  Shirt: {
    Key: "shirt",
    Id: 44,
    KeepMinInventory: 0,
  },
  Pants: {
    Key: "pants",
    Id: 45,
    KeepMinInventory: 0,
  },
  Log: {
    Key: "log",
    Id: 47,
    KeepMinInventory: 150,
  },
  Butter: {
    Key: "butter",
    Id: 25,
    KeepMinInventory: 150,
  },
  Wine: {
    Key: "wine",
    Id: 124,
    KeepMinInventory: 0,
  },
};

type ProductTradeType = (typeof ProductsTrade)[keyof typeof ProductsTrade];

export {
  Priority,
  ProductsAnalytics,
  FactoryInspectTransfer,
  FactoryInspectTransferList,
  QuestionIsFactoryInspectTransfer,
  ProductsTrade,
};

export type { ProductType, FactoryType, ProductTradeType };
