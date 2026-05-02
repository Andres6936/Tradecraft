import React, { useMemo } from "react";
import { capitalize } from "radashi";
import { type RowComponentProps } from "react-window";
import { TilesType } from "@trader/api";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Flex, FlexEnd, Row, Col } from "~/features/main/components/view";
import { PropertyContext } from "./context";

import * as Comp from "./composition";

const Property = ({index, style, tiles}: RowComponentProps<{ tiles: TilesType[] }>) => {
  const model = useMemo(() => tiles[index]!, [index, tiles]);

  return (
    <PropertyContext.Provider value={{
      property: model,
    }}>
      <section className="flex flex-col gap-0.5 border rounded py-2 px-3 dark:hover:bg-[#00000033] hover:bg-[#00000007]" style={style}>
        <Flex>
          <Row className="gap-4">
            <p className="font-bold text-lg leading-none">
              {model.productKey.replaceAll('_', ' ').split(' ').map(capitalize).join(' ')}
            </p>
            <Comp.InventoryIndicator/>
          </Row>
          <Row>
            <Comp.LevelIndicator/>
            <Comp.WorkingIndicator/>
          </Row>
        </Flex>

        <Row className="justify-between">
          <Col>
            <p className="text-muted-foreground text-xs">
              Employees: 3/3
            </p>
            <p className="text-muted-foreground text-xs">
              Hourly Production: 166.6
            </p>
          </Col>
          <FlexEnd className="gap-2">
            <Comp.Actions/>
          </FlexEnd>
        </Row>
      </section>
    </PropertyContext.Provider>
  );
};

export {Property};
