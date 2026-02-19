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
  Seller: {
    KeepMinInventory: number;
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

export { getByCategory };

export type { InstructionType, CategoryInstructionType };
