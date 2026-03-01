import { useMemo } from "react";
import { format } from "date-fns";
import { CartesianGrid, Line, LineChart, XAxis, YAxis, ReferenceLine } from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "~/components/ui/chart"
import { useHistoryChart } from "./context";
import { useInvertColors } from "./hooks";

const chartConfig = {
  p: {
    label: "Price",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

const Chart = ({ history }: { history: { t: number, p: number }[] }) => {
  const { min, max, avg, invertColors } = useHistoryChart();
  const [firstColor, secondColor] = useInvertColors(invertColors);

  const values = useMemo(() => {
    return history.map(it => {
      const date = new Date(it.t);
      const hour = format(date, 'h:mmaaa');
      return { t: hour, p: it.p };
    });
  }, [history])

  return (
    <ChartContainer className="flex flex-1 px-2" config={chartConfig}>
      <LineChart
        accessibilityLayer
        data={values}
        margin={{
          left: 4,
          right: 4,
        }}
      >
        <CartesianGrid
          stroke="var(--muted-foreground)"
          strokeOpacity={0.2}
          strokeWidth={1}
          strokeDasharray="10 5"
          syncWithTicks
        />
        <YAxis
          type='number'
          tickLine={false}
          tickCount={7}
          domain={[min * 0.9, max * 1.05]}
          tickFormatter={value => '$' + value.toFixed(1)}
        />
        <XAxis
          dataKey="t"
          tickLine={false}
          tickMargin={7}
          minTickGap={28}
        />
        <ReferenceLine y={min} stroke={firstColor} strokeDasharray='3 3' strokeWidth={1}
          label={{
            value: "Min. " + min,
            position: "insideBottomRight",
            fill: firstColor,
            fontSize: 10,
            offset: 10
          }}
        />
        <ReferenceLine y={max} stroke={secondColor} strokeDasharray='3 3' strokeWidth={1}
          label={{
            value: "Max. " + max,
            position: "insideBottomRight",
            fill: secondColor,
            fontSize: 10,
            offset: 10
          }}
        />
        <ReferenceLine y={avg} stroke="var(--color-chart-1)" strokeDasharray='3 3' strokeWidth={1}
          label={{
            value: "Avg. " + avg,
            position: "insideBottomRight",
            fill: "var(--muted-foreground)",
            fontSize: 10,
            offset: 10
          }}
        />
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

export {Chart}
