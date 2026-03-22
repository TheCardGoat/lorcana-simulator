import { describe, expect, it } from "bun:test";
import {
  AUTOMATED_ACTION_STRATEGIES,
  DEFAULT_AUTOMATED_ACTION_STRATEGY_ID,
  getAutomatedActionStrategyOption,
} from "./strategy-registry";

describe("automated action strategy registry", () => {
  it("exports the current selectable engine strategies", () => {
    expect(AUTOMATED_ACTION_STRATEGIES.map((option) => option.id)).toEqual([
      "default-lore-race",
      "legacy-lore-race",
      "board-control-lore-race",
      "aggressive-board-control-lore-race",
    ]);
  });

  it("uses unique strategy ids", () => {
    const ids = AUTOMATED_ACTION_STRATEGIES.map((option) => option.id);

    expect(new Set(ids).size).toBe(ids.length);
  });

  it("resolves the default strategy id to a registry entry", () => {
    const defaultOption = getAutomatedActionStrategyOption(DEFAULT_AUTOMATED_ACTION_STRATEGY_ID);

    expect(defaultOption).toBeDefined();
    expect(defaultOption?.strategy.name).toBe(DEFAULT_AUTOMATED_ACTION_STRATEGY_ID);
  });
});
