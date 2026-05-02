import React, { useMemo } from "react";
import { capitalize } from "radashi";
import { type RowComponentProps } from "react-window";
import { TilesType } from "@trader/api";
import {
  ArchiveIcon,
  ArrowLeftIcon,
  BookUp,
  CalendarPlusIcon,
  CirclePause,
  ClockIcon,
  IdCardLanyard,
  ListFilterIcon,
  MailCheckIcon,
  MoreHorizontalIcon,
  Package,
  ShelvingUnit,
  TagIcon,
  Trash2,
  Trash2Icon,
} from "lucide-react"

import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "~/components/ui/button-group"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
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
            <Row className="gap-1">
              <Package className="h-3 w-3 text-muted-foreground" />
              <p className="text-muted-foreground text-xs">
                <span className="text-[var(--color-lime-500)]">{model.localStorage.storedQty.toFixed(0)}</span>
                {' '}/{' '}
                <span className="text-[var(--color-orange-400)]">{model.localStorage.capacity.toFixed(0)}</span>
              </p>
            </Row>
          </Row>
          <Row>
            <Badge variant='outline'>Level: {model.level}</Badge>
            <Badge className="bg-[var(--color-lime-500)]">{model.busy ? "Working" : "Stopped"}</Badge>
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
