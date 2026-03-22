import type { CardInstanceId } from "#core";
import type { SearchDeckEffect } from "@tcg/lorcana-types";
import type { CardPlayedPayload } from "../../../types";
import type { ActionResolutionInput, PlayCardExecutionContext } from "./types";

type CardDefinitionLike = {
  actionSubtype?: string;
  cardType?: string;
  classifications?: string[];
  cost?: number;
  name?: string;
};

export function isSearchDeckEffect(effect: unknown): effect is SearchDeckEffect {
  return (
    typeof effect === "object" &&
    effect !== null &&
    "type" in effect &&
    (effect as { type?: unknown }).type === "search-deck"
  );
}

function matchesSearchFilter(
  ctx: PlayCardExecutionContext,
  cardId: CardInstanceId,
  effect: SearchDeckEffect,
): boolean {
  const definition = ctx.cards.getDefinition(cardId) as CardDefinitionLike | undefined;
  if (!definition) {
    return false;
  }

  if (effect.cardType) {
    if (effect.cardType === "song") {
      if (definition.cardType !== "action" || definition.actionSubtype !== "song") {
        return false;
      }
    } else if (effect.cardType === "floodborn") {
      if (!(definition.classifications ?? []).includes("Floodborn")) {
        return false;
      }
    } else if (definition.cardType !== effect.cardType) {
      return false;
    }
  }

  if (effect.cardName && definition.name !== effect.cardName) {
    return false;
  }

  if (effect.classification) {
    const classifications = definition.classifications ?? [];
    if (!classifications.includes(effect.classification)) {
      return false;
    }
  }

  if (effect.maxCost !== undefined) {
    const cardCost = definition.cost;
    if (cardCost === undefined || cardCost > effect.maxCost) {
      return false;
    }
  }

  return true;
}

export function resolveSearchDeckEffect(
  ctx: PlayCardExecutionContext,
  cardPlayed: CardPlayedPayload,
  effect: SearchDeckEffect,
  resolutionInput: ActionResolutionInput,
): void {
  const selectedTargets = Array.isArray(resolutionInput.targets)
    ? resolutionInput.targets.filter(
        (targetId): targetId is CardInstanceId => typeof targetId === "string",
      )
    : typeof resolutionInput.targets === "string"
      ? [resolutionInput.targets as CardInstanceId]
      : [];

  const deckCards = ctx.framework.zones.getCards({
    zone: "deck",
    playerId: cardPlayed.playerId,
  }) as CardInstanceId[];
  const candidates = deckCards.filter((cardId) => matchesSearchFilter(ctx, cardId, effect));
  if (candidates.length === 0) {
    return;
  }

  const candidateSet = new Set(candidates);
  const selectedCard = selectedTargets.find((cardId) => candidateSet.has(cardId));
  const chosenCardId = selectedCard ?? candidates[candidates.length - 1]!;

  if (effect.reveal) {
    ctx.framework.zones.reveal([chosenCardId], [cardPlayed.playerId]);
    ctx.cards.patchMeta(chosenCardId, { revealed: true });
    if (resolutionInput.eventSnapshot) {
      resolutionInput.eventSnapshot.revealedCardIds = [chosenCardId];
    }
  }

  const destination = effect.putOnTop ? "top-of-deck" : (effect.putInto ?? "hand");
  switch (destination) {
    case "play":
      ctx.framework.zones.moveCard(chosenCardId, {
        zone: "play",
        playerId: cardPlayed.playerId,
      });
      break;
    case "top-of-deck":
      ctx.framework.zones.moveCard(chosenCardId, {
        zone: "deck",
        playerId: cardPlayed.playerId,
      });
      break;
    case "hand":
    default:
      ctx.framework.zones.moveCard(chosenCardId, {
        zone: "hand",
        playerId: cardPlayed.playerId,
      });
      break;
  }

  if (effect.shuffle) {
    ctx.framework.zones.shuffle({
      zone: "deck",
      playerId: cardPlayed.playerId,
    });
  }

  if (resolutionInput.eventSnapshot) {
    resolutionInput.eventSnapshot.chosenCardId = chosenCardId;
  }
}
