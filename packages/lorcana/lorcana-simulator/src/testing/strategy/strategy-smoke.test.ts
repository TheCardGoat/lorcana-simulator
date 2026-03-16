import { describe, expect, it } from "bun:test";
import { existsSync } from "node:fs";
import { join } from "node:path";
import {
  getStrategyArtifactRoot,
  runCuratedStrategySuite,
  strategyArtifactsExist,
} from "./strategy-suite.js";

const STRATEGY_SUITE_TIMEOUT_MS = process.env.CI ? 120_000 : 45_000;

describe("strategy evaluation suite", () => {
  it(
    "runs the curated matchup matrix without deadlocks and writes artifacts",
    () => {
      const summary = runCuratedStrategySuite();

      expect(summary.matches.length).toBe(12);
      expect(summary.matches.every((match) => match.deadlock === false)).toBe(true);
      expect(strategyArtifactsExist(summary)).toBe(true);
      expect(summary.matches.every((match) => match.endReason === "winner")).toBe(true);
      expect(existsSync(join(getStrategyArtifactRoot(), "run-summary.json"))).toBe(true);
    },
    { timeout: STRATEGY_SUITE_TIMEOUT_MS },
  );
});
