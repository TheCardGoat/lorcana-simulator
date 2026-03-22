import type { CardInstanceId, PlayerId } from "#core";
import { type CardPlayedPayload } from "../../../types";
import type { DealDamageEffect } from "@tcg/lorcana-types";
import type { DynamicAmountEventSnapshot } from "../../../types/domain-events";
import { projectLorcanaCardDerived } from "../../../projection/card-derived";
import { createProjectionState } from "../../../rules/derived-state";
import { moveCardOutOfPlayWithStack, getCharacterIdsAtLocation } from "../../state/shift-stack";
import type { PlayCardExecutionContext } from "./types";
import { effectLogger } from "./effect-logger";
import { markLastEffectPerformed } from "./event-snapshot-utils";
import {
  recordBanishedCharacterThisTurn,
  recordDamagedCharacterThisTurn,
} from "../../state/turn-metrics";
import { hasStaticCardRestriction } from "../../rules/static-ability-utils";
import { getKeywordsBeforeBanish } from "../../shared/banish-snapshot";
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
    state: createProjectionState(ctx.framework.state, ctx.G),
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
  checkDamageRestriction?: boolean;
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

    // Check for "cant-be-dealt-damage" static restriction (only for dealt damage, not put damage)
    if (options.checkDamageRestriction) {
      const hasDamageRestriction = hasStaticCardRestriction({
        state: ctx.framework.state as Parameters<typeof hasStaticCardRestriction>[0]["state"],
        cardId: targetId,
        restriction: "cant-be-dealt-damage",
        getDefinitionByInstanceId: (cardId) => ctx.cards.getDefinition(cardId),
      });
      if (hasDamageRestriction) {
        continue;
      }
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

    // Emit "damage" trigger event so "whenever this character takes damage" abilities fire.
    // The eventSnapshot.triggerAmount carries the damage dealt for use with { type: "trigger-amount" }.
    emitTriggeredLorcanaEvent(
      ctx,
      "damageDealt",
      {
        targetId,
        amount: appliedDamage,
        newDamage: nextDamage,
        sourceId: cardPlayed.cardId,
        damageType: "effect",
      },
      {
        event: "damage",
        subjectCardId: targetId,
        triggerSourceCardId: cardPlayed.cardId,
        playerId: ctx.framework.zones.getCardOwner(targetId) as PlayerId | undefined,
        eventSnapshot: {
          triggerAmount: appliedDamage,
          damageDealt: appliedDamage,
        },
      },
    );

    const targetDefinition = ctx.cards.getDefinition(targetId) as
      | ({ willpower?: number } & Record<string, unknown>)
      | undefined;
    const willpower = targetDefinition?.willpower;
    if (typeof willpower === "number" && nextDamage >= willpower) {
      const subjectAtLocationId = meta.atLocationId as CardInstanceId | undefined;
      const ownerId = ctx.framework.zones.getCardOwner(targetId) as PlayerId | undefined;
      const keywordsBeforeBanish = getKeywordsBeforeBanish(ctx, targetId, cardPlayed.playerId);

      if (!ownerId) {
        effectLogger.fatal(`Target card ${targetId} not found in card index`);
        continue;
      }

      const triggerCandidates = snapshotTriggeredCandidatesForCard(ctx, targetId);
      const charsAtLocation =
        targetDefinition?.cardType === "location"
          ? getCharacterIdsAtLocation(ctx, targetId)
          : undefined;
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
          snapshot: {
            damageDealt: appliedDamage,
            keywordsBeforeBanish,
            subjectAtLocationId,
          },
          reason: "lethal damage",
        },
        {
          event: "banish",
          playerId: ownerId,
          subjectCardId: targetId,
          triggerSourceCardId: targetId,
          triggerCandidates,
          eventSnapshot: {
            keywordsBeforeBanish,
            subjectAtLocationId,
            charactersAtSourceLocationBeforeBanish: charsAtLocation,
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
  const dealtAnyDamage = applyDamage(ctx, cardPlayed, resolvedInput, {
    applyResist: true,
    checkDamageRestriction: true,
  });
  markLastEffectPerformed(resolvedInput.eventSnapshot, dealtAnyDamage);
}

export function resolvePutDamageLikeEffect(
  ctx: PlayCardExecutionContext,
  cardPlayed: CardPlayedPayload,
  resolvedInput: ResolvedDealDamageEffectInput,
): void {
  applyDamage(ctx, cardPlayed, resolvedInput, { applyResist: false });
}
