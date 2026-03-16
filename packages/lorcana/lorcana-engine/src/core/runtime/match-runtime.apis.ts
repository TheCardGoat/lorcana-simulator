/**
 * MatchRuntime API Factories
 *
 * Factory functions for creating runtime API objects.
 */

import type { Draft } from "immer";
import type { FilteredMatchView, GameEvent, MatchState } from "./types";
import type { EventAPI, GameEndResult } from "./match-runtime.types";
import type { CardQueryAPI, RuntimeCardDeriver } from "./card-runtime";
import { createCardQueryAPI } from "./card-runtime";
import type { MatchStaticResources } from "./static-resources";
import type { BaseCardDefinition, BaseCardMeta } from "./card-contracts";

// Re-export from sub-modules
export { createTimeQueryAPI, createTimeOperationsForDraft } from "./match-runtime.time-apis";
export { createRandomAPIForDraft } from "./match-runtime.random-apis";
export { createZoneQueryAPI } from "./match-runtime.zone-apis";

type ReadonlyMatchLike<G> = MatchState<G> | FilteredMatchView<G>;

export function canPlayerTakeActions<G>(state: ReadonlyMatchLike<G>, playerId: string): boolean {
  return state.ctx.priority.windowOpen && state.ctx.priority.holder === playerId;
}

// =============================================================================
// Event API
// =============================================================================

export function createEventAPI<G>(
  emitGameEvent: (event: GameEvent) => void,
  draft?: Draft<MatchState<G>>,
  gameEndTracker?: { ended: boolean; result?: GameEndResult },
): EventAPI {
  return {
    emit: (event) => {
      if (draft) {
        // Events are buffered outside the draft and committed only on successful execution.
      }
      emitGameEvent(event);
    },
    endGame: (result) => {
      if (draft) {
        draft.ctx.status.gameEnded = true;
        draft.ctx.status.winner = result.winner;
        draft.ctx.status.reason = result.reason;
        if (draft.ctx.time.mode !== "none") {
          draft.ctx.time.running = false;
          draft.ctx.time.pausedReason = "GAME_ENDED";
        }
        if (gameEndTracker) {
          gameEndTracker.ended = true;
          gameEndTracker.result = result;
        }
      }
    },
  };
}

// =============================================================================
// Card Query API
// =============================================================================

export function createCardQueryAPIForState<
  G,
  TCardDefinition extends BaseCardDefinition,
  TCardDerived extends object = {},
>(
  state: ReadonlyMatchLike<G> | Draft<MatchState<G>>,
  staticResources: MatchStaticResources<TCardDefinition>,
  deriveRuntimeCard: RuntimeCardDeriver<G, TCardDefinition, BaseCardMeta, TCardDerived>,
  actorPlayerId?: string,
): CardQueryAPI<TCardDefinition, BaseCardMeta, TCardDerived> {
  return createCardQueryAPI(state as unknown as MatchState<G>, staticResources, {
    actorPlayerId,
    deriveRuntimeCard,
  }) as CardQueryAPI<TCardDefinition, BaseCardMeta, TCardDerived>;
}
