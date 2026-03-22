import type { PlayerId } from "#core";
import type { GrantAbilityEffect } from "@tcg/lorcana-types";
import type { CardPlayedPayload } from "../../../types";
import type { LorcanaCardMeta } from "../../../types";
import { addTemporaryAbility, resolveTemporaryEffectWindow } from "../../effects/temporary-effects";
import type { ActionResolutionInput, PlayCardExecutionContext } from "./types";
import { resolveEffectTargets } from "../../../targeting/runtime";
import { getEffectTargetSelectionInput } from "./selection-state";

export function isGrantAbilityEffect(effect: unknown): effect is GrantAbilityEffect {
  return (
    typeof effect === "object" &&
    effect !== null &&
    "type" in effect &&
    (effect as { type?: unknown }).type === "grant-ability"
  );
}

export function resolveGrantAbilityEffect(
  ctx: PlayCardExecutionContext,
  cardPlayed: CardPlayedPayload,
  effect: GrantAbilityEffect,
  resolutionInput: ActionResolutionInput,
): void {
  const structuredAbility =
    effect.ability && typeof effect.ability === "object" && !Array.isArray(effect.ability)
      ? effect.ability
      : undefined;
  const ability =
    typeof effect.ability === "string"
      ? effect.ability.trim()
      : structuredAbility
        ? "id" in structuredAbility &&
          typeof structuredAbility.id === "string" &&
          structuredAbility.id.trim().length > 0
          ? structuredAbility.id.trim()
          : typeof structuredAbility.type === "string"
            ? structuredAbility.type.trim()
            : undefined
        : undefined;
  if (!ability) {
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
      addTemporaryAbility(currentMeta, ability, expiresAtTurn, startsAtTurn, structuredAbility),
    );
  }
}
