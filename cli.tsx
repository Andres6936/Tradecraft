import {render, Text, Static} from 'ink';
import { AnalyticsProvider } from './src/analytics/ui/context';
import { AnalyticsView } from './src/analytics/ui';

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

const App = () => {
  return (
    <AnalyticsProvider Id={25} Name={'Butter'}>
      <AnalyticsView />
    </AnalyticsProvider>
  )
}

render(<App />, {concurrent: true});
