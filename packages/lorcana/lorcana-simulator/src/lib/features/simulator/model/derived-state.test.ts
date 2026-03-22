import { describe, expect, it } from "bun:test";
import {
  type AvailableMove,
  type CardInstanceId,
  type LorcanaEngineBase,
  type MoveOption,
} from "@tcg/lorcana-engine";

import { buildExecutableMoves } from "./derived-state.js";
import type { CardSnapshotMap } from "./board-utils.js";

function createStubEngine(options: {
  moveOptions?: Record<string, MoveOption[]>;
}): LorcanaEngineBase {
  const moveOptions = options.moveOptions ?? {};

  return {
    getMoveOptions: (moveId: string, cardId: string | number) =>
      moveId === "playCard" ? (moveOptions[String(cardId)] ?? []) : [],
    getBoard: () =>
      ({
        playerOrder: [],
      }) as unknown as ReturnType<LorcanaEngineBase["getBoard"]>,
    getClientPlayerId: () => "player_one",
    canUndo: () => false,
  } as unknown as LorcanaEngineBase;
}

function createAvailableMove(
  moveId: AvailableMove["moveId"],
  selectableCardIds: string[],
): AvailableMove {
  return {
    moveId,
    selectableCardIds,
  } as AvailableMove;
}

function toCardInstanceId(cardId: string): CardInstanceId {
  return cardId as unknown as CardInstanceId;
}

const cards = {
  smash: {
    cardId: "smash",
    definitionId: "def-smash",
    isMasked: false,
    label: "Smash",
    ownerId: "player_one",
    ownerSide: "playerOne",
    zoneId: "hand",
    cardType: "action",
    facePresentation: "faceUp",
  },
  targetA: {
    cardId: "targetA",
    definitionId: "def-targetA",
    isMasked: false,
    label: "Target A",
    ownerId: "player_two",
    ownerSide: "playerTwo",
    zoneId: "play",
    cardType: "character",
    facePresentation: "faceUp",
  },
  targetB: {
    cardId: "targetB",
    definitionId: "def-targetB",
    isMasked: false,
    label: "Target B",
    ownerId: "player_two",
    ownerSide: "playerTwo",
    zoneId: "play",
    cardType: "character",
    facePresentation: "faceUp",
  },
} satisfies CardSnapshotMap;

describe("buildExecutableMoves", () => {
  it("expands targeted play-card options into one executable move per target", () => {
    const engine = createStubEngine({
      moveOptions: {
        smash: [
          { kind: "card", cardId: toCardInstanceId("targetA") },
          { kind: "card", cardId: toCardInstanceId("targetB") },
        ],
      },
    });

    const entries = buildExecutableMoves(
      engine,
      cards,
      [createAvailableMove("playCard", ["smash"])],
      [],
    );

    expect(entries).toHaveLength(2);
    expect(entries.map((entry) => entry.params)).toEqual([
      { cardId: "smash", targets: ["targetA"] },
      { cardId: "smash", targets: ["targetB"] },
    ]);
    expect(entries.map((entry) => entry.label)).toEqual(["Smash -> Target A", "Smash -> Target B"]);
  });

  it("falls back to the base play-card move when no preplay targets are available", () => {
    const engine = createStubEngine({
      moveOptions: {
        smash: [],
      },
    });

    const entries = buildExecutableMoves(
      engine,
      cards,
      [createAvailableMove("playCard", ["smash"])],
      [],
    );

    expect(entries).toHaveLength(1);
    expect(entries[0]).toMatchObject({
      id: "playCard:smash",
      moveId: "playCard",
      params: {
        cardId: "smash",
      },
      label: "Smash",
    });
  });
});
