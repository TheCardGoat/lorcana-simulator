import { type LogLevel, configureSync, getConsoleSink, getLogger } from "@logtape/logtape";
import { prettyFormatter } from "@logtape/pretty";

let isConfigured = false;

function getConfiguredLogLevel(): LogLevel | null {
  const validLogLevels: Record<string, LogLevel> = {
    trace: "trace",
    debug: "debug",
    info: "info",
    warn: "warning",
    warning: "warning",
    error: "error",
    fatal: "fatal",
  };

  const processEnv = globalThis as { process?: { env?: Record<string, string | undefined> } };
  const value = processEnv.process?.env?.LOG_LEVEL?.toLowerCase();

  if (!value) {
    return null;
  }

  return validLogLevels[value] ?? null;
}

function getSimulatorLogLevel(): LogLevel {
  const configuredLogLevel = getConfiguredLogLevel();

  if (configuredLogLevel) {
    return configuredLogLevel;
  }

  return import.meta.env.DEV ? "debug" : "info";
}

export function configureCoreSimulatorLogging(): void {
  if (isConfigured) {
    return;
  }

  configureSync({
    sinks: {
      console: import.meta.env.PROD
        ? getConsoleSink()
        : getConsoleSink({ formatter: prettyFormatter }),
    },
    loggers: [
      {
        category: ["tcg"],
        lowestLevel: getSimulatorLogLevel(),
        sinks: ["console"],
      },
      {
        category: ["logtape"],
        lowestLevel: "error",
        sinks: ["console"],
      },
    ],
    reset: true,
  });

  isConfigured = true;
}

export const logger = getLogger(["tcg", "core-simulator"]);
