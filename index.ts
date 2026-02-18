// Configure logging
import "~/logger";

import { Queue, Worker } from "bunqueue/client";
import { main as executeTransfer } from "~/transfer";
import { buyer } from "~/trader/buyer";
import { seller } from "~/trader/seller";
import { main as executeBuyerSupply } from "~/orders/buyer";
import { main as executeSellerInterval } from "~/orders/seller";
import { main as cancelOrdersOrphan } from "~/orders/cancel/orphans";

// --- Hourly Queue and Worker ----

const queueTransfer = new Queue("hourly", {
  embedded: true,
});
queueTransfer.setStallConfig({
  enabled: false,
});

await queueTransfer.upsertJobScheduler("run-every-hour", {
  // Set the job to run every hour
  pattern: "0 * * * *",
});

const workerTransfer = new Worker(
  "hourly",
  async (job) => {
    try {
      await executeTransfer();
      await executeSellerInterval();
      await executeBuyerSupply();
      return { statusCode: 200 };
    } catch (error) {
      console.error("Error executing hourly job:", error);
      return { statusCode: 500 };
    }
  },
  { embedded: true, useLocks: false },
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
    await buyer();
    return { statusCode: 200 };
  },
  { embedded: true, useLocks: false },
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
    await seller();
    return { statusCode: 200 };
  },
  { embedded: true, useLocks: false },
);

// --- Order Orphan Queue and Worker ----

const queueOrderOrphan = new Queue("order-orphan", { embedded: true });
queueOrderOrphan.setStallConfig({
  enabled: false,
});

await queueOrderOrphan.upsertJobScheduler("order-orphan-job", {
  // Set the job to run every 5 minutes
  pattern: "*/5 * * * *",
});

const workerOrderOrphan = new Worker(
  "order-orphan",
  async () => {
    await cancelOrdersOrphan();
    return { statusCode: 200 };
  },
  { embedded: true, useLocks: false },
);
