/**
 * MoveOutcomeAccumulator
 *
 * Collects structured MoveOutcomes from domain events during move execution.
 * Ports the event-mapping logic from lorcana-log-projector.ts but produces
 * a single MoveOutcomes object instead of separate log entries.
 */

import type { CardInstanceId, LogProjectionContext, PlayerId, PublishedGameEvent } from "#core";
import { privateField } from "../core/runtime/private-field";
import type { DamageEntry, MoveOutcomes } from "../types/move-log";
import type {
  CardBanishedPayload,
  CardExertedPayload,
  CardReadiedPayload,
  CardReturnedToHandPayload,
  CardsDrawnPayload,
  LoreChangedPayload,
} from "../types/domain-events";

function findCardOwner(state: LogProjectionContext["state"], cardId: string): PlayerId | undefined {
  const cardIndex = state.ctx?.zones?.private?.cardIndex;
  if (!cardIndex) return undefined;

  const entry = cardIndex[cardId as CardInstanceId];
  return entry?.ownerID as PlayerId | undefined;
}

export class MoveOutcomeAccumulator {
  private damageDealt: DamageEntry[] = [];
  private cardsBanished: CardInstanceId[] = [];
  private cardsDrawnAmount = 0;
  private cardsDrawnDetail: CardInstanceId[] = [];
  private cardsDrawnPlayerId: PlayerId | null = null;
  private loreChanges: MoveOutcomes["loreChanged"][] = [];
  private cardsExerted: CardInstanceId[] = [];
  private cardsReadied: CardInstanceId[] = [];
  private cardsMilled: { playerId: PlayerId; amount: number; cardIds: CardInstanceId[] } | null =
    null;
  private cardsReturnedToHand: CardInstanceId[] = [];

  accumulate(event: PublishedGameEvent, context: LogProjectionContext): void {
    const gameEvent = event.event;

    if (gameEvent.kind === "DAMAGE_DEALT") {
      this.accumulateDamageDealt(gameEvent);
      return;
    }

    if (gameEvent.kind === "CARDS_MILLED") {
      this.accumulateCardsMilled(gameEvent);
      return;
    }

    if (gameEvent.kind !== "CUSTOM") return;

    switch (gameEvent.customType) {
      case "challenged":
        this.accumulateChallenged(
          gameEvent.data as {
            attackerId: string;
            defenderId: string;
            attackerDamage: number;
            defenderDamage: number;
          },
        );
        break;
      case "cardBanished":
        this.accumulateCardBanished(gameEvent.data as CardBanishedPayload);
        break;
      case "cardsDrawn":
        this.accumulateCardsDrawn(gameEvent.data as CardsDrawnPayload);
        break;
      case "cardReturnedToHand":
        this.accumulateCardReturnedToHand(gameEvent.data as CardReturnedToHandPayload);
        break;
      case "loreChanged":
        this.accumulateLoreChanged(gameEvent.data as LoreChangedPayload);
        break;
      case "cardExerted":
        this.accumulateCardExerted(gameEvent.data as CardExertedPayload, context);
        break;
      case "cardReadied":
        this.accumulateCardReadied(gameEvent.data as CardReadiedPayload, context);
        break;
    }
  }

  flush(): MoveOutcomes | undefined {
    const outcomes: MoveOutcomes = {};
    let hasAny = false;

    if (this.damageDealt.length > 0) {
      outcomes.damageDealt = [...this.damageDealt];
      hasAny = true;
    }

    if (this.cardsBanished.length > 0) {
      outcomes.cardsBanished = [...this.cardsBanished];
      hasAny = true;
    }

    if (this.cardsDrawnAmount > 0) {
      outcomes.cardsDrawn = {
        amount: this.cardsDrawnAmount,
        ...(this.cardsDrawnDetail.length > 0 &&
          this.cardsDrawnPlayerId && {
            detail: privateField([...this.cardsDrawnDetail], [this.cardsDrawnPlayerId]),
          }),
      };
      hasAny = true;
    }

    // Use the last lore change (most recent). Multiple lore changes in a single
    // move are rare; when they occur the last one represents the final state.
    for (let i = this.loreChanges.length - 1; i >= 0; i--) {
      if (this.loreChanges[i]) {
        outcomes.loreChanged = this.loreChanges[i];
        hasAny = true;
        break;
      }
    }

    if (this.cardsExerted.length > 0) {
      outcomes.cardsExerted = [...this.cardsExerted];
      hasAny = true;
    }

    if (this.cardsReadied.length > 0) {
      outcomes.cardsReadied = [...this.cardsReadied];
      hasAny = true;
    }

    if (this.cardsMilled) {
      outcomes.cardsMilled = {
        playerId: this.cardsMilled.playerId,
        amount: this.cardsMilled.amount,
        ...(this.cardsMilled.cardIds.length > 0 && {
          cardIds: privateField([...this.cardsMilled.cardIds], [this.cardsMilled.playerId]),
        }),
      };
      hasAny = true;
    }

    if (this.cardsReturnedToHand.length > 0) {
      outcomes.cardsReturnedToHand = [...this.cardsReturnedToHand];
      hasAny = true;
    }

    this.reset();
    return hasAny ? outcomes : undefined;
  }

  private reset(): void {
    this.damageDealt = [];
    this.cardsBanished = [];
    this.cardsDrawnAmount = 0;
    this.cardsDrawnDetail = [];
    this.cardsDrawnPlayerId = null;
    this.loreChanges = [];
    this.cardsExerted = [];
    this.cardsReadied = [];
    this.cardsMilled = null;
    this.cardsReturnedToHand = [];
  }

  // ── Event handlers ────────────────────────────────────────────

  private accumulateChallenged(data: {
    attackerId: string;
    defenderId: string;
    attackerDamage: number;
    defenderDamage: number;
  }): void {
    this.damageDealt.push(
      {
        sourceId: data.attackerId as CardInstanceId,
        targetId: data.defenderId as CardInstanceId,
        amount: data.attackerDamage,
        kind: "combat",
      },
      {
        sourceId: data.defenderId as CardInstanceId,
        targetId: data.attackerId as CardInstanceId,
        amount: data.defenderDamage,
        kind: "combat",
      },
    );
  }

  private accumulateDamageDealt(gameEvent: {
    kind: "DAMAGE_DEALT";
    sourceCardId?: string;
    targetCardId?: string;
    amount: number;
    damageKind: "combat" | "effect" | "loss_of_life";
  }): void {
    // Skip combat damage — already covered by the challenged domain event
    if (gameEvent.damageKind === "combat") return;
    if (!gameEvent.sourceCardId || !gameEvent.targetCardId) return;
    if (gameEvent.amount <= 0) return;

    this.damageDealt.push({
      sourceId: gameEvent.sourceCardId as CardInstanceId,
      targetId: gameEvent.targetCardId as CardInstanceId,
      amount: gameEvent.amount,
      kind: "effect",
    });
  }

  private accumulateCardBanished(data: CardBanishedPayload): void {
    this.cardsBanished.push(data.cardId as CardInstanceId);
  }

  private accumulateCardsDrawn(data: CardsDrawnPayload): void {
    // Skip manual/debug draws
    if ("isManual" in data && (data as { isManual?: boolean }).isManual) return;

    this.cardsDrawnAmount += data.amount;
    this.cardsDrawnPlayerId = data.playerId;

    if (data.cardIds && data.cardIds.length > 0) {
      this.cardsDrawnDetail.push(...data.cardIds);
    }
  }

  private accumulateCardReturnedToHand(data: CardReturnedToHandPayload): void {
    this.cardsReturnedToHand.push(data.cardId as CardInstanceId);
  }

  private accumulateLoreChanged(data: LoreChangedPayload): void {
    // Skip manual/debug lore changes
    if ("isManual" in data && (data as { isManual?: boolean }).isManual) return;
    // Skip quest-sourced lore changes (already in the quest move log)
    if ("source" in data && (data as { source?: string }).source === "quest") return;

    const typedData = data as {
      playerId: PlayerId;
      operation: "add" | "remove" | "set";
      amount: number;
    };

    if (typedData.operation === "add" && typedData.amount > 0) {
      this.loreChanges.push({
        playerId: typedData.playerId,
        amount: typedData.amount,
        operation: "add",
      });
    } else if (typedData.operation === "remove" && typedData.amount > 0) {
      this.loreChanges.push({
        playerId: typedData.playerId,
        amount: typedData.amount,
        operation: "remove",
      });
    }
  }

  private accumulateCardExerted(data: CardExertedPayload, context: LogProjectionContext): void {
    if (data.isManual) return;
    if (data.source === "quest" || data.source === "challenge") return;

    const cardId = data.cardId as CardInstanceId;
    this.cardsExerted.push(cardId);
  }

  private accumulateCardReadied(data: CardReadiedPayload, context: LogProjectionContext): void {
    if (data.isManual) return;

    const cardId = data.cardId as CardInstanceId;
    this.cardsReadied.push(cardId);
  }

  private accumulateCardsMilled(gameEvent: {
    kind: "CARDS_MILLED";
    cardIds: string[];
    playerId?: string;
  }): void {
    if (!gameEvent.playerId) return;

    this.cardsMilled = {
      playerId: gameEvent.playerId as PlayerId,
      amount: gameEvent.cardIds.length,
      cardIds: gameEvent.cardIds as CardInstanceId[],
    };
  }
}
