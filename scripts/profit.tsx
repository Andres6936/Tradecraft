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

const result = await stream.json();
const records = result.records;

const padded = (value: number | string, padLength: number) =>
  String(value).padStart(padLength, " ");

// console.log(
//   `${padded("Product", 17)} - ${padded("Buy Qty", 7)} - ${padded("Buy $", 9)} - ${padded("City Sell", 9)} - ${padded("City $", 7)} - ${padded("Total Sale", 9)} - ${padded("Total $", 10)} - ${padded("Profit", 9)}`,
// );

// for (const record of records) {
//   console.log(
//     `${padded(record.productName, 17)} - ${padded(record.buyQty.toFixed(0), 7)} - ${padded(record.buyAmount.toFixed(0), 8)}$ - ${padded(record.citySellQty.toFixed(0), 9)} - ${padded(record.citySellAmount.toFixed(0), 6)}$ - ${padded(record.sellQty.toFixed(0), 9)} - ${padded(record.sellAmount.toFixed(0), 9)} - ${padded(record.profit.toFixed(0), 9)}$`,
//   );
// }

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
  } else {
    result = absValue.toFixed(0);
  }

  return isNegative ? `-${result}` : result;
}

const Columns = [
  {
    Key: "productName",
    Header: "Product",
    Type: "string",
    Length: 17,
    Color: "black",
  },
  {
    Key: "buyQty",
    Header: "Buy Qty",
    Type: "number",
    Length: 10,
    Color: "black",
  },
  {
    Key: "buyAmount",
    Header: "$ Buy",
    Type: "number",
    Length: 10,
    Color: "black",
  },
  {
    Key: "citySellQty",
    Header: "City Sell",
    Type: "number",
    Length: 10,
    Color: "#663399",
  },
  {
    Key: "citySellAmount",
    Header: "$ City",
    Type: "number",
    Length: 10,
    Color: "#663399",
  },
  {
    Key: "sellQty",
    Header: "Total Sale",
    Type: "number",
    Length: 12,
    Color: "green",
  },
  {
    Key: "sellAmount",
    Header: "$ Total",
    Type: "number",
    Length: 12,
    Color: "green",
  },
  {
    Key: "profit",
    Header: "Profit",
    Type: "number",
    Length: 12,
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

const Table = () => {
  return (
    <Fragment>
      <Header />

      {records.map((record) => (
        <Box key={record.id}>
          {Columns.map((column) => (
            <Item key={column.Key} length={column.Length} color={column.Color}>
              {column.Type === "number"
                ? shortNumber(record[column.Key])
                : record[column.Key]}
            </Item>
          ))}
        </Box>
      ))}
    </Fragment>
  );
};

render(<Table />);
