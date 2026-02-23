"use client";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Checkbox } from "~/components/ui/checkbox";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "~/components/ui/input-group";
import { Label } from "~/components/ui/label";
import { Switch } from "~/components/ui/switch";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";

import { Input } from "~/components/ui/input";
import { ListOrders } from "~/features/main/components/list-orders";
import { SelectProduct } from "~/features/main/components/select/product";
import { TraderContextProvider } from "~/features/main/context/use-trader";
import { InfoSelected } from "~/features/main/components/info-selected";

const Trader = () => {
  return (
    <TraderContextProvider>
      <Card className="w-full min-w-md max-w-md">
        <CardHeader>
          <CardTitle>Market Orders</CardTitle>
          <CardAction>
            <Label>
              <p className="text-muted-foreground text-xs">My Orders</p>
              <Switch />
            </Label>
          </CardAction>
        </CardHeader>
        <CardContent>
          <section className="flex flex-col gap-4">
            <SelectProduct />
            <hr />
            <ListOrders />
            <hr />
            <InfoSelected />
            <div className="flex gap-2 items-center justify-between">
              <div className="flex flex-row gap-2 items-center">
                <p className="text-muted-foreground text-xs">Quantity</p>
                <div>
                  <InputGroup>
                    <InputGroupInput className="max-w-24" />
                    <InputGroupAddon align="inline-end">
                      <InputGroupButton>Max</InputGroupButton>
                    </InputGroupAddon>
                  </InputGroup>
                </div>
              </div>
              <div className="flex flex-row gap-2 items-center">
                <p className="text-muted-foreground text-xs">Price</p>
                <Input className="max-w-24" value="107.90" />
              </div>
            </div>
            <div className="flex gap-2 items-center justify-between">
              <Label>
                <Checkbox />
                Allow NPC Fill
              </Label>

              <div className="flex flex-row gap-2 items-center">
                <p className="text-muted-foreground text-xs">Total</p>
                <p>$10.790.0</p>
              </div>
            </div>

            <div className="flex gap-2 items-center justify-between">
              <ToggleGroup variant="outline" type="single">
                <ToggleGroupItem value="buy">Buy</ToggleGroupItem>
                <ToggleGroupItem value="sell">Sell</ToggleGroupItem>
              </ToggleGroup>

              <ToggleGroup variant="outline" type="single">
                <ToggleGroupItem value="buy">Market</ToggleGroupItem>
                <ToggleGroupItem value="sell">Limit</ToggleGroupItem>
              </ToggleGroup>

              <Button>Order</Button>
            </div>
          </section>
        </CardContent>
      </Card>
    </TraderContextProvider>
  );
};

export { Trader };
