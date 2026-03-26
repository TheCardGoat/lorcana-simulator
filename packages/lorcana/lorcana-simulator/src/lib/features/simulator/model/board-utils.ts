import { type MatchStaticResources } from "@tcg/lorcana-engine";
import type { LorcanaCard, LorcanaCardDefinition } from "@tcg/lorcana-engine";
import type { LorcanaProjectedBoardView } from "@tcg/lorcana-engine";
import { m } from "$lib/i18n/messages.js";
import type {
  LorcanaCardTextEntrySnapshot,
  LorcanaCardSnapshot,
  LorcanaPlayerSide,
  LorcanaZoneId,
} from "@/features/simulator/model/contracts.js";
import { getSideForOwnerId, getZoneCardIds } from "@/features/simulator/model/contracts.js";

export type CardSnapshotMap = Record<string, LorcanaCardSnapshot>;

interface AuthoritativeCardStateView {
  ctx: {
    zones: {
      private: {
        cardIndex: Record<
          string,
          {
            zoneKey: string;
            ownerID: string;
            controllerID: string;
          }
        >;
        cardMeta: Record<string, Record<string, unknown>>;
      };
    };
  };
}

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

function mergeTextEntries(
  definitionEntries: LorcanaCardTextEntrySnapshot[] | undefined,
  grantedEntries: Array<{ title: string; description?: string }> | undefined,
): LorcanaCardTextEntrySnapshot[] | undefined {
  if (!grantedEntries || grantedEntries.length === 0) {
    return definitionEntries;
  }

  const merged = [...(definitionEntries ?? []), ...grantedEntries];
  return merged.length > 0 ? merged : undefined;
}

function buildGrantSources(
  cardId: string,
  projectedCard: {
    grantedAbilityTextEntries?: Array<{
      title: string;
      sourceId?: string;
      sourceDefinitionId?: string;
    }>;
    keywordGrantSources?: Array<{ keyword: string; sourceId: string; sourceDefinitionId?: string }>;
    statModifierSources?: Array<{
      stat: string;
      amount: number;
      sourceId: string;
      sourceDefinitionId?: string;
    }>;
  },
  staticResources: MatchStaticResources,
): LorcanaCardSnapshot["grantSources"] {
  const grantedEntries = projectedCard.grantedAbilityTextEntries ?? [];
  const keywordSources = projectedCard.keywordGrantSources ?? [];
  // Filter out self-referential stat modifiers (e.g. Boost is self-applied, not a grant from another card)
  const statSources = (projectedCard.statModifierSources ?? []).filter(
    (s) => s.sourceId !== cardId,
  );
  if (grantedEntries.length === 0 && keywordSources.length === 0 && statSources.length === 0) {
    return undefined;
  }

  const bySource = new Map<string, { definitionId?: string; grants: string[] }>();

  for (const entry of grantedEntries) {
    if (!entry.sourceId) continue;
    if (entry.sourceId === cardId) continue; // filter self-grants (e.g. Boost keyword)
    const existing = bySource.get(entry.sourceId);
    if (existing) {
      existing.grants.push(entry.title);
    } else {
      bySource.set(entry.sourceId, {
        definitionId: entry.sourceDefinitionId,
        grants: [entry.title],
      });
    }
  }

  for (const entry of keywordSources) {
    const existing = bySource.get(entry.sourceId);
    if (existing) {
      if (!existing.grants.includes(entry.keyword)) {
        existing.grants.push(entry.keyword);
      }
    } else {
      bySource.set(entry.sourceId, {
        definitionId: entry.sourceDefinitionId,
        grants: [entry.keyword],
      });
    }
  }

  for (const entry of statSources) {
    const sign = entry.amount > 0 ? "+" : "";
    const statLabel = `${sign}${entry.amount} ${entry.stat.charAt(0).toUpperCase()}${entry.stat.slice(1)}`;
    const existing = bySource.get(entry.sourceId);
    if (existing) {
      existing.grants.push(statLabel);
    } else {
      bySource.set(entry.sourceId, {
        definitionId: entry.sourceDefinitionId,
        grants: [statLabel],
      });
    }
  }

  if (bySource.size === 0) return undefined;

  const sources: NonNullable<LorcanaCardSnapshot["grantSources"]> = [];
  for (const [sourceCardId, { definitionId, grants }] of bySource) {
    const sourceDef = definitionId ? staticResources.cards.get(definitionId) : undefined;
    const sourceLabel = sourceDef
      ? sourceDef.version
        ? `${sourceDef.name} - ${sourceDef.version}`
        : sourceDef.name
      : sourceCardId;
    sources.push({
      sourceCardId,
      sourceLabel,
      sourceSet: sourceDef?.set,
      sourceCardNumber: sourceDef?.cardNumber,
      sourceInkType: sourceDef?.inkType,
      grants,
    });
  }

  return sources;
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

function normalizeZoneId(zoneKey: string | undefined): LorcanaZoneId {
  const baseZone = zoneKey?.split(":", 1)[0];
  switch (baseZone) {
    case "deck":
    case "hand":
    case "play":
    case "inkwell":
    case "discard":
    case "limbo":
      return baseZone;
    default:
      return "deck";
  }
}

function getReadyState(
  meta: Record<string, unknown> | undefined,
): LorcanaCardSnapshot["readyState"] {
  const state = meta?.state;
  return state === "ready" || state === "exerted" ? state : "unknown";
}

function buildSupplementalCardSnapshot(args: {
  board: LorcanaProjectedBoardView;
  staticResources: MatchStaticResources;
  authoritativeState: AuthoritativeCardStateView;
  cardId: string;
}): LorcanaCardSnapshot | null {
  const { board, staticResources, authoritativeState, cardId } = args;
  const definition = getCardDefinition(staticResources, cardId);
  const indexEntry = authoritativeState.ctx.zones.private.cardIndex[cardId];
  const meta = authoritativeState.ctx.zones.private.cardMeta[cardId];
  if (!definition || !indexEntry) {
    return null;
  }

  const ownerId = indexEntry.ownerID;
  const ownerSide = getSideForOwnerId(board, ownerId) ?? "playerOne";
  const zoneId = normalizeZoneId(indexEntry.zoneKey);
  const cardText = definition.text as LocalizedCardTextSource | undefined;

  return {
    cardId,
    definitionId: definition.id ?? staticResources.instances.get(cardId)?.definitionId ?? cardId,
    isMasked: false,
    label: getCardDisplayName(undefined, definition) ?? cardId,
    ownerId,
    ownerSide,
    zoneId,
    cardType: definition.cardType,
    actionSubtype:
      definition.cardType === "action" ? (definition.actionSubtype ?? undefined) : undefined,
    cost: definition.cost,
    inkType: definition.inkType,
    inkable: definition.inkable,
    text: flattenCardText(cardText),
    textEntries: projectCardTextEntries(cardText),
    strength: definition.cardType === "character" ? definition.strength : undefined,
    baseStrength: definition.cardType === "character" ? definition.strength : undefined,
    willpower:
      definition.cardType === "character" || definition.cardType === "location"
        ? definition.willpower
        : undefined,
    baseWillpower:
      definition.cardType === "character" || definition.cardType === "location"
        ? definition.willpower
        : undefined,
    loreValue:
      definition.cardType === "character" || definition.cardType === "location"
        ? "lore" in definition
          ? definition.lore
          : undefined
        : undefined,
    baseLoreValue:
      definition.cardType === "character" || definition.cardType === "location"
        ? "lore" in definition
          ? definition.lore
          : undefined
        : undefined,
    moveCost: definition.cardType === "location" ? definition.moveCost : undefined,
    classifications: definition.cardType === "character" ? definition.classifications : undefined,
    keywords: [],
    damage: typeof meta?.damage === "number" ? meta.damage : 0,
    readyState: getReadyState(meta),
    isDrying: meta?.isDrying === true,
    facePresentation: "faceUp",
    set: definition.set,
    cardNumber: definition.cardNumber,
    rarity: normalizeRarity(definition.rarity),
  };
}

export function mergeSupplementalScryCardSnapshots(args: {
  board: LorcanaProjectedBoardView;
  staticResources: MatchStaticResources;
  authoritativeState: AuthoritativeCardStateView;
  snapshots: CardSnapshotMap;
}): CardSnapshotMap {
  const { board, staticResources, authoritativeState, snapshots } = args;
  const nextSnapshots: CardSnapshotMap = { ...snapshots };
  const revealedCardIds = new Set<string>();

  for (const effect of [...board.pendingEffects, ...board.bagEffects]) {
    if (effect.selectionContext?.kind !== "scry-selection") {
      continue;
    }

    for (const cardId of effect.selectionContext.revealedCardIds) {
      revealedCardIds.add(cardId);
    }
  }

  for (const cardId of revealedCardIds) {
    if (nextSnapshots[cardId]) {
      continue;
    }

    const snapshot = buildSupplementalCardSnapshot({
      board,
      staticResources,
      authoritativeState,
      cardId,
    });
    if (snapshot) {
      nextSnapshots[cardId] = snapshot;
    }
  }

  return nextSnapshots;
}

function getCardDefinition(
  staticResources: MatchStaticResources,
  cardId: string,
  definitionId?: string,
): LorcanaCardDefinition | undefined {
  const resolvedDefinitionId = definitionId ?? staticResources.instances.get(cardId)?.definitionId;
  return resolvedDefinitionId ? staticResources.cards.get(resolvedDefinitionId) : undefined;
}

export function buildCardSnapshotMap(
  board: LorcanaProjectedBoardView,
  staticResources: MatchStaticResources,
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
      actionSubtype:
        definition?.cardType === "action" ? (definition.actionSubtype ?? undefined) : undefined,
      cardsUnderCount: projectedCard.cardsUnder?.length ?? 0,
      playedViaShift: projectedCard.playedViaShift === true ? true : undefined,
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
      grantSources: buildGrantSources(cardId, projectedCard, staticResources),
      text: flattenCardText(cardText),
      textEntries: mergeTextEntries(
        projectCardTextEntries(cardText),
        projectedCard.grantedAbilityTextEntries,
      ),
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
