/**
 * Structured "why is the Play CTA disabled?" reasons for a card in hand.
 *
 * The engine emits codes and parameters only — no human-readable strings —
 * so the UI is the single source of truth for localization. Map each code
 * to a template in the i18n catalog (e.g. `playCard.disabled.INSUFFICIENT_INK`),
 * and substitute `params` into the template at render time.
 *
 * Returned by `LorcanaEngineBase.getPlayCardDisabledReason(cardInput)`:
 * - `null` means the card is playable right now (standard, shift, or sing).
 * - A `PlayCardDisabledReason` means the card cannot be played; the UI should
 *   render the button disabled with a tooltip explaining why.
 */
export type PlayCardDisabledReasonCode =
  // The card isn't in the player's hand (or the input couldn't be resolved
  // to a card instance the player controls).
  | "NOT_IN_HAND"
  // Standard ink cost cannot be paid.
  // params: { needed: number; available: number }
  | "INSUFFICIENT_INK"
  // Shift cost: no character with a matching name is in the player's play zone
  // to be shifted onto.
  // params: { targetName: string }
  | "SHIFT_NO_TARGET"
  // Shift cost requires discarding N cards of a specific type, but the player
  // does not have enough qualifying cards in hand.
  // params: { discardCardType: string; count: number } — `discardCardType` is
  // "action" | "song" | "character" | "item" | "location" | "card" (any).
  | "SHIFT_NO_DISCARD_AVAILABLE"
  // Shift cost is ink-based and the player cannot pay it.
  // params: { needed: number; available: number }
  | "SHIFT_INSUFFICIENT_INK"
  // Song card has no eligible singer (no character in play with sufficient
  // cost to sing, and not enough ink to play normally).
  // params: { songCost: number }
  | "SONG_NO_SINGER"
  // A temporary or static restriction (e.g. an opponent card forbidding action
  // plays this turn) blocks this play.
  | "PLAYER_PLAY_RESTRICTED"
  // The card has a self-play condition that isn't currently satisfied
  // (e.g. "You can't play this character unless you have 5 or more characters
  // in play").
  | "SELF_PLAY_CONDITION_NOT_MET"
  // A pending effect (bag) must be resolved before another play can be made.
  | "BAG_PENDING"
  // Catch-all for other validateMove failures. The UI should render a generic
  // "This card can't be played right now" tooltip and ideally also log the
  // raw `validateMoveErrorCode` so we can extend the taxonomy later.
  // params: { validateMoveErrorCode: string }
  | "UNKNOWN";

export interface PlayCardDisabledReason {
  code: PlayCardDisabledReasonCode;
  /**
   * Substitution values for the UI's i18n template. The set of keys depends
   * on `code`; see the comment above each code for the contract.
   */
  params?: Record<string, string | number>;
}
