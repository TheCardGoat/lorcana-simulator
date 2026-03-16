import type { CardInstanceId, PlayerId } from "#core";
import type { MoveCardsFromUnderEffect } from "@tcg/lorcana-types";
import type { CardPlayedPayload } from "../../../types";
import type { LorcanaCardMeta } from "../../../types";
import type { ActionResolutionInput, PlayCardExecutionContext } from "./types";
import {
  normalizeSelectedTargets,
  resolveCardParentId,
  resolveEffectTargets,
} from "../../../targeting/runtime";

export function isMoveCardsFromUnderEffect(effect: unknown): effect is MoveCardsFromUnderEffect {
  return (
    typeof effect === "object" &&
    effect !== null &&
    "type" in effect &&
    (effect as { type?: unknown }).type === "move-cards-from-under"
  );
}

function shuffleCards<T>(cards: T[]): T[] {
  const shuffled = [...cards];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    const current = shuffled[index]!;
    shuffled[index] = shuffled[swapIndex]!;
    shuffled[swapIndex] = current;
  }
  return shuffled;
}

function removeUnderCardFromParent(
  ctx: PlayCardExecutionContext,
  parentId: CardInstanceId,
  childId: CardInstanceId,
): void {
  const parentMeta = (ctx.cards.require(parentId).meta ?? {}) as LorcanaCardMeta;
  const cardsUnder = Array.isArray(parentMeta.cardsUnder)
    ? parentMeta.cardsUnder.filter((cardId) => cardId !== childId)
    : [];

  ctx.cards.patchMeta(parentId, {
    cardsUnder: cardsUnder.length > 0 ? cardsUnder : undefined,
  });
}

function moveUnderCard(
  ctx: PlayCardExecutionContext,
  cardId: CardInstanceId,
  destination: NonNullable<MoveCardsFromUnderEffect["destination"]>,
): void {
  const ownerId =
    (ctx.framework.state.ctx.zones.private.cardIndex[cardId]?.ownerID as PlayerId | undefined) ??
    undefined;
  if (!ownerId) {
    return;
  }

  switch (destination) {
    case "inkwell-facedown-exerted":
      ctx.framework.zones.moveCard(cardId, {
        zone: "inkwell",
        playerId: ownerId,
      });
      ctx.cards.patchMeta(cardId, {
        stackParentId: undefined,
        state: "exerted",
        publicFaceState: "faceDown",
      });
      return;
    case "hand":
      ctx.framework.zones.moveCard(cardId, {
        zone: "hand",
        playerId: ownerId,
      });
      ctx.cards.patchMeta(cardId, {
        stackParentId: undefined,
        state: undefined,
        publicFaceState: undefined,
      });
      return;
    case "deck-bottom-random":
    default:
      ctx.framework.zones.moveCard(
        cardId,
        {
          zone: "deck",
          playerId: ownerId,
        },
        {
          index: 0,
        },
      );
      ctx.cards.patchMeta(cardId, {
        stackParentId: undefined,
        state: undefined,
        publicFaceState: undefined,
      });
  }
}

function resolveSourceCardIds(
  ctx: PlayCardExecutionContext,
  cardPlayed: CardPlayedPayload,
  effect: MoveCardsFromUnderEffect,
  resolutionInput: ActionResolutionInput,
): CardInstanceId[] {
  if (effect.source === "selected") {
    return (
      normalizeSelectedTargets(resolutionInput.targets) ??
      resolveEffectTargets(ctx, cardPlayed, effect.target, resolutionInput.targets) ??
      []
    );
  }

  const parentIds =
    resolveEffectTargets(ctx, cardPlayed, effect.target, resolutionInput.targets) ?? [];
  return parentIds.flatMap((parentId) => {
    const parentMeta = ctx.cards.require(parentId).meta;
    return Array.isArray(parentMeta?.cardsUnder) ? [...parentMeta.cardsUnder] : [];
  });
}

export function resolveMoveCardsFromUnderEffect(
  ctx: PlayCardExecutionContext,
  cardPlayed: CardPlayedPayload,
  effect: MoveCardsFromUnderEffect,
  resolutionInput: ActionResolutionInput,
): void {
  const destination = effect.destination ?? "deck-bottom-random";
  const sourceCardIds = resolveSourceCardIds(ctx, cardPlayed, effect, resolutionInput);
  const uniqueSourceCardIds = [...new Set(sourceCardIds)];
  const cardsToMove =
    destination === "deck-bottom-random" ? shuffleCards(uniqueSourceCardIds) : uniqueSourceCardIds;

  for (const cardId of cardsToMove) {
    const parentId = resolveCardParentId(ctx, cardId);
    if (!parentId) {
      continue;
    }

    removeUnderCardFromParent(ctx, parentId, cardId);
    moveUnderCard(ctx, cardId, destination);
  }
}
