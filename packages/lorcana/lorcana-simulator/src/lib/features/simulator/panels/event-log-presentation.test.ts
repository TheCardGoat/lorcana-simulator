import { describe, expect, it } from "bun:test";
import type { LorcanaLogMessageKey } from "@tcg/lorcana-engine";

import type {
  MoveLogEntrySnapshot,
  SimulatorSerializedObject,
} from "@/features/simulator/model/contracts.js";
import {
  createCharacterCard,
  createLogEntry,
} from "@/features/simulator-devtools/test-data/factories.js";
import {
  buildEventLogRows,
  collectTypedLorcanaMessages,
  filterEntriesToLastTurns,
  toTypedLorcanaLogMessage,
} from "./event-log-presentation.js";

const FORMAT_CASES: Array<{
  key: LorcanaLogMessageKey;
  values: SimulatorSerializedObject;
  expected: string;
}> = [
  {
    key: "lorcana.setup.firstPlayerChosen",
    values: { chooser: "player_one", chosen: "player_two" },
    expected: "Chose Opponent to start",
  },
  {
    key: "lorcana.setup.mulligan.count",
    values: { playerId: "player_one", count: 2 },
    expected: "Mulliganed 2 cards",
  },
  {
    key: "lorcana.setup.mulligan.detail",
    values: {
      playerId: "player_one",
      count: 2,
      mulliganed: ["card-primary", "card-secondary"],
      drawn: ["card-secondary", "card-primary"],
    },
    expected: "Mulliganed 2 cards: Ariel - On Human Legs, Mickey Mouse - Detective",
  },
  {
    key: "lorcana.setup.done",
    values: {},
    expected: "Setup ready",
  },
  {
    key: "lorcana.ability.activated",
    values: { playerId: "player_one", cardId: "card-primary", abilityName: "Singer 5" },
    expected: "Ariel - On Human Legs used Singer 5",
  },
  {
    key: "lorcana.card.inked",
    values: { playerId: "player_one", cardId: "card-primary" },
    expected: "Inked [Inkable] Ariel - On Human Legs into inkwell",
  },
  {
    key: "lorcana.scry.count",
    values: { playerId: "player_one", count: 3 },
    expected: "Scry 3",
  },
  {
    key: "lorcana.scry.detail",
    values: { playerId: "player_one", count: 2, lookedAt: ["card-primary", "card-secondary"] },
    expected: "Looked at 2 cards",
  },
];

function createTypedEntry(
  key: LorcanaLogMessageKey,
  values: SimulatorSerializedObject,
): MoveLogEntrySnapshot {
  const primaryCard = createCharacterCard("playerOne", "play", {
    id: "card-primary",
    name: "Ariel - On Human Legs",
    strength: 2,
    willpower: 3,
    inkType: ["sapphire"],
    text: "Singer 5",
  });
  const secondaryCard = createCharacterCard("playerTwo", "play", {
    id: "card-secondary",
    name: "Mickey Mouse - Detective",
    strength: 1,
    willpower: 2,
    inkType: ["amber"],
  });

  return createLogEntry(`legacy ${key}`, {
    actorSide: "playerOne",
    id: key,
    moveId:
      key === "lorcana.card.inked"
        ? "putCardIntoInkwell"
        : key === "lorcana.ability.activated"
          ? "activateAbility"
          : "playCard",
    rawLogRegistry: {
      move: {
        moveId: "testMove",
        params: { cardId: primaryCard.cardId },
        playerId: "player_one",
        timestamp: 123,
      },
      matchingMoveLogEntry: {
        sourceEventSeqs: [1],
        defaultMessage: {
          key: "move.executed",
          values: {
            move: "testMove",
            playerId: "player_one",
          },
        },
      },
      relatedLogEntries: [
        {
          sourceEventSeqs: [1],
          defaultMessage: { key, values },
        },
      ],
      cardReferences: [primaryCard, secondaryCard],
    },
    turnNumber: 7,
  });
}

function flattenRowText(entry: MoveLogEntrySnapshot): string {
  const eventRow = buildEventLogRows([entry], "playerOne").find(
    (row): row is Extract<ReturnType<typeof buildEventLogRows>[number], { kind: "event-row" }> =>
      row.kind === "event-row",
  );

  if (!eventRow) {
    throw new Error("Expected an event row");
  }

  return eventRow.segments
    .map((segment) => {
      switch (segment.kind) {
        case "card":
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
  for (const { key, values, expected } of FORMAT_CASES) {
    it(`formats ${key} through the typed formatter`, () => {
      const entry = createTypedEntry(key, values);
      const typedMessage = toTypedLorcanaLogMessage(
        entry.rawLogRegistry?.relatedLogEntries[0]?.defaultMessage,
      );

      expect(typedMessage?.key).toBe(key);
      expect(typedMessage?.values).toEqual(values);
      expect(collectTypedLorcanaMessages(entry)).toHaveLength(1);
      expect(flattenRowText(entry)).toBe(expected);
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

  it("falls back to legacy copy when no typed Lorcana message is available", () => {
    const entry = createLogEntry("Moved Stitch", {
      actorSide: "playerTwo",
      id: "fallback-entry",
      moveId: "playCard",
      detail: "Moved to play",
      turnNumber: 2,
    });

    const fallbackRow = buildEventLogRows([entry]).find(
      (row): row is Extract<ReturnType<typeof buildEventLogRows>[number], { kind: "event-row" }> =>
        row.kind === "event-row",
    );

    expect(fallbackRow?.source).toBe("fallback");
  });
});
