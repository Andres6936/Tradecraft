import React from "react";
import { List } from "react-window";

import { cn } from "~/lib/utils";

import { Order } from "./order";
import { useTraderContext } from "../context/use-trader";

const Root = ({ children, className }: React.PropsWithChildren<{ className?: string }>) => (
  <div className="relative h-96">
    <div className={cn("flex absolute inset-0", className)}>{children}</div>
  </div>
);

const ListOrders = () => {
  const context = useTraderContext();

  if (context.isLoading) {
    return (
      <Root className="items-center justify-center">
        <div>Loading...</div>
      </Root>
    );
  }

  if (context.error) {
    return (
      <Root>
        <div>Error: {context.error.message}</div>
      </Root>
    );
  }

  const { userId, orders } = context;

  return (
    <Root>
      <List
        rowComponent={Order}
        rowCount={orders.length}
        rowHeight={77}
        rowProps={{ orders, userId }}
      />
    </Root>
  );
};

export { ListOrders };
