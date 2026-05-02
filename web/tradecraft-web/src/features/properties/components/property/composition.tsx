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

export { MoreActionButton };
