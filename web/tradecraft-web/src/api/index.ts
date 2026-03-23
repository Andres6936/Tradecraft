"use server";

import { getLogger } from "@logtape/logtape";
import { isNullish, isInt, isBoolean } from "radashi";

import type { ExternOrderType, GetStateType } from "~/types/d";

import {
  cancelOrder as cancelOrderExternal,
  getPriceRange as getPriceRangeExternal,
  sendOrder as sendOrderExternal,
} from "@trader/api";

const logger = getLogger("trader");

const Headers = {
  Cookie: process.env.COOKIES || "",
  "User-Agent": process.env.USER_AGENT || "",
};

type FirstArgs<T extends (...args: any) => any> = Parameters<T>[0];

const cancelOrder = async (args: FirstArgs<typeof cancelOrderExternal>, options: {token: string}) =>
  cancelOrderExternal(args, {
    headers: {...Headers, Cookie: `token=${options.token}`},
  });

const sendOrder = async (args: FirstArgs<typeof sendOrderExternal>, options: {token: string}) =>
  sendOrderExternal(args, {
    headers: {...Headers, Cookie: `token=${options.token}`},
  });

const getPriceRange = async (args: FirstArgs<typeof getPriceRangeExternal>, options: {token: string}) =>
  getPriceRangeExternal(args, {
    headers: {...Headers, Cookie: `token=${options.token}`},
  });

const getStateWith = async (
  args: {
    productId?: number | null;
    ordersMineOnly?: boolean;
  } = {},
  options: {token: string}
) => {
  const searchParams = new URLSearchParams();

  // Determine if the value is not null and is an integer without
  // fractions parts and the value is different from -1
  if (!isNullish(args.productId) && isInt(args.productId) && args.productId !== -1) {
    searchParams.append("orderFilterProductId", args.productId.toString());
  }

  if (!isNullish(args.ordersMineOnly) && isBoolean(args.ordersMineOnly)) {
    searchParams.append("mineOrdersOnly", args.ordersMineOnly ? "1" : "0");
  }

  const stream = await fetch(`https://playtradecraft.com/api/state?${searchParams.toString()}`, {
    headers: {...Headers, Cookie: `token=${options.token}`},
  });

  const result = (await stream.json()) as GetStateType & {
    orders: ExternOrderType[];
  };
  return result;
};

export { cancelOrder, sendOrder, getStateWith, getPriceRange };
