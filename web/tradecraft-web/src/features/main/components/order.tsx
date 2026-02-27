import React, { useMemo, useState, useEffect } from "react";
import { capitalize } from "radashi";
import { differenceInMinutes, differenceInSeconds, parseISO } from "date-fns";
import { type RowComponentProps } from "react-window";

import { Badge } from "~/components/ui/badge";
import type { ExternOrderType } from "~/types/d";
import { useTraderContext } from "../context/use-trader";
import { Locate } from "lucide-react";

const TimeAgoCounter = ({ createdAt }: { createdAt: string }) => {
  const createdAtDate = useMemo(() => parseISO(createdAt), [createdAt]);
  const [now, setNow] = useState(new Date());

  const secondsAgo = differenceInSeconds(now, createdAtDate);
  const minutesAgo = differenceInMinutes(now, createdAtDate);

  useEffect(() => {
    const isLessThanMinute = secondsAgo < 60;
    const intervalDelay = isLessThanMinute ? 1_000 : 60_000;

    const intervalId = setInterval(() => {
      setNow(new Date());
    }, intervalDelay);

    return () => clearInterval(intervalId);
  }, [secondsAgo < 60]);

  if (secondsAgo < 60) {
    const displaySeconds = Math.max(0, secondsAgo);
    return (
      <p className="text-muted-foreground text-xs">{displaySeconds}s ago</p>
    );
  }

  return <p className="text-muted-foreground text-xs">{minutesAgo}m ago</p>;
};

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
  );
};

export { Order };
