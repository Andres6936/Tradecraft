import React, { useMemo } from "react";
import { capitalize } from "radashi";
import { type RowComponentProps } from "react-window";

import { Badge } from "~/components/ui/badge";
import type { ExternOrderType } from "~/types/d";
import { Locate } from "lucide-react";
import { TimeAgoCounter } from "./time-ago-counter";
import { OrderContext } from "./context";

const Order = ({
  index,
  style,
  orders,
  userId,
}: RowComponentProps<{ orders: ExternOrderType[]; userId: string }>) => {
  const model = useMemo(() => orders[index]!, [index, orders]);

  const isMineOrder = model.ownerUserId === userId;

  const side = React.useMemo(() => {
    return capitalize(model.side);
  }, [model]);

  const regionName = React.useMemo(() => {
    return model.regionName.split(" ").at(0);
  }, [model]);

  const CompBadge = React.useMemo(() => {
    const orderType = model.orderType;
    if (orderType === "market") {
      return <Badge>Market</Badge>;
    } else {
      return <p className="font-bold text-lg">${model.price}</p>;
    }
  }, [model]);

  return (
    <OrderContext.Provider value={{ order: model }}>
      <section className="border rounded py-2 px-3" style={style}>
        <div className="flex items-center justify-between">
          <div className="flex flex-row items-center gap-2">
            <p className="font-bold text-lg">
              {side} - {model.productName}
            </p>
            {isMineOrder && <Locate className="h-4 text-blue-500" />}
          </div>
          {CompBadge}
        </div>
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground text-xs">
            {model.qty} {model.unit} - {regionName}
          </p>
          <TimeAgoCounter createdAt={model.createdAt} />
        </div>
      </section>
    </OrderContext.Provider>
  );
};

export { Order };
