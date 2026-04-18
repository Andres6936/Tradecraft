"use server";

import { getPriceRange, getStateWith } from "~/api";
import { defaultValue } from "~/features/main/utils/setup";

const getPriceWithhistory = async (args: { productId: number }, options: {token: string}) => {
  if (args.productId === defaultValue.Id) {
    return {
      statusCode: 201,
      body: {
        Avg: 0,
        Min: 0,
        Max: 0,
        History: [] as {t: number, p: number}[],
      }
    } as const;
  }

  return await getPriceRange({
    productId: args.productId,
    withPrecision: 2,
  }, options);
};

const getState = async (args: { productId?: number | null; ordersMineOnly: boolean }, options: { token: string }) => {
   const [resultState, resultPrice] = await Promise.all([
    getStateWith({
      productId: args.productId ? args.productId : null,
      ordersMineOnly: args.ordersMineOnly,
    }, options),
    getPriceWithhistory({
      productId: args.productId ? args.productId : defaultValue.Id,
    }, options),
  ]);

  if (resultState.statusCode === 401 || resultPrice.statusCode === 401) {
    return {
      statusCode: 401,
      body: {
        message: 'Unauthorized',
      },
    } as const;
  }

  const [state, { Avg, Min, Max, History }] = [resultState.body, resultPrice.body];

  return {
    statusCode: 200,
    body: {
      userId: state.me.userId,
      orders: state.orders,
      inventory: state.gs.inventory,
      productGraph: {
        Avg,
        Min,
        Max,
        History,
      },
    }
  } as const;
};

export { getState };
