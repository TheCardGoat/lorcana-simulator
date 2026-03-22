import type { CardInstanceId, PlayerId } from "#core";
import type { CardRuntimeReadAPI, DeepReadonly, FrameworkReadAPI } from "../../../core/runtime";
import type { Condition, LorcanaCard } from "@tcg/lorcana-types";
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
    targetDsl: [{ selector: "chosen", count: 1 }],
    cardCandidateIds: [],
    playerCandidateIds: [...args.ctx.framework.state.playerIds],
    allowedZones: [],
    minSelections: 1,
    maxSelections: 1,
    ordered: false,
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
  const amount = getRecordNumber(args.effect, "amount");
  const destinations = Array.isArray(args.effect.destinations)
    ? args.effect.destinations
        .map((destination) => asRecord(destination))
        .filter((destination): destination is Record<string, unknown> => destination !== null)
    : [];

  if (revealedCardIds.length === 0 || !amount || destinations.length === 0) {
    return undefined;
  }

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
    destinationRules: destinations.map((destination, index) => ({
      id: `${args.requestId}:${destination.zone ?? "destination"}:${index}`,
      zone: String(destination.zone),
      min: getRecordNumber(destination, "min") ?? 0,
      max: getRecordNumber(destination, "max") ?? null,
      remainder: destination.remainder === true,
    })),
  };
}

function buildGenericTargetSelectionContext(
  args: ResolutionSelectionBuildBase & {
    effect: unknown;
    kind: "target-selection" | "discard-choice";
    ordered?: boolean;
  },
): TargetResolutionSelectionContext | undefined {
  const effectRecord = asRecord(args.effect);
  const analysis = analyzeEffectTargets(
    args.effect,
    args.cardPlayed.playerId,
    args.ctx,
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
          args.ctx,
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
      ? resolveTargetPlayerIds(args.ctx, effectTarget, {
          controllerId: args.cardPlayed.playerId,
          sourceCardId: args.sourceCardId,
          selectedPlayerIds: resolveSelectedPlayerIds(
            args.ctx.framework.state.playerIds,
            effectTargetSelection,
          ),
        })
      : analysis.playerCandidates;
  const resolvedContextCardTargets =
    effectTarget !== undefined && effectTargetRequiresSelection
      ? (resolveEffectTargets(
          args.ctx,
          args.cardPlayed,
          effectTarget,
          effectTargetSelection,
          args.resolutionInput.eventSnapshot,
        ) ?? [])
      : [];
  const resolvedContextPlayerTargets =
    effectTarget !== undefined && effectTargetRequiresSelection
      ? resolveTargetPlayerIds(args.ctx, effectTarget, {
          controllerId: args.cardPlayed.playerId,
          sourceCardId: args.sourceCardId,
          selectedPlayerIds: resolveSelectedPlayerIds(
            args.ctx.framework.state.playerIds,
            effectTargetSelection,
          ),
        })
      : [];
  const cardCandidates = [...new Set(runtimeCardCandidates)];
  const playerCandidates = [...new Set(runtimePlayerCandidates)];
  const availability = analyzeTargetSelectionAvailabilityFromAnalysis(args.effect, analysis);
  const hasCandidates = cardCandidates.length > 0 || playerCandidates.length > 0;
  if (
    currentTargetCount === 0 &&
    effectTargetRequiresSelection &&
    (resolvedContextCardTargets.length > 0 || resolvedContextPlayerTargets.length > 0)
  ) {
    return undefined;
  }
  if (!analysis.requiresExplicitSelection || availability.shouldAutoRejectForNoValidTargets) {
    return undefined;
  }
  if (!hasCandidates) {
    return undefined;
  }
  const requiredSelectionCount = Math.max(1, analysis.minSelections);
  const hasEnoughSelections = currentTargetCount >= requiredSelectionCount;
  const hasCompleteOrderedSelection =
    args.ordered === true &&
    analysis.maxSelections > 0 &&
    currentTargetCount >= analysis.maxSelections;
  if (hasEnoughSelections && (args.ordered !== true || hasCompleteOrderedSelection)) {
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
    targetDsl: [...analysis.targetDsl],
    cardCandidateIds: cardCandidates,
    playerCandidateIds: playerCandidates,
    allowedZones: [...analysis.allowedZones],
    minSelections: analysis.minSelections,
    maxSelections: analysis.maxSelections,
    ordered: args.ordered === true,
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
      });
    }
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
  });
}

export function buildResolutionSelectionContext(
  args: ResolutionSelectionBuildArgs,
): ResolutionSelectionContext | undefined {
  return buildImmediateSelectionContext(args);
}
