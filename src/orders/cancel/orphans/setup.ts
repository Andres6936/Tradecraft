import { getByCategory } from "~/server";

const MAXIMUM_AGE_IN_MINUTES = 3;

const ProductsCancelOrphansOrderList = getByCategory("CancelOrphans");
const ProductsCancelOrphansOrderListKey = ProductsCancelOrphansOrderList.map(
  (it) => it.Key,
);

export { ProductsCancelOrphansOrderListKey, MAXIMUM_AGE_IN_MINUTES };
