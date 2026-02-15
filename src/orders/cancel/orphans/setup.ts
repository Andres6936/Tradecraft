import { ProductsAnalytics } from "~/server";

const MAXIMUM_AGE_IN_MINUTES = 3;

const ProductsCancelOrphans = {
  ...ProductsAnalytics,
  Shirt: {
    Id: 44,
    Key: "shirt",
    Name: "Shirt",
  },
  Pants: {
    Id: 45,
    Key: "pants",
    Name: "Pants",
  },
};

const ProductsCancelOrphansOrderList = Object.values(ProductsCancelOrphans);
const ProductsCancelOrphansOrderListKey = ProductsCancelOrphansOrderList.map(
  (it) => it.Key,
);

export { ProductsCancelOrphansOrderListKey, MAXIMUM_AGE_IN_MINUTES };
