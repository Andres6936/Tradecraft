"use client";

import { SelectProduct } from "~/components/select/product";
import { Button } from "~/components/ui/button";
import { ButtonGroup } from "~/components/ui/button-group";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Checkbox } from "~/components/ui/checkbox";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "~/components/ui/input-group";
import { Label } from "~/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";

const Trader = () => {
  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Market Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <section className="flex flex-col gap-4">
          <SelectProduct />
          <div className="bg-red-100 h-96"></div>
          <div className="flex gap-2 items-center justify-between">
            <div className="flex flex-row gap-2">
              <p>Selected product</p>
              <p>Milk</p>
            </div>
            <div className="flex flex-row gap-2">
              <p>Stock</p>
              <p>0.00 lts(s)</p>
            </div>
          </div>
          <div className="flex gap-2 items-center justify-between">
            <p>Quantity</p>
            <div>
              <InputGroup>
                <InputGroupInput />
                <InputGroupAddon align="inline-end">
                  <InputGroupButton>Max</InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
            </div>
            <p>Price</p>
            <p>107.90</p>
          </div>
          <div className="flex gap-2 items-center justify-between">
            <Label>
              <Checkbox />
              Allow NPC Fill
            </Label>

            <div className="flex flex-row gap-2">
              <p>Total</p>
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
