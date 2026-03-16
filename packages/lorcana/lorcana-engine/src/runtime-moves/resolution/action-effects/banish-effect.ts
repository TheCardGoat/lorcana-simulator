import type { CardInstanceId } from "#core";
import { isClassification, type BanishEffect } from "@tcg/lorcana-types";
import type { PlayerId } from "#core";
import { moveCardOutOfPlayWithStack } from "../../state/shift-stack";
import { type CardPlayedPayload } from "../../../types";
import type { DynamicAmountEventSnapshot } from "../../../types/domain-events";
import type { PlayCardExecutionContext } from "./types";
import { effectLogger } from "./effect-logger";
import { markLastEffectPerformed } from "./event-snapshot-utils";
import { recordBanishedCharacterThisTurn } from "../../state/turn-metrics";
import {
  emitTriggeredLorcanaEvent,
  snapshotTriggeredCandidatesForCard,
} from "../../effects/triggered-abilities";
import { getEffectiveStrength, type DerivedStateContext } from "../../../rules/derived-state";
import { projectLorcanaCardDerived } from "../../../projection/card-derived";

type ResolvedBanishEffectInput = {
  eventSnapshot?: DynamicAmountEventSnapshot;
  targets: CardInstanceId[];
};

export function isBanishEffect(effect: unknown): effect is BanishEffect {
  return (
    typeof effect === "object" &&
    effect !== null &&
    "type" in effect &&
    (effect as { type?: unknown }).type === "banish"
  );
}

export function resolveBanishEffect(
  ctx: PlayCardExecutionContext,
  cardPlayed: CardPlayedPayload,
  _effect: BanishEffect,
  resolvedInput: ResolvedBanishEffectInput,
): void {
  const derivedState = {
    ...ctx.framework.state,
    G: ctx.G,
  } as DerivedStateContext;
  let banishedAny = false;
  let banishedCount = 0;

  for (const targetId of resolvedInput.targets) {
    const ownerId = ctx.framework.state.ctx.zones.private.cardIndex[targetId]?.ownerID;
    if (!ownerId) {
      effectLogger.fatal(`Target card ${targetId} not found in card index`);
      continue;
    }

    const targetMeta = ctx.cards.require(targetId).meta ?? {};
    const cardsUnderCountBeforeBanish = Array.isArray(targetMeta.cardsUnder)
      ? targetMeta.cardsUnder.length
      : 0;
    const subjectAtLocationId = targetMeta.atLocationId as CardInstanceId | undefined;
    const targetDefinition = ctx.cards.getDefinition(targetId);
    const targetCost =
      typeof targetDefinition?.cost === "number" && Number.isFinite(targetDefinition.cost)
        ? targetDefinition.cost
        : undefined;
    const projected = targetDefinition
      ? projectLorcanaCardDerived({
          definition: targetDefinition,
          meta: targetMeta,
          state: derivedState,
          cardInstanceId: targetId,
          ownerID: ownerId,
          controllerID: ((ctx.framework.state.ctx.zones.private.cardIndex[targetId]?.controllerID as
            | PlayerId
            | undefined) ?? ownerId) as PlayerId,
          zoneID: ctx.framework.state.ctx.zones.private.cardIndex[targetId]?.zoneKey,
          actorPlayerId: cardPlayed.playerId,
          getDefinitionByInstanceId: (id) => ctx.cards.getDefinition(id),
        })
      : undefined;
    const classificationsBeforeBanish = projected?.classifications?.filter(isClassification);
    const strengthBeforeBanish =
      targetDefinition?.cardType === "character"
        ? getEffectiveStrength(
            targetDefinition as any,
            derivedState,
            targetId,
            (id) => ctx.cards.getDefinition(id) as any,
          )
        : undefined;

    if (resolvedInput.eventSnapshot) {
      if (!resolvedInput.eventSnapshot.chosenCardId) {
        resolvedInput.eventSnapshot.chosenCardId = targetId;
      }
      if (
        resolvedInput.eventSnapshot.chosenCardCost === undefined &&
        typeof targetCost === "number"
      ) {
        resolvedInput.eventSnapshot.chosenCardCost = targetCost;
      }
      resolvedInput.eventSnapshot.cardsUnderCountBeforeBanish =
        (resolvedInput.eventSnapshot.cardsUnderCountBeforeBanish ?? 0) +
        cardsUnderCountBeforeBanish;
      if (typeof strengthBeforeBanish === "number" && Number.isFinite(strengthBeforeBanish)) {
        resolvedInput.eventSnapshot.strengthBeforeBanish =
          (resolvedInput.eventSnapshot.strengthBeforeBanish ?? 0) + strengthBeforeBanish;
      }
      if (Array.isArray(classificationsBeforeBanish) && classificationsBeforeBanish.length > 0) {
        resolvedInput.eventSnapshot.classificationsBeforeBanish = [...classificationsBeforeBanish];
      }
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
        snapshot: {
          cardsUnderCountBeforeBanish,
          classificationsBeforeBanish,
          strengthBeforeBanish,
          subjectAtLocationId,
        },
        reason: "banish effect",
      },
      {
        event: "banish",
        happenedInChallenge: Boolean(ctx.G.challengeState),
        playerId: ownerId,
        subjectCardId: targetId,
        triggerSourceCardId: targetId,
        triggerCandidates,
        eventSnapshot: {
          classificationsBeforeBanish,
          subjectAtLocationId,
        },
      },
    );
    recordBanishedCharacterThisTurn(ctx, targetId);
    banishedAny = true;
    banishedCount += 1;
  }

  if (resolvedInput.eventSnapshot) {
    resolvedInput.eventSnapshot.triggerAmount = banishedCount;
  }

  markLastEffectPerformed(resolvedInput.eventSnapshot, banishedAny);
}
