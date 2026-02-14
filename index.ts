// Configure logging
import "~/logger";

import { Queue, Worker } from "bunqueue/client";
import { main as executeTransfer } from "~/transfer";
import { buyer } from "~/trader/buyer";
import { seller } from "~/trader/seller";
import { getLogger } from "@logtape/logtape";

const logger = getLogger(['trader'])

// --- Transfer Queue and Worker ----

const queueTransfer = new Queue("transfer", {
  embedded: true,
});
queueTransfer.setStallConfig({
  enabled: false,
});

await queueTransfer.upsertJobScheduler("transfer-to-deposit", {
  // Set the job to run every hour
  pattern: "0 * * * *",
});

const workerTransfer = new Worker(
  "transfer",
  async (job) => {
    try {
      logger.info('Executing transfer')
      await executeTransfer();
      logger.info('Transfer executed successfully')
      return { statusCode: 200 };
    } catch (error) {
      console.error("Error executing transfer:", error);
      return { statusCode: 500 };
    }
  },
  { embedded: true },
);

// --- Buyer Queue and Worker ----

const queueBuyer = new Queue("buyer", { embedded: true });
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
    logger.info('Executing buyer')
    await buyer();
    logger.info('Buyer executed successfully')
    return { statusCode: 200 };
  },
  { embedded: true },
);

// --- Seller Queue and Worker ----

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
    logger.info('Executing seller')
    await seller();
    logger.info('Seller executed successfully')
    return { statusCode: 200 };
  },
  { embedded: true },
);
