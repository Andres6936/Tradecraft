// Configure logging
import '~/logger';

// Set DATA_PATH FIRST
import { mkdirSync } from 'fs';
mkdirSync('./brain', { recursive: true });
process.env.DATA_PATH = './brain/SQLito.sqlite';

import { Queue, Worker } from 'bunqueue/client';
import {main as executeTransfer} from '~/transfer';

type JobTransferDepositType = {}

// Both Queue and Worker must have embedded: true
const queueTransfer = new Queue<JobTransferDepositType>('transfer', { embedded: true });
const workerTransfer = new Worker<JobTransferDepositType>('transfer', async (job) => {
  try {
    await executeTransfer();
    return { statusCode: 200 };
  } catch (error) {
    console.error('Error executing transfer:', error);
    return { statusCode: 500 };
  }
}, { embedded: true });

await queueTransfer.upsertJobScheduler('transfer-to-deposit', {
  // Set the job to run every hour
  pattern: '0 * * * *'
});
