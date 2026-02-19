import instructions from "~/instructions.json" with { type: "json" };

type CategoryInstructionType = {
  CancelOrphans: {
    Sell: boolean;
    Buy: boolean;
  };
  Analytics: {
    Priority: "High" | "Medium" | "Low";
    Sell: boolean;
    Buy: boolean;
  };
  Buyer: {
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

export { ProductsTrade, getByCategory };

export type { ProductTradeType, InstructionType, CategoryInstructionType };
