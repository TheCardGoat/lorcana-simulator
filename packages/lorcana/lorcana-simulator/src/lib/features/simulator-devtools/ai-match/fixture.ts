import type { LorcanaSimulatorFixtureInput } from "../fixtures/fixture-factory.js";
import { createFixture } from "../fixtures/fixture-factory.js";
import type { AutomatedMatchConfig, AutomatedMatchValidationErrors } from "./types.js";

const VALIDATION_FIXTURE_ID = "automated-match-validation";
const VALIDATION_FIXTURE_NAME = "Automated Match Validation";

function buildFixtureInput(config: AutomatedMatchConfig): LorcanaSimulatorFixtureInput {
  return {
    id: "automated-match",
    name: "Automated Match",
    description: "Automated AI mirror viewer fixture.",
    playerOne: {
      deck: config.playerOneDeckText,
      hand: 0,
      inkwell: 0,
      lore: 0,
      play: [],
      discard: [],
    },
    playerTwo: {
      deck: config.playerTwoDeckText,
      hand: 0,
      inkwell: 0,
      lore: 0,
      play: [],
      discard: [],
    },
    seed: config.seed,
    skipPreGame: false,
  };
}

function buildValidationFixtureInput(
  side: "playerOne" | "playerTwo",
  deckText: string,
  validDeckText: string,
): LorcanaSimulatorFixtureInput {
  return {
    id: `${VALIDATION_FIXTURE_ID}-${side}`,
    name: VALIDATION_FIXTURE_NAME,
    description: "Automated match deck validation.",
    playerOne: {
      deck: side === "playerOne" ? deckText : validDeckText,
      hand: 0,
      inkwell: 0,
      lore: 0,
      play: [],
      discard: [],
    },
    playerTwo: {
      deck: side === "playerTwo" ? deckText : validDeckText,
      hand: 0,
      inkwell: 0,
      lore: 0,
      play: [],
      discard: [],
    },
    seed: VALIDATION_FIXTURE_ID,
    skipPreGame: false,
  };
}

function sanitizeValidationMessage(message: string): string {
  return message
    .replace(/Fixture "[^"]+" playerOne decklist /i, "")
    .replace(/Fixture "[^"]+" playerTwo decklist /i, "")
    .replace(/Fixture "[^"]+" /i, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function createAutomatedMatchFixture(config: AutomatedMatchConfig) {
  return createFixture(buildFixtureInput(config));
}

export function validateAutomatedMatchConfig(
  config: AutomatedMatchConfig,
): AutomatedMatchValidationErrors {
  const errors: AutomatedMatchValidationErrors = {};
  const validDeckText = config.playerOneDeckText || config.playerTwoDeckText;

  try {
    createFixture(
      buildValidationFixtureInput("playerOne", config.playerOneDeckText, validDeckText),
    );
  } catch (error) {
    errors.playerOneDeckText =
      error instanceof Error ? sanitizeValidationMessage(error.message) : "Invalid deck list.";
  }

  try {
    createFixture(
      buildValidationFixtureInput("playerTwo", config.playerTwoDeckText, validDeckText),
    );
  } catch (error) {
    errors.playerTwoDeckText =
      error instanceof Error ? sanitizeValidationMessage(error.message) : "Invalid deck list.";
  }

  return errors;
}
