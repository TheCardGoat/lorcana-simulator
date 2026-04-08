import type { PlayerId } from "#core";
import type { DrawUntilHandSizeEffect } from "@tcg/lorcana-types";
import type { CardPlayedPayload } from "../../../types";
import { markLastEffectPerformed } from "./event-snapshot-utils";
import { resolveCurrentTurnPlayerId } from "../../../targeting/runtime";
import { resolveTargetPlayerIds } from "./player-target-resolver";
import type { ActionResolutionInput, PlayCardExecutionContext } from "./types";

export function isDrawUntilHandSizeEffect(effect: unknown): effect is DrawUntilHandSizeEffect {
  return (
    typeof effect === "object" &&
    effect !== null &&
    "type" in effect &&
    (effect as { type?: unknown }).type === "draw-until-hand-size"
  );
}

export function resolveDrawUntilHandSizeEffect(
  ctx: PlayCardExecutionContext,
  cardPlayed: CardPlayedPayload,
  effect: DrawUntilHandSizeEffect,
  resolutionInput: ActionResolutionInput,
): void {
  const effectTarget = effect.target ?? "CONTROLLER";
  const targetPlayerIds =
    effectTarget === "CURRENT_TURN"
      ? (() => {
          // Prefer triggerContext.playerId (the player whose turn fired the trigger)
          // over the generic currentPlayer/priority.holder, which may be wrong when
          // a non-turn-player (e.g. card controller) resolves the bag.
          const currentTurnPlayerId =
            (resolutionInput.triggerContext?.playerId as PlayerId | undefined) ??
            resolveCurrentTurnPlayerId(ctx);
          return currentTurnPlayerId ? [currentTurnPlayerId] : [];
        })()
      : resolveTargetPlayerIds(ctx, cardPlayed, effectTarget, resolutionInput.targets);
  const targetSize =
    typeof effect.size === "number" && Number.isFinite(effect.size) && effect.size >= 0
      ? Math.floor(effect.size)
      : 0;

  let drewCards = false;
  for (const playerId of targetPlayerIds) {
    const currentHandSize = ctx.framework.zones.getCards({ zone: "hand", playerId }).length;
    const drawAmount = Math.max(0, targetSize - currentHandSize);
    if (drawAmount <= 0) {
      continue;
    }

    ctx.framework.zones.drawCards({
      from: { zone: "deck", playerId },
      to: { zone: "hand", playerId },
      count: drawAmount,
    });
    drewCards = true;
  }

  if (drewCards) {
    markLastEffectPerformed(resolutionInput.eventSnapshot, true);
  }
}
