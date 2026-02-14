import { getFileSink } from "@logtape/file";
import { configure, getConsoleSink } from "@logtape/logtape";
import { getPrettyFormatter } from "@logtape/pretty";

await configure({
  sinks: {
    file: getFileSink("analytics.log", {
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
