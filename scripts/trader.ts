import { buyer } from "~/trader/buyer";
import { seller } from "~/trader/seller";

let isRunning = true;

while (isRunning) {
  console.log("Starting trader");

  console.log("Starting buyer");
  await buyer();
  // Wait for 37 seconds, the cycle is of 30 seconds
  await Bun.sleep(37000)

  console.log("Starting seller");
  await seller();
  // Wait for 2 minutes;
  await Bun.sleep(120000)
}
