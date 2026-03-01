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
        <CardAction>
          <Label>
            <p className="text-muted-foreground text-xs">Invert Colors</p>
            <Switch/>
          </Label>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Chart avg={Avg} min={Min} max={Max} history={History}/>
      </CardContent>
    </Card>
  )
}

export {HistoryChart}
