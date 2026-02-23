import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "~/components/ui/input-group";
import { Input } from "~/components/ui/input";
import { useTraderContext } from "../context/use-trader";

const QuantityPrice = () => {
  const {
    isAllProductSelected,
    quantity,
    onChangeQuantity,
    price,
    onChangePrice,
  } = useTraderContext();

  return (
    <div className="flex gap-2 items-center justify-between">
      <div className="flex flex-row gap-2 items-center">
        <p className="text-muted-foreground text-xs">Quantity</p>
        <div>
          <InputGroup>
            <InputGroupInput
              type="number"
              value={isAllProductSelected ? 0 : quantity}
              onChange={(e) => onChangeQuantity(e.target.valueAsNumber)}
              className="max-w-24"
              min={1}
              disabled={isAllProductSelected}
            />
            <InputGroupAddon align="inline-end">
              <InputGroupButton>Max</InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </div>
      </div>
      <div className="flex flex-row gap-2 items-center">
        <p className="text-muted-foreground text-xs">Price</p>
        <Input
          type="number"
          className="max-w-24"
          value={isAllProductSelected ? 0 : price}
          onChange={(e) => onChangePrice(e.target.valueAsNumber)}
          min={0}
          disabled={isAllProductSelected}
        />
      </div>
    </div>
  );
};

export { QuantityPrice };
