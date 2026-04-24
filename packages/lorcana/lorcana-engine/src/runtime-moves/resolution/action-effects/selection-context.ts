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
import type { SearchDeckEffect } from "@tcg/lorcana-types";
import { matchesSearchFilter } from "./search-deck-effect";
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
import type { SlottedTargetKind } from "../../../targeting/slotted-targets";

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

  // If no explicit chosenBy, derive the chooser from the effect's player target.
  // For effects like "the challenging player chooses and discards a card", the target
  // player (CHALLENGING_PLAYER, OPPONENT, etc.) is implicitly the chooser.
  const target = effect.target;
  if (target) {
    const targetPlayers = resolveTargetPlayerIds(ctx, target, {
      controllerId: cardPlayed.playerId,
      sourceCardId: cardPlayed.cardId as CardInstanceId,
      eventSnapshot: resolutionInput.eventSnapshot,
    });
    if (targetPlayers.length === 1) {
      return targetPlayers[0]!;
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
        eventSnapshot: resolutionInput.eventSnapshot,
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
      eventSnapshot: resolutionInput.eventSnapshot,
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
  const amount =
    getRecordNumber(args.effect, "amount") ??
    (revealedCardIds.length > 0 ? revealedCardIds.length : undefined);
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

function buildSearchDeckSelectionContext(
  args: ResolutionSelectionBuildBase & { originatesFromOptional?: boolean },
  effectRecord: Record<string, unknown>,
): TargetResolutionSelectionContext | undefined {
  const currentSelection = normalizeCurrentSelection(args.resolutionInput);
  const currentTargets = currentSelection.targets ?? [];

  // If target already provided, no selection needed
  if (currentTargets.length > 0) {
    return undefined;
  }

  const deckCards = args.ctx.framework.zones.getCards({
    zone: "deck",
    playerId: args.cardPlayed.playerId,
  }) as CardInstanceId[];

  const candidates = deckCards.filter((cardId) =>
    matchesSearchFilter(
      args.ctx as Parameters<typeof matchesSearchFilter>[0],
      cardId,
      effectRecord as unknown as SearchDeckEffect,
    ),
  );

  // 0 or 1 candidate: auto-resolve (no selection needed)
  if (candidates.length <= 1) {
    return undefined;
  }

  return {
    origin: args.origin,
    requestId: args.requestId,
    kind: "target-selection",
    sourceCardId: args.sourceCardId,
    chooserId: args.chooserId,
    currentSelection,
    submitField: "targets",
    originatesFromOptional: args.originatesFromOptional,
    targetDsl: [],
    cardCandidateIds: candidates,
    playerCandidateIds: [],
    allowedZones: ["deck"],
    minSelections: 1,
    maxSelections: 1,
    ordered: false,
    autoRejected: false,
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
      eventSnapshot: args.resolutionInput.eventSnapshot,
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
          eventSnapshot: args.resolutionInput.eventSnapshot,
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
          eventSnapshot: args.resolutionInput.eventSnapshot,
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
  const requiredSelectionCount = minSelections;
  const hasEnoughSelections = currentTargetCount >= requiredSelectionCount;
  if (
    !allowEmptyResolution &&
    hasEnoughSelections &&
    currentTargetCount >= analysis.maxSelections
  ) {
    return undefined;
  }

  const expectedSlottedKind = deriveSlottedKind(effectRecord);

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
    declaredMaxSelections: analysis.declaredMaxSelections ?? analysis.maxSelections,
    ordered: args.ordered === true,
    autoRejected: allowEmptyResolution,
    ...(expectedSlottedKind ? { expectedSlottedKind } : {}),
  };
}

/**
 * Tell the UI which `SlottedTargetInput` shape to serialize for this pending
 * effect. Only populated for effect descriptor types that have a dedicated
 * multi-slot entry in `SlottedTargetInput`; single-filter effects (deal-damage,
 * discard, etc.) stay on the flat-array path.
 */
function deriveSlottedKind(
  effectRecord: ReturnType<typeof asRecord>,
): SlottedTargetKind | undefined {
  const type = effectRecord?.type;
  switch (type) {
    case "move-damage":
      return "move-damage";
    case "move-to-location":
      return "move-to-location";
    default:
      return undefined;
  }
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

function resolveContextDependentMaxCost(
  filter: unknown,
  ctx: ResolutionSelectionRuntimeContext,
  resolutionInput: PendingActionResolutionInput,
): number | undefined {
  if (!filter || typeof filter !== "object" || Array.isArray(filter)) {
    return undefined;
  }
  const f = filter as Record<string, unknown>;
  if (
    f.maxCost !== "chosen-card-cost" &&
    !(
      typeof f.maxCost === "object" &&
      f.maxCost !== null &&
      (f.maxCost as Record<string, unknown>).type === "chosen-card-cost"
    )
  ) {
    return undefined;
  }

  const offset =
    typeof f.maxCost === "object" && f.maxCost !== null
      ? typeof (f.maxCost as Record<string, unknown>).offset === "number"
        ? ((f.maxCost as Record<string, unknown>).offset as number)
        : 0
      : 0;

  const eventSnapshot = resolutionInput.eventSnapshot;
  const chosenCardCost = eventSnapshot?.chosenCardCost;
  if (typeof chosenCardCost === "number" && Number.isFinite(chosenCardCost)) {
    return chosenCardCost + offset;
  }

  const chosenCardId = eventSnapshot?.chosenCardId as CardInstanceId | undefined;
  if (!chosenCardId) {
    return undefined;
  }

  const chosenDefinition = ctx.cards.getDefinition(chosenCardId) as { cost?: number } | undefined;
  return typeof chosenDefinition?.cost === "number" ? chosenDefinition.cost + offset : undefined;
}

function getEligibleZoneCardsForPlayCardEffect(
  args: ResolutionSelectionBuildArgs,
  effectRecord: PlayCardEffectRecord,
  zone: "hand" | "discard",
): CardInstanceId[] {
  // Context-dependent filters: resolve maxCost from event snapshot so we can
  // compute eligible candidates for the selection context.
  const resolvedContextMaxCost = resolveContextDependentMaxCost(
    effectRecord.filter,
    args.ctx,
    args.resolutionInput,
  );

  // Resolve the target player(s) — mirrors the logic in resolvePlayCardEffect execution.
  const targetPlayerIds =
    typeof effectRecord.target === "string"
      ? resolveTargetPlayerIds(args.ctx, effectRecord.target, {
          controllerId: args.cardPlayed.playerId,
          sourceCardId: args.sourceCardId,
          eventSnapshot: args.resolutionInput.eventSnapshot,
        })
      : [];
  const resolvedPlayerIds =
    targetPlayerIds.length > 0 ? targetPlayerIds : [args.cardPlayed.playerId];

  const zoneCardsAccum: CardInstanceId[] = [];
  for (const playerId of resolvedPlayerIds) {
    const zoneCards = args.ctx.framework.zones.getCards({
      zone,
      playerId,
    }) as CardInstanceId[];
    zoneCardsAccum.push(...zoneCards);
  }

  return zoneCardsAccum.filter((cardId) => {
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

    // Filter-level card type, max cost, and classification constraints
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
      if (resolvedContextMaxCost !== undefined) {
        const cardCost = Number(definition.cost ?? Number.NaN);
        if (!Number.isFinite(cardCost) || cardCost > resolvedContextMaxCost) {
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
  const from = typeof effectRecord.from === "string" ? effectRecord.from : "hand";
  const isContextDependent = isContextDependentPlayCardFilter(effectRecord.filter);

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

  // Play from discard: always require an explicit choice so the player can pick which card.
  if (from === "discard") {
    const eligibleCards = getEligibleZoneCardsForPlayCardEffect(
      args,
      effectRecord as PlayCardEffectRecord,
      "discard",
    );
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
      allowedZones: ["discard"],
      minSelections: 1,
      maxSelections: 1,
      ordered: false,
      autoRejected: false,
    };
  }

  // Only build hand-picker selection context in the bag resolution path,
  // or for context-dependent filters in sequence steps that need player input
  // (e.g. "play a character with cost up to 2 more than the banished character").
  if (args.origin !== "bag" && !isContextDependent) {
    return undefined;
  }

  const eligibleCards = getEligibleZoneCardsForPlayCardEffect(
    args,
    effectRecord as PlayCardEffectRecord,
    "hand",
  );
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

  // `pay-cost` wraps another effect with an ink (or other) payment step. The
  // prompt the UI actually needs to render is the inner effect — pay-cost itself
  // has no `chosenBy` / `target`, so if we hand it to the generic builder the
  // chooser resolution falls back to `cardPlayed.playerId` and misattributes
  // `chosenBy: "opponent"` effects (e.g. Basil - Disguised Detective's TWISTS
  // AND TURNS) to the controller. Unwrap like optional/conditional.
  if (effectRecord.type === "pay-cost") {
    const inner = effectRecord.effect;
    return inner
      ? buildImmediateSelectionContext({
          ...args,
          effect: inner,
        })
      : undefined;
  }

  // Optional "you may": when the inner effect's first prompt is already target-selection
  // (e.g. search-deck), merge into one context with originatesFromOptional instead of
  // optional-selection. Inner prompts that are not target-selection (name-a-card, choice,
  // scry, optional nested inside optional, etc.) still surface optional-selection first.
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

  if (effectRecord.type === "search-deck") {
    return buildSearchDeckSelectionContext(args, effectRecord);
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
