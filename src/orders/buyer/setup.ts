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
  Gold: {
    Id: 8,
    Key: "gold",
    KeepInventory: 140,
  },
  Copper: {
    Id: 68,
    Key: "copper",
    KeepInventory: 12_800,
  },
  CopperWire: {
    Id: 91,
    Key: "copper_wire",
    KeepInventory: 3_000,
  },
};

const ProductsSupplyBuyerList = Object.values(ProductsSupplyBuyer);

export { ProductsSupplyBuyerList };
