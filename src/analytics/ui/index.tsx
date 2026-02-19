import type { InstructionType, CategoryInstructionType } from "~/server";
import { AnalyticsProvider } from "./context";
import * as Comp from "./composition";

const AnalyticsView = (
  props: InstructionType & Required<Pick<CategoryInstructionType, "Analytics">>,
) => {
  return (
    <AnalyticsProvider
      Id={props.Id}
      Name={props.Name}
      Priority={props.Analytics.Priority}
    >
      <Comp.Root>
        <Comp.Header />
        <Comp.Balance />
      </Comp.Root>
    </AnalyticsProvider>
  );
};

export { AnalyticsView };
