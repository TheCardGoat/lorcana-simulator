import { getLogger } from "@logtape/logtape";
import type { CardInstanceId, PlayerId, RuntimeValidationResult } from "#core";
import type { LorcanaCard, LorcanaCardTarget } from "@tcg/lorcana-types";
import type { MoveEnumerationContext, MoveValidationContext } from "#core";
import type { LorcanaG } from "../../types";
import { hasKeyword } from "../../card-utils";
import { normalizeTargetDescriptor, resolveCandidateTargets } from "./target-resolver";

type DiscardTargetSourceZone = "deck" | "hand" | "play" | "discard" | "inkwell";
type ActionSelectionZone = "deck" | "hand" | "play" | "discard" | "inkwell" | "limbo";

type RemoveDamageTargetDescriptor = {
  owner: "you" | "opponent" | "any";
  cardTypes?: string[];
};

type ReturnToHandTargetDescriptor = {
  owner: "you" | "opponent" | "any";
  cardTypes?: string[];
};

type ReturnFromDiscardTargetDescriptor = {
  owner: "you" | "opponent" | "any";
  actionSubtypes?: string[];
  cardName?: string;
  cardTypes?: string[];
  filter?: {
    maxCost?: number;
    classification?: string;
    keyword?: string;
  };
};

type DiscardTargetDescriptor = {
  owner: "you" | "opponent" | "any";
  sourceZone: DiscardTargetSourceZone;
  minAmount: number;
  maxAmount: number;
  filter?: {
    cardType?: string;
    notCardType?: string;
    maxCost?: number;
    classification?: string;
  };
};

type PlayCardSelectionDescriptor = {
  owner: "you" | "opponent" | "any";
  sourceZone: "deck" | "hand" | "discard";
  cardType?: LorcanaCard["cardType"] | "song" | "floodborn";
  filter?: {
    cardType?: LorcanaCard["cardType"] | "song" | "floodborn";
    maxCost?: number;
    classification?: string;
    name?: string;
  };
};

type ActionTargetCardDefinition = {
  actionSubtype?: string | null;
  cardType?: string;
  name?: string;
  classifications?: string[];
  cost?: number;
};

type ActionTargetRuntimeContext = Pick<
  MoveValidationContext<LorcanaG, LorcanaCard> | MoveEnumerationContext<LorcanaG, LorcanaCard>,
  "framework" | "cards"
>;

export type TargetAnalysis = {
  cardCandidates: CardInstanceId[];
  playerCandidates: PlayerId[];
  allowedZones: ActionSelectionZone[];
  minSelections: number;
  maxSelections: number;
  requiresExplicitSelection: boolean;
  allowsDeferredResolutionWithoutInitialSelection: boolean;
};

export type NormalizedTargetSelection = {
  cardIds: CardInstanceId[];
  playerIds: PlayerId[];
};

type TargetValidationSuccess = {
  valid: true;
  selection: NormalizedTargetSelection;
};

type TargetValidationFailure = Extract<RuntimeValidationResult, { valid: false }>;

type TargetValidationResult = TargetValidationSuccess | TargetValidationFailure;
type TargetSelectionRestrictionContext = {
  currentPlayer: PlayerId;
  ctx: ActionTargetRuntimeContext;
};

const logger = getLogger(["lorcana-engine", "target-analysis"]);

function getCardDefinition(
  ctx: ActionTargetRuntimeContext,
  cardId: string,
): LorcanaCard | undefined {
  const definition = ctx.cards.getDefinition(cardId) as LorcanaCard | undefined;
  if (definition) {
    return definition;
  }

  const cardsApi = ctx.cards as {
    require?: (cardId: string) => { definition?: LorcanaCard };
  };

  try {
    return cardsApi.require?.(cardId)?.definition;
  } catch {
    return undefined;
  }
}

function getCardZone(ctx: ActionTargetRuntimeContext, cardId: CardInstanceId): string | undefined {
  const zoneKey = ctx.framework.state.ctx.zones?.private?.cardIndex?.[cardId]?.zoneKey;
  if (typeof zoneKey !== "string") {
    return undefined;
  }

  return zoneKey.split(":")[0];
}

function getCardControllerId(
  ctx: ActionTargetRuntimeContext,
  cardId: CardInstanceId,
): PlayerId | undefined {
  return ctx.framework.state.ctx.zones?.private?.cardIndex?.[cardId]?.controllerID as
    | PlayerId
    | undefined;
}

function getForcedEffectTargetCandidates(args: {
  analysis: TargetAnalysis;
  context: TargetSelectionRestrictionContext;
}): Map<PlayerId, Set<CardInstanceId>> {
  const { analysis, context } = args;
  const forcedTargetsByController = new Map<PlayerId, Set<CardInstanceId>>();

  for (const candidateId of analysis.cardCandidates) {
    if (getCardZone(context.ctx, candidateId) !== "play") {
      continue;
    }

    const candidateDefinition = getCardDefinition(context.ctx, candidateId);
    if (candidateDefinition?.cardType !== "character") {
      continue;
    }

    const controllerId = getCardControllerId(context.ctx, candidateId);
    if (!controllerId || controllerId === context.currentPlayer) {
      continue;
    }

    const hasDoYourWorstRestriction = (candidateDefinition.abilities ?? []).some(
      (ability) =>
        ability.type === "static" &&
        ability.effect.type === "restriction" &&
        ability.effect.target === "SELF" &&
        ability.effect.restriction === "must-be-chosen-for-effects",
    );
    if (!hasDoYourWorstRestriction) {
      continue;
    }

    const forcedTargets = forcedTargetsByController.get(controllerId) ?? new Set<CardInstanceId>();
    forcedTargets.add(candidateId);
    forcedTargetsByController.set(controllerId, forcedTargets);
  }

  return forcedTargetsByController;
}

function validateForcedEffectTargetSelection(args: {
  analysis: TargetAnalysis;
  selection: NormalizedTargetSelection;
  context?: TargetSelectionRestrictionContext;
}): TargetValidationFailure | undefined {
  const { analysis, selection, context } = args;
  if (!context || selection.cardIds.length === 0 || analysis.cardCandidates.length === 0) {
    return undefined;
  }

  const forcedTargetsByController = getForcedEffectTargetCandidates({ analysis, context });
  if (forcedTargetsByController.size === 0) {
    return undefined;
  }

  for (const selectedCardId of selection.cardIds) {
    if (getCardZone(context.ctx, selectedCardId) !== "play") {
      continue;
    }

    const selectedDefinition = getCardDefinition(context.ctx, selectedCardId);
    if (selectedDefinition?.cardType !== "character") {
      continue;
    }

    const controllerId = getCardControllerId(context.ctx, selectedCardId);
    if (!controllerId) {
      continue;
    }

    const forcedTargets = forcedTargetsByController.get(controllerId);
    if (!forcedTargets || forcedTargets.has(selectedCardId)) {
      continue;
    }

    return {
      valid: false,
      error: "A different character must be chosen for this action or ability if able",
      errorCode: "TARGET_DO_YOUR_WORST_RESTRICTION",
    };
  }

  return undefined;
}

function normalizeTargetOwner(target: unknown): "you" | "opponent" | "any" {
  switch (target) {
    case "OPPONENT":
    case "OPPONENTS":
    case "EACH_OPPONENT":
      return "opponent";
    case "EACH_PLAYER":
    case "ALL_PLAYERS":
      return "any";
    case "CONTROLLER":
    case "CURRENT_TURN":
    default:
      return "you";
  }
}

function collectRemoveDamageTargetDescriptors(effect: unknown): RemoveDamageTargetDescriptor[] {
  if (!effect || typeof effect !== "object") {
    return [];
  }

  const effectRecord = effect as Record<string, unknown>;
  if (effectRecord.type === "remove-damage") {
    return [
      {
        owner: normalizeTargetOwner(effectRecord.target),
        cardTypes: ["character", "location"],
      },
    ];
  }

  const nestedEffects = [
    effectRecord.effect,
    ...(Array.isArray(effectRecord.effects) ? effectRecord.effects : []),
    ...(Array.isArray(effectRecord.steps) ? effectRecord.steps : []),
    ...(Array.isArray(effectRecord.options) ? effectRecord.options : []),
    ...(Array.isArray(effectRecord.choices) ? effectRecord.choices : []),
    effectRecord.trueEffect,
    effectRecord.falseEffect,
    effectRecord.ifTrue,
    effectRecord.ifFalse,
    effectRecord.then,
    effectRecord.else,
  ];

  return nestedEffects.flatMap((nestedEffect) =>
    collectRemoveDamageTargetDescriptors(nestedEffect),
  );
}

function collectReturnToHandTargetDescriptors(effect: unknown): ReturnToHandTargetDescriptor[] {
  if (!effect || typeof effect !== "object") {
    return [];
  }

  const effectRecord = effect as Record<string, unknown>;
  if (effectRecord.type === "return-to-hand") {
    const normalizedTarget = normalizeTargetDescriptor(effectRecord.target);
    return normalizedTarget
      ? [
          {
            owner: (normalizedTarget.owner ?? "any") as "you" | "opponent" | "any",
            cardTypes: normalizedTarget.cardTypes,
          },
        ]
      : [];
  }

  const nestedEffects = [
    effectRecord.effect,
    ...(Array.isArray(effectRecord.effects) ? effectRecord.effects : []),
    ...(Array.isArray(effectRecord.steps) ? effectRecord.steps : []),
    ...(Array.isArray(effectRecord.options) ? effectRecord.options : []),
    ...(Array.isArray(effectRecord.choices) ? effectRecord.choices : []),
    effectRecord.trueEffect,
    effectRecord.falseEffect,
    effectRecord.ifTrue,
    effectRecord.ifFalse,
    effectRecord.then,
    effectRecord.else,
  ];

  return nestedEffects.flatMap((nestedEffect) =>
    collectReturnToHandTargetDescriptors(nestedEffect),
  );
}

function normalizeReturnFromDiscardTargetDescriptor(
  effect: Record<string, unknown>,
): ReturnFromDiscardTargetDescriptor | undefined {
  const owner = normalizeTargetOwner(effect.target);
  const rawFilter =
    effect.filter && typeof effect.filter === "object" && !Array.isArray(effect.filter)
      ? (effect.filter as Record<string, unknown>)
      : undefined;
  const cardName =
    typeof effect.cardName === "string"
      ? effect.cardName
      : typeof rawFilter?.name === "string"
        ? rawFilter.name
        : undefined;
  const cardType = typeof rawFilter?.cardType === "string" ? rawFilter.cardType : effect.cardType;

  if (cardType !== undefined && typeof cardType !== "string") {
    return undefined;
  }

  const maxCost =
    typeof rawFilter?.maxCost === "number" && Number.isFinite(rawFilter.maxCost)
      ? rawFilter.maxCost
      : undefined;
  const classification =
    typeof rawFilter?.classification === "string" ? rawFilter.classification : undefined;
  const keyword = typeof rawFilter?.keyword === "string" ? rawFilter.keyword : undefined;

  if (cardType === "song") {
    return {
      owner,
      actionSubtypes: ["song"],
      cardName,
      cardTypes: ["action"],
      filter:
        maxCost !== undefined || classification !== undefined || keyword !== undefined
          ? { maxCost, classification, keyword }
          : undefined,
    };
  }

  return {
    owner,
    cardName,
    cardTypes: typeof cardType === "string" ? [cardType] : undefined,
    filter:
      maxCost !== undefined || classification !== undefined || keyword !== undefined
        ? { maxCost, classification, keyword }
        : undefined,
  };
}

function collectReturnFromDiscardTargetDescriptors(
  effect: unknown,
): ReturnFromDiscardTargetDescriptor[] {
  if (!effect || typeof effect !== "object") {
    return [];
  }

  const effectRecord = effect as Record<string, unknown>;
  if (effectRecord.type === "return-from-discard") {
    const descriptor = normalizeReturnFromDiscardTargetDescriptor(effectRecord);
    return descriptor ? [descriptor] : [];
  }

  const nestedEffects = [
    effectRecord.effect,
    ...(Array.isArray(effectRecord.effects) ? effectRecord.effects : []),
    ...(Array.isArray(effectRecord.steps) ? effectRecord.steps : []),
    ...(Array.isArray(effectRecord.options) ? effectRecord.options : []),
    ...(Array.isArray(effectRecord.choices) ? effectRecord.choices : []),
    effectRecord.trueEffect,
    effectRecord.falseEffect,
    effectRecord.ifTrue,
    effectRecord.ifFalse,
    effectRecord.then,
    effectRecord.else,
  ];

  return nestedEffects.flatMap((nestedEffect) =>
    collectReturnFromDiscardTargetDescriptors(nestedEffect),
  );
}

function normalizeDiscardTargetSourceZone(value: unknown): DiscardTargetSourceZone {
  switch (value) {
    case "deck":
    case "hand":
    case "play":
    case "discard":
    case "inkwell":
      return value;
    default:
      logger.warn("Invalid discard target source zone: {value}, defaulting to 'hand'", {
        value,
      });
      return "hand";
  }
}

function normalizeDiscardTargetDescriptor(
  effect: Record<string, unknown>,
): DiscardTargetDescriptor {
  const owner = normalizeTargetOwner(effect.target);
  const sourceZone = normalizeDiscardTargetSourceZone(effect.from);
  const amount =
    typeof effect.amount === "number" && Number.isFinite(effect.amount) && effect.amount > 0
      ? Math.floor(effect.amount)
      : 1;
  const anyNumberChosen = effect.chosen === true && effect.amount === "DISCARDED_COUNT";

  const rawFilter =
    effect.filter && typeof effect.filter === "object" && !Array.isArray(effect.filter)
      ? (effect.filter as Record<string, unknown>)
      : undefined;
  const normalizedFilter = rawFilter
    ? {
        cardType: typeof rawFilter.cardType === "string" ? rawFilter.cardType : undefined,
        notCardType: typeof rawFilter.notCardType === "string" ? rawFilter.notCardType : undefined,
        maxCost:
          typeof rawFilter.maxCost === "number" && Number.isFinite(rawFilter.maxCost)
            ? rawFilter.maxCost
            : undefined,
        classification:
          typeof rawFilter.classification === "string" ? rawFilter.classification : undefined,
      }
    : undefined;

  return {
    owner,
    sourceZone,
    minAmount: anyNumberChosen ? 0 : amount,
    maxAmount: anyNumberChosen ? Number.MAX_SAFE_INTEGER : amount,
    ...(normalizedFilter ? { filter: normalizedFilter } : {}),
  };
}

function collectDiscardTargetDescriptors(effect: unknown): DiscardTargetDescriptor[] {
  if (!effect || typeof effect !== "object") {
    return [];
  }

  const effectRecord = effect as Record<string, unknown>;
  if (effectRecord.type === "discard") {
    return [normalizeDiscardTargetDescriptor(effectRecord)];
  }

  const nestedEffects = [
    effectRecord.effect,
    ...(Array.isArray(effectRecord.effects) ? effectRecord.effects : []),
    ...(Array.isArray(effectRecord.steps) ? effectRecord.steps : []),
    ...(Array.isArray(effectRecord.options) ? effectRecord.options : []),
    ...(Array.isArray(effectRecord.choices) ? effectRecord.choices : []),
    effectRecord.trueEffect,
    effectRecord.falseEffect,
    effectRecord.ifTrue,
    effectRecord.ifFalse,
    effectRecord.then,
    effectRecord.else,
  ];

  return nestedEffects.flatMap((nestedEffect) => collectDiscardTargetDescriptors(nestedEffect));
}

function normalizePlayCardSelectionDescriptor(
  effect: unknown,
): PlayCardSelectionDescriptor | undefined {
  if (!effect || typeof effect !== "object" || Array.isArray(effect)) {
    return undefined;
  }

  const effectRecord = effect as Record<string, unknown>;
  if (effectRecord.type !== "play-card") {
    return undefined;
  }

  const from = effectRecord.from;
  if (from !== "deck" && from !== "hand" && from !== "discard") {
    return undefined;
  }

  const target = effectRecord.target;
  const owner =
    target === "OPPONENT" || target === "EACH_OPPONENT"
      ? "opponent"
      : target === "CHOSEN_PLAYER" || target === "EACH_PLAYER" || target === "ALL_PLAYERS"
        ? "any"
        : "you";
  const filter =
    effectRecord.filter &&
    typeof effectRecord.filter === "object" &&
    !Array.isArray(effectRecord.filter)
      ? (effectRecord.filter as PlayCardSelectionDescriptor["filter"])
      : undefined;
  const cardType =
    effectRecord.cardType === "character" ||
    effectRecord.cardType === "item" ||
    effectRecord.cardType === "location" ||
    effectRecord.cardType === "action" ||
    effectRecord.cardType === "song" ||
    effectRecord.cardType === "floodborn"
      ? (effectRecord.cardType as PlayCardSelectionDescriptor["cardType"])
      : undefined;

  return {
    owner,
    sourceZone: from,
    cardType,
    filter,
  };
}

function collectPlayCardSelectionDescriptors(effect: unknown): PlayCardSelectionDescriptor[] {
  if (!effect || typeof effect !== "object") {
    return [];
  }

  const effectRecord = effect as Record<string, unknown>;
  const normalized = normalizePlayCardSelectionDescriptor(effect);
  const nestedEffects = [
    effectRecord.effect,
    ...(Array.isArray(effectRecord.options) ? effectRecord.options : []),
    ...(Array.isArray(effectRecord.choices) ? effectRecord.choices : []),
    ...(Array.isArray(effectRecord.effects) ? effectRecord.effects : []),
    ...(Array.isArray(effectRecord.steps) ? effectRecord.steps : []),
    effectRecord.trueEffect,
    effectRecord.falseEffect,
    effectRecord.ifTrue,
    effectRecord.ifFalse,
    effectRecord.then,
    effectRecord.else,
  ];

  return [
    ...(normalized ? [normalized] : []),
    ...nestedEffects.flatMap((nestedEffect) => collectPlayCardSelectionDescriptors(nestedEffect)),
  ];
}

function collectChosenCardTargetDescriptors(effect: unknown): LorcanaCardTarget[] {
  if (!effect || typeof effect !== "object") {
    return [];
  }

  const effectRecord = effect as Record<string, unknown>;
  const descriptors: LorcanaCardTarget[] = [];
  const defersTargetSelection =
    effectRecord.chosenBy === "opponent" || effectRecord.chosenBy === "TARGET";
  const normalizedTarget =
    effectRecord.target === "chosen-for-effect" ||
    (typeof effectRecord.target === "object" &&
      effectRecord.target !== null &&
      ("ref" in effectRecord.target || "reference" in effectRecord.target))
      ? undefined
      : normalizeTargetDescriptor(effectRecord.target);
  if (!defersTargetSelection && normalizedTarget?.selector === "chosen") {
    descriptors.push(normalizedTarget as LorcanaCardTarget);
  }
  const moveCharacterTarget =
    typeof effectRecord.character === "object" &&
    effectRecord.character !== null &&
    ("ref" in effectRecord.character || "reference" in effectRecord.character)
      ? undefined
      : normalizeTargetDescriptor(effectRecord.character);
  if (moveCharacterTarget?.selector === "chosen") {
    descriptors.push(moveCharacterTarget as LorcanaCardTarget);
  }
  const moveLocationTarget =
    typeof effectRecord.location === "object" &&
    effectRecord.location !== null &&
    ("ref" in effectRecord.location || "reference" in effectRecord.location)
      ? undefined
      : normalizeTargetDescriptor(effectRecord.location);
  if (moveLocationTarget?.selector === "chosen") {
    descriptors.push(moveLocationTarget as LorcanaCardTarget);
  }
  const moveDamageSourceTarget =
    typeof effectRecord.from === "object" &&
    effectRecord.from !== null &&
    ("ref" in effectRecord.from || "reference" in effectRecord.from)
      ? undefined
      : normalizeTargetDescriptor(effectRecord.from);
  if (moveDamageSourceTarget?.selector === "chosen") {
    descriptors.push(moveDamageSourceTarget as LorcanaCardTarget);
  }
  const moveDamageDestinationTarget =
    typeof effectRecord.to === "object" &&
    effectRecord.to !== null &&
    ("ref" in effectRecord.to || "reference" in effectRecord.to)
      ? undefined
      : normalizeTargetDescriptor(effectRecord.to);
  if (moveDamageDestinationTarget?.selector === "chosen") {
    descriptors.push(moveDamageDestinationTarget as LorcanaCardTarget);
  }
  const sourceTarget =
    typeof effectRecord.source === "object" &&
    effectRecord.source !== null &&
    ("ref" in effectRecord.source || "reference" in effectRecord.source)
      ? undefined
      : normalizeTargetDescriptor(effectRecord.source);
  if (sourceTarget?.selector === "chosen") {
    descriptors.push(sourceTarget as LorcanaCardTarget);
  }
  const putUnderTarget =
    typeof effectRecord.under === "object" &&
    effectRecord.under !== null &&
    ("ref" in effectRecord.under || "reference" in effectRecord.under)
      ? undefined
      : normalizeTargetDescriptor(effectRecord.under);
  if (putUnderTarget?.selector === "chosen") {
    descriptors.push(putUnderTarget as LorcanaCardTarget);
  }

  const nestedEffects = [
    effectRecord.effect,
    ...(Array.isArray(effectRecord.effects) ? effectRecord.effects : []),
    ...(Array.isArray(effectRecord.steps) ? effectRecord.steps : []),
    ...(Array.isArray(effectRecord.options) ? effectRecord.options : []),
    ...(Array.isArray(effectRecord.choices) ? effectRecord.choices : []),
    effectRecord.trueEffect,
    effectRecord.falseEffect,
    effectRecord.ifTrue,
    effectRecord.ifFalse,
    effectRecord.then,
    effectRecord.else,
  ];

  return [
    ...descriptors,
    ...nestedEffects.flatMap((nestedEffect) => collectChosenCardTargetDescriptors(nestedEffect)),
  ];
}

function hasChosenPlayerTarget(effect: unknown): boolean {
  if (!effect || typeof effect !== "object") {
    return false;
  }

  const effectRecord = effect as Record<string, unknown>;
  if (effectRecord.target === "CHOSEN_PLAYER" || effectRecord.chooser === "CHOSEN_PLAYER") {
    return true;
  }

  const nestedCandidates = [
    effectRecord.effect,
    ...(Array.isArray(effectRecord.effects) ? effectRecord.effects : []),
    ...(Array.isArray(effectRecord.steps) ? effectRecord.steps : []),
    ...(Array.isArray(effectRecord.options) ? effectRecord.options : []),
    ...(Array.isArray(effectRecord.choices) ? effectRecord.choices : []),
    effectRecord.trueEffect,
    effectRecord.falseEffect,
    effectRecord.ifTrue,
    effectRecord.ifFalse,
    effectRecord.then,
    effectRecord.else,
  ];

  return nestedCandidates.some((candidate) => hasChosenPlayerTarget(candidate));
}

function resolveActionTargetCandidates(
  targetDescriptors: RemoveDamageTargetDescriptor[],
  playerId: PlayerId,
  ctx: ActionTargetRuntimeContext,
): CardInstanceId[] {
  if (targetDescriptors.length === 0) {
    return [];
  }

  const candidates = new Set<CardInstanceId>();
  for (const targetDescriptor of targetDescriptors) {
    const descriptor = normalizeTargetDescriptor({
      selector: "all",
      count: "all",
      owner: targetDescriptor.owner,
      zones: ["play"],
      cardTypes: targetDescriptor.cardTypes,
    });
    const resolved = resolveCandidateTargets(ctx, descriptor, {
      controllerId: playerId,
    });
    for (const cardId of resolved) {
      candidates.add(cardId as CardInstanceId);
    }
  }

  return [...candidates];
}

function resolveActionDiscardTargetCandidates(
  targetDescriptors: ReturnFromDiscardTargetDescriptor[],
  playerId: PlayerId,
  ctx: ActionTargetRuntimeContext,
): CardInstanceId[] {
  if (targetDescriptors.length === 0) {
    return [];
  }

  const candidates = new Set<CardInstanceId>();
  for (const targetDescriptor of targetDescriptors) {
    const descriptor = normalizeTargetDescriptor({
      selector: "all",
      count: "all",
      owner: targetDescriptor.owner,
      zones: ["discard"],
      cardTypes: targetDescriptor.cardTypes,
    });
    const resolved = resolveCandidateTargets(ctx, descriptor, {
      controllerId: playerId,
      extraPredicate: (cardId) => {
        const definition = getCardDefinition(ctx, cardId) as ActionTargetCardDefinition | undefined;
        if (
          targetDescriptor.actionSubtypes?.length &&
          (!definition?.actionSubtype ||
            !targetDescriptor.actionSubtypes.includes(definition.actionSubtype))
        ) {
          return false;
        }
        if (targetDescriptor.cardName && definition?.name !== targetDescriptor.cardName) {
          return false;
        }
        if (
          targetDescriptor.filter?.maxCost !== undefined &&
          (typeof definition?.cost !== "number" ||
            definition.cost > targetDescriptor.filter.maxCost)
        ) {
          return false;
        }
        if (
          targetDescriptor.filter?.classification &&
          !definition?.classifications?.includes(targetDescriptor.filter.classification)
        ) {
          return false;
        }
        if (
          targetDescriptor.filter?.keyword &&
          (!definition || !hasKeyword(definition as LorcanaCard, targetDescriptor.filter.keyword))
        ) {
          return false;
        }
        return true;
      },
    });
    for (const cardId of resolved) {
      candidates.add(cardId as CardInstanceId);
    }
  }

  return [...candidates];
}

function resolveActionDiscardSelectionCandidates(
  targetDescriptors: DiscardTargetDescriptor[],
  playerId: PlayerId,
  playerIds: readonly PlayerId[],
  ctx: ActionTargetRuntimeContext,
  sourceCardId?: CardInstanceId,
): CardInstanceId[] {
  if (targetDescriptors.length === 0) {
    return [];
  }

  const candidates = new Set<CardInstanceId>();
  for (const targetDescriptor of targetDescriptors) {
    const owners =
      targetDescriptor.owner === "you"
        ? [playerId]
        : targetDescriptor.owner === "opponent"
          ? playerIds.filter((candidatePlayerId) => candidatePlayerId !== playerId)
          : [...playerIds];

    for (const ownerId of owners) {
      const sourceCards =
        ctx.framework.state.ctx.zones.private.zoneCards[
          `${targetDescriptor.sourceZone}:${ownerId}`
        ] ?? [];
      for (const cardId of sourceCards) {
        if (targetDescriptor.sourceZone === "hand" && cardId === sourceCardId) {
          continue;
        }
        const definition = getCardDefinition(ctx, cardId) as
          | {
              cardType?: string;
              classifications?: string[];
              cost?: number;
            }
          | undefined;

        if (
          typeof targetDescriptor.filter?.cardType === "string" &&
          definition?.cardType !== targetDescriptor.filter.cardType
        ) {
          continue;
        }
        if (
          typeof targetDescriptor.filter?.notCardType === "string" &&
          definition?.cardType === targetDescriptor.filter.notCardType
        ) {
          continue;
        }
        if (typeof targetDescriptor.filter?.maxCost === "number") {
          const cost = Number(definition?.cost ?? 0);
          if (!Number.isFinite(cost) || cost > targetDescriptor.filter.maxCost) {
            continue;
          }
        }
        if (typeof targetDescriptor.filter?.classification === "string") {
          const classifications = definition?.classifications ?? [];
          if (!classifications.includes(targetDescriptor.filter.classification)) {
            continue;
          }
        }

        candidates.add(cardId as CardInstanceId);
      }
    }
  }

  return [...candidates];
}

function resolveActionChosenTargetCandidates(
  targetDescriptors: LorcanaCardTarget[],
  playerId: PlayerId,
  ctx: ActionTargetRuntimeContext,
  sourceCardId?: CardInstanceId,
): CardInstanceId[] {
  if (targetDescriptors.length === 0) {
    return [];
  }

  const candidates = new Set<CardInstanceId>();
  for (const descriptor of targetDescriptors) {
    const resolved = resolveCandidateTargets(ctx, descriptor, {
      controllerId: playerId,
      sourceCardId,
    });
    for (const cardId of resolved) {
      candidates.add(cardId as CardInstanceId);
    }
  }

  return [...candidates];
}

function matchesPlayCardSelectionTypeConstraint(
  definition: ActionTargetCardDefinition,
  expectedType: PlayCardSelectionDescriptor["cardType"] | undefined,
): boolean {
  if (!expectedType) {
    return true;
  }

  if (expectedType === "song") {
    return definition.cardType === "action" && definition.actionSubtype === "song";
  }

  if (expectedType === "floodborn") {
    return (definition.classifications ?? []).includes("Floodborn");
  }

  return definition.cardType === expectedType;
}

function matchesPlayCardSelectionCriteria(
  definition: ActionTargetCardDefinition,
  descriptor: PlayCardSelectionDescriptor,
): boolean {
  if (!matchesPlayCardSelectionTypeConstraint(definition, descriptor.cardType)) {
    return false;
  }

  const filter = descriptor.filter;
  if (!filter) {
    return true;
  }

  if (!matchesPlayCardSelectionTypeConstraint(definition, filter.cardType)) {
    return false;
  }

  if (typeof filter.maxCost === "number") {
    const cost = Number(definition.cost ?? Number.NaN);
    if (!Number.isFinite(cost) || cost > filter.maxCost) {
      return false;
    }
  }

  if (
    typeof filter.classification === "string" &&
    !(definition.classifications ?? []).includes(filter.classification)
  ) {
    return false;
  }

  if (typeof filter.name === "string" && definition.name !== filter.name) {
    return false;
  }

  return true;
}

function resolveActionPlayCardSelectionCandidates(
  targetDescriptors: PlayCardSelectionDescriptor[],
  playerId: PlayerId,
  ctx: ActionTargetRuntimeContext,
): CardInstanceId[] {
  if (targetDescriptors.length === 0) {
    return [];
  }

  const playerIds = (ctx.framework.state.playerIds ?? []) as PlayerId[];
  const candidates = new Set<CardInstanceId>();

  for (const targetDescriptor of targetDescriptors) {
    const sourcePlayerIds =
      targetDescriptor.owner === "opponent"
        ? playerIds.filter((candidateId) => candidateId !== playerId)
        : targetDescriptor.owner === "any"
          ? playerIds
          : [playerId];

    for (const sourcePlayerId of sourcePlayerIds) {
      const zoneCards = ctx.framework.zones.getCards({
        zone: targetDescriptor.sourceZone,
        playerId: sourcePlayerId,
      }) as CardInstanceId[];

      for (const cardId of zoneCards) {
        const definition = getCardDefinition(ctx, cardId);
        if (!definition) {
          continue;
        }
        if (!matchesPlayCardSelectionCriteria(definition, targetDescriptor)) {
          continue;
        }
        candidates.add(cardId as CardInstanceId);
      }
    }
  }

  return [...candidates];
}

function descriptorMinSelections(descriptor: { count?: unknown }, fallback = 1): number {
  const count = descriptor.count;
  if (typeof count === "number" && Number.isFinite(count)) {
    return Math.max(0, count);
  }
  if (count === "all") {
    return 0;
  }
  if (count && typeof count === "object") {
    const countRecord = count as Record<string, unknown>;
    if (typeof countRecord.exactly === "number") {
      return Math.max(0, countRecord.exactly);
    }
    if (typeof countRecord.upTo === "number") {
      return 0;
    }
    if (typeof countRecord.atLeast === "number") {
      return Math.max(0, countRecord.atLeast);
    }
    if (
      Array.isArray(countRecord.between) &&
      typeof countRecord.between[0] === "number" &&
      typeof countRecord.between[1] === "number"
    ) {
      return Math.max(0, countRecord.between[0]);
    }
  }
  return fallback;
}

function descriptorMaxSelections(
  descriptor: { count?: unknown },
  candidateCount: number,
  fallback = 1,
): number {
  const count = descriptor.count;
  if (typeof count === "number" && Number.isFinite(count)) {
    return Math.max(0, count);
  }
  if (count === "all") {
    return candidateCount;
  }
  if (count && typeof count === "object") {
    const countRecord = count as Record<string, unknown>;
    if (typeof countRecord.exactly === "number") {
      return Math.max(0, countRecord.exactly);
    }
    if (typeof countRecord.upTo === "number") {
      return Math.max(0, countRecord.upTo);
    }
    if (typeof countRecord.atLeast === "number") {
      return candidateCount;
    }
    if (
      Array.isArray(countRecord.between) &&
      typeof countRecord.between[0] === "number" &&
      typeof countRecord.between[1] === "number"
    ) {
      return Math.max(0, countRecord.between[1]);
    }
  }
  return fallback;
}

export function analyzeEffectTargets(
  effect: unknown,
  playerId: PlayerId,
  ctx: ActionTargetRuntimeContext,
  sourceCardId?: CardInstanceId,
): TargetAnalysis {
  const removeDamageTargetDescriptors = collectRemoveDamageTargetDescriptors(effect);
  const returnToHandTargetDescriptors = collectReturnToHandTargetDescriptors(effect);
  const returnFromDiscardTargetDescriptors = collectReturnFromDiscardTargetDescriptors(effect);
  const discardTargetDescriptors = collectDiscardTargetDescriptors(effect);
  const hasDeferredHandDiscardSelection = discardTargetDescriptors.some(
    (descriptor) => descriptor.sourceZone === "hand",
  );
  const chosenCardTargetDescriptors = collectChosenCardTargetDescriptors(effect);
  const playCardSelectionDescriptors = collectPlayCardSelectionDescriptors(effect);
  const chosenPlayerTarget = hasChosenPlayerTarget(effect);

  const playCandidates = resolveActionTargetCandidates(
    [...removeDamageTargetDescriptors, ...returnToHandTargetDescriptors],
    playerId,
    ctx,
  );
  const chosenTargetCandidates = resolveActionChosenTargetCandidates(
    chosenCardTargetDescriptors,
    playerId,
    ctx,
    sourceCardId,
  );
  const discardCandidates = resolveActionDiscardTargetCandidates(
    returnFromDiscardTargetDescriptors,
    playerId,
    ctx,
  );
  const discardSelectionCandidates = resolveActionDiscardSelectionCandidates(
    discardTargetDescriptors,
    playerId,
    ctx.framework.state.playerIds,
    ctx,
    sourceCardId,
  );
  const playCardSelectionCandidates = resolveActionPlayCardSelectionCandidates(
    playCardSelectionDescriptors,
    playerId,
    ctx,
  );
  const playerCandidates = chosenPlayerTarget ? [...ctx.framework.state.playerIds] : [];

  const cardCandidates = [
    ...new Set([
      ...playCandidates,
      ...chosenTargetCandidates,
      ...discardCandidates,
      ...discardSelectionCandidates,
      ...playCardSelectionCandidates,
    ]),
  ];

  const allowedZones = new Set<ActionSelectionZone>();
  if (removeDamageTargetDescriptors.length > 0) {
    allowedZones.add("play");
  }
  if (returnFromDiscardTargetDescriptors.length > 0) {
    allowedZones.add("discard");
  }
  if (discardTargetDescriptors.length > 0) {
    for (const descriptor of discardTargetDescriptors) {
      allowedZones.add(descriptor.sourceZone);
    }
  }
  for (const descriptor of chosenCardTargetDescriptors) {
    for (const zone of descriptor.zones ?? []) {
      if (
        zone === "deck" ||
        zone === "hand" ||
        zone === "play" ||
        zone === "discard" ||
        zone === "inkwell" ||
        zone === "limbo"
      ) {
        allowedZones.add(zone);
      }
    }
  }
  for (const descriptor of playCardSelectionDescriptors) {
    allowedZones.add(descriptor.sourceZone);
  }

  const explicitDescriptorCount =
    chosenCardTargetDescriptors.length +
    discardTargetDescriptors.length +
    playCardSelectionDescriptors.length +
    (chosenPlayerTarget ? 1 : 0);

  const minSelections =
    chosenCardTargetDescriptors.reduce(
      (total, descriptor) => total + descriptorMinSelections(descriptor),
      0,
    ) +
    discardTargetDescriptors.reduce((total, descriptor) => total + descriptor.minAmount, 0) +
    playCardSelectionDescriptors.length +
    (chosenPlayerTarget ? 1 : 0);

  const maxSelections =
    chosenCardTargetDescriptors.reduce(
      (total, descriptor) => total + descriptorMaxSelections(descriptor, cardCandidates.length),
      0,
    ) +
    discardTargetDescriptors.reduce(
      (total, descriptor) =>
        total +
        Math.min(
          descriptor.maxAmount,
          resolveActionDiscardSelectionCandidates(
            [descriptor],
            playerId,
            ctx.framework.state.playerIds,
            ctx,
            sourceCardId,
          ).length,
        ),
      0,
    ) +
    playCardSelectionDescriptors.length +
    (chosenPlayerTarget ? 1 : 0);

  return {
    cardCandidates,
    playerCandidates,
    allowedZones: [...allowedZones],
    minSelections: explicitDescriptorCount > 0 ? Math.max(0, minSelections) : 0,
    maxSelections:
      explicitDescriptorCount > 0
        ? Math.max(1, Math.min(cardCandidates.length + playerCandidates.length, maxSelections))
        : 0,
    requiresExplicitSelection: explicitDescriptorCount > 0,
    allowsDeferredResolutionWithoutInitialSelection: hasDeferredHandDiscardSelection,
  };
}

export function validateAndNormalizeTargetSelection(
  targets: unknown,
  analysis: TargetAnalysis,
  context?: TargetSelectionRestrictionContext,
): TargetValidationResult {
  if (targets === undefined) {
    return {
      valid: true,
      selection: {
        cardIds: [],
        playerIds: [],
      },
    };
  }

  const rawTargets = Array.isArray(targets) ? targets : [targets];
  const cardCandidateSet = new Set(analysis.cardCandidates);
  const playerCandidateSet = new Set(analysis.playerCandidates);
  const cardIds: CardInstanceId[] = [];
  const playerIds: PlayerId[] = [];
  const seen = new Set<string>();

  for (const target of rawTargets) {
    if (typeof target !== "string" || target.length === 0) {
      return {
        valid: false,
        error: "Targets must contain valid string identifiers",
        errorCode: "INVALID_ACTION_TARGETS",
      };
    }

    if (seen.has(target)) {
      return {
        valid: false,
        error: "Targets must be unique",
        errorCode: "DUPLICATE_TARGETS",
      };
    }
    seen.add(target);

    if (cardCandidateSet.has(target as CardInstanceId)) {
      cardIds.push(target as CardInstanceId);
      continue;
    }

    if (playerCandidateSet.has(target as PlayerId)) {
      playerIds.push(target as PlayerId);
      continue;
    }

    return {
      valid: false,
      error: `Target ${target} is not a legal target`,
      errorCode: "INVALID_ACTION_TARGET",
    };
  }

  const totalSelections = cardIds.length + playerIds.length;
  if (analysis.requiresExplicitSelection && totalSelections === 0 && rawTargets.length > 0) {
    return {
      valid: false,
      error: "Target selection cannot be empty",
      errorCode: "INVALID_ACTION_TARGETS",
    };
  }

  if (analysis.maxSelections > 0 && totalSelections > analysis.maxSelections) {
    return {
      valid: false,
      error: "Too many targets selected",
      errorCode: "TOO_MANY_TARGETS",
    };
  }

  const forcedTargetValidation = validateForcedEffectTargetSelection({
    analysis,
    selection: {
      cardIds,
      playerIds,
    },
    context,
  });
  if (forcedTargetValidation) {
    return forcedTargetValidation;
  }

  return {
    valid: true,
    selection: {
      cardIds,
      playerIds,
    },
  };
}

export function flattenNormalizedTargetSelection(
  selection: NormalizedTargetSelection,
): Array<CardInstanceId | PlayerId> | undefined {
  const targets = [...selection.cardIds, ...selection.playerIds];
  return targets.length > 0 ? targets : undefined;
}
