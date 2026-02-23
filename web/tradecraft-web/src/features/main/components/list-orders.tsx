import { useQuery } from "@tanstack/react-query";

import { getOrders } from "~/api";
import { ScrollArea } from "~/components/ui/scroll-area";
import type { ExternOrderType } from "~/types/d";

import { Order } from "./order";

const ListOrders = () => {
  const query = useQuery({
    queryKey: ["/server/action/getOrders"],
    queryFn: () => getOrders(),
  });

  if (query.isLoading || !query.data) {
    return <div>Loading...</div>;
  }

  if (query.error) {
    return <div>Error: {query.error.message}</div>;
  }

  const orders = query.data;

  return (
    <div className="relative h-96">
      <div className="flex absolute inset-0">
        <ScrollArea className="flex flex-1">
          {orders.map((it) => (
            <Order key={it._id} model={it as ExternOrderType} />
          ))}
        </ScrollArea>
      </div>
    </div>
  );
};

export { ListOrders };
