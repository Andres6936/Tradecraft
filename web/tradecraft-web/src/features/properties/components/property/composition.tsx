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
import { Button } from "~/components/ui/button";
import { Flex, FlexEnd, Row, Col } from "~/features/main/components/view";

import { usePropertyContext } from "./context";

const InventoryIndicator = () => {
  const { property } = usePropertyContext();

  return (
    <Row className="gap-1">
      <Package className="h-3 w-3 text-muted-foreground" />
      <p className="text-muted-foreground text-xs">
        <span className="text-[var(--color-lime-500)]">{property.localStorage.storedQty.toFixed(0)}</span>
        {' '}/{' '}
        <span className="text-[var(--color-orange-400)]">{property.localStorage.capacity.toFixed(0)}</span>
      </p>
    </Row>
  )
}

const Actions = () => {
  return (
    <ButtonGroup>
      <Button size='xs'>
        Upgrade
      </Button>
      <Button size='xs'>
        Transfer
      </Button>
      <MoreActionButton />
    </ButtonGroup>
  );
}

const MoreActionButton = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon-xs" aria-label="More Options">
          <MoreHorizontalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <IdCardLanyard />
            Employees
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <BookUp />
            List for Rent
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem variant="destructive">
            <CirclePause />
            Stop
          </DropdownMenuItem>
          <DropdownMenuItem variant="destructive">
            <Trash2 />
            Demolish
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { InventoryIndicator, Actions, MoreActionButton };
