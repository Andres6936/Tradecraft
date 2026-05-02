"use client"

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { useLoginContext } from "~/features/login/context/use-login";
import { ListCard } from "~/features/properties/components/list-card";
import { PropertiesContextProvider } from "~/features/properties/context/properties-context";

const Properties = () => {
  const { isAuthenticated, token } = useLoginContext();
  if (!isAuthenticated) {
    window.location.href = "/login";
    return null;
  }

  return (
    <PropertiesContextProvider token={token}>
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
    </PropertiesContextProvider>
  )
}

export { Properties }
