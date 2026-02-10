import { QuestionIsFactoryInspectTransfer } from "../src/server";

const transfer = async (args: {
  regionId: number,
  x: number,
  y: number,
  id: number,
  amount: number,
}) => {
  const Cookies = process.env.COOKIES || "";

  const response = await fetch("https://playtradecraft.com/api/transfer-to-main", {
    method: "POST",
    body: JSON.stringify(args),
    headers: {
      "Content-Type": "application/json",
      Cookie: Cookies,
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36 Edg/144.0.0.0",
    },
  });
  const stream = await response.json();
  if (response.ok && stream.ok === true) return;
  console.error("Error transferring item", stream);
};

const Cookies = process.env.COOKIES || "";

const stream = await fetch("https://playtradecraft.com/api/state?regionId=3", {
  headers: {
    Cookie: Cookies,
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36 Edg/144.0.0.0",
  },
});
const payload = await stream.json();
const tiles = payload.tiles;

for (const tile of tiles) {
  const stored = tile.localStorage.storedQty;
  const capacity = tile.localStorage.capacity;
  const percentage = (stored / capacity) * 100;

  console.log(
    `${tile.productKey} (${tile.kind}) - ${stored.toFixed(1)}/${capacity} (${percentage.toFixed(1)}%)`,
  );

  const [factory, isFactoryInspect] = QuestionIsFactoryInspectTransfer({ key: tile.productKey, kind: tile.kind })
  if (isFactoryInspect) {
    if (percentage > factory.Tolerance) {
      const percentageExceed = percentage - factory.Tolerance;
      const amount = Math.floor((percentageExceed / 100) * capacity);
      if (amount < 1) continue;

      console.log(`Tolerance exceeded by ${percentageExceed.toFixed(1)}%, moving ${amount} products`);
      await transfer({
        regionId: tile.regionId,
        x: tile.x,
        y: tile.y,
        id: tile.id,
        amount,
      });
    }
  }

  console.log("----------")
}
