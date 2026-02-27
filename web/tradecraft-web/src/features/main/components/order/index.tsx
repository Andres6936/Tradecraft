import React, { useMemo } from "react";
import { type RowComponentProps } from "react-window";

import type { ExternOrderType } from "~/types/d";
import { TimeAgoCounter } from "./components/time-ago-counter";
import { OrderContext } from "./context";
import * as Comp from "./composition";

const Order = ({
  index,
  style,
  orders,
  userId,
}: RowComponentProps<{ orders: ExternOrderType[]; userId: string }>) => {
  const model = useMemo(() => orders[index]!, [index, orders]);

  const isMineOrder = model.ownerUserId === userId;

  const regionName = React.useMemo(() => {
    return model.regionName.split(" ").at(0);
  }, [model]);

  return (
    <OrderContext.Provider value={{ order: model, isMineOrder }}>
      <section className="border rounded py-2 px-3" style={style}>
        <Comp.Flex>
          <Comp.Row>
            <Comp.Name />
            <Comp.Indicator />
          </Comp.Row>
          <Comp.BadgePrice />
        </Comp.Flex>
        <Comp.Flex>
          <p className="text-muted-foreground text-xs">
            {model.qty} {model.unit} - {regionName}
          </p>
          <TimeAgoCounter createdAt={model.createdAt} />
        </Comp.Flex>
      </section>
    </OrderContext.Provider>
  );
};

export { Order };
