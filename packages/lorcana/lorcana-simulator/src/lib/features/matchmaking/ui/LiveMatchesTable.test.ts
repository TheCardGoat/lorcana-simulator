import { describe, expect, it } from "bun:test";
import { render } from "svelte/server";
import type { LiveMatchesStore } from "../state/live-matches.svelte.js";
import LiveMatchesTable from "./LiveMatchesTable.svelte";

describe("LiveMatchesTable", () => {
  it("renders spectator counts and spectate links", () => {
    const store = {
      matches: [
        {
          matchId: "match-1",
          currentGameId: "game-1",
          player1: { id: "user-1", displayName: "Alice" },
          player2: { id: "user-2", displayName: "Bob" },
          player1Score: 1,
          player2Score: 0,
          format: "best_of_3" as const,
          matchType: "casual",
          createdAt: new Date().toISOString(),
          spectatorCount: 7,
        },
      ],
      total: 1,
      loading: false,
      error: null,
      displayLimit: 25,
      refresh: async () => {},
      showMore: () => {},
      startPolling: () => {},
      stopPolling: () => {},
      destroy: () => {},
    } as unknown as LiveMatchesStore;

    const { body } = render(LiveMatchesTable, {
      props: {
        store,
      },
    });

    expect(body).toContain("/spectate/game-1");
    expect(body).toContain(">7</span>");
    expect(body).toContain("Alice");
    expect(body).toContain("Bob");
  });
});
