import { Label } from "~/components/ui/label";
import { Switch } from "~/components/ui/switch";
import { Spinner } from "~/components/ui/spinner";

import { cn } from "~/lib/utils";
import { Row } from "~/features/main/components/view";
import { useTraderContext } from "../../../context/use-trader";

const Field = ({ children, title, className }: React.PropsWithChildren<{title: string, className?: string}>) => {
  return (
    <Label>
      <p className={cn("text-muted-foreground text-xs", className)}>{title}</p>
      {children}
    </Label>
  );
};

const SkeletonLoading = () => {
  return (
    <Row>
      <Field title="Loading" className="text-yellow-500">
        <Spinner className="text-yellow-500"/>
      </Field>
      <Field title="My Orders">
        <Switch disabled={true} />
      </Field>
    </Row>
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
    <Row>
      {context.isFetching && (
        <Field title="Refreshing" className="text-yellow-500">
          <Spinner className="text-yellow-500"/>
        </Field>
      )}
      <Field title="My Orders">
        <Switch checked={isOrdersMineOnly} onCheckedChange={onChangeOrdersMineOnly} />
      </Field>
    </Row>
  );
};

export { ActionsMineOnly };
