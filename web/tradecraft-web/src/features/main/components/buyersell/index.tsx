import { Separator } from "~/components/ui/separator";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { ListOrders } from "~/features/main/components/list-orders";
import { SelectProduct } from "~/features/main/components/select/product";
import { InfoSelected } from "~/features/main/components/info-selected";
import { QuantityPrice } from "~/features/main/components/quantity-price";
import { AllowNpcTotal } from "~/features/main/components/allow-npc-total";
import { Actions } from "~/features/main/components/actions";
import { ActionsMineOnly } from "~/features/main/components/action-mine-only";


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
