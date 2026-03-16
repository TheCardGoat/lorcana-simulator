import type { CardInstanceId, PlayerId } from "#core";
import type { ReturnToHandEffect } from "@tcg/lorcana-types";
import type { CardPlayedPayload } from "../../../types";
import { moveCardOutOfPlayWithStack } from "../../state/shift-stack";
import type { ActionResolutionInput, PlayCardExecutionContext } from "./types";
import { markLastEffectPerformed } from "./event-snapshot-utils";
import { resolveEffectTargets } from "../../../targeting/runtime";

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
    (ctx.framework.state.ctx.zones.private.cardIndex[cardId]?.ownerID as PlayerId | undefined) ??
    fallbackPlayerId;
  const zoneKey = ctx.framework.state.ctx.zones.private.cardIndex[cardId]?.zoneKey;

  if (typeof zoneKey === "string" && (zoneKey === "play" || zoneKey.startsWith("play:"))) {
    moveCardOutOfPlayWithStack(ctx, cardId, {
      zone: "hand",
      playerId: ownerId,
    });
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
      resolutionInput.targets,
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
