import React from "react";
import { capitalize } from "radashi";
import { Locate } from "lucide-react";

import { Badge } from "~/components/ui/badge";
import { useOrderContext } from "./context";
import { Button } from "~/components/ui/button";

const Root = (props: React.ComponentPropsWithRef<"section">) => (
  <section
    className="flex flex-col gap-0.5 border rounded py-2 px-3"
    {...props}
  />
);

const Flex = (props: React.PropsWithChildren<{}>) => (
  <div className="flex items-center justify-between" {...props} />
);

const FlexEnd = (props: React.PropsWithChildren<{}>) => (
  <div className="flex items-center justify-end" {...props} />
);

const Row = (props: React.PropsWithChildren<{}>) => (
  <div className="flex flex-row items-center gap-2" {...props} />
);

const Name = () => {
  const { order } = useOrderContext();

  const [side, color] = React.useMemo(() => {
    const capitalizeSide = capitalize(order.side);
    if (order.side === "buy") {
      return [capitalizeSide, "text-orange-400"];
    } else {
      return [capitalizeSide, "text-lime-400"];
    }
  }, [order]);

  return (
    <p className="font-bold text-lg leading-none">
      <span className={color}>{side}</span> - {order.productName}
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
    return <p className="font-bold text-lg leading-none">${order.price}</p>;
  }
};

const QuantityRegion = () => {
  const { order } = useOrderContext();

  const regionName = React.useMemo(() => {
    return order.regionName.split(" ").at(0);
  }, [order]);

  return (
    <p className="text-muted-foreground text-xs">
      {order.qty} {order.unit} - {regionName}
    </p>
  );
};

const ActionCancel = () => {
  const { isMineOrder } = useOrderContext();

  if (!isMineOrder) return null;

  const onPress = async () => {

  }

  return (
    <Button onClick={onPress} size="xs" variant="destructive">
      Cancel
    </Button>
  );
};

export {
  Root,
  Flex,
  FlexEnd,
  Row,
  Name,
  Indicator,
  BadgePrice,
  QuantityRegion,
  ActionCancel,
};
