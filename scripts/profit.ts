const Cookies = process.env.COOKIES || "";

const stream = await fetch(
  `https://playtradecraft.com/api/product-daily-pnl`,
  {
    headers: {
      "Content-Type": "application/json",
      Cookie: Cookies,
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36 Edg/144.0.0.0",
    },
  },
);

const result = await stream.json();
const records = result.records;

const padded = (value: number | string, padLength: number) => String(value).padStart(padLength, " ");

console.log(`${padded('Product', 17)} - ${padded('Buy Qty', 7)} - ${padded('Buy $', 9)} - ${padded('City Sell', 9)} - ${padded('City $', 7)} - ${padded('Total Sale',9)} - ${padded('Total $', 10)} - ${padded('Profit', 9)}`)

for (const record of records) {
  console.log(
    `${padded(record.productName, 17)} - ${padded(record.buyQty.toFixed(0), 7)} - ${padded(record.buyAmount.toFixed(0), 8)}$ - ${padded(record.citySellQty.toFixed(0), 9)} - ${padded(record.citySellAmount.toFixed(0), 6)}$ - ${padded(record.sellQty.toFixed(0), 9)} - ${padded(record.sellAmount.toFixed(0), 9)} - ${padded(record.profit.toFixed(0), 9)}$`,
  );
}
