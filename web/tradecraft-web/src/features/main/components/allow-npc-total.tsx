import { Checkbox } from "~/components/ui/checkbox";
import { Label } from "~/components/ui/label";

const AllowNpcTotal = () => {
  return (
    <div className="flex gap-2 items-center justify-between">
      <Label>
        <Checkbox />
        Allow NPC Fill
      </Label>

      <div className="flex flex-row gap-2 items-center">
        <p className="text-muted-foreground text-xs">Total</p>
        <p>$10.790.0</p>
      </div>
    </div>
  );
};

export { AllowNpcTotal };
