import { ScrollArea } from "~/components/ui/scroll-area";
import type { ExternOrderType } from "~/types/d";

import { Order } from "./order";

import state from "~/state.json" with { type: "json" };

const ListOrders = () => {
  return (
    <div className="relative h-96">
      <div className="flex absolute inset-0">
        <ScrollArea className="flex flex-1">
          {state.orders.map((it) => (
            <Order key={it._id} model={it as ExternOrderType} />
          ))}
        </ScrollArea>
      </div>
    </div>
  );
};

export { ListOrders };
