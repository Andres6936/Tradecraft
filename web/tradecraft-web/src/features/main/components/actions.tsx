import { Button } from "~/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";
import { useTraderContext } from "../context/use-trader";

const Root = (props: React.PropsWithChildren<{}>) => (
  <div className="flex gap-2 items-center justify-between" {...props} />
);

const SkeletonLoading = () => {
  return (
    <Root>
      <ToggleGroup type="single" disabled={true}>
        <ToggleGroupItem value="buy">Buy</ToggleGroupItem>
        <ToggleGroupItem value="sell">Sell</ToggleGroupItem>
      </ToggleGroup>

      <ToggleGroup type="single" disabled={true}>
        <ToggleGroupItem value="limit">Limit</ToggleGroupItem>
        <ToggleGroupItem value="market">Market</ToggleGroupItem>
      </ToggleGroup>

      <Button disabled={true}>Order</Button>
    </Root>
  );
};

const Actions = () => {
  const context = useTraderContext();

  if (context.isLoading) {
    return <SkeletonLoading />;
  }

  if (context.error) {
    return <p>Error: {context.error.message}</p>;
  }

  const { side, onChangeSide, orderType, onChangeOrderType } = context;

  return (
    <Root>
      <ToggleGroup
        variant="outline"
        type="single"
        value={side}
        onValueChange={(value) => onChangeSide(value as "buy" | "sell")}
      >
        <ToggleGroupItem value="buy">Buy</ToggleGroupItem>
        <ToggleGroupItem value="sell">Sell</ToggleGroupItem>
      </ToggleGroup>

      <ToggleGroup
        variant="outline"
        type="single"
        value={orderType}
        onValueChange={(value) =>
          onChangeOrderType(value as "limit" | "market")
        }
      >
        <ToggleGroupItem value="limit">Limit</ToggleGroupItem>
        <ToggleGroupItem value="market">Market</ToggleGroupItem>
      </ToggleGroup>

      <Button>Order</Button>
    </Root>
  );
};

export { Actions };
