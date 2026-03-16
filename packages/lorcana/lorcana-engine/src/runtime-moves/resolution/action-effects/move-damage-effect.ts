import type { CardInstanceId } from "#core";
import type { MoveDamageEffect } from "@tcg/lorcana-types";
import type { CardPlayedPayload } from "../../../types";
import type { ActionResolutionInput, PlayCardExecutionContext } from "./types";
import { resolveEffectTargets } from "../../../targeting/runtime";

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

  const amount = resolveEffectAmount(effect);
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

      const moved = Math.min(sourceDamage, remaining);
      setCardDamage(ctx, sourceId, sourceDamage - moved);
      movedTotal += moved;
      remaining -= moved;
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

      const moved = amount === undefined ? sourceDamage : Math.min(sourceDamage, amount);
      setCardDamage(ctx, sourceId, sourceDamage - moved);
      movedTotal += moved;
    }
  }

  if (movedTotal > 0) {
    setCardDamage(ctx, destinationId, destinationDamage + movedTotal);
  }

  if (resolutionInput.eventSnapshot) {
    resolutionInput.eventSnapshot.healedAmount = movedTotal;
  }
}
