import { Button } from "~/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";

const Actions = () => {
  return (
    <div className="flex gap-2 items-center justify-between">
      <ToggleGroup variant="outline" type="single">
        <ToggleGroupItem value="buy">Buy</ToggleGroupItem>
        <ToggleGroupItem value="sell">Sell</ToggleGroupItem>
      </ToggleGroup>

      <ToggleGroup variant="outline" type="single">
        <ToggleGroupItem value="buy">Market</ToggleGroupItem>
        <ToggleGroupItem value="sell">Limit</ToggleGroupItem>
      </ToggleGroup>

      <Button>Order</Button>
    </div>
  );
};

export { Actions };
