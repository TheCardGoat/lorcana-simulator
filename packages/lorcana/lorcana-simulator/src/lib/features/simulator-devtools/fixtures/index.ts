import type { LorcanaSimulatorFixture } from "@/features/simulator/model/contracts.js";

import { boardPressureFixture } from "./board-pressure.js";
import { cardStatesFixture } from "./card-states.js";
import { emptyBoardFixture } from "./empty-board.js";
import { lateGameFixture } from "./late-game.js";
import { openingHandFixture } from "./opening-hand.js";
import { openingSkirmishFixture } from "./opening-skirmish.js";
import { preGameFixture } from "./pre-game.js";
import { winStateFixture } from "./win-state.js";
import { fullBoardAllCardTypes } from "./full-board-all-card-types.js";
import { lookAtTheTopFixture } from "./look-at-the-top.js";
import { shiftFixture } from "./shift.js";
import { challengeKeywordsFixture } from "./challenge-keywords.js";
import { defensiveKeywordsFixture } from "./defensive-keywords.js";
import { questKeywordsFixture } from "./quest-keywords.js";
import { boostKeywordFixture } from "./boost-keyword.js";

export const DEFAULT_LORCANA_FIXTURE_ID = "empty-board";

/**
 * Lorcana Simulator Fixtures
 *
 * These fixtures use REAL card definitions from @tcg/lorcana-cards.
 * Each card has full abilities, stats, and effects - just like in production.
 */
export const LORCANA_SIMULATOR_FIXTURES: Record<string, LorcanaSimulatorFixture> = {
  [emptyBoardFixture.id]: emptyBoardFixture,
  [openingHandFixture.id]: openingHandFixture,
  [openingSkirmishFixture.id]: openingSkirmishFixture,
  [boardPressureFixture.id]: boardPressureFixture,
  [lateGameFixture.id]: lateGameFixture,
  [preGameFixture.id]: preGameFixture,
  [winStateFixture.id]: winStateFixture,
  [cardStatesFixture.id]: cardStatesFixture,
  [fullBoardAllCardTypes.id]: fullBoardAllCardTypes,
  [lookAtTheTopFixture.id]: lookAtTheTopFixture,
  [shiftFixture.id]: shiftFixture,
  [challengeKeywordsFixture.id]: challengeKeywordsFixture,
  [defensiveKeywordsFixture.id]: defensiveKeywordsFixture,
  [questKeywordsFixture.id]: questKeywordsFixture,
  [boostKeywordFixture.id]: boostKeywordFixture,
};

export const getLorcanaFixture = (fixtureId: string): LorcanaSimulatorFixture => {
  const fixture =
    LORCANA_SIMULATOR_FIXTURES[fixtureId] ?? LORCANA_SIMULATOR_FIXTURES[DEFAULT_LORCANA_FIXTURE_ID];

  if (!fixture) {
    throw new Error(
      `Fixture "${fixtureId}" not found and default fixture "${DEFAULT_LORCANA_FIXTURE_ID}" is also missing`,
    );
  }

  return fixture;
};

/**
 * Helper to get card display name from a card definition
 */
export const getCardDisplayName = (card: { name: string; version?: string }): string => {
  if (card.version) {
    return `${card.name} - ${card.version}`;
  }
  return card.name;
};
