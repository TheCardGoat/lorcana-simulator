import { describe, expect, it } from "bun:test";
import type { LorcanaLogMessageKey } from "@tcg/lorcana-engine";

import type {
  MoveLogEntrySnapshot,
  SimulatorSerializedObject,
} from "@/features/simulator/model/contracts.js";
import {
  createLogCardReference,
  createLogEntry,
} from "@/features/simulator-devtools/test-data/factories.js";
import { buildEventLogRows, filterEntriesToLastTurns } from "./event-log-presentation.js";

type FormatCase = {
  moveId: MoveLogEntrySnapshot["moveId"];
  values: SimulatorSerializedObject;
  expected: string;
};

const FORMAT_CASES = {
  "lorcana.setup.firstPlayerChosen": {
    moveId: "chooseWhoGoesFirst",
    values: { chooser: "player_one", chosen: "player_two" },
    expected: "Chose Opponent to start.",
  },
  "lorcana.setup.mulligan.count": {
    moveId: "alterHand",
    values: { playerId: "player_one", count: 2 },
    expected: "Altered 2 cards.",
  },
  "lorcana.setup.mulligan.detail": {
    moveId: "alterHand",
    values: {
      playerId: "player_one",
      count: 2,
      mulliganed: ["card-primary", "card-secondary"],
      drawn: ["card-secondary", "card-primary"],
    },
    expected:
      "Altered 2 cards: Ariel - On Human Legs, Mickey Mouse - Detective. Drew Mickey Mouse - Detective, Ariel - On Human Legs.",
  },
  "lorcana.setup.done": {
    moveId: "alterHand",
    values: {},
    expected: "Setup complete.",
  },
  "lorcana.ability.activated": {
    moveId: "activateAbility",
    values: { playerId: "player_one", cardId: "card-primary" },
    expected: "Activated an ability from Ariel - On Human Legs.",
  },
  "lorcana.ability.activated.named": {
    moveId: "activateAbility",
    values: { playerId: "player_one", cardId: "card-primary", abilityName: "Singer 5" },
    expected: "Activated Singer 5 from Ariel - On Human Legs.",
  },
  "lorcana.card.inked": {
    moveId: "putCardIntoInkwell",
    values: { playerId: "player_one", cardId: "card-primary" },
    expected: "Put [Inkable] Ariel - On Human Legs into the inkwell.",
  },
  "lorcana.scry.count": {
    moveId: "playCard",
    values: { playerId: "player_one", count: 3 },
    expected: "Looked at the top 3 cards.",
  },
  "lorcana.scry.detail": {
    moveId: "playCard",
    values: { playerId: "player_one", count: 2, lookedAt: ["card-primary", "card-secondary"] },
    expected: "Looked at the top 2 cards: Ariel - On Human Legs, Mickey Mouse - Detective.",
  },
  "lorcana.move.playCard": {
    moveId: "playCard",
    values: { playerId: "player_one", cardId: "card-primary" },
    expected: "Played Ariel - On Human Legs.",
  },
  "lorcana.move.quest": {
    moveId: "quest",
    values: { playerId: "player_one", cardId: "card-primary", loreGained: 2 },
    expected: "Quested with Ariel - On Human Legs for 2 lore.",
  },
  "lorcana.move.questWithAll": {
    moveId: "questWithAll",
    values: {
      playerId: "player_one",
      cardIds: ["card-primary", "card-secondary"],
      loreGained: 3,
      count: 2,
    },
    expected:
      "Quested with 2 characters: Ariel - On Human Legs, Mickey Mouse - Detective for 3 lore.",
  },
  "lorcana.move.challenge": {
    moveId: "challenge",
    values: {
      playerId: "player_one",
      attackerId: "card-primary",
      defenderId: "card-secondary",
    },
    expected: "Challenged Mickey Mouse - Detective with Ariel - On Human Legs.",
  },
  "lorcana.move.moveCharacterToLocation": {
    moveId: "moveCharacterToLocation",
    values: {
      playerId: "player_one",
      characterId: "card-primary",
      locationId: "card-location",
    },
    expected: "Moved Ariel - On Human Legs to Motunui - Island Paradise.",
  },
  "lorcana.move.passTurn": {
    moveId: "passTurn",
    values: { playerId: "player_one" },
    expected: "Passed the turn.",
  },
  "lorcana.move.concede": {
    moveId: "concede",
    values: { playerId: "player_one" },
    expected: "Conceded the game.",
  },
  "lorcana.bag.resolve.completed": {
    moveId: "resolveBag",
    values: { playerId: "player_one", sourceId: "card-primary" },
    expected: "Resolved an effect from Ariel - On Human Legs.",
  },
  "lorcana.bag.resolve.completed.named": {
    moveId: "resolveBag",
    values: { playerId: "player_one", sourceId: "card-primary", abilityName: "Singer 5" },
    expected: "Resolved Singer 5 from Ariel - On Human Legs.",
  },
  "lorcana.bag.resolve.completed.targets": {
    moveId: "resolveBag",
    values: {
      playerId: "player_one",
      sourceId: "card-primary",
      targets: ["card-secondary", "card-location"],
    },
    expected:
      "Resolved an effect from Ariel - On Human Legs, targeting Mickey Mouse - Detective, Motunui - Island Paradise.",
  },
  "lorcana.bag.resolve.completed.targets.named": {
    moveId: "resolveBag",
    values: {
      playerId: "player_one",
      sourceId: "card-primary",
      abilityName: "Singer 5",
      targets: ["card-secondary", "card-location"],
    },
    expected:
      "Resolved Singer 5 from Ariel - On Human Legs, targeting Mickey Mouse - Detective, Motunui - Island Paradise.",
  },
  "lorcana.bag.resolve.skipped": {
    moveId: "resolveBag",
    values: { playerId: "player_one", sourceId: "card-primary" },
    expected: "Skipped an effect from Ariel - On Human Legs.",
  },
  "lorcana.bag.resolve.skipped.named": {
    moveId: "resolveBag",
    values: { playerId: "player_one", sourceId: "card-primary", abilityName: "Singer 5" },
    expected: "Skipped Singer 5 from Ariel - On Human Legs.",
  },
  "lorcana.bag.resolve.pending": {
    moveId: "resolveBag",
    values: { playerId: "player_one", sourceId: "card-primary" },
    expected: "Started resolving an effect from Ariel - On Human Legs. More input is required.",
  },
  "lorcana.bag.resolve.pending.named": {
    moveId: "resolveBag",
    values: { playerId: "player_one", sourceId: "card-primary", abilityName: "Singer 5" },
    expected: "Started resolving Singer 5 from Ariel - On Human Legs. More input is required.",
  },
  "lorcana.effect.resolve.discardChoice": {
    moveId: "resolveEffect",
    values: {
      playerId: "player_one",
      sourceCardId: "card-primary",
      targets: ["card-secondary"],
    },
    expected: "Resolved Ariel - On Human Legs by discarding Mickey Mouse - Detective.",
  },
  "lorcana.effect.resolve.targetSelection": {
    moveId: "resolveEffect",
    values: {
      playerId: "player_one",
      sourceCardId: "card-primary",
      targets: ["card-secondary", "card-location"],
    },
    expected:
      "Resolved Ariel - On Human Legs, targeting Mickey Mouse - Detective, Motunui - Island Paradise.",
  },
  "lorcana.effect.resolve.choiceSelection": {
    moveId: "resolveEffect",
    values: {
      playerId: "player_one",
      sourceCardId: "card-primary",
      choiceIndex: 2,
    },
    expected: "Resolved Ariel - On Human Legs with option 2.",
  },
  "lorcana.effect.resolve.optionalSelection.accepted": {
    moveId: "resolveEffect",
    values: { playerId: "player_one", sourceCardId: "card-primary" },
    expected: "Resolved Ariel - On Human Legs by choosing yes.",
  },
  "lorcana.effect.resolve.optionalSelection.rejected": {
    moveId: "resolveEffect",
    values: { playerId: "player_one", sourceCardId: "card-primary" },
    expected: "Resolved Ariel - On Human Legs by choosing no.",
  },
  "lorcana.effect.resolve.nameCardSelection": {
    moveId: "resolveEffect",
    values: {
      playerId: "player_one",
      sourceCardId: "card-primary",
      namedCard: "Be Prepared",
    },
    expected: "Resolved Ariel - On Human Legs by naming Be Prepared.",
  },
  "lorcana.effect.resolve.scrySelection": {
    moveId: "resolveEffect",
    values: { playerId: "player_one", sourceCardId: "card-primary" },
    expected: "Finished ordering cards for Ariel - On Human Legs.",
  },
  "lorcana.effect.resolve.scrySelection.detail": {
    moveId: "resolveEffect",
    values: {
      playerId: "player_one",
      sourceCardId: "card-primary",
      selection: ["Hand: Ariel - On Human Legs", "Bottom of deck: Mickey Mouse - Detective"],
      handCards: ["card-primary"],
      deckBottomCards: ["card-secondary"],
    },
    expected:
      "Finished ordering cards for Ariel - On Human Legs: Hand: Ariel - On Human Legs, Bottom of deck: Mickey Mouse - Detective.",
  },
  "lorcana.effect.resolve.revealTopCard": {
    moveId: "resolveEffect",
    values: {
      playerId: "player_one",
      targetPlayerId: "player_two",
      revealedCardId: "card-primary",
    },
    expected: "You revealed Ariel - On Human Legs from Opponent's deck.",
  },
  "lorcana.effect.resolve.revealTopCard.autoBottom": {
    moveId: "resolveEffect",
    values: {
      playerId: "player_one",
      targetPlayerId: "player_two",
      revealedCardId: "card-primary",
    },
    expected: "Revealed Ariel - On Human Legs — put on the bottom of Opponent's deck.",
  },
  "lorcana.effect.resolve.choiceSelection.withReveal": {
    moveId: "resolveEffect",
    values: {
      playerId: "player_one",
      sourceCardId: "card-primary",
      revealedCardId: "card-secondary",
      choiceIndex: 2,
    },
    expected: "You chose option 2 for Mickey Mouse - Detective.",
  },
} satisfies Record<LorcanaLogMessageKey, FormatCase>;

const FALLBACK_CASES = {
  activateAbility: "Performed a fallback ability action.",
  alterHand: "Performed a fallback alter hand action.",
  chooseWhoGoesFirst: "Performed a fallback first-player action.",
  challenge: "Performed a fallback challenge action.",
  concede: "Performed a fallback concede action.",
  moveCharacterToLocation: "Performed a fallback move action.",
  passTurn: "Performed a fallback pass action.",
  playCard: "Performed a fallback play action.",
  putCardIntoInkwell: "Performed a fallback ink action.",
  quest: "Performed a fallback quest action.",
  questWithAll: "Performed a fallback group quest action.",
  undo: "Performed a fallback undo action.",
  sing: "Performed a fallback sing action.",
  singTogether: "Performed a fallback sing together action.",
  resolveBag: "Performed a fallback bag resolution.",
  resolveEffect: "Performed a fallback effect resolution.",
  manualMoveCard: "Performed a fallback manual move action.",
  manualExertCard: "Performed a fallback manual exert action.",
  manualReadyCard: "Performed a fallback manual ready action.",
  manualDryCard: "Performed a fallback manual dry action.",
  manualSetDamage: "Performed a fallback damage action.",
  manualSetLore: "Performed a fallback lore action.",
  manualShuffleDeck: "Performed a fallback shuffle action.",
  manualPassTurn: "Performed a fallback manual pass action.",
} satisfies Record<MoveLogEntrySnapshot["moveId"], string>;

function createTypedEntry(key: LorcanaLogMessageKey, formatCase: FormatCase): MoveLogEntrySnapshot {
  const primaryCard = createLogCardReference("playerOne", {
    id: "card-primary",
    name: "Ariel - On Human Legs",
    inkType: ["sapphire"],
  });
  const secondaryCard = createLogCardReference("playerTwo", {
    id: "card-secondary",
    name: "Mickey Mouse - Detective",
    inkType: ["amber"],
  });
  const locationCard = createLogCardReference("playerOne", {
    id: "card-location",
    name: "Motunui - Island Paradise",
  });

  return createLogEntry(`typed ${key}`, {
    actorSide: "playerOne",
    id: key,
    moveId: formatCase.moveId,
    typedLogEntry: {
      type: key,
      values: formatCase.values,
      visibility: { mode: "PUBLIC" },
      category: "action",
    } as import("@tcg/lorcana-engine").LorcanaGameLogEntry,
    playerId: "player_one",
    params: { cardId: primaryCard.cardId },
    turnNumber: 7,
  });
}

function createTestResolver() {
  const primaryCard = createLogCardReference("playerOne", {
    id: "card-primary",
    name: "Ariel - On Human Legs",
    inkType: ["sapphire"],
  });
  const secondaryCard = createLogCardReference("playerTwo", {
    id: "card-secondary",
    name: "Mickey Mouse - Detective",
    inkType: ["amber"],
  });
  const locationCard = createLogCardReference("playerOne", {
    id: "card-location",
    name: "Motunui - Island Paradise",
  });

  const cardMap = new Map([
    [primaryCard.cardId, primaryCard],
    [secondaryCard.cardId, secondaryCard],
    [locationCard.cardId, locationCard],
  ]);

  return (cardId: string) => cardMap.get(cardId) ?? null;
}

function flattenRowText(entry: MoveLogEntrySnapshot): string {
  const resolveCard = createTestResolver();
  const eventRow = buildEventLogRows([entry], "playerOne").find(
    (row): row is Extract<ReturnType<typeof buildEventLogRows>[number], { kind: "event-row" }> =>
      row.kind === "event-row",
  );

  if (!eventRow) {
    throw new Error("Expected an event row");
  }

  // Use the resolver for text output (card names) by applying it post-hoc like formatEventLogBody does.
  return eventRow.segments
    .map((segment) => {
      switch (segment.kind) {
        case "card":
          return resolveCard(segment.cardId)?.label ?? segment.fallbackLabel ?? segment.cardId;
        case "player":
        case "stat":
        case "text":
          return segment.text;
        case "icon":
          return `[${segment.label}]`;
      }
    })
    .join("");
}

describe("event log presentation", () => {
  const typedCases = Object.entries(FORMAT_CASES) as Array<[LorcanaLogMessageKey, FormatCase]>;

  for (const [key, formatCase] of typedCases) {
    it(`formats ${key} through the typed formatter`, () => {
      const entry = createTypedEntry(key, formatCase);
      expect(entry.typedLogEntry?.type).toBe(key);
      expect(flattenRowText(entry)).toBe(formatCase.expected);
    });
  }

  it("filters rows to the last two exact turn groups", () => {
    const entries = [
      createLogEntry("Turn 1", { id: "t1", turnNumber: 1 }),
      createLogEntry("Turn 2", { id: "t2", turnNumber: 2 }),
      createLogEntry("Turn 3", { id: "t3", turnNumber: 3 }),
    ];

    expect(filterEntriesToLastTurns(entries).map((entry) => entry.id)).toEqual(["t2", "t3"]);
  });

  const fallbackCases = Object.entries(FALLBACK_CASES) as Array<
    [MoveLogEntrySnapshot["moveId"], string]
  >;

  for (const [moveId, title] of fallbackCases) {
    it(`falls back for ${moveId}`, () => {
      const entry = createLogEntry(title, {
        actorSide: "playerTwo",
        id: `fallback-${moveId}`,
        moveId,
        turnNumber: 2,
      });

      const fallbackRow = buildEventLogRows([entry]).find(
        (
          row,
        ): row is Extract<ReturnType<typeof buildEventLogRows>[number], { kind: "event-row" }> =>
          row.kind === "event-row",
      );

      expect(fallbackRow?.source).toBe("fallback");
      expect(flattenRowText(entry).length).toBeGreaterThan(0);
    });
  }
});
