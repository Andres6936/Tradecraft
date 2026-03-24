import { Separator } from "~/components/ui/separator";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

import { Actions } from "./components/actions";
import { ListOrders } from "./components/list-orders";
import { InfoSelected } from "./components/info-selected";
import { QuantityPrice } from "./components/quantity-price";
import { AllowNpcTotal } from "./components/allow-npc-total";
import { SelectProduct } from "./components/select/product";
import { ActionsMineOnly } from "./components/action-mine-only";


const BuyerSell = () => {
  return (
    <Card className="w-full min-w-md max-w-md">
      <CardHeader>
        <CardTitle>Market Orders</CardTitle>
        <CardAction>
          <ActionsMineOnly />
        </CardAction>
      </CardHeader>
      <CardContent>
        <section className="flex flex-col gap-4">
          <SelectProduct />
          <Separator/>
          <ListOrders />
          <Separator/>
          <InfoSelected />
          <QuantityPrice />
          <AllowNpcTotal />
          <Actions />
        </section>
      </CardContent>
    </Card>
  )
}

export {BuyerSell}
