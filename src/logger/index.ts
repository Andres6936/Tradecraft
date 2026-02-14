import { getFileSink } from "@logtape/file";
import { configureSync, getConsoleSink } from "@logtape/logtape";
import { getPrettyFormatter } from "@logtape/pretty";

configureSync({
  sinks: {
    file: getFileSink("./logs/analytics.log", {
      lazy: true,
      bufferSize: 8192,
      flushInterval: 5000,
      nonBlocking: true,
    }),
    console: getConsoleSink({
      formatter: getPrettyFormatter({
        timestamp: "time-tz",
      }),
    }),
  },
  loggers: [
    { category: "trader", lowestLevel: "debug", sinks: ["console", 'file'] },
    { category: "buyer", lowestLevel: "debug", sinks: ["console", 'file'] },
    { category: "seller", lowestLevel: "debug", sinks: ["console", 'file'] },
    { category: "transfer", lowestLevel: "debug", sinks: ["console", 'file'] },
  ],
});
