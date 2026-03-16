/**
 * MatchRuntime Types
 *
 * All type definitions for the match runtime module.
 */

import type { Draft } from "immer";
import type {
  MatchState,
  GameEvent,
  PublishedGameEvent,
  GameLogEntry,
  LogMessage,
  MoveInput,
  CommandEnvelope,
  PacketAnimation,
  TimeControlConfig,
  RuntimeValidationResult,
  ViewRoleContext,
  FilteredMatchView,
  TCGCtx,
  CtxStatus,
  CtxPriority,
} from "./types";
import type { PlayerId } from "../types";
import type { ZoneOperationsAPI, ZoneQueryAPI } from "./zone-operations";
import type {
  AnyRuntimeCardWithDefinition,
  CardQueryAPI,
  RuntimeCardDefinitionOf,
  RuntimeCardDerivedOf,
  RuntimeCardDeriver,
  RuntimeCardMetaOf,
} from "./card-runtime";
import type { CardCatalog, CardsMaps, MatchStaticResources } from "./static-resources";
import type { BaseCardDefinition, BaseCardMeta } from "./card-contracts";
import type { EngineMoveId } from "../engine/contracts";

// =============================================================================
// Runtime Configuration
// =============================================================================

export interface RuntimeBoardProjectionContext {
  serverTimestamp: number;
}

interface MatchRuntimeConfigCore<
  G,
  Moves extends Record<string, MoveDefinition<G, any, any, any, any>>,
  TCardDefinition extends BaseCardDefinition = BaseCardDefinition,
  TCardMeta extends BaseCardMeta = BaseCardMeta,
  TCardDerived extends object = {},
  TBoardView = FilteredMatchView<G>,
> {
  name: string;
  moves: Moves;
  flow: RuntimeFlowDefinition<G, TCardDefinition, TCardDerived>;
  timeControl?: TimeControlConfig;
  zones: ZoneDefinitions;
  playerView: (state: MatchState<G>, roleCtx: ViewRoleContext) => FilteredMatchView<G>;
  projectBoard: (
    state: MatchState<G>,
    roleCtx: ViewRoleContext,
    staticResources: MatchStaticResources<TCardDefinition>,
    projectionCtx?: RuntimeBoardProjectionContext,
  ) => TBoardView;
  logProjector?: LogProjector<G>;
  deriveRuntimeCard: RuntimeCardDeriver<G, TCardDefinition, TCardMeta, TCardDerived>;
  // TODO: Setup should also include ctx
  setup: (args: SetupArgs<TCardDefinition>) => G;
  /** Optional one-time hook to populate zones (e.g. put all instances into deck). Runs after setup, inside Immer produce. */
  boardSetup?: (draft: Draft<MatchState<G>>, ctx: BoardSetupContext<TCardDefinition>) => void;
  derivePacketAnimations?: (
    context: PacketAnimationContext<G, TCardDefinition>,
  ) => readonly PacketAnimation[];
}

export type RuntimeCardSpecDefinition<
  TCardRuntimeOrDefinition extends AnyRuntimeCardWithDefinition | BaseCardDefinition,
> = TCardRuntimeOrDefinition extends AnyRuntimeCardWithDefinition
  ? RuntimeCardDefinitionOf<TCardRuntimeOrDefinition>
  : TCardRuntimeOrDefinition;

export type RuntimeCardSpecMeta<
  TCardRuntimeOrDefinition extends AnyRuntimeCardWithDefinition | BaseCardDefinition,
> = TCardRuntimeOrDefinition extends AnyRuntimeCardWithDefinition
  ? RuntimeCardMetaOf<TCardRuntimeOrDefinition>
  : BaseCardMeta;

export type RuntimeCardSpecDerived<
  TCardRuntimeOrDefinition extends AnyRuntimeCardWithDefinition | BaseCardDefinition,
  TFallbackDerived extends object,
> = TCardRuntimeOrDefinition extends AnyRuntimeCardWithDefinition
  ? RuntimeCardDerivedOf<TCardRuntimeOrDefinition>
  : TFallbackDerived;

export type MatchRuntimeConfig<
  G,
  Moves extends Record<string, MoveDefinition<G, any, any, any, any>>,
  TCardDefinition extends BaseCardDefinition = BaseCardDefinition,
  TCardDerived extends object = {},
  TBoardView = FilteredMatchView<G>,
> = MatchRuntimeConfigCore<G, Moves, TCardDefinition, BaseCardMeta, TCardDerived, TBoardView>;

export type MatchRuntimeConfigWithRuntimeCard<
  G,
  Moves extends Record<string, MoveDefinition<G, any, any, any, any>>,
  TRuntimeCardWithDefinition extends AnyRuntimeCardWithDefinition,
  TBoardView = FilteredMatchView<G>,
> = MatchRuntimeConfigCore<
  G,
  Moves,
  RuntimeCardDefinitionOf<TRuntimeCardWithDefinition>,
  RuntimeCardMetaOf<TRuntimeCardWithDefinition>,
  RuntimeCardDerivedOf<TRuntimeCardWithDefinition>,
  TBoardView
>;

export interface SetupArgs<TCardDefinition extends BaseCardDefinition = BaseCardDefinition> {
  players: Player[];
  seed?: string;
  staticResources: MatchStaticResources<TCardDefinition>;
}

export interface BoardSetupContext<
  TCardDefinition extends BaseCardDefinition = BaseCardDefinition,
> {
  players: Player[];
  staticResources: MatchStaticResources<TCardDefinition>;
  random: RandomAPI;
}

export interface LogProjectionContext<G = unknown> {
  state: MatchState<G>;
}

export interface PacketAnimationContext<
  G,
  TCardDefinition extends BaseCardDefinition = BaseCardDefinition,
> {
  command: CommandEnvelope;
  playerId: string;
  role: RuntimeActorRole;
  previousState: MatchState<G>;
  nextState: MatchState<G>;
  staticResources: MatchStaticResources<TCardDefinition>;
}

export type ProjectedLogEntry = Pick<GameLogEntry, "category" | "visibility"> & {
  defaultMessage?: LogMessage;
};

export type LogProjector<G = unknown> = (
  event: PublishedGameEvent,
  context: LogProjectionContext<G>,
) => ProjectedLogEntry[];

export interface Player {
  id: string;
  name?: string;
}

export type DeepReadonly<T> = T extends (...args: any[]) => any
  ? T
  : T extends string | number | boolean | bigint | symbol | undefined | null
    ? T
    : T extends readonly (infer U)[]
      ? readonly DeepReadonly<U>[]
      : T extends object
        ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
        : T;

export interface RuntimeStateView<G> {
  readonly G: DeepReadonly<G>;
  readonly ctx: DeepReadonly<TCGCtx>;
  readonly playerId: PlayerId;
  readonly playerIds: PlayerId[];
  readonly turn: number;
  readonly phase?: string;
  readonly step?: string;
  readonly gameSegment?: string;
  readonly currentPlayer?: PlayerId;
  readonly stateID: number;
  readonly matchID: string;
  readonly gameID: string;
  readonly gameEnded: boolean;
}

export interface RuntimeLifecycleContext<
  G,
  TCardDefinition extends BaseCardDefinition = BaseCardDefinition,
  TCardDerived extends object = {},
> {
  readonly G: Draft<G>;
  readonly playerId?: PlayerId;
  readonly query: QueryAPI;
  readonly cards: CardRuntimeAPI<TCardDefinition, BaseCardMeta, TCardDerived>;
  readonly framework: FrameworkWriteAPI<TCardDefinition, BaseCardMeta, TCardDerived>;
}

export type RuntimeLifecycleHook<
  G = unknown,
  TCardDefinition extends BaseCardDefinition = BaseCardDefinition,
  TCardDerived extends object = {},
> =
  | ((context: RuntimeLifecycleContext<G, TCardDefinition, TCardDerived>) => unknown)
  | ((state: MatchState<G>) => MatchState<G> | void);

export type MoveStateView<G> = RuntimeStateView<G>;

export interface MoveInputView<TInput extends MoveInput = MoveInput> {
  readonly input: DeepReadonly<TInput>;
  readonly args: DeepReadonly<TInput["args"]>;
  readonly params: DeepReadonly<TInput["args"]>;
}

export interface FrameworkStateSnapshot {
  readonly ctx: DeepReadonly<TCGCtx>;
  readonly playerIds: PlayerId[];
  readonly turn: number;
  readonly phase?: string;
  readonly step?: string;
  readonly gameSegment?: string;
  readonly currentPlayer?: PlayerId;
  readonly stateID: number;
  readonly matchID: string;
  readonly gameID: string;
  readonly gameEnded: boolean;
}

export interface CardRuntimeReadAPI<
  TCardDefinition extends BaseCardDefinition = BaseCardDefinition,
  TCardMeta extends BaseCardMeta = BaseCardMeta,
  TCardDerived extends object = {},
> extends CardQueryAPI<TCardDefinition, TCardMeta, TCardDerived> {}

export interface CardRuntimeAPI<
  TCardDefinition extends BaseCardDefinition = BaseCardDefinition,
  TCardMeta extends BaseCardMeta = BaseCardMeta,
  TCardDerived extends object = {},
> extends CardRuntimeReadAPI<TCardDefinition, TCardMeta, TCardDerived> {
  setMeta: (cardId: string, meta: TCardMeta) => void;
  patchMeta: (cardId: string, patch: Partial<TCardMeta>) => TCardMeta;
  clearMeta: (cardId: string) => void;
  entriesMeta: () => readonly (readonly [cardId: string, meta: TCardMeta])[];
}

export type CardRuntimeReadAPIWithRuntimeCard<TRuntimeCard extends AnyRuntimeCardWithDefinition> =
  CardRuntimeReadAPI<
    RuntimeCardDefinitionOf<TRuntimeCard>,
    RuntimeCardMetaOf<TRuntimeCard>,
    RuntimeCardDerivedOf<TRuntimeCard>
  >;

export type CardRuntimeAPIWithRuntimeCard<TRuntimeCard extends AnyRuntimeCardWithDefinition> =
  CardRuntimeAPI<
    RuntimeCardDefinitionOf<TRuntimeCard>,
    RuntimeCardMetaOf<TRuntimeCard>,
    RuntimeCardDerivedOf<TRuntimeCard>
  >;

export type FrameworkCardsReadAPI<
  TCardDefinition extends BaseCardDefinition = BaseCardDefinition,
  TCardMeta extends BaseCardMeta = BaseCardMeta,
  TCardDerived extends object = {},
> = CardRuntimeReadAPI<TCardDefinition, TCardMeta, TCardDerived>;

export type FrameworkCardsWriteAPI<
  TCardDefinition extends BaseCardDefinition = BaseCardDefinition,
  TCardMeta extends BaseCardMeta = BaseCardMeta,
  TCardDerived extends object = {},
> = CardRuntimeAPI<TCardDefinition, TCardMeta, TCardDerived>;

export interface FrameworkReadAPI<
  TCardDefinition extends BaseCardDefinition = BaseCardDefinition,
  TCardMeta extends BaseCardMeta = BaseCardMeta,
  TCardDerived extends object = {},
> {
  readonly state: FrameworkStateSnapshot;
  readonly zones: ZoneQueryAPI;
  readonly time: TimeQueryAPI;
  readonly cards: CardRuntimeReadAPI<TCardDefinition, TCardMeta, TCardDerived>;
}

export interface FrameworkWriteAPI<
  TCardDefinition extends BaseCardDefinition = BaseCardDefinition,
  TCardMeta extends BaseCardMeta = BaseCardMeta,
  TCardDerived extends object = {},
> extends FrameworkReadAPI<TCardDefinition, TCardMeta, TCardDerived> {
  readonly zones: ZoneOperationsAPI;
  readonly time: TimeOperationsAPI;
  readonly random: RandomAPI;
  readonly events: EventAPI;
  readonly status: {
    readonly snapshot: DeepReadonly<CtxStatus>;
    patch: (patch: Partial<CtxStatus>) => void;
    setPhase: (phase?: string) => void;
    setStep: (step?: string) => void;
    setGameSegment: (segment?: string) => void;
    incrementTurn: (by?: number) => number;
  };
  readonly priority: {
    readonly snapshot: DeepReadonly<CtxPriority>;
    patch: (patch: Partial<CtxPriority>) => void;
    setHolder: (playerId?: PlayerId) => void;
    openWindow: (holder?: PlayerId) => void;
    closeWindow: () => void;
    resetPasses: () => void;
  };
  readonly cards: CardRuntimeAPI<TCardDefinition, TCardMeta, TCardDerived>;
  readonly log: (entry: ProjectedLogEntry | readonly ProjectedLogEntry[]) => void;
  logPublicWithOverrides(entry: {
    category: GameLogEntry["category"];
    defaultMessage: LogMessage;
    overrides?: Record<string, LogMessage>;
  }): void;
}

export type FrameworkReadAPIWithRuntimeCard<TRuntimeCard extends AnyRuntimeCardWithDefinition> =
  FrameworkReadAPI<
    RuntimeCardDefinitionOf<TRuntimeCard>,
    RuntimeCardMetaOf<TRuntimeCard>,
    RuntimeCardDerivedOf<TRuntimeCard>
  >;

export type FrameworkWriteAPIWithRuntimeCard<TRuntimeCard extends AnyRuntimeCardWithDefinition> =
  FrameworkWriteAPI<
    RuntimeCardDefinitionOf<TRuntimeCard>,
    RuntimeCardMetaOf<TRuntimeCard>,
    RuntimeCardDerivedOf<TRuntimeCard>
  >;

export interface MoveValidationContext<
  G,
  TCardDefinition extends BaseCardDefinition = BaseCardDefinition,
  TInput extends MoveInput = MoveInput,
  TCardDerived extends object = {},
> extends MoveInputView<TInput> {
  readonly G: DeepReadonly<G>;
  readonly playerId: PlayerId;
  readonly validationMode: "preflight" | "final";
  readonly query: QueryAPI;
  readonly cards: CardRuntimeReadAPI<TCardDefinition, BaseCardMeta, TCardDerived>;
  readonly framework: FrameworkReadAPI<TCardDefinition, BaseCardMeta, TCardDerived>;
}

export interface MoveExecutionContext<
  G,
  TCardDefinition extends BaseCardDefinition = BaseCardDefinition,
  TInput extends MoveInput = MoveInput,
  TCardDerived extends object = {},
> extends MoveInputView<TInput> {
  readonly G: Draft<G>;
  readonly playerId: PlayerId;
  readonly query: QueryAPI;
  readonly cards: CardRuntimeAPI<TCardDefinition, BaseCardMeta, TCardDerived>;
  readonly framework: FrameworkWriteAPI<TCardDefinition, BaseCardMeta, TCardDerived>;
}

export interface MoveEnumerationContext<
  G,
  TCardDefinition extends BaseCardDefinition = BaseCardDefinition,
  TCardDerived extends object = {},
> {
  readonly G: DeepReadonly<G>;
  readonly playerId: PlayerId;
  readonly query: QueryAPI;
  readonly cards: CardRuntimeReadAPI<TCardDefinition, BaseCardMeta, TCardDerived>;
  readonly framework: FrameworkReadAPI<TCardDefinition, BaseCardMeta, TCardDerived>;
}

export interface QueryAPI {
  getActionIntents: () => readonly unknown[];
  getLegalActions: () => readonly unknown[];
  explainIllegal: () => string | undefined;
}

export interface MoveDefinition<
  G,
  TCardDefinition extends BaseCardDefinition = BaseCardDefinition,
  TInput extends MoveInput = MoveInput,
  TTargetDSL = unknown,
  TCardDerived extends object = {},
> {
  available?: (context: MoveEnumerationContext<G, TCardDefinition, TCardDerived>) => boolean;
  validate?: (
    context: MoveValidationContext<G, TCardDefinition, TInput, TCardDerived>,
  ) => RuntimeValidationResult;
  execute: (context: MoveExecutionContext<G, TCardDefinition, TInput, TCardDerived>) => void;
  undoable?: boolean;
  redactInput?: boolean;
  optimistic?: boolean | "auto";
  ignoreStaleStateID?: boolean;
  serverOnly?: boolean;
  ignorePriority?: boolean;
}

export type RuntimeMoveInputMap<
  Moves extends Record<string, MoveDefinition<any, any, any, any, any>>,
> = {
  [K in keyof Moves]: Moves[K] extends MoveDefinition<any, any, infer TInput, any, any>
    ? TInput
    : MoveInput;
};

export type RuntimeLegalMove<
  Moves extends Record<string, MoveDefinition<any, any, any, any, any>>,
> = EngineMoveId<RuntimeMoveInputMap<Moves>>;

export type RuntimeActorRole = "player" | "judge";

export type MoveContext<
  TCardDefinition extends BaseCardDefinition = BaseCardDefinition,
  TInput extends MoveInput = MoveInput,
  G = unknown,
  TCardDerived extends object = {},
> = MoveExecutionContext<G, TCardDefinition, TInput, TCardDerived>;

export interface MatchRuntimeInit<TCardDefinition extends BaseCardDefinition = BaseCardDefinition> {
  players: Player[];
  cardsMaps: CardsMaps;
  cardCatalog: CardCatalog<TCardDefinition>;
  seed?: string;
  matchID?: string;
  gameID?: string;
  choosingFirstPlayer?: string;
}

/** Runtime step definition for steps within phases. */
export interface RuntimeStepDefinition<
  G = unknown,
  TCardDefinition extends BaseCardDefinition = BaseCardDefinition,
  TCardDerived extends object = {},
> {
  id: string;
  name: string;
  order: number;
  onEnter?: RuntimeLifecycleHook<G, TCardDefinition, TCardDerived>;
  onExit?: RuntimeLifecycleHook<G, TCardDefinition, TCardDerived>;
  endIf?: (state: MatchState<G>) => boolean;
  next?: string;
  validMoves?: string[];
}

/** Runtime turn definition for turn structure within game segments. */
export interface RuntimeTurnDefinition<
  G = unknown,
  TCardDefinition extends BaseCardDefinition = BaseCardDefinition,
  TCardDerived extends object = {},
> {
  initialPhase?: string;
  onBegin?: RuntimeLifecycleHook<G, TCardDefinition, TCardDerived>;
  onEnd?: RuntimeLifecycleHook<G, TCardDefinition, TCardDerived>;
  endIf?: (state: MatchState<G>) => boolean;
  phases: Record<string, RuntimePhaseDefinition<G, TCardDefinition, TCardDerived>>;
  validMoves?: string[];
}

/** Runtime game segment definition for high-level game divisions. */
export interface RuntimeGameSegmentDefinition<
  G = unknown,
  TCardDefinition extends BaseCardDefinition = BaseCardDefinition,
  TCardDerived extends object = {},
> {
  id: string;
  name: string;
  order: number;
  onEnter?: RuntimeLifecycleHook<G, TCardDefinition, TCardDerived>;
  onExit?: RuntimeLifecycleHook<G, TCardDefinition, TCardDerived>;
  endIf?: (state: MatchState<G>) => GameEndResult | undefined;
  validMoves?: string[];
  next?: string;
  turn: RuntimeTurnDefinition<G, TCardDefinition, TCardDerived>;
}

export type RuntimeFlowDefinition<
  G = unknown,
  TCardDefinition extends BaseCardDefinition = BaseCardDefinition,
  TCardDerived extends object = {},
> = {
  gameSegments: Record<string, RuntimeGameSegmentDefinition<G, TCardDefinition, TCardDerived>>;
  initialGameSegment?: string;
};

export interface RuntimePhaseDefinition<
  G = unknown,
  TCardDefinition extends BaseCardDefinition = BaseCardDefinition,
  TCardDerived extends object = {},
> {
  id: string;
  name: string;
  order: number;
  onEnter?: RuntimeLifecycleHook<G, TCardDefinition, TCardDerived>;
  onExit?: RuntimeLifecycleHook<G, TCardDefinition, TCardDerived>;
  validMoves?: string[];
  endIf?: (state: MatchState<G>) => boolean | string;
  nextPhase?: string | ((state: MatchState<G>) => string);
  steps?: Record<string, RuntimeStepDefinition<G, TCardDefinition, TCardDerived>>;
  next?: string;
}

export interface GameEndResult {
  winner?: string;
  reason: string;
  metadata?: Record<string, unknown>;
}

export interface ZoneDefinitions {
  [zoneId: string]: ZoneConfig;
}

export interface ZoneConfig {
  id: string;
  name: string;
  visibility: "public" | "private" | "secret";
  ordered: boolean;
  ownerScoped: boolean;
  faceDown?: boolean;
  maxSize?: number;
}

// Re-export ZoneOperationsAPI from zone-operations for convenience
export type { ZoneOperationsAPI, ZoneQueryAPI, ZoneMutationAPI } from "./zone-operations";

// Re-export view-related types from types.ts
export type { ViewRoleContext, FilteredMatchView } from "./types";

export interface TimeQueryAPI {
  getRemainingTime: (playerId: string) => number;
}

export interface TimeOperationsAPI extends TimeQueryAPI {
  pause: (reason: string) => void;
  resume: () => void;
}

export interface RandomAPI {
  random: () => number;
  shuffle: <T>(array: T[]) => T[];
}

export interface EventAPI {
  emit: (event: GameEvent) => void;
  endGame: (result: GameEndResult) => void;
}

// =============================================================================
// Command Result Types
// =============================================================================

export type CommandResult<T = unknown> = CommandSuccess<T> | CommandFailure;

export interface CommandSuccess<T> {
  success: true;
  stateID: number;
  state: MatchState<T>;
  patches: import("immer").Patch[];
  gameEvents: PublishedGameEvent[];
  logEntries: GameLogEntry[];
  processedCommand: CommandEnvelope;
  animations: PacketAnimation[];
}

export interface CommandFailure {
  success: false;
  error: string;
  errorCode: string;
  currentStateID: number;
}
