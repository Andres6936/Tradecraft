import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

const ListCard = () => {
  return (
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
  )
}

export { ListCard }
