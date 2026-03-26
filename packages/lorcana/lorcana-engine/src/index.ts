/**
 * @tcg/lorcana-engine - Disney Lorcana TCG Engine
 *
 * A complete implementation of Disney Lorcana using the @tcg/core MatchRuntime architecture.
 *
 * Key Concepts:
 * - MatchState<G> = { G, ctx } pattern
 * - ctx.framework.zones: First-class zone runtime state
 * - ctx.framework.time: Passive time management
 * - MoveDefinition with validate/execute/available
 * - MatchRuntime for deterministic state transitions
 */

// ============================================================================
// Core Runtime Types (from @tcg/core)
// ============================================================================

export type { LorcanaEngineBase } from "./lorcana-engine-base";

export type {
  CardCatalog,
  CardsMaps,
  CommandFailure,
  DeepReadonly,
  EngineMoveHistoryEntry,
  EngineMoveId,
  GameLogEntry,
  EnginePacketUpdate,
  EnginePendingEffectProjection,
  MatchRuntime,
  MatchRuntimeConfig,
  MatchState,
  MatchStaticResources,
  MoveDefinition,
  Player,
  RuntimeFlowDefinition,
  RuntimePhaseDefinition,
  CommandEnvelope,
  CommandResult,
  PublishedGameEvent,
  ZoneConfig,
  ZoneOperationsAPI,
} from "#core";
export {
  createCardsMapsFromStaticResources,
  createEmptyMatchStaticResources,
  createGameId,
  createPlayerId,
  createRecordCardCatalog,
} from "#core";

// ============================================================================
// Runtime Engine
// ============================================================================

export { LorcanaClient, createLorcanaClient } from "./lorcana-client";
export { LorcanaServer, createLorcanaServerGame } from "./lorcana-server";
export {
  AUTOMATED_ACTION_STRATEGIES,
  AGGRESSIVE_BOARD_CONTROL_LORE_RACE_STRATEGY_ID,
  BOARD_CONTROL_LORE_RACE_STRATEGY_ID,
  DEFAULT_AUTOMATED_ACTION_STRATEGY_ID,
  LEGACY_LORE_RACE_STRATEGY_ID,
  aggressiveBoardControlLoreRaceAutomatedActionStrategy,
  boardControlLoreRaceAutomatedActionStrategy,
  computeAutomatedActionStateFingerprint,
  createAutomatedActionBoardSnapshot,
  defaultLoreRaceAutomatedActionStrategy,
  getAutomatedActionStrategyOption,
  legacyLoreRaceAutomatedActionStrategy,
} from "./automation";
export type { AutomatedActionStrategyOption } from "./automation";
export type {
  AcceptedMoveRecord,
  EngineLogRecord,
  MoveHistorySourceAuthority,
} from "./history-records";
export {
  createAcceptedMoveRecord,
  createEngineLogRecord,
  createSyntheticProcessedCommand,
} from "./history-records";

export type {
  ChallengePreviewResult,
  PlayCardCostInput,
  PlayCardExecutionOptions,
  PlayCardDestinationInput,
  ResolutionExecutionOptions,
} from "./lorcana-engine-base";

export type {
  AvailableMove,
  AvailableMoveId,
  MoveOption,
  MoveOptionTarget,
  MoveOptionAbility,
  EffectTargetInfo,
} from "./available-moves";
export type {
  LorcanaEngineDeckEntry,
  LorcanaEnginePlayerInfo,
  LorcanaEngineInit,
} from "./lorcana-server";

// ============================================================================
// Production Serialization Helpers
// ============================================================================

export {
  getLorcanaServerAuthoritativeState,
  getLorcanaServerAuthoritativeSnapshot,
  loadLorcanaServerAuthoritativeState,
  loadLorcanaServerAuthoritativeSnapshot,
} from "./serialization";
export type {
  LorcanaServerAuthoritativeSnapshot,
  LorcanaUndoCheckpointSnapshot,
} from "./serialization";

// ============================================================================
// Runtime Game Definition
// ============================================================================

export { lorcanaRuntimeConfig } from "./runtime-game";

// ============================================================================
// Zone Configurations
// ============================================================================

export {
  getZoneConfig,
  isLorcanaZoneId,
  isPrivateZone,
  isPublicZone,
  isSecretZone,
  lorcanaRuntimeZones,
} from "./zones";

export type { LorcanaZoneId } from "./zones";

// ============================================================================
// Runtime Moves
// ============================================================================

export {
  alterHand,
  challenge,
  chooseWhoGoesFirst,
  concede,
  lorcanaRuntimeMoves,
  passTurn,
  playCard,
  putCardIntoInkwell,
  quest,
} from "./runtime-moves";

// ============================================================================
// Move Metadata Registry
// ============================================================================

export {
  LORCANA_MOVE_REGISTRY,
  formatMoveLog,
  getMoveHotkey,
  getMoveLabel,
  getMoveMetadata,
} from "./move-metadata-registry";

export type { CardNameLookup, MoveMetadata } from "./move-metadata-registry";

// ============================================================================
// Card Utilities
// ============================================================================

export {
  canInk,
  canQuest,
  getAllKeywords,
  getAmpersandNames,
  getLoreValue,
  getMoveCost,
  getShiftCost,
  getShiftTargetName,
  getStrength,
  getTotalKeyword,
  getWillpower,
  hasAmpersandName,
  hasBodyguard,
  hasEvasive,
  hasKeyword,
  hasReckless,
  hasRush,
  hasSameName,
  hasShift,
  hasVanish,
  hasWard,
  isAction,
  isCharacter,
  isItem,
  isLocation,
  isSong,
} from "./card-utils";

// ============================================================================
// Targeting DSL
// ============================================================================

export * from "./targeting";

// ============================================================================
// Types
// ============================================================================

export * from "./types";

export type { LorcanaCardDerived } from "./types/projected-board";
