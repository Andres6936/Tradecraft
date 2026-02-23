"use client";

import React from "react";

import type { ExternOrderType } from "~/types/d";

import { SelectProduct } from "~/components/select/product";
import { Badge } from "~/components/ui/badge";
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
import { ScrollArea } from "~/components/ui/scroll-area";
import { Switch } from "~/components/ui/switch";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";

import { capitalize } from "radashi";

import state from "~/state.json" with { type: "json" };

const Order = ({ model }: { model: ExternOrderType }) => {
  const side = React.useMemo(() => {
    return capitalize(model.side);
  }, [model]);

  const regionName = React.useMemo(() => {
    return model.regionName.split(" ").at(0);
  }, [model]);

  const CompBadge = React.useMemo(() => {
    const orderType = model.orderType;
    if (orderType === "market") {
      return <Badge>Market</Badge>;
    } else {
      return <p className="font-bold text-lg">${model.price}</p>;
    }
  }, [model]);

  return (
    <section className="border rounded py-2 px-3">
      <div className="flex items-center justify-between">
        <p className="font-bold text-lg">
          {side} - {model.productName}
        </p>
        {CompBadge}
      </div>
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground text-xs">
          {model.qty} {model.unit} - {regionName}
        </p>
        <p className="text-muted-foreground text-xs">49s ago</p>
      </div>
    </section>
  );
};

const Trader = () => {
  return (
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
          <div className="relative h-96">
            <div className="flex absolute inset-0">
              <ScrollArea className="flex flex-1">
                {state.orders.map((it) => (
                  <Order key={it._id} model={it as ExternOrderType} />
                ))}
              </ScrollArea>
            </div>
          </div>
          <hr />
          <div className="flex gap-2 items-center justify-between">
            <div className="flex flex-col">
              <p className="text-muted-foreground text-xs text-start">
                Selected Product
              </p>
              <p>Milk</p>
            </div>
            <div className="flex flex-col">
              <p className="text-muted-foreground text-xs text-end">Stock</p>
              <p>0.00 lts(s)</p>
            </div>
          </div>
          <div className="flex gap-2 items-center justify-between">
            <div className="flex flex-row gap-2 items-center">
              <p className="text-muted-foreground text-xs">Quantity</p>
              <div>
                <InputGroup>
                  <InputGroupInput className="max-w-20" />
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton>Max</InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
              </div>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <p className="text-muted-foreground text-xs">Price</p>
              <p>107.90</p>
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
  );
};

export { Trader };
