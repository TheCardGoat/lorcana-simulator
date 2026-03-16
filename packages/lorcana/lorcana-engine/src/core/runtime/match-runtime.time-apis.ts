/**
 * MatchRuntime Time API Factories
 */

import type { Draft } from "immer";
import type { MatchState, ClockPauseReason } from "./types";
import type { TimeOperationsAPI, TimeQueryAPI } from "./match-runtime.types";

export function createTimeQueryAPI<G>(state: MatchState<G>): TimeQueryAPI {
  return {
    getRemainingTime: (playerId) => {
      if (state.ctx.time.mode === "none") return Infinity;
      return state.ctx.time.players[playerId]?.reserveMsRemaining || 0;
    },
  };
}

export function createTimeOperationsForDraft<G>(draft: Draft<MatchState<G>>): TimeOperationsAPI {
  return {
    getRemainingTime: (playerId) => {
      if (draft.ctx.time.mode === "none") return Infinity;
      return draft.ctx.time.players[playerId]?.reserveMsRemaining || 0;
    },
    pause: (reason) => {
      if (draft.ctx.time.mode !== "none") {
        draft.ctx.time.running = false;
        draft.ctx.time.pausedReason = reason as ClockPauseReason;
      }
    },
    resume: () => {
      if (draft.ctx.time.mode !== "none") {
        draft.ctx.time.running = true;
        draft.ctx.time.pausedReason = undefined;
        draft.ctx.time.startedAtMs = Date.now();
      }
    },
  };
}
