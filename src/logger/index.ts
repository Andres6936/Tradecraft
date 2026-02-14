import { configureSync, getConsoleSink } from "@logtape/logtape";

configureSync({
  sinks: { console: getConsoleSink() },
  loggers: [
    { category: "trader", lowestLevel: "debug", sinks: ["console"] },
    { category: "transfer", lowestLevel: "debug", sinks: ["console"] }
  ]
});
