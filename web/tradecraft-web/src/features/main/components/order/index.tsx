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

  return (
    <OrderContext.Provider value={{ order: model, isMineOrder }}>
      <Comp.Root style={style}>
        <Comp.Flex>
          <Comp.Row>
            <Comp.Name />
            <Comp.Indicator />
          </Comp.Row>
          <Comp.BadgePrice />
        </Comp.Flex>
        <Comp.Flex>
          <Comp.QuantityRegion />
          <TimeAgoCounter createdAt={model.createdAt} />
        </Comp.Flex>
      </Comp.Root>
    </OrderContext.Provider>
  );
};

export { Order };
