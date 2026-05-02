"use server";

import { getLogger } from "@logtape/logtape";
import { isNullish, isInt, isBoolean } from "radashi";

import type { ExternOrderType, GetStateType } from "~/types/d";

import {
  cancelOrder as cancelOrderExternal,
  ExternalUnauthorizedError,
  getPriceRange as getPriceRangeExternal,
  sendOrder as sendOrderExternal,
  isUnautorizedError,
  toError,
  toSuccess,
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

type GetStateWithResponse = GetStateType & {
  orders: ExternOrderType[];
}

const getStateWith = async (
  args: {
    regionId?: 1 | 2 | 3 | 4 | 5 | 6,
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

  if (!isNullish(args.regionId) && isInt(args.regionId)) {
    searchParams.append("regionId", args.regionId.toString());
  }

  const stream = await fetch(`https://playtradecraft.com/api/state?${searchParams.toString()}`, {
    headers: {...Headers, Cookie: `token=${options.token}`},
  });

  const result = (await stream.json()) as GetStateWithResponse | ExternalUnauthorizedError;
  if (isUnautorizedError(result)) {
    return toError(result);
  }

  return toSuccess(result);
};

export { cancelOrder, sendOrder, getStateWith, getPriceRange };
