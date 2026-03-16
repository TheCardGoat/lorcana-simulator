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
  ClockPauseReason,
  PriorityClockPlayerState,
} from "./types";

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
export function settleClocks<G>(state: MatchState<G>, now: number): MatchState<G> {
  const time = state.ctx.time;

  if (time.mode === "none") return state;
  if (!time.running) return state;
  if (!time.activePlayerID) return state;
  if (!time.startedAtMs) return state;

  const elapsedMs = now - time.startedAtMs;

  return produce(state, (draft) => {
    if (time.mode === "chess") {
      settleChessClockDraft(
        draft as MatchState<G> & { ctx: { time: ChessClockContext } },
        now,
        elapsedMs,
      );
    } else {
      settlePriorityClockDraft(
        draft as MatchState<G> & { ctx: { time: PriorityClockContext } },
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
 * This function mutates the draft directly within an Immer produce() callback.
 */
function settleChessClockDraft<G>(
  draft: MatchState<G> & { ctx: { time: ChessClockContext } },
  now: number,
  elapsedMs: number,
): void {
  const { activePlayerID } = draft.ctx.time;
  if (!activePlayerID) return;

  const playerState = draft.ctx.time.players[activePlayerID];
  if (!playerState) return;

  // Update consumed time
  playerState.totalConsumedMs += elapsedMs;
  playerState.reserveMsRemaining = Math.max(0, playerState.reserveMsRemaining - elapsedMs);
  playerState.lastUpdatedAtMs = now;

  // Check for timeout
  if (playerState.reserveMsRemaining === 0) {
    draft.ctx.time.running = false;
    draft.ctx.time.pausedReason = "GAME_ENDED";
    // Game end will be handled by caller
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
function settlePriorityClockDraft<G>(
  draft: MatchState<G> & { ctx: { time: PriorityClockContext } },
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

// =============================================================================
// Priority Management
// =============================================================================

/**
 * Grant priority to a player
 *
 * Opens a new priority window for the player.
 * Uses Immer's produce() for immutability - safe to call from anywhere.
 */
export function grantPriority<G>(
  state: MatchState<G>,
  playerId: string,
  now: number,
): MatchState<G> {
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
    }
  });
}

/**
 * Pass priority
 *
 * Records the pass in the pass sequence.
 * Uses Immer's produce() for immutability - safe to call from anywhere.
 */
export function passPriority<G>(state: MatchState<G>, playerId: string): MatchState<G> {
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
export function pauseClock<G>(
  state: MatchState<G>,
  reason: ClockPauseReason,
  now: number,
): MatchState<G> {
  const time = state.ctx.time;
  if (time.mode === "none") return state;

  // Settle any elapsed time first (settleClocks already uses produce internally)
  const settledState = settleClocks(state, now);

  return produce(settledState, (draft) => {
    const draftTime = draft.ctx.time as ChessClockContext | PriorityClockContext;
    draftTime.running = false;
    draftTime.pausedReason = reason;
  });
}

/**
 * Resume the clock
 * Uses Immer's produce() for immutability - safe to call from anywhere.
 */
export function resumeClock<G>(
  state: MatchState<G>,
  activePlayerId: string,
  now: number,
): MatchState<G> {
  const time = state.ctx.time;
  if (time.mode === "none") return state;

  return produce(state, (draft) => {
    // Type assertion needed because Immer's draft doesn't preserve mode narrowing
    const draftTime = draft.ctx.time as ChessClockContext | PriorityClockContext;
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
export function awardMoveBonus<G>(
  state: MatchState<G> & { ctx: { time: PriorityClockContext } },
  playerId: string,
): MatchState<G> {
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
// Timeout Handling
// =============================================================================

/**
 * Check if a player has timed out in priority mode
 * (Pure function - no state mutation)
 */
export function checkPriorityTimeout<G>(
  state: MatchState<G> & { ctx: { time: PriorityClockContext } },
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
export function handleWindowExpiry<G>(
  state: MatchState<G>,
  playerId: string,
  canAutoPass: boolean,
): { action: "auto-pass" | "forfeit"; state: MatchState<G> } {
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
export function handleReserveExpiry<G>(state: MatchState<G>, playerId: string): MatchState<G> {
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
// Helpers
// =============================================================================

function getOpponentId<G>(state: MatchState<G>, playerId: string): string | undefined {
  const time = state.ctx.time;
  // Get opponent from players in time control
  if (time.mode === "none") return undefined;
  const players = Object.keys(time.players);
  return players.find((p) => p !== playerId);
}

/**
 * Get remaining time summary for a player
 */
export function getPlayerTimeSummary<G>(
  state: MatchState<G>,
  playerId: string,
): {
  reserveMsRemaining: number;
  totalConsumedMs: number;
  movesMade: number;
  windowRemainingMs?: number;
} | null {
  if (state.ctx.time.mode === "none") return null;

  const playerState = state.ctx.time.players[playerId];
  if (!playerState) return null;

  const summary: {
    reserveMsRemaining: number;
    totalConsumedMs: number;
    movesMade: number;
    windowRemainingMs?: number;
  } = {
    reserveMsRemaining: playerState.reserveMsRemaining,
    totalConsumedMs: playerState.totalConsumedMs,
    movesMade: playerState.movesMade,
  };

  // Add window info if this player has priority
  if (
    state.ctx.time.mode === "priority" &&
    state.ctx.time.activePlayerID === playerId &&
    state.ctx.time.activeWindow
  ) {
    const now = Date.now();
    summary.windowRemainingMs = Math.max(0, state.ctx.time.activeWindow.deadlineMs - now);
  }

  return summary;
}
