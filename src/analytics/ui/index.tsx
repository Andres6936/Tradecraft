import { AnalyticsProvider } from "./context";
import * as Comp from "./composition";
import type { InstructionType, CategoryInstructionType } from "../../server";

const AnalyticsView = (
  props: InstructionType & Required<Pick<CategoryInstructionType, "Trader">>,
) => {
  return (
    <AnalyticsProvider
      Id={props.Id}
      Name={props.Name}
      Priority={props.Trader.Priority}
    >
      <Comp.Root>
        <Comp.Header />
        <Comp.Balance />
      </Comp.Root>
    </AnalyticsProvider>
  );
};

export { AnalyticsView };
