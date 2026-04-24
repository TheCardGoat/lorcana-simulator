import { beforeEach, describe, expect, it, mock } from "bun:test";

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
}));

mock.module("$app/navigation", () => ({
  goto,
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

  it("handleStatusUpdate resets match_ready when server reports no queue and no pending", () => {
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

    store.handleStatusUpdate({ queued: false });

    expect(store.status).toBe("idle");
    expect(store.pendingMatchId).toBeNull();

    store.destroy();
  });
});
