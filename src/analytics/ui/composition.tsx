import { Fragment } from 'react';
import { Text } from 'ink';
import { useContextAnalytics } from './context';
import { getBalance } from '../../api';

const Header = () => {
  const context = useContextAnalytics();
  if (context.IsLoading) {
    return <Text>Loading...</Text>;
  }

  const { Name, Avg, Min, Max } = context;

  return (
    <Text>
      {Name} ({Avg}) / Min: ({Min}) Max: ({Max})
    </Text>
  );
}

const Balance = () => {
  const context = useContextAnalytics();
  if (context.IsLoading) {
    return <Text>Loading...</Text>;
  }

  const { Orders } = context;
  const { BuyOrdersCount, SellOrdersCount, BuyAmountCount, SellAmountCount } = getBalance(Orders)

  return (
    <Fragment>
      <Text>Buy  (Count): {BuyOrdersCount}</Text>
      <Text>Buy (Amount): {BuyAmountCount}</Text>
    </Fragment>
  )
}

export {Header, Balance}
