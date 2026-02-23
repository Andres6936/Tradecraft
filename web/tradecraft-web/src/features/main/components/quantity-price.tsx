import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "~/components/ui/input-group";
import { Input } from "~/components/ui/input";

const QuantityPrice = () => {
  return (
    <div className="flex gap-2 items-center justify-between">
      <div className="flex flex-row gap-2 items-center">
        <p className="text-muted-foreground text-xs">Quantity</p>
        <div>
          <InputGroup>
            <InputGroupInput className="max-w-24" />
            <InputGroupAddon align="inline-end">
              <InputGroupButton>Max</InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </div>
      </div>
      <div className="flex flex-row gap-2 items-center">
        <p className="text-muted-foreground text-xs">Price</p>
        <Input className="max-w-24" value="107.90" />
      </div>
    </div>
  );
};

export { QuantityPrice };
