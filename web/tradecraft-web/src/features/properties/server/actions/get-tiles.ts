"use server"

import { isUnautorizedError, toSuccess } from "@trader/api"
import { getStateWith } from "~/api"

const getAllTiles = async (options: {token: string}) => {
  const responses = await Promise.all([
    getStateWith({
      regionId: 1,
    }, options),
    // getStateWith({
    //   regionId: 2,
    // }, options),
    // getStateWith({
    //   regionId: 3,
    // }, options),
    // getStateWith({
    //   regionId: 4,
    // }, options),
    // getStateWith({
    //   regionId: 5,
    // }, options),
    // getStateWith({
    //   regionId: 6,
    // }, options),
  ])

  if (responses.some(it => isUnautorizedError(it))) {
    return { statusCode: 401, body: { message: "Unauthorized" } } as const
  }

  const tiles = responses.filter(it => it.statusCode === 200).map(it => it.body.tiles).flat().filter(it => it.kind === "factory");
  return toSuccess(tiles);
}

export { getAllTiles}
