import { AnalyticsProvider } from './context';
import * as Comp from './composition';
import type { ProductType } from '../../server';

const AnalyticsView = (props: ProductType) => {
  return (
    <AnalyticsProvider Id={props.Id} Name={props.Name} Priority={props.Priority}>
      <Comp.Root>
        <Comp.Header />
        <Comp.Balance/>
      </Comp.Root>
    </AnalyticsProvider>
  );
}

export { AnalyticsView, }
