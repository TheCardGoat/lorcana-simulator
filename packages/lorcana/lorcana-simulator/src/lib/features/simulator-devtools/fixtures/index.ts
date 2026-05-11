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
import { bibbidiBobbidiBooFixture } from "./bibbidi-bobbidi-boo.js";
import { pongoDearOldDadFixture } from "./pongo-dear-old-dad.js";
import { singSecondStarFixture } from "./sing-second-star.js";
import { sugarRushSpeedwayStartingLineFinishLineFixture } from "./sugar-rush-speedway-starting-line-finish-line.js";
import { triage20260505DiabloDiscardShiftFixture } from "./triage-2026-05-05-diablo-discard-shift.js";
import { triage20260505EmeraldChromiconBanishTriggerFixture } from "./triage-2026-05-05-emerald-chromicon-banish-trigger.js";
import { triage20260505GoofySetForAdventureFixture } from "./triage-2026-05-05-goofy-set-for-adventure.js";
import { triage20260505LuciferMouseCatcherFixture } from "./triage-2026-05-05-lucifer-mouse-catcher.js";
import { triage20260505MadHatterScryFixture } from "./triage-2026-05-05-mad-hatter-scry.js";
import { triage20260505MufasaBogoRevealPlayFixture } from "./triage-2026-05-05-mufasa-bogo-reveal-play.js";
import { triage20260505SyndromePlayOrShiftFixture } from "./triage-2026-05-05-syndrome-play-or-shift.js";
import { triage20260505ThreeArrowsMeridaBanishFixture } from "./triage-2026-05-05-three-arrows-merida-banish.js";
import { triage20260505TouchTheSkyFixture } from "./triage-2026-05-05-touch-the-sky.js";
import { triage20260506BrawlCastMauiRushChallengeFixture } from "./triage-2026-05-06-brawl-cast-maui-rush-challenge.js";
import { triage20260508ShereKhanSkipOptionalFixture } from "./triage-2026-05-08-shere-khan-skip-optional.js";
import { triage20260511DinBodyguardEnterExertedFixture } from "./triage-2026-05-11-din-bodyguard-enter-exerted.js";
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
    bibbidiBobbidiBooFixture,
    pongoDearOldDadFixture,
    singSecondStarFixture,
    sugarRushSpeedwayStartingLineFinishLineFixture,
    triage20260505GoofySetForAdventureFixture,
    triage20260505TouchTheSkyFixture,
    triage20260505DiabloDiscardShiftFixture,
    triage20260505MadHatterScryFixture,
    triage20260505MufasaBogoRevealPlayFixture,
    triage20260505SyndromePlayOrShiftFixture,
    triage20260505ThreeArrowsMeridaBanishFixture,
    triage20260505LuciferMouseCatcherFixture,
    triage20260505EmeraldChromiconBanishTriggerFixture,
    triage20260506BrawlCastMauiRushChallengeFixture,
    triage20260508ShereKhanSkipOptionalFixture,
    triage20260511DinBodyguardEnterExertedFixture,
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
