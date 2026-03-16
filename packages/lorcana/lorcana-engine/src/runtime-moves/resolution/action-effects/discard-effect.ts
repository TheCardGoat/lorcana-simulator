import type { CardInstanceId, PlayerId } from "#core";
import type { CardSelectionFilter, DiscardEffect } from "@tcg/lorcana-types";
import type { CardPlayedPayload } from "../../../types";
import { queueTriggeredEvent } from "../../effects/triggered-abilities";
import { resolveTargetPlayerIds } from "./player-target-resolver";
import { createPendingActionEffect, enqueuePendingActionEffect } from "./pending-action-effects";
import { markLastEffectPerformed } from "./event-snapshot-utils";
import type {
  ActionEffectResolutionOptions,
  ActionResolutionInput,
  ActionResolutionResult,
  PlayCardExecutionContext,
} from "./types";

type ResolvedDiscardEffectInput = {
  discardAmount?: number;
  discardAll?: boolean;
  selectedTargets?: CardInstanceId[];
};

type CardDefinitionLike = {
  cardType?: string;
  classifications?: string[];
  cost?: number;
};

export function isDiscardEffect(effect: unknown): effect is DiscardEffect {
  return (
    typeof effect === "object" &&
    effect !== null &&
    "type" in effect &&
    (effect as { type?: unknown }).type === "discard"
  );
}

function matchesDiscardFilter(
  ctx: PlayCardExecutionContext,
  cardId: CardInstanceId,
  effect: DiscardEffect,
): boolean {
  const rawFilter = effect.filter;
  const filter =
    rawFilter &&
    !Array.isArray(rawFilter) &&
    !("type" in rawFilter && typeof rawFilter.type === "string")
      ? (rawFilter as CardSelectionFilter)
      : undefined;
  if (!filter) {
    return true;
  }

  const definition = ctx.cards.getDefinition(cardId) as CardDefinitionLike | undefined;
  if (!definition) {
    return false;
  }

  if (typeof filter.cardType === "string" && definition.cardType !== filter.cardType) {
    return false;
  }

  if (typeof filter.notCardType === "string" && definition.cardType === filter.notCardType) {
    return false;
  }

  if (typeof filter.maxCost === "number") {
    const cost = Number(definition.cost ?? 0);
    if (!Number.isFinite(cost) || cost > filter.maxCost) {
      return false;
    }
  }

  if (typeof filter.classification === "string") {
    const classifications = definition.classifications ?? [];
    if (!classifications.includes(filter.classification)) {
      return false;
    }
  }

  return true;
}

function pickRandomCards<T>(
  ctx: PlayCardExecutionContext,
  cards: readonly T[],
  count: number,
): T[] {
  return ctx.framework.random.shuffle([...cards]).slice(0, count);
}

export function resolveDiscardEffect(
  ctx: PlayCardExecutionContext,
  cardPlayed: CardPlayedPayload,
  effect: DiscardEffect,
  resolutionInput: ActionResolutionInput,
  resolvedInput: ResolvedDiscardEffectInput,
  options?: ActionEffectResolutionOptions,
): ActionResolutionResult {
  const selectedTargets =
    resolvedInput.selectedTargets ??
    (Array.isArray(resolutionInput.targets)
      ? resolutionInput.targets.filter(
          (targetId): targetId is CardInstanceId => typeof targetId === "string",
        )
      : typeof resolutionInput.targets === "string"
        ? [resolutionInput.targets as CardInstanceId]
        : []);
  const targetPlayerIds =
    effect.target === "CARD_OWNER"
      ? [
          ...new Set(
            selectedTargets
              .map(
                (cardId) =>
                  ctx.framework.state.ctx.zones.private.cardIndex[cardId]?.ownerID as
                    | string
                    | undefined,
              )
              .filter(
                (playerId): playerId is string =>
                  typeof playerId === "string" &&
                  ctx.framework.state.playerIds.includes(
                    playerId as (typeof ctx.framework.state.playerIds)[number],
                  ),
              ),
          ),
        ]
      : resolveTargetPlayerIds(ctx, cardPlayed, effect.target, resolutionInput.targets);

  const discardAll = resolvedInput.discardAll === true;
  const amount = discardAll
    ? Number.POSITIVE_INFINITY
    : typeof resolvedInput.discardAmount === "number" &&
        Number.isFinite(resolvedInput.discardAmount) &&
        resolvedInput.discardAmount >= 0
      ? Math.floor(resolvedInput.discardAmount)
      : 1;

  if (targetPlayerIds.length === 0 || amount <= 0) {
    return { status: "resolved" };
  }

  const sourceZone = effect.from ?? "hand";
  const actorId = (ctx.playerId ??
    ctx.framework.state.currentPlayer ??
    ctx.framework.state.ctx.priority.holder) as PlayerId | undefined;

  for (const targetPlayerId of targetPlayerIds) {
    const candidates = (
      ctx.framework.zones.getCards({
        zone: sourceZone,
        playerId: targetPlayerId,
      }) as CardInstanceId[]
    ).filter(
      (cardId) =>
        !(
          sourceZone === "hand" &&
          cardId === cardPlayed.cardId &&
          targetPlayerId === cardPlayed.playerId
        ) && matchesDiscardFilter(ctx, cardId, effect),
    );
    if (candidates.length === 0) {
      continue;
    }

    const effectiveAmount = discardAll ? candidates.length : Math.min(amount, candidates.length);
    const candidateSet = new Set<CardInstanceId>(candidates);
    const selectedFromCandidates = selectedTargets.filter((cardId) => candidateSet.has(cardId));
    const chooserId =
      effect.chosenBy === "you"
        ? cardPlayed.playerId
        : effect.chosenBy === "opponent"
          ? ((ctx.framework.state.playerIds.find((playerId) => playerId !== cardPlayed.playerId) ??
              targetPlayerId) as PlayerId)
          : targetPlayerId;
    const requiresExplicitSelection =
      effect.chosen === true &&
      (actorId !== chooserId || selectedFromCandidates.length < effectiveAmount);
    if (requiresExplicitSelection) {
      const pendingEffect = createPendingActionEffect(ctx, {
        kind: "discard-choice",
        sourceCardId: cardPlayed.cardId,
        controllerId: cardPlayed.playerId,
        chooserId: chooserId as PlayerId,
        cardPlayed,
        effect,
        continuation: options?.continuation,
        resolutionInput,
      });
      enqueuePendingActionEffect(ctx, pendingEffect);
      return {
        status: "suspended",
        pendingEffect,
      };
    }

    const cardsToDiscard =
      effect.random === true && effect.chosen !== true
        ? pickRandomCards(ctx, candidates, effectiveAmount)
        : selectedFromCandidates.length > 0
          ? selectedFromCandidates.slice(0, effectiveAmount)
          : candidates.slice(0, effectiveAmount);

    for (const cardId of cardsToDiscard) {
      ctx.framework.zones.moveCard(cardId, {
        zone: "discard",
        playerId: targetPlayerId,
      });
    }

    if (cardsToDiscard.length > 0) {
      markLastEffectPerformed(resolutionInput.eventSnapshot, true);
      const triggerBatchKey = cardsToDiscard.join("|");
      for (const cardId of cardsToDiscard) {
        queueTriggeredEvent(ctx, {
          event: "discard",
          playerId: targetPlayerId as PlayerId,
          subjectCardId: cardId,
          triggerSourceCardId: cardId,
          eventSnapshot: {
            triggerBatchKey,
            triggerAmount: cardsToDiscard.length,
          },
        });
      }
    }
  }

  return { status: "resolved" };
}
