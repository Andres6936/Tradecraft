import { getFileSink } from "@logtape/file";
import { configure, getConsoleSink } from "@logtape/logtape";
import { getPrettyFormatter } from "@logtape/pretty";
import { getOpenTelemetrySink } from "@logtape/otel";

const isProduction = process.env.NODE_ENV === "production";
const PosthogTokenProject = process.env.POSTHOG_TOKEN_PROJECT || "";

const defaultLogger = isProduction ? "otel" : "console";

await configure({
  sinks: {
    otel: getOpenTelemetrySink({
      serviceName: "Tradecraft",
      otlpExporterConfig: {
        url: "https://us.i.posthog.com/i/v1/logs",
        headers: {
          Authorization: `Bearer ${PosthogTokenProject}`,
        },
      },
    }),
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
    {
      category: "trader",
      lowestLevel: "debug",
      sinks: [defaultLogger, "file"],
    },
    { category: "buyer", lowestLevel: "debug", sinks: [defaultLogger, "file"] },
    {
      category: "seller",
      lowestLevel: "debug",
      sinks: [defaultLogger, "file"],
    },
    {
      category: "transfer",
      lowestLevel: "debug",
      sinks: [defaultLogger, "file"],
    },
  ],
});
