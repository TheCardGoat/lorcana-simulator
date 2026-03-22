import type { CardInstanceId, PlayerId } from "#core";
import type { MoveDamageEffect } from "@tcg/lorcana-types";
import type { CardPlayedPayload } from "../../../types";
import type { ActionResolutionInput, PlayCardExecutionContext } from "./types";
import { resolveEffectTargets } from "../../../targeting/runtime";
import { applyReplacementEffects } from "../../effects/replacement-effects";
import { moveCardOutOfPlayWithStack } from "../../state/shift-stack";
import { getKeywordsBeforeBanish } from "../../shared/banish-snapshot";
import {
  emitTriggeredLorcanaEvent,
  snapshotTriggeredCandidatesForCard,
} from "../../effects/triggered-abilities";
import { recordBanishedCharacterThisTurn } from "../../state/turn-metrics";

export function isMoveDamageEffect(effect: unknown): effect is MoveDamageEffect {
  return (
    typeof effect === "object" &&
    effect !== null &&
    "type" in effect &&
    (effect as { type?: unknown }).type === "move-damage"
  );
}

function resolveEffectAmount(effect: MoveDamageEffect): number | undefined {
  if (effect.amount === undefined || effect.amount === "all") {
    return undefined;
  }

  if (typeof effect.amount !== "number" || !Number.isFinite(effect.amount) || effect.amount <= 0) {
    return undefined;
  }

  return Math.floor(effect.amount);
}

function getCardDamage(ctx: PlayCardExecutionContext, cardId: CardInstanceId): number {
  const damage = Number(ctx.cards.require(cardId).meta?.damage ?? 0);
  return Number.isFinite(damage) && damage > 0 ? Math.floor(damage) : 0;
}

function setCardDamage(
  ctx: PlayCardExecutionContext,
  cardId: CardInstanceId,
  damage: number,
): void {
  ctx.cards.patchMeta(cardId, { damage });
}

export function resolveMoveDamageEffect(
  ctx: PlayCardExecutionContext,
  cardPlayed: CardPlayedPayload,
  effect: MoveDamageEffect,
  resolutionInput: ActionResolutionInput,
): void {
  const destinationTargets =
    resolveEffectTargets(
      ctx,
      cardPlayed,
      effect.to ?? "chosen-for-effect",
      resolutionInput.targets,
    ) ?? [];
  const destinationId = destinationTargets[0];
  if (!destinationId) {
    return;
  }

  const sourceTargets =
    resolveEffectTargets(
      ctx,
      cardPlayed,
      effect.from ?? "ALL_CHARACTERS",
      resolutionInput.targets,
    ) ?? [];
  if (sourceTargets.length === 0) {
    return;
  }

  const effectAmount = resolveEffectAmount(effect);
  // Support "up to" semantics: if the player selected a specific amount,
  // use it (capped by the effect's maximum).
  const selectedAmount =
    typeof resolutionInput.amount === "number" &&
    Number.isFinite(resolutionInput.amount) &&
    resolutionInput.amount >= 0
      ? Math.floor(resolutionInput.amount)
      : undefined;
  const amount =
    selectedAmount !== undefined
      ? effectAmount !== undefined
        ? Math.min(selectedAmount, effectAmount)
        : selectedAmount
      : effectAmount;
  const distribution = effect.distribution ?? "from-each-source";
  const destinationDamage = getCardDamage(ctx, destinationId);
  let movedTotal = 0;

  if (amount !== undefined && distribution === "aggregate") {
    let remaining = amount;
    for (const sourceId of sourceTargets) {
      if (sourceId === destinationId || remaining <= 0) {
        continue;
      }

      const sourceDamage = getCardDamage(ctx, sourceId);
      if (sourceDamage <= 0) {
        continue;
      }

      const raw = Math.min(sourceDamage, remaining);
      const replacedEvent = applyReplacementEffects(ctx, {
        kind: "remove-damage",
        eventId: `move-damage-source:${cardPlayed.cardId}:${sourceId}`,
        sourceId: cardPlayed.cardId,
        controllerId: cardPlayed.playerId,
        targetId: sourceId,
        amount: raw,
      });
      const moved = replacedEvent.amount;
      if (moved > 0) {
        setCardDamage(ctx, sourceId, sourceDamage - moved);
        movedTotal += moved;
        remaining -= moved;
      }
    }
  } else {
    for (const sourceId of sourceTargets) {
      if (sourceId === destinationId) {
        continue;
      }

      const sourceDamage = getCardDamage(ctx, sourceId);
      if (sourceDamage <= 0) {
        continue;
      }

      const raw = amount === undefined ? sourceDamage : Math.min(sourceDamage, amount);
      const replacedEvent = applyReplacementEffects(ctx, {
        kind: "remove-damage",
        eventId: `move-damage-source:${cardPlayed.cardId}:${sourceId}`,
        sourceId: cardPlayed.cardId,
        controllerId: cardPlayed.playerId,
        targetId: sourceId,
        amount: raw,
      });
      const moved = replacedEvent.amount;
      if (moved > 0) {
        setCardDamage(ctx, sourceId, sourceDamage - moved);
        movedTotal += moved;
      }
    }
  }

  if (movedTotal > 0) {
    const newDamage = destinationDamage + movedTotal;
    setCardDamage(ctx, destinationId, newDamage);

    // Check for lethal damage on the destination and banish if needed
    const destDefinition = ctx.cards.getDefinition(destinationId) as
      | ({ willpower?: number; cardType?: string } & Record<string, unknown>)
      | undefined;
    const willpower = destDefinition?.willpower;
    if (typeof willpower === "number" && newDamage >= willpower) {
      const ownerId = ctx.framework.zones.getCardOwner(destinationId) as PlayerId | undefined;
      if (ownerId) {
        const keywordsBeforeBanish = getKeywordsBeforeBanish(
          ctx,
          destinationId,
          cardPlayed.playerId,
        );
        const triggerCandidates = snapshotTriggeredCandidatesForCard(ctx, destinationId);
        moveCardOutOfPlayWithStack(ctx, destinationId, {
          zone: "discard",
          playerId: ownerId,
        });
        emitTriggeredLorcanaEvent(
          ctx,
          "cardBanished",
          {
            cardId: destinationId,
            sourceId: cardPlayed.cardId,
            snapshot: { damageDealt: movedTotal, keywordsBeforeBanish },
            reason: "lethal damage",
          },
          {
            event: "banish",
            playerId: ownerId,
            subjectCardId: destinationId,
            triggerSourceCardId: destinationId,
            triggerCandidates,
            eventSnapshot: { keywordsBeforeBanish },
          },
        );
        recordBanishedCharacterThisTurn(ctx, destinationId);
      }
    }
  }

  if (resolutionInput.eventSnapshot) {
    resolutionInput.eventSnapshot.healedAmount = movedTotal;
  }
}
