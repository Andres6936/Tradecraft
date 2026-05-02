import { TilesType } from "@trader/api"

const previewTile = {
    "_id": "00000000000000000000000F",
    "ownerUserId": "00000000000000000000000F",
    "regionId": 1,
    "y": 1,
    "x": 1,
    "alert": true,
    "busy": true,
    "createdAt": "1970-01-01T00:00:00.000Z",
    "disabledSaleProducts": [],
    "id": 1,
    "kind": "factory",
    "localStorage": {
        "productKey": "circuit",
        "storedQty": 0,
        "capacity": 0
    },
    "perfPct": 0,
    "prodPartial": 0,
    "prodTotal": 0,
    "productKey": "circuit",
    "retailRevenueToday": 0,
    "retailRevenueTotal": 0,
    "retailUnitsSoldToday": 0,
    "retailUnitsSoldTotal": 0,
    "updatedAt": "1970-01-01T00:00:00.000Z",
    "disabledConsumptionInputs": [],
    "employees": [],
    "isRented": false,
    "maxEmployeeCapacity": 0,
    "level": 0,
    "upgrading": true,
    "upgradeEndsAt": "1970-01-01T00:00:00.000Z",
    "upgradeStartedAt": "1970-01-01T00:00:00.000Z",
    "upgradeTargetLevel": 0,
    "hasActiveListing": false,
    "beneficiaryUserId": null,
    "currentRentalId": null
} satisfies TilesType

const previewTiles = Array.from({ length: 3 }, () => previewTile) satisfies TilesType[]

export { previewTiles }
