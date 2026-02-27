import { render } from "ink";
import { AnalyticsView } from "~/analytics/ui";
import { getByCategory } from "~/server";

const products = getByCategory("Analytics");
const nodes = products.map((it) => <AnalyticsView key={it.Id} {...it} />);

const App = () => {
  return nodes;
};

render(<App />);
