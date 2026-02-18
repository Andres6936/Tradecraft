const ProductsSupplyBuyer = {
  Bottle: {
    Id: 71,
    Key: "bottle",
    KeepInventory: 50_000,
  },
  Straw: {
    Id: 11,
    Key: "straw",
    KeepInventory: 1_000_000,
  },
  Glue: {
    Id: 52,
    Key: "glue",
    KeepInventory: 4_000,
  },
};

const ProductsSupplyBuyerList = Object.values(ProductsSupplyBuyer);

export { ProductsSupplyBuyerList };
