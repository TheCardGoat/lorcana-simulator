import { beforeEach, describe, expect, it, mock } from "bun:test";

import type { MatchmakingContext } from "../api/player-context-api.js";
import type { MatchmakingDashboardResponse } from "../api/matchmaking-dashboard-api.js";
import type { LiveMatchListResponse } from "../api/live-matches-api.js";
import type { QueueStatsResponse } from "../api/queue-stats-api.js";

const serverFetchMock = mock(async (_url: string, _init?: RequestInit): Promise<Response> => {
  throw new Error(`unmocked serverFetch: ${_url}`);
});

mock.module("$lib/config/public-url-config.js", () => ({
  getApiOrigin: () => "https://api.public.test",
  getGameServerOrigin: () => "https://game.public.test",
}));

mock.module("$lib/server/fetch-with-cf.js", () => ({
  getServerApiOrigin: () => "https://api.internal.test",
  getServerGameServerOrigin: () => "https://game.internal.test",
  serverFetch: serverFetchMock,
}));

const { loadMatchmakingData } = await import("./load-matchmaking-data.js");

const emptyLiveMatches: LiveMatchListResponse = {
  object: "live_match_list",
  matches: [],
  total: 0,
};

const emptyQueueStats: QueueStatsResponse = {
  object: "matchmaking_stats",
  partitions: [],
};

const engagement = {
  walletBalance: 0,
  featuredEvent: null,
  activeEvents: [],
} as MatchmakingContext["engagement"];

const baseContext = (overrides: Partial<MatchmakingContext> = {}): MatchmakingContext => ({
  account: {
    userId: "u1",
    name: "N",
    email: "n@e.com",
    image: null,
    username: "n",
    displayUsername: "N",
    linkedAccounts: [],
  },
  activeGameProfileId: "gp1",
  engagement,
  profiles: [
    {
      gameProfileId: "gp1",
      displayName: "P1",
      selectedDeckId: "d1",
      selectedDeckSummary: null,
      decks: null,
    },
  ],
  dailyStreak: { currentStreak: 0, multiplier: 1.0, nextTier: { days: 3, multiplier: 1.1 } },
  ...overrides,
});

describe("loadMatchmakingData", () => {
  beforeEach(() => {
    serverFetchMock.mockReset();
  });

  it("uses internal game server origin for dashboard and status", async () => {
    const dashboard: MatchmakingDashboardResponse = {
      object: "matchmaking_dashboard",
      liveMatches: emptyLiveMatches,
      queueStats: emptyQueueStats,
      activeMatchId: null,
      matchmakingStatus: null,
      lobbyRoom: null,
    };
    serverFetchMock.mockImplementation(async (url: string) => {
      if (url.includes("api.internal.test") && url.includes("matchmaking-context")) {
        return new Response(null, { status: 401 });
      }
      if (url.includes("game.internal.test") && url.includes("dashboard")) {
        return Response.json(dashboard);
      }
      if (url.includes("gateway/ticket")) {
        return new Response(null, { status: 401 });
      }
      return new Response("unexpected", { status: 500 });
    });

    const req = new Request("https://sim.test/matchmaking", {
      headers: { cookie: "session=x" },
    });
    await loadMatchmakingData(req);

    const urls = serverFetchMock.mock.calls.map((c) => c[0] as string);
    expect(urls.some((u) => u.startsWith("https://game.internal.test/"))).toBe(true);
    expect(urls.every((u) => !u.includes("game.public.test"))).toBe(true);
  });

  it("does not fetch decks on load — active profile decks stay null for lazy loading", async () => {
    const ctx = baseContext();

    serverFetchMock.mockImplementation(async (url: string) => {
      if (url.includes("matchmaking-context")) {
        return Response.json(ctx);
      }
      if (url.includes("dashboard")) {
        return Response.json({
          object: "matchmaking_dashboard",
          liveMatches: emptyLiveMatches,
          queueStats: emptyQueueStats,
          activeMatchId: null,
          matchmakingStatus: { object: "matchmaking_status", queued: false },
          lobbyRoom: null,
        } satisfies MatchmakingDashboardResponse);
      }
      if (url.includes("gateway/ticket")) {
        return Response.json({ ticket: "t1" });
      }
      return new Response("unexpected", { status: 500 });
    });

    const result = await loadMatchmakingData(
      new Request("https://sim.test/matchmaking", {
        headers: { cookie: "session=x" },
      }),
    );

    expect(result.matchmakingContext?.profiles[0]?.decks).toBeNull();
    const deckCalls = serverFetchMock.mock.calls.filter((c) => String(c[0]).includes("/profiles/"));
    expect(deckCalls.length).toBe(0);
  });
});
