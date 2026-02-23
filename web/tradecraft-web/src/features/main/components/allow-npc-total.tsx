import { Checkbox } from "~/components/ui/checkbox";
import { Label } from "~/components/ui/label";
import { useTraderContext } from "../context/use-trader";

const AllowNpcTotal = () => {
  const context = useTraderContext();

  if (context.isLoading) {
    return <p>Loading...</p>;
  }

  if (context.error) {
    return <p>Error: {context.error.message}</p>;
  }

  const { isAllowNpc, onChangeAllowNpc, totalPrice } = context;

  return (
    <div className="flex gap-2 items-center justify-between">
      <Label>
        <Checkbox checked={isAllowNpc} onCheckedChange={onChangeAllowNpc} />
        Allow NPC Fill
      </Label>

      <div className="flex flex-row gap-2 items-center">
        <p className="text-muted-foreground text-xs">Total</p>
        <p>${totalPrice}</p>
      </div>
    </div>
  );
};

export { AllowNpcTotal };
