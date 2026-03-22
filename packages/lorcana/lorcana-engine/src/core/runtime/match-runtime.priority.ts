/**
 * MatchRuntime Priority Pass Processing
 */

import { produce } from "immer";
import type { GameEvent, MatchState } from "./types";
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

  newState = produce(ctx.state, (draft) => {
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
            playerState.reserveMsRemaining = Math.max(
              0,
              playerState.reserveMsRemaining - elapsedMs,
            );
          } else if (time.mode === "priority" && time.activeWindow) {
            const overageMs = Math.max(0, timestamp - time.activeWindow.deadlineMs);
            playerState.reserveMsRemaining = Math.max(
              0,
              playerState.reserveMsRemaining - overageMs,
            );
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
