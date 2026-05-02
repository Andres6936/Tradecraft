import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { Trader as ViewTrader } from "~/view/trader";

const ViewTabs = () => {
  return (
    <Tabs defaultValue="market" className="flex flex-row gap-2">
      <TabsList>
        <TabsTrigger className="px-4" value="market">Market</TabsTrigger>
        <TabsTrigger className="px-4" value="properties">Properties</TabsTrigger>
      </TabsList>
      <TabsContent value="market">
        <ViewTrader />
      </TabsContent>
      <TabsContent value="properties">Properties content here.</TabsContent>
    </Tabs>
  )
}

export {ViewTabs}
