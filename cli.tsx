import {render, Text, Static} from 'ink';
import { AnalyticsView } from './src/analytics/ui';
import { PRODUCTS } from './src/server';

const Example = () => (
	<>
		<Text color="green">I am green</Text>
		<Text color="black" backgroundColor="white">
			I am black on white
		</Text>
		<Text color="#ffffff">I am white</Text>
		<Text bold>I am bold</Text>
		<Text italic>I am italic</Text>
		<Text underline>I am underline</Text>
		<Text strikethrough>I am strikethrough</Text>
		<Text inverse>I am inversed</Text>
	</>
);

const products = Object.values(PRODUCTS);
const nodes = products.map(it => (
  <AnalyticsView key={it.Id} {...it} />
))

const App = () => {
  return nodes;
}

render(<App />, {concurrent: true});
