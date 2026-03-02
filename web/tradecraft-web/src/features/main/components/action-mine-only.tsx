import { Label } from "~/components/ui/label";
import { Switch } from "~/components/ui/switch";

import { useTraderContext } from "../context/use-trader";

const Field = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <Label>
      <p className="text-muted-foreground text-xs">My Orders</p>
      {children}
    </Label>
  );
};

const SkeletonLoading = () => {
  return (
    <Field>
      <Switch disabled={true} />
    </Field>
  );
};

const ActionsMineOnly = () => {
  const context = useTraderContext();

  if (context.isLoading) {
    return <SkeletonLoading />;
  }

  if (context.error) {
    return <p>Error: {context.error.message}</p>;
  }

  const { isOrdersMineOnly, onChangeOrdersMineOnly } = context;

  return (
    <Field>
      <Switch checked={isOrdersMineOnly} onCheckedChange={onChangeOrdersMineOnly} />
    </Field>
  );
};

export { ActionsMineOnly };
