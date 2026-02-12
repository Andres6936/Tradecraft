import {render} from 'ink';
import { AnalyticsView } from '~/analytics/ui';
import { ProductsAnalytics } from '~/server';

const products = Object.values(ProductsAnalytics);
const nodes = products.map(it => (
  <AnalyticsView key={it.Id} {...it} />
))

const App = () => {
  return nodes;
}

render(<App />, {concurrent: true});
