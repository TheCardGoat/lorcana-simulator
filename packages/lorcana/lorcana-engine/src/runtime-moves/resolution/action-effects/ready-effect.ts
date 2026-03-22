import type { PlayerId } from "#core";
import type { ReadyEffect } from "@tcg/lorcana-types";
import type { CardPlayedPayload } from "../../../types";
import type { LorcanaCardMeta } from "../../../types";
import type { ActionResolutionInput, PlayCardExecutionContext } from "./types";
import { resolveEffectTargets } from "../../../targeting/runtime";
import { emitTriggeredLorcanaEvent } from "../../effects/triggered-abilities";
import {
  addTemporaryRestriction,
  resolveTemporaryEffectWindow,
} from "../../effects/temporary-effects";
import { getEffectTargetSelectionInput } from "./selection-state";

export function isReadyEffect(effect: unknown): effect is ReadyEffect {
  return (
    typeof effect === "object" &&
    effect !== null &&
    "type" in effect &&
    (effect as { type?: unknown }).type === "ready"
  );
}

export function resolveReadyEffect(
  ctx: PlayCardExecutionContext,
  cardPlayed: CardPlayedPayload,
  effect: ReadyEffect,
  resolutionInput: ActionResolutionInput,
): void {
  const resolvedTargets =
    resolveEffectTargets(
      ctx,
      cardPlayed,
      effect.target,
      getEffectTargetSelectionInput(effect.target, resolutionInput),
    ) ?? [];

  const restriction =
    typeof effect.restriction === "string" && effect.restriction.trim().length > 0
      ? effect.restriction.trim()
      : undefined;

  for (const targetId of resolvedTargets) {
    const currentMeta = ctx.cards.require(targetId).meta ?? {};
    const playerId = ctx.framework.zones.getCardOwner(targetId) as PlayerId | undefined;
    ctx.cards.patchMeta(targetId, {
      ...currentMeta,
      state: "ready",
    });
    if (playerId) {
      emitTriggeredLorcanaEvent(
        ctx,
        "cardReadied",
        { cardId: targetId },
        { event: "ready", playerId, subjectCardId: targetId },
      );
    }

    if (restriction) {
      const currentTurn = ctx.framework.state.status.turn ?? 1;
      const currentPlayerId = ctx.framework.state.currentPlayer;
      const targetOwnerId = playerId;
      const { startsAtTurn, expiresAtTurn } = resolveTemporaryEffectWindow(
        currentTurn,
        "this-turn",
        { currentPlayerId, targetOwnerId },
      );
      const metaAfterReady = (ctx.cards.require(targetId).meta ?? {}) as LorcanaCardMeta;
      ctx.cards.patchMeta(
        targetId,
        addTemporaryRestriction(metaAfterReady, restriction, expiresAtTurn, startsAtTurn),
      );
    }
  }
}
