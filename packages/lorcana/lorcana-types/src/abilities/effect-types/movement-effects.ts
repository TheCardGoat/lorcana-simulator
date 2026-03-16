/**
 * Movement Effect Types
 *
 * Effects that move cards between zones:
 * - Return to hand
 * - Put into inkwell
 * - Shuffle into deck
 * - Play cards from various zones
 * - Move characters to locations
 */

import type { CardType } from "../../cards/card-types";
import type {
  AmountExpr,
  CardFilter,
  CardSelectionFilter,
  EffectDuration,
} from "../../expressions";
import type {
  CardTarget,
  CharacterTarget,
  ItemTarget,
  LocationTarget,
  PlayerTarget,
} from "../target-types";

// ============================================================================
// Zone Movement Effects
// ============================================================================

/**
 * Return to hand effect
 *
 * @example "Return chosen character to their player's hand"
 */
export interface ReturnToHandEffect {
  type: "return-to-hand";
  target?: CardTarget;
  /** Legacy singular filter entrypoint. Prefer `filters`. */
  filter?: CardSelectionFilter | CardFilter | CardFilter[];
  /** Filter for what can be returned */
  filters?: readonly CardFilter[];
  /** Amount of cards to return */
  amount?: AmountExpr;
}

/**
 * Return random cards from a player's inkwell to their hand.
 *
 * @example "Return 2 cards at random from your inkwell to your hand"
 * @example "Each player returns cards at random from their inkwell to their hand until they have 3 cards left"
 */
export interface ReturnRandomFromInkwellEffect {
  type: "return-random-from-inkwell";
  /** Which player's inkwell to trim (default: CONTROLLER) */
  target?: PlayerTarget;
  /** How many cards to return */
  count?: AmountExpr;
  /** Leave exactly this many cards in the inkwell */
  leave?: number;
}

/**
 * Return from discard to hand
 *
 * @example "Return an action card from your discard to your hand"
 */
export interface ReturnFromDiscardEffect {
  type: "return-from-discard";
  cardType?: CardType | "song";
  cardName?: string;
  target?: PlayerTarget;
  count?: AmountExpr;
  destination?: "hand" | "play" | "top-of-deck";
  /** Legacy singular filter entrypoint. Prefer `filters`. */
  filter?: CardSelectionFilter | CardFilter | CardFilter[];
  filters?: readonly CardFilter[];
}

/**
 * Put into inkwell effect
 *
 * @example "Put the top card of your deck into your inkwell facedown and exerted"
 */
export interface PutIntoInkwellEffect {
  type: "put-into-inkwell";
  source?:
    | "top-of-deck"
    | "hand"
    | "chosen-card-in-play"
    | "chosen-character"
    | "this-card"
    | "discard"
    | "revealed"
    | "deck"
    | CardTarget;
  target?: PlayerTarget | CharacterTarget | "SELF";
  cardType?: CardType;
  exerted?: boolean;
  /** Whether the card is placed facedown in the inkwell */
  facedown?: boolean;
  /** Position in deck to take from */
  position?: "top" | "bottom";
  /** Who chooses the card */
  chosenBy?: "you" | "opponent" | "TARGET";
  /** Legacy singular filter entrypoint. Prefer `filters`. */
  filter?: CardSelectionFilter | CardFilter | CardFilter[];
  /** Filter for which cards can be chosen (when source is chosen-character etc) */
  filters?: readonly CardFilter[];
}

/**
 * Put card under another card (Boost mechanic)
 */
export interface PutUnderEffect {
  type: "put-under";
  source: "top-of-deck" | "hand" | "discard";
  under: CharacterTarget | LocationTarget | "self";
  cardType?: CardType;
}

/**
 * Shuffle into deck effect
 */
export interface ShuffleIntoDeckEffect {
  type: "shuffle-into-deck";
  target?: CharacterTarget | ItemTarget | LocationTarget | CardTarget | PlayerTarget;
  /** Whose deck to shuffle into */
  intoDeck?: "owner" | "controller";
}

/**
 * Put on bottom of deck
 */
export interface PutOnBottomEffect {
  type: "put-on-bottom";
  target: CharacterTarget | ItemTarget | LocationTarget | CardTarget;
  chosenBy?: "you" | "opponent" | "TARGET";
  ordering?: "player-choice";
  orderBy?: "owner" | "controller";
}

export interface MoveCardsFromUnderEffect {
  type: "move-cards-from-under";
  target?: CharacterTarget | ItemTarget | LocationTarget | CardTarget;
  source?: "target" | "selected";
  destination?: "deck-bottom-random" | "inkwell-facedown-exerted" | "hand";
}

// ============================================================================
// Play Card Effects
// ============================================================================

/**
 * Play a card effect
 *
 * @example "Play a character with cost 3 or less for free"
 * @example "Play a character from your discard for free"
 */
export interface PlayCardEffect {
  type: "play-card";
  from?: "hand" | "discard" | "deck" | "under-self" | "revealed";
  cardType?: CardType | "song" | "floodborn";
  costRestriction?: { comparison: "less-or-equal" | "equal"; value: number };
  cost?: "free" | "reduced";
  reducedBy?: AmountExpr;
  /** Character enters play exerted */
  entersExerted?: boolean;
  /** Grants Rush for this turn */
  grantsRush?: boolean;
  /** Banish at end of turn */
  banishAtEndOfTurn?: boolean;
  /** Legacy singular filter entrypoint. Prefer `filters`. */
  filter?: CardSelectionFilter | CardFilter | CardFilter[];
  /** Filter for what can be played */
  filters?: readonly CardFilter[];
  /** Whether to play for free (alias for cost: "free") */
  free?: boolean;
  /** Target for the play effect */
  target?: string;
}

/**
 * Enable playing from under a card
 */
export interface EnablePlayFromUnderEffect {
  type: "enable-play-from-under";
  cardType?: CardType | "song" | "floodborn";
  duration?: EffectDuration;
}

// ============================================================================
// Location Movement Effects
// ============================================================================

/**
 * Move character to location
 *
 * @example "Move a character of yours to a location for free"
 */
export interface MoveToLocationEffect {
  type: "move-to-location";
  character: CharacterTarget;
  location?: LocationTarget;
  cost?: "free" | "normal";
}

/**
 * Move cost reduction effect for locations
 *
 * @example "Your characters named Robin Hood may move here for free"
 * @example "Your Pirate characters may move here for free"
 */
export interface MoveCostReductionEffect {
  type: "move-cost-reduction";
  /** Legacy singular filter entrypoint. Prefer `filters`. */
  filter?: CardSelectionFilter | CardFilter | CardFilter[];
  /** Filter for which characters get the reduction */
  filters?: readonly CardFilter[];
  /** How much to reduce the cost (0 = free) */
  reduction: AmountExpr | "free";
  /** Target location (usually "here" for location abilities) */
  location?: "here" | LocationTarget;
}

/**
 * Grant abilities to characters while at this location
 *
 * @example "Characters gain Ward while here"
 * @example "Characters gain Ward and activated ability while here"
 */
export interface GrantAbilitiesWhileHereEffect {
  type: "grant-abilities-while-here";
  target?: CharacterTarget;
  abilities: (
    | { type: "keyword"; keyword: string; value?: number }
    | {
        type: "activated";
        name?: string;
        text?: string;
        id?: string;
        cost: { exert?: boolean; ink?: number };
        effect: {
          type: string;
          amount?: AmountExpr;
          target?: unknown;
          [key: string]: unknown;
        };
      }
  )[];
}
