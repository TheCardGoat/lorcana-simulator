import type { CardInstanceId, PlayerId } from "#core";
import type { PutOnBottomEffect } from "@tcg/lorcana-types";
import type { CardPlayedPayload } from "../../../types";
import { moveCardOutOfPlayWithStack } from "../../state/shift-stack";
import type { ActionResolutionInput, PlayCardExecutionContext } from "./types";
import { markLastEffectPerformed } from "./event-snapshot-utils";
import { normalizeSelectedTargets, resolveEffectTargets } from "../../../targeting/runtime";

export function isPutOnBottomEffect(effect: unknown): effect is PutOnBottomEffect {
  return (
    typeof effect === "object" &&
    effect !== null &&
    "type" in effect &&
    (effect as { type?: unknown }).type === "put-on-bottom"
  );
}

function putCardOnBottomOfOwnerDeck(
  ctx: PlayCardExecutionContext,
  cardId: CardInstanceId,
  fallbackPlayerId: PlayerId,
): void {
  const ownerId =
    (ctx.framework.state.ctx.zones.private.cardIndex[cardId]?.ownerID as PlayerId | undefined) ??
    fallbackPlayerId;
  const zoneKey = ctx.framework.state.ctx.zones.private.cardIndex[cardId]?.zoneKey;

  if (typeof zoneKey === "string" && (zoneKey === "play" || zoneKey.startsWith("play:"))) {
    moveCardOutOfPlayWithStack(
      ctx,
      cardId,
      {
        zone: "deck",
        playerId: ownerId,
      },
      {
        index: 0,
      },
    );
    return;
  }

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
}

export function resolvePutOnBottomEffect(
  ctx: PlayCardExecutionContext,
  cardPlayed: CardPlayedPayload,
  effect: PutOnBottomEffect,
  resolutionInput: ActionResolutionInput,
): void {
  const candidateTargets =
    resolveEffectTargets(ctx, cardPlayed, effect.target, resolutionInput.targets) ?? [];
  const selectedTargets = normalizeSelectedTargets(resolutionInput.targets) ?? [];
  const resolvedTargets =
    effect.ordering === "player-choice" && selectedTargets.length === candidateTargets.length
      ? selectedTargets
      : candidateTargets;

  if (effect.ordering === "player-choice") {
    const targetsByOwner = new Map<PlayerId, CardInstanceId[]>();
    for (const targetId of resolvedTargets) {
      const ownerId =
        (ctx.framework.state.ctx.zones.private.cardIndex[targetId]?.ownerID as
          | PlayerId
          | undefined) ?? cardPlayed.playerId;
      const existing = targetsByOwner.get(ownerId) ?? [];
      existing.push(targetId);
      targetsByOwner.set(ownerId, existing);
    }

    for (const [ownerId, ownerTargets] of targetsByOwner.entries()) {
      for (const targetId of [...ownerTargets].reverse()) {
        putCardOnBottomOfOwnerDeck(ctx, targetId, ownerId);
      }
    }
  } else {
    for (const targetId of resolvedTargets) {
      putCardOnBottomOfOwnerDeck(ctx, targetId, cardPlayed.playerId);
    }
  }

  markLastEffectPerformed(resolutionInput.eventSnapshot, resolvedTargets.length > 0);
}
