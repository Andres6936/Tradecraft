import { configureSync, getConsoleSink } from "@logtape/logtape";
import { getPrettyFormatter } from "@logtape/pretty";

configureSync({
  sinks: {
    console: getConsoleSink({
      formatter: getPrettyFormatter({
        timestamp: "time-tz",
      }),
    }),
  },
  loggers: [
    { category: "trader", lowestLevel: "debug", sinks: ["console"] },
    { category: "buyer", lowestLevel: "debug", sinks: ["console"] },
    { category: "seller", lowestLevel: "debug", sinks: ["console"] },
    { category: "transfer", lowestLevel: "debug", sinks: ["console"] },
  ],
});
