import React, { useMemo } from "react";
import { type RowComponentProps } from "react-window";

import { TilesType } from "@trader/api";

const Property = ({index, style, tiles}: RowComponentProps<{ tiles: TilesType[] }>) => {
  const model = useMemo(() => tiles[index]!, [index, tiles]);

  return (
    <div style={style}>
      <p>{model.productKey} - {model.kind}</p>
    </div>
  );
};

export {Property};
