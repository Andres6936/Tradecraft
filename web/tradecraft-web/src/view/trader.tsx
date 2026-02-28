"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "~/components/ui/chart"

import { ListOrders } from "~/features/main/components/list-orders";
import { SelectProduct } from "~/features/main/components/select/product";
import { TraderContextProvider } from "~/features/main/context/use-trader";
import { InfoSelected } from "~/features/main/components/info-selected";
import { QuantityPrice } from "~/features/main/components/quantity-price";
import { AllowNpcTotal } from "~/features/main/components/allow-npc-total";
import { Actions } from "~/features/main/components/actions";
import { ActionsMineOnly } from "~/features/main/components/action-mine-only";


const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
]
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

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
              <ChartContainer className="py-2" config={chartConfig}>
                <LineChart
                  accessibilityLayer
                  data={chartData}
                  margin={{
                    left: 12,
                    right: 12,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Line
                    dataKey="desktop"
                    type="natural"
                    stroke="var(--color-desktop)"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
          <Card className="flex flex-1 flex-col w-full min-w-xl max-w-xl">
            <CardHeader>
              <CardTitle>Market View</CardTitle>
            </CardHeader>
            <CardContent>
              <section>

              </section>
            </CardContent>
          </Card>
        </section>
      </main>
    </TraderContextProvider>
  );
};

export { Trader };
