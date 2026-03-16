import type { CardInstanceId, PlayerId } from "#core";
import type { PutUnderEffect } from "@tcg/lorcana-types";
import type { CardPlayedPayload } from "../../../types";
import type { LorcanaCardMeta } from "../../../types";
import type { ActionResolutionInput, PlayCardExecutionContext } from "./types";
import { resolveEffectTargets } from "../../../targeting/runtime";

export function isPutUnderEffect(effect: unknown): effect is PutUnderEffect {
  return (
    typeof effect === "object" &&
    effect !== null &&
    "type" in effect &&
    (effect as { type?: unknown }).type === "put-under"
  );
}

function removeUnderCardFromPreviousParent(
  ctx: PlayCardExecutionContext,
  cardId: CardInstanceId,
): void {
  const previousParentId = ctx.cards.require(cardId).meta?.stackParentId as
    | CardInstanceId
    | undefined;
  if (!previousParentId) {
    return;
  }

  const previousParentMeta = (ctx.cards.require(previousParentId).meta ?? {}) as LorcanaCardMeta;
  const previousCardsUnder = Array.isArray(previousParentMeta.cardsUnder)
    ? previousParentMeta.cardsUnder.filter((underCardId) => underCardId !== cardId)
    : [];

  ctx.cards.patchMeta(previousParentId, {
    cardsUnder: previousCardsUnder.length > 0 ? previousCardsUnder : undefined,
  });
}

function appendCardUnderParent(
  ctx: PlayCardExecutionContext,
  parentId: CardInstanceId,
  childId: CardInstanceId,
): void {
  const parentMeta = (ctx.cards.require(parentId).meta ?? {}) as LorcanaCardMeta;
  const cardsUnder = Array.isArray(parentMeta.cardsUnder) ? [...parentMeta.cardsUnder] : [];
  if (!cardsUnder.includes(childId)) {
    cardsUnder.push(childId);
  }

  ctx.cards.patchMeta(parentId, {
    cardsUnder,
  });
}

function moveTopDeckCardUnderTarget(
  ctx: PlayCardExecutionContext,
  ownerId: PlayerId,
  targetId: CardInstanceId,
): boolean {
  const deckCards = ctx.framework.zones.getCards({
    zone: "deck",
    playerId: ownerId,
  }) as CardInstanceId[];
  const topDeckCardId = deckCards.at(-1);
  if (!topDeckCardId) {
    return false;
  }

  removeUnderCardFromPreviousParent(ctx, topDeckCardId);
  ctx.framework.zones.moveCard(topDeckCardId, {
    zone: "limbo",
    playerId: ownerId,
  });
  appendCardUnderParent(ctx, targetId, topDeckCardId);
  ctx.cards.patchMeta(topDeckCardId, {
    stackParentId: targetId,
    cardsUnder: undefined,
    state: undefined,
    damage: undefined,
    isDrying: undefined,
    publicFaceState: undefined,
    atLocationId: undefined,
    playedViaShift: undefined,
    playedCostType: undefined,
  });

  return true;
}

export function resolvePutUnderEffect(
  ctx: PlayCardExecutionContext,
  cardPlayed: CardPlayedPayload,
  effect: PutUnderEffect,
  resolutionInput: ActionResolutionInput,
): void {
  const underTarget =
    effect.under === "self"
      ? [cardPlayed.cardId]
      : (resolveEffectTargets(ctx, cardPlayed, effect.under, resolutionInput.targets) ?? []);

  const targetId = underTarget[0];
  if (!targetId) {
    return;
  }

  const ownerId =
    (ctx.framework.state.ctx.zones.private.cardIndex[targetId]?.ownerID as PlayerId | undefined) ??
    cardPlayed.playerId;
  if (!ownerId) {
    return;
  }

  if (effect.source === "top-of-deck") {
    moveTopDeckCardUnderTarget(ctx, ownerId, targetId);
  }
}
