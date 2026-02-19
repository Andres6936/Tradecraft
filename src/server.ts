import instructions from "~/instructions.json" with { type: "json" };

type CategoryInstructionType = {
  CancelOrphans: {
    Sell: boolean;
    Buy: boolean;
  };
  Trader: {
    Priority: "High" | "Medium" | "Low";
    MaxInventory: number;
  };
  Transfer: {
    Kind: "factory" | "farm";
    // Value in percentage of max tolerance of storage
    Tolerance: number;
    // Value in percentage of offset used for transfer
    Offset: number;
  };
};

type InstructionType = {
  Id: number;
  Key: string;
  Name: string;
  Categories: (keyof CategoryInstructionType)[];
} & Partial<CategoryInstructionType>;

const InstructionList = instructions as InstructionType[];

const getByCategory = <K extends keyof CategoryInstructionType>(
  category: K,
) => {
  return InstructionList.filter(
    (
      instruction,
    ): instruction is InstructionType &
      Required<Pick<CategoryInstructionType, K>> => {
      return (
        instruction.Categories.includes(category) && !!instruction[category]
      );
    },
  );
};

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
    Tolerance: 90,
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
  Computer: {
    Key: "computer",
    Id: 93,
    KeepMinInventory: 100,
  },
  Smarthphone: {
    Key: "smartphone",
    Id: 94,
    KeepMinInventory: 100,
  },
  Circuit: {
    Key: "circuit",
    Id: 92,
    KeepMinInventory: 0,
  },
  Microchip: {
    Key: "microchip",
    Id: 69,
    KeepMinInventory: 20_000,
  },
  Shoes: {
    Key: "shoes",
    Id: 111,
    KeepMinInventory: 0,
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
    KeepMinInventory: 0,
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
  FactoryInspectTransfer,
  FactoryInspectTransferList,
  QuestionIsFactoryInspectTransfer,
  ProductsTrade,
  getByCategory,
};

export type {
  FactoryType,
  ProductTradeType,
  InstructionType,
  CategoryInstructionType,
};
