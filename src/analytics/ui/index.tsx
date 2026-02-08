import { Text} from 'ink';
import { useContextAnalytics } from './context';

const AnalyticsView = () => {
  const context = useContextAnalytics();
  if (context.IsLoading) {
    return <Text>Loading...</Text>;
  }

  const { Id, Name, Avg, Min, Max } = context;

  return (
    <Text>
      {Name} ({Id}): Avg: {Avg}, Min: {Min}, Max: {Max}
    </Text>
  );
}

export { AnalyticsView, }
