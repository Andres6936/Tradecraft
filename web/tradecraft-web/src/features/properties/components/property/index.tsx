import React, { useMemo } from "react";
import { capitalize } from "radashi";
import { type RowComponentProps } from "react-window";
import { TilesType } from "@trader/api";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Flex, FlexEnd, Row, Col } from "~/features/main/components/view";

const Property = ({index, style, tiles}: RowComponentProps<{ tiles: TilesType[] }>) => {
  const model = useMemo(() => tiles[index]!, [index, tiles]);

  return (
    <section className="flex flex-col gap-0.5 border rounded py-2 px-3 dark:hover:bg-[#00000033] hover:bg-[#00000007]" style={style}>
      <Flex>
        <p className="font-bold text-lg leading-none">
          {model.productKey.replaceAll('_', ' ').split(' ').map(capitalize).join(' ')}
        </p>
        <Row>
          <Badge variant='outline'>Level: {model.level}</Badge>
          <Badge className="bg-[var(--color-lime-500)]">{model.busy ? "Working" : "Stopped"}</Badge>
        </Row>
      </Flex>

      <Row className="justify-between">
        <Col>
          <p className="text-muted-foreground text-xs">
            Inventory: {model.localStorage.storedQty.toFixed(0)}/{model.localStorage.capacity.toFixed(0)}
          </p>
          <p className="text-muted-foreground text-xs">
            Hourly Production: 166.6
          </p>
        </Col>
        <FlexEnd className="gap-2">
          <Button size='xs'>
            Upgrade
          </Button>
          <Button size='xs'>
            Transfer
          </Button>
        </FlexEnd>
      </Row>
    </section>
  );
};

export {Property};
