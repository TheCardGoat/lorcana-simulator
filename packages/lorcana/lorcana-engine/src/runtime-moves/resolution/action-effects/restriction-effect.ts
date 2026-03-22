import type { PlayerId } from "#core";
import type { RestrictionEffect } from "@tcg/lorcana-types";
import { normalizeLorcanaTarget } from "@tcg/lorcana-types/targeting";
import type { CardPlayedPayload } from "../../../types";
import type { LorcanaCardMeta } from "../../../types";
import {
  addTemporaryPlayerRestriction,
  addTemporaryRestriction,
  resolveTemporaryEffectWindow,
} from "../../effects/temporary-effects";
import type { ActionResolutionInput, PlayCardExecutionContext } from "./types";
import { isPlayerTargetDescriptor, resolveEffectTargets } from "../../../targeting/runtime";
import { resolveTargetPlayerIds } from "./player-target-resolver";
import { getEffectTargetSelectionInput } from "./selection-state";

export function isRestrictionEffect(effect: unknown): effect is RestrictionEffect {
  return (
    typeof effect === "object" &&
    effect !== null &&
    "type" in effect &&
    (effect as { type?: unknown }).type === "restriction"
  );
}

export function resolveRestrictionEffect(
  ctx: PlayCardExecutionContext,
  cardPlayed: CardPlayedPayload,
  effect: RestrictionEffect,
  resolutionInput: ActionResolutionInput,
): void {
  const restriction =
    typeof effect.restriction === "string" && effect.restriction.trim().length > 0
      ? effect.restriction.trim()
      : undefined;
  if (!restriction) {
    return;
  }

  if (effect.target && isPlayerTargetDescriptor(normalizeLorcanaTarget(effect.target))) {
    const currentTurn = ctx.framework.state.status.turn ?? 1;
    const currentPlayerId = ctx.framework.state.currentPlayer;
    const targetPlayerIds = resolveTargetPlayerIds(
      ctx,
      cardPlayed,
      effect.target,
      getEffectTargetSelectionInput(effect.target, resolutionInput),
    );
    if (targetPlayerIds.length === 0) {
      return;
    }

    let nextState = ctx.G.temporaryPlayerRestrictions;
    for (const playerId of targetPlayerIds) {
      const { startsAtTurn, expiresAtTurn } = resolveTemporaryEffectWindow(
        currentTurn,
        effect.duration,
        {
          currentPlayerId,
          targetOwnerId: playerId,
        },
      );
      nextState = addTemporaryPlayerRestriction(
        nextState,
        playerId,
        restriction,
        expiresAtTurn,
        startsAtTurn,
      );
    }
    ctx.G.temporaryPlayerRestrictions = nextState;
    return;
  }

  const resolvedTargets =
    resolveEffectTargets(
      ctx,
      cardPlayed,
      effect.target,
      getEffectTargetSelectionInput(effect.target, resolutionInput),
    ) ?? [];
  if (resolvedTargets.length === 0) {
    return;
  }

  const currentTurn = ctx.framework.state.status.turn ?? 1;
  const currentPlayerId = ctx.framework.state.currentPlayer;

  for (const targetId of resolvedTargets) {
    const targetOwnerId = ctx.framework.zones.getCardOwner(targetId) as PlayerId | undefined;
    const { startsAtTurn, expiresAtTurn } = resolveTemporaryEffectWindow(
      currentTurn,
      effect.duration,
      {
        currentPlayerId,
        targetOwnerId,
      },
    );
    const currentMeta = (ctx.cards.require(targetId).meta ?? {}) as LorcanaCardMeta;
    ctx.cards.patchMeta(
      targetId,
      addTemporaryRestriction(currentMeta, restriction, expiresAtTurn, startsAtTurn, {
        type: "restriction",
        sourceId: effect.linkedToSource ? cardPlayed.cardId : undefined,
        activeWhileSourceInPlay: effect.linkedToSource === true,
      }),
    );
  }
}
