/**
 * Time Control - Passive Clock Management
 *
 * Phase 3 of PLAN.md: ctx.time Passive Clock System
 *
 * Implements server-authoritative passive time management.
 * Clocks only change on server transitions, not via continuous ticking.
 *
 * NOTE: All functions in this module use Immer's `produce()` for immutability.
 * They can be called safely from outside a produce() block.
 */

import { produce } from "immer";
import type {
  MatchState,
  ChessClockContext,
  PriorityClockContext,
  DynamicClockContext,
  DynamicClockConfig,
  ClockPauseReason,
  PriorityClockPlayerState,
  DynamicClockPlayerState,
  ChessClockPlayerState,
} from "./types";

export const DEFAULT_DYNAMIC_CLOCK_CONFIG: DynamicClockConfig = {
  initialReserveMs: 150_000,
  reserveCapMs: 150_000,
  perActionBonusMs: 5_000,
  perTurnPassBonusMs: 60_000,
  resetTimeOnSkipMs: 60_000,
  graceMs: 0,
};

// =============================================================================
// Passive Clock Settlement
// =============================================================================

/**
 * Settle elapsed time on the current active player
 *
 * This is the core of passive time management - clocks are only updated
 * when relevant transitions occur (command receipt, priority changes, etc.)
 *
 * Uses Immer's produce() for immutability - safe to call from anywhere.
 */
export function settleClocks(state: MatchState, now: number): MatchState {
  const time = state.ctx.time;

  if (time.mode === "none") return state;
  if (!time.running) return state;
  if (!time.activePlayerID) return state;
  if (!time.startedAtMs) return state;

  const elapsedMs = now - time.startedAtMs;

  return produce(state, (draft) => {
    if (time.mode === "chess") {
      settleChessClockDraft(
        draft as MatchState & { ctx: { time: ChessClockContext } },
        now,
        elapsedMs,
      );
    } else if (time.mode === "priority") {
      settlePriorityClockDraft(
        draft as MatchState & { ctx: { time: PriorityClockContext } },
        now,
        elapsedMs,
      );
    } else if (time.mode === "dynamic") {
      settleDynamicClockDraft(
        draft as MatchState & { ctx: { time: DynamicClockContext } },
        now,
        elapsedMs,
      );
    }
  });
}

/**
 * Settle chess clock time (draft version - mutates draft)
 *
 * In chess mode, only the active player's clock runs.
 * Allows going negative for the two-strike timeout system -
 * the opponent decides when to skip/drop, not the engine automatically.
 */
function settleChessClockDraft(
  draft: MatchState & { ctx: { time: ChessClockContext } },
  now: number,
  elapsedMs: number,
): void {
  const { activePlayerID } = draft.ctx.time;
  if (!activePlayerID) return;

  const playerState = draft.ctx.time.players[activePlayerID];
  if (!playerState) return;

  // Update consumed time (allow going negative)
  playerState.totalConsumedMs += elapsedMs;
  playerState.reserveMsRemaining -= elapsedMs;
  playerState.lastUpdatedAtMs = now;

  // Mark negative time (but don't stop the clock - opponent decides what to do)
  if (playerState.reserveMsRemaining <= 0) {
    playerState.isInNegativeTime = true;
  }
}

/**
 * Settle priority clock time (draft version - mutates draft)
 *
 * In priority mode:
 * - If player acts within the window: no reserve consumed
 * - If player acts after the window: only overage burns reserve
 *
 * This function mutates the draft directly within an Immer produce() callback.
 */
function settlePriorityClockDraft(
  draft: MatchState & { ctx: { time: PriorityClockContext } },
  now: number,
  elapsedMs: number,
): void {
  const { activePlayerID, activeWindow } = draft.ctx.time;
  if (!activePlayerID) return;

  const playerState = draft.ctx.time.players[activePlayerID] as PriorityClockPlayerState;
  if (!playerState) return;

  // Calculate window overage if we're past the deadline
  let windowOverageMs = 0;
  if (activeWindow && now > activeWindow.deadlineMs) {
    windowOverageMs = now - activeWindow.deadlineMs;
    playerState.windowTimeouts++;
  }

  // Only overage burns reserve in priority mode
  const reserveBurnMs = Math.max(0, windowOverageMs);

  playerState.totalConsumedMs += elapsedMs;
  playerState.totalWindowOverageMs += windowOverageMs;
  playerState.reserveMsRemaining = Math.max(0, playerState.reserveMsRemaining - reserveBurnMs);
  playerState.lastUpdatedAtMs = now;

  // Check for reserve timeout
  if (playerState.reserveMsRemaining === 0) {
    draft.ctx.time.running = false;
    draft.ctx.time.pausedReason = "GAME_ENDED";
    // Game end (loss on time) will be handled by caller
  }
}

/**
 * Settle dynamic clock time (draft version - mutates draft)
 *
 * In dynamic mode, the active player's clock burns continuously.
 * Allows going negative for the two-strike timeout system.
 */
function settleDynamicClockDraft(
  draft: MatchState & { ctx: { time: DynamicClockContext } },
  now: number,
  elapsedMs: number,
): void {
  const { activePlayerID } = draft.ctx.time;
  if (!activePlayerID) return;

  const playerState = draft.ctx.time.players[activePlayerID];
  if (!playerState) return;

  // Update consumed time (allow going negative)
  playerState.totalConsumedMs += elapsedMs;
  playerState.reserveMsRemaining -= elapsedMs;
  playerState.lastUpdatedAtMs = now;

  // Mark negative time (opponent decides what to do)
  if (playerState.reserveMsRemaining <= 0) {
    playerState.isInNegativeTime = true;
  }
}

// =============================================================================
// Priority Management
// =============================================================================

/**
 * Grant priority to a player
 *
 * Opens a new priority window for the player.
 * Uses Immer's produce() for immutability - safe to call from anywhere.
 */
export function grantPriority(state: MatchState, playerId: string, now: number): MatchState {
  return produce(state, (draft) => {
    draft.ctx.priority.holder = playerId;
    draft.ctx.priority.windowOpen = true;
    draft.ctx.priority.passSequence = [];

    // Update time control
    if (draft.ctx.time.mode !== "none") {
      draft.ctx.time.activePlayerID = playerId;
      draft.ctx.time.startedAtMs = now;
      draft.ctx.time.running = true;
      draft.ctx.time.pausedReason = undefined;

      if (draft.ctx.time.mode === "priority") {
        draft.ctx.time.prioritySeq++;
        const windowMs = draft.ctx.time.config.perPriorityWindowMs;
        draft.ctx.time.activeWindow = {
          playerID: playerId,
          prioritySeq: draft.ctx.time.prioritySeq,
          windowMs,
          deadlineMs: now + windowMs,
        };
      }
      // Dynamic mode: clock starts for the priority holder, no window concept
    }
  });
}

/**
 * Pass priority
 *
 * Records the pass in the pass sequence.
 * Uses Immer's produce() for immutability - safe to call from anywhere.
 */
export function passPriority(state: MatchState, playerId: string): MatchState {
  return produce(state, (draft) => {
    // Add to pass sequence if not already in it
    if (!draft.ctx.priority.passSequence.includes(playerId)) {
      draft.ctx.priority.passSequence.push(playerId);
    }

    // Clear current holder
    draft.ctx.priority.holder = undefined;
    draft.ctx.priority.windowOpen = false;
  });
}

// =============================================================================
// Clock Control
// =============================================================================

/**
 * Pause the clock
 * Uses Immer's produce() for immutability - safe to call from anywhere.
 */
export function pauseClock(state: MatchState, reason: ClockPauseReason, now: number): MatchState {
  const time = state.ctx.time;
  if (time.mode === "none") return state;

  // Settle any elapsed time first (settleClocks already uses produce internally)
  const settledState = settleClocks(state, now);

  return produce(settledState, (draft) => {
    const draftTime = draft.ctx.time as
      | ChessClockContext
      | PriorityClockContext
      | DynamicClockContext;
    draftTime.running = false;
    draftTime.pausedReason = reason;
  });
}

/**
 * Resume the clock
 * Uses Immer's produce() for immutability - safe to call from anywhere.
 */
export function resumeClock(state: MatchState, activePlayerId: string, now: number): MatchState {
  const time = state.ctx.time;
  if (time.mode === "none") return state;

  return produce(state, (draft) => {
    const draftTime = draft.ctx.time as
      | ChessClockContext
      | PriorityClockContext
      | DynamicClockContext;
    draftTime.activePlayerID = activePlayerId;
    draftTime.startedAtMs = now;
    draftTime.running = true;
    draftTime.pausedReason = undefined;

    // Update player timestamp
    const playerState = draftTime.players[activePlayerId];
    if (playerState) {
      playerState.lastUpdatedAtMs = now;
    }
  });
}

/**
 * Award per-move bonus to a player
 *
 * Called when a player successfully makes a move or pass in priority mode.
 * Uses Immer's produce() for immutability - safe to call from anywhere.
 */
export function awardMoveBonus(
  state: MatchState & { ctx: { time: PriorityClockContext } },
  playerId: string,
): MatchState {
  const playerState = state.ctx.time.players[playerId];
  if (!playerState) return state;

  const bonusMs = state.ctx.time.config.perMoveBonusMs;
  return produce(state, (draft) => {
    const draftPlayerState = draft.ctx.time.players[playerId];
    if (draftPlayerState) {
      draftPlayerState.moveBonusMsGranted += bonusMs;
      draftPlayerState.reserveMsRemaining += bonusMs;
    }
  });
}

// =============================================================================
// Dynamic Clock Bonuses
// =============================================================================

/**
 * Award per-action bonus in dynamic clock mode.
 * Called after any successful action by a player.
 * Reserve is capped at reserveCapMs.
 */
export function awardDynamicActionBonus(
  state: MatchState & { ctx: { time: DynamicClockContext } },
  playerId: string,
): MatchState {
  const playerState = state.ctx.time.players[playerId];
  if (!playerState) return state;

  const bonusMs = state.ctx.time.config.perActionBonusMs;
  const cap = state.ctx.time.config.reserveCapMs;
  return produce(state, (draft) => {
    const draftPlayerState = draft.ctx.time.players[playerId] as DynamicClockPlayerState;
    if (draftPlayerState) {
      draftPlayerState.actionBonusMsGranted += bonusMs;
      draftPlayerState.reserveMsRemaining = Math.min(
        cap,
        draftPlayerState.reserveMsRemaining + bonusMs,
      );
    }
  });
}

/**
 * Award turn-pass bonus in dynamic clock mode.
 * Called when a player passes their turn.
 * Reserve is capped at reserveCapMs.
 */
export function awardDynamicTurnPassBonus(
  state: MatchState & { ctx: { time: DynamicClockContext } },
  playerId: string,
): MatchState {
  const playerState = state.ctx.time.players[playerId];
  if (!playerState) return state;

  const bonusMs = state.ctx.time.config.perTurnPassBonusMs;
  const cap = state.ctx.time.config.reserveCapMs;
  return produce(state, (draft) => {
    const draftPlayerState = draft.ctx.time.players[playerId] as DynamicClockPlayerState;
    if (draftPlayerState) {
      draftPlayerState.turnPassBonusMsGranted += bonusMs;
      draftPlayerState.reserveMsRemaining = Math.min(
        cap,
        draftPlayerState.reserveMsRemaining + bonusMs,
      );
    }
  });
}

// =============================================================================
// Timeout Handling
// =============================================================================

/**
 * Check if a player has timed out in priority mode
 * (Pure function - no state mutation)
 */
export function checkPriorityTimeout(
  state: MatchState & { ctx: { time: PriorityClockContext } },
  playerId: string,
  now: number,
): "window" | "reserve" | null {
  const { activeWindow } = state.ctx.time;
  const playerState = state.ctx.time.players[playerId];

  if (!playerState) return null;

  // Check window expiry
  if (activeWindow && now > activeWindow.deadlineMs) {
    return "window";
  }

  // Check reserve expiry
  if (playerState.reserveMsRemaining <= 0) {
    return "reserve";
  }

  return null;
}

/**
 * Handle window expiry in priority mode
 *
 * Default policy: auto-pass-if-legal-else-forfeit
 * Uses Immer's produce() for immutability - safe to call from anywhere.
 */
export function handleWindowExpiry(
  state: MatchState,
  playerId: string,
  canAutoPass: boolean,
): { action: "auto-pass" | "forfeit"; state: MatchState } {
  if (canAutoPass) {
    const newState = passPriority(state, playerId);
    return { action: "auto-pass", state: newState };
  } else {
    // Forfeit the game
    const newState = produce(state, (draft) => {
      draft.ctx.status.gameEnded = true;
      draft.ctx.status.reason = "forfeit-window-expired";
      if (draft.ctx.time.mode !== "none") {
        draft.ctx.time.running = false;
        draft.ctx.time.pausedReason = "GAME_ENDED";
      }
    });
    return { action: "forfeit", state: newState };
  }
}

/**
 * Handle reserve expiry (loss on time)
 * Uses Immer's produce() for immutability - safe to call from anywhere.
 */
export function handleReserveExpiry(state: MatchState, playerId: string): MatchState {
  return produce(state, (draft) => {
    draft.ctx.status.gameEnded = true;
    draft.ctx.status.winner = getOpponentId(state, playerId);
    draft.ctx.status.reason = "loss-on-time";
    if (draft.ctx.time.mode !== "none") {
      draft.ctx.time.running = false;
      draft.ctx.time.pausedReason = "GAME_ENDED";
    }
  });
}

// =============================================================================
// Shared Timeout (Chess + Dynamic)
// =============================================================================

/**
 * Check if a player has timed out (works for both chess and dynamic modes).
 * Returns "first" if this is the first timeout (opponent can skip),
 * "second" if this is the second timeout (opponent can drop),
 * or null if no timeout.
 */
export function checkTimeout(state: MatchState, playerId: string): "first" | "second" | null {
  const time = state.ctx.time;
  if (time.mode !== "chess" && time.mode !== "dynamic") return null;

  const playerState = time.players[playerId] as
    | ChessClockPlayerState
    | DynamicClockPlayerState
    | undefined;
  if (!playerState) return null;

  if (!playerState.isInNegativeTime) return null;

  if (playerState.timeoutCount >= 1) return "second";
  return "first";
}

/**
 * Reset a player's time after the opponent skips their turn.
 * Sets reserve to resetTimeOnSkipMs, clears negative time, increments timeout count.
 * Works for both chess and dynamic modes.
 */
export function resetPlayerTimeAfterSkip(state: MatchState, playerId: string): MatchState {
  const time = state.ctx.time;
  if (time.mode !== "chess" && time.mode !== "dynamic") return state;

  const resetMs =
    time.mode === "chess" ? time.config.resetTimeOnSkipMs : time.config.resetTimeOnSkipMs;

  return produce(state, (draft) => {
    const draftTime = draft.ctx.time as ChessClockContext | DynamicClockContext;
    const playerState = draftTime.players[playerId] as
      | ChessClockPlayerState
      | DynamicClockPlayerState;
    if (!playerState) return;

    playerState.reserveMsRemaining = resetMs;
    playerState.isInNegativeTime = false;
    playerState.timeoutCount++;
  });
}

// =============================================================================
// Helpers
// =============================================================================

function getOpponentId(state: MatchState, playerId: string): string | undefined {
  const time = state.ctx.time;
  // Get opponent from players in time control
  if (time.mode === "none") return undefined;
  const players = Object.keys(time.players);
  return players.find((p) => p !== playerId);
}

export type PlayerTimeSummary = {
  reserveMsRemaining: number;
  totalConsumedMs: number;
  movesMade: number;
  windowRemainingMs?: number;
  isInNegativeTime?: boolean;
  timeoutCount?: number;
};

/**
 * Get remaining time summary for a player
 */
export function getPlayerTimeSummary(
  state: MatchState,
  playerId: string,
): PlayerTimeSummary | null {
  if (state.ctx.time.mode === "none") return null;

  const playerState = state.ctx.time.players[playerId];
  if (!playerState) return null;

  const summary: PlayerTimeSummary = {
    reserveMsRemaining: playerState.reserveMsRemaining,
    totalConsumedMs: playerState.totalConsumedMs,
    movesMade: playerState.movesMade,
  };

  // Add window info if this player has priority (priority mode)
  if (
    state.ctx.time.mode === "priority" &&
    state.ctx.time.activePlayerID === playerId &&
    state.ctx.time.activeWindow
  ) {
    const now = Date.now();
    summary.windowRemainingMs = Math.max(0, state.ctx.time.activeWindow.deadlineMs - now);
  }

  // Add timeout info for chess and dynamic modes
  if (state.ctx.time.mode === "chess" || state.ctx.time.mode === "dynamic") {
    const timedPlayerState = playerState as ChessClockPlayerState | DynamicClockPlayerState;
    summary.isInNegativeTime = timedPlayerState.isInNegativeTime;
    summary.timeoutCount = timedPlayerState.timeoutCount;
  }

  return summary;
}
