import { describe, expect, it } from "bun:test";
import { createSpectatorHistoryEntries } from "./spectator-match-orchestrator.svelte.ts";

describe("createSpectatorHistoryEntries", () => {
  it("converts accepted moves into spectator event log entries", () => {
    const entries = createSpectatorHistoryEntries({
      acceptedMoves: [
        {
          actorId: "player-one",
          moveId: "passTurn",
          stateVersion: 3,
          timestamp: 123,
          turnNumber: 2,
        },
      ],
      engineLogs: [],
      resolveActorSide: (actorId) => (actorId === "player-one" ? "playerOne" : undefined),
    });

    expect(entries).toHaveLength(1);
    expect(entries[0]?.moveId).toBe("passTurn");
    expect(entries[0]?.actorSide).toBe("playerOne");
    expect(entries[0]?.title.length).toBeGreaterThan(0);
  });
});
