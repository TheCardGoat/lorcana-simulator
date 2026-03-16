import type { LoseLoreEffect } from "@tcg/lorcana-types";
import type { PlayerId } from "#core";
import type { CardPlayedPayload } from "../../../types/index";
import type { DynamicAmountEventSnapshot } from "../../../types/domain-events";
import type { PlayCardExecutionContext } from "./types";
import { resolveCurrentTurnPlayerId } from "../../../targeting/runtime";

type ResolvedLoseLoreEffectInput = {
  eventSnapshot?: DynamicAmountEventSnapshot;
  loseAmount?: number;
  selectedPlayerIds?: PlayerId[];
};

export function isLoseLoreEffect(effect: unknown): effect is LoseLoreEffect {
  return (
    typeof effect === "object" &&
    effect !== null &&
    "type" in effect &&
    (effect as { type?: unknown }).type === "lose-lore"
  );
}

function resolveLoseLoreTargetPlayerIds(
  ctx: PlayCardExecutionContext,
  cardPlayed: CardPlayedPayload,
  target: LoseLoreEffect["target"],
  selectedPlayerIds?: PlayerId[],
): PlayerId[] {
  const normalizedTarget = target ?? "OPPONENT";
  const opponents = ctx.framework.state.playerIds.filter(
    (playerId) => playerId !== cardPlayed.playerId,
  );

  switch (normalizedTarget) {
    case "SELF":
    case "CONTROLLER":
      return [cardPlayed.playerId];
    case "EACH_PLAYER":
    case "ALL_PLAYERS":
      return [...ctx.framework.state.playerIds];
    case "OPPONENT":
      return opponents.length > 0 ? [opponents[0]!] : [];
    case "OPPONENTS":
    case "EACH_OPPONENT":
      return opponents;
    case "CURRENT_TURN": {
      const currentTurnPlayerId = resolveCurrentTurnPlayerId(ctx);
      return currentTurnPlayerId ? [currentTurnPlayerId] : [];
    }
    case "CHOSEN_PLAYER":
      return selectedPlayerIds ?? [];
    default:
      return [];
  }
}

export function resolveLoseLoreEffect(
  ctx: PlayCardExecutionContext,
  cardPlayed: CardPlayedPayload,
  effect: LoseLoreEffect,
  resolvedInput: ResolvedLoseLoreEffectInput,
): void {
  const loseAmount =
    typeof resolvedInput.loseAmount === "number" &&
    Number.isFinite(resolvedInput.loseAmount) &&
    resolvedInput.loseAmount > 0
      ? resolvedInput.loseAmount
      : undefined;
  if (!loseAmount) {
    return;
  }

  const targetPlayerIds = resolveLoseLoreTargetPlayerIds(
    ctx,
    cardPlayed,
    effect.target,
    resolvedInput.selectedPlayerIds,
  );
  let loreLost = 0;
  for (const playerId of targetPlayerIds) {
    const currentLore = Number(ctx.G.lore[playerId] ?? 0);
    const nextLore = Math.max(0, currentLore - loseAmount);
    loreLost += currentLore - nextLore;
    ctx.G.lore[playerId] = nextLore;
  }

  if (resolvedInput.eventSnapshot) {
    resolvedInput.eventSnapshot.triggerAmount = loreLost;
  }
}
