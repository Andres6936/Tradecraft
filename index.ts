// Configure logging
import "~/logger";

// Set DATA_PATH FIRST
import { mkdirSync } from "fs";
mkdirSync("./brain", { recursive: true });
process.env.DATA_PATH = "./brain/SQLito.sqlite";

import { QueueGroup, Queue, Worker } from "bunqueue/client";
import { main as executeTransfer } from "~/transfer";
import { buyer } from "~/trader/buyer";
import { seller } from "~/trader/seller";

type JobTransferDepositType = {};

// Both Queue and Worker must have embedded: true
const queueTransfer = new Queue<JobTransferDepositType>("transfer", {
  embedded: true,
});

await queueTransfer.upsertJobScheduler("transfer-to-deposit", {
  // Set the job to run every hour
  pattern: "0 * * * *",
});

const workerTransfer = new Worker<JobTransferDepositType>(
  "transfer",
  async (job) => {
    try {
      await executeTransfer();
      return { statusCode: 200 };
    } catch (error) {
      console.error("Error executing transfer:", error);
      return { statusCode: 500 };
    }
  },
  { embedded: true },
);

const traderQueue = new QueueGroup("trader");

const traderBuyer = traderQueue.getQueue("buyer", { embedded: true });
await traderBuyer.upsertJobScheduler('buyer-job', {
  // Set the job to run every 37 seconds
  pattern: '*/37 * * * * *'
})

const traderSeller = traderQueue.getQueue("seller", { embedded: true });
await traderSeller.upsertJobScheduler('seller-job', {
  // Set the job to run every 45 seconds
  pattern: '*/77 * * * * *'
});

const workerBuyer = traderQueue.getWorker(
  "buyer",
  async () => {
    await buyer();
    return { statusCode: 200 };
  },
  { embedded: true },
);

const workerSeller = traderQueue.getWorker(
  "seller",
  async () => {
    await seller();
    return { statusCode: 200 };
  },
  { embedded: true },
);
