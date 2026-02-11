import React, { Fragment } from "react";
import {render, Box, Text } from "ink";

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

const Item = ({children, length}: React.PropsWithChildren<{length: number}>) => {
  return (
    <Box justifyContent="flex-end" width={length}>
      <Text wrap='truncate'>{ children}</Text>
    </Box>
  )
}

const Columns = [
  {
    Key: 'productName',
    Header: 'Product',
    Type: 'string',
    Length: 17
  },
  {
    Key: 'buyQty',
    Header: 'Buy Qty',
    Type: 'number',
    Length: 10
  },
  {
    Key: 'buyAmount',
    Header: '$ Buy',
    Type: 'number',
    Length: 10
  },
  {
    Key: 'citySellQty',
    Header: 'City Sell',
    Type: 'number',
    Length: 10
  },
  {
    Key: 'citySellAmount',
    Header: '$ City',
    Type: 'number',
    Length: 10
  },
  {
    Key: 'sellQty',
    Header: 'Total Sale',
    Type: 'number',
    Length: 12
  },
  {
    Key: 'sellAmount',
    Header: '$ Total',
    Type: 'number',
    Length: 12
  },
  {
    Key: 'profit',
    Header: 'Profit',
    Type: 'number',
    Length: 12
  }
]

const Header = () => {
  return (
    <Box>
      {Columns.map((column) => (
        <Item key={column.Key} length={column.Length}>
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
            <Item key={column.Key} length={column.Length}>
              {column.Type === 'number' ? Number(record[column.Key]).toFixed(0) : record[column.Key]}
            </Item>
          ))}
        </Box>
      ))}
    </Fragment>
  );
};

render(<Table/>)
