import { describe, expect, it } from "bun:test";
import type { CardInstanceId, PlayerId } from "#core";
import type { MatchState, PublishedGameEvent } from "./types";
import type { ProjectedLogEntry } from "./match-runtime.types";
import { projectGameLog } from "./match-runtime.logs";
import { createLorcanaGameLogEntry } from "../../types/log-messages";

const state = {} as MatchState;
const playerOneId = "player_one" as PlayerId;
const threeArrowsId = "three-arrows" as CardInstanceId;
const princeEricId = "prince-eric" as CardInstanceId;
const hiddenInkId = "hidden-ink" as CardInstanceId;
const characterId = "character" as CardInstanceId;

function publishedGameEvent(seq: number, event: PublishedGameEvent["event"]): PublishedGameEvent {
  return {
    seq,
    timestamp: 1000 + seq,
    stateId: 1,
    event,
  };
}

function resolveBagLogEntry(): ProjectedLogEntry {
  return {
    category: "action",
    visibility: { mode: "PUBLIC" },
    typedEntry: createLorcanaGameLogEntry(
      "lorcana.bag.resolve.completed",
      {
        playerId: playerOneId,
        sourceId: threeArrowsId,
      },
      { mode: "PUBLIC" },
      "action",
    ),
  };
}

describe("projectGameLog", () => {
  it("adds Lorcana effect damage domain events to move outcomes", () => {
    const moveLogEntries: ProjectedLogEntry[] = [
      {
        category: "action",
        visibility: { mode: "PUBLIC" },
        typedEntry: createLorcanaGameLogEntry(
          "lorcana.effect.resolve.optionalSelection.accepted",
          {
            playerId: playerOneId,
            sourceCardId: threeArrowsId,
          },
          { mode: "PUBLIC" },
          "action",
        ),
      },
    ];

    const { moveLogs } = projectGameLog({
      state,
      moveLogEntries,
      publishedGameEvents: [
        publishedGameEvent(1, {
          kind: "MOVE_EXECUTED",
          commandId: "command-1",
          move: "resolveEffect",
          playerId: playerOneId,
          inputRedacted: false,
          input: {},
        }),
        publishedGameEvent(2, {
          kind: "CUSTOM",
          customType: "damageDealt",
          data: {
            sourceId: threeArrowsId,
            targetId: princeEricId,
            amount: 2,
            newDamage: 2,
            damageType: "effect",
          },
        }),
      ],
    });

    expect(moveLogs).toEqual([
      {
        type: "resolveEffect",
        playerId: playerOneId,
        timestamp: 1001,
        sourceCardId: threeArrowsId,
        resolution: { kind: "optionalSelection", accepted: true },
        outcomes: {
          damageDealt: [
            {
              sourceId: threeArrowsId,
              targetId: princeEricId,
              amount: 2,
              kind: "effect",
            },
          ],
        },
      },
    ]);
  });

  it("skips start-of-turn ready outcomes for inkwell cards", () => {
    const { moveLogs } = projectGameLog({
      state,
      moveLogEntries: [resolveBagLogEntry()],
      publishedGameEvents: [
        publishedGameEvent(1, {
          kind: "MOVE_EXECUTED",
          commandId: "command-1",
          move: "resolveBag",
          playerId: playerOneId,
          inputRedacted: false,
          input: {},
        }),
        publishedGameEvent(2, {
          kind: "CUSTOM",
          customType: "cardReadied",
          data: { cardId: hiddenInkId, source: "start-of-turn", zone: "inkwell" },
        }),
        publishedGameEvent(3, {
          kind: "CUSTOM",
          customType: "cardInked",
          data: {
            playerId: playerOneId,
            cardId: hiddenInkId,
            from: "deck",
            to: "inkwell",
            private: true,
          },
        }),
      ],
    });

    expect(moveLogs[0]).toMatchObject({
      type: "resolveBag",
      outcomes: {
        cardsInked: [{ exerted: true }],
      },
    });
    const resolveBagLog = moveLogs[0];
    if (resolveBagLog?.type !== "resolveBag") {
      throw new Error("Expected a resolveBag log");
    }
    expect(resolveBagLog.outcomes).not.toHaveProperty("cardsReadied");
  });

  it("keeps start-of-turn ready outcomes for cards in play", () => {
    const { moveLogs } = projectGameLog({
      state,
      moveLogEntries: [resolveBagLogEntry()],
      publishedGameEvents: [
        publishedGameEvent(1, {
          kind: "MOVE_EXECUTED",
          commandId: "command-1",
          move: "resolveBag",
          playerId: playerOneId,
          inputRedacted: false,
          input: {},
        }),
        publishedGameEvent(2, {
          kind: "CUSTOM",
          customType: "cardReadied",
          data: { cardId: characterId, source: "start-of-turn", zone: "play" },
        }),
      ],
    });

    const resolveBagLog = moveLogs[0];
    if (resolveBagLog?.type !== "resolveBag") {
      throw new Error("Expected a resolveBag log");
    }
    expect(resolveBagLog.outcomes).toEqual({ cardsReadied: [characterId] });
  });
});
