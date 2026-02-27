import React from "react";
import { capitalize } from "radashi";
import { Locate } from "lucide-react";

import { Badge } from "~/components/ui/badge";
import { useOrderContext } from "./context";

const Flex = (props: React.PropsWithChildren<{}>) => (
  <div className="flex items-center justify-between" {...props} />
);

const Row = (props: React.PropsWithChildren<{}>) => (
  <div className="flex flex-row items-center gap-2" {...props} />
);

const Name = () => {
  const { order } = useOrderContext();

  const side = React.useMemo(() => {
    return capitalize(order.side);
  }, [order]);

  return (
    <p className="font-bold text-lg">
      {side} - {order.productName}
    </p>
  );
};

const Indicator = () => {
  const { isMineOrder } = useOrderContext();

  if (!isMineOrder) return null;
  return <Locate className="h-4 text-blue-500" />;
};

const BadgePrice = () => {
  const { order } = useOrderContext();

  if (order.orderType === "market") {
    return <Badge>Market</Badge>;
  } else {
    return <p className="font-bold text-lg">${order.price}</p>;
  }
};

export { Flex, Row, Name, Indicator, BadgePrice };
