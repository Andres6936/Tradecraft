const MAXIMUM_SELL_AMOUNT = 9_999;

const ProductsSeller = {
  Yarn: {
    Id: 41,
    Key: "cotton_yarn",
  },
  Wool: {
    Id: 109,
    Key: "wool",
  },
  Trout: {
    Id: 106,
    Key: "trout",
  },
  Flour: {
    Id: 5,
    Key: "flour",
  },
  Fertilizer: {
    Id: 12,
    Key: "fertilizer",
  },
  Fabric: {
    Id: 42,
    Key: "cotton_fabric",
  },
  Bread: {
    Id: 7,
    Key: "bread",
  },
};

const ProductsSellerList = Object.values(ProductsSeller);

export { ProductsSellerList, MAXIMUM_SELL_AMOUNT };
