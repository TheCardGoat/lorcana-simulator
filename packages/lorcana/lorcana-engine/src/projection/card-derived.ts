import type { CardInstanceId, DeepReadonly, PlayerId } from "#core";

// Re-export the type for consumers
export type { ProjectedLorcanaCardDerived } from "../types/projected-board";
import { getFullName, getKeywordValue as getBaseKeywordValue } from "../card-utils";
import { getTemporaryKeywordValue } from "../runtime-moves/effects/temporary-effects";
import type {
  LorcanaCardDefinition,
  LorcanaCardMeta,
  LorcanaG,
  LorcanaProjectedCard,
  ProjectedLorcanaCardDerived,
} from "../types";
import {
  getActiveStaticClassificationGrants,
  deriveCanBePutInInkwell,
  deriveLore,
  derivePlayCost,
  deriveStrength,
  deriveWillpower,
  getActiveStaticKeywordGrants,
  getActiveStaticSelfKeywordGrants,
  getActiveTemporaryKeywordNames,
  getActiveTemporaryMap,
  getDerivedHasQuestRestriction,
  type DerivedStateContext,
} from "../rules/derived-state";

// Type alias for compatibility, they are structurally identical
type ProjectionState = DerivedStateContext;

function toProjectionCardMeta(
  meta: DeepReadonly<LorcanaCardMeta> | undefined,
): LorcanaCardMeta | undefined {
  if (!meta) {
    return undefined;
  }

  return {
    ...meta,
    cardsUnder: meta.cardsUnder ? [...meta.cardsUnder] : undefined,
    replacementAbilities: meta.replacementAbilities ? [...meta.replacementAbilities] : undefined,
  };
}

// TODO: THe default should probably be null
export function createDefaultProjectedLorcanaCardDerived(args?: {
  definition: LorcanaCardDefinition;
  projection?: LorcanaProjectedCard;
  meta?: LorcanaCardMeta;
}): ProjectedLorcanaCardDerived {
  if (!args) {
    return {};
  }

  const { definition, projection, meta } = args;

  return {
    exerted: projection?.exerted || meta?.state === "exerted",
    drying: projection?.drying ?? meta?.isDrying ?? false,
    damage: projection?.damage ?? meta?.damage ?? 0,
    strength: projection?.strength ?? definition?.strength ?? 0,
    willpower: projection?.willpower ?? definition?.willpower ?? 0,
    lore: projection?.lore ?? definition?.lore ?? 0,
    canBePutInInkwell: projection?.canBePutInInkwell ?? false,
    hasSupport: projection?.hasSupport ?? false,
    hasReckless: projection?.hasReckless ?? false,
    hasRush: projection?.hasRush ?? false,
    hasQuestRestriction: projection?.hasQuestRestriction ?? false,
    classifications: projection?.classifications ?? definition?.classifications ?? [],
    fullName: projection?.fullName ?? (definition ? getFullName(definition) : "FALLBACK NAME"),
    keywords: projection?.keywords ?? [],
    keywordValues: projection?.keywordValues ?? { challenger: 0, resist: 0 },
  };
}

function normalizeNumber(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

export function projectLorcanaCardDerived(args: {
  definition?: LorcanaCardDefinition;
  meta?: LorcanaCardMeta;
  state: ProjectionState;
  cardInstanceId?: CardInstanceId;
  ownerID?: PlayerId;
  controllerID?: PlayerId;
  zoneID?: string;
  actorPlayerId?: PlayerId;
  getDefinitionByInstanceId?: (cardId: CardInstanceId) => LorcanaCardDefinition | undefined;
}): ProjectedLorcanaCardDerived {
  const { definition, meta, state, cardInstanceId, ownerID, controllerID, zoneID, actorPlayerId } =
    args;
  const { getDefinitionByInstanceId } = args;
  const currentTurn = state.ctx.status?.turn ?? 1;
  const derived = createDefaultProjectedLorcanaCardDerived();

  derived.exerted = meta?.state === "exerted";
  derived.drying = Boolean(meta?.isDrying);
  derived.damage = Math.max(0, normalizeNumber(meta?.damage));
  derived.canBePutInInkwell = deriveCanBePutInInkwell({
    definition,
    ownerID,
    zoneID,
    state,
    actorPlayerId,
    getDefinitionByInstanceId,
  });
  derived.hasQuestRestriction = getDerivedHasQuestRestriction(
    meta,
    currentTurn,
    state,
    cardInstanceId,
    getDefinitionByInstanceId,
  );
  derived.strength = deriveStrength(definition, state, cardInstanceId, getDefinitionByInstanceId);
  derived.willpower = deriveWillpower(definition, state, cardInstanceId, getDefinitionByInstanceId);
  derived.lore = deriveLore(definition, state, cardInstanceId, getDefinitionByInstanceId);
  derived.playCost = derivePlayCost({
    definition,
    state,
    cardInstanceId,
    ownerID,
    zoneID,
    actorPlayerId,
    getDefinitionByInstanceId,
  });
  const staticClassifications = getActiveStaticClassificationGrants({
    definition,
    state,
    controllerId: controllerID ?? ownerID,
    zoneID,
    cardInstanceId,
    getDefinitionByInstanceId,
  });
  derived.classifications = [
    ...new Set([...(definition?.classifications ?? []), ...staticClassifications]),
  ].sort((left, right) => left.localeCompare(right));
  derived.fullName = definition ? getFullName(definition) : "";

  const baseKeywords = definition
    ? (definition.abilities ?? [])
        .filter((ability) => ability.type === "keyword" && typeof ability.keyword === "string")
        .map((ability) => ability.keyword)
    : [];
  const temporaryKeywords = getActiveTemporaryKeywordNames(meta, currentTurn);
  const staticSelfKeywords = getActiveStaticSelfKeywordGrants({
    definition,
    state,
    controllerId: controllerID ?? ownerID,
    zoneID,
    cardInstanceId,
    getDefinitionByInstanceId,
  });
  const staticKeywords = getActiveStaticKeywordGrants({
    definition,
    state,
    controllerId: controllerID ?? ownerID,
    zoneID,
    cardInstanceId,
    getDefinitionByInstanceId,
  });
  derived.keywords = [
    ...new Set([
      ...baseKeywords,
      ...temporaryKeywords,
      ...staticSelfKeywords.keywords,
      ...staticKeywords.keywords,
    ]),
  ].sort((left, right) => left.localeCompare(right));
  derived.hasSupport = derived.keywords.includes("Support");
  derived.hasReckless = derived.keywords.includes("Reckless");
  derived.hasRush = derived.keywords.includes("Rush");
  derived.hasEvasive = derived.keywords.includes("Evasive");

  const baseChallenger = definition ? (getBaseKeywordValue(definition, "Challenger") ?? 0) : 0;
  const baseResist = definition ? (getBaseKeywordValue(definition, "Resist") ?? 0) : 0;
  derived.keywordValues = {
    challenger:
      baseChallenger +
      getTemporaryKeywordValue(meta, currentTurn, "Challenger") +
      (staticSelfKeywords.values.Challenger ?? 0) +
      (staticKeywords.values.Challenger ?? 0),
    resist:
      baseResist +
      getTemporaryKeywordValue(meta, currentTurn, "Resist") +
      (staticSelfKeywords.values.Resist ?? 0) +
      (staticKeywords.values.Resist ?? 0),
  };
  derived.temporaryAbilities = getActiveTemporaryMap(
    meta?.temporaryAbilities,
    meta?.temporaryAbilityStarts,
    currentTurn,
  );
  derived.temporaryAbilityStarts = derived.temporaryAbilities
    ? meta?.temporaryAbilityStarts
    : undefined;
  derived.temporaryRestrictions = getActiveTemporaryMap(
    meta?.temporaryRestrictions,
    meta?.temporaryRestrictionStarts,
    currentTurn,
  );
  derived.temporaryRestrictionStarts = derived.temporaryRestrictions
    ? meta?.temporaryRestrictionStarts
    : undefined;

  return derived;
}

// Method used to take a short version of LorcanaProjectedCard and turn it back to full form
// We omit defaults while serialising to save space, we use this method to restore defaults when we need to use the full form of LorcanaProjectedCard (e.g. for card text generation)
export function restoreProjectedCard({
  definition,
  projected,
}: {
  definition: LorcanaCardDefinition;
  projected: LorcanaProjectedCard;
}): LorcanaProjectedCard {
  const restored = createDefaultProjectedLorcanaCardDerived({ definition, projection: projected });

  return {
    ...projected,
    ...restored,
    // Add method accessors for test compatibility
    getStrength: function (this: LorcanaProjectedCard): number {
      return this.strength ?? 0;
    },
    getWillpower: function (this: LorcanaProjectedCard): number {
      return this.willpower ?? 0;
    },
  };
}
