import React from "react";
import { List } from "react-window";
import { Shimmer } from 'shimmer-from-structure';

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { usePropertiesContext } from "../context/properties-context";
import { Property } from "./property";

const ListCard = () => {
  const context = usePropertiesContext();

  if (context.isLoading) {
    return (
      <Shimmer loading={true}>
        <Root>
          <Header />
          <Content/>
        </Root>
      </Shimmer>
    );
  }

  if (context.error) {
    return (
      <Root>
        <Header />
        <Content>
          <p className="flex flex-1 justify-center items-center">
            {context.error.message}
          </p>
        </Content>
      </Root>
    )
  }

  const { tiles } = context;

  return (
    <Root>
      <Header/>
      <Content>
        <List
          rowComponent={Property}
          rowCount={tiles.length}
          rowHeight={77}
          rowProps={{ tiles }}
        />
      </Content>
    </Root>
  )
}

const Root = (props: React.PropsWithChildren<{}>) => <Card className="w-full min-w-md max-w-md" {...props} />

const Header = () => (
  <CardHeader>
    <CardTitle>Properties</CardTitle>
  </CardHeader>
)

const Content = (props: React.PropsWithChildren<{}>) => (
  <CardContent>
    <section className="flex flex-col">
      <div className="relative h-[42rem]">
        <div className="flex absolute inset-0">
          {props.children}
        </div>
      </div>
    </section>
  </CardContent>
)

export { ListCard }
