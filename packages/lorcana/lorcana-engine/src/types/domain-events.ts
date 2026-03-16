/**
 * Lorcana Domain Events
 *
 * Type-safe domain event definitions for the Lorcana engine.
 * Each event type maps to its payload structure.
 */

import type { EventAPI, GameEvent } from "#core";
import type { CardInstanceId, PlayerId } from "#core";
import type { Classification } from "@tcg/lorcana-types";

// =============================================================================
// Event Payload Interfaces
// =============================================================================

export interface DynamicAmountEventSnapshot {
  autoExertBodyguardOnNestedPlay?: boolean;
  lastEffectPerformed?: boolean;
  triggerBatchKey?: string;
  triggerAmount?: number;
  playedCardSingerCount?: number;
  playedCardUsedShift?: boolean;
  strengthBeforeBanish?: number;
  cardsUnderCountBeforeBanish?: number;
  classificationsBeforeBanish?: ReadonlyArray<Classification>;
  damageDealt?: number;
  healedAmount?: number;
  revealedCardIds?: ReadonlyArray<CardInstanceId>;
  revealWindowIds?: ReadonlyArray<string>;
  namedCardName?: string;
  chosenCardId?: CardInstanceId;
  chosenCardCost?: number;
  subjectCardId?: CardInstanceId;
  triggerSourceCardId?: CardInstanceId;
  attackerId?: CardInstanceId;
  defenderId?: CardInstanceId;
  subjectAtLocationId?: CardInstanceId;
  vanishChosenCards?: ReadonlyArray<{
    cardId: CardInstanceId;
    chooserId: PlayerId;
  }>;
}

export interface CardExertedPayload {
  cardId: CardInstanceId;
  source?: string;
  isManual?: boolean;
}

export interface CardReadiedPayload {
  cardId: CardInstanceId;
  isManual?: boolean;
}

export interface AllCardsReadiedPayload {
  playerId: PlayerId;
  count: number;
}

export type DamageDealtPayload =
  | {
      targetId: CardInstanceId;
      amount: number;
      newDamage: number;
      sourceId?: CardInstanceId;
      damageType: "combat" | "effect";
    }
  | {
      cardId: CardInstanceId;
      damage: number;
      isManual: true;
    };

export type CardMovedPayload =
  | {
      cardId: CardInstanceId;
      fromZone: string;
      toZone: string;
      playerId: PlayerId;
    }
  | {
      cardId: CardInstanceId;
      toZone: string;
      position: "top" | "bottom" | number | null;
      isManual: true;
    };

export interface CardBanishedPayload {
  cardId: CardInstanceId;
  sourceId: CardInstanceId | null;
  reason: string;
  snapshot?: DynamicAmountEventSnapshot;
}

export interface InkChangedPayload {
  playerId: PlayerId;
  operation: "add" | "remove" | "set";
  newTotal: number;
  amount: number;
  newAvailable: number;
}

export type LoreChangedPayload =
  | {
      playerId: PlayerId;
      operation: "add" | "remove" | "set";
      previousLore: number;
      source: string;
      amount: number;
      newLore: number;
    }
  | {
      playerId: PlayerId;
      oldLore: number;
      newLore: number;
      isManual: true;
    };

export interface QuestCompletedPayload {
  cardId: CardInstanceId;
  playerId: PlayerId;
  loreGained: number;
}

export interface CardsDrawnPayload {
  playerId: PlayerId;
  amount: number;
  cardIds?: CardInstanceId[];
}

export interface TurnPassedPayload {
  previousPlayer: PlayerId;
  newPlayer: PlayerId;
}

export interface CardPlayedPayload {
  playerId: PlayerId;
  cardId: CardInstanceId;
  cardType: "character" | "action" | "item" | "location";
  costType: "standard" | "shift" | "sing" | "singTogether" | "free";
  shiftTargetId?: CardInstanceId;
  singerIds?: CardInstanceId[];
  inkPaid?: number;
  usedShift?: boolean;
}

export interface QuestedPayload {
  playerId: PlayerId;
  cardId: CardInstanceId;
  loreGained: number;
}

export interface ChallengedPayload {
  attackerId: CardInstanceId;
  defenderId: CardInstanceId;
  attackerDamage: number;
  defenderDamage: number;
}

export interface FirstPlayerChosenPayload {
  chooser: PlayerId;
  chosen: PlayerId;
  playerId: PlayerId;
}

export interface HandAlteredPayload {
  playerId: PlayerId;
  cardsMulliganed: number;
  cardsDrawn: number;
}

export interface CardInkedPayload {
  playerId: PlayerId;
  cardId: CardInstanceId;
  from: string;
  to: string;
}

export interface DeckShuffledPayload {
  playerId: PlayerId;
  isManual: true;
}

export interface ZoneBottomShuffledPayload {
  zoneId: string;
  count: number;
}

export interface AbilityActivatedPayload {
  playerId: PlayerId;
  cardId: CardInstanceId;
  abilityName?: string;
  abilityIndex: number;
  inkPaid?: number;
}

// =============================================================================
// Event Map
// =============================================================================

/**
 * Lorcana Domain Event Map
 *
 * Maps event type names to their payload types.
 * Used for type-safe event emission via ctx.framework.events.emit().
 */
export interface LorcanaDomainEventMap {
  cardExerted: CardExertedPayload;
  cardReadied: CardReadiedPayload;
  allCardsReadied: AllCardsReadiedPayload;
  damageDealt: DamageDealtPayload;
  cardMoved: CardMovedPayload;
  cardBanished: CardBanishedPayload;
  inkChanged: InkChangedPayload;
  loreChanged: LoreChangedPayload;
  questCompleted: QuestCompletedPayload;
  cardsDrawn: CardsDrawnPayload;
  turnPassed: TurnPassedPayload;
  cardPlayed: CardPlayedPayload;
  quested: QuestedPayload;
  challenged: ChallengedPayload;
  firstPlayerChosen: FirstPlayerChosenPayload;
  handAltered: HandAlteredPayload;
  cardInked: CardInkedPayload;
  deckShuffled: DeckShuffledPayload;
  zoneBottomShuffled: ZoneBottomShuffledPayload;
  challengeCleared: Record<string, never>;
  abilityActivated: AbilityActivatedPayload;
}

/**
 * Typed custom game event for Lorcana
 */
type CustomGameEventFromMap<TEvents> = {
  [K in keyof TEvents & string]: {
    kind: "CUSTOM";
    customType: K;
    data: TEvents[K];
  };
}[keyof TEvents & string];

export type LorcanaDomainEvent = CustomGameEventFromMap<LorcanaDomainEventMap>;

export type LorcanaDomainEventType = keyof LorcanaDomainEventMap & string;

export type LorcanaDomainEventPayload<TType extends LorcanaDomainEventType> =
  LorcanaDomainEventMap[TType];

export function createLorcanaDomainEvent<TType extends LorcanaDomainEventType>(
  customType: TType,
  data: LorcanaDomainEventPayload<TType>,
): Extract<LorcanaDomainEvent, { customType: TType }> {
  return {
    kind: "CUSTOM",
    customType,
    data: data as unknown as Extract<LorcanaDomainEvent, { customType: TType }>["data"],
  } as unknown as Extract<LorcanaDomainEvent, { customType: TType }>;
}

export function emitLorcanaDomainEvent<TType extends LorcanaDomainEventType>(
  events: Pick<EventAPI, "emit">,
  customType: TType,
  data: LorcanaDomainEventPayload<TType>,
): void {
  events.emit(createLorcanaDomainEvent(customType, data) as unknown as GameEvent);
}
