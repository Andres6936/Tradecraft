"use server";

import { getLogger } from "@logtape/logtape";
import { isNullish, isInt, isBoolean } from "radashi";

import type {
  ExternOrderType,
  GetStateType,
} from "~/types/d";

import {
  cancelOrder,
  getBalance,
  getBestSellOffer,
  getMineOrders,
  getPriceRange,
  getState,
  sendOrder,
  transferWarehouse,
} from "@trader/api"

const logger = getLogger("trader");

const Cookies = process.env.COOKIES || "";

const getStateWith = async (
  args: {
    productId?: number | null;
    ordersMineOnly?: boolean;
  } = {},
) => {
  const searchParams = new URLSearchParams();

  // Determine if the value is not null and is an integer without
  // fractions parts and the value is different from -1
  if (
    !isNullish(args.productId) &&
    isInt(args.productId) &&
    args.productId !== -1
  ) {
    searchParams.append("orderFilterProductId", args.productId.toString());
  }

  if (!isNullish(args.ordersMineOnly) && isBoolean(args.ordersMineOnly)) {
    searchParams.append("mineOrdersOnly", args.ordersMineOnly ? "1" : "0");
  }

  const stream = await fetch(
    `https://playtradecraft.com/api/state?${searchParams.toString()}`,
    {
      headers: {
        Cookie: Cookies,
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36 Edg/144.0.0.0",
      },
    },
  );

  const result = (await stream.json()) as GetStateType & {
    orders: ExternOrderType[];
  };
  return result;
};



export {
  cancelOrder,
  getBalance,
  getBestSellOffer,
  getMineOrders,
  getStateWith,
  getPriceRange,
  getState,
  sendOrder,
  transferWarehouse,
};
