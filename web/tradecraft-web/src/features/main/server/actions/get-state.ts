"use server";

import { getPriceRange, getStateWith } from "~/api";
import { defaultValue } from "~/features/main/utils/setup";

const getPriceWithhistory = async (args: { productId: number }) => {
  if (args.productId === defaultValue.Id) {
    return {
      Avg: 0,
      Min: 0,
      Max: 0,
      History: [],
    };
  }

  const { Avg, Min, Max, History } = await getPriceRange({
    productId: args.productId,
    withPrecision: 2,
  });

  return {
    Avg,
    Min,
    Max,
    History,
  };
};

const getState = async (args: { productId?: number | null; ordersMineOnly: boolean }) => {
  const [state, { Avg, Min, Max, History }] = await Promise.all([
    getStateWith({
      productId: args.productId ? args.productId : null,
      ordersMineOnly: args.ordersMineOnly,
    }),
    getPriceWithhistory({
      productId: args.productId ? args.productId : defaultValue.Id,
    }),
  ]);

  return {
    userId: state.me.userId,
    orders: state.orders,
    inventory: state.gs.inventory,
    productGraph: {
      Avg,
      Min,
      Max,
      History,
    },
  };
};

export { getState };
