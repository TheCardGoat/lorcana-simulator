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

function publishedGameEvent(seq: number, event: PublishedGameEvent["event"]): PublishedGameEvent {
  return {
    seq,
    timestamp: 1000 + seq,
    stateId: 1,
    event,
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
});
