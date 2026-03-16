/**
 * Time Control Tests
 *
 * Tests for passive clock management per PLAN.md Phase 3
 */

import { describe, it, expect } from "bun:test";
import {
  settleClocks,
  grantPriority,
  passPriority,
  pauseClock,
  resumeClock,
  awardMoveBonus,
  checkPriorityTimeout,
  handleWindowExpiry,
  handleReserveExpiry,
  getPlayerTimeSummary,
} from "./time-control";
import { createInitialTCGCtx } from "./types";
import type {
  MatchState,
  TimeContext,
  ChessClockConfig,
  PriorityClockConfig,
  ChessClockContext,
  PriorityClockContext,
  ClockPlayerState,
} from "./types";

function asChess(time: TimeContext): ChessClockContext {
  if (time.mode !== "chess") throw new Error("expected chess clock");
  return time;
}
function asPriority(time: TimeContext): PriorityClockContext {
  if (time.mode !== "priority") throw new Error("expected priority clock");
  return time;
}

// Helper to create a test match state
type TestGameState = { turn: number };

function createTestState(timeMode: "none"): MatchState<TestGameState>;
function createTestState(
  timeMode: "chess",
): MatchState<TestGameState> & { ctx: { time: ChessClockContext } };
function createTestState(
  timeMode: "priority",
): MatchState<TestGameState> & { ctx: { time: PriorityClockContext } };
function createTestState(
  timeMode: "none" | "chess" | "priority" = "none",
): MatchState<TestGameState> {
  const chessConfig: ChessClockConfig = {
    initialReserveMs: 600_000,
    incrementMs: 0,
    delayMs: 0,
    graceMs: 0,
    lossPolicy: "lose-on-time",
  };

  const priorityConfig: PriorityClockConfig = {
    perPriorityWindowMs: 30_000,
    reserveMs: 600_000,
    perMoveBonusMs: 5_000,
    endGameBaselineMs: 0,
    graceMs: 0,
    onWindowExpiry: "auto-pass-if-legal-else-forfeit",
    onReserveExpiry: "lose-on-time",
  };

  const timeControl =
    timeMode === "none"
      ? { mode: "none" as const }
      : timeMode === "chess"
        ? { mode: "chess" as const, config: chessConfig }
        : { mode: "priority" as const, config: priorityConfig };

  const ctx = createInitialTCGCtx({
    matchID: "match-123",
    gameID: "lorcana",
    rulesetHash: "ruleset-v1",
    timeConfig: timeControl,
  });

  // Add players to time control (ctx.time is narrowed by createInitialTCGCtx when mode is chess/priority)
  if (timeMode !== "none") {
    const time = ctx.time as ChessClockContext | PriorityClockContext;
    time.players["p1"] = {
      reserveMsRemaining:
        timeMode === "chess" ? chessConfig.initialReserveMs : priorityConfig.reserveMs,
      totalConsumedMs: 0,
      movesMade: 0,
      lastUpdatedAtMs: 1000,
    };

    if (timeMode === "priority") {
      const p1 = time.players["p1"] as
        | undefined
        | (ClockPlayerState & {
            totalWindowOverageMs: number;
            moveBonusMsGranted: number;
            windowTimeouts: number;
          });
      if (p1) {
        p1.totalWindowOverageMs = 0;
        p1.moveBonusMsGranted = 0;
        p1.windowTimeouts = 0;
      }
    }

    time.players["p2"] = { ...time.players["p1"] };
  }

  return {
    G: { turn: 1 },
    ctx,
  };
}

describe("Time Control", () => {
  describe("settleClocks", () => {
    it("should not modify state when no time control", () => {
      const state = createTestState("none");
      const result = settleClocks(state, 2000);

      expect(result).toBe(state);
    });

    it("should not modify state when clock is not running", () => {
      const state = createTestState("chess");
      asChess(state.ctx.time).running = false;
      const result = settleClocks(state, 2000);

      expect(result).toBe(state);
    });

    it("should settle chess clock correctly", () => {
      const state = createTestState("chess");
      const st = asChess(state.ctx.time);
      st.running = true;
      st.activePlayerID = "p1";
      st.startedAtMs = 1000;

      const result = settleClocks(state, 6000); // 5 seconds elapsed
      const time = asChess(result.ctx.time);
      expect(time.players["p1"].totalConsumedMs).toBe(5000);
      expect(time.players["p1"].reserveMsRemaining).toBe(595_000);
    });

    it("should handle chess clock timeout", () => {
      const state = createTestState("chess");
      const st = asChess(state.ctx.time);
      st.running = true;
      st.activePlayerID = "p1";
      st.startedAtMs = 1000;
      st.players["p1"].reserveMsRemaining = 5000; // Only 5 seconds left

      const result = settleClocks(state, 10_000); // 9 seconds elapsed
      const time = asChess(result.ctx.time);
      expect(time.players["p1"].reserveMsRemaining).toBe(0);
      expect(time.running).toBe(false);
      expect(time.pausedReason).toBe("GAME_ENDED");
    });

    it("should settle priority clock within window (no reserve burn)", () => {
      const state = createTestState("priority");
      const st = asPriority(state.ctx.time);
      st.running = true;
      st.activePlayerID = "p1";
      st.startedAtMs = 1000;
      st.prioritySeq = 1;
      st.activeWindow = {
        playerID: "p1",
        prioritySeq: 1,
        windowMs: 30_000,
        deadlineMs: 31_000,
      };

      const result = settleClocks(state, 20_000); // Within window
      const time = asPriority(result.ctx.time);
      expect(time.players["p1"].totalConsumedMs).toBe(19_000);
      expect(time.players["p1"].totalWindowOverageMs).toBe(0);
      expect(time.players["p1"].reserveMsRemaining).toBe(600_000); // No reserve burn
    });

    it("should settle priority clock with window overage (reserve burn)", () => {
      const state = createTestState("priority");
      const st = asPriority(state.ctx.time);
      st.running = true;
      st.activePlayerID = "p1";
      st.startedAtMs = 1000;
      st.prioritySeq = 1;
      st.activeWindow = {
        playerID: "p1",
        prioritySeq: 1,
        windowMs: 30_000,
        deadlineMs: 31_000,
      };

      const result = settleClocks(state, 40_000); // 9 seconds over window
      const time = asPriority(result.ctx.time);
      expect(time.players["p1"].totalConsumedMs).toBe(39_000);
      expect(time.players["p1"].totalWindowOverageMs).toBe(9000);
      expect(time.players["p1"].reserveMsRemaining).toBe(591_000); // Reserve burned
    });

    it("should track window timeouts in priority mode", () => {
      const state = createTestState("priority");
      const st = asPriority(state.ctx.time);
      st.running = true;
      st.activePlayerID = "p1";
      st.startedAtMs = 1000;
      st.activeWindow = {
        playerID: "p1",
        prioritySeq: 1,
        windowMs: 30_000,
        deadlineMs: 31_000,
      };

      const result = settleClocks(state, 40_000); // Past deadline
      expect(asPriority(result.ctx.time).players["p1"].windowTimeouts).toBe(1);
    });
  });

  describe("grantPriority", () => {
    it("should set priority holder", () => {
      const state = createTestState("none");
      const result = grantPriority(state, "p1", 1000);

      expect(result.ctx.priority.holder).toBe("p1");
      expect(result.ctx.priority.windowOpen).toBe(true);
    });

    it("should clear pass sequence", () => {
      const state = createTestState("none");
      state.ctx.priority.passSequence = ["p1", "p2"];
      const result = grantPriority(state, "p1", 1000);

      expect(result.ctx.priority.passSequence).toEqual([]);
    });

    it("should start chess clock when granting priority", () => {
      const state = createTestState("chess");
      const result = grantPriority(state, "p1", 1000);
      const time = asChess(result.ctx.time);
      expect(time.activePlayerID).toBe("p1");
      expect(time.running).toBe(true);
      expect(time.startedAtMs).toBe(1000);
    });

    it("should open priority window in priority mode", () => {
      const state = createTestState("priority");
      const result = grantPriority(state, "p1", 1000);
      const time = asPriority(result.ctx.time);
      expect(result.ctx.time.mode).toBe("priority");
      expect(time.prioritySeq).toBe(1);
      expect(time.activeWindow).toBeDefined();
      expect(time.activeWindow?.playerID).toBe("p1");
      expect(time.activeWindow?.windowMs).toBe(30_000);
      expect(time.activeWindow?.deadlineMs).toBe(31_000);
    });
  });

  describe("passPriority", () => {
    it("should add player to pass sequence", () => {
      const state = createTestState("none");
      state.ctx.priority.holder = "p1";
      const result = passPriority(state, "p1");

      expect(result.ctx.priority.passSequence).toContain("p1");
    });

    it("should clear priority holder", () => {
      const state = createTestState("none");
      state.ctx.priority.holder = "p1";
      state.ctx.priority.windowOpen = true;
      const result = passPriority(state, "p1");

      expect(result.ctx.priority.holder).toBeUndefined();
      expect(result.ctx.priority.windowOpen).toBe(false);
    });

    it("should not duplicate players in pass sequence", () => {
      const state = createTestState("none");
      state.ctx.priority.passSequence = ["p1"];
      const result = passPriority(state, "p1");

      expect(result.ctx.priority.passSequence).toEqual(["p1"]);
    });
  });

  describe("pauseClock", () => {
    it("should pause clock with reason", () => {
      const state = createTestState("chess");
      const st = asChess(state.ctx.time);
      st.running = true;
      st.activePlayerID = "p1";
      st.startedAtMs = 1000;

      const result = pauseClock(state, "ENGINE_RESOLVING", 5000);
      const time = asChess(result.ctx.time);
      expect(time.running).toBe(false);
      expect(time.pausedReason).toBe("ENGINE_RESOLVING");
    });

    it("should settle elapsed time before pausing", () => {
      const state = createTestState("chess");
      const st = asChess(state.ctx.time);
      st.running = true;
      st.activePlayerID = "p1";
      st.startedAtMs = 1000;

      const result = pauseClock(state, "ENGINE_RESOLVING", 6000);
      expect(asChess(result.ctx.time).players["p1"].totalConsumedMs).toBe(5000);
    });
  });

  describe("resumeClock", () => {
    it("should resume clock for player", () => {
      const state = createTestState("chess");
      const st = asChess(state.ctx.time);
      st.running = false;
      st.pausedReason = "ENGINE_RESOLVING";

      const result = resumeClock(state, "p1", 1000);
      const time = asChess(result.ctx.time);
      expect(time.running).toBe(true);
      expect(time.pausedReason).toBeUndefined();
      expect(time.activePlayerID).toBe("p1");
      expect(time.startedAtMs).toBe(1000);
    });

    it("should update player timestamp", () => {
      const state = createTestState("chess");
      const result = resumeClock(state, "p1", 5000);
      expect(asChess(result.ctx.time).players["p1"].lastUpdatedAtMs).toBe(5000);
    });
  });

  describe("awardMoveBonus", () => {
    it("should award bonus to player", () => {
      const state = createTestState("priority");
      const result = awardMoveBonus(state, "p1");
      const time = asPriority(result.ctx.time);
      expect(time.players["p1"].moveBonusMsGranted).toBe(5000);
      expect(time.players["p1"].reserveMsRemaining).toBe(605_000);
    });
  });

  describe("checkPriorityTimeout", () => {
    it("should detect window timeout", () => {
      const state = createTestState("priority");
      const st = asPriority(state.ctx.time);
      st.activePlayerID = "p1";
      st.activeWindow = {
        playerID: "p1",
        prioritySeq: 1,
        windowMs: 30_000,
        deadlineMs: 31_000,
      };

      const result = checkPriorityTimeout(state, "p1", 40_000);

      expect(result).toBe("window");
    });

    it("should detect reserve timeout", () => {
      const state = createTestState("priority");
      const st = asPriority(state.ctx.time);
      st.activePlayerID = "p1";
      st.players["p1"].reserveMsRemaining = 0;

      const result = checkPriorityTimeout(state, "p1", 1000);

      expect(result).toBe("reserve");
    });

    it("should return null if no timeout", () => {
      const state = createTestState("priority");
      const st = asPriority(state.ctx.time);
      st.activePlayerID = "p1";
      st.activeWindow = {
        playerID: "p1",
        prioritySeq: 1,
        windowMs: 30_000,
        deadlineMs: 31_000,
      };

      const result = checkPriorityTimeout(state, "p1", 20_000);

      expect(result).toBeNull();
    });
  });

  describe("handleWindowExpiry", () => {
    it("should auto-pass if legal", () => {
      const state = createTestState("none");
      const result = handleWindowExpiry(state, "p1", true);

      expect(result.action).toBe("auto-pass");
      expect(result.state.ctx.priority.passSequence).toContain("p1");
    });

    it("should forfeit if cannot auto-pass", () => {
      const state = createTestState("none");
      const result = handleWindowExpiry(state, "p1", false);

      expect(result.action).toBe("forfeit");
      expect(result.state.ctx.status.gameEnded).toBe(true);
      expect(result.state.ctx.status.reason).toBe("forfeit-window-expired");
    });
  });

  describe("handleReserveExpiry", () => {
    it("should end game with loss on time", () => {
      const state = createTestState("chess");
      const result = handleReserveExpiry(state, "p1");

      expect(result.ctx.status.gameEnded).toBe(true);
      expect(result.ctx.status.winner).toBe("p2");
      expect(result.ctx.status.reason).toBe("loss-on-time");
    });
  });

  describe("getPlayerTimeSummary", () => {
    it("should return null for no time control", () => {
      const state = createTestState("none");
      const result = getPlayerTimeSummary(state, "p1");

      expect(result).toBeNull();
    });

    it("should return chess time summary", () => {
      const state = createTestState("chess");
      const result = getPlayerTimeSummary(state, "p1");

      expect(result).toBeDefined();
      expect(result?.reserveMsRemaining).toBe(600_000);
      expect(result?.totalConsumedMs).toBe(0);
      expect(result?.movesMade).toBe(0);
      expect(result?.windowRemainingMs).toBeUndefined();
    });

    it("should return priority time summary with window", () => {
      const state = createTestState("priority");
      const st = asPriority(state.ctx.time);
      st.activePlayerID = "p1";
      st.activeWindow = {
        playerID: "p1",
        prioritySeq: 1,
        windowMs: 30_000,
        deadlineMs: Date.now() + 25_000,
      };

      const result = getPlayerTimeSummary(state, "p1");

      expect(result).toBeDefined();
      expect(result?.reserveMsRemaining).toBe(600_000);
      expect(result?.windowRemainingMs).toBeDefined();
    });

    it("should return null for unknown player", () => {
      const state = createTestState("chess");
      const result = getPlayerTimeSummary(state, "unknown");

      expect(result).toBeNull();
    });
  });
});
