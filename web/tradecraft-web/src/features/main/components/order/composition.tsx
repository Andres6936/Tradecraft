import React from "react";
import { capitalize } from "radashi";

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

export { Flex, Row, Name };
