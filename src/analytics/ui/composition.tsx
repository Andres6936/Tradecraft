import React, { Fragment } from "react";
import { Box, Text } from "ink";
import { useContextAnalytics } from "./context";
import { getBalance, getBestSellOffer } from "../../api";

const Root = ({children}: React.PropsWithChildren<{}>) => {
  return (
    <Box flexDirection='column' paddingBottom={1}>
      {children}
    </Box>
  )
}

const Header = () => {
  const context = useContextAnalytics();
  if (context.IsLoading) {
    return <Text>Loading...</Text>;
  }

  const { Name, Avg, Min, Max } = context;

  return (
    <Text color='cyan'>
      {Name} ({Avg}) / Min: ({Min}) Max: ({Max})
    </Text>
  );
};

const Balance = () => {
  const context = useContextAnalytics();
  if (context.IsLoading) {
    return <Text>Loading...</Text>;
  }

  const { Orders } = context;
  const { BuyOrdersCount, SellOrdersCount, BuyAmountCount, SellAmountCount } =
    getBalance(Orders);

  return (
    <Fragment>
      <Text color='red'>Buy (Count): {BuyOrdersCount}</Text>
      <Text color='red'>Buy (Amount): {BuyAmountCount}</Text>
      <BestOfferSell
        SellOrdersCount={SellOrdersCount}
        SellAmountCount={SellAmountCount}
      />
    </Fragment>
  );
};

const BestOfferSell = (props: {
  SellOrdersCount: number;
  SellAmountCount: number;
}) => {
  const context = useContextAnalytics();
  if (context.IsLoading) {
    return <Text>Loading...</Text>;
  }

  const { Orders } = context;
  const { SellOrdersCount, SellAmountCount } = props;

  const bestOfferSell = getBestSellOffer(Orders);

  if (bestOfferSell.StatusCode === 201) {
    const { PriceMarketCount, Amount } = bestOfferSell;
    return (
      <Fragment>
        <Text>
          Sell (Count): {SellOrdersCount} / [Price Market: {PriceMarketCount} |
          Amount: {Amount}]
        </Text>
        <Text>Sell (Amount): {SellAmountCount}</Text>
      </Fragment>
    );
  } else if (bestOfferSell.StatusCode === 205) {
    const { BestSellOffer, Amount } = bestOfferSell;
    return (
      <Fragment>
        <Text>Sell (Count): {SellOrdersCount}</Text>
        <Text>
          Sell (Amount): {SellAmountCount} / [Best Price: {BestSellOffer} |
          Amount: {Amount}]
        </Text>
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <Text>Sell (Count): {SellOrdersCount}</Text>
        <Text>Sell (Amount): {SellAmountCount}</Text>
      </Fragment>
    );
  }
};

export { Root, Header, Balance };
