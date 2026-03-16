export type {
  EngineActiveEffectProjection,
  EngineActorContext,
  EngineBoardProjection,
  EngineCardProjection,
  EngineMoveId,
  EnginePacketUpdate,
  EngineMoveExecutionResult,
  EngineMoveHistoryEntry,
  EnginePendingEffectProjection,
  EngineProjectionSnapshot,
  EngineZoneProjection,
  EngineMoveValidationResult,
  GameEngine,
  TransportAwareEngine,
} from "./contracts";

export {
  buildEngineBoardProjection,
  buildEngineProjectionSnapshot,
  extractActiveEffects,
  extractPendingEffects,
} from "./projection";

// =============================================================================
// New Engine Architecture (Engine Simplification Plan)
// =============================================================================

export { ServerEngine, type ServerEngineConfig, type StateSnapshot } from "./server-engine";

export { ClientEngine, type ClientEngineConfig } from "./client-engine";
