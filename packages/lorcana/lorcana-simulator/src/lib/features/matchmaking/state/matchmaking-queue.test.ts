import { beforeEach, describe, expect, it, mock } from "bun:test";

const testGlobals = globalThis as any;

testGlobals.$state = Object.assign(<T>(value: T): T => value, {
  eager: <T>(value: T): T => value,
  raw: <T>(value: T): T => value,
  snapshot: <T>(value: T): T => value,
});

testGlobals.$derived = Object.assign(<T>(value: T): T => value, {
  by: <T>(fn: () => T): T => fn(),
});

testGlobals.$effect = Object.assign(
  (fn: () => void | (() => void)): void => {
    fn();
  },
  {
    pre: (fn: () => void | (() => void)): void => {
      fn();
    },
    pending: (): boolean => false,
    tracking: (): boolean => false,
    root: <T>(fn: () => T): T => fn(),
  },
);

const joinMatchmakingQueue = mock();
const leaveMatchmakingQueue = mock();
const getMatchmakingStatus = mock();
const trackEvent = mock();
const goto = mock();

class MatchmakingJoinError extends Error {
  public readonly matchId?: string;
  constructor(message: string, matchId?: string) {
    super(message);
    this.name = "MatchmakingJoinError";
    this.matchId = matchId;
  }
}

mock.module("../api/matchmaking-api.js", () => ({
  joinMatchmakingQueue,
  leaveMatchmakingQueue,
  getMatchmakingStatus,
  forfeitMatch: mock(),
  MatchmakingJoinError,
}));

mock.module("$lib/analytics/analytics.js", () => ({
  trackEvent,
  setUserProperties: () => {},
  isAnalyticsConfigured: () => false,
  normalizePathForAnalytics: (p: string) => p,
  initAnalytics: () => {},
  trackPageView: () => {},
  truncateForAnalytics: (input: unknown) =>
    typeof input === "string" ? input.slice(0, 100) : undefined,
  analyticsErrorFields: (error: unknown) => {
    const code = error instanceof Error ? error.name : undefined;
    const rawMessage =
      error instanceof Error ? error.message : typeof error === "string" ? error : undefined;
    const message =
      typeof rawMessage === "string" && rawMessage.length > 0
        ? rawMessage.slice(0, 100)
        : undefined;
    return {
      ...(code ? { error_code: code } : {}),
      ...(message ? { error_message: message } : {}),
    };
  },
  trackException: () => {},
  updateConsent: () => {},
  ANALYTICS_TEXT_MAX_LENGTH: 100,
}));

mock.module("$app/navigation", () => ({
  goto,
}));

mock.module("$env/dynamic/public", () => ({
  env: {},
}));

mock.module("$lib/features/practice-match/practice-match-storage.js", () => ({
  saveRankedMatchSession: () => {},
}));

const { MatchmakingQueueStore } = await import("./matchmaking-queue.svelte.ts");

function createDeferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (reason?: unknown) => void;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });

  return { promise, resolve, reject };
}

describe("MatchmakingQueueStore", () => {
  beforeEach(() => {
    joinMatchmakingQueue.mockClear();
    leaveMatchmakingQueue.mockClear();
    getMatchmakingStatus.mockClear();
    trackEvent.mockClear();
    goto.mockClear();
  });

  it("enters a joining state immediately and ignores duplicate join requests", async () => {
    const pendingJoin = createDeferred<{
      object: "matchmaking_entry";
      status: "queued";
      queuedAt: number;
      expiresAt: number;
    }>();
    joinMatchmakingQueue.mockImplementation(() => pendingJoin.promise);

    const store = new MatchmakingQueueStore();
    const joinParams = {
      gameProfileId: "profile_1",
      format: "infinity",
      mode: "3",
    } as const;

    const firstJoin = store.join(joinParams);
    const secondJoin = store.join(joinParams);

    expect(store.status).toBe("joining");
    expect(joinMatchmakingQueue).toHaveBeenCalledTimes(1);

    pendingJoin.resolve({
      object: "matchmaking_entry",
      status: "queued",
      queuedAt: Date.now(),
      expiresAt: Date.now() + 300_000,
    });

    await Promise.all([firstJoin, secondJoin]);

    expect(store.status).toBe("queued");
    expect(trackEvent).toHaveBeenCalledWith("queue_join", {
      format: "infinity",
      mode: "3",
      matchType: "ranked",
    });

    store.destroy();
  });

  it("returns to idle when joining fails with a generic API error", async () => {
    joinMatchmakingQueue.mockImplementation(async () => {
      throw new Error("Queue service unavailable");
    });

    const store = new MatchmakingQueueStore();

    await store.join({
      gameProfileId: "profile_1",
      format: "infinity",
      mode: "3",
    });

    expect(store.status).toBe("idle");
    expect(store.error).toBe("Queue service unavailable");
    expect(trackEvent).toHaveBeenCalledWith("queue_join_error", {
      error: "api_error",
      error_code: "Error",
      error_message: "Queue service unavailable",
    });

    store.destroy();
  });

  it("hydrateFromStatus restores match_ready with pending accept flags from API", () => {
    const store = new MatchmakingQueueStore();
    const deadline = Date.now() + 45_000;

    store.hydrateFromStatus({
      object: "matchmaking_status",
      queued: false,
      pendingMatchId: "pm_1",
      pendingMatchDeadline: deadline,
      pendingSelfAccepted: true,
      pendingOpponentAccepted: false,
    });

    expect(store.status).toBe("match_ready");
    expect(store.pendingMatchId).toBe("pm_1");
    expect(store.acceptDeadline).toBe(deadline);
    expect(store.selfAccepted).toBe(true);
    expect(store.opponentAccepted).toBe(false);

    store.destroy();
  });

  it("checkStatus applies pending snapshot when status API returns pending fields", async () => {
    const deadline = Date.now() + 30_000;
    getMatchmakingStatus.mockResolvedValue({
      object: "matchmaking_status",
      queued: false,
      pendingMatchId: "pm_2",
      pendingMatchDeadline: deadline,
      pendingSelfAccepted: false,
      pendingOpponentAccepted: true,
    });

    const store = new MatchmakingQueueStore();
    await store.checkStatus();

    expect(store.status).toBe("match_ready");
    expect(store.pendingMatchId).toBe("pm_2");
    expect(store.selfAccepted).toBe(false);
    expect(store.opponentAccepted).toBe(true);

    store.destroy();
  });

  it("handleStatusUpdate refreshes opponentAccepted from poll while match_ready", () => {
    const store = new MatchmakingQueueStore();
    const deadline = Date.now() + 20_000;

    store.handleStatusUpdate({
      queued: false,
      pendingMatchId: "pm_3",
      pendingMatchDeadline: deadline,
      pendingSelfAccepted: true,
      pendingOpponentAccepted: false,
    });

    expect(store.opponentAccepted).toBe(false);

    store.handleStatusUpdate({
      queued: false,
      pendingMatchId: "pm_3",
      pendingMatchDeadline: deadline,
      pendingSelfAccepted: true,
      pendingOpponentAccepted: true,
    });

    expect(store.selfAccepted).toBe(true);
    expect(store.opponentAccepted).toBe(true);

    store.destroy();
  });

  it("normalizes pending deadlines with server time to avoid client clock skew timeouts", () => {
    const store = new MatchmakingQueueStore();
    const before = Date.now();

    store.handleMatchReady({
      pendingMatchId: "pm_skewed",
      opponentDisplayName: "Opponent",
      acceptDeadline: 1_015_000,
      serverNow: 1_000_000,
    });

    expect(store.status).toBe("match_ready");
    expect(store.pendingMatchId).toBe("pm_skewed");
    expect(store.acceptDeadline).toBeGreaterThanOrEqual(before + 15_000);
    expect(store.acceptDeadline).toBeLessThanOrEqual(Date.now() + 15_000);
    expect(store.error).toBeNull();

    store.destroy();
  });

  it("handleStatusUpdate does not reset match_ready on a generic poll with no pending match", () => {
    const store = new MatchmakingQueueStore();
    const deadline = Date.now() + 20_000;

    store.handleStatusUpdate({
      queued: false,
      pendingMatchId: "pm_4",
      pendingMatchDeadline: deadline,
      pendingSelfAccepted: false,
      pendingOpponentAccepted: false,
    });
    expect(store.status).toBe("match_ready");

    // A poll returning { queued: false } with no pendingMatchId must not reset
    // match_ready — the server may clear the pending match before delivering
    // match_found, so this response can race the WS event.
    store.handleStatusUpdate({ queued: false });

    expect(store.status).toBe("match_ready");
    expect(store.pendingMatchId).toBe("pm_4");

    store.destroy();
  });

  it("handleStatusUpdate does not downgrade match_ready to queued on a stale { queued:true } poll", () => {
    // Scenario: the second player joins and is instantly matched. The matchmaking_poll
    // they sent just before match_ready arrives carries { queued: true } from the
    // server (it was processed before the match was created). That stale response
    // must NOT revert status from match_ready back to queued.
    const store = new MatchmakingQueueStore();
    const deadline = Date.now() + 15_000;

    store.handleMatchReady({
      pendingMatchId: "pm_instant",
      opponentDisplayName: "Opponent",
      acceptDeadline: deadline,
    });
    expect(store.status).toBe("match_ready");

    store.handleStatusUpdate({
      queued: true,
      queuedAt: Date.now() - 100,
      expiresAt: Date.now() + 300_000,
      position: 1,
    });

    // Status must stay match_ready, not regress to queued
    expect(store.status).toBe("match_ready");
    expect(store.pendingMatchId).toBe("pm_instant");

    store.destroy();
  });
});
