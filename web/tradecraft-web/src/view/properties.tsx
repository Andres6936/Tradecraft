import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

const Properties = () => {
  return (
    <main className="flex flex-row gap-2">
      <Card className="w-full min-w-md max-w-md">
        <CardHeader>
          <CardTitle>Properties</CardTitle>
        </CardHeader>
        <CardContent>
          <section className="flex flex-col">
            <div className="h-[42rem]">

            </div>
          </section>
        </CardContent>
      </Card>

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
