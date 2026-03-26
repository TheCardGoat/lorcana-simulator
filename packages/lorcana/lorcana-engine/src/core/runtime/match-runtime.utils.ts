/**
 * MatchRuntime Utilities
 *
 * Context builders and utility functions.
 */

import { current as immerCurrent } from "immer";
import type { Draft } from "immer";
import type { GameEvent, MatchState, MoveInput } from "./types";
import type {
  MatchRuntimeConfig,
  DeepReadonly,
  FrameworkStateSnapshot,
  RuntimeLifecycleContext,
  MoveInputView,
  MoveValidationContext,
  MoveExecutionContext,
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
import type { LorcanaG } from "../../types/runtime-state";
import type { StateScopedValueCache } from "./state-scoped-value-cache";

// =============================================================================
// Context Builders
// =============================================================================

function createFrameworkStateSnapshot(
  state: MatchState | Draft<MatchState>,
  gameEnded: boolean,
): FrameworkStateSnapshot {
  const ctx = state.ctx;

  return {
    priority: ctx.priority,
    status: ctx.status,
    _zonesPrivate: ctx.zones.private,
    _zonesPublic: ctx.zones.public,
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

function createReadContextBase(
  state: MatchState,
  playerId: string,
  config: MatchRuntimeConfig,
  staticResources: MatchStaticResources,
  effectiveGameEnded: boolean,
  runtimeCardCache?: StateScopedValueCache<unknown>,
): Omit<MoveValidationContext<MoveInput>, keyof MoveInputView> {
  const cardsApi = createCardQueryAPIForState(
    state,
    staticResources,
    config.deriveRuntimeCard,
    playerId,
    runtimeCardCache,
    true,
  );
  const frameworkState = createFrameworkStateSnapshot(state, effectiveGameEnded);
  const zones = createZoneQueryAPI(state, cardsApi);
  const time = createTimeQueryAPI(state);
  const framework = createFrameworkReadAPI(frameworkState, zones, time, cardsApi);

  return {
    G: state.G as DeepReadonly<LorcanaG>,
    playerId: playerId as PlayerId,
    query: EMPTY_QUERY_API,
    cards: cardsApi,
    framework,
    validationMode: "final",
  };
}

function createWriteContextBase(
  draft: Draft<MatchState>,
  playerId: string | undefined,
  config: MatchRuntimeConfig,
  staticResources: MatchStaticResources,
  effectiveGameEnded: boolean,
  emitGameEvent: (event: GameEvent) => void,
  gameEndTracker: { ended: boolean; result?: GameEndResult },
  moveLogSink?: (entries: readonly ProjectedLogEntry[]) => void,
  runtimeCardCache?: StateScopedValueCache<unknown>,
  useSnapshotForReads?: boolean,
): RuntimeLifecycleContext {
  // When useSnapshotForReads is true (lifecycle/trigger contexts), project from a plain snapshot
  // to avoid Immer proxy overhead. Move execution contexts use the live draft so that reads
  // after in-move mutations reflect the current state.
  const readState = useSnapshotForReads ? immerCurrent(draft) : draft;
  const cardsApi = createCardQueryAPIForState(
    readState,
    staticResources,
    config.deriveRuntimeCard,
    playerId,
    undefined,
    false,
  );
  const cardRuntimeApi = createCardRuntimeAPI(draft, cardsApi);
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
  );

  return {
    G: draft.G,
    playerId: playerId as PlayerId | undefined,
    query: EMPTY_QUERY_API,
    cards: cardRuntimeApi,
    framework,
  };
}

export function buildValidationContext<TInput extends MoveInput = MoveInput>(
  state: MatchState,
  playerId: string,
  input: TInput,
  config: MatchRuntimeConfig,
  staticResources: MatchStaticResources,
  gameEnded: boolean,
  validationMode: "preflight" | "final" = "final",
  runtimeCardCache?: StateScopedValueCache<unknown>,
): MoveValidationContext<TInput> {
  const base = createReadContextBase(
    state,
    playerId,
    config,
    staticResources,
    gameEnded,
    runtimeCardCache,
  );
  return {
    ...base,
    validationMode,
    ...createMoveInputView(input),
  };
}

export function buildExecutionContext<TInput extends MoveInput = MoveInput>(
  draft: Draft<MatchState>,
  playerId: string,
  input: TInput,
  config: MatchRuntimeConfig,
  staticResources: MatchStaticResources,
  gameEnded: boolean,
  emitGameEvent: (event: GameEvent) => void,
  gameEndTracker: { ended: boolean; result?: GameEndResult },
  moveLogSink?: (entries: readonly ProjectedLogEntry[]) => void,
  runtimeCardCache?: StateScopedValueCache<unknown>,
): MoveExecutionContext<TInput> {
  const lifecycleContext = buildLifecycleContext(
    draft,
    config,
    staticResources,
    gameEnded,
    emitGameEvent,
    gameEndTracker,
    playerId,
    moveLogSink,
    runtimeCardCache,
  );

  return {
    playerId: playerId as PlayerId,
    ...lifecycleContext,
    ...createMoveInputView(input),
  };
}

export function buildLifecycleContext(
  draft: Draft<MatchState>,
  config: MatchRuntimeConfig,
  staticResources: MatchStaticResources,
  gameEnded: boolean,
  emitGameEvent: (event: GameEvent) => void,
  gameEndTracker: { ended: boolean; result?: GameEndResult },
  playerId: string | undefined = draft.ctx.priority.holder,
  moveLogSink?: (entries: readonly ProjectedLogEntry[]) => void,
  runtimeCardCache?: StateScopedValueCache<unknown>,
  /** When true, card projections use a plain snapshot of the draft (no Immer proxy overhead).
   * Only safe for read-only lifecycle hooks (trigger collection) — NOT for move execution. */
  useSnapshotForReads?: boolean,
): RuntimeLifecycleContext {
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
    runtimeCardCache,
    useSnapshotForReads,
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

export function computeRulesetHash(config: MatchRuntimeConfig): string {
  // Simplified - would hash game definition in real implementation
  return `ruleset-${config.name}-${Date.now()}`;
}

export function inferQueryPlayerId(state: MatchState): string | undefined {
  return state.ctx.priority.holder;
}
