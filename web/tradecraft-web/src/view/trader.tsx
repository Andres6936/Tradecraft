"use client";

import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

import { ListOrders } from "~/features/main/components/list-orders";
import { SelectProduct } from "~/features/main/components/select/product";
import { TraderContextProvider } from "~/features/main/context/use-trader";
import { InfoSelected } from "~/features/main/components/info-selected";
import { QuantityPrice } from "~/features/main/components/quantity-price";
import { AllowNpcTotal } from "~/features/main/components/allow-npc-total";
import { Actions } from "~/features/main/components/actions";
import { ActionsMineOnly } from "~/features/main/components/action-mine-only";

const Trader = () => {
  return (
    <TraderContextProvider>
      <main className="flex flex-row gap-2">
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
              <hr />
              <ListOrders />
              <hr />
              <InfoSelected />
              <QuantityPrice />
              <AllowNpcTotal />
              <Actions />
            </section>
          </CardContent>
        </Card>
        <section className="flex flex-col gap-2">
          <Card className="flex flex-1 flex-col w-full min-w-xl max-w-xl">
            <CardHeader>
              <CardTitle>Market View</CardTitle>
            </CardHeader>
            <CardContent>
              <section className="bg-red-100">

              </section>
            </CardContent>
          </Card>
          <Card className="flex flex-1 flex-col w-full min-w-xl max-w-xl">
            <CardHeader>
              <CardTitle>Market View</CardTitle>
            </CardHeader>
            <CardContent>
              <section className=" bg-red-100">

              </section>
            </CardContent>
          </Card>
        </section>
      </main>
    </TraderContextProvider>
  );
};

export { Trader };
