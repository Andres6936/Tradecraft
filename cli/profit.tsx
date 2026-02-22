import type { GetProductDailyPLTypes } from "~/types/d";
import React, { Fragment } from "react";
import { render, Box, Text } from "ink";

const Cookies = process.env.COOKIES || "";

const stream = await fetch(`https://playtradecraft.com/api/product-daily-pnl`, {
  headers: {
    "Content-Type": "application/json",
    Cookie: Cookies,
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36 Edg/144.0.0.0",
  },
});

const result = (await stream.json()) as GetProductDailyPLTypes;
const records = result.records
  .map((it) => ({
    ...it,
    AverageMarketPrice: it.sellAmount / (it.sellQty || 1),
    AverageCityPrice: it.citySellAmount / (it.citySellQty || 1),
    TotalSaleAmount: it.sellQty + it.citySellQty,
    TotalSaleMoney: it.sellAmount + it.citySellAmount,
  }))
  .sort((a, b) => b.profit - a.profit)
  // View only the products where profit is greater than 10,000 or less than 0
  .filter((it) => it.profit > 10_000 || it.profit < 0);

const padded = (value: number | string, padLength: number) =>
  String(value).padStart(padLength, " ");

type PropsItem = {
  length: number;
  color: string;
};

const Item = ({ children, ...props }: React.PropsWithChildren<PropsItem>) => {
  return (
    <Box justifyContent="flex-end" width={props.length}>
      <Text color={props.color} wrap="truncate">
        {children}
      </Text>
    </Box>
  );
};

// Function that short the number to show a variant with a suffix
// Example: Values with more of three digits 1.000 short to 1K, 1.000.000 to 1M
const shortNumber = (value: number) => {
  const isNegative = value < 0;
  const absValue = Math.abs(value);

  let result: string;

  if (absValue >= 1000000) {
    result = `${(absValue / 1000000).toFixed(1)}M`;
  } else if (absValue >= 1000) {
    result = `${(absValue / 1000).toFixed(1)}K`;
  } else if (absValue >= 1) {
    result = absValue.toFixed(0);
  } else if (absValue === 0) {
    result = "0";
  } else {
    result = absValue.toFixed(1);
  }

  return isNegative ? `-${result}` : result;
};

const Columns = [
  {
    Key: "productName",
    Header: "Product",
    Type: "string",
    Length: 17,
    Color: "black",
  },
  {
    Key: "buyAmount",
    Header: "$ Buy",
    Type: "number",
    Length: 8,
    Color: "black",
  },
  {
    Key: "buyQty",
    Header: "Buy Qty",
    Type: "number",
    Length: 8,
    Color: "black",
  },
  {
    Key: "sellAmount",
    Header: "$ Market",
    Type: "number",
    Length: 10,
    Color: "blue",
  },
  {
    Key: "sellQty",
    Header: "Market Sale",
    Type: "number",
    Length: 12,
    Color: "blue",
  },
  {
    Key: "AverageMarketPrice",
    Header: "Avg Market",
    Type: "number",
    Length: 12,
    Color: "#FF7518",
  },
  {
    Key: "citySellAmount",
    Header: "$ City",
    Type: "number",
    Length: 10,
    Color: "#663399",
  },
  {
    Key: "citySellQty",
    Header: "City Sell",
    Type: "number",
    Length: 10,
    Color: "#663399",
  },
  {
    Key: "AverageCityPrice",
    Header: "Avg City",
    Type: "number",
    Length: 10,
    Color: "#FF1DCE",
  },
  {
    Key: "TotalSaleAmount",
    Header: "Total Sale",
    Type: "number",
    Length: 12,
    Color: "green",
  },
  {
    Key: "TotalSaleMoney",
    Header: "$ Total",
    Type: "number",
    Length: 10,
    Color: "green",
  },
  {
    Key: "profit",
    Header: "Profit",
    Type: "number",
    Length: 10,
    Color: "green",
  },
];

const Header = () => {
  return (
    <Box
      borderStyle="classic"
      borderBottom
      borderRight={false}
      borderLeft={false}
    >
      {Columns.map((column) => (
        <Item key={column.Key} length={column.Length} color={column.Color}>
          {column.Header}
        </Item>
      ))}
    </Box>
  );
};

const Value = (props: { column: (typeof Columns)[number]; record: any }) => {
  const { column, record } = props;
  const value = record[column.Key];
  const valueAsString = column.Type === "number" ? shortNumber(value) : value;

  const color =
    column.Type === "number"
      ? value < 0
        ? "red"
        : column.Color
      : column.Color;

  return (
    <Item key={column.Key} length={column.Length} color={color}>
      {valueAsString}
    </Item>
  );
};

const Table = () => {
  return (
    <Fragment>
      <Header />

      {records.map((record) => (
        <Box key={record.productName}>
          {Columns.map((column) => (
            <Value key={column.Key} column={column} record={record} />
          ))}
        </Box>
      ))}
    </Fragment>
  );
};

render(<Table />);
