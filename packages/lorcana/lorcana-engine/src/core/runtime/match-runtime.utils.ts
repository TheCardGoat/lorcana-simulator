/**
 * MatchRuntime Utilities
 *
 * Context builders and utility functions.
 */

import type { Draft } from "immer";
import type { GameEvent, MatchState, MoveInput } from "./types";
import type {
  MatchRuntimeConfig,
  CardRuntimeAPI,
  DeepReadonly,
  FrameworkStateSnapshot,
  FrameworkReadAPI,
  FrameworkWriteAPI,
  RuntimeLifecycleContext,
  MoveInputView,
  MoveValidationContext,
  MoveExecutionContext,
  MoveDefinition,
  QueryAPI,
  GameEndResult,
  ProjectedLogEntry,
} from "./match-runtime.types";
import type { MatchStaticResources } from "./static-resources";
import type { PlayerId } from "../types";
import { createCardQueryAPIForState, createEventAPI } from "./match-runtime.apis";
import { createTimeQueryAPI, createTimeOperationsForDraft } from "./match-runtime.time-apis";
import { createRandomAPIForDraft } from "./match-runtime.random-apis";
import { createZoneQueryAPI } from "./match-runtime.zone-apis";
import { createZoneOperations } from "./zone-operations";
import {
  createCardRuntimeAPI,
  createFrameworkReadAPI,
  createFrameworkWriteAPI,
} from "./match-runtime.framework-api";
import type { BaseCardDefinition, BaseCardMeta } from "./card-contracts";

// =============================================================================
// Context Builders
// =============================================================================

function createFrameworkStateSnapshot<G>(
  state: MatchState<G> | Draft<MatchState<G>>,
  gameEnded: boolean,
): FrameworkStateSnapshot {
  const ctx = state.ctx;

  return {
    ctx: ctx,
    playerIds: ctx.playerIds,
    turn: ctx.status.turn,
    phase: ctx.status.phase,
    step: ctx.status.step,
    gameSegment: ctx.status.gameSegment,
    currentPlayer: ctx.priority.holder as PlayerId | undefined,
    stateID: ctx._stateID,
    matchID: ctx.matchID,
    gameID: ctx.gameID,
    gameEnded: gameEnded || ctx.status.gameEnded,
  };
}

function createMoveInputView<TInput extends MoveInput>(input: TInput): MoveInputView<TInput> {
  const args = input.args;
  return {
    input: input as DeepReadonly<TInput>,
    args: args as DeepReadonly<TInput["args"]>,
    params: args as DeepReadonly<TInput["args"]>,
  };
}

const EMPTY_QUERY_API: QueryAPI = {
  getActionIntents: () => [],
  getLegalActions: () => [],
  explainIllegal: () => undefined,
};

function createReadContextBase<
  G,
  Moves extends Record<string, MoveDefinition<G, any, any, any, any>>,
  TCardDefinition extends BaseCardDefinition,
  TCardDerived extends object = {},
  TStateView = unknown,
>(
  state: MatchState<G>,
  playerId: string,
  config: MatchRuntimeConfig<G, Moves, TCardDefinition, TCardDerived, TStateView>,
  staticResources: MatchStaticResources<TCardDefinition>,
  effectiveGameEnded: boolean,
): Omit<MoveValidationContext<G, TCardDefinition, MoveInput, TCardDerived>, keyof MoveInputView> {
  const cardsApi = createCardQueryAPIForState(
    state,
    staticResources,
    config.deriveRuntimeCard,
    playerId,
  );
  const frameworkState = createFrameworkStateSnapshot(state, effectiveGameEnded);
  const zones = createZoneQueryAPI(state, cardsApi);
  const time = createTimeQueryAPI(state);
  const framework = createFrameworkReadAPI(
    frameworkState,
    zones,
    time,
    cardsApi,
  ) as FrameworkReadAPI<TCardDefinition, BaseCardMeta, TCardDerived>;

  return {
    G: state.G as DeepReadonly<G>,
    playerId: playerId as PlayerId,
    query: EMPTY_QUERY_API,
    cards: cardsApi,
    framework,
    validationMode: "final",
  };
}

function createWriteContextBase<
  G,
  Moves extends Record<string, MoveDefinition<G, any, any, any, any>>,
  TCardDefinition extends BaseCardDefinition,
  TCardDerived extends object = {},
  TStateView = unknown,
>(
  draft: Draft<MatchState<G>>,
  playerId: string | undefined,
  config: MatchRuntimeConfig<G, Moves, TCardDefinition, TCardDerived, TStateView>,
  staticResources: MatchStaticResources<TCardDefinition>,
  effectiveGameEnded: boolean,
  emitGameEvent: (event: GameEvent) => void,
  gameEndTracker: { ended: boolean; result?: GameEndResult },
  moveLogSink?: (entries: readonly ProjectedLogEntry[]) => void,
): RuntimeLifecycleContext<G, TCardDefinition, TCardDerived> {
  const cardsApi = createCardQueryAPIForState(
    draft,
    staticResources,
    config.deriveRuntimeCard,
    playerId,
  );
  const cardRuntimeApi = createCardRuntimeAPI(draft, cardsApi) as CardRuntimeAPI<
    TCardDefinition,
    BaseCardMeta,
    TCardDerived
  >;
  const random = createRandomAPIForDraft(draft);
  const zones = createZoneOperations(draft, emitGameEvent, {
    cardQuery: cardsApi,
    random: random.random,
  });
  const time = createTimeOperationsForDraft(draft);
  const events = createEventAPI(emitGameEvent, draft, gameEndTracker);
  const frameworkState = createFrameworkStateSnapshot(draft, effectiveGameEnded);
  const framework = createFrameworkWriteAPI(
    draft,
    frameworkState,
    zones,
    time,
    random,
    events,
    cardRuntimeApi,
    moveLogSink,
  ) as FrameworkWriteAPI<TCardDefinition, BaseCardMeta, TCardDerived>;

  return {
    G: draft.G,
    playerId: playerId as PlayerId | undefined,
    query: EMPTY_QUERY_API,
    cards: cardRuntimeApi,
    framework,
  };
}

export function buildValidationContext<
  G,
  Moves extends Record<string, MoveDefinition<G, any, any, any, any>>,
  TCardDefinition extends BaseCardDefinition,
  TInput extends MoveInput,
  TCardDerived extends object = {},
  TStateView = unknown,
>(
  state: MatchState<G>,
  playerId: string,
  input: TInput,
  config: MatchRuntimeConfig<G, Moves, TCardDefinition, TCardDerived, TStateView>,
  staticResources: MatchStaticResources<TCardDefinition>,
  gameEnded: boolean,
  validationMode: "preflight" | "final" = "final",
): MoveValidationContext<G, TCardDefinition, TInput, TCardDerived> {
  const base = createReadContextBase(state, playerId, config, staticResources, gameEnded);
  return {
    ...base,
    validationMode,
    ...createMoveInputView(input),
  };
}

export function buildExecutionContext<
  G,
  Moves extends Record<string, MoveDefinition<G, any, any, any, any>>,
  TCardDefinition extends BaseCardDefinition,
  TInput extends MoveInput,
  TCardDerived extends object = {},
  TStateView = unknown,
>(
  draft: Draft<MatchState<G>>,
  playerId: string,
  input: TInput,
  config: MatchRuntimeConfig<G, Moves, TCardDefinition, TCardDerived, TStateView>,
  staticResources: MatchStaticResources<TCardDefinition>,
  gameEnded: boolean,
  emitGameEvent: (event: GameEvent) => void,
  gameEndTracker: { ended: boolean; result?: GameEndResult },
  moveLogSink?: (entries: readonly ProjectedLogEntry[]) => void,
): MoveExecutionContext<G, TCardDefinition, TInput, TCardDerived> {
  const lifecycleContext = buildLifecycleContext(
    draft,
    config,
    staticResources,
    gameEnded,
    emitGameEvent,
    gameEndTracker,
    playerId,
    moveLogSink,
  );

  return {
    playerId: playerId as PlayerId,
    ...lifecycleContext,
    ...createMoveInputView(input),
  };
}

export function buildLifecycleContext<
  G,
  Moves extends Record<string, MoveDefinition<G, any, any, any, any>>,
  TCardDefinition extends BaseCardDefinition,
  TCardDerived extends object = {},
  TStateView = unknown,
>(
  draft: Draft<MatchState<G>>,
  config: MatchRuntimeConfig<G, Moves, TCardDefinition, TCardDerived, TStateView>,
  staticResources: MatchStaticResources<TCardDefinition>,
  gameEnded: boolean,
  emitGameEvent: (event: GameEvent) => void,
  gameEndTracker: { ended: boolean; result?: GameEndResult },
  playerId: string | undefined = draft.ctx.priority.holder,
  moveLogSink?: (entries: readonly ProjectedLogEntry[]) => void,
): RuntimeLifecycleContext<G, TCardDefinition, TCardDerived> {
  const effectiveGameEnded = gameEnded || draft.ctx.status.gameEnded;
  return createWriteContextBase(
    draft,
    playerId,
    config,
    staticResources,
    effectiveGameEnded,
    emitGameEvent,
    gameEndTracker,
    moveLogSink,
  );
}

// =============================================================================
// Utility Functions
// =============================================================================

export function generateMatchID(): string {
  return `match-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function generateGameID(): string {
  return `game-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function computeRulesetHash<
  G,
  Moves extends Record<string, MoveDefinition<G, any, any, any, any>>,
  TCardDefinition extends BaseCardDefinition,
  TCardDerived extends object = {},
>(config: MatchRuntimeConfig<G, Moves, TCardDefinition, TCardDerived>): string {
  // Simplified - would hash game definition in real implementation
  return `ruleset-${config.name}-${Date.now()}`;
}

export function inferQueryPlayerId<G>(state: MatchState<G>): string | undefined {
  return state.ctx.priority.holder;
}
