const MAXIMUM_SELL_AMOUNT = 9_999;

const ProductsSeller = {
  Yarn: {
    Id: 41,
    Key: "cotton_yarn",
    SeparationIntervalMinutes: 120, // 2 hours
  },
  Wool: {
    Id: 109,
    Key: "wool",
    SeparationIntervalMinutes: 120, // 2 hours
  },
  Trout: {
    Id: 106,
    Key: "trout",
    SeparationIntervalMinutes: 120, // 2 hours
  },
  Flour: {
    Id: 5,
    Key: "flour",
    SeparationIntervalMinutes: 120, // 2 hours
  },
  Fertilizer: {
    Id: 12,
    Key: "fertilizer",
    SeparationIntervalMinutes: 120, // 2 hours
  },
  Fabric: {
    Id: 42,
    Key: "cotton_fabric",
    SeparationIntervalMinutes: 120, // 2 hours
  },
  Bread: {
    Id: 7,
    Key: "bread",
    SeparationIntervalMinutes: 120, // 2 hours
  },
};

const ProductsSellerList = Object.values(ProductsSeller);

export { ProductsSellerList, MAXIMUM_SELL_AMOUNT };
