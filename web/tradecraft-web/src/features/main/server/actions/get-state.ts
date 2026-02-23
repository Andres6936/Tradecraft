"use server";

import { getStateWith } from "~/api";

const getState = async (args: { productId?: number | null }) => {
  const state = await getStateWith({
    productId: args.productId ? args.productId : null,
  });

  return {
    orders: state.orders,
    inventory: state.gs.inventory,
  };
};

export { getState };
