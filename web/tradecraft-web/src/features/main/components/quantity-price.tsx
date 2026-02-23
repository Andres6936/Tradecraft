import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "~/components/ui/input-group";
import { Input } from "~/components/ui/input";
import { useTraderContext } from "../context/use-trader";

const Root = (props: React.PropsWithChildren<{}>) => (
  <div className="flex gap-2 items-center justify-between" {...props} />
);

const Row = (props: React.PropsWithChildren<{}>) => (
  <div className="flex flex-row gap-2 items-center" {...props} />
);

const Quantity = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <Row>
      <p className="text-muted-foreground text-xs">Quantity</p>
      <InputGroup>
        {children}
        <InputGroupAddon align="inline-end">
          <InputGroupButton>Max</InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </Row>
  );
};

const Price = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <Row>
      <p className="text-muted-foreground text-xs">Price</p>
      {children}
    </Row>
  );
};

const SkeletonLoading = () => {
  return (
    <Root>
      <Quantity>
        <InputGroupInput className="max-w-24" disabled={true} />
      </Quantity>
      <Price>
        <Input className="max-w-24" disabled={true} />
      </Price>
    </Root>
  );
};

const QuantityPrice = () => {
  const context = useTraderContext();

  if (context.isLoading) {
    return <SkeletonLoading />;
  }

  if (context.error) {
    return <p>Error: {context.error.message}</p>;
  }

  const {
    isAllProductSelected,
    quantity,
    onChangeQuantity,
    price,
    onChangePrice,
  } = context;

  return (
    <Root>
      <Quantity>
        <InputGroupInput
          type="number"
          value={isAllProductSelected ? 0 : quantity}
          onChange={(e) => onChangeQuantity(e.target.valueAsNumber)}
          className="max-w-24"
          min={1}
          disabled={isAllProductSelected}
        />
      </Quantity>
      <Price>
        <Input
          type="number"
          className="max-w-24"
          value={isAllProductSelected ? 0 : price}
          onChange={(e) => onChangePrice(e.target.valueAsNumber)}
          min={0}
          disabled={isAllProductSelected}
        />
      </Price>
    </Root>
  );
};

export { QuantityPrice };
