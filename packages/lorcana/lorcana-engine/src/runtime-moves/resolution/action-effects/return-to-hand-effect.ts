import type { CardInstanceId, PlayerId } from "#core";
import type { ReturnToHandEffect } from "@tcg/lorcana-types";
import type { CardPlayedPayload } from "../../../types";
import {
  emitTriggeredLorcanaEvent,
  snapshotTriggeredCandidatesForCard,
} from "../../../triggered-abilities";
import { moveCardOutOfPlayWithStack } from "../../state/shift-stack";
import type { ActionResolutionInput, PlayCardExecutionContext } from "./types";
import { markLastEffectPerformed } from "./event-snapshot-utils";
import { resolveEffectTargets } from "../../../targeting/runtime";
import { getEffectTargetSelectionInput } from "./selection-state";

export function isReturnToHandEffect(effect: unknown): effect is ReturnToHandEffect {
  return (
    typeof effect === "object" &&
    effect !== null &&
    "type" in effect &&
    (effect as { type?: unknown }).type === "return-to-hand"
  );
}

function moveCardToOwnerHand(
  ctx: PlayCardExecutionContext,
  cardId: CardInstanceId,
  fallbackPlayerId: PlayerId,
): void {
  const ownerId =
    (ctx.framework.zones.getCardOwner(cardId) as PlayerId | undefined) ?? fallbackPlayerId;
  const zoneKey = ctx.framework.zones.getCardZone(cardId);

  if (typeof zoneKey === "string" && (zoneKey === "play" || zoneKey.startsWith("play:"))) {
    const triggerCandidates = snapshotTriggeredCandidatesForCard(ctx, cardId);
    moveCardOutOfPlayWithStack(ctx, cardId, {
      zone: "hand",
      playerId: ownerId,
    });

    emitTriggeredLorcanaEvent(
      ctx,
      "cardReturnedToHand",
      { cardId, ownerId, fromZone: zoneKey },
      {
        event: "return-to-hand",
        playerId: ownerId,
        subjectCardId: cardId,
        fromZone: zoneKey,
        triggerCandidates,
      },
    );
    return;
  }

  ctx.framework.zones.moveCard(cardId, {
    zone: "hand",
    playerId: ownerId,
  });
}

export function resolveReturnToHandEffect(
  ctx: PlayCardExecutionContext,
  cardPlayed: CardPlayedPayload,
  effect: ReturnToHandEffect,
  resolutionInput: ActionResolutionInput,
): void {
  const resolvedTargets =
    resolveEffectTargets(
      ctx,
      cardPlayed,
      effect.target,
      getEffectTargetSelectionInput(effect.target, resolutionInput),
      resolutionInput.eventSnapshot,
    ) ?? [];

  for (const targetId of resolvedTargets) {
    moveCardToOwnerHand(ctx, targetId, cardPlayed.playerId);
  }

  if (resolutionInput.eventSnapshot && resolvedTargets.length > 0) {
    resolutionInput.eventSnapshot.chosenCardId = resolvedTargets[0];
  }

  markLastEffectPerformed(resolutionInput.eventSnapshot, resolvedTargets.length > 0);
}
