import React from "react";
import { useQuery } from "@tanstack/react-query";

import type { ExternOrderType } from "~/types/d";

import { cn } from "~/lib/utils";
import { getOrders } from "~/api";
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
  const { selectedProduct } = useTraderContext();

  const query = useQuery({
    queryKey: [`/server/action/getOrders?`, selectedProduct],
    queryFn: () =>
      getOrders({
        productId: selectedProduct ? selectedProduct.Id : null,
      }),
  });

  if (query.isLoading || !query.data) {
    return (
      <Root className="items-center justify-center">
        <div>Loading...</div>
      </Root>
    );
  }

  if (query.error) {
    return (
      <Root>
        <div>Error: {query.error.message}</div>
      </Root>
    );
  }

  const orders = query.data;

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
