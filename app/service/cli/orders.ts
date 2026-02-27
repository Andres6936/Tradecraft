import '~/logger'
import { main as cancelOrphansOrders } from '~/orders/cancel/orphans';

await cancelOrphansOrders();
