import {
  getPriceRange as getPriceRangeExternal,
  getOrders as getOrdersExternal,
  getMineOrders as getMineOrdersExternal,
  getBalance,
  getBestSellOffer,
  transferWarehouse as transferWarehouseExternal,
  getState as getStateExternal,
  sendOrder as sendOrderExternal,
  cancelOrder as cancelOrderExternal,
} from "@trader/api"

const Headers = {
  Cookie: process.env.COOKIES || "",
  "User-Agent": process.env.USER_AGENT || "",
}

type FirstArgs<T extends (...args: any) => any> = Parameters<T>[0]

const getPriceRange = (args: FirstArgs<typeof getPriceRangeExternal>) => getPriceRangeExternal(args, {
  headers: Headers,
})

const getOrders = (args: FirstArgs<typeof getOrdersExternal>) => getOrdersExternal(args, {
  headers: Headers,
})

const sendOrder = (args: FirstArgs<typeof sendOrderExternal>) => sendOrderExternal(args, {
  headers: Headers,
})

const cancelOrder = (args: FirstArgs<typeof cancelOrderExternal>) => cancelOrderExternal(args, {
  headers: Headers,
})

const getMineOrders = () => getMineOrdersExternal({
  headers: Headers,
})

const getState = () => getStateExternal({
  headers: Headers,
})

const transferWarehouse = (args: FirstArgs<typeof transferWarehouseExternal>) => transferWarehouseExternal(args, {
  headers: Headers,
})


export {
  getPriceRange,
  getOrders,
  getMineOrders,
  getBalance,
  getBestSellOffer,
  transferWarehouse,
  getState,
  sendOrder,
  cancelOrder,
};
