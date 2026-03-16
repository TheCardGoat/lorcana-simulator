/**
 * Modifier Effect Types
 *
 * Effects that modify game state or card properties:
 * - Stat modifications (strength, willpower, lore)
 * - Keyword granting/removal
 * - Restrictions
 * - Special state modifications
 * - Reveal/Search effects
 */

import type { Classification } from "../../cards/classifications";
import type { CardType } from "../../cards/card-types";
import type { AmountExpr, EffectDuration } from "../../expressions";
import type { Condition } from "../condition-types";
import type { CardTarget, CharacterTarget, LocationTarget, PlayerTarget } from "../target-types";
import type { NumericSelfReplacement } from "./basic-effects";

// ============================================================================
// Stat Modification Effects
// ============================================================================

/**
 * Modify stat effect (for "this turn" effects)
 *
 * @example "Chosen character gets +2 strength this turn"
 * @example "Your characters get +1 lore this turn"
 */
export interface ModifyStatEffect {
  type: "modify-stat";
  stat?: "strength" | "willpower" | "lore";
  modifier?: AmountExpr;
  target?: CharacterTarget | LocationTarget;
  chosenBy?: "you" | "opponent";
  duration?: EffectDuration;
  condition?: Condition;
  /** When true, replace existing matching (source,target,stat) modifiers instead of stacking */
  nonStacking?: boolean;
  /** Alternative field for modifier value */
  value?: AmountExpr;
  selfReplacement?: NumericSelfReplacement;
}

/**
 * Set stat effect (absolute value)
 */
export interface SetStatEffect {
  type: "set-stat";
  stat: "strength" | "willpower" | "lore";
  value: AmountExpr;
  target: CharacterTarget;
  duration?: EffectDuration;
}

/**
 * Apply a continuous floor to a characteristic after all modifiers are combined.
 *
 * @example "Your characters' strength can't be reduced below their printed value"
 */
export interface StatFloorEffect {
  type: "stat-floor";
  stat: "strength" | "willpower" | "lore";
  minimum: "printed" | number;
  target: CharacterTarget | LocationTarget;
}

// ============================================================================
// Keyword Effects
// ============================================================================

/**
 * Grant keyword effect
 *
 * @example "Chosen character gains Rush this turn"
 * @example "Your characters gain Resist +2 this turn"
 */
export interface GainKeywordEffect {
  type: "gain-keyword";
  keyword?:
    | "Rush"
    | "Ward"
    | "Evasive"
    | "Bodyguard"
    | "Support"
    | "Reckless"
    | "Alert"
    | "Challenger"
    | "Resist"
    | "Singer"
    | "Sing Together"
    | string; // Allow any keyword string for flexibility
  /** For Challenger +X and Resist +X */
  value?: number;
  target?: CharacterTarget | LocationTarget;
  duration?: EffectDuration;
}

/**
 * Lose keyword effect
 */
export interface LoseKeywordEffect {
  type: "lose-keyword";
  keyword: string;
  target: CharacterTarget;
  duration?: EffectDuration;
}

// ============================================================================
// Restriction Effects
// ============================================================================

/**
 * Apply restriction effect
 *
 * @example "Chosen character can't quest during their next turn"
 * @example "Characters can't be challenged while here"
 */
export interface RestrictionEffect {
  type: "restriction";
  restriction?:
    | "cant-quest"
    | "cant-challenge"
    | "cant-be-challenged"
    | "cant-ready"
    | "cant-quest-or-challenge"
    | "cant-be-dealt-damage"
    | "cant-sing"
    | "cant-move"
    | "enters-play-exerted"
    | "skip-draw-step"
    | "must-quest" // Forces character to quest if able
    | "cant-play-actions" // Opponents can't play actions
    | "cant-play-items" // Opponents can't play items
    | "cant-play-characters" // Opponents can't play characters
    | "cant-play" // Generic can't play restriction
    | "must-be-chosen-for-effects" // Opponents must choose this character for actions and abilities if able
    // Extended restrictions for card text coverage
    | "doesnt-ready"; // Character doesn't ready (alias for cant-ready)
  target?: CharacterTarget | LocationTarget | PlayerTarget;
  duration?: EffectDuration;
  /** Condition for when the restriction applies */
  condition?: Condition;
  linkedToSource?: boolean;
}

/**
 * Grant ability effect (can challenge ready characters, etc.)
 */
export interface GrantAbilityEffect {
  type: "grant-ability";
  ability?:
    | "can-challenge-ready"
    | "gain-lore-when-questing"
    | "lose-lore-when-questing"
    | "gain-lore-when-challenging"
    | "gain-2-lore-on-banish-in-challenge"
    | "takes-no-damage-from-challenges"
    | "return-to-hand-when-banished"
    | "banish-damaged-when-exerted"
    | {
        type: "draw-when-questing";
        amount?: AmountExpr;
        optional?: boolean;
      }
    | {
        type: "lose-lore-when-questing";
        amount?: AmountExpr;
        target?: PlayerTarget;
      }
    | { type: string; [key: string]: unknown };
  target?: CharacterTarget;
  duration?: EffectDuration;
}

/**
 * Reduce cost effect
 *
 * @example "You pay 1 less to play this item"
 */
export interface CostReductionEffect {
  type: "cost-reduction";
  amount?: AmountExpr;
  /** Alternative field for reduction amount */
  reduction?: { ink: AmountExpr };
  cardType?: CardType | "song";
  classification?: Classification;
  target?: PlayerTarget; // Who gets the reduction (usually YOU)
  duration?: EffectDuration;
}

// ============================================================================
// Misc Effects
// ============================================================================

export interface NameACardEffect {
  type: "name-a-card";
}

export interface RevealTopCardEffect {
  type: "reveal-top-card";
  target?: PlayerTarget; // Whose deck
}

export interface PutOnTopEffect {
  type: "put-on-top";
  source?: "revealed" | CardTarget;
}

export interface DrawUntilHandSizeEffect {
  type: "draw-until-hand-size";
  size: number;
  target?: PlayerTarget;
}

// ============================================================================
// Special State Modifications
// ============================================================================

/**
 * Enters play modification effect
 *
 * @example "Enters play exerted"
 * @example "Enters play with 2 damage"
 */
export interface EntersPlayEffect {
  type: "enters-play-modification";
  modification: "exerted" | "damaged";
  amount?: AmountExpr; // For damaged
  target: CharacterTarget;
}

/**
 * Win condition modification effect
 *
 * @example "Opponents need 25 lore to win"
 */
export interface WinConditionEffect {
  type: "win-condition-modification";
  loreRequired: number;
  target: PlayerTarget;
}

/**
 * Property modification effect
 *
 * @example "This character counts as being named 'Dalmatian Puppy'"
 */
export interface PropertyModificationEffect {
  type: "property-modification";
  property?: "classification" | "name" | "singer-threshold";
  value?: string;
  operation?: "add-alias" | "add";
  target?: CharacterTarget;
}

// ============================================================================
// Reveal/Search Effects
// ============================================================================

/**
 * Reveal hand effect
 */
export interface RevealHandEffect {
  type: "reveal-hand";
  target: PlayerTarget;
}

/**
 * Search deck effect
 */
export interface SearchDeckEffect {
  type: "search-deck";
  cardType?: CardType | "song" | "floodborn";
  cardName?: string;
  classification?: string;
  putInto?: "hand" | "top-of-deck" | "play";
  /** Alias for putInto: "top-of-deck" */
  putOnTop?: boolean;
  reveal?: boolean;
  shuffle?: boolean;
}
