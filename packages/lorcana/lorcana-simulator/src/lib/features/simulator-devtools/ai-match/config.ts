import { DECK_FIXTURES } from "../deck-fixtures/index.js";
import { DEFAULT_AUTOMATED_MATCH_STRATEGY_ID } from "./strategy-registry.js";
import type { AutomatedMatchConfig } from "./types.js";

const EMPTY_FIXTURE = {
  cards: "",
  name: "Custom deck",
} as const;

const DEFAULT_PLAYER_ONE_FIXTURE = DECK_FIXTURES[0] ?? EMPTY_FIXTURE;
const DEFAULT_PLAYER_TWO_FIXTURE = DECK_FIXTURES[1] ?? DEFAULT_PLAYER_ONE_FIXTURE;

export function createAutomatedMatchSeed(now = Date.now()): string {
  if (!Number.isFinite(now)) {
    throw new RangeError("Automated match seed requires a finite timestamp.");
  }

  return `ai-match:${now}`;
}

export function createDefaultAutomatedMatchConfig(): AutomatedMatchConfig {
  return {
    playerOneDeckText: DEFAULT_PLAYER_ONE_FIXTURE?.cards ?? "",
    playerTwoDeckText: DEFAULT_PLAYER_TWO_FIXTURE?.cards ?? "",
    playerOneFixtureName: DEFAULT_PLAYER_ONE_FIXTURE?.name,
    playerTwoFixtureName: DEFAULT_PLAYER_TWO_FIXTURE?.name,
    strategyId: DEFAULT_AUTOMATED_MATCH_STRATEGY_ID,
    seed: createAutomatedMatchSeed(0),
  };
}

export function getDeckFixtureByName(name?: string) {
  if (!name) {
    return undefined;
  }

  return DECK_FIXTURES.find((fixture) => fixture.name === name);
}

export function replaceDeckTextWithFixture(
  config: AutomatedMatchConfig,
  side: "playerOne" | "playerTwo",
  fixtureName: string,
): AutomatedMatchConfig {
  const fixture = getDeckFixtureByName(fixtureName);
  if (!fixture) {
    return config;
  }

  if (side === "playerOne") {
    return {
      ...config,
      playerOneDeckText: fixture.cards,
      playerOneFixtureName: fixture.name,
    };
  }

  return {
    ...config,
    playerTwoDeckText: fixture.cards,
    playerTwoFixtureName: fixture.name,
  };
}
