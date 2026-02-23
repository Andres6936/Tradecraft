import { Checkbox } from "~/components/ui/checkbox";
import { Label } from "~/components/ui/label";
import { useTraderContext } from "../context/use-trader";
import { Skeleton } from "~/components/ui/skeleton";

const Root = (props: React.PropsWithChildren<{}>) => (
  <div className="flex gap-2 items-center justify-between" {...props} />
);

const AllowNpc = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <Label>
      {children}
      Allow NPC Fill
    </Label>
  );
};

const Total = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <div className="flex flex-row gap-2 items-center">
      <p className="text-muted-foreground text-xs">Total</p>
      {children}
    </div>
  );
};

const SkeletonLoading = () => {
  return (
    <Root>
      <AllowNpc>
        <Checkbox disabled={true} />
      </AllowNpc>

      <Total>
        <Skeleton className="h-5 w-10" />
      </Total>
    </Root>
  );
};

const AllowNpcTotal = () => {
  const context = useTraderContext();

  if (context.isLoading) {
    return <SkeletonLoading />;
  }

  if (context.error) {
    return <p>Error: {context.error.message}</p>;
  }

  const { isAllowNpc, onChangeAllowNpc, totalPrice } = context;

  return (
    <Root>
      <AllowNpc>
        <Checkbox checked={isAllowNpc} onCheckedChange={onChangeAllowNpc} />
      </AllowNpc>

      <Total>
        <p>${totalPrice}</p>
      </Total>
    </Root>
  );
};

export { AllowNpcTotal };
