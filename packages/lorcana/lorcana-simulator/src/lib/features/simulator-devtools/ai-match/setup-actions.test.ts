import { describe, expect, it, mock } from "bun:test";
import {
  BOARD_CONTROL_LORE_RACE_STRATEGY_ID,
  DEFAULT_AUTOMATED_ACTION_STRATEGY_ID,
} from "@tcg/lorcana-engine";
import { DECK_FIXTURES } from "../deck-fixtures/index.js";
import {
  prepareAutomatedMatchSimulation,
  replaceDeckTextWithFixture,
  simulateAutomatedMatch,
  type AutomatedMatchConfig,
  type AutomatedMatchStorage,
} from "./index.js";

class MemoryStorage implements AutomatedMatchStorage {
  #values = new Map<string, string>();

  getItem(key: string): string | null {
    return this.#values.get(key) ?? null;
  }

  removeItem(key: string): void {
    this.#values.delete(key);
  }

  setItem(key: string, value: string): void {
    this.#values.set(key, value);
  }
}

function createConfig(): AutomatedMatchConfig {
  return {
    playerOneDeckText: DECK_FIXTURES[0]!.cards,
    playerTwoDeckText: DECK_FIXTURES[1]!.cards,
    playerOneFixtureId: DECK_FIXTURES[0]!.id,
    playerTwoFixtureId: DECK_FIXTURES[1]!.id,
    playerOneStrategyId: DEFAULT_AUTOMATED_ACTION_STRATEGY_ID,
    playerTwoStrategyId: BOARD_CONTROL_LORE_RACE_STRATEGY_ID,
    seed: "ai-match:seed",
  };
}

describe("automated match setup actions", () => {
  it("selecting a default fixture replaces the player deck text", () => {
    const nextConfig = replaceDeckTextWithFixture(
      createConfig(),
      "playerOne",
      DECK_FIXTURES[2]!.id,
    );

    expect(nextConfig.playerOneDeckText).toBe(DECK_FIXTURES[2]!.cards);
    expect(nextConfig.playerOneFixtureId).toBe(DECK_FIXTURES[2]!.id);
  });

  it("clicking simulate with valid decks prepares a new seeded config and navigates", async () => {
    const storage = new MemoryStorage();
    const navigate = mock(() => {});

    const result = await simulateAutomatedMatch({
      config: createConfig(),
      navigate,
      storage,
      viewerPath: "/sandbox/simulator/ai-match/viewer",
    });

    expect(result.nextConfig?.seed).not.toBe("ai-match:seed");
    expect(result.errors).toEqual({});
    expect(navigate).toHaveBeenCalledWith("/sandbox/simulator/ai-match/viewer");
  });

  it("blocks simulate when validation fails", () => {
    const config = createConfig();
    config.playerOneDeckText = "1 Definitely Not A Real Lorcana Card";

    const result = prepareAutomatedMatchSimulation(config);

    expect(result.nextConfig).toBeUndefined();
    expect(result.errors.playerOneDeckText).toMatch(/unknown card name/i);
  });
});
