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
import { multipleTriggers } from "./multiple-triggers.js";
import { discardEffectsFixture } from "./discard-effects.js";
import { modalAbilitiesFixture } from "./modal-abilities.js";
import { monstroComboFixture } from "./monstro-combo.js";
import { moveDamageFixture } from "./move-damage.js";
import { playerSelectionFixture } from "./player-selection.js";
import { alternativeCostsFixture } from "./alternative-costs.js";
import { createFixtureRegistry } from "./registry.js";

export const DEFAULT_LORCANA_FIXTURE_ID = "empty-board";

/**
 * Lorcana Simulator Fixtures
 *
 * These fixtures use REAL card definitions from @tcg/lorcana-cards.
 * Each card has full abilities, stats, and effects - just like in production.
 */
const fixtureRegistry = createFixtureRegistry(
  [
    emptyBoardFixture,
    openingHandFixture,
    openingSkirmishFixture,
    boardPressureFixture,
    lateGameFixture,
    preGameFixture,
    winStateFixture,
    cardStatesFixture,
    fullBoardAllCardTypes,
    lookAtTheTopFixture,
    shiftFixture,
    challengeKeywordsFixture,
    defensiveKeywordsFixture,
    questKeywordsFixture,
    boostKeywordFixture,
    multipleTriggers,
    discardEffectsFixture,
    modalAbilitiesFixture,
    playerSelectionFixture,
    monstroComboFixture,
    moveDamageFixture,
    alternativeCostsFixture,
  ] satisfies LorcanaSimulatorFixture[],
  "general simulator fixtures",
);

export const LORCANA_SIMULATOR_FIXTURE_LIST = fixtureRegistry.list;
export const LORCANA_SIMULATOR_FIXTURE_MAP = fixtureRegistry.byId;
export const LORCANA_SIMULATOR_FIXTURES = fixtureRegistry.record;

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
