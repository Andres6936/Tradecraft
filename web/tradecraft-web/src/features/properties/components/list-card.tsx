import React from "react";
import { List } from "react-window";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { usePropertiesContext } from "../context/properties-context";
import { Property } from "./property";

const ListCard = () => {
  const context = usePropertiesContext();

  if (context.isLoading) {
    return null;
  }

  if (context.error) {
    return null;
  }

  const { tiles } = context;

  return (
    <Card className="w-full min-w-md max-w-md">
      <CardHeader>
        <CardTitle>Properties</CardTitle>
      </CardHeader>
      <CardContent>
        <section className="flex flex-col">
          <div className="relative h-[42rem]">
            <div className="flex absolute inset-0">
              <List
                rowComponent={Property}
                rowCount={tiles.length}
                rowHeight={25}
                rowProps={{ tiles }}
              />
            </div>
          </div>
        </section>
      </CardContent>
    </Card>
  )
}

export { ListCard }
