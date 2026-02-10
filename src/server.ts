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
};

const ProductsAnalytics = {
  Computer: {
    Id: 93,
    Name: "Computer",
    Order: 899,
    Priority: Priority.High,
  },
  Smartphone: {
    Id: 94,
    Name: "Smartphone",
    Order: 540,
    Priority: Priority.High,
  },
  Lumber: {
    Id: 48,
    Name: "Lumber",
    Order: 320,
    Priority: Priority.Medium,
  },
  Circuit: {
    Id: 92,
    Name: "Circuit",
    Order: 232,
    Priority: Priority.Medium,
  },
  Furniture: {
    Id: 49,
    Name: "Furniture",
    Order: 227,
    Priority: Priority.High,
  },
  Log: {
    Id: 47,
    Name: "Log",
    Order: 152,
    Priority: Priority.Medium,
  },
  Beeswax: {
    Id: 55,
    Name: "Beeswax",
    Order: 111,
    Priority: Priority.Medium,
  },
  Shoes: {
    Id: 111,
    Name: "Shoes",
    Order: 105,
    Priority: Priority.Medium,
  },
  Microchip: {
    Id: 69,
    Name: "Microchip",
    Order: 40,
    Priority: Priority.Low,
  },
  Butter: {
    Id: 25,
    Name: "Butter",
    Order: 36,
    Priority: Priority.Low,
  },
} as const satisfies Record<string, ProductType>;

const FactoryInspectTransfer = {
  Bread: {
    Key: "bread",
    Kind: "factory",
    // Value in percentage of max tolerance of storage
    Tolerance: 25,
  },
  Flour: {
    Key: "flour",
    Kind: "factory",
    // Value in percentage of max tolerance of storage
    Tolerance: 25,
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

export {
  Priority,
  ProductsAnalytics,
  FactoryInspectTransfer,
  FactoryInspectTransferList,
  QuestionIsFactoryInspectTransfer,
};

export type { ProductType, FactoryType };
