import { AnalyticsProvider } from './context';
import * as Comp from './composition';

const AnalyticsView = ({Id, Name}: {Id: number, Name: string}) => {
  return (
    <AnalyticsProvider Id={Id} Name={Name}>
      <Comp.Root>
        <Comp.Header />
        <Comp.Balance/>
      </Comp.Root>
    </AnalyticsProvider>
  );
}

export { AnalyticsView, }
