import React from "react";
import { capitalize } from "radashi";

import type { ExternOrderType } from "~/types/d";
import { Badge } from "~/components/ui/badge";

const Order = ({ model }: { model: ExternOrderType }) => {
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
    <section className="border rounded py-2 px-3">
      <div className="flex items-center justify-between">
        <p className="font-bold text-lg">
          {side} - {model.productName}
        </p>
        {CompBadge}
      </div>
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground text-xs">
          {model.qty} {model.unit} - {regionName}
        </p>
        <p className="text-muted-foreground text-xs">49s ago</p>
      </div>
    </section>
  );
};

export { Order };
