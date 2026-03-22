import type {
  CommandResult,
  DeepReadonly,
  EngineMoveValidationResult,
  MatchRuntimeConfig,
  MatchStaticResources,
  CardInstanceId,
  PlayerId,
} from "#core";
import type { Effect } from "@tcg/lorcana-types";
import { buildValidationContext } from "../core/runtime/match-runtime.utils";
import type { ChallengePreviewResult, PlayCardCostInput } from "../lorcana-engine-base";
import { lorcanaRuntimeConfig } from "../runtime-game";
import {
  getShiftRules,
  getSingTogetherThreshold,
  getSingerThresholdForInstance,
  isReadyAndNotDrying,
  isSongCard,
  resolveShiftTargetCandidates,
} from "../runtime-moves/rules/play-card-rules";
import {
  getGrantedActivatedAbilities,
  toStaticAbilityState,
} from "../runtime-moves/rules/static-ability-utils";
import { cardHasName } from "../card-utils";
import { analyzeEffectTargets } from "../targeting";
import type {
  ActivatedAbilityDefinition,
  BagEffectEntry,
  LorcanaCardDefinition,
  LorcanaMatchState,
  LorcanaProjectedBoardView,
  LorcanaProjectedCard,
  PendingActionEffect,
} from "../types";

import { createAutomatedActionBoardSnapshot } from "./decision-trace";
import {
  defaultLoreRaceAutomatedActionStrategy,
  summarizeDefaultLoreRaceCandidates,
} from "./default-strategy";
import {
  DEFAULT_AUTOMATED_ACTION_MAX_EXECUTION_FAILURES,
  DEFAULT_AUTOMATED_ACTION_SEARCH_CAPS,
  type AutomatedActionAuthoritativeHints,
  type AutomatedActionCandidate,
  type AutomatedActionCandidateSummary,
  type AutomatedActionCostSelections,
  type AutomatedActionDecisionTrace,
  type AutomatedActionDiagnostic,
  type AutomatedActionEnumerationOptions,
  type AutomatedActionEnumerationResult,
  type AutomatedActionExecutionAttempt,
  type AutomatedActionExecutionOptions,
  type AutomatedActionExecutionResult,
  type AutomatedActionFallback,
  type AutomatedActionPlanningContext,
  type AutomatedActionResolutionShape,
  type AutomatedActionResolutionVariant,
  type AutomatedActionSearchCaps,
  type AutomatedActionTargetId,
} from "./types";

type AutomatedActionPlannerAdapter = {
  actorId?: PlayerId;
  authoritativeHints?: AutomatedActionAuthoritativeHints;
  availableMoveIds: readonly string[];
  board: LorcanaProjectedBoardView;
  concede(actorId: PlayerId): CommandResult;
  createErrorResult(error: string, errorCode: string): CommandResult;
  executeCandidate(actorId: PlayerId, candidate: AutomatedActionCandidate): CommandResult;
  getDefinitionByInstanceId(cardId: CardInstanceId): LorcanaCardDefinition | undefined;
  passTurn(actorId: PlayerId): CommandResult;
  previewChallenge(
    attackerId: CardInstanceId,
    defenderId: CardInstanceId,
  ): ChallengePreviewResult | null;
  state: DeepReadonly<LorcanaMatchState>;
  staticResources: MatchStaticResources;
  validateCandidate(
    actorId: PlayerId,
    candidate: AutomatedActionCandidate,
  ): EngineMoveValidationResult;
};

type BagOrPendingEntry = {
  baseResolutionInput: {
    choiceIndex?: number;
    resolveOptional?: boolean;
    targets?: readonly AutomatedActionTargetId[];
  };
  effect: Effect | undefined;
  sourceCardId: CardInstanceId;
};

type EffectInspectionNode = Effect & {
  choices?: Effect[];
  destinations?: Array<{ zone: string }>;
  effect?: Effect;
  effects?: Effect[];
  else?: Effect;
  falseEffect?: Effect;
  ifFalse?: Effect;
  ifTrue?: Effect;
  options?: Effect[];
  ordering?: string;
  steps?: Effect[];
  then?: Effect;
  trueEffect?: Effect;
};

type ActionAbilityDefinition = Extract<
  NonNullable<LorcanaCardDefinition["abilities"]>[number],
  { type: "action" }
>;
type ResolutionVariantPart = {
  choiceIndex?: number;
  resolveOptional?: boolean;
  targets?: AutomatedActionTargetId[];
};

type PlannedAutomatedActions = {
  boardSnapshot: AutomatedActionDecisionTrace["boardSnapshot"];
  enumeration: AutomatedActionEnumerationResult;
  gameSegment?: string;
  orderedCandidateSummaries: AutomatedActionCandidateSummary[];
  phase?: string;
  step?: string | null;
  strategyName: string;
  turnNumber: number;
};

function mergeSearchCaps(
  caps: Partial<AutomatedActionSearchCaps> | undefined,
): AutomatedActionSearchCaps {
  return {
    ...DEFAULT_AUTOMATED_ACTION_SEARCH_CAPS,
    ...caps,
  };
}

function isMoveAvailable(
  adapter: AutomatedActionPlannerAdapter,
  moveId: AutomatedActionCandidate["family"],
): boolean {
  return adapter.availableMoveIds.includes(moveId);
}

function getPlayerZoneCardIds(
  board: LorcanaProjectedBoardView,
  playerId: PlayerId,
  zone: "hand" | "play" | "inkwell" | "discard",
): CardInstanceId[] {
  const playerBoard = board.players[playerId];
  if (!playerBoard) {
    return [];
  }

  const rawCards =
    zone === "hand"
      ? playerBoard.hand
      : zone === "play"
        ? playerBoard.play
        : zone === "inkwell"
          ? playerBoard.inkwell
          : playerBoard.discard;

  return rawCards.map((cardId) => String(cardId) as CardInstanceId);
}

function getProjectedCard(
  board: LorcanaProjectedBoardView,
  cardId: CardInstanceId,
): LorcanaProjectedCard | undefined {
  return board.cards[String(cardId)];
}

function getCardName(board: LorcanaProjectedBoardView, cardId: CardInstanceId): string {
  return getProjectedCard(board, cardId)?.fullName ?? String(cardId);
}

function getPrintedCost(board: LorcanaProjectedBoardView, cardId: CardInstanceId): number {
  return getProjectedCard(board, cardId)?.playCost ?? 0;
}

function getPrintedLore(board: LorcanaProjectedBoardView, cardId: CardInstanceId): number {
  return getProjectedCard(board, cardId)?.lore ?? 0;
}

function compareCardIds(
  board: LorcanaProjectedBoardView,
  left: CardInstanceId,
  right: CardInstanceId,
): number {
  const leftName = getCardName(board, left);
  const rightName = getCardName(board, right);
  const nameOrder = leftName.localeCompare(rightName);
  if (nameOrder !== 0) {
    return nameOrder;
  }

  return String(left).localeCompare(String(right));
}

function stableSortIds(
  board: LorcanaProjectedBoardView,
  ids: readonly CardInstanceId[],
): CardInstanceId[] {
  return [...ids].sort((left, right) => compareCardIds(board, left, right));
}

function getCandidateKey(candidate: AutomatedActionCandidate): string {
  switch (candidate.family) {
    case "chooseWhoGoesFirst":
      return `chooseWhoGoesFirst:${candidate.firstPlayerId}`;
    case "alterHand":
      return `alterHand:${candidate.plan}:${candidate.cardsToMulligan.join(",")}`;
    case "resolveBag":
      return `resolveBag:${candidate.bagId}:${candidate.choiceIndex ?? ""}:${candidate.resolveOptional ?? ""}:${candidate.targets?.join(",") ?? ""}`;
    case "resolveEffect":
      return `resolveEffect:${candidate.effectId}:${candidate.choiceIndex ?? ""}:${candidate.resolveOptional ?? ""}:${candidate.targets?.join(",") ?? ""}`;
    case "putCardIntoInkwell":
      return `putCardIntoInkwell:${candidate.cardId}`;
    case "playCard":
      return `playCard:${candidate.cardId}:${typeof candidate.cost === "object" ? JSON.stringify(candidate.cost) : candidate.cost}:${candidate.choiceIndex ?? ""}:${candidate.resolveOptional ?? ""}:${candidate.targets?.join(",") ?? ""}`;
    case "activateAbility":
      return `activateAbility:${candidate.cardId}:${candidate.abilityIndex}:${candidate.choiceIndex ?? ""}:${candidate.targets?.join(",") ?? ""}:${candidate.costs?.banishCharacters?.join(",") ?? ""}:${candidate.costs?.banishItems?.join(",") ?? ""}:${candidate.costs?.discardCards?.join(",") ?? ""}:${candidate.costs?.exertCharacters?.join(",") ?? ""}`;
    case "quest":
      return `quest:${candidate.cardId}`;
    case "challenge":
      return `challenge:${candidate.attackerId}:${candidate.defenderId}`;
    case "moveCharacterToLocation":
      return `moveCharacterToLocation:${candidate.characterId}:${candidate.locationId}`;
  }
}

function enumerateBoundedCombinations<T>(
  items: readonly T[],
  minLength: number,
  maxLength: number,
  cap: number,
): { combinations: T[][]; overflow: boolean } {
  const combinations: T[][] = [];
  const boundedMin = Math.max(0, minLength);
  const boundedMax = Math.max(boundedMin, Math.min(maxLength, items.length));
  let overflow = false;

  const visit = (startIndex: number, current: T[]): void => {
    if (overflow) {
      return;
    }

    if (current.length >= boundedMin && current.length <= boundedMax) {
      combinations.push([...current]);
      if (combinations.length > cap) {
        overflow = true;
        return;
      }
    }

    if (current.length === boundedMax) {
      return;
    }

    for (let index = startIndex; index < items.length; index += 1) {
      current.push(items[index]!);
      visit(index + 1, current);
      current.pop();
      if (overflow) {
        return;
      }
    }
  };

  visit(0, []);
  return {
    combinations: overflow ? [] : combinations,
    overflow,
  };
}

function cartesianProduct<T>(
  groups: readonly T[][],
  cap: number,
): { overflow: boolean; values: T[][] } {
  if (groups.length === 0) {
    return { overflow: false, values: [[]] };
  }

  const values: T[][] = [[]];
  for (const group of groups) {
    const next: T[][] = [];
    for (const prefix of values) {
      for (const value of group) {
        next.push([...prefix, value]);
        if (next.length > cap) {
          return { overflow: true, values: [] };
        }
      }
    }
    values.splice(0, values.length, ...next);
  }

  return { overflow: false, values };
}

function buildReadContext(adapter: AutomatedActionPlannerAdapter, actorId: PlayerId) {
  return buildValidationContext(
    adapter.state as LorcanaMatchState,
    actorId,
    { args: {} },
    lorcanaRuntimeConfig as unknown as MatchRuntimeConfig,
    adapter.staticResources,
    adapter.board.status === "finished",
    "preflight",
  );
}

function pushValidationDiagnostic(
  diagnostics: AutomatedActionDiagnostic[],
  candidate: AutomatedActionCandidate,
  validation: EngineMoveValidationResult,
): void {
  diagnostics.push({
    kind: "validation-reject",
    family: candidate.family,
    reason: validation.reason ?? "Candidate validation rejected the action",
    code: validation.code,
    candidate,
  });
}

function addValidatedCandidate(
  adapter: AutomatedActionPlannerAdapter,
  diagnostics: AutomatedActionDiagnostic[],
  actorId: PlayerId,
  candidates: AutomatedActionCandidate[],
  candidate: AutomatedActionCandidate,
): void {
  const validation = adapter.validateCandidate(actorId, candidate);
  if (!validation.valid) {
    pushValidationDiagnostic(diagnostics, candidate, validation);
    return;
  }

  candidates.push(candidate);
}

function inspectResolutionShape(effect: Effect | undefined): AutomatedActionResolutionShape {
  const shape: AutomatedActionResolutionShape = {
    choiceCount: 0,
    optionalCount: 0,
    requiresDestinations: false,
    requiresNamedCard: false,
    requiresOrderedTargets: false,
    usesAmountSelection: false,
  };

  const visit = (current: Effect | undefined): void => {
    if (!current) {
      return;
    }

    const node = current as EffectInspectionNode;
    switch (node.type) {
      case "optional":
        shape.optionalCount += 1;
        break;
      case "choice":
      case "or":
        shape.choiceCount += 1;
        shape.choiceOptionCount = Math.max(
          shape.choiceOptionCount ?? 0,
          node.options?.length ?? node.choices?.length ?? 0,
        );
        break;
      case "name-a-card":
        shape.requiresNamedCard = true;
        break;
      case "scry":
        if ((node.destinations?.length ?? 0) > 0) {
          shape.requiresDestinations = true;
        }
        break;
      case "put-on-bottom":
        if (node.ordering === "player-choice") {
          shape.requiresOrderedTargets = true;
        }
        break;
    }

    const nestedEffects: Array<Effect | undefined> = [
      node.effect,
      node.then,
      node.else,
      node.ifTrue,
      node.ifFalse,
      node.trueEffect,
      node.falseEffect,
      ...(node.effects ?? []),
      ...(node.steps ?? []),
      ...(node.options ?? []),
      ...(node.choices ?? []),
    ];
    for (const nestedEffect of nestedEffects) {
      visit(nestedEffect);
    }
  };

  visit(effect);
  return shape;
}

function selectZoneCards(
  board: LorcanaProjectedBoardView,
  ownerId: PlayerId,
  zone: "deck" | "hand" | "play" | "inkwell" | "discard",
): LorcanaProjectedCard[] {
  const playerBoard = board.players[ownerId];
  if (!playerBoard) {
    return [];
  }

  const zoneCards =
    zone === "deck"
      ? playerBoard.deckTop
        ? [playerBoard.deckTop]
        : []
      : zone === "hand"
        ? playerBoard.hand
        : zone === "play"
          ? playerBoard.play
          : zone === "inkwell"
            ? playerBoard.inkwell
            : playerBoard.discard;

  return zoneCards
    .map((cardId) => board.cards[String(cardId)])
    .filter((card): card is LorcanaProjectedCard => Boolean(card));
}

function resolveOrRequiredSelectionCount(count: unknown): number {
  if (typeof count === "number" && Number.isFinite(count)) {
    return Math.max(0, Math.floor(count));
  }

  return 1;
}

function getOrTargetPlayerIds(
  board: LorcanaProjectedBoardView,
  target: unknown,
  controllerId: PlayerId,
): PlayerId[] {
  switch (target) {
    case "OPPONENT":
    case "OPPONENTS":
    case "EACH_OPPONENT":
      return board.playerOrder.filter((playerId) => playerId !== controllerId);
    case "EACH_PLAYER":
    case "ALL_PLAYERS":
      return [...board.playerOrder];
    case "CONTROLLER":
    case "CURRENT_TURN":
    default:
      return [controllerId];
  }
}

function isProjectedOrOptionLegal(
  adapter: AutomatedActionPlannerAdapter,
  effect: Effect | undefined,
  controllerId: PlayerId,
  sourceCardId: CardInstanceId,
): boolean {
  if (!effect || typeof effect !== "object") {
    return false;
  }

  const effectRecord = effect as EffectInspectionNode;
  const effectType = effectRecord.type;

  if (effectType === "sequence") {
    const nestedEffects = Array.isArray(effectRecord.steps)
      ? effectRecord.steps
      : Array.isArray(effectRecord.effects)
        ? effectRecord.effects
        : [];
    const firstNestedEffect = nestedEffects[0] as Effect | undefined;
    return firstNestedEffect
      ? isProjectedOrOptionLegal(adapter, firstNestedEffect, controllerId, sourceCardId)
      : false;
  }

  if (effectType === "discard") {
    const requiredCount =
      effectRecord.amount === "all" ? 1 : resolveOrRequiredSelectionCount(effectRecord.amount);
    const filter =
      effectRecord.filter && typeof effectRecord.filter === "object"
        ? (effectRecord.filter as Record<string, unknown>)
        : undefined;
    const sourceZone =
      effectRecord.from === "deck" ||
      effectRecord.from === "hand" ||
      effectRecord.from === "play" ||
      effectRecord.from === "discard" ||
      effectRecord.from === "inkwell"
        ? effectRecord.from
        : "hand";

    return getOrTargetPlayerIds(adapter.board, effectRecord.target, controllerId).every(
      (playerId) => {
        const candidates = selectZoneCards(adapter.board, playerId, sourceZone).filter((card) => {
          const definition = adapter.getDefinitionByInstanceId(card.id as CardInstanceId);
          if (!definition) {
            return false;
          }

          const cardType = typeof filter?.cardType === "string" ? filter.cardType : undefined;
          const notCardType =
            typeof filter?.notCardType === "string" ? filter.notCardType : undefined;
          const classification =
            typeof filter?.classification === "string" ? filter.classification : undefined;
          const maxCost = typeof filter?.maxCost === "number" ? filter.maxCost : undefined;

          if (cardType && definition.cardType !== cardType) {
            return false;
          }
          if (notCardType && definition.cardType === notCardType) {
            return false;
          }
          if (
            classification &&
            !(
              ("classifications" in definition ? definition.classifications : undefined) ?? []
            ).some((candidateClassification: string) => candidateClassification === classification)
          ) {
            return false;
          }
          if (typeof maxCost === "number" && typeof definition.cost === "number") {
            return definition.cost <= maxCost;
          }

          return true;
        });

        return candidates.length >= requiredCount;
      },
    );
  }

  if (effectType === "return-to-hand") {
    const target =
      effectRecord.target && typeof effectRecord.target === "object"
        ? (effectRecord.target as Record<string, unknown>)
        : undefined;
    if (!target || target.selector !== "chosen") {
      return false;
    }

    const requiredCount = resolveOrRequiredSelectionCount(target.count);
    const owner =
      target.owner === "you" || target.owner === "opponent" || target.owner === "any"
        ? target.owner
        : "any";
    const playerIds =
      owner === "you"
        ? [controllerId]
        : owner === "opponent"
          ? adapter.board.playerOrder.filter((playerId) => playerId !== controllerId)
          : adapter.board.playerOrder;
    const cardTypes = Array.isArray(target.cardTypes)
      ? target.cardTypes.filter((cardType): cardType is string => typeof cardType === "string")
      : [];
    const excludeSelf = target.excludeSelf === true;

    const candidates = playerIds
      .flatMap((playerId) => selectZoneCards(adapter.board, playerId, "play"))
      .filter((card) => !excludeSelf || String(card.id) !== sourceCardId)
      .filter((card) => {
        const definition = adapter.getDefinitionByInstanceId(card.id as CardInstanceId);
        return !!definition && (cardTypes.length === 0 || cardTypes.includes(definition.cardType));
      });

    return candidates.length >= requiredCount;
  }

  if (effectType === "banish") {
    if (effectRecord.target !== "SELF") {
      return false;
    }

    const zone = getProjectedCard(adapter.board, sourceCardId)?.zone;
    return zone === "play" || zone === "limbo";
  }

  return true;
}

function getForcedChoiceIndex(args: {
  adapter: AutomatedActionPlannerAdapter;
  analysisPlayerId: PlayerId;
  effect: Effect | undefined;
  sourceCardId: CardInstanceId;
}): number | undefined {
  const { adapter, analysisPlayerId, effect, sourceCardId } = args;
  if (!effect || typeof effect !== "object") {
    return undefined;
  }

  const effectRecord = effect as EffectInspectionNode;
  if (effectRecord.type !== "or") {
    return undefined;
  }

  const options = Array.isArray(effectRecord.options)
    ? effectRecord.options
    : Array.isArray(effectRecord.choices)
      ? effectRecord.choices
      : [];
  if (options.length === 0) {
    return undefined;
  }

  const legalIndices = options.flatMap((option, index) =>
    isProjectedOrOptionLegal(adapter, option as Effect, analysisPlayerId, sourceCardId)
      ? [index]
      : [],
  );

  return legalIndices.length === 1 ? legalIndices[0] : undefined;
}

function buildTargetVariants(args: {
  adapter: AutomatedActionPlannerAdapter;
  analysisPlayerId: PlayerId;
  baseTargets?: readonly AutomatedActionTargetId[];
  diagnostics: AutomatedActionDiagnostic[];
  effect: Effect | undefined;
  family: AutomatedActionCandidate["family"];
  sourceCardId: CardInstanceId;
  searchCaps: AutomatedActionSearchCaps;
}): AutomatedActionTargetId[][] | null {
  const {
    adapter,
    analysisPlayerId,
    baseTargets,
    diagnostics,
    effect,
    family,
    sourceCardId,
    searchCaps,
  } = args;
  if ((baseTargets?.length ?? 0) > 0) {
    return [[...(baseTargets ?? [])]];
  }
  if (!effect) {
    return [[]];
  }

  const readContext = buildReadContext(adapter, analysisPlayerId);
  const analysis = analyzeEffectTargets(
    effect,
    analysisPlayerId,
    readContext as unknown as Parameters<typeof analyzeEffectTargets>[2],
    sourceCardId,
  );
  if (!analysis.requiresExplicitSelection) {
    return [[]];
  }

  const pool = [
    ...analysis.cardCandidates.map((cardId) => String(cardId) as AutomatedActionTargetId),
    ...analysis.playerCandidates.map((playerId) => String(playerId) as AutomatedActionTargetId),
  ];
  if (analysis.requiresExplicitSelection && pool.length === 0) {
    return [[]];
  }
  if (pool.length > searchCaps.targetPool) {
    diagnostics.push({
      kind: "overflow-skip",
      family,
      reason: "Target pool exceeds the configured automation search cap",
      cap: searchCaps.targetPool,
      actual: pool.length,
      sourceCardId,
    });
    return null;
  }

  const minSelections = Math.max(
    analysis.minSelections,
    analysis.allowsDeferredResolutionWithoutInitialSelection ? 0 : 1,
  );
  const { combinations, overflow } = enumerateBoundedCombinations(
    pool,
    minSelections,
    Math.max(minSelections, analysis.maxSelections),
    searchCaps.targetCombinationsPerFamily,
  );
  if (overflow) {
    diagnostics.push({
      kind: "overflow-skip",
      family,
      reason: "Target combinations exceed the configured automation search cap",
      cap: searchCaps.targetCombinationsPerFamily,
      actual: searchCaps.targetCombinationsPerFamily + 1,
      sourceCardId,
    });
    return null;
  }

  if (
    analysis.allowsDeferredResolutionWithoutInitialSelection &&
    !combinations.some((combination) => combination.length === 0)
  ) {
    combinations.unshift([]);
  }

  return combinations;
}

function buildResolutionVariants(args: {
  adapter: AutomatedActionPlannerAdapter;
  analysisPlayerId: PlayerId;
  bagId?: string;
  baseResolutionInput?: BagOrPendingEntry["baseResolutionInput"];
  diagnostics: AutomatedActionDiagnostic[];
  effect: Effect | undefined;
  effectId?: string;
  family: AutomatedActionCandidate["family"];
  pendingKind?: PendingActionEffect["kind"];
  searchCaps: AutomatedActionSearchCaps;
  sourceCardId: CardInstanceId;
}): AutomatedActionResolutionVariant[] | null {
  const {
    adapter,
    analysisPlayerId,
    bagId,
    baseResolutionInput,
    diagnostics,
    effect,
    effectId,
    family,
    pendingKind,
    searchCaps,
    sourceCardId,
  } = args;
  if (!effect) {
    return [{}];
  }

  const shape = inspectResolutionShape(effect);
  if (shape.requiresNamedCard) {
    diagnostics.push({
      kind: "unsupported-shape",
      family,
      reason: "Name-a-card resolutions are outside the v1 automation support matrix",
      sourceCardId,
      bagId,
      effectId,
    });
    return null;
  }
  if (shape.requiresDestinations || shape.requiresOrderedTargets) {
    diagnostics.push({
      kind: "unsupported-shape",
      family,
      reason: "Ordered destination selection is outside the v1 automation support matrix",
      sourceCardId,
      bagId,
      effectId,
    });
    return null;
  }
  if (shape.usesAmountSelection) {
    diagnostics.push({
      kind: "unsupported-shape",
      family,
      reason: "Amount selection is outside the v1 automation support matrix",
      sourceCardId,
      bagId,
      effectId,
    });
    return null;
  }
  if (shape.choiceCount > 1 || shape.optionalCount > 1) {
    diagnostics.push({
      kind: "unsupported-shape",
      family,
      reason: "Nested branching exceeds the v1 automation support matrix",
      sourceCardId,
      bagId,
      effectId,
    });
    return null;
  }

  const targetVariants = buildTargetVariants({
    adapter,
    analysisPlayerId,
    baseTargets: baseResolutionInput?.targets,
    diagnostics,
    effect,
    family,
    sourceCardId,
    searchCaps,
  });
  if (!targetVariants) {
    return null;
  }

  const forcedChoiceIndex =
    typeof baseResolutionInput?.choiceIndex === "number"
      ? undefined
      : getForcedChoiceIndex({
          adapter,
          analysisPlayerId,
          effect,
          sourceCardId,
        });

  const choiceValues =
    typeof baseResolutionInput?.choiceIndex === "number"
      ? [baseResolutionInput.choiceIndex]
      : typeof forcedChoiceIndex === "number"
        ? [forcedChoiceIndex]
        : pendingKind === "choice-selection" || shape.choiceCount > 0
          ? (() => {
              const optionCount = shape.choiceOptionCount ?? 0;
              if (optionCount > searchCaps.choiceIndices) {
                diagnostics.push({
                  kind: "overflow-skip",
                  family,
                  reason: "Choice branches exceed the configured automation search cap",
                  cap: searchCaps.choiceIndices,
                  actual: optionCount,
                  sourceCardId,
                  bagId,
                  effectId,
                });
                return null;
              }

              return Array.from({ length: optionCount }, (_, index) => index);
            })()
          : [undefined];
  if (!choiceValues) {
    return null;
  }

  const optionalValues =
    typeof baseResolutionInput?.resolveOptional === "boolean"
      ? [baseResolutionInput.resolveOptional]
      : pendingKind === "optional-selection" || shape.optionalCount > 0
        ? [false, true]
        : [undefined];

  const groups = cartesianProduct<ResolutionVariantPart>(
    [
      targetVariants.map((targets) => ({ targets })),
      choiceValues.map((choiceIndex) => ({ choiceIndex })),
      optionalValues.map((resolveOptional) => ({ resolveOptional })),
    ],
    searchCaps.targetCombinationsPerFamily * Math.max(1, choiceValues.length),
  );
  if (groups.overflow) {
    diagnostics.push({
      kind: "overflow-skip",
      family,
      reason: "Resolution variants exceed the configured automation search cap",
      cap: searchCaps.targetCombinationsPerFamily * Math.max(1, choiceValues.length),
      actual: searchCaps.targetCombinationsPerFamily * Math.max(1, choiceValues.length) + 1,
      sourceCardId,
      bagId,
      effectId,
    });
    return null;
  }

  return groups.values.map((group) =>
    group.reduce<AutomatedActionResolutionVariant>(
      (current, next) => ({
        ...current,
        ...(next.choiceIndex !== undefined ? { choiceIndex: next.choiceIndex } : {}),
        ...(typeof next.resolveOptional === "boolean"
          ? { resolveOptional: next.resolveOptional }
          : {}),
        ...(next.targets && next.targets.length > 0 ? { targets: next.targets } : {}),
      }),
      {},
    ),
  );
}

function extractBagEntry(entry: DeepReadonly<BagEffectEntry>): BagOrPendingEntry {
  return {
    baseResolutionInput: {
      choiceIndex: entry.resolutionInput.choiceIndex,
      resolveOptional: entry.resolutionInput.resolveOptional,
      targets: Array.isArray(entry.resolutionInput.targets)
        ? [...entry.resolutionInput.targets]
        : typeof entry.resolutionInput.targets === "string"
          ? [entry.resolutionInput.targets]
          : undefined,
    },
    effect: entry.effect as Effect | undefined,
    sourceCardId: entry.sourceId,
  };
}

function extractPendingEntry(entry: DeepReadonly<PendingActionEffect>): BagOrPendingEntry {
  return {
    baseResolutionInput: {
      choiceIndex: entry.resolutionInput.choiceIndex,
      resolveOptional: entry.resolutionInput.resolveOptional,
      targets: Array.isArray(entry.resolutionInput.targets)
        ? [...entry.resolutionInput.targets]
        : typeof entry.resolutionInput.targets === "string"
          ? [entry.resolutionInput.targets]
          : undefined,
    },
    effect: entry.effect as Effect | undefined,
    sourceCardId: entry.sourceCardId,
  };
}

function getActorCharactersInPlay(
  adapter: AutomatedActionPlannerAdapter,
  actorId: PlayerId,
): CardInstanceId[] {
  return stableSortIds(
    adapter.board,
    getPlayerZoneCardIds(adapter.board, actorId, "play").filter((cardId) => {
      const definition = adapter.getDefinitionByInstanceId(cardId);
      return definition?.cardType === "character";
    }),
  );
}

function getActorLocationsInPlay(
  adapter: AutomatedActionPlannerAdapter,
  actorId: PlayerId,
): CardInstanceId[] {
  return stableSortIds(
    adapter.board,
    getPlayerZoneCardIds(adapter.board, actorId, "play").filter((cardId) => {
      const definition = adapter.getDefinitionByInstanceId(cardId);
      return definition?.cardType === "location";
    }),
  );
}

function enumerateChooseWhoGoesFirstCandidates(args: {
  actorId: PlayerId;
  adapter: AutomatedActionPlannerAdapter;
  diagnostics: AutomatedActionDiagnostic[];
  candidates: AutomatedActionCandidate[];
}): void {
  const { actorId, adapter, diagnostics, candidates } = args;
  if (!isMoveAvailable(adapter, "chooseWhoGoesFirst")) {
    return;
  }
  if (adapter.board.choosingFirstPlayer !== actorId) {
    return;
  }

  for (const playerId of adapter.board.playerOrder) {
    addValidatedCandidate(adapter, diagnostics, actorId, candidates, {
      family: "chooseWhoGoesFirst",
      firstPlayerId: playerId,
    });
  }
}

function enumerateAlterHandCandidates(args: {
  actorId: PlayerId;
  adapter: AutomatedActionPlannerAdapter;
  diagnostics: AutomatedActionDiagnostic[];
  candidates: AutomatedActionCandidate[];
}): void {
  const { actorId, adapter, diagnostics, candidates } = args;
  if (!isMoveAvailable(adapter, "alterHand")) {
    return;
  }
  if (!adapter.board.pendingMulligan.includes(actorId)) {
    return;
  }

  const hand = stableSortIds(adapter.board, getPlayerZoneCardIds(adapter.board, actorId, "hand"));
  const handWithDefinitions = hand.map((cardId) => ({
    cardId,
    cost: getPrintedCost(adapter.board, cardId),
    inkable: getProjectedCard(adapter.board, cardId)?.canBePutInInkwell === true,
  }));

  const structuralMulligan = new Set<CardInstanceId>(
    handWithDefinitions
      .filter((entry) => !entry.inkable || entry.cost >= 5)
      .map((entry) => entry.cardId),
  );
  const preferredKeepers = [...handWithDefinitions].sort((left, right) => {
    if (left.inkable !== right.inkable) {
      return left.inkable ? -1 : 1;
    }
    if (left.cost <= 2 !== right.cost <= 2) {
      return left.cost <= 2 ? -1 : 1;
    }
    if (left.cost !== right.cost) {
      return left.cost - right.cost;
    }
    return compareCardIds(adapter.board, left.cardId, right.cardId);
  });

  while (hand.length - structuralMulligan.size < 2 && structuralMulligan.size > 0) {
    const keeper = preferredKeepers.find((entry) => structuralMulligan.has(entry.cardId));
    if (!keeper) {
      break;
    }
    structuralMulligan.delete(keeper.cardId);
  }

  const candidateMap = new Map<string, AutomatedActionCandidate>();
  const candidateList: Extract<AutomatedActionCandidate, { family: "alterHand" }>[] = [
    {
      family: "alterHand",
      cardsToMulligan: [],
      plan: "keep-all",
    },
    {
      family: "alterHand",
      cardsToMulligan: stableSortIds(adapter.board, [...structuralMulligan]),
      plan: "structural-mulligan",
    },
    {
      family: "alterHand",
      cardsToMulligan: [...hand],
      plan: "full-mulligan",
    },
  ];

  for (const candidate of candidateList) {
    const key = candidate.cardsToMulligan.join(",");
    if (!candidateMap.has(key)) {
      candidateMap.set(key, candidate);
    }
  }

  for (const candidate of candidateMap.values()) {
    addValidatedCandidate(adapter, diagnostics, actorId, candidates, candidate);
  }
}

function getBagEntriesForActor(
  adapter: AutomatedActionPlannerAdapter,
  actorId: PlayerId,
): readonly DeepReadonly<BagEffectEntry>[] {
  if (adapter.authoritativeHints) {
    return adapter.authoritativeHints.bagItems.filter((entry) => entry.controllerId === actorId);
  }

  return adapter.board.bagEffects
    .filter((entry) => entry.controllerId === actorId)
    .map((entry) => entry.payload as DeepReadonly<BagEffectEntry>);
}

function enumerateResolveBagCandidates(args: {
  actorId: PlayerId;
  adapter: AutomatedActionPlannerAdapter;
  diagnostics: AutomatedActionDiagnostic[];
  candidates: AutomatedActionCandidate[];
  searchCaps: AutomatedActionSearchCaps;
}): void {
  const { actorId, adapter, diagnostics, candidates, searchCaps } = args;
  if (!isMoveAvailable(adapter, "resolveBag")) {
    return;
  }

  const bagEntries = getBagEntriesForActor(adapter, actorId);
  if (bagEntries.length === 0) {
    return;
  }
  if (bagEntries.length > searchCaps.pendingItems) {
    diagnostics.push({
      kind: "overflow-skip",
      family: "resolveBag",
      reason: "Pending bag items exceed the configured automation search cap",
      cap: searchCaps.pendingItems,
      actual: bagEntries.length,
    });
    return;
  }

  for (const bagEntry of bagEntries) {
    const extracted = extractBagEntry(bagEntry);
    const variants = buildResolutionVariants({
      adapter,
      analysisPlayerId: bagEntry.controllerId,
      bagId: bagEntry.id,
      baseResolutionInput: extracted.baseResolutionInput,
      diagnostics,
      effect: extracted.effect,
      family: "resolveBag",
      searchCaps,
      sourceCardId: extracted.sourceCardId,
    });
    if (!variants) {
      continue;
    }

    for (const variant of variants) {
      addValidatedCandidate(adapter, diagnostics, actorId, candidates, {
        family: "resolveBag",
        bagId: bagEntry.id,
        ...(typeof variant.choiceIndex === "number" ? { choiceIndex: variant.choiceIndex } : {}),
        ...(typeof variant.resolveOptional === "boolean"
          ? { resolveOptional: variant.resolveOptional }
          : {}),
        ...(variant.targets && variant.targets.length > 0 ? { targets: variant.targets } : {}),
      });
    }
  }
}

function getPendingEffectsForActor(
  adapter: AutomatedActionPlannerAdapter,
  actorId: PlayerId,
): readonly DeepReadonly<PendingActionEffect>[] {
  const pendingEffects =
    adapter.authoritativeHints?.pendingEffects ?? adapter.state.G.pendingEffects;
  const pendingChoice = adapter.state.ctx.priority.pendingChoice;

  if (pendingChoice?.type === "action-effect") {
    if (pendingChoice.playerID !== actorId) {
      return [];
    }

    const matchingEffect = pendingEffects.find(
      (entry) => entry.id === pendingChoice.requestID && entry.chooserId === actorId,
    );
    return matchingEffect ? [matchingEffect] : [];
  }

  return pendingEffects.filter((entry) => entry.chooserId === actorId);
}

function enumerateResolveEffectCandidates(args: {
  actorId: PlayerId;
  adapter: AutomatedActionPlannerAdapter;
  diagnostics: AutomatedActionDiagnostic[];
  candidates: AutomatedActionCandidate[];
  searchCaps: AutomatedActionSearchCaps;
}): void {
  const { actorId, adapter, diagnostics, candidates, searchCaps } = args;
  if (!isMoveAvailable(adapter, "resolveEffect")) {
    return;
  }

  const pendingEffects = getPendingEffectsForActor(adapter, actorId);
  if (pendingEffects.length === 0) {
    return;
  }
  if (pendingEffects.length > searchCaps.pendingItems) {
    diagnostics.push({
      kind: "overflow-skip",
      family: "resolveEffect",
      reason: "Pending effects exceed the configured automation search cap",
      cap: searchCaps.pendingItems,
      actual: pendingEffects.length,
    });
    return;
  }

  for (const pendingEffect of pendingEffects) {
    if (pendingEffect.kind === "name-card-selection") {
      diagnostics.push({
        kind: "unsupported-shape",
        family: "resolveEffect",
        reason: "Name-a-card resolutions are outside the v1 automation support matrix",
        sourceCardId: pendingEffect.sourceCardId,
        effectId: pendingEffect.id,
      });
      continue;
    }
    if (pendingEffect.kind === "scry-selection") {
      diagnostics.push({
        kind: "unsupported-shape",
        family: "resolveEffect",
        reason: "Ordered destination selection is outside the v1 automation support matrix",
        sourceCardId: pendingEffect.sourceCardId,
        effectId: pendingEffect.id,
      });
      continue;
    }

    const extracted = extractPendingEntry(pendingEffect);
    const variants = buildResolutionVariants({
      adapter,
      analysisPlayerId: pendingEffect.controllerId,
      baseResolutionInput: extracted.baseResolutionInput,
      diagnostics,
      effect: extracted.effect,
      effectId: pendingEffect.id,
      family: "resolveEffect",
      pendingKind: pendingEffect.kind,
      searchCaps,
      sourceCardId: extracted.sourceCardId,
    });
    if (!variants) {
      continue;
    }

    for (const variant of variants) {
      addValidatedCandidate(adapter, diagnostics, actorId, candidates, {
        family: "resolveEffect",
        effectId: pendingEffect.id,
        ...(typeof variant.choiceIndex === "number" ? { choiceIndex: variant.choiceIndex } : {}),
        ...(typeof variant.resolveOptional === "boolean"
          ? { resolveOptional: variant.resolveOptional }
          : {}),
        ...(variant.targets && variant.targets.length > 0 ? { targets: variant.targets } : {}),
      });
    }
  }
}

function enumeratePutInkCandidates(args: {
  actorId: PlayerId;
  adapter: AutomatedActionPlannerAdapter;
  diagnostics: AutomatedActionDiagnostic[];
  candidates: AutomatedActionCandidate[];
}): void {
  const { actorId, adapter, diagnostics, candidates } = args;
  if (!isMoveAvailable(adapter, "putCardIntoInkwell")) {
    return;
  }

  for (const cardId of stableSortIds(
    adapter.board,
    getPlayerZoneCardIds(adapter.board, actorId, "hand").filter(
      (candidateId) => getProjectedCard(adapter.board, candidateId)?.canBePutInInkwell === true,
    ),
  )) {
    addValidatedCandidate(adapter, diagnostics, actorId, candidates, {
      family: "putCardIntoInkwell",
      cardId,
    });
  }
}

function enumeratePlayCostModes(args: {
  actorId: PlayerId;
  adapter: AutomatedActionPlannerAdapter;
  cardDef: LorcanaCardDefinition;
  cardId: CardInstanceId;
  searchCaps: AutomatedActionSearchCaps;
  diagnostics: AutomatedActionDiagnostic[];
}): PlayCardCostInput[] {
  const { actorId, adapter, cardDef, cardId, searchCaps, diagnostics } = args;
  const costModes: PlayCardCostInput[] = ["standard", "free"];
  const readContext = buildReadContext(adapter, actorId);
  const readyCharacters = getActorCharactersInPlay(adapter, actorId).filter((characterId) => {
    const meta = readContext.cards.require(characterId).meta;
    return isReadyAndNotDrying(meta);
  });

  const shiftRules = getShiftRules(cardDef);
  if (shiftRules?.unsupportedReason) {
    diagnostics.push({
      kind: "unsupported-shape",
      family: "playCard",
      reason: shiftRules.unsupportedReason,
      sourceCardId: cardId,
    });
  } else if (shiftRules) {
    const shiftCandidates = resolveShiftTargetCandidates(
      shiftRules,
      readyCharacters,
      (candidateId) => adapter.getDefinitionByInstanceId(candidateId),
    );
    for (const shiftTarget of stableSortIds(adapter.board, shiftCandidates)) {
      costModes.push({ cost: "shift", shiftTarget });
    }
  }

  if (isSongCard(cardDef)) {
    for (const singer of readyCharacters) {
      const threshold = getSingerThresholdForInstance({
        framework: readContext.framework,
        singerId: singer,
        singerDef: adapter.getDefinitionByInstanceId(singer),
        getDefinitionByInstanceId: (candidateId) => adapter.getDefinitionByInstanceId(candidateId),
      });
      if (threshold !== null && threshold >= cardDef.cost) {
        costModes.push({ cost: "sing", singer });
      }
    }

    const singTogetherThreshold = getSingTogetherThreshold(cardDef);
    if (singTogetherThreshold !== null) {
      const singerThresholds = readyCharacters
        .map((singerId) => ({
          singerId,
          threshold:
            getSingerThresholdForInstance({
              framework: readContext.framework,
              singerId,
              singerDef: adapter.getDefinitionByInstanceId(singerId),
              getDefinitionByInstanceId: (candidateId) =>
                adapter.getDefinitionByInstanceId(candidateId),
            }) ?? 0,
        }))
        .filter((entry) => entry.threshold > 0);
      const { combinations, overflow } = enumerateBoundedCombinations(
        singerThresholds,
        1,
        singerThresholds.length,
        searchCaps.singerCombinations,
      );
      if (overflow) {
        diagnostics.push({
          kind: "overflow-skip",
          family: "playCard",
          reason: "Singer combinations exceed the configured automation search cap",
          cap: searchCaps.singerCombinations,
          actual: searchCaps.singerCombinations + 1,
          sourceCardId: cardId,
        });
      } else {
        for (const combination of combinations) {
          const totalThreshold = combination.reduce((sum, entry) => sum + entry.threshold, 0);
          if (totalThreshold >= singTogetherThreshold) {
            costModes.push({
              cost: "singTogether",
              singers: stableSortIds(
                adapter.board,
                combination.map((entry) => entry.singerId),
              ),
            });
          }
        }
      }
    }
  }

  return costModes;
}

function enumeratePlayCardCandidates(args: {
  actorId: PlayerId;
  adapter: AutomatedActionPlannerAdapter;
  diagnostics: AutomatedActionDiagnostic[];
  candidates: AutomatedActionCandidate[];
  searchCaps: AutomatedActionSearchCaps;
}): void {
  const { actorId, adapter, diagnostics, candidates, searchCaps } = args;
  if (!isMoveAvailable(adapter, "playCard")) {
    return;
  }

  for (const cardId of stableSortIds(
    adapter.board,
    getPlayerZoneCardIds(adapter.board, actorId, "hand"),
  )) {
    const cardDef = adapter.getDefinitionByInstanceId(cardId);
    if (!cardDef) {
      diagnostics.push({
        kind: "unsupported-shape",
        family: "playCard",
        reason: "Card definition could not be resolved for automation planning",
        sourceCardId: cardId,
      });
      continue;
    }

    const actionAbilities = (cardDef.abilities ?? []).filter(
      (ability): ability is ActionAbilityDefinition => ability.type === "action",
    );
    if (actionAbilities.length > 1) {
      diagnostics.push({
        kind: "unsupported-shape",
        family: "playCard",
        reason:
          "Multiple action abilities on a single play are outside the v1 automation support matrix",
        sourceCardId: cardId,
      });
      continue;
    }
    const resolutionVariants = buildResolutionVariants({
      adapter,
      analysisPlayerId: actorId,
      diagnostics,
      effect: actionAbilities[0]?.effect as Effect | undefined,
      family: "playCard",
      searchCaps,
      sourceCardId: cardId,
    });
    if (!resolutionVariants) {
      continue;
    }

    const costModes = enumeratePlayCostModes({
      actorId,
      adapter,
      cardDef,
      cardId,
      searchCaps,
      diagnostics,
    });
    for (const cost of costModes) {
      for (const variant of resolutionVariants) {
        addValidatedCandidate(adapter, diagnostics, actorId, candidates, {
          family: "playCard",
          cardId,
          cost,
          ...(typeof variant.choiceIndex === "number" ? { choiceIndex: variant.choiceIndex } : {}),
          ...(typeof variant.resolveOptional === "boolean"
            ? { resolveOptional: variant.resolveOptional }
            : {}),
          ...(variant.targets && variant.targets.length > 0 ? { targets: variant.targets } : {}),
        });
      }
    }
  }
}

function getActivatedAbilitiesForCard(
  adapter: AutomatedActionPlannerAdapter,
  cardId: CardInstanceId,
): Array<{ ability: ActivatedAbilityDefinition; abilityIndex: number }> {
  const definition = adapter.getDefinitionByInstanceId(cardId);
  if (!definition) {
    return [];
  }

  const printedAbilities = (definition.abilities ?? []).filter(
    (ability): ability is ActivatedAbilityDefinition => ability.type === "activated",
  );
  const grantedAbilities = getGrantedActivatedAbilities({
    state: toStaticAbilityState(adapter.state as LorcanaMatchState),
    cardId,
    getDefinitionByInstanceId: (candidateId) => adapter.getDefinitionByInstanceId(candidateId),
  }).map((entry) => entry.ability);

  return [...printedAbilities, ...grantedAbilities].map((ability, abilityIndex) => ({
    ability,
    abilityIndex,
  }));
}

function matchesDiscardCostRequirements(
  definition: LorcanaCardDefinition | undefined,
  ability: ActivatedAbilityDefinition,
): boolean {
  if (!definition) {
    return false;
  }

  const discardCardType =
    ability.cost?.discardCardType ??
    (typeof ability.cost?.discard === "object" ? ability.cost.discard.cardType : undefined);
  if (discardCardType === "song") {
    if (definition.cardType !== "action" || definition.actionSubtype !== "song") {
      return false;
    }
  } else if (
    discardCardType === "character" ||
    discardCardType === "item" ||
    discardCardType === "location" ||
    discardCardType === "action"
  ) {
    if (definition.cardType !== discardCardType) {
      return false;
    }
  }

  const discardCardName = ability.cost?.discardCardName;
  if (typeof discardCardName === "string" && discardCardName.length > 0) {
    return cardHasName(definition, discardCardName);
  }

  return true;
}

function getRequiredDiscardCardCostCount(ability: ActivatedAbilityDefinition): number {
  const directCount =
    typeof ability.cost?.discardCards === "number"
      ? ability.cost.discardCards
      : typeof ability.cost?.discardCard === "number"
        ? ability.cost.discardCard
        : typeof ability.cost?.discard === "object" &&
            typeof ability.cost.discard.amount === "number"
          ? ability.cost.discard.amount
          : 0;
  return Number.isFinite(directCount) && directCount > 0 ? Math.floor(directCount) : 0;
}

function buildAbilityCostSelectionGroups(args: {
  actorId: PlayerId;
  adapter: AutomatedActionPlannerAdapter;
  ability: ActivatedAbilityDefinition;
  cardId: CardInstanceId;
  diagnostics: AutomatedActionDiagnostic[];
  searchCaps: AutomatedActionSearchCaps;
}): AutomatedActionCostSelections[] | null {
  const { actorId, adapter, ability, cardId, diagnostics, searchCaps } = args;
  const actorCharacters = getActorCharactersInPlay(adapter, actorId);
  const actorPlayCards = stableSortIds(
    adapter.board,
    getPlayerZoneCardIds(adapter.board, actorId, "play"),
  );
  const actorHand = stableSortIds(
    adapter.board,
    getPlayerZoneCardIds(adapter.board, actorId, "hand"),
  );
  const requiredExertCharacters =
    typeof ability.cost?.exertCharacters === "number"
      ? Math.max(0, Math.floor(ability.cost.exertCharacters))
      : ability.cost?.exertCharacter
        ? 1
        : 0;
  const requiredBanishItems =
    typeof ability.cost?.banishItem === "number"
      ? Math.max(0, Math.floor(ability.cost.banishItem))
      : ability.cost?.banishItem
        ? 1
        : 0;
  const requiredBanishCharacters = ability.cost?.banishCharacter ? 1 : 0;
  const requiredDiscardCards = getRequiredDiscardCardCostCount(ability);

  const exertCandidatePool = actorCharacters.filter(
    (characterId) => !(ability.cost?.exert === true && characterId === cardId),
  );
  const banishItemPool = actorPlayCards.filter(
    (candidateId) => adapter.getDefinitionByInstanceId(candidateId)?.cardType === "item",
  );
  const banishCharacterPool = actorCharacters.filter(
    (candidateId) => !(ability.cost?.banishCharacterTarget === "another" && candidateId === cardId),
  );
  const discardPool = actorHand.filter((candidateId) =>
    matchesDiscardCostRequirements(adapter.getDefinitionByInstanceId(candidateId), ability),
  );

  const selectionGroups: AutomatedActionCostSelections[][] = [];

  const pushSelectionGroup = (
    family: "activateAbility",
    count: number,
    pool: readonly CardInstanceId[],
    apply: (ids: CardInstanceId[]) => AutomatedActionCostSelections,
  ): boolean => {
    if (count === 0) {
      selectionGroups.push([{}]);
      return true;
    }
    if (pool.length > searchCaps.targetPool) {
      diagnostics.push({
        kind: "overflow-skip",
        family,
        reason: "Ability cost pool exceeds the configured automation search cap",
        cap: searchCaps.targetPool,
        actual: pool.length,
        sourceCardId: cardId,
      });
      return false;
    }

    const { combinations, overflow } = enumerateBoundedCombinations(
      pool,
      count,
      count,
      searchCaps.targetCombinationsPerFamily,
    );
    if (overflow) {
      diagnostics.push({
        kind: "overflow-skip",
        family,
        reason: "Ability cost combinations exceed the configured automation search cap",
        cap: searchCaps.targetCombinationsPerFamily,
        actual: searchCaps.targetCombinationsPerFamily + 1,
        sourceCardId: cardId,
      });
      return false;
    }
    selectionGroups.push(
      combinations.map((combination) => apply(stableSortIds(adapter.board, combination))),
    );
    return true;
  };

  if (
    !pushSelectionGroup("activateAbility", requiredExertCharacters, exertCandidatePool, (ids) => ({
      exertCharacters: ids,
    })) ||
    !pushSelectionGroup("activateAbility", requiredBanishItems, banishItemPool, (ids) => ({
      banishItems: ids,
    })) ||
    !pushSelectionGroup(
      "activateAbility",
      requiredBanishCharacters,
      banishCharacterPool,
      (ids) => ({
        banishCharacters: ids,
      }),
    ) ||
    !pushSelectionGroup("activateAbility", requiredDiscardCards, discardPool, (ids) => ({
      discardCards: ids,
    }))
  ) {
    return null;
  }

  const product = cartesianProduct(selectionGroups, searchCaps.targetCombinationsPerFamily);
  if (product.overflow) {
    diagnostics.push({
      kind: "overflow-skip",
      family: "activateAbility",
      reason: "Ability cost selections exceed the configured automation search cap",
      cap: searchCaps.targetCombinationsPerFamily,
      actual: searchCaps.targetCombinationsPerFamily + 1,
      sourceCardId: cardId,
    });
    return null;
  }

  return product.values.map((parts) =>
    parts.reduce<AutomatedActionCostSelections>(
      (current, next) => ({
        ...current,
        ...(next.banishCharacters ? { banishCharacters: next.banishCharacters } : {}),
        ...(next.banishItems ? { banishItems: next.banishItems } : {}),
        ...(next.discardCards ? { discardCards: next.discardCards } : {}),
        ...(next.exertCharacters ? { exertCharacters: next.exertCharacters } : {}),
      }),
      {},
    ),
  );
}

function enumerateActivateAbilityCandidates(args: {
  actorId: PlayerId;
  adapter: AutomatedActionPlannerAdapter;
  diagnostics: AutomatedActionDiagnostic[];
  candidates: AutomatedActionCandidate[];
  searchCaps: AutomatedActionSearchCaps;
}): void {
  const { actorId, adapter, diagnostics, candidates, searchCaps } = args;
  if (!isMoveAvailable(adapter, "activateAbility")) {
    return;
  }

  for (const cardId of getActorCharactersInPlay(adapter, actorId).concat(
    stableSortIds(
      adapter.board,
      getPlayerZoneCardIds(adapter.board, actorId, "play").filter((candidateId) => {
        const definition = adapter.getDefinitionByInstanceId(candidateId);
        return definition?.cardType === "item" || definition?.cardType === "location";
      }),
    ),
  )) {
    for (const { ability, abilityIndex } of getActivatedAbilitiesForCard(adapter, cardId)) {
      const costSelections = buildAbilityCostSelectionGroups({
        actorId,
        adapter,
        ability,
        cardId,
        diagnostics,
        searchCaps,
      });
      if (!costSelections) {
        continue;
      }

      const resolutionVariants = buildResolutionVariants({
        adapter,
        analysisPlayerId: actorId,
        diagnostics,
        effect: ability.effect as Effect | undefined,
        family: "activateAbility",
        searchCaps,
        sourceCardId: cardId,
      });
      if (!resolutionVariants) {
        continue;
      }

      for (const costSelection of costSelections) {
        for (const variant of resolutionVariants) {
          addValidatedCandidate(adapter, diagnostics, actorId, candidates, {
            family: "activateAbility",
            cardId,
            abilityIndex,
            ...(typeof variant.choiceIndex === "number"
              ? { choiceIndex: variant.choiceIndex }
              : {}),
            ...(variant.targets && variant.targets.length > 0 ? { targets: variant.targets } : {}),
            ...(Object.keys(costSelection).length > 0 ? { costs: costSelection } : {}),
          });
        }
      }
    }
  }
}

function enumerateQuestCandidates(args: {
  actorId: PlayerId;
  adapter: AutomatedActionPlannerAdapter;
  diagnostics: AutomatedActionDiagnostic[];
  candidates: AutomatedActionCandidate[];
}): void {
  const { actorId, adapter, diagnostics, candidates } = args;
  if (!isMoveAvailable(adapter, "quest")) {
    return;
  }

  for (const cardId of getActorCharactersInPlay(adapter, actorId)) {
    addValidatedCandidate(adapter, diagnostics, actorId, candidates, {
      family: "quest",
      cardId,
    });
  }
}

function enumerateChallengeCandidates(args: {
  actorId: PlayerId;
  adapter: AutomatedActionPlannerAdapter;
  diagnostics: AutomatedActionDiagnostic[];
  candidates: AutomatedActionCandidate[];
}): void {
  const { actorId, adapter, diagnostics, candidates } = args;
  if (!isMoveAvailable(adapter, "challenge")) {
    return;
  }

  const attackers = getActorCharactersInPlay(adapter, actorId);
  const defenders = stableSortIds(
    adapter.board,
    adapter.board.playerOrder
      .filter((playerId) => playerId !== actorId)
      .flatMap((playerId) => getPlayerZoneCardIds(adapter.board, playerId, "play"))
      .filter((cardId) => {
        const definition = adapter.getDefinitionByInstanceId(cardId);
        return definition?.cardType === "character" || definition?.cardType === "location";
      }),
  );

  for (const attackerId of attackers) {
    for (const defenderId of defenders) {
      addValidatedCandidate(adapter, diagnostics, actorId, candidates, {
        family: "challenge",
        attackerId,
        defenderId,
        preview: adapter.previewChallenge(attackerId, defenderId),
      });
    }
  }
}

function enumerateMoveCharacterToLocationCandidates(args: {
  actorId: PlayerId;
  adapter: AutomatedActionPlannerAdapter;
  diagnostics: AutomatedActionDiagnostic[];
  candidates: AutomatedActionCandidate[];
}): void {
  const { actorId, adapter, diagnostics, candidates } = args;
  if (!isMoveAvailable(adapter, "moveCharacterToLocation")) {
    return;
  }

  const characters = getActorCharactersInPlay(adapter, actorId);
  const locations = getActorLocationsInPlay(adapter, actorId);

  for (const characterId of characters) {
    for (const locationId of locations) {
      addValidatedCandidate(adapter, diagnostics, actorId, candidates, {
        family: "moveCharacterToLocation",
        characterId,
        locationId,
      });
    }
  }
}

function summarizeDiagnostics(result: {
  actorId?: PlayerId;
  candidates: AutomatedActionCandidate[];
  diagnostics: AutomatedActionDiagnostic[];
}): AutomatedActionEnumerationResult {
  return {
    actorId: result.actorId,
    candidates: result.candidates,
    diagnostics: result.diagnostics,
    unsupportedSkips: result.diagnostics.filter(
      (diagnostic) =>
        diagnostic.kind === "unsupported-shape" || diagnostic.kind === "overflow-skip",
    ),
    validationSkips: result.diagnostics.filter(
      (
        diagnostic,
      ): diagnostic is Extract<AutomatedActionDiagnostic, { kind: "validation-reject" }> =>
        diagnostic.kind === "validation-reject",
    ),
  };
}

function createBasicCandidateSummary(
  candidate: AutomatedActionCandidate,
): AutomatedActionCandidateSummary {
  return {
    candidate,
    family: candidate.family,
    heuristics: [],
    stableKey: getCandidateKey(candidate),
  };
}

function createTraceFromPlan(args: {
  executionAttempts?: AutomatedActionExecutionAttempt[];
  fallbackTaken?: AutomatedActionFallback;
  finalResult?: CommandResult;
  kind: AutomatedActionDecisionTrace["kind"];
  plan: PlannedAutomatedActions;
  selectedCandidate?: AutomatedActionCandidate;
}): AutomatedActionDecisionTrace {
  const {
    executionAttempts = [],
    fallbackTaken,
    finalResult,
    kind,
    plan,
    selectedCandidate,
  } = args;
  const selectedSummary = plan.orderedCandidateSummaries.find(
    (summary) => summary.candidate === selectedCandidate,
  );

  return {
    actorId: plan.enumeration.actorId,
    boardSnapshot: plan.boardSnapshot,
    diagnostics: plan.enumeration.diagnostics,
    executionAttempts: executionAttempts.map(({ candidate, result }) => ({
      candidate:
        plan.orderedCandidateSummaries.find((summary) => summary.candidate === candidate) ??
        createBasicCandidateSummary(candidate),
      ...(result.success
        ? { stateId: result.stateID }
        : {
            error: result.error,
            errorCode: result.errorCode,
            stateId: result.currentStateID,
          }),
      success: result.success,
    })),
    ...(fallbackTaken ? { fallbackTaken } : {}),
    ...(finalResult
      ? {
          finalResult: finalResult.success
            ? {
                stateId: finalResult.stateID,
                success: true,
              }
            : {
                error: finalResult.error,
                errorCode: finalResult.errorCode,
                stateId: finalResult.currentStateID,
                success: false,
              },
        }
      : {}),
    gameSegment: plan.gameSegment,
    kind,
    orderedCandidates: plan.orderedCandidateSummaries,
    phase: plan.phase,
    ...(selectedSummary ? { selectedCandidate: selectedSummary } : {}),
    step: plan.step,
    strategyName: plan.strategyName,
    turnNumber: plan.turnNumber,
    unsupportedSkips: plan.enumeration.unsupportedSkips,
    validationSkips: plan.enumeration.validationSkips,
  };
}

function planAutomatedActions(
  adapter: AutomatedActionPlannerAdapter,
  options: AutomatedActionEnumerationOptions = {},
  seedDiagnostics: AutomatedActionDiagnostic[] = [],
): PlannedAutomatedActions {
  const diagnostics = [...seedDiagnostics];
  const actorId = adapter.actorId;
  const strategy = options.strategy ?? defaultLoreRaceAutomatedActionStrategy;
  const boardSnapshot = createAutomatedActionBoardSnapshot({
    board: adapter.board,
    state: adapter.state,
  });

  if (!actorId) {
    diagnostics.push({
      kind: "actor-resolution",
      source: "unresolved",
      reason: "Unable to resolve an actor for automated action planning",
    });
    return {
      boardSnapshot,
      enumeration: summarizeDiagnostics({ actorId, candidates: [], diagnostics }),
      gameSegment: adapter.board.gameSegment,
      orderedCandidateSummaries: [],
      phase: adapter.board.phase,
      step: adapter.board.step,
      strategyName: strategy.name,
      turnNumber: adapter.board.turnNumber,
    };
  }

  const planningContext: AutomatedActionPlanningContext = {
    actorId,
    authoritativeHints: adapter.authoritativeHints,
    board: adapter.board,
    diagnostics: {
      push(diagnostic) {
        diagnostics.push(diagnostic);
      },
    },
    gameSegment: adapter.board.gameSegment,
    phase: adapter.board.phase,
    step: adapter.board.step,
    turnNumber: adapter.board.turnNumber,
  };
  const searchCaps = mergeSearchCaps(options.searchCaps);
  const candidates: AutomatedActionCandidate[] = [];

  enumerateChooseWhoGoesFirstCandidates({ actorId, adapter, diagnostics, candidates });
  enumerateAlterHandCandidates({ actorId, adapter, diagnostics, candidates });
  enumerateResolveBagCandidates({ actorId, adapter, diagnostics, candidates, searchCaps });
  enumerateResolveEffectCandidates({ actorId, adapter, diagnostics, candidates, searchCaps });
  enumerateQuestCandidates({ actorId, adapter, diagnostics, candidates });
  enumeratePlayCardCandidates({ actorId, adapter, diagnostics, candidates, searchCaps });
  enumerateActivateAbilityCandidates({ actorId, adapter, diagnostics, candidates, searchCaps });
  enumeratePutInkCandidates({ actorId, adapter, diagnostics, candidates });
  enumerateMoveCharacterToLocationCandidates({ actorId, adapter, diagnostics, candidates });
  enumerateChallengeCandidates({ actorId, adapter, diagnostics, candidates });

  const uniqueCandidates = [
    ...new Map(candidates.map((candidate) => [getCandidateKey(candidate), candidate])).values(),
  ];
  const orderedCandidateSummaries =
    strategy === defaultLoreRaceAutomatedActionStrategy
      ? summarizeDefaultLoreRaceCandidates(planningContext, uniqueCandidates)
      : strategy
          .rankCandidates(planningContext, uniqueCandidates)
          .map((candidate) => createBasicCandidateSummary(candidate));

  return {
    boardSnapshot,
    enumeration: summarizeDiagnostics({
      actorId,
      candidates: orderedCandidateSummaries.map(({ candidate }) => candidate),
      diagnostics,
    }),
    gameSegment: adapter.board.gameSegment,
    orderedCandidateSummaries,
    phase: adapter.board.phase,
    step: adapter.board.step,
    strategyName: strategy.name,
    turnNumber: adapter.board.turnNumber,
  };
}

export function enumerateAutomatedActionsWithAdapter(
  adapter: AutomatedActionPlannerAdapter,
  options: AutomatedActionEnumerationOptions = {},
  seedDiagnostics: AutomatedActionDiagnostic[] = [],
): AutomatedActionEnumerationResult {
  const plan = planAutomatedActions(adapter, options, seedDiagnostics);
  options.traceSink?.push(
    createTraceFromPlan({
      kind: "enumeration",
      plan,
    }),
  );
  return plan.enumeration;
}

export function takeAutomatedActionWithAdapter(
  adapter: AutomatedActionPlannerAdapter,
  options: AutomatedActionExecutionOptions = {},
  seedDiagnostics: AutomatedActionDiagnostic[] = [],
): AutomatedActionExecutionResult {
  const plan = planAutomatedActions(adapter, options, seedDiagnostics);
  const enumeration = plan.enumeration;
  const actorId = enumeration.actorId;
  if (!actorId) {
    const result = {
      actorId,
      diagnostics: enumeration.diagnostics,
      executionAttempts: [],
      finalResult: adapter.createErrorResult(
        "Unable to resolve an actor for automated action execution",
        "AUTOMATED_ACTION_ACTOR_UNRESOLVED",
      ),
      orderedCandidates: enumeration.candidates,
      unsupportedSkips: enumeration.unsupportedSkips,
      validationSkips: enumeration.validationSkips,
    };

    options.traceSink?.push(
      createTraceFromPlan({
        finalResult: result.finalResult,
        kind: "execution",
        plan,
      }),
    );

    return result;
  }

  const executionAttempts: AutomatedActionExecutionAttempt[] = [];
  const failureBudget =
    options.maxExecutionFailures ?? DEFAULT_AUTOMATED_ACTION_MAX_EXECUTION_FAILURES;
  let failures = 0;
  let selectedCandidate: AutomatedActionCandidate | undefined;
  let finalResult = adapter.createErrorResult(
    "No automated action candidates were available",
    "AUTOMATED_ACTION_NO_CANDIDATES",
  );

  for (const candidate of enumeration.candidates) {
    const result = adapter.executeCandidate(actorId, candidate);
    executionAttempts.push({ candidate, result });
    if (result.success) {
      selectedCandidate = candidate;
      finalResult = result;
      break;
    }

    finalResult = result;
    failures += 1;
    if (failures >= failureBudget) {
      break;
    }
  }

  let fallbackTaken: AutomatedActionFallback | undefined;
  if (!selectedCandidate) {
    const passResult = adapter.passTurn(actorId);
    if (passResult.success) {
      fallbackTaken = "passTurn";
      finalResult = passResult;
    } else {
      const concedeResult = adapter.concede(actorId);
      fallbackTaken = "concede";
      finalResult = concedeResult;
    }
  }

  const result = {
    actorId,
    diagnostics: enumeration.diagnostics,
    executionAttempts,
    fallbackTaken,
    finalResult,
    orderedCandidates: enumeration.candidates,
    selectedCandidate,
    unsupportedSkips: enumeration.unsupportedSkips,
    validationSkips: enumeration.validationSkips,
  };

  options.traceSink?.push(
    createTraceFromPlan({
      executionAttempts,
      fallbackTaken,
      finalResult,
      kind: "execution",
      plan,
      selectedCandidate,
    }),
  );

  return result;
}
