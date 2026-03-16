import type { DrawEffect } from "@tcg/lorcana-types";
import type { CardInstanceId, PlayerId } from "#core";
import type { CardPlayedPayload } from "../../../types/index";
import type { PlayCardExecutionContext } from "./types";
import { resolveCurrentTurnPlayerId } from "../../../targeting/runtime";
import { emitTriggeredLorcanaEvent } from "../../effects/triggered-abilities";

type ResolvedDrawEffectInput = {
  drawAmount?: number;
  selectedPlayerIds?: PlayerId[];
  selectedTargets?: CardInstanceId[];
};

export function isDrawEffect(effect: unknown): effect is DrawEffect {
  return (
    typeof effect === "object" &&
    effect !== null &&
    "type" in effect &&
    (effect as { type?: unknown }).type === "draw"
  );
}

function resolveDrawTargetPlayerIds(
  ctx: PlayCardExecutionContext,
  cardPlayed: CardPlayedPayload,
  target: DrawEffect["target"],
  selectedPlayerIds?: PlayerId[],
  selectedTargets?: CardInstanceId[],
): PlayerId[] {
  const normalizedTarget = target ?? "CONTROLLER";
  const opponents = ctx.framework.state.playerIds.filter(
    (playerId) => playerId !== cardPlayed.playerId,
  );

  switch (normalizedTarget) {
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
    case "CHOSEN_PLAYER": {
      const selected = [...new Set(selectedPlayerIds ?? [])];
      const validPlayers = new Set(ctx.framework.state.playerIds);
      return selected.filter((playerId) => validPlayers.has(playerId)).slice(0, 1);
    }
    case "CARD_OWNER":
      return [
        ...new Set(
          (selectedTargets ?? [])
            .map((cardId) => ctx.framework.state.ctx.zones.private.cardIndex[cardId]?.ownerID)
            .filter((playerId): playerId is PlayerId => typeof playerId === "string"),
        ),
      ];
    case "CURRENT_TURN": {
      const currentTurnPlayerId = resolveCurrentTurnPlayerId(ctx);
      return currentTurnPlayerId ? [currentTurnPlayerId] : [];
    }
    default:
      return [];
  }
}

export function resolveDrawEffect(
  ctx: PlayCardExecutionContext,
  cardPlayed: CardPlayedPayload,
  effect: DrawEffect,
  resolvedInput: ResolvedDrawEffectInput,
): void {
  const drawAmount =
    typeof resolvedInput.drawAmount === "number" &&
    Number.isFinite(resolvedInput.drawAmount) &&
    resolvedInput.drawAmount > 0
      ? resolvedInput.drawAmount
      : undefined;
  if (!drawAmount) {
    return;
  }

  const targetPlayerIds = resolveDrawTargetPlayerIds(
    ctx,
    cardPlayed,
    effect.target,
    resolvedInput.selectedPlayerIds,
    resolvedInput.selectedTargets,
  );
  for (const playerId of targetPlayerIds) {
    const drawnCards = ctx.framework.zones.drawCards({
      from: { zone: "deck", playerId },
      to: { zone: "hand", playerId },
      count: drawAmount,
    });
    const drawnCardIds = Array.isArray(drawnCards) ? (drawnCards as CardInstanceId[]) : [];

    emitTriggeredLorcanaEvent(ctx, "cardsDrawn", {
      playerId,
      amount: drawnCardIds.length,
      cardIds: drawnCardIds,
    });

    drawnCardIds.forEach((cardId) => {
      emitTriggeredLorcanaEvent(
        ctx,
        "cardsDrawn",
        {
          playerId,
          amount: 1,
          cardIds: [cardId],
        },
        {
          event: "draw",
          playerId,
          subjectCardId: cardId,
          triggerSourceCardId: cardId,
        },
      );
    });
  }
}
