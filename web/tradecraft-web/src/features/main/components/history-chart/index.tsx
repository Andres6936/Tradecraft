"use client";

import { useMemo } from "react";
import { format } from "date-fns";
import { CartesianGrid, Line, LineChart, XAxis, YAxis, ReferenceLine } from "recharts"

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


import {  useTraderContext } from "~/features/main/context/use-trader";


const chartConfig = {
  p: {
    label: "Price",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

const HistoryChart = () => {
  const context = useTraderContext();

  if (context.isLoading) {
    return <p>Loading ...</p>
  }

  if (context.error) {
    return <p>Error: {context.error.message}</p>
  }

  const { productGraph: { Min, Max, Avg, History } } = context;

  return (
    <Card className="flex flex-1 flex-col w-full min-w-xl max-w-xl">
      <CardHeader>
        <CardTitle>Market View</CardTitle>
      </CardHeader>
      <CardContent>
        <Chart avg={Avg} min={Min} max={Max} history={History}/>
      </CardContent>
    </Card>
  )
}

const Chart = ({ min, max, avg, history }: { min: number, max: number, avg: number, history: { t: number, p: number }[] }) => {
  const values = useMemo(() => {
    return history.map(it => {
      const date = new Date(it.t);
      const hour = format(date, 'HH:mmaaa');
      return { t: hour, p: it.p };
    });
  }, [history])

  return (
    <ChartContainer className="py-2" config={chartConfig}>
      <LineChart
        accessibilityLayer
        data={values}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <YAxis
          tickLine={false}
          axisLine={{stroke: 'var(--muted-foreground)', strokeWidth: 1, strokeOpacity: 0.3}}
          domain={[min, max]}
        />
        <XAxis
          dataKey="t"
          tickLine={false}
          axisLine={{stroke: 'var(--muted-foreground)', strokeWidth: 1, strokeOpacity: 0.3}}
          tickMargin={8}
          minTickGap={32}
        />
        <ReferenceLine y={avg} stroke="var(--color-chart-1)" strokeDasharray='3 3' strokeWidth={1} />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Line
          dataKey="p"
          type="natural"
          stroke="var(--color-p)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  )
}

export {HistoryChart}
