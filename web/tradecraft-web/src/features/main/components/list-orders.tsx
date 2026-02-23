import React from "react";

import type { ExternOrderType } from "~/types/d";

import { cn } from "~/lib/utils";
import { ScrollArea } from "~/components/ui/scroll-area";

import { Order } from "./order";
import { useTraderContext } from "../context/use-trader";

const Root = ({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) => (
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

  const orders = context.orders;

  return (
    <Root>
      <ScrollArea className="flex flex-1">
        {orders.map((it) => (
          <Order key={it._id} model={it as ExternOrderType} />
        ))}
      </ScrollArea>
    </Root>
  );
};

export { ListOrders };
