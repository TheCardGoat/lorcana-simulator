import { getLogger } from "@logtape/logtape";
import * as cards001Module from "@tcg/lorcana-cards/cards/001";
import * as cards002Module from "@tcg/lorcana-cards/cards/002";
import * as cards003Module from "@tcg/lorcana-cards/cards/003";
import * as cards004Module from "@tcg/lorcana-cards/cards/004";
import * as cards005Module from "@tcg/lorcana-cards/cards/005";
import * as cards006Module from "@tcg/lorcana-cards/cards/006";
import * as cards007Module from "@tcg/lorcana-cards/cards/007";
import * as cards008Module from "@tcg/lorcana-cards/cards/008";
import * as cards009Module from "@tcg/lorcana-cards/cards/009";
import * as cards010Module from "@tcg/lorcana-cards/cards/010";
import * as cards011Module from "@tcg/lorcana-cards/cards/011";
import type { LorcanaCard } from "@tcg/lorcana-engine";
import type { TestInitialState } from "@tcg/lorcana-engine/testing";
import * as deckListResolverModule from "@tcg/lorcana-cards/deck-list-resolver";
import type { LorcanaDeckListResolutionDiagnostics } from "@tcg/lorcana-cards/deck-list-resolver";
import type { LorcanaSimulatorFixture } from "@/features/simulator/model/contracts.js";

type FixturePlayerInput = Omit<TestInitialState, "deck"> & {
  deck?: TestInitialState["deck"] | string;
};

const { all001Cards } = cards001Module as typeof import("@tcg/lorcana-cards/cards/001");
const { all002Cards } = cards002Module as typeof import("@tcg/lorcana-cards/cards/002");
const { all003Cards } = cards003Module as typeof import("@tcg/lorcana-cards/cards/003");
const { all004Cards } = cards004Module as typeof import("@tcg/lorcana-cards/cards/004");
const { all005Cards } = cards005Module as typeof import("@tcg/lorcana-cards/cards/005");
const { all006Cards } = cards006Module as typeof import("@tcg/lorcana-cards/cards/006");
const { all007Cards } = cards007Module as typeof import("@tcg/lorcana-cards/cards/007");
const { all008Cards } = cards008Module as typeof import("@tcg/lorcana-cards/cards/008");
const { all009Cards } = cards009Module as typeof import("@tcg/lorcana-cards/cards/009");
const { all010Cards } = cards010Module as typeof import("@tcg/lorcana-cards/cards/010");
const { all011Cards } = cards011Module as typeof import("@tcg/lorcana-cards/cards/011");
const { resolveLorcanaDeckListTextFromPool } =
  deckListResolverModule as typeof import("@tcg/lorcana-cards/deck-list-resolver");

export type LorcanaSimulatorFixtureInput = Omit<
  LorcanaSimulatorFixture,
  "playerOne" | "playerTwo"
> & {
  playerOne: FixturePlayerInput;
  playerTwo: FixturePlayerInput;
};

const logger = getLogger(["tcg", "core-simulator", "lorcana-simulator", "fixture-factory"]);

const ALL_LORCANA_CARDS: LorcanaCard[] = [
  ...all001Cards,
  ...all002Cards,
  ...all003Cards,
  ...all004Cards,
  ...all005Cards,
  ...all006Cards,
  ...all007Cards,
  ...all008Cards,
  ...all009Cards,
  ...all010Cards,
  ...all011Cards,
];

function isStringDeck(deck: TestInitialState["deck"] | string | undefined): deck is string {
  return typeof deck === "string";
}

function summarizeMultiPrinting(diagnostics: LorcanaDeckListResolutionDiagnostics): void {
  if (diagnostics.multiPrintingSelections.length === 0) return;

  for (const resolution of diagnostics.multiPrintingSelections) {
    if (!resolution.selectedCard) {
      continue;
    }

    logger.info("Resolved decklist card with multiple printings", {
      cardName: resolution.cardName,
      resolvedCardName: resolution.resolvedCardName,
      matchCount: resolution.matchCount,
      matches: resolution.matches.map((match) => ({
        id: match.id,
        rarity: match.rarity,
        set: match.set,
      })),
      selected: {
        id: resolution.selectedCard.id,
        rarity: resolution.selectedCard.rarity,
        set: resolution.selectedCard.set,
      },
    });
  }
}

function throwMalformedEntries(
  fixtureId: string,
  side: "playerOne" | "playerTwo",
  invalid: string,
): never {
  logger.error("Decklist contains malformed lines", {
    fixtureId,
    side,
    invalid,
  });
  throw new Error(`Fixture "${fixtureId}" ${side} decklist contains malformed lines: ${invalid}`);
}

function parseDeckFromText(
  side: "playerOne" | "playerTwo",
  fixtureId: string,
  deckText: string,
): LorcanaCard[] {
  logger.info("Parsing decklist text for fixture", {
    fixtureId,
    side,
    textLength: deckText.length,
  });

  const { resolvedByCardName, cards, diagnostics } = resolveLorcanaDeckListTextFromPool(
    deckText,
    ALL_LORCANA_CARDS,
  );

  logger.debug("Decklist parse result", {
    entries: diagnostics.parsedEntriesCount,
    fixtureId,
    malformedLines: diagnostics.malformedLines.length,
    side,
  });

  if (diagnostics.malformedLines.length > 0) {
    const invalid = diagnostics.malformedLines
      .map((entry) => (entry.lineNumber ? `line ${entry.lineNumber}: ${entry.text}` : entry.text))
      .join("; ");
    throwMalformedEntries(fixtureId, side, invalid);
  }

  const uniqueCardCount = resolvedByCardName.size;
  logger.debug("Resolved unique decklist card names", {
    fixtureId,
    side,
    uniqueCardCount,
  });

  if (diagnostics.unresolvedNames.length > 0) {
    const unknownCard = diagnostics.unresolvedNames[0];
    if (unknownCard !== undefined) {
      logger.error("Decklist card name could not be resolved", {
        cardName: unknownCard,
        fixtureId,
        side,
      });
      throw new Error(
        `Fixture "${fixtureId}" ${side} decklist contains unknown card name "${unknownCard}"`,
      );
    }
  }

  summarizeMultiPrinting(diagnostics);

  logger.info("Finished decklist resolution for fixture", {
    entryCount: diagnostics.parsedEntriesCount,
    expandedDeckCount: cards.length,
    fixtureId,
    side,
    uniqueCardCount,
  });

  return cards;
}

export function sanitizeDeckText(deckText: string): {
  sanitizedText: string;
  unknownCards: string[];
} {
  const { diagnostics, entries } = resolveLorcanaDeckListTextFromPool(deckText, ALL_LORCANA_CARDS);
  const unknownSet = new Set(diagnostics.unresolvedNames);

  const sanitizedText = entries
    .filter((entry) => !unknownSet.has(entry.cardName))
    .map((entry) => `${entry.quantity} ${entry.cardName}`)
    .join("\n");

  return {
    sanitizedText,
    unknownCards: diagnostics.unresolvedNames,
  };
}

function normalizePlayerState(
  fixtureId: string,
  side: "playerOne" | "playerTwo",
  state: FixturePlayerInput,
): TestInitialState {
  if (!isStringDeck(state.deck)) {
    return state as TestInitialState;
  }

  const deckCards = parseDeckFromText(side, fixtureId, state.deck);
  return {
    ...state,
    deck: deckCards,
  };
}

export const createFixture = (fixture: LorcanaSimulatorFixtureInput): LorcanaSimulatorFixture => {
  logger.info("Creating Lorcana simulator fixture", {
    fixtureId: fixture.id,
    fixtureName: fixture.name,
  });

  const playerOneDeckIsString = isStringDeck(fixture.playerOne.deck);
  const playerTwoDeckIsString = isStringDeck(fixture.playerTwo.deck);

  if (playerOneDeckIsString !== playerTwoDeckIsString) {
    logger.error("Fixture uses mixed deck types; both decks must be strings or both non-strings", {
      fixtureId: fixture.id,
      playerOneDeckType: typeof fixture.playerOne.deck,
      playerTwoDeckType: typeof fixture.playerTwo.deck,
    });
    throw new Error(
      `Fixture "${fixture.id}" has mismatched deck input types; both playerOne.deck and playerTwo.deck must be decklist strings or neither`,
    );
  }

  if (!playerOneDeckIsString) {
    logger.debug("Fixture uses pre-materialized deck values (non-string)", {
      fixtureId: fixture.id,
    });
    return fixture as LorcanaSimulatorFixture;
  }

  const playerOne = normalizePlayerState(fixture.id, "playerOne", fixture.playerOne);
  const playerTwo = normalizePlayerState(fixture.id, "playerTwo", fixture.playerTwo);

  const resolvedFixture: LorcanaSimulatorFixture = {
    ...fixture,
    playerOne,
    playerTwo,
  };

  logger.info("Finished creating Lorcana simulator fixture", {
    fixtureId: fixture.id,
    playerOneDeckCount:
      typeof resolvedFixture.playerOne.deck === "number"
        ? resolvedFixture.playerOne.deck
        : Array.isArray(resolvedFixture.playerOne.deck)
          ? resolvedFixture.playerOne.deck.length
          : 0,
    playerTwoDeckCount:
      typeof resolvedFixture.playerTwo.deck === "number"
        ? resolvedFixture.playerTwo.deck
        : Array.isArray(resolvedFixture.playerTwo.deck)
          ? resolvedFixture.playerTwo.deck.length
          : 0,
  });

  return resolvedFixture;
};
