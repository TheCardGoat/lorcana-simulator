/**
 * MatchRuntime Query Operations
 */

import type { GameLogEntry, MatchState, PublishedGameEvent } from "./types";
import type {
  ViewRoleContext,
  FilteredMatchView,
  RuntimeFlowDefinition,
  MoveDefinition,
} from "./match-runtime.types";
import type { MatchStaticResources } from "./static-resources";
import { filterMatchView } from "./view-filter";
import type { BaseCardDefinition } from "./card-contracts";

export interface QueryContext<
  G,
  Moves extends Record<string, MoveDefinition<G, any, any, any, any>>,
  TCardDefinition extends BaseCardDefinition = BaseCardDefinition,
  TCardDerived extends object = {},
> {
  state: MatchState<G>;
  config: {
    moves: Moves;
    flow?: RuntimeFlowDefinition<G, TCardDefinition, TCardDerived>;
    playerView?: (state: MatchState<G>, roleCtx: ViewRoleContext) => FilteredMatchView<G>;
  };
  staticResources: MatchStaticResources<TCardDefinition>;
  gameEnded: boolean;
  gameEvents: PublishedGameEvent[];
  gameLog: GameLogEntry[];
}

export function getState<G>(state: MatchState<G>): MatchState<G> {
  return state;
}

export function getCurrentStateID<G>(state: MatchState<G>): number {
  return state.ctx._stateID;
}

export function getFilteredView<
  G,
  Moves extends Record<string, MoveDefinition<G, any, any, any, any>>,
  TCardDefinition extends BaseCardDefinition = BaseCardDefinition,
  TCardDerived extends object = {},
>(
  ctx: QueryContext<G, Moves, TCardDefinition, TCardDerived>,
  roleCtx: ViewRoleContext,
): FilteredMatchView<G> {
  if (ctx.config.playerView) {
    return ctx.config.playerView(ctx.state, roleCtx);
  }
  return filterMatchView(ctx.state, roleCtx);
}
