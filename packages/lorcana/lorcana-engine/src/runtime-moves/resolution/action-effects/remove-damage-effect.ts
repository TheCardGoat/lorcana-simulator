import type { CardInstanceId } from "#core";
import type { CardPlayedPayload } from "../../../types/index";
import type { RemoveDamageEffect } from "@tcg/lorcana-types";
import type { PlayCardExecutionContext } from "./types";
import type { DynamicAmountEventSnapshot } from "../../../types/domain-events";

import { queueTriggeredEvent } from "../../../triggered-abilities";

type ResolvedRemoveDamageEffectInput = {
  targets: CardInstanceId[];
  amountByTarget?: Record<CardInstanceId, number>;
  selectedAmount?: number;
  eventSnapshot?: DynamicAmountEventSnapshot;
};

export function isRemoveDamageEffect(effect: unknown): effect is RemoveDamageEffect {
  return (
    typeof effect === "object" &&
    effect !== null &&
    "type" in effect &&
    (effect as { type?: unknown }).type === "remove-damage"
  );
}

export function resolveRemoveDamageEffect(
  ctx: PlayCardExecutionContext,
  cardPlayed: CardPlayedPayload,
  effect: RemoveDamageEffect,
  resolvedInput: ResolvedRemoveDamageEffectInput,
): void {
  const selectedAmount =
    typeof resolvedInput.selectedAmount === "number" &&
    Number.isFinite(resolvedInput.selectedAmount)
      ? Math.max(0, resolvedInput.selectedAmount)
      : undefined;

  let healedAmount = 0;
  for (const targetId of resolvedInput.targets) {
    const meta = ctx.cards.require(targetId).meta ?? {};
    const currentDamage = Number(meta.damage ?? 0);
    const resolvedAmount = resolvedInput.amountByTarget?.[targetId];
    const amountCap =
      typeof resolvedAmount === "number" && Number.isFinite(resolvedAmount)
        ? Math.max(0, resolvedAmount)
        : 0;
    const maxByEffect = Math.max(0, Math.min(amountCap, currentDamage));
    const requestedAmount = effect.upTo ? (selectedAmount ?? maxByEffect) : maxByEffect;
    const resolvedHealAmount = Math.max(0, Math.min(requestedAmount, maxByEffect, currentDamage));
    const nextDamage = Math.max(0, currentDamage - resolvedHealAmount);
    healedAmount += resolvedHealAmount;

    ctx.cards.patchMeta(targetId, {
      ...meta,
      damage: nextDamage,
    });

    if (resolvedHealAmount > 0) {
      queueTriggeredEvent(ctx, {
        event: "remove-damage",
        playerId: ctx.framework.state.currentPlayer,
        subjectCardId: targetId,
        triggerSourceCardId: cardPlayed.cardId,
        eventSnapshot: {
          healedAmount: resolvedHealAmount,
        },
      });
    }
  }

  if (resolvedInput.eventSnapshot) {
    resolvedInput.eventSnapshot.healedAmount = healedAmount;
  }
}
