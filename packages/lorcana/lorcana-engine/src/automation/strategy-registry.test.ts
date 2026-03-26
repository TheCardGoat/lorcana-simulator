import { describe, expect, it } from "bun:test";
import {
  AGGRESSIVE_BOARD_CONTROL_LORE_RACE_STRATEGY_ID,
  AUTOMATED_ACTION_STRATEGIES,
  BOARD_CONTROL_LORE_RACE_STRATEGY_ID,
  DEFAULT_AUTOMATED_ACTION_STRATEGY_ID,
  LEGACY_LORE_RACE_STRATEGY_ID,
  getAutomatedActionStrategyOption,
} from "./strategy-registry";

describe("automated action strategy registry", () => {
  it("exports the current selectable engine strategies", () => {
    expect(AUTOMATED_ACTION_STRATEGIES.map((option) => option.id)).toEqual([
      DEFAULT_AUTOMATED_ACTION_STRATEGY_ID,
      LEGACY_LORE_RACE_STRATEGY_ID,
      BOARD_CONTROL_LORE_RACE_STRATEGY_ID,
      AGGRESSIVE_BOARD_CONTROL_LORE_RACE_STRATEGY_ID,
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
