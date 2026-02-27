import { getByCategory } from "~/server";

const MAXIMUM_SELL_AMOUNT = 9_999;

const ProductsSellerList = getByCategory("OfferMarket");

export { ProductsSellerList, MAXIMUM_SELL_AMOUNT };
