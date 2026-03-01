"use client";

import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";


import {  useTraderContext } from "~/features/main/context/use-trader";
import { Label } from "~/components/ui/label";
import { Switch } from "~/components/ui/switch";
import { Chart } from "./chart";

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
    <Root>
      <Header>
        <CardAction>
          <Label>
            <p className="text-muted-foreground text-xs">Invert Colors</p>
            <Switch/>
          </Label>
        </CardAction>
      </Header>
      <CardContent>
        <Chart avg={Avg} min={Min} max={Max} history={History}/>
      </CardContent>
    </Root>
  )
}

export {HistoryChart}
