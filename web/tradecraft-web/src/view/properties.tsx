import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { ListCard } from "~/features/properties/components/list-card";

const Properties = () => {
  return (
    <main className="flex flex-row gap-2">
      <ListCard/>

      <section className="flex flex-col gap-2">
        <Card className="flex flex-1 flex-col w-full min-w-xl max-w-xl">
          <CardHeader>
            <CardTitle>Market View</CardTitle>
          </CardHeader>
          <CardContent>
            <section></section>
          </CardContent>
        </Card>

        <Card className="flex flex-1 flex-col w-full min-w-xl max-w-xl">
          <CardHeader>
            <CardTitle>Market View</CardTitle>
          </CardHeader>
          <CardContent>
            <section></section>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}

export { Properties }
