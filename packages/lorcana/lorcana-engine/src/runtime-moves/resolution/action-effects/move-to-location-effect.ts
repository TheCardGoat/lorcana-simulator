import type { MoveToLocationEffect } from "@tcg/lorcana-types";
import type { CardInstanceId } from "#core";
import type { CardPlayedPayload } from "../../../types";
import type { ActionResolutionInput, PlayCardExecutionContext } from "./types";
import { normalizeSelectedTargets, resolveEffectTargets } from "../../../targeting/runtime";
import { handleUnsupportedActionEffect } from "./unsupported-action-effect";

export function isMoveToLocationEffect(effect: unknown): effect is MoveToLocationEffect {
  return (
    typeof effect === "object" &&
    effect !== null &&
    "type" in effect &&
    (effect as { type?: unknown }).type === "move-to-location"
  );
}

function asCardType(value: unknown): string | undefined {
  if (!value || typeof value !== "object") {
    return undefined;
  }
  const cardType = (value as { cardType?: unknown }).cardType;
  return typeof cardType === "string" ? cardType : undefined;
}

function resolveLocationAndCharacters(
  ctx: PlayCardExecutionContext,
  cardPlayed: CardPlayedPayload,
  effect: MoveToLocationEffect,
  resolutionInput: ActionResolutionInput,
): { locationId?: CardInstanceId; characterIds: CardInstanceId[] } {
  const selectedTargets = normalizeSelectedTargets(resolutionInput.targets) ?? [];
  const selectedSet = new Set(selectedTargets);
  const characterTargetCards =
    resolveEffectTargets(ctx, cardPlayed, effect.character, resolutionInput.targets) ?? [];
  const locationTargetCards =
    resolveEffectTargets(ctx, cardPlayed, effect.location, resolutionInput.targets) ?? [];
  const candidateCards = [...locationTargetCards, ...characterTargetCards, ...selectedTargets];

  const selfCardType = asCardType(ctx.cards.getDefinition(cardPlayed.cardId));
  const isSelfLocationTarget = (effect.location as unknown) === "this";
  const selfLocationId =
    isSelfLocationTarget && selfCardType === "location" ? cardPlayed.cardId : undefined;
  const locationId =
    selfLocationId ??
    candidateCards.find((cardId) => asCardType(ctx.cards.getDefinition(cardId)) === "location");

  const characterIds = selectedTargets.filter((cardId) => {
    if (!selectedSet.has(cardId)) {
      return false;
    }
    return asCardType(ctx.cards.getDefinition(cardId)) === "character";
  });

  return { locationId, characterIds };
}

export function resolveMoveToLocationEffect(
  ctx: PlayCardExecutionContext,
  cardPlayed: CardPlayedPayload,
  effect: MoveToLocationEffect,
  resolutionInput: ActionResolutionInput,
): void {
  const { locationId, characterIds } = resolveLocationAndCharacters(
    ctx,
    cardPlayed,
    effect,
    resolutionInput,
  );

  if (!locationId) {
    handleUnsupportedActionEffect(
      "move-to-location",
      "move-to-location requires a selected location target",
    );
    return;
  }

  if (characterIds.length === 0) {
    return;
  }

  for (const characterId of characterIds) {
    const cardType = asCardType(ctx.cards.getDefinition(characterId));
    if (cardType !== "character") {
      continue;
    }

    const currentMeta = ctx.cards.require(characterId).meta ?? {};
    ctx.cards.patchMeta(characterId, {
      ...currentMeta,
      atLocationId: locationId,
    });
  }
}
