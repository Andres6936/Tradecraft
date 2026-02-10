import { transferWarehouse } from "../src/api";
import { QuestionIsFactoryInspectTransfer } from "../src/server";

const Cookies = process.env.COOKIES || "";
const regions = [1, 2, 3, 4, 5, 6];

for (const regionId of regions) {
  console.log(`Processing region: ${regionId}`);
  const stream = await fetch(`https://playtradecraft.com/api/state?regionId=${regionId}`, {
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
        const amount = Math.floor(((percentageExceed + factory.Offset) / 100) * capacity);
        if (amount < 1) continue;

        console.log(`Tolerance exceeded by ${percentageExceed.toFixed(1)}%, moving ${amount} products`);
        await transferWarehouse({
          regionId: tile.regionId,
          x: tile.x,
          y: tile.y,
          id: tile.id,
          amount,
        });
      }
    }

    await Bun.sleep(777);
    console.log("----------")
  }
  await Bun.sleep(777);
}
