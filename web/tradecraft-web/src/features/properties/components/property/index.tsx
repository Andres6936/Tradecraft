import React, { useMemo } from "react";
import { capitalize } from "radashi";
import { type RowComponentProps } from "react-window";

import { TilesType } from "@trader/api";
import { Flex, Row } from "~/features/main/components/view";
import { Badge } from "~/components/ui/badge";

const Property = ({index, style, tiles}: RowComponentProps<{ tiles: TilesType[] }>) => {
  const model = useMemo(() => tiles[index]!, [index, tiles]);

  return (
    <section className="flex flex-col gap-0.5 border rounded py-2 px-3 dark:hover:bg-[#00000033] hover:bg-[#00000007]" style={style}>
      <Flex>
        <p className="font-bold text-lg leading-none">
          {model.productKey.replaceAll('_', ' ').split(' ').map(capitalize).join(' ')}
        </p>
        <Badge>{model.busy ? "Working" : "Stopped"}</Badge>
      </Flex>
      <Flex>
        <p className="text-muted-foreground text-xs">Level: { model.level}</p>
      </Flex>
    </section>
  );
};

export {Property};
