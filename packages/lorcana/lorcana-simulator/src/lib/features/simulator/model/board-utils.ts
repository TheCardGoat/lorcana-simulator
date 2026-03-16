import { type MatchStaticResources } from "@tcg/lorcana-engine";
import type { LorcanaCard } from "@tcg/lorcana-engine";
import type { LorcanaProjectedBoardView } from "@tcg/lorcana-engine";
import { m } from "$lib/paraglide/messages.js";
import type {
  LorcanaCardTextEntrySnapshot,
  LorcanaCardSnapshot,
  LorcanaPlayerSide,
  LorcanaZoneId,
} from "@/features/simulator/model/contracts.js";
import { getSideForOwnerId, getZoneCardIds } from "@/features/simulator/model/contracts.js";

export type CardSnapshotMap = Record<string, LorcanaCardSnapshot>;

type LocalizedCardTextSource = string | Array<{ title: string; description?: string }>;

function flattenCardText(text?: LocalizedCardTextSource): string | undefined {
  if (!text) {
    return undefined;
  }

  if (typeof text === "string") {
    return text;
  }

  return text
    .map((entry) => (entry.description ? `${entry.title} ${entry.description}` : entry.title))
    .join("\n");
}

function projectCardTextEntries(
  text?: LocalizedCardTextSource,
): LorcanaCardTextEntrySnapshot[] | undefined {
  if (!text || typeof text === "string") {
    return undefined;
  }

  const entries = text
    .map<LorcanaCardTextEntrySnapshot | null>((entry) => {
      const title = entry.title.trim();
      if (!title) {
        return null;
      }

      const description = entry.description?.trim();
      return {
        title,
        ...(description ? { description } : {}),
      };
    })
    .filter((entry): entry is LorcanaCardTextEntrySnapshot => entry !== null);

  return entries.length > 0 ? entries : undefined;
}

function getHiddenCardLabel(zoneId: LorcanaZoneId): string {
  return zoneId === "deck" ? m["sim.card.hiddenDeck"]({}) : m["sim.card.hidden"]({});
}

function getCardDisplayName(
  fullName?: string,
  definition?: { name: string; version?: string },
): string | undefined {
  if (fullName) {
    return fullName;
  }

  if (!definition) {
    return undefined;
  }

  return definition.version ? `${definition.name} - ${definition.version}` : definition.name;
}

function normalizeRarity(
  rarity: LorcanaCard["rarity"] | undefined,
): LorcanaCardSnapshot["rarity"] | undefined {
  switch (rarity) {
    case "common":
    case "uncommon":
    case "rare":
    case "super_rare":
    case "legendary":
    case "enchanted":
    case "iconic":
    case "promo":
      return rarity;
    default:
      return undefined;
  }
}

function getCardDefinition(
  staticResources: MatchStaticResources<LorcanaCard>,
  cardId: string,
  definitionId?: string,
): LorcanaCard | undefined {
  const resolvedDefinitionId = definitionId ?? staticResources.instances.get(cardId)?.definitionId;
  return resolvedDefinitionId ? staticResources.cards.get(resolvedDefinitionId) : undefined;
}

export function buildCardSnapshotMap(
  board: LorcanaProjectedBoardView,
  staticResources: MatchStaticResources<LorcanaCard>,
): CardSnapshotMap {
  const snapshots: CardSnapshotMap = {};

  for (const [cardId, projectedCard] of Object.entries(board.cards)) {
    const definition = getCardDefinition(staticResources, cardId, projectedCard.definitionId);
    const ownerSide = getSideForOwnerId(board, projectedCard.ownerId) ?? "playerOne";
    const zoneId = projectedCard.zone;
    const isMasked = projectedCard.hidden === true;
    const readyState =
      projectedCard.exerted === true
        ? "exerted"
        : projectedCard.exerted === false
          ? "ready"
          : "unknown";
    const facePresentation = zoneId === "inkwell" ? (isMasked ? "faceDown" : "faceUp") : "faceUp";
    const cardName = getCardDisplayName(projectedCard.fullName, definition);
    const cardText = definition?.text as LocalizedCardTextSource | undefined;
    const locationCard =
      projectedCard.atLocationId !== undefined
        ? board.cards[projectedCard.atLocationId]
        : undefined;
    const locationDefinition =
      locationCard?.hidden === true || !projectedCard.atLocationId
        ? undefined
        : getCardDefinition(
            staticResources,
            projectedCard.atLocationId,
            locationCard?.definitionId,
          );
    const atLocationLabel = getCardDisplayName(locationCard?.fullName, locationDefinition);

    snapshots[cardId] = {
      cardId,
      atLocationId: projectedCard.atLocationId,
      atLocationLabel,
      baseLoreValue:
        definition?.cardType === "character" || definition?.cardType === "location"
          ? (definition as { lore?: number }).lore
          : undefined,
      baseStrength: definition?.cardType === "character" ? definition.strength : undefined,
      baseWillpower:
        definition?.cardType === "character" || definition?.cardType === "location"
          ? definition.willpower
          : undefined,
      cardNumber: definition?.cardNumber,
      cardType: definition?.cardType,
      cardsUnderCount: projectedCard.cardsUnder?.length ?? 0,
      classifications:
        definition?.cardType === "character" ? definition.classifications : undefined,
      cost: definition?.cost,
      damage: projectedCard.damage ?? 0,
      definitionId:
        projectedCard.definitionId ??
        definition?.id ??
        staticResources.instances.get(cardId)?.definitionId ??
        cardId,
      facePresentation,
      inkType: definition?.inkType,
      inkable: definition?.inkable,
      isDrying: projectedCard.drying ?? false,
      isMasked,
      hasQuestRestriction: projectedCard.hasQuestRestriction ?? false,
      keywordValues: projectedCard.keywordValues,
      keywords: projectedCard.keywords ?? [],
      label: isMasked ? getHiddenCardLabel(zoneId) : (cardName ?? m["sim.card.unknown"]({})),
      loreValue:
        definition?.cardType === "character" || definition?.cardType === "location"
          ? (projectedCard.lore ?? (definition as { lore?: number }).lore)
          : undefined,
      moveCost:
        definition?.cardType === "location"
          ? (projectedCard.moveCost ?? definition.moveCost)
          : undefined,
      ownerId: String(projectedCard.ownerId),
      ownerSide,
      rarity: normalizeRarity(definition?.rarity),
      readyState,
      set: definition?.set,
      strength: definition?.cardType === "character" ? projectedCard.strength : undefined,
      temporaryRestrictions: projectedCard.temporaryRestrictions,
      text: flattenCardText(cardText),
      textEntries: projectCardTextEntries(cardText),
      willpower:
        definition?.cardType === "character" || definition?.cardType === "location"
          ? projectedCard.willpower
          : undefined,
      zoneId,
    };
  }

  return snapshots;
}

export function getCardsForZone(
  cardSnapshotsById: CardSnapshotMap,
  board: LorcanaProjectedBoardView,
  playerSide: LorcanaPlayerSide,
  zoneId: LorcanaZoneId,
): LorcanaCardSnapshot[] {
  return getZoneCardIds(board, playerSide, zoneId)
    .map((cardId) => cardSnapshotsById[cardId] ?? null)
    .filter((card): card is LorcanaCardSnapshot => card !== null);
}

export function findCardById(
  cardSnapshotsById: CardSnapshotMap,
  cardId: string | null,
): LorcanaCardSnapshot | null {
  if (!cardId) {
    return null;
  }

  return cardSnapshotsById[cardId] ?? null;
}
