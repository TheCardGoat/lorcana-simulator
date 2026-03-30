/**
 * MatchRuntime Priority Pass Processing
 */

import type {
  ChessClockPlayerState,
  DynamicClockPlayerState,
  GameEvent,
  MatchState,
} from "./types";
import { createRuntimeState } from "./mutative";
import { expireReveals } from "./zone-operations";

export interface PriorityPassContext {
  state: MatchState;
  currentStateID: number;
}

interface InternalPriorityPassSuccess {
  success: true;
  stateID: number;
  state: MatchState;
  patches: [];
  pendingGameEvents: GameEvent[];
}

export function executePriorityPass(
  playerId: string,
  timestamp: number,
  ctx: PriorityPassContext,
): { result: InternalPriorityPassSuccess; newState: MatchState } {
  let newState = ctx.state;

  newState = createRuntimeState(ctx.state, (draft) => {
    // Settle clocks for the passing player
    if (draft.ctx.time.mode !== "none") {
      const time = draft.ctx.time;
      if (time.running && time.activePlayerID && time.startedAtMs) {
        const elapsedMs = timestamp - time.startedAtMs;
        const playerState = time.players[playerId];
        if (playerState) {
          playerState.totalConsumedMs += elapsedMs;
          playerState.lastUpdatedAtMs = timestamp;

          if (time.mode === "chess") {
            // Allow going negative for two-strike timeout
            playerState.reserveMsRemaining -= elapsedMs;
            if (playerState.reserveMsRemaining <= 0) {
              (playerState as ChessClockPlayerState).isInNegativeTime = true;
            }
          } else if (time.mode === "priority" && time.activeWindow) {
            const overageMs = Math.max(0, timestamp - time.activeWindow.deadlineMs);
            playerState.reserveMsRemaining = Math.max(
              0,
              playerState.reserveMsRemaining - overageMs,
            );
          } else if (time.mode === "dynamic") {
            // Allow going negative for two-strike timeout
            playerState.reserveMsRemaining -= elapsedMs;
            if (playerState.reserveMsRemaining <= 0) {
              (playerState as DynamicClockPlayerState).isInNegativeTime = true;
            }
          }
        }
      }
    }

    // Apply priority pass
    if (!draft.ctx.priority.passSequence.includes(playerId)) {
      draft.ctx.priority.passSequence.push(playerId);
    }
    draft.ctx.priority.holder = undefined;
    draft.ctx.priority.windowOpen = false;

    // Award move bonus in priority clock mode
    if (draft.ctx.time.mode === "priority") {
      const playerState = draft.ctx.time.players[playerId];
      if (playerState) {
        playerState.moveBonusMsGranted += draft.ctx.time.config.perMoveBonusMs;
        playerState.reserveMsRemaining += draft.ctx.time.config.perMoveBonusMs;
      }
    }

    // Award per-action bonus in dynamic clock mode (priority pass counts as an action)
    if (draft.ctx.time.mode === "dynamic") {
      const playerState = draft.ctx.time.players[playerId];
      if (playerState) {
        const bonusMs = draft.ctx.time.config.perActionBonusMs;
        const cap = draft.ctx.time.config.reserveCapMs;
        playerState.actionBonusMsGranted += bonusMs;
        playerState.reserveMsRemaining = Math.min(cap, playerState.reserveMsRemaining + bonusMs);
      }
    }

    draft.ctx._stateID++;
    expireReveals(draft);
  });

  return {
    result: {
      success: true,
      stateID: newState.ctx._stateID,
      state: newState as MatchState,
      patches: [],
      pendingGameEvents: [
        {
          kind: "PRIORITY_PASSED",
          playerId,
        },
      ],
    },
    newState,
  };
}
