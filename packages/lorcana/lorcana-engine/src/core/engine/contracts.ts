import type { CommandEnvelope, MoveInput, PacketAnimation } from "../runtime/types";
import type { DeepReadonly, ZoneConfig } from "../runtime/match-runtime.types";

export type EngineActorContext = {
  role: "player" | "spectator" | "judge";
  playerId?: string;
};

export type EngineMoveValidationResult = {
  valid: boolean;
  reason?: string;
  code?: string;
};

export type EngineMoveExecutionResult = {
  success: boolean;
  reason?: string;
  code?: string;
};

export interface EnginePacketUpdate {
  processedCommand: CommandEnvelope;
  animations: PacketAnimation[];
}

export type EngineMoveHistoryEntry = {
  moveId: string;
  input?: MoveInput;
  playerId?: string;
  role?: "player" | "spectator" | "judge";
  timestamp: number;
  stateID?: number;
  turnNumber?: number;
};

export type EngineMoveId<TMoveMap extends Record<string, MoveInput> = Record<string, MoveInput>> =
  keyof TMoveMap & string;

export type EngineCardProjection<TCardMeta = Record<string, unknown>> = {
  instanceId: string;
  zoneId: string;
  definitionId: string;
  ownerId?: string;
  controllerId?: string;
  zoneIndex?: number;
  meta?: TCardMeta;
};

export type EngineZoneProjection = {
  zoneId: string;
  config: ZoneConfig;
  cards: string[];
  count: number;
};

export type EngineBoardProjection<
  TCardMeta = Record<string, unknown>,
  TCard = EngineCardProjection<TCardMeta>,
> = {
  cards: Record<string, TCard>;
  zones: Record<string, EngineZoneProjection>;
};

export type EngineActiveEffectProjection<TPayload = unknown> = {
  id: string;
  type: string;
  sourceId?: string;
  payload: TPayload;
};

export type EnginePendingEffectProjection<TPayload = unknown> = {
  id: string;
  type: string;
  source?: "stack" | "priority" | "game";
  sourceId?: string;
  payload: TPayload;
};

export type EngineProjectionSnapshot<
  TBoard = EngineBoardProjection,
  TActiveEffect = EngineActiveEffectProjection,
  TPendingEffect = EnginePendingEffectProjection,
> = {
  stateID: number;
  actor: EngineActorContext;
  board: TBoard;
  activeEffects: TActiveEffect[];
  pendingEffects: TPendingEffect[];
};

export interface GameEngine<
  TState,
  TBoard = unknown,
  TMoveMap extends Record<string, MoveInput> = Record<string, MoveInput>,
> {
  // STATE AND BOARD MUST NOT be changed, all changes must be done via moves
  getState(): DeepReadonly<TState>;
  // STATE AND BOARD MUST NOT be changed, all changes must be done via moves
  getBoard(): DeepReadonly<TBoard>;
  getStateID(): number;
  validateMove<K extends keyof TMoveMap & string>(
    moveId: K,
    input: TMoveMap[K],
  ): EngineMoveValidationResult;
  executeMove<K extends keyof TMoveMap & string>(
    moveId: K,
    input: TMoveMap[K],
  ): EngineMoveExecutionResult;
  enumerateMoves(): EngineMoveId<TMoveMap>[];
  getMoveHistory(limit?: number): EngineMoveHistoryEntry[];
  getActorContext(): EngineActorContext;
  dispose(): void | Promise<void>;
}

/**
 * Transport-aware engine interface for networked game engines.
 * Extends GameEngine with connection management and state update notifications.
 */
export interface TransportAwareEngine<
  TState,
  TBoard,
  TMoveMap extends Record<string, MoveInput>,
> extends GameEngine<TState, TBoard, TMoveMap> {
  connect(): Promise<void>;
  disconnect(): Promise<void>;

  onStateUpdate(
    handler: (
      state: DeepReadonly<TState>,
      stateID: number,
      packet: EnginePacketUpdate | null,
    ) => void,
  ): () => void;
}
