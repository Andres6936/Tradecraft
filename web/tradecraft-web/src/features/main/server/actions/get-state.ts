"use server";

import { getStateWith } from "~/api";

const getState = async (args: {
  productId?: number | null;
  ordersMineOnly: boolean;
}) => {
  const state = await getStateWith({
    productId: args.productId ? args.productId : null,
    ordersMineOnly: args.ordersMineOnly,
  });

  return {
    userId: state.me.userId,
    orders: state.orders,
    inventory: state.gs.inventory,
  };
};

export { getState };
