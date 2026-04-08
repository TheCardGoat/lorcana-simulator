import type { CardInstanceId, PlayerId } from "#core";
import type { CardRuntimeReadAPI, DeepReadonly, FrameworkReadAPI } from "../../../core/runtime";
import type {
  AmountExpr,
  CardFilter,
  Condition,
  LorcanaCard,
  ScryCardOrdering,
} from "@tcg/lorcana-types";
import type { CardPlayedPayload, LorcanaG, PendingActionResolutionInput } from "../../../types";
import type {
  ChoiceResolutionSelectionContext,
  NameCardResolutionSelectionContext,
  OptionalResolutionSelectionContext,
  ResolutionSelectionContext,
  ResolutionSelectionCurrentSelection,
  ResolutionSelectionDestination,
  ResolutionSelectionOption,
  ScryResolutionSelectionContext,
  TargetResolutionSelectionContext,
} from "../../../types";
import { analyzeEffectTargets } from "../../../targeting/runtime";
import {
  analyzeTargetSelectionAvailabilityFromAnalysis,
  normalizeSelectedTargets,
  resolveCandidateTargets,
  normalizeTargetDescriptor,
  resolveEffectTargets,
  resolveSelectedPlayerIds,
  resolveTargetPlayerIds,
} from "../../../targeting/runtime";
import { evaluateActionCondition } from "./action-condition-evaluator";
import {
  effectTargetUsesSelectionContext,
  getEffectTargetSelectionInput,
  getCombinedSelectionInput,
  getCurrentSelectionInput,
} from "./selection-state";

export type ResolutionSelectionRuntimeContext = {
  G?: DeepReadonly<LorcanaG>;
  playerId?: PlayerId;
  framework: FrameworkReadAPI;
  cards: CardRuntimeReadAPI;
};

type ResolutionSelectionBuildBase = {
  origin: "pending-effect" | "bag";
  requestId: string;
  sourceCardId: CardInstanceId;
  chooserId: PlayerId;
  cardPlayed: CardPlayedPayload;
  resolutionInput: PendingActionResolutionInput;
  ctx: ResolutionSelectionRuntimeContext;
};

type ResolutionSelectionBuildArgs = ResolutionSelectionBuildBase & {
  effect: unknown;
  condition?: Condition;
  legalChoiceIndices?: number[];
  originatesFromOptional?: boolean;
};

function asRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return null;
  }

  return value as Record<string, unknown>;
}

function getRecordString(record: Record<string, unknown> | null, key: string): string | undefined {
  const value = record?.[key];
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

function getRecordNumber(record: Record<string, unknown> | null, key: string): number | undefined {
  const value = record?.[key];
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

function getStringArray(record: Record<string, unknown> | null, key: string): string[] {
  const value = record?.[key];
  return Array.isArray(value)
    ? value.filter((entry): entry is string => typeof entry === "string" && entry.length > 0)
    : [];
}

function normalizeCardFilters(value: unknown): CardFilter[] {
  if (Array.isArray(value)) {
    return value.filter((entry): entry is CardFilter =>
      Boolean(entry && typeof entry === "object" && !Array.isArray(entry)),
    );
  }

  if (value && typeof value === "object") {
    return [value as CardFilter];
  }

  return [];
}

function getOptionalBoolean(record: Record<string, unknown>, key: string): boolean | undefined {
  const value = record[key];
  return typeof value === "boolean" ? value : undefined;
}

function getOptionalString<T extends string>(
  record: Record<string, unknown>,
  key: string,
): T | undefined {
  const value = record[key];
  return typeof value === "string" && value.length > 0 ? (value as T) : undefined;
}

function getOptionalAmountExpr(
  record: Record<string, unknown>,
  key: string,
): AmountExpr | undefined {
  const value = record[key];
  if (typeof value === "number") {
    return value;
  }

  return value && typeof value === "object" ? (value as AmountExpr) : undefined;
}

function normalizeCurrentSelection(
  resolutionInput: PendingActionResolutionInput,
): ResolutionSelectionCurrentSelection {
  const currentSelection: ResolutionSelectionCurrentSelection = {};
  const currentTargets = getCurrentSelectionInput(resolutionInput);

  if (typeof currentTargets === "string") {
    currentSelection.targets = [currentTargets];
  } else if (Array.isArray(currentTargets) && currentTargets.length > 0) {
    currentSelection.targets = currentTargets.filter(
      (target): target is CardInstanceId | PlayerId =>
        typeof target === "string" && target.length > 0,
    );
  }

  if (
    typeof resolutionInput.amount === "number" &&
    Number.isFinite(resolutionInput.amount) &&
    resolutionInput.amount >= 0
  ) {
    currentSelection.amount = Math.floor(resolutionInput.amount);
  }

  if (
    typeof resolutionInput.choiceIndex === "number" &&
    Number.isInteger(resolutionInput.choiceIndex)
  ) {
    currentSelection.choiceIndex = resolutionInput.choiceIndex;
  }

  if (typeof resolutionInput.resolveOptional === "boolean") {
    currentSelection.resolveOptional = resolutionInput.resolveOptional;
  }

  if (
    typeof resolutionInput.namedCard === "string" &&
    resolutionInput.namedCard.trim().length > 0
  ) {
    currentSelection.namedCard = resolutionInput.namedCard.trim();
  }

  if (Array.isArray(resolutionInput.destinations) && resolutionInput.destinations.length > 0) {
    currentSelection.destinations = resolutionInput.destinations.reduce<
      ResolutionSelectionDestination[]
    >((destinations, destination) => {
      if (!destination || typeof destination.zone !== "string" || destination.zone.length === 0) {
        return destinations;
      }

      const cards = Array.isArray(destination.cards)
        ? destination.cards.filter(
            (cardId): cardId is CardInstanceId => typeof cardId === "string" && cardId.length > 0,
          )
        : typeof destination.cards === "string" && destination.cards.length > 0
          ? [destination.cards]
          : [];
      if (cards.length === 0) {
        return destinations;
      }

      destinations.push({
        zone: destination.zone,
        cards,
      });
      return destinations;
    }, []);
  }

  return currentSelection;
}

function resolveDefaultTargetChooserId(
  ctx: ResolutionSelectionRuntimeContext,
  cardPlayed: CardPlayedPayload,
  effect: Record<string, unknown>,
  resolutionInput: PendingActionResolutionInput,
): PlayerId {
  const chosenBy = effect.chosenBy;
  if (chosenBy === "you") {
    return cardPlayed.playerId;
  }

  if (chosenBy === "opponent") {
    return (
      ctx.framework.state.playerIds.find((playerId) => playerId !== cardPlayed.playerId) ??
      cardPlayed.playerId
    );
  }

  if (chosenBy === "TARGET") {
    const selectedTargets =
      normalizeSelectedTargets(getCombinedSelectionInput(resolutionInput)) ?? [];
    const selectedPlayer = ctx.framework.state.playerIds.find((playerId) =>
      selectedTargets.some((target) => String(target) === String(playerId)),
    );
    if (selectedPlayer) {
      return selectedPlayer;
    }

    const selectedCardOwner = selectedTargets
      .map((target) => ctx.framework.zones.getCardOwner(target))
      .find((ownerId): ownerId is PlayerId => typeof ownerId === "string" && ownerId.length > 0);
    if (selectedCardOwner) {
      return selectedCardOwner;
    }
  }

  return ctx.playerId ?? cardPlayed.playerId;
}

function resolveChoiceChooserId(
  ctx: ResolutionSelectionRuntimeContext,
  cardPlayed: CardPlayedPayload,
  effect: Record<string, unknown>,
  resolutionInput: PendingActionResolutionInput,
): PlayerId {
  if (effect.chooser) {
    const selectedTargets =
      normalizeSelectedTargets(getCombinedSelectionInput(resolutionInput)) ?? [];

    if (effect.chooser === "CHOSEN_PLAYER") {
      return (
        resolveSelectedPlayerIds(
          ctx.framework.state.playerIds,
          getCombinedSelectionInput(resolutionInput),
        )?.[0] ?? cardPlayed.playerId
      );
    }

    if (effect.chooser === "CARD_OWNER") {
      return (
        selectedTargets
          .map((target) => ctx.framework.zones.getCardOwner(target))
          .find(
            (ownerId): ownerId is PlayerId => typeof ownerId === "string" && ownerId.length > 0,
          ) ?? cardPlayed.playerId
      );
    }

    return (
      resolveTargetPlayerIds(ctx, effect.chooser, {
        controllerId: cardPlayed.playerId,
        sourceCardId: cardPlayed.cardId,
        selectedPlayerIds: resolveSelectedPlayerIds(
          ctx.framework.state.playerIds,
          getCombinedSelectionInput(resolutionInput),
        ),
      })[0] ?? cardPlayed.playerId
    );
  }

  if (effect.chosenBy === "opponent") {
    return (
      ctx.framework.state.playerIds.find((playerId) => playerId !== cardPlayed.playerId) ??
      cardPlayed.playerId
    );
  }

  if (effect.chosenBy === "TARGET") {
    const selectedTargets =
      normalizeSelectedTargets(getCombinedSelectionInput(resolutionInput)) ?? [];
    const selectedPlayer = ctx.framework.state.playerIds.find((playerId) =>
      selectedTargets.some((target) => String(target) === String(playerId)),
    );
    if (selectedPlayer) {
      return selectedPlayer;
    }

    const selectedCardOwner = selectedTargets
      .map((target) => ctx.framework.zones.getCardOwner(target))
      .find((ownerId): ownerId is PlayerId => typeof ownerId === "string" && ownerId.length > 0);
    if (selectedCardOwner) {
      return selectedCardOwner;
    }
  }

  return cardPlayed.playerId;
}

function resolveOptionalChooserId(
  ctx: ResolutionSelectionRuntimeContext,
  cardPlayed: CardPlayedPayload,
  effect: Record<string, unknown>,
  resolutionInput: PendingActionResolutionInput,
): PlayerId {
  if (!effect.chooser) {
    return cardPlayed.playerId;
  }

  const selectedTargets =
    normalizeSelectedTargets(getCombinedSelectionInput(resolutionInput)) ?? [];

  if (effect.chooser === "CHOSEN_PLAYER") {
    return (
      resolveSelectedPlayerIds(
        ctx.framework.state.playerIds,
        getCombinedSelectionInput(resolutionInput),
      )?.[0] ?? cardPlayed.playerId
    );
  }

  if (effect.chooser === "CARD_OWNER") {
    return (
      selectedTargets
        .map((target) => ctx.framework.zones.getCardOwner(target))
        .find(
          (ownerId): ownerId is PlayerId => typeof ownerId === "string" && ownerId.length > 0,
        ) ?? cardPlayed.playerId
    );
  }

  return (
    resolveTargetPlayerIds(ctx, effect.chooser, {
      controllerId: cardPlayed.playerId,
      sourceCardId: cardPlayed.cardId,
      selectedPlayerIds: resolveSelectedPlayerIds(
        ctx.framework.state.playerIds,
        getCombinedSelectionInput(resolutionInput),
      ),
    })[0] ?? cardPlayed.playerId
  );
}

function buildChosenPlayerTargetSelectionContext(
  args: ResolutionSelectionBuildBase & {
    chooserId?: PlayerId;
    originatesFromOptional?: boolean;
    canDeclineSelection?: boolean;
  },
): TargetResolutionSelectionContext {
  return {
    origin: args.origin,
    requestId: args.requestId,
    kind: "target-selection",
    sourceCardId: args.sourceCardId,
    chooserId: args.chooserId ?? args.cardPlayed.playerId,
    currentSelection: normalizeCurrentSelection(args.resolutionInput),
    submitField: "targets",
    originatesFromOptional: args.originatesFromOptional,
    canDeclineSelection: args.canDeclineSelection,
    targetDsl: [{ selector: "chosen", count: 1 }],
    cardCandidateIds: [],
    playerCandidateIds: [...args.ctx.framework.state.playerIds],
    allowedZones: [],
    minSelections: 1,
    maxSelections: 1,
    ordered: false,
    autoRejected: false,
  };
}

function buildChoiceOptions(
  effect: Record<string, unknown>,
  legalChoiceIndices?: number[],
): ResolutionSelectionOption[] {
  const rawOptions = Array.isArray(effect.options)
    ? effect.options
    : Array.isArray(effect.choices)
      ? effect.choices
      : [];
  const optionLabels = Array.isArray(effect.optionLabels)
    ? effect.optionLabels.filter(
        (label): label is string => typeof label === "string" && label.trim().length > 0,
      )
    : [];
  const legalChoiceSet =
    legalChoiceIndices && legalChoiceIndices.length > 0 ? new Set(legalChoiceIndices) : null;

  return rawOptions.map((_, index) => ({
    index,
    label: optionLabels[index] ?? `Option ${index + 1}`,
    legal: legalChoiceSet ? legalChoiceSet.has(index) : true,
  }));
}

function buildChoiceSelectionContext(
  args: ResolutionSelectionBuildBase & {
    effect: Record<string, unknown>;
    legalChoiceIndices?: number[];
  },
): ChoiceResolutionSelectionContext {
  return {
    origin: args.origin,
    requestId: args.requestId,
    kind: "choice-selection",
    sourceCardId: args.sourceCardId,
    chooserId: args.chooserId,
    currentSelection: normalizeCurrentSelection(args.resolutionInput),
    submitField: "choiceIndex",
    options: buildChoiceOptions(args.effect, args.legalChoiceIndices),
  };
}

function buildOptionalSelectionContext(
  args: ResolutionSelectionBuildBase,
): OptionalResolutionSelectionContext {
  return {
    origin: args.origin,
    requestId: args.requestId,
    kind: "optional-selection",
    sourceCardId: args.sourceCardId,
    chooserId: args.chooserId,
    currentSelection: normalizeCurrentSelection(args.resolutionInput),
    submitField: "resolveOptional",
    acceptLabel: "Yes",
    rejectLabel: "No",
  };
}

function buildNameCardSelectionContext(
  args: ResolutionSelectionBuildBase,
): NameCardResolutionSelectionContext {
  return {
    origin: args.origin,
    requestId: args.requestId,
    kind: "name-card-selection",
    sourceCardId: args.sourceCardId,
    chooserId: args.chooserId,
    currentSelection: normalizeCurrentSelection(args.resolutionInput),
    submitField: "namedCard",
    searchMode: "lorcana-catalog",
  };
}

function buildScrySelectionContext(
  args: ResolutionSelectionBuildBase & {
    effect: Record<string, unknown>;
  },
): ScryResolutionSelectionContext | undefined {
  const eventSnapshot = asRecord(args.resolutionInput.eventSnapshot ?? null);
  const revealedCardIds = getStringArray(eventSnapshot, "revealedCardIds") as CardInstanceId[];
  // `amount` may be a static number or a dynamic AmountExpr object (e.g. source-attribute).
  // When cards are already revealed (stored in eventSnapshot), their count IS the resolved
  // amount — use it as the fallback so dynamic-amount scry effects (like Pete's FOREBODING
  // GLANCE which uses { type: "source-attribute", attribute: "cards-under-them" }) don't
  // return undefined here and silently block the scry-selection UI.
  const amount = getRecordNumber(args.effect, "amount") ?? revealedCardIds.length;
  const destinations = Array.isArray(args.effect.destinations)
    ? args.effect.destinations
        .map((destination) => asRecord(destination))
        .filter((destination): destination is Record<string, unknown> => destination !== null)
    : [];

  if (revealedCardIds.length === 0 || !amount || destinations.length === 0) {
    return undefined;
  }

  const revealedCards = revealedCardIds.map((cardId) => {
    const definition = args.ctx.cards.getDefinition(cardId);
    const label =
      definition?.name && typeof definition.name === "string"
        ? `${definition.name}${definition.version ? ` - ${definition.version}` : ""}`
        : cardId;

    return {
      cardId,
      label,
      cardType: definition?.cardType,
      actionSubtype:
        definition?.cardType === "action" ? (definition.actionSubtype ?? undefined) : undefined,
      cost: typeof definition?.cost === "number" ? definition.cost : undefined,
      classifications:
        definition?.cardType === "character" && Array.isArray(definition.classifications)
          ? [...definition.classifications]
          : undefined,
    };
  });

  return {
    origin: args.origin,
    requestId: args.requestId,
    kind: "scry-selection",
    sourceCardId: args.sourceCardId,
    chooserId: args.chooserId,
    currentSelection: normalizeCurrentSelection(args.resolutionInput),
    submitField: "destinations",
    amount,
    revealedCardIds,
    revealedCards,
    destinationRules: destinations.map((destination, index) => ({
      id: `${args.requestId}:${destination.zone ?? "destination"}:${index}`,
      zone: String(destination.zone),
      min: getRecordNumber(destination, "min") ?? 0,
      max: getRecordNumber(destination, "max") ?? null,
      remainder: destination.remainder === true,
      label: getRecordString(destination, "label"),
      filters: normalizeCardFilters(destination.filters ?? destination.filter),
      playFilters: normalizeCardFilters(destination.playFilters ?? destination.playFilter),
      ordering: getOptionalString<ScryCardOrdering>(destination, "ordering"),
      reveal: destination.reveal === true,
      exclusiveGroup: getRecordString(destination, "exclusiveGroup"),
      cost: getOptionalString<"free" | "reduced">(destination, "cost"),
      reducedBy: getOptionalAmountExpr(destination, "reducedBy"),
      entersExerted: getOptionalBoolean(destination, "entersExerted"),
      grantsRush: getOptionalBoolean(destination, "grantsRush"),
      banishAtEndOfTurn: getOptionalBoolean(destination, "banishAtEndOfTurn"),
      exerted: getOptionalBoolean(destination, "exerted"),
      facedown: getOptionalBoolean(destination, "facedown"),
    })),
  };
}

function buildGenericTargetSelectionContext(
  args: ResolutionSelectionBuildBase & {
    effect: unknown;
    kind: "target-selection" | "discard-choice";
    ordered?: boolean;
    originatesFromOptional?: boolean;
    canDeclineSelection?: boolean;
  },
): TargetResolutionSelectionContext | undefined {
  const chooserScopedCtx: ResolutionSelectionRuntimeContext = {
    ...args.ctx,
    playerId: args.chooserId,
  };
  const effectRecord = asRecord(args.effect);
  const analysis = analyzeEffectTargets(
    args.effect,
    args.cardPlayed.playerId,
    chooserScopedCtx,
    args.sourceCardId,
    {
      includeDeferredChosenSelections: true,
    },
  );
  const fullCurrentSelection = normalizeCurrentSelection(args.resolutionInput);
  const currentSelection: ResolutionSelectionCurrentSelection = {
    ...fullCurrentSelection,
  };
  if (!currentSelection.targets || currentSelection.targets.length === 0) {
    delete currentSelection.targets;
  }
  const currentTargetCount = currentSelection.targets?.length ?? 0;
  const effectTarget = effectRecord?.target;
  const effectTargetRequiresSelection = effectTargetUsesSelectionContext(effectTarget);
  const effectTargetSelection = getEffectTargetSelectionInput(effectTarget, args.resolutionInput);
  const runtimeCardCandidates =
    effectTarget !== undefined && effectTargetRequiresSelection
      ? resolveCandidateTargets(
          chooserScopedCtx,
          args.cardPlayed,
          normalizeTargetDescriptor(effectTarget),
          {
            controllerId: args.cardPlayed.playerId,
            sourceCardId: args.sourceCardId,
            selectedTargets: normalizeSelectedTargets(effectTargetSelection),
            eventSnapshot: args.resolutionInput.eventSnapshot,
          },
        )
      : analysis.cardCandidates;
  const runtimePlayerCandidates =
    effectTarget !== undefined && effectTargetRequiresSelection
      ? resolveTargetPlayerIds(chooserScopedCtx, effectTarget, {
          controllerId: args.cardPlayed.playerId,
          sourceCardId: args.sourceCardId,
          selectedPlayerIds: resolveSelectedPlayerIds(
            chooserScopedCtx.framework.state.playerIds,
            effectTargetSelection,
          ),
        })
      : analysis.playerCandidates;
  const resolvedContextCardTargets =
    effectTarget !== undefined && effectTargetRequiresSelection
      ? (resolveEffectTargets(
          chooserScopedCtx,
          args.cardPlayed,
          effectTarget,
          effectTargetSelection,
          args.resolutionInput.eventSnapshot,
        ) ?? [])
      : [];
  const resolvedContextPlayerTargets =
    effectTarget !== undefined && effectTargetRequiresSelection
      ? resolveTargetPlayerIds(chooserScopedCtx, effectTarget, {
          controllerId: args.cardPlayed.playerId,
          sourceCardId: args.sourceCardId,
          selectedPlayerIds: resolveSelectedPlayerIds(
            chooserScopedCtx.framework.state.playerIds,
            effectTargetSelection,
          ),
        })
      : [];
  const cardCandidates = [...new Set(runtimeCardCandidates)];
  const playerCandidates = [...new Set(runtimePlayerCandidates)];
  const availability = analyzeTargetSelectionAvailabilityFromAnalysis(args.effect, analysis);
  const allowEmptyResolution =
    availability.shouldAutoRejectForNoValidTargets &&
    !availability.allowsExplicitEmptyTargetSelection &&
    !availability.canSatisfyRequiredSelection;
  if (allowEmptyResolution && args.resolutionInput.targetSelectionResolved) {
    return undefined;
  }
  const hasCandidates = cardCandidates.length > 0 || playerCandidates.length > 0;
  if (
    currentTargetCount === 0 &&
    effectTargetRequiresSelection &&
    (resolvedContextCardTargets.length > 0 || resolvedContextPlayerTargets.length > 0)
  ) {
    return undefined;
  }
  if (!analysis.requiresExplicitSelection) {
    return undefined;
  }
  if (!hasCandidates && !allowEmptyResolution) {
    return undefined;
  }
  const minSelections = allowEmptyResolution ? 0 : analysis.minSelections;
  const requiredSelectionCount = Math.max(1, minSelections);
  const hasEnoughSelections = currentTargetCount >= requiredSelectionCount;
  const hasCompleteOrderedSelection =
    args.ordered === true &&
    analysis.maxSelections > 0 &&
    currentTargetCount >= analysis.maxSelections;
  if (
    !allowEmptyResolution &&
    hasEnoughSelections &&
    (args.ordered !== true || hasCompleteOrderedSelection)
  ) {
    return undefined;
  }

  return {
    origin: args.origin,
    requestId: args.requestId,
    kind: args.kind,
    sourceCardId: args.sourceCardId,
    chooserId: args.chooserId,
    currentSelection,
    submitField: "targets",
    originatesFromOptional: args.originatesFromOptional,
    canDeclineSelection: args.canDeclineSelection,
    targetDsl: [...analysis.targetDsl],
    cardCandidateIds: cardCandidates,
    playerCandidateIds: playerCandidates,
    allowedZones: [...analysis.allowedZones],
    minSelections,
    maxSelections: analysis.maxSelections,
    ordered: args.ordered === true,
    autoRejected: allowEmptyResolution,
  };
}

type PlayCardEffectRecord = {
  from?: unknown;
  target?: unknown;
  cardType?: unknown;
  costRestriction?: unknown;
  filter?: unknown;
};

function isNameRestrictedPlayCard(effectRecord: Record<string, unknown>): boolean {
  const filter = effectRecord.filter;
  if (!filter || typeof filter !== "object" || Array.isArray(filter)) {
    return false;
  }
  const filterRecord = filter as Record<string, unknown>;
  return (
    typeof filterRecord.name === "string" ||
    filterRecord.sameNameAsChosenCard === true ||
    filterRecord.sameInstanceAsSource === true
  );
}

function isContextDependentPlayCardFilter(filter: unknown): boolean {
  if (!filter || typeof filter !== "object" || Array.isArray(filter)) {
    return false;
  }
  const f = filter as Record<string, unknown>;
  return (
    f.excludeChosenCard === true ||
    f.sameNameAsChosenCard === true ||
    f.maxCost === "chosen-card-cost" ||
    (typeof f.maxCost === "object" &&
      f.maxCost !== null &&
      (f.maxCost as Record<string, unknown>).type === "chosen-card-cost")
  );
}

function getEligibleHandCardsForPlayCard(
  args: ResolutionSelectionBuildArgs,
  effectRecord: PlayCardEffectRecord,
): CardInstanceId[] {
  const from = typeof effectRecord.from === "string" ? effectRecord.from : "hand";
  if (from !== "hand") {
    return [];
  }

  // Context-dependent filters rely on prior sequence steps; let existing logic handle them.
  if (isContextDependentPlayCardFilter(effectRecord.filter)) {
    return [];
  }

  // Resolve the target player(s) — mirrors the logic in resolvePlayCardEffect execution.
  const targetPlayerIds =
    typeof effectRecord.target === "string"
      ? resolveTargetPlayerIds(args.ctx, effectRecord.target, {
          controllerId: args.cardPlayed.playerId,
          sourceCardId: args.sourceCardId,
        })
      : [];
  const resolvedPlayerIds =
    targetPlayerIds.length > 0 ? targetPlayerIds : [args.cardPlayed.playerId];

  const handCards: CardInstanceId[] = [];
  for (const playerId of resolvedPlayerIds) {
    const zoneCards = args.ctx.framework.zones.getCards({
      zone: "hand",
      playerId,
    }) as CardInstanceId[];
    handCards.push(...zoneCards);
  }

  return handCards.filter((cardId) => {
    const definition = args.ctx.cards.getDefinition(cardId) as
      | { cost?: number; cardType?: string; classifications?: string[] }
      | undefined;
    if (!definition) {
      return false;
    }

    // Top-level card type constraint (e.g. effect.cardType = "character")
    const cardTypeConstraint = effectRecord.cardType;
    if (typeof cardTypeConstraint === "string" && definition.cardType !== cardTypeConstraint) {
      return false;
    }

    // Cost restriction (e.g. costRestriction: { comparison: "less-or-equal", value: 2 })
    const costRestriction = effectRecord.costRestriction;
    if (costRestriction && typeof costRestriction === "object" && !Array.isArray(costRestriction)) {
      const { comparison, value } = costRestriction as { comparison?: unknown; value?: unknown };
      if (typeof comparison === "string" && typeof value === "number") {
        const cardCost = Number(definition.cost ?? Number.NaN);
        if (!Number.isFinite(cardCost)) {
          return false;
        }
        if (comparison === "less-or-equal" && cardCost > value) return false;
        if (comparison === "less-than" && cardCost >= value) return false;
        if (comparison === "equal" && cardCost !== value) return false;
        if (comparison === "greater-than" && cardCost <= value) return false;
        if (comparison === "greater-or-equal" && cardCost < value) return false;
      }
    }

    // Filter-level card type, max cost, and classification constraints (static values only)
    const filter = effectRecord.filter;
    if (filter && typeof filter === "object" && !Array.isArray(filter)) {
      const filterRecord = filter as Record<string, unknown>;
      if (
        typeof filterRecord.cardType === "string" &&
        definition.cardType !== filterRecord.cardType
      ) {
        return false;
      }
      if (typeof filterRecord.maxCost === "number") {
        const cardCost = Number(definition.cost ?? Number.NaN);
        if (!Number.isFinite(cardCost) || cardCost > filterRecord.maxCost) {
          return false;
        }
      }
      if (
        typeof filterRecord.classification === "string" &&
        !(definition.classifications ?? []).includes(filterRecord.classification)
      ) {
        return false;
      }
    }

    return true;
  });
}

function buildPlayCardSelectionContext(
  args: ResolutionSelectionBuildArgs,
  effectRecord: Record<string, unknown>,
  options?: {
    originatesFromOptional?: boolean;
    canDeclineSelection?: boolean;
  },
): TargetResolutionSelectionContext | undefined {
  // Only build hand-picker selection context in the bag resolution path.
  // Direct play-card executions (action cards, sequence steps) use the existing
  // auto-selection fallback in play-card-effect.ts.
  if (args.origin !== "bag") {
    return undefined;
  }

  // If the effect is name-restricted (filter.name / sameNameAsChosenCard),
  // the card to play is unambiguous — let the engine auto-select.
  if (isNameRestrictedPlayCard(effectRecord)) {
    return undefined;
  }

  // If a target has already been selected, proceed to execution.
  const alreadySelected =
    normalizeSelectedTargets(getCurrentSelectionInput(args.resolutionInput)) ?? [];
  if (alreadySelected.length > 0) {
    return undefined;
  }

  const eligibleCards = getEligibleHandCardsForPlayCard(args, effectRecord as PlayCardEffectRecord);
  if (eligibleCards.length === 0) {
    return undefined;
  }

  return {
    origin: args.origin,
    requestId: args.requestId,
    kind: "target-selection",
    sourceCardId: args.sourceCardId,
    chooserId: args.chooserId,
    currentSelection: normalizeCurrentSelection(args.resolutionInput),
    submitField: "targets",
    originatesFromOptional: options?.originatesFromOptional,
    canDeclineSelection: options?.canDeclineSelection,
    targetDsl: [],
    cardCandidateIds: eligibleCards,
    playerCandidateIds: [],
    allowedZones: ["hand"],
    minSelections: 1,
    maxSelections: 1,
    ordered: false,
    autoRejected: false,
  };
}

function requiresTargetOrdering(
  ctx: ResolutionSelectionRuntimeContext,
  cardPlayed: CardPlayedPayload,
  effect: Record<string, unknown>,
  resolutionInput: PendingActionResolutionInput,
): boolean {
  if (effect.type !== "put-on-bottom" || effect.ordering !== "player-choice") {
    return false;
  }

  const candidateTargets =
    resolveEffectTargets(
      ctx,
      cardPlayed,
      effect.target,
      getCombinedSelectionInput(resolutionInput),
    ) ?? [];
  if (candidateTargets.length <= 1) {
    return false;
  }

  const selectedTargets = normalizeSelectedTargets(getCurrentSelectionInput(resolutionInput)) ?? [];
  const candidateSet = new Set(candidateTargets);
  return !(
    selectedTargets.length === candidateTargets.length &&
    new Set(selectedTargets).size === candidateTargets.length &&
    selectedTargets.every((targetId) => candidateSet.has(targetId))
  );
}

function buildImmediateSelectionContext(
  args: ResolutionSelectionBuildArgs,
): ResolutionSelectionContext | undefined {
  const effectRecord = asRecord(args.effect);
  if (!effectRecord) {
    return undefined;
  }

  if (effectRecord.type === "sequence") {
    const nestedEffects = Array.isArray(effectRecord.steps)
      ? effectRecord.steps
      : Array.isArray(effectRecord.effects)
        ? effectRecord.effects
        : [];
    // Only return a selection context if the FIRST step needs immediate selection.
    // If the first step executes without selection (e.g. draw), the sequence must
    // execute directly — subsequent steps that need targets (e.g. discard) will
    // be queued as pending effects by the sequence execution pipeline.
    if (nestedEffects.length === 0) {
      return undefined;
    }
    return buildImmediateSelectionContext({
      ...args,
      effect: nestedEffects[0],
    });
  }

  if (effectRecord.type === "conditional") {
    const conditionMet = evaluateActionCondition(
      args.condition ?? (effectRecord.condition as Condition | undefined),
      args.ctx as never,
      args.cardPlayed,
      args.resolutionInput as never,
    );
    const nextEffect = conditionMet
      ? (effectRecord.then ?? effectRecord.effect ?? effectRecord.ifTrue)
      : (effectRecord.else ?? effectRecord.ifFalse);
    return nextEffect
      ? buildImmediateSelectionContext({
          ...args,
          effect: nextEffect,
        })
      : undefined;
  }

  if (effectRecord.type === "optional") {
    if (effectRecord.chooser === "CHOSEN_PLAYER") {
      const selectedPlayers = resolveSelectedPlayerIds(
        args.ctx.framework.state.playerIds,
        getCombinedSelectionInput(args.resolutionInput),
      );
      if ((selectedPlayers?.length ?? 0) === 0) {
        return buildChosenPlayerTargetSelectionContext({
          ...args,
          chooserId: args.chooserId,
          originatesFromOptional: true,
          canDeclineSelection: true,
        });
      }
    }

    const chooserId = resolveOptionalChooserId(
      args.ctx,
      args.cardPlayed,
      effectRecord,
      args.resolutionInput,
    );
    if (typeof args.resolutionInput.resolveOptional !== "boolean") {
      const immediateContext = effectRecord.effect
        ? buildImmediateSelectionContext({
            ...args,
            effect: effectRecord.effect,
            chooserId,
          })
        : undefined;
      if (
        immediateContext &&
        immediateContext.kind === "target-selection" &&
        immediateContext.currentSelection.resolveOptional === undefined
      ) {
        return {
          ...immediateContext,
          originatesFromOptional: true,
          canDeclineSelection: true,
        };
      }
      return buildOptionalSelectionContext({
        ...args,
        chooserId,
      });
    }
    if (!args.resolutionInput.resolveOptional) {
      return undefined;
    }

    return effectRecord.effect
      ? buildImmediateSelectionContext({
          ...args,
          effect: effectRecord.effect,
          chooserId,
          originatesFromOptional: true,
        })
      : undefined;
  }

  if (effectRecord.type === "choice" || effectRecord.type === "or") {
    if (effectRecord.chooser === "CHOSEN_PLAYER") {
      const selectedPlayers = resolveSelectedPlayerIds(
        args.ctx.framework.state.playerIds,
        getCombinedSelectionInput(args.resolutionInput),
      );
      if ((selectedPlayers?.length ?? 0) === 0) {
        return buildChosenPlayerTargetSelectionContext({
          ...args,
          chooserId: args.chooserId,
          originatesFromOptional: args.originatesFromOptional,
        });
      }
    }

    const chooserId = resolveChoiceChooserId(
      args.ctx,
      args.cardPlayed,
      effectRecord,
      args.resolutionInput,
    );
    const options = Array.isArray(effectRecord.options)
      ? effectRecord.options
      : Array.isArray(effectRecord.choices)
        ? effectRecord.choices
        : [];
    const rawChoiceIndex = args.resolutionInput.choiceIndex;
    if (
      options.length > 0 &&
      (typeof rawChoiceIndex !== "number" ||
        !Number.isInteger(rawChoiceIndex) ||
        rawChoiceIndex < 0)
    ) {
      return buildChoiceSelectionContext({
        ...args,
        chooserId,
        effect: effectRecord,
        legalChoiceIndices: args.legalChoiceIndices,
      });
    }

    const chosenEffect =
      typeof rawChoiceIndex === "number" && rawChoiceIndex >= 0
        ? options[Math.min(rawChoiceIndex, Math.max(options.length - 1, 0))]
        : undefined;

    return chosenEffect
      ? buildImmediateSelectionContext({
          ...args,
          effect: chosenEffect,
          chooserId,
        })
      : undefined;
  }

  if (effectRecord.type === "name-a-card") {
    if (
      typeof args.resolutionInput.namedCard !== "string" ||
      args.resolutionInput.namedCard.trim().length === 0
    ) {
      return buildNameCardSelectionContext(args);
    }
    return undefined;
  }

  if (effectRecord.chooser === "CHOSEN_PLAYER" || effectRecord.target === "CHOSEN_PLAYER") {
    const selectedPlayers = resolveSelectedPlayerIds(
      args.ctx.framework.state.playerIds,
      getCombinedSelectionInput(args.resolutionInput),
    );
    if ((selectedPlayers?.length ?? 0) === 0) {
      return buildChosenPlayerTargetSelectionContext({
        ...args,
        originatesFromOptional: args.originatesFromOptional,
      });
    }
  }

  if (effectRecord.type === "scry") {
    const hasExplicitDestinations =
      Array.isArray(args.resolutionInput.destinations) &&
      args.resolutionInput.destinations.length > 0;
    if (!hasExplicitDestinations) {
      return buildScrySelectionContext({
        ...args,
        effect: effectRecord,
      });
    }
    return undefined;
  }

  if (effectRecord.type === "play-card") {
    return buildPlayCardSelectionContext(args, effectRecord, {
      originatesFromOptional: args.originatesFromOptional,
    });
  }

  const ordered = requiresTargetOrdering(
    args.ctx,
    args.cardPlayed,
    effectRecord,
    args.resolutionInput,
  );
  return buildGenericTargetSelectionContext({
    ...args,
    effect: effectRecord,
    kind:
      effectRecord.type === "discard" && effectRecord.chosen === true
        ? "discard-choice"
        : "target-selection",
    ordered,
    chooserId: resolveDefaultTargetChooserId(
      args.ctx,
      args.cardPlayed,
      effectRecord,
      args.resolutionInput,
    ),
    originatesFromOptional: args.originatesFromOptional,
  });
}

export function buildResolutionSelectionContext(
  args: ResolutionSelectionBuildArgs,
): ResolutionSelectionContext | undefined {
  return buildImmediateSelectionContext(args);
}
