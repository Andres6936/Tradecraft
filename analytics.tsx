import {render, Text, Static} from 'ink';
import { AnalyticsView } from './src/analytics/ui';
import { ProductsAnalytics } from './src/server';

const products = Object.values(ProductsAnalytics);
const nodes = products.map(it => (
  <AnalyticsView key={it.Id} {...it} />
))

const App = () => {
  return nodes;
}

render(<App />, {concurrent: true});
