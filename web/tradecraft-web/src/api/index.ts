"use server";

import { getLogger } from "@logtape/logtape";
import { isNullish, isInt, isBoolean } from "radashi";

import type {
  ExternOrderType,
  GetStateType,
} from "~/types/d";

import {
  cancelOrder as cancelOrderExternal,
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
const UserAgent = process.env.USER_AGENT || "";

type FirstArgs<T extends (...args: any) => any> = Parameters<T>[0]

const cancelOrder = async (args: FirstArgs<typeof cancelOrderExternal>) => cancelOrderExternal(args, {
  headers: {
    Cookie: Cookies,
    "User-Agent": UserAgent,
  },
})

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
        "User-Agent": UserAgent,
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
