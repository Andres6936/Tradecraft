"use client";

import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";


import {  useTraderContext } from "~/features/main/context/use-trader";
import { Label } from "~/components/ui/label";
import { Switch } from "~/components/ui/switch";
import { Chart } from "./chart";
import { HistoryChartProvider, useHistoryChart } from "./context";
import { useInvertColors } from "./hooks";

const Root = (props: React.PropsWithChildren<{}>) =>
  <Card className="flex flex-1 flex-col w-full min-w-xl max-w-xl" {...props} />

const Header = (props: React.PropsWithChildren<{}>) => {
  return (
    <CardHeader>
      <CardTitle>Market View</CardTitle>
      {props.children}
    </CardHeader>
  )
}

const ActionInvertColors = () => {
  const { invertColors, onChangeInvertColors } = useHistoryChart();

  return (
    <Label>
      <p className="text-muted-foreground text-xs">Invert Colors</p>
      <Switch checked={invertColors} onCheckedChange={onChangeInvertColors}/>
    </Label>
  )
}

const SkeletonLoading = (props: React.PropsWithChildren<{}>) => {
  return (
    <Root>
      <Header />
      <CardContent className="flex flex-1 items-center justify-center">
        {props.children}
      </CardContent>
    </Root>
  )
}

const Footer = () => {
  const { min, max, avg, invertColors } = useHistoryChart();
  const [firstColor, secondColor] = useInvertColors(invertColors);

  return (
    <CardFooter className="flex items-center justify-between">
      <p>Average: {avg}</p>
      <div className="flex flex-row gap-4">
        <p style={{color: firstColor}}>Minimum: {min}</p>
        <p style={{color: secondColor}}>Maximum: {max}</p>
      </div>
    </CardFooter>
  )
}

const HistoryChart = () => {
  const context = useTraderContext();

  if (context.isLoading) {
    return <SkeletonLoading/>
  }

  if (context.error) {
    return (
      <SkeletonLoading>
        <p>Error: {context.error.message}</p>
      </SkeletonLoading>
    )
  }

  const { isAllProductSelected,  productGraph: { Min, Max, Avg, History } } = context;

  if (isAllProductSelected) {
    return (
      <SkeletonLoading>
        <p>Select a product to show chart</p>
      </SkeletonLoading>
    )
  }

  return (
    <HistoryChartProvider min={Min} max={Max} avg={Avg}>
      <Root>
        <Header>
          <CardAction>
            <ActionInvertColors/>
          </CardAction>
        </Header>
        <CardContent className="relative flex flex-1 p-0">
          <section className="absolute inset-0 flex">
             <Chart history={History}/>
          </section>
        </CardContent>
        <Footer/>
      </Root>
    </HistoryChartProvider>
  )
}

export {HistoryChart}
