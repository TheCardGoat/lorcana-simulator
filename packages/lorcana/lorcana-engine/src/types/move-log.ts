/**
 * MoveLog Type System
 *
 * One self-contained log entry per move. Private fields are inline with
 * access control via PrivateField<T>, stripped at delivery time.
 */

import type { CardInstanceId, PlayerId } from "#core";
import type { PrivateField } from "../core/runtime/private-field";
import type { ResolveBagCancelledCause, ScryDestinationEntry } from "./log-messages";

// =============================================================================
// Base
// =============================================================================

export interface MoveLogBase {
  type: MoveLog["type"];
  playerId: PlayerId;
  timestamp: number;
}

// =============================================================================
// Aggregated Outcomes — nested in any move that produces side-effects
// =============================================================================

export interface MoveOutcomes {
  cardsDrawn?: { amount: number; detail?: PrivateField<CardInstanceId[]> };
  cardsBanished?: CardInstanceId[];
  damageDealt?: DamageEntry[];
  loreChanged?: { playerId: PlayerId; amount: number; operation: "add" | "remove" };
  cardsExerted?: CardInstanceId[];
  cardsReadied?: CardInstanceId[];
  cardsMilled?: { playerId: PlayerId; amount: number; cardIds?: PrivateField<CardInstanceId[]> };
  cardsReturnedToHand?: CardInstanceId[];
  cardsMovedToZone?: Array<{ cardId: CardInstanceId; zone: string }>;
  cardsInked?: Array<{ cardId: CardInstanceId; exerted: boolean; cardName?: string }>;
}

export interface DamageEntry {
  sourceId: CardInstanceId;
  targetId: CardInstanceId;
  amount: number;
  kind: "combat" | "effect";
}

// =============================================================================
// Simple Moves
// =============================================================================

export interface PlayCardLog extends MoveLogBase {
  type: "playCard";
  cardId: CardInstanceId;
  inkPaid?: number;
  outcomes?: MoveOutcomes;
}

export interface ShiftCardLog extends MoveLogBase {
  type: "shiftCard";
  cardId: CardInstanceId;
  shiftTargetId: CardInstanceId;
  /** Stored when the move runs so UI text can name the target after it is in limbo (hidden in zone projection). */
  shiftTargetName?: string;
  inkPaid?: number;
  outcomes?: MoveOutcomes;
}

export interface SingCardLog extends MoveLogBase {
  type: "singCard";
  cardId: CardInstanceId;
  singerIds: CardInstanceId[];
  outcomes?: MoveOutcomes;
}

export interface ChallengeLog extends MoveLogBase {
  type: "challenge";
  attackerId: CardInstanceId;
  defenderId: CardInstanceId;
  damage: { attacker: number; defender: number };
  banished: CardInstanceId[];
  triggered?: string[];
  outcomes?: MoveOutcomes;
}

export interface QuestLog extends MoveLogBase {
  type: "quest";
  cardId: CardInstanceId;
  loreGained: number;
  outcomes?: MoveOutcomes;
}

export interface QuestWithAllLog extends MoveLogBase {
  type: "questWithAll";
  cardIds: CardInstanceId[];
  totalLore: number;
  outcomes?: MoveOutcomes;
}

export interface InkCardLog extends MoveLogBase {
  type: "inkCard";
  cardId: CardInstanceId;
  cardName?: string;
}

export interface ActivateAbilityLog extends MoveLogBase {
  type: "activateAbility";
  cardId: CardInstanceId;
  abilityName?: string;
  /** Instance ids of cards discarded to pay activated ability costs, when applicable. */
  discardCardIds?: CardInstanceId[];
  inkPaid?: number;
  outcomes?: MoveOutcomes;
}

export interface MoveToLocationLog extends MoveLogBase {
  type: "moveToLocation";
  characterId: CardInstanceId;
  locationId: CardInstanceId;
}

export interface PassTurnLog extends MoveLogBase {
  type: "passTurn";
}

export interface ConcedeLog extends MoveLogBase {
  type: "concede";
}

export interface ForfeitGameLog extends MoveLogBase {
  type: "forfeitGame";
  winnerId: PlayerId;
  reason: string;
}

// =============================================================================
// Setup Moves
// =============================================================================

export interface AlterHandLog extends MoveLogBase {
  type: "alterHand";
  count: number;
  mulliganed?: PrivateField<CardInstanceId[]>;
  drawn?: PrivateField<CardInstanceId[]>;
}

export interface ChooseFirstPlayerLog extends MoveLogBase {
  type: "chooseFirstPlayer";
  chosenPlayerId: PlayerId;
}

// =============================================================================
// Resolution Moves
// =============================================================================

export interface ResolveBagLog extends MoveLogBase {
  type: "resolveBag";
  sourceCardId: CardInstanceId;
  abilityName?: string;
  status: "completed" | "skipped" | "pending" | "cancelled";
  cancelReason?: ResolveBagCancelledCause;
  resolution?: BagResolution;
  outcomes?: MoveOutcomes;
}

export interface ResolveEffectLog extends MoveLogBase {
  type: "resolveEffect";
  sourceCardId: CardInstanceId;
  resolution: EffectResolution;
  outcomes?: MoveOutcomes;
}

// ─── Effect Resolution Sub-Union ──────────────────────────────

export type EffectResolution =
  | { kind: "targetSelection"; targets: Array<CardInstanceId | PlayerId> }
  | { kind: "discardChoice"; discarded: Array<CardInstanceId | PlayerId> }
  | { kind: "choiceSelection"; choiceIndex: number; revealedCardId?: CardInstanceId }
  | { kind: "optionalSelection"; accepted: boolean }
  | { kind: "nameCardSelection"; namedCard: string }
  | {
      kind: "scrySelection";
      count: number;
      detail?: PrivateField<ScryDestinationEntry[]>;
    }
  | { kind: "revealTopCard"; targetPlayerId: PlayerId; cardId: CardInstanceId; destination: string }
  | { kind: "cancelled"; cause: string };

export type BagResolution =
  | { kind: "targets"; targets: Array<CardInstanceId | PlayerId> }
  | { kind: "noInput" };

// =============================================================================
// System / Turn Transitions
// =============================================================================

export interface TurnStartLog extends MoveLogBase {
  type: "turnStart";
  turn: number;
  activePlayerId: PlayerId;
  drawn?: PrivateField<CardInstanceId[]>;
  cardsReadied?: CardInstanceId[];
  effectsExpired?: string[];
  triggeredAbilities?: string[];
}

export interface GameEndLog extends MoveLogBase {
  type: "gameEnd";
  winnerId?: PlayerId;
  reason: string;
}

export interface TurnSkippedLog extends MoveLogBase {
  type: "turnSkipped";
  /** Player who triggered the skip (the caller / victim). */
  skipperPlayerId: PlayerId;
  /** Player whose turn decision window was skipped (the staller). */
  stallerPlayerId: PlayerId;
}

export interface PlayerDroppedLog extends MoveLogBase {
  type: "playerDropped";
  /** Player who triggered the drop (the caller). */
  dropperPlayerId: PlayerId;
  /** Player who was dropped from the game. */
  droppedPlayerId: PlayerId;
  /** Why the drop was allowed, e.g. "Opponent disconnected" or "Opponent timed out". */
  reason: string;
}

// =============================================================================
// The Union
// =============================================================================

export type MoveLog =
  // Simple moves
  | PlayCardLog
  | ShiftCardLog
  | SingCardLog
  | ChallengeLog
  | QuestLog
  | QuestWithAllLog
  | InkCardLog
  | ActivateAbilityLog
  | MoveToLocationLog
  | PassTurnLog
  | ConcedeLog
  | ForfeitGameLog
  // Setup
  | AlterHandLog
  | ChooseFirstPlayerLog
  // Resolution
  | ResolveBagLog
  | ResolveEffectLog
  // System
  | TurnStartLog
  | GameEndLog
  | TurnSkippedLog
  | PlayerDroppedLog;

export type MoveLogType = MoveLog["type"];
