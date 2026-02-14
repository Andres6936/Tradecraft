// Configure logging
import "~/logger";

import { QueueGroup, Queue, Worker } from "bunqueue/client";
import { main as executeTransfer } from "~/transfer";
import { buyer } from "~/trader/buyer";
import { seller } from "~/trader/seller";

type JobTransferDepositType = {};

// Both Queue and Worker must have embedded: true
const queueTransfer = new Queue<JobTransferDepositType>("transfer", {
  embedded: true,
});
queueTransfer.setStallConfig({
  enabled: false,
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

const queueBuyer = new Queue("buyer", {embedded: true});
queueBuyer.setStallConfig({
  enabled: false,
});

await queueBuyer.upsertJobScheduler("buyer-job", {
  // Set the job to run every 1 minute
  pattern: "*/1 * * * *",
});

const workerBuyer = new Worker(
  "buyer",
  async () => {
    await buyer();
    return { statusCode: 200 };
  },
  { embedded: true },
);

const queueSeller = new Queue("seller", { embedded: true });
queueSeller.setStallConfig({
  enabled: false,
});

await queueSeller.upsertJobScheduler("seller-job", {
  // Set the job to run every 2 minutes
  pattern: "*/2 * * * *",
});

const workerSeller = new Worker(
  "seller",
  async () => {
    await seller();
    return { statusCode: 200 };
  },
  { embedded: true },
);
