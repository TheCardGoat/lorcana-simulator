import type { CardInstanceId } from "#core";
import { type CardPlayedPayload } from "../../../types";
import type { DealDamageEffect } from "@tcg/lorcana-types";
import type { DynamicAmountEventSnapshot } from "../../../types/domain-events";
import { projectLorcanaCardDerived } from "../../../projection/card-derived";
import { moveCardOutOfPlayWithStack } from "../../state/shift-stack";
import type { PlayCardExecutionContext } from "./types";
import { effectLogger } from "./effect-logger";
import { markLastEffectPerformed } from "./event-snapshot-utils";
import {
  recordBanishedCharacterThisTurn,
  recordDamagedCharacterThisTurn,
} from "../../state/turn-metrics";
import {
  emitTriggeredLorcanaEvent,
  snapshotTriggeredCandidatesForCard,
} from "../../effects/triggered-abilities";

type ResolvedDealDamageEffectInput = {
  eventSnapshot?: DynamicAmountEventSnapshot;
  targets: CardInstanceId[];
  amountByTarget?: Record<CardInstanceId, number>;
};

export function isDealDamageEffect(effect: unknown): effect is DealDamageEffect {
  return (
    typeof effect === "object" &&
    effect !== null &&
    "type" in effect &&
    (effect as { type?: unknown }).type === "deal-damage"
  );
}

function getResistValue(ctx: PlayCardExecutionContext, targetId: CardInstanceId): number {
  const runtimeCard = ctx.cards.require(targetId);
  const definition = runtimeCard.definition as { cardType?: string } | undefined;
  const cardType = definition?.cardType;
  if (cardType !== "character" && cardType !== "location") {
    return 0;
  }

  const derived = projectLorcanaCardDerived({
    definition: runtimeCard.definition,
    meta: runtimeCard.meta,
    state: {
      ctx: ctx.framework.state.ctx,
      G: ctx.G,
    },
    cardInstanceId: targetId,
    ownerID: runtimeCard.ownerID as import("#core").PlayerId | undefined,
    controllerID: runtimeCard.controllerID as import("#core").PlayerId | undefined,
    zoneID: runtimeCard.zoneID,
    getDefinitionByInstanceId: (cardId) => ctx.cards.getDefinition(cardId),
  });

  return Math.max(0, derived.keywordValues?.resist ?? 0);
}

type ApplyDamageOptions = {
  applyResist: boolean;
};

function applyDamage(
  ctx: PlayCardExecutionContext,
  cardPlayed: CardPlayedPayload,
  resolvedInput: ResolvedDealDamageEffectInput,
  options: ApplyDamageOptions,
): boolean {
  let changed = false;

  for (const targetId of resolvedInput.targets) {
    const resolvedAmount = resolvedInput.amountByTarget?.[targetId];
    const amount =
      typeof resolvedAmount === "number" && Number.isFinite(resolvedAmount)
        ? Math.max(0, resolvedAmount)
        : 0;

    if (amount <= 0) {
      effectLogger.warn(`Target ${targetId} has no damage to deal`);
      continue;
    }

    const meta = ctx.cards.require(targetId).meta ?? {};
    const currentDamage = Number(meta.damage ?? 0);
    const appliedDamage = options.applyResist
      ? Math.max(0, amount - getResistValue(ctx, targetId))
      : amount;
    if (appliedDamage <= 0) {
      effectLogger.warn(`Target ${targetId} took no damage after reduction`);
      continue;
    }

    const nextDamage = currentDamage + appliedDamage;

    ctx.cards.patchMeta(targetId, {
      ...meta,
      damage: nextDamage,
    });
    recordDamagedCharacterThisTurn(ctx, targetId);
    changed = true;

    const targetDefinition = ctx.cards.getDefinition(targetId) as
      | ({ willpower?: number } & Record<string, unknown>)
      | undefined;
    const willpower = targetDefinition?.willpower;
    if (typeof willpower === "number" && nextDamage >= willpower) {
      const subjectAtLocationId = meta.atLocationId as CardInstanceId | undefined;
      const ownerId = ctx.framework.state.ctx.zones.private.cardIndex[targetId]?.ownerID;

      if (!ownerId) {
        effectLogger.fatal(`Target card ${targetId} not found in card index`);
        continue;
      }

      const triggerCandidates = snapshotTriggeredCandidatesForCard(ctx, targetId);
      moveCardOutOfPlayWithStack(ctx, targetId, {
        zone: "discard",
        playerId: ownerId,
      });
      emitTriggeredLorcanaEvent(
        ctx,
        "cardBanished",
        {
          cardId: targetId,
          sourceId: cardPlayed.cardId,
          snapshot: { damageDealt: appliedDamage, subjectAtLocationId },
          reason: "lethal damage",
        },
        {
          event: "banish",
          playerId: ownerId,
          subjectCardId: targetId,
          triggerSourceCardId: targetId,
          triggerCandidates,
          eventSnapshot: {
            subjectAtLocationId,
          },
        },
      );
      recordBanishedCharacterThisTurn(ctx, targetId);
    }
  }

  return changed;
}

export function resolveDealDamageEffect(
  ctx: PlayCardExecutionContext,
  cardPlayed: CardPlayedPayload,
  _effect: DealDamageEffect,
  resolvedInput: ResolvedDealDamageEffectInput,
): void {
  const dealtAnyDamage = applyDamage(ctx, cardPlayed, resolvedInput, { applyResist: true });
  markLastEffectPerformed(resolvedInput.eventSnapshot, dealtAnyDamage);
}

export function resolvePutDamageLikeEffect(
  ctx: PlayCardExecutionContext,
  cardPlayed: CardPlayedPayload,
  resolvedInput: ResolvedDealDamageEffectInput,
): void {
  applyDamage(ctx, cardPlayed, resolvedInput, { applyResist: false });
}
