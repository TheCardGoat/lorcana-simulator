import type { ReadyEffect } from "@tcg/lorcana-types";
import type { CardPlayedPayload } from "../../../types";
import type { ActionResolutionInput, PlayCardExecutionContext } from "./types";
import { resolveEffectTargets } from "../../../targeting/runtime";
import { emitTriggeredLorcanaEvent } from "../../effects/triggered-abilities";

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
    resolveEffectTargets(ctx, cardPlayed, effect.target, resolutionInput.targets) ?? [];

  for (const targetId of resolvedTargets) {
    const currentMeta = ctx.cards.require(targetId).meta ?? {};
    const playerId = ctx.framework.state.ctx.zones.private.cardIndex[targetId]?.ownerID;
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
  }
}
