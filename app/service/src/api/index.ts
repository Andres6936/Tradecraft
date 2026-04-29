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
import { TokenGuard } from "~/login/token"

const Headers = {
  "User-Agent": process.env.USER_AGENT || "",
}

const getHeaders = () => ({
  ...Headers,
  Cookie: TokenGuard.getToken(),
})

type FirstArgs<T extends (...args: any) => any> = Parameters<T>[0]

const getPriceRange = (args: FirstArgs<typeof getPriceRangeExternal>) => getPriceRangeExternal(args, {
  headers: getHeaders(),
})

const getOrders = (args: FirstArgs<typeof getOrdersExternal>) => getOrdersExternal(args, {
  headers: getHeaders(),
})

const sendOrder = (args: FirstArgs<typeof sendOrderExternal>) => sendOrderExternal(args, {
  headers: getHeaders(),
})

const cancelOrder = (args: FirstArgs<typeof cancelOrderExternal>) => cancelOrderExternal(args, {
  headers: getHeaders(),
})

const getMineOrders = () => getMineOrdersExternal({
  headers: getHeaders(),
})

const getState = () => getStateExternal({
  headers: getHeaders(),
})

const transferWarehouse = (args: FirstArgs<typeof transferWarehouseExternal>) => transferWarehouseExternal(args, {
  headers: getHeaders(),
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
