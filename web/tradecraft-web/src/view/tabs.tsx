import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { Trader as ViewTrader } from "~/view/trader";
import { Properties as ViewProperties } from "~/view/properties";


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
      <TabsContent value="properties">
        <ViewProperties/>
      </TabsContent>
    </Tabs>
  )
}

export {ViewTabs}
