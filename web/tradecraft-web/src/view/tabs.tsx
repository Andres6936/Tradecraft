"use client";

import { useQueryState } from 'nuqs'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { Trader as ViewTrader } from "~/view/trader";
import { Properties as ViewProperties } from "~/view/properties";

const TabsKey = {
  Market: 'Market',
  Properties: 'Properties',
} as const;

const ViewTabs = () => {
  const [tabs, setTabs] = useQueryState('Tab', { defaultValue: TabsKey.Market })

  return (
    <Tabs value={tabs} onValueChange={e => setTabs(e)} className="flex flex-row gap-2">
      <TabsList>
        <TabsTrigger className="px-4" value={TabsKey.Market}>Market</TabsTrigger>
        <TabsTrigger className="px-4" value={TabsKey.Properties}>Properties</TabsTrigger>
      </TabsList>
      <TabsContent value={TabsKey.Market}>
        <ViewTrader />
      </TabsContent>
      <TabsContent value={TabsKey.Properties}>
        <ViewProperties/>
      </TabsContent>
    </Tabs>
  )
}

export {ViewTabs}
