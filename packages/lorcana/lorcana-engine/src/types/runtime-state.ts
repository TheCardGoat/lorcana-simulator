/**
 * Lorcana Runtime State Types
 *
 * New state types for the MatchRuntime architecture.
 * Uses MatchState<G> = { G, ctx } pattern where:
 * - G: game-specific state (LorcanaG)
 * - ctx: framework-managed runtime state (TCGCtx)
 */

import type {
  Amount,
  Classification,
  Condition,
  Effect,
  ReplacementAbilityKind,
  ReplacementRegistrationKind,
  Trigger,
} from "@tcg/lorcana-types";
import type { CardInstanceId, MatchState, PlayerId } from "#core";
import type { CardPlayedPayload, DynamicAmountEventSnapshot } from "./domain-events";
import type { ResolutionSelectionContext } from "./resolution-selection";

// Re-export MatchState for convenience
export type { MatchState };

/**
 * Card State (Ready/Exerted)
 */
export type CardReadyState = "ready" | "exerted";

/**
 * Lorcana Phase
 *
 * Three-phase turn structure (Rule 4.1.1):
 * - beginning: Ready, Set, Draw steps
 * - main: Player can take turn actions
 * - end: End of turn cleanup
 */
export type LorcanaPhase = "beginning" | "main" | "end";

/**
 * Turn Step (within Beginning phase)
 */
export type LorcanaStep = "ready" | "set" | "draw";

/**
 * Challenge State
 *
 * Temporary state during challenge resolution.
 */
export interface ChallengeState {
  attacker: CardInstanceId;
  defender: CardInstanceId;
  attackerOwnerId: PlayerId;
  defenderOwnerId: PlayerId;
  stage: "declaration" | "damage" | "post-damage";
}

/**
 * Supported continuous-effect stat keys.
 * Keep this union broad enough for future stat-mod effect coverage.
 */
export type ContinuousEffectStat = "strength" | "willpower" | "lore" | "singer-threshold";

/**
 * Continuous effect instance for stat modifiers.
 * Additional effect kinds can be added to the union as runtime support expands.
 */
export interface StatModifierContinuousEffectInstance {
  id: string;
  kind: "stat-modifier";
  sourceId: CardInstanceId;
  targetId: CardInstanceId;
  controllerId?: PlayerId;
  stat: ContinuousEffectStat;
  modifier: number;
  condition?: Condition;
  duration: "this-turn" | "until-start-of-next-turn";
  createdAtTurn: number;
  expiresAtTurn: number;
  nonStacking?: boolean;
}

/**
 * Continuous effect instances tracked in runtime state.
 * Currently stat-modifier focused; future kinds should extend this union.
 */
export type ContinuousEffectInstance = StatModifierContinuousEffectInstance;

/**
 * Continuous effect runtime state
 */
export interface ContinuousEffectState {
  /** Monotonic sequence for deterministic effect IDs */
  nextSeq: number;
  instances: ContinuousEffectInstance[];
}

/**
 * Turn Metadata
 *
 * Tracks actions taken this turn for validation and cleanup.
 * Ink available is derived from ctx.framework.zones (Option B: count of ready cards in inkwell).
 */
export interface TurnMetadata {
  cardsPlayedThisTurn: CardInstanceId[];
  charactersQuesting: CardInstanceId[];
  /** Card instance IDs inked this turn (one per turn by default; supports "second inkwell" effects) */
  inkedThisTurn: CardInstanceId[];
  /** Additional hand-to-inkwell actions allowed for the active player this turn */
  additionalInkwellActions?: number;
  /** Top cards that were played using Shift this turn */
  shiftPlayedThisTurn: CardInstanceId[];
  /** Challenge declarations by player this turn */
  challengesByPlayerThisTurn: Record<PlayerId, number>;
  /** Characters that took damage this turn, grouped by owner */
  damagedCharactersByOwnerThisTurn: Record<PlayerId, number>;
  /** Character instance IDs that were challenged this turn */
  challengedCharactersThisTurn: CardInstanceId[];
  /** Character instance IDs banished this turn */
  banishedCharactersThisTurn: CardInstanceId[];
  /** Characters banished in a challenge this turn, grouped by owner */
  banishedCharactersInChallengeByOwnerThisTurn: Record<PlayerId, number>;
  /** Number of cards that left any discard pile this turn */
  discardCardsLeftThisTurn: number;
  /** Pending temporary play-cost reductions keyed by controller */
  pendingCostReductionsByPlayer: Record<PlayerId, PendingCostReduction[]>;
  /** Cards drawn this turn, counted per player (for Ink Amplifier and similar) */
  cardsDrawnThisTurnByPlayer: Record<PlayerId, number>;
  /** Temporary permission to play characters from under an item this turn */
  pendingPlayFromUnder: PlayFromUnderPermission[];
  /** Cards put under a character this turn, keyed by the character's instance ID */
  cardsUnderThisTurn?: Record<CardInstanceId, CardInstanceId[]>;
}

export interface PendingCostReduction {
  amount: number;
  cardType?: "character" | "item" | "location" | "action" | "song";
  classification?: Classification | Classification[] | readonly Classification[];
  expiresAtTurn: number;
  consumeOnUse: boolean;
}

/**
 * Temporary permission to play a card from under a specific item this turn.
 * Created by "RISE AND JOIN ME!" style effects.
 */
export interface PlayFromUnderPermission {
  /** The item whose cards may be played */
  sourceItemId: CardInstanceId;
  /** Which turn this expires at (end-of-turn cleanup) */
  expiresAtTurn: number;
  /** If set, only cards of this type may be played (e.g. "character") */
  cardType?: string;
  /** The player who activated the effect (only their cards should be playable) */
  controllerId: PlayerId;
}

export interface TemporaryGrantedAbilityPayload {
  type: string;
  [key: string]: unknown;
}

export interface TemporaryRestrictionPayload {
  type: string;
  sourceId?: CardInstanceId;
  activeWhileSourceInPlay?: boolean;
}

export interface TemporaryKeywordPayload {
  type: string;
  sourceId?: CardInstanceId;
  activeWhileSourceInPlay?: boolean;
}

export type BufferedTriggeredEvent =
  | "play"
  | "sing"
  | "discard"
  | "draw"
  | "quest"
  | "ready"
  | "support"
  | "move"
  | "challenge"
  | "challenged"
  | "challenged-and-banished"
  | "banish"
  | "banish-in-challenge"
  | "remove-damage"
  | "return-to-hand"
  | "ink"
  | "start-turn"
  | "end-turn"
  | "be-chosen"
  | "boost"
  | "put-card-under"
  | "damage"
  | "deal-damage"
  | "exert"
  | "gain-lore"
  | "lose-lore"
  | "leave-discard";

export interface PendingTriggeredEvent {
  id: string;
  event: BufferedTriggeredEvent;
  playerId?: PlayerId;
  cardPlayed?: CardPlayedPayload;
  fromZone?: string;
  toZone?: string;
  subjectCardId?: CardInstanceId;
  triggerSourceCardId?: CardInstanceId;
  /** The card type of the source that caused this event (e.g., "action", "item") */
  sourceCardType?: "character" | "action" | "item" | "location";
  attackerId?: CardInstanceId;
  defenderId?: CardInstanceId;
  happenedInChallenge?: boolean;
  eventSnapshot?: DynamicAmountEventSnapshot;
  triggerCandidates?: TriggeredEventCandidate[];
}

export interface GeneratedTriggeredAbilityEntry {
  id: string;
  type: "generated-triggered-ability";
  controllerId: PlayerId;
  sourceId: CardInstanceId;
  cardPlayed: CardPlayedPayload;
  ability: {
    name?: string;
    trigger: Trigger;
    condition?: Condition;
    effect: Effect;
  };
  startsAtTurn: number;
  expiresAtTurn: number;
}

export interface BagEffectEntry {
  id: string;
  type: "bag-effect";
  kind: "triggered-ability";
  abilityId: string;
  abilityKey: string;
  abilityName?: string;
  controllerId: PlayerId;
  chooserId: PlayerId;
  sourceId: CardInstanceId;
  cardPlayed: CardPlayedPayload;
  trigger?: Trigger;
  condition?: Condition;
  effect: Effect;
  occurrenceIndex: number;
  resolutionInput: PendingActionResolutionInput;
}

export interface BagState {
  nextSeq: number;
  items: BagEffectEntry[];
  lastResolvedPlayerId?: PlayerId;
}

export type DelayedTriggerTiming = "end-of-turn" | "start-of-next-turn" | "end-of-next-turn";

export type DelayedTriggerWindow = "end-of-turn" | "start-of-turn";

export interface TriggerRegistrationAbility {
  id?: string;
  name?: string;
  trigger: Trigger;
  sourceZones?: ("play" | "hand" | "discard" | "inkwell")[];
  condition?: Condition;
  effect: Effect;
}

export interface TriggeredEventCandidate {
  abilityId: string;
  controllerId: PlayerId;
  sourceId: CardInstanceId;
  cardPlayed: CardPlayedPayload;
  ability: TriggerRegistrationAbility;
  resolutionInput: PendingActionResolutionInput;
}

export type TriggerRegistrationLifecycle =
  | {
      kind: "floating";
      startsAtTurn: number;
      expiresAtTurn: number;
    }
  | {
      kind: "delayed";
      timing: DelayedTriggerTiming;
      dueWindow: DelayedTriggerWindow;
      duePlayerId: PlayerId;
      dueCompletedTurns: number;
    };

export interface TriggerRegistration {
  id: string;
  abilityId: string;
  sourceId: CardInstanceId;
  controllerId: PlayerId;
  cardPlayed: CardPlayedPayload;
  ability: TriggerRegistrationAbility;
  lifecycle: TriggerRegistrationLifecycle;
  resolutionInput: PendingActionResolutionInput;
}

export interface TriggeredAbilitiesUsageLedger {
  occurrences: Record<string, number>;
  resolutions: Record<string, number>;
}

export interface TriggeredAbilitiesState {
  pendingEvents: PendingTriggeredEvent[];
  registrations: TriggerRegistration[];
  bag: BagState;
  usageLedger: TriggeredAbilitiesUsageLedger;
}

export type ReplacementEventKind =
  | "modify-stat"
  | "deal-damage"
  | "remove-damage"
  | "challenge-damage"
  | "gain-lore"
  | "zone-change";

export interface ReplacementTriggerContext {
  playerId?: PlayerId;
  subjectCardId?: CardInstanceId;
  triggerSourceCardId?: CardInstanceId;
  attackerId?: CardInstanceId;
  defenderId?: CardInstanceId;
}

export interface ReplacementRegistration {
  id: string;
  sourceId: CardInstanceId;
  controllerId: PlayerId;
  replacement: ReplacementRegistrationKind;
  targetId?: CardInstanceId;
  createdAtTurn: number;
  startsAtTurn: number;
  expiresAtTurn: number;
}

export interface ReplacementUsageLedger {
  perTurn: Record<string, number>;
}

export interface ReplacementEffectsState {
  nextSeq: number;
  registrations: ReplacementRegistration[];
  usageLedger: ReplacementUsageLedger;
}

export type PendingTurnTransitionStage = "end-of-turn" | "advance-turn" | "start-of-turn";

export interface PendingTurnTransitionState {
  previousPlayer: PlayerId;
  stage: PendingTurnTransitionStage;
  nextPlayer?: PlayerId;
  turnNumber?: number;
  triggerWindowQueued?: boolean;
  drawStepStarted?: boolean;
}

export interface TemporaryPlayerRestrictionsState {
  restrictionsByPlayer: Record<PlayerId, Record<string, number>>;
  startsByPlayer: Record<PlayerId, Record<string, number>>;
}

export type PendingActionEffectKind =
  | "discard-choice"
  | "choice-selection"
  | "name-card-selection"
  | "optional-selection"
  | "scry-selection"
  | "target-selection";

export interface PendingActionEffectContinuation {
  remainingEffects?: unknown[];
  stagedSequence?: {
    sequenceEffect: unknown;
    collectedTargets: Array<CardInstanceId | PlayerId>;
    collectedTargetCounts: number[];
    remainingSteps: unknown[];
  };
}

export interface PendingActionResolutionInput {
  targets?: CardInstanceId | PlayerId | readonly (CardInstanceId | PlayerId)[];
  currentTargets?: CardInstanceId | PlayerId | readonly (CardInstanceId | PlayerId)[];
  contextTargets?: CardInstanceId | PlayerId | readonly (CardInstanceId | PlayerId)[];
  amount?: Amount;
  namedCard?: string;
  resolveOptional?: boolean;
  choiceIndex?: number;
  preventAutoResolveTriggeredEffects?: boolean;
  destinations?: {
    zone: string;
    cards: CardInstanceId | CardInstanceId[];
  }[];
  eventSnapshot?: DynamicAmountEventSnapshot;
  triggerContext?: ReplacementTriggerContext;
}

export interface PendingActionEffect {
  id: string;
  type: "action-effect";
  kind: PendingActionEffectKind;
  sourceId: CardInstanceId;
  sourceCardId: CardInstanceId;
  controllerId: PlayerId;
  chooserId: PlayerId;
  cardPlayed: CardPlayedPayload;
  effect: unknown;
  continuation?: PendingActionEffectContinuation;
  resolutionInput: PendingActionResolutionInput;
  selectionContext?: ResolutionSelectionContext;
}

/**
 * Lorcana Card Metadata (Dynamic State)
 *
 * Stored in ctx.framework.zones.private.cardMeta
 * Values are optional to optimize memory usage, defaults must be the undefined type.
 */
export interface LorcanaCardMeta extends Record<string, unknown> {
  /** Ready or exerted */
  state?: CardReadyState;
  /** Damage counters */
  damage?: number;
  /** Drying = summoning sickness */
  isDrying?: boolean;
  /** Public face state for cards that can stay visible in an otherwise face-down zone */
  publicFaceState?: "faceUp" | "faceDown";
  /** Location this character is at (if any) */
  atLocationId?: CardInstanceId;
  /** IDs of cards stacked under this top card (Shift stack) */
  cardsUnder?: CardInstanceId[];
  /** ID of the card currently on top of this card in a Shift stack */
  stackParentId?: CardInstanceId;
  /** Whether this card entered play using Shift */
  playedViaShift?: boolean;
  /** Which payment mode was used to play this card */
  playedCostType?: "standard" | "shift" | "sing" | "singTogether" | "free";
  /** Temporary keywords granted by action effects and their inclusive expiration turn */
  temporaryKeywords?: Record<string, number>;
  /** Inclusive start turns for temporary keywords (defaults to current turn when omitted) */
  temporaryKeywordStarts?: Record<string, number>;
  /** Temporary values for parameterized keywords (e.g. Challenger/Resist) */
  temporaryKeywordValues?: Record<string, number>;
  /** Structured payloads for temporary keywords keyed by keyword name */
  temporaryKeywordPayloads?: Record<string, TemporaryKeywordPayload>;
  /** Temporary classifications granted by action effects and their inclusive expiration turn */
  temporaryClassifications?: Record<string, number>;
  /** Inclusive start turns for temporary classifications */
  temporaryClassificationStarts?: Record<string, number>;
  /** Temporary granted non-keyword abilities and their inclusive expiration turn */
  temporaryAbilities?: Record<string, number>;
  /** Inclusive start turns for temporary non-keyword abilities */
  temporaryAbilityStarts?: Record<string, number>;
  /** Structured payloads for temporary granted abilities keyed by ability id */
  temporaryAbilityPayloads?: Record<string, TemporaryGrantedAbilityPayload>;
  /** Temporary restrictions granted by action effects and their inclusive expiration turn */
  temporaryRestrictions?: Record<string, number>;
  /** Inclusive start turns for temporary restrictions */
  temporaryRestrictionStarts?: Record<string, number>;
  /** Structured payloads for temporary restrictions keyed by restriction id */
  temporaryRestrictionPayloads?: Record<string, TemporaryRestrictionPayload>;
  /** Activated ability usage count keyed by ability id */
  activatedAbilityUses?: Record<string, number>;
  /** Turn number for the current activated ability usage count */
  activatedAbilityUseTurns?: Record<string, number>;
  /** Printed replacement abilities currently active on this card */
  replacementAbilities?: ReplacementAbilityKind[];
}

/**
 * Lorcana Game-Specific State (G)
 *
 * This is the game-owned state that goes in MatchState<G>.
 * Framework manages zones, cards, and ctx. Card definitions from staticResources;
 * ink/character/permanent state derived from ctx.framework.zones and cardMeta; game end from ctx.status.
 */
export interface LorcanaG {
  /** Lore totals for each player (win at 20) */
  lore: Record<PlayerId, number>;

  /**
   * Override lore required to win for specific players.
   * When a player appears in this map, they need that much lore to win
   * instead of the default 20. Populated by win-condition-modification
   * static abilities (e.g. Donald Duck - Flustered Sorcerer).
   *
   * Keys are the player IDs whose win threshold is raised.
   * The map only contains overrides — missing entries use the default 20.
   */
  loreToWin?: Record<PlayerId, number>;

  /** Turn metadata - reset each turn */
  turnMetadata: TurnMetadata;

  /** Triggered-ability runtime state */
  triggeredAbilities: TriggeredAbilitiesState;

  /** Suspended action-effect resolutions waiting for a player decision */
  pendingEffects: PendingActionEffect[];

  /** Pass-turn pipeline continuation when delayed triggers suspend mid-transition */
  pendingTurnTransition?: PendingTurnTransitionState;

  /** Completed turns per player (persistent across turns) */
  turnsCompletedByPlayer: Record<PlayerId, number>;

  /** Active continuous effects */
  continuousEffects: ContinuousEffectState;

  /** Temporary play restrictions tracked on players rather than cards */
  temporaryPlayerRestrictions: TemporaryPlayerRestrictionsState;

  /** Replacement effects created by resolving cards and abilities */
  replacementEffects: ReplacementEffectsState;

  /** Challenge state (only during challenge) */
  challengeState?: ChallengeState;
}

/**
 * Lorcana Match State
 *
 * Full state type: MatchState
 */
export type LorcanaMatchState = MatchState;

/**
 * Create initial Lorcana G state
 */
export function createInitialLorcanaG(player1Id: PlayerId, player2Id: PlayerId): LorcanaG {
  return {
    lore: {
      [player1Id]: 0,
      [player2Id]: 0,
    },
    turnMetadata: {
      cardsPlayedThisTurn: [],
      charactersQuesting: [],
      inkedThisTurn: [],
      additionalInkwellActions: 0,
      shiftPlayedThisTurn: [],
      challengesByPlayerThisTurn: {},
      damagedCharactersByOwnerThisTurn: {},
      challengedCharactersThisTurn: [],
      banishedCharactersThisTurn: [],
      banishedCharactersInChallengeByOwnerThisTurn: {},
      discardCardsLeftThisTurn: 0,
      pendingCostReductionsByPlayer: {},
      cardsDrawnThisTurnByPlayer: {} as Record<PlayerId, number>,
      pendingPlayFromUnder: [],
    },
    triggeredAbilities: {
      pendingEvents: [],
      registrations: [],
      bag: {
        nextSeq: 1,
        items: [],
      },
      usageLedger: {
        occurrences: {},
        resolutions: {},
      },
    },
    pendingEffects: [],
    turnsCompletedByPlayer: {
      [player1Id]: 0,
      [player2Id]: 0,
    },
    continuousEffects: {
      nextSeq: 1,
      instances: [],
    },
    temporaryPlayerRestrictions: {
      restrictionsByPlayer: {},
      startsByPlayer: {},
    },
    replacementEffects: {
      nextSeq: 1,
      registrations: [],
      usageLedger: {
        perTurn: {},
      },
    },
  };
}

/**
 * Create default card metadata for new cards entering play
 */
export function createDefaultCardMeta(): LorcanaCardMeta {
  return {
    damage: undefined,
    isDrying: undefined,
    publicFaceState: undefined,
    state: undefined,
    atLocationId: undefined,
    cardsUnder: undefined,
    stackParentId: undefined,
    playedViaShift: undefined,
    playedCostType: undefined,
    temporaryKeywords: undefined,
    temporaryKeywordStarts: undefined,
    temporaryKeywordValues: undefined,
    temporaryAbilities: undefined,
    temporaryAbilityStarts: undefined,
    temporaryAbilityPayloads: undefined,
    temporaryRestrictions: undefined,
    temporaryRestrictionPayloads: undefined,
    temporaryRestrictionStarts: undefined,
    activatedAbilityUses: undefined,
    activatedAbilityUseTurns: undefined,
    replacementAbilities: undefined,
  };
}
