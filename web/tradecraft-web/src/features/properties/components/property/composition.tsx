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
import { sleep } from "radashi";
import { upgrade } from "~/api";
import { useQueryClient } from "@tanstack/react-query";

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
import { Spinner } from "~/components/ui/spinner";
import { Flex, FlexEnd, Row, Col } from "~/features/main/components/view";

import { usePropertyContext } from "./context";
import { usePropertiesContext } from "../../context/properties-context";
import { useDispatchAction } from "~/hooks/use-dispatch-action";

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

const LevelIndicator = () => {
  const { property } = usePropertyContext();

  const bonus = (property.level - 1) * 10;

  if (property.kind === "factory") {
    return (
      <Badge variant='outline'>Level: {property.level} <span className="text-purple-500">+{bonus}%</span></Badge>
    )
  }

  return null;
}

const Actions = () => {
  return (
    <ButtonGroup>
      <ActionUpgrade />
      <Button size='xs'>
        Transfer
      </Button>
      <MoreActionButton />
    </ButtonGroup>
  );
}

const ActionUpgrade = () => {
  const context = usePropertiesContext()
  const { property } = usePropertyContext();
  const { isLoading, dispatch } = useDispatchAction();

  const queryClient = useQueryClient();

  const onPress = async () => {
    if (context.isLoading || context.error || isLoading) return;
    await dispatch(async () => {
      await upgrade({ tileId: property.id }, { token: context.token })
      queryClient.invalidateQueries({ queryKey: ["/server/action/getTiles"] })
      await sleep(1000)
    })
  }

  if (property.kind !== "factory") return null;

  const isDisabled = isLoading || property.upgrading;

  return (
    <Button size='xs' onClick={onPress} disabled={isDisabled}>
      {isDisabled && <Spinner data-icon="inline-start"/> }
      {isDisabled ? "Upgrading" : "Upgrade"}
    </Button>
  )
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

export { InventoryIndicator, LevelIndicator, Actions, MoreActionButton };
