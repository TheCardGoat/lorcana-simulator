import type { EnablePlayFromUnderEffect } from "@tcg/lorcana-types";
import type { CardPlayedPayload } from "../../../types";
import { resolveTemporaryEffectExpiryTurn } from "../../effects/temporary-effects";
import type { ActionResolutionInput, PlayCardExecutionContext } from "./types";

export function isEnablePlayFromUnderEffect(effect: unknown): effect is EnablePlayFromUnderEffect {
  return (
    typeof effect === "object" &&
    effect !== null &&
    "type" in effect &&
    (effect as { type?: unknown }).type === "enable-play-from-under"
  );
}

export function resolveEnablePlayFromUnderEffect(
  ctx: PlayCardExecutionContext,
  cardPlayed: CardPlayedPayload,
  effect: EnablePlayFromUnderEffect,
  _resolutionInput: ActionResolutionInput,
): void {
  const currentTurn = ctx.framework.state.status.turn ?? 1;
  const expiresAtTurn = resolveTemporaryEffectExpiryTurn(
    currentTurn,
    effect.duration ?? "this-turn",
  );

  const pendingPlayFromUnder =
    ctx.G.turnMetadata.pendingPlayFromUnder ?? (ctx.G.turnMetadata.pendingPlayFromUnder = []);

  pendingPlayFromUnder.push({
    sourceItemId: cardPlayed.cardId,
    expiresAtTurn,
    cardType: effect.cardType,
    controllerId: cardPlayed.playerId,
  });
}
