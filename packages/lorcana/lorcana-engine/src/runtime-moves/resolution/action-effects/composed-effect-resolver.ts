import type {
  ActionEffectResolutionOptions,
  ActionResolutionInput,
  ActionResolutionResult,
  PlayCardExecutionContext,
} from "./types";
import type { CardInstanceId, PlayerId } from "#core";
import type {
  AdditionalInkwellEffect,
  BanishEffect,
  CardSelectionFilter,
  ChoiceEffect,
  CountEffect,
  ConditionalEffect,
  CostReductionEffect,
  CreateReplacementEffect,
  DealDamageEffect,
  DiscardEffect,
  DrawEffect,
  DrawUntilHandSizeEffect,
  ExertEffect,
  ForEachEffect,
  ForEachOpponentEffect,
  GainKeywordEffect,
  GainKeywordsEffect,
  GainLoreEffect,
  GrantAbilityEffect,
  LoseKeywordEffect,
  LoseLoreEffect,
  ModifyStatEffect,
  NameACardEffect,
  MoveDamageEffect,
  MoveToLocationEffect,
  OrEffect,
  OptionalEffect,
  PayCostEffect,
  PlayCardEffect,
  PutDamageEffect,
  PutIntoInkwellEffect,
  PutOnTopEffect,
  PutUnderEffect,
  EnablePlayFromUnderEffect,
  PutOnBottomEffect,
  ReadyEffect,
  RevealHandEffect,
  RevealUntilMatchEffect,
  RemoveDamageEffect,
  SelectTargetEffect,
  RestrictionEffect,
  ReturnRandomFromInkwellEffect,
  ReturnFromDiscardEffect,
  ReturnToHandEffect,
  RevealAndRouteEffect,
  RevealTopCardEffect,
  ScryEffect,
  SearchDeckEffect,
  SequenceEffect,
  ShuffleIntoDeckEffect,
  SupportEffect,
  PropertyModificationEffect,
} from "@tcg/lorcana-types";
import { isCardType, isClassification } from "@tcg/lorcana-types";
import type { MillEffect } from "@tcg/lorcana-types/abilities";
import {
  createLorcanaGameLogEntry,
  createLorcanaLogMessage,
  type CardPlayedPayload,
} from "../../../types/index";
import {
  resolveAggregateFieldAmount,
  resolveEffectDynamicFields,
  resolvePerTargetFieldAmounts,
} from "./amount-resolver";
import { isBanishEffect, resolveBanishEffect } from "./banish-effect";
import {
  isAdditionalInkwellEffect,
  resolveAdditionalInkwellEffect,
} from "./additional-inkwell-effect";
import { isConditionalEffect, resolveConditionalEffect } from "./conditional-effect";
import { evaluateActionCondition } from "./action-condition-evaluator";
import { isCountEffect, resolveCountEffect } from "./count-effect";
import { isCostReductionEffect, resolveCostReductionEffect } from "./cost-reduction-effect";
import {
  isCreateReplacementEffect,
  resolveCreateReplacementEffect,
} from "./create-replacement-effect";
import {
  isCreateTriggeredAbilityEffect,
  resolveCreateTriggeredAbilityEffect,
} from "./create-triggered-ability-effect";
import { isDealDamageEffect, resolveDealDamageEffect } from "./deal-damage-effect";
import { isDiscardEffect, resolveDiscardEffect } from "./discard-effect";
import { isDrawEffect, resolveDrawEffect } from "./draw-effect";
import {
  isDrawUntilHandSizeEffect,
  resolveDrawUntilHandSizeEffect,
} from "./draw-until-hand-size-effect";
import { isExertEffect, resolveExertEffect } from "./exert-effect";
import { isGainKeywordEffect, resolveGainKeywordEffect } from "./gain-keyword-effect";
import { isGainLoreEffect, resolveGainLoreEffect } from "./gain-lore-effect";
import { isGrantAbilityEffect, resolveGrantAbilityEffect } from "./grant-ability-effect";
import { isLoseKeywordEffect, resolveLoseKeywordEffect } from "./lose-keyword-effect";
import { isLoseLoreEffect, resolveLoseLoreEffect } from "./lose-lore-effect";
import { isMillEffect, resolveMillEffect } from "./mill-effect";
import { isModifyStatEffect, resolveModifyStatEffect } from "./modify-stat-effect";
import {
  isMoveCardsFromUnderEffect,
  resolveMoveCardsFromUnderEffect,
} from "./move-cards-from-under-effect";
import { isMoveDamageEffect, resolveMoveDamageEffect } from "./move-damage-effect";
import { isMoveToLocationEffect, resolveMoveToLocationEffect } from "./move-to-location-effect";
import {
  executeScryActionCardPlay,
  isPlayCardEffect,
  resolvePlayCardEffect,
} from "./play-card-effect";
import {
  isPropertyModificationEffect,
  resolvePropertyModificationEffect,
} from "./property-modification-effect";
import { isPutDamageEffect, resolvePutDamageEffect } from "./put-damage-effect";
import {
  isPutInHandEffect,
  type PutInHandEffectLike,
  resolvePutInHandEffect,
} from "./put-in-hand-effect";
import { isPutIntoInkwellEffect, resolvePutIntoInkwellEffect } from "./put-into-inkwell-effect";
import { isPutOnTopEffect, resolvePutOnTopEffect } from "./put-on-top-effect";
import { isPutUnderEffect, resolvePutUnderEffect } from "./put-under-effect";
import {
  isEnablePlayFromUnderEffect,
  resolveEnablePlayFromUnderEffect,
} from "./enable-play-from-under-effect";
import { isPutOnBottomEffect, resolvePutOnBottomEffect } from "./put-on-bottom-effect";
import { isReadyEffect, resolveReadyEffect } from "./ready-effect";
import { payBasicCost, validateBasicCost } from "../../rules/play-card-rules";
import { isRevealHandEffect, resolveRevealHandEffect } from "./reveal-hand-effect";
import {
  isRevealUntilMatchEffect,
  resolveRevealUntilMatchEffect,
} from "./reveal-until-match-effect";
import { isRemoveDamageEffect, resolveRemoveDamageEffect } from "./remove-damage-effect";
import { isRestrictionEffect, resolveRestrictionEffect } from "./restriction-effect";
import {
  isReturnRandomFromInkwellEffect,
  resolveReturnRandomFromInkwellEffect,
} from "./return-random-from-inkwell-effect";
import {
  isReturnFromDiscardEffect,
  resolveReturnFromDiscardEffect,
} from "./return-from-discard-effect";
import { isReturnToHandEffect, resolveReturnToHandEffect } from "./return-to-hand-effect";
import { isRevealTopCardEffect, resolveRevealTopCardEffect } from "./reveal-top-card-effect";
import { isRevealAndRouteEffect, resolveRevealAndRouteEffect } from "./reveal-and-route-effect";
import {
  getScryLookedAtCards,
  isScryEffect,
  resolveScryDeckPlayerId,
  resolveScryEffect,
} from "./scry-effect";
import { isSearchDeckEffect, resolveSearchDeckEffect } from "./search-deck-effect";
import { isSelectTargetEffect, resolveSelectTargetEffect } from "./select-target-effect";
import { isShuffleIntoDeckEffect, resolveShuffleIntoDeckEffect } from "./shuffle-into-deck-effect";
import { isSupportEffect, resolveSupportEffect } from "./support-effect";
import { isForEachOpponentEffect, resolveForEachOpponentEffect } from "./for-each-opponent-effect";
import { markLastEffectPerformed, resetLastEffectPerformed } from "./event-snapshot-utils";
import { handleUnsupportedActionEffect } from "./unsupported-action-effect";
import {
  clearPendingActionChoice,
  createPendingActionEffect,
  enqueuePendingActionEffect,
  removePendingActionEffect,
} from "./pending-action-effects";
import { buildResolutionSelectionContext } from "./selection-context";
import { recordVanishChosenTargets } from "./vanish";
import { resolveTargetPlayerIds } from "./player-target-resolver";
import { applyReplacementEffects } from "../../effects/replacement-effects";
import {
  analyzeEffectTargets,
  normalizeSelectedTargets,
  normalizeTargetDescriptor,
  resolveCandidateTargets,
  resolveEffectTargets,
  resolveSelectedPlayerIds,
  resolveTargetBounds,
} from "../../../targeting/runtime";
import {
  clearCurrentSelectionTargets,
  getEffectTargetSelectionInput,
  getCombinedSelectionInput,
  getCombinedSelectionTargets,
  getContextSelectionTargets,
  getCurrentSelectionInput,
  getCurrentSelectionTargets,
  promoteCurrentSelectedPlayersToContext,
  promoteCurrentSelectionTargetsToContext,
  withContextSelectionTargets,
  withCurrentSelectionTargets,
} from "./selection-state";

type SequenceLikeEffect = SequenceEffect & {
  steps?: unknown[];
  effects?: unknown[];
};

type ChoiceLikeEffect = ChoiceEffect & {
  options?: unknown[];
  choices?: unknown[];
};

type OrLikeEffect = OrEffect & {
  options?: unknown[];
  choices?: unknown[];
};

type CardDefinitionLike = {
  cardType?: string;
  classifications?: string[];
  cost?: number;
};

type OptionalLikeEffect = OptionalEffect & {
  effect?: unknown;
};

type ForEachLikeEffect = ForEachEffect & {
  counter?: unknown;
  effect?: unknown;
  maximum?: unknown;
};

type EffectWithType = {
  type?: unknown;
  [key: string]: unknown;
};

type EffectChosenTargetDescriptor = {
  descriptor: ReturnType<typeof normalizeTargetDescriptor>;
  source: unknown;
  signature?: string;
};

type ChosenTargetAssignment = {
  signature?: string;
  targets: Array<CardInstanceId | PlayerId>;
};

type ActionEffectResolver = (
  ctx: PlayCardExecutionContext,
  cardPlayed: CardPlayedPayload,
  effect: unknown,
  resolutionInput: ActionResolutionInput,
  options?: ActionEffectResolutionOptions,
) => ActionResolutionResult;

const RESOLVED_ACTION_EFFECT: ActionResolutionResult = {
  status: "resolved",
};

function mergeContinuationEffects(
  effects: unknown[],
  continuation?: ActionEffectResolutionOptions["continuation"],
): ActionEffectResolutionOptions["continuation"] {
  const remainingEffects = [...effects, ...(continuation?.remainingEffects ?? [])];
  return {
    ...(continuation?.stagedSequence ? { stagedSequence: continuation.stagedSequence } : {}),
    ...(remainingEffects.length > 0 ? { remainingEffects } : {}),
  };
}

function promoteSelectedPlayersToTargetContext(
  ctx: PlayCardExecutionContext,
  resolutionInput: ActionResolutionInput,
): ActionResolutionInput {
  return promoteCurrentSelectedPlayersToContext(ctx.framework.state.playerIds, resolutionInput);
}

function promoteCurrentTargetsToContext(
  resolutionInput: ActionResolutionInput,
): ActionResolutionInput {
  return promoteCurrentSelectionTargetsToContext(resolutionInput);
}

function effectContainsTargetReference(effect: unknown): boolean {
  if (typeof effect === "string") {
    return (
      effect === "chosen-for-effect" || effect === "previous-target" || effect === "selected-first"
    );
  }

  if (!effect || typeof effect !== "object") {
    return false;
  }

  if (Array.isArray(effect)) {
    return effect.some((entry) => effectContainsTargetReference(entry));
  }

  const record = effect as Record<string, unknown>;
  if (typeof record.ref === "string" || typeof record.reference === "string") {
    return true;
  }

  return Object.values(record).some((value) => effectContainsTargetReference(value));
}

function effectUsesExistingChosenTarget(effect: unknown): boolean {
  if (!effect || typeof effect !== "object" || Array.isArray(effect)) {
    return false;
  }

  const record = effect as Record<string, unknown>;
  return typeof record.target === "string" && record.target.startsWith("CHOSEN_");
}

function hasSatisfiedChosenTargetContext(
  ctx: PlayCardExecutionContext,
  cardPlayed: CardPlayedPayload,
  effect: unknown,
  resolutionInput: ActionResolutionInput,
): boolean {
  if (!effectUsesExistingChosenTarget(effect)) {
    return false;
  }

  const effectTarget =
    effect && typeof effect === "object" && "target" in effect
      ? (effect as Record<string, unknown>).target
      : undefined;
  if (effectTarget === undefined) {
    return false;
  }

  const selectionInput = getCombinedSelectionInput(resolutionInput);
  return (
    (resolveEffectTargets(
      ctx,
      cardPlayed,
      effectTarget,
      selectionInput,
      resolutionInput.eventSnapshot,
    )?.length ?? 0) > 0 ||
    resolveTargetPlayerIds(ctx, cardPlayed, effectTarget, selectionInput).length > 0
  );
}

function stepRequiresPriorTargetContext(descriptors: EffectChosenTargetDescriptor[]): boolean {
  return descriptors.some(({ descriptor }) => descriptor?.requireDifferentTargets === true);
}

function effectRequiresFullTargetContext(effect: unknown): boolean {
  if (!effect || typeof effect !== "object") {
    return false;
  }

  if (Array.isArray(effect)) {
    return effect.some((entry) => effectRequiresFullTargetContext(entry));
  }

  const record = effect as Record<string, unknown>;
  if (
    effectContainsTargetReference(effect) ||
    effectUsesExistingChosenTarget(effect) ||
    effectUsesParentTargetComparison(effect) ||
    record.target === "CARD_OWNER" ||
    getEffectType(effect) === "play-card"
  ) {
    return true;
  }

  return Object.values(record).some((value) => effectRequiresFullTargetContext(value));
}

function resolveSequenceStepEffect(
  ctx: PlayCardExecutionContext,
  cardPlayed: CardPlayedPayload,
  effect: unknown,
  resolutionInput: ActionResolutionInput,
): unknown {
  if (!isConditionalEffect(effect)) {
    return effect;
  }

  const conditionMet = evaluateActionCondition(
    effect.condition,
    ctx as never,
    cardPlayed,
    resolutionInput as never,
  );
  const nextEffect = conditionMet
    ? (effect.then ?? effect.effect ?? effect.ifTrue)
    : (effect.else ?? effect.ifFalse);

  return nextEffect ?? effect;
}

function sequenceStepConsumesExplicitTargets(
  ctx: PlayCardExecutionContext,
  cardPlayed: CardPlayedPayload,
  effect: unknown,
  resolutionInput: ActionResolutionInput,
): number {
  const runtimeEffect = resolveSequenceStepEffect(ctx, cardPlayed, effect, resolutionInput);
  if (
    getEffectType(runtimeEffect) !== "select-target" &&
    hasSatisfiedChosenTargetContext(ctx, cardPlayed, runtimeEffect, resolutionInput)
  ) {
    return 0;
  }

  const analysis = analyzeEffectTargets(runtimeEffect, cardPlayed.playerId, ctx, cardPlayed.cardId);
  if (!analysis.requiresExplicitSelection || analysis.minSelections !== analysis.maxSelections) {
    return 0;
  }

  return analysis.maxSelections;
}

function effectUsesParentTargetComparison(effect: unknown): boolean {
  if (!effect || typeof effect !== "object") {
    return false;
  }

  if (Array.isArray(effect)) {
    return effect.some((entry) => effectUsesParentTargetComparison(entry));
  }

  const record = effect as Record<string, unknown>;
  if (record.compareWithParentsTarget === true) {
    return true;
  }

  return Object.values(record).some((value) => effectUsesParentTargetComparison(value));
}

function canonicalizeTargetSignatureValue(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map((entry) => canonicalizeTargetSignatureValue(entry));
  }

  if (!value || typeof value !== "object") {
    return value;
  }

  const record = value as Record<string, unknown>;
  const canonicalRecord: Record<string, unknown> = {};
  for (const key of Object.keys(record).sort()) {
    const entry = record[key];
    if (entry === undefined || entry === false) {
      continue;
    }
    canonicalRecord[key] = canonicalizeTargetSignatureValue(entry);
  }

  return canonicalRecord;
}

function getExplicitTargetSignature(
  ctx: PlayCardExecutionContext,
  cardPlayed: CardPlayedPayload,
  effect: unknown,
  resolutionInput: ActionResolutionInput,
): string | undefined {
  return getEffectChosenTargetDescriptors(ctx, cardPlayed, effect, resolutionInput)[0]?.signature;
}

function isTargetReferenceDescriptor(target: unknown): boolean {
  return (
    target === "chosen-for-effect" ||
    (typeof target === "object" &&
      target !== null &&
      !Array.isArray(target) &&
      ("ref" in target || "reference" in target))
  );
}

function getEffectChosenTargetDescriptors(
  ctx: PlayCardExecutionContext,
  cardPlayed: CardPlayedPayload,
  effect: unknown,
  resolutionInput: ActionResolutionInput,
): EffectChosenTargetDescriptor[] {
  const runtimeEffect = resolveSequenceStepEffect(ctx, cardPlayed, effect, resolutionInput);
  if (!runtimeEffect || (typeof runtimeEffect === "object" && Array.isArray(runtimeEffect))) {
    return [];
  }

  const effectRecord = runtimeEffect as Record<string, unknown>;
  const descriptorSources = [
    effectRecord.type === "put-on-top" && effectRecord.source !== undefined
      ? effectRecord.source
      : effectRecord.target,
    effectRecord.character,
    effectRecord.location,
    effectRecord.from,
    effectRecord.to,
    effectRecord.source,
    effectRecord.under,
  ];

  return descriptorSources.flatMap((descriptorSource) => {
    if (isTargetReferenceDescriptor(descriptorSource)) {
      return [];
    }

    if (descriptorSource === "CHOSEN_PLAYER") {
      return [
        {
          descriptor: { selector: "chosen" as const, count: 1 },
          source: descriptorSource,
          signature: JSON.stringify({ selector: "chosen", target: "player" }),
        },
      ];
    }

    const descriptor = normalizeTargetDescriptor(descriptorSource);
    if (!descriptor || descriptor.selector !== "chosen") {
      return [];
    }

    return [
      {
        descriptor,
        source: descriptorSource,
        signature: JSON.stringify(canonicalizeTargetSignatureValue(descriptor)),
      },
    ];
  });
}

function resolveChosenTargetAssignments(
  ctx: PlayCardExecutionContext,
  cardPlayed: CardPlayedPayload,
  effect: unknown,
  resolutionInput: ActionResolutionInput,
  availableTargets: Array<CardInstanceId | PlayerId>,
): {
  assignments: ChosenTargetAssignment[];
  consumedCount: number;
  targets: Array<CardInstanceId | PlayerId>;
} {
  const descriptorEntries = getEffectChosenTargetDescriptors(
    ctx,
    cardPlayed,
    effect,
    resolutionInput,
  );
  if (descriptorEntries.length === 0) {
    return {
      assignments: [],
      consumedCount: 0,
      targets: [],
    };
  }

  const selectedTargets: CardInstanceId[] = normalizeSelectedTargets(resolutionInput.targets) ?? [];
  const selectedPlayerIds: PlayerId[] =
    resolveSelectedPlayerIds(ctx.framework.state.playerIds, resolutionInput.targets) ?? [];
  const allSelectedTargets: Array<CardInstanceId | PlayerId> = [
    ...selectedTargets,
    ...selectedPlayerIds,
  ];
  const assignments: ChosenTargetAssignment[] = [];
  const consumedTargets: Array<CardInstanceId | PlayerId> = [];
  let cursor = 0;

  descriptorEntries.forEach((entry, index) => {
    const descriptor = entry.descriptor;
    if (!descriptor) {
      return;
    }

    const { min, max } = resolveTargetBounds(descriptor.count, descriptor.selector);
    const remainingMinimum = descriptorEntries.slice(index + 1).reduce((sum, nestedEntry) => {
      const nestedDescriptor = nestedEntry.descriptor;
      if (!nestedDescriptor) {
        return sum;
      }

      return sum + resolveTargetBounds(nestedDescriptor.count, nestedDescriptor.selector).min;
    }, 0);
    const cardCandidateIds = new Set(
      resolveCandidateTargets(ctx, cardPlayed, descriptor, {
        selectedTargets,
        sourceCardId: cardPlayed.cardId,
        eventSnapshot: resolutionInput.eventSnapshot,
      }),
    );
    const playerCandidateIds = new Set(
      resolveTargetPlayerIds(ctx, cardPlayed, entry.source, allSelectedTargets),
    );
    const firstSelectedTarget = selectedTargets[0];
    const disallowedTargets =
      descriptor.requireDifferentTargets === true && firstSelectedTarget
        ? new Set<CardInstanceId | PlayerId>([firstSelectedTarget])
        : undefined;
    const assignedTargets: Array<CardInstanceId | PlayerId> = [];

    while (cursor < availableTargets.length && assignedTargets.length < max) {
      const candidateTarget = availableTargets[cursor];
      if (!candidateTarget) {
        break;
      }

      const isCandidate =
        !disallowedTargets?.has(candidateTarget) &&
        (cardCandidateIds.has(candidateTarget as CardInstanceId) ||
          playerCandidateIds.has(candidateTarget as PlayerId));
      if (!isCandidate) {
        cursor += 1;
        continue;
      }

      assignedTargets.push(candidateTarget);
      consumedTargets.push(candidateTarget);
      cursor += 1;

      const remainingTargets = availableTargets.length - cursor;
      if (assignedTargets.length >= min && remainingTargets <= remainingMinimum) {
        break;
      }
    }

    assignments.push({
      signature: entry.signature,
      targets: assignedTargets,
    });
  });

  return {
    assignments,
    consumedCount: cursor,
    targets: assignments.flatMap((assignment) => assignment.targets),
  };
}

function canStageSequenceTargetCollection(
  ctx: PlayCardExecutionContext,
  cardPlayed: CardPlayedPayload,
  effect: SequenceLikeEffect,
): boolean {
  const nestedEffects = effect.steps ?? effect.effects ?? [];
  let explicitSelectionSteps = 0;
  const targetSignatures = new Set<string>();

  for (const nestedEffect of nestedEffects) {
    const nestedType = getEffectType(nestedEffect);
    if (
      !nestedType ||
      nestedType === "choice" ||
      nestedType === "conditional" ||
      nestedType === "discard" ||
      nestedType === "name-a-card" ||
      nestedType === "optional" ||
      nestedType === "or" ||
      nestedType === "scry" ||
      nestedType === "sequence"
    ) {
      return false;
    }

    if (
      effectContainsTargetReference(nestedEffect) ||
      effectUsesParentTargetComparison(nestedEffect)
    ) {
      return false;
    }

    const consumedTargets = sequenceStepConsumesExplicitTargets(ctx, cardPlayed, nestedEffect, {});
    if (consumedTargets > 0) {
      const targetSignature = getExplicitTargetSignature(ctx, cardPlayed, nestedEffect, {});
      if (targetSignature) {
        if (targetSignatures.has(targetSignature)) {
          return false;
        }
        targetSignatures.add(targetSignature);
      }
      explicitSelectionSteps += 1;
    }
  }

  return explicitSelectionSteps > 1;
}

function getCurrentActionActorId(
  ctx: PlayCardExecutionContext,
  cardPlayed: CardPlayedPayload,
): PlayerId {
  const actorId =
    ctx.playerId ?? ctx.framework.state.currentPlayer ?? ctx.framework.state.priority.holder;
  return actorId ?? cardPlayed.playerId;
}

function resolvePayCostEffect(
  ctx: PlayCardExecutionContext,
  cardPlayed: CardPlayedPayload,
  effect: PayCostEffect,
  resolutionInput: ActionResolutionInput,
  options?: ActionEffectResolutionOptions,
): ActionResolutionResult {
  const actorId = getCurrentActionActorId(ctx, cardPlayed);
  const cost = effect.cost ?? {};
  const costValidation = validateBasicCost(
    {
      framework: ctx.framework,
      cards: ctx.cards,
      playerId: actorId,
    },
    {
      ink: cost.ink ?? 0,
      exertCards: cost.exert ? [{ cardId: cardPlayed.cardId, subject: "source" }] : undefined,
    },
  );
  if (!costValidation.valid || !effect.effect) {
    return RESOLVED_ACTION_EFFECT;
  }

  const payResult = payBasicCost(
    {
      framework: ctx.framework,
      cards: ctx.cards,
      playerId: actorId,
    },
    {
      ink: cost.ink ?? 0,
      exertCards: cost.exert ? [{ cardId: cardPlayed.cardId, subject: "source" }] : undefined,
    },
  );
  if (!payResult.success) {
    return RESOLVED_ACTION_EFFECT;
  }

  return resolveActionEffect(ctx, cardPlayed, effect.effect, resolutionInput, options);
}

function resolveChoiceChooserId(
  ctx: PlayCardExecutionContext,
  cardPlayed: CardPlayedPayload,
  effect: ChoiceLikeEffect | OrLikeEffect,
  resolutionInput: ActionResolutionInput,
): PlayerId {
  if (effect.chooser) {
    const chooserSelectionInput = getEffectTargetSelectionInput(effect.chooser, resolutionInput);

    if (effect.chooser === "CHOSEN_PLAYER") {
      return (
        resolveSelectedPlayerIdsFromTargets(
          ctx.framework.state.playerIds,
          chooserSelectionInput,
        )?.[0] ?? cardPlayed.playerId
      );
    }

    return (
      resolveTargetPlayerIds(ctx, cardPlayed, effect.chooser as never, chooserSelectionInput)[0] ??
      cardPlayed.playerId
    );
  }

  if (effect.chosenBy === "opponent") {
    return (
      ctx.framework.state.playerIds.find((playerId) => playerId !== cardPlayed.playerId) ??
      cardPlayed.playerId
    );
  }

  if (effect.chosenBy === "TARGET") {
    const selectedTargets = normalizeSelectedTargets(resolutionInput.targets) ?? [];
    const selectedPlayer = ctx.framework.state.playerIds.find((playerId) =>
      selectedTargets.some((target) => String(target) === String(playerId)),
    );
    if (selectedPlayer) {
      return selectedPlayer;
    }

    const selectedCardOwner = selectedTargets
      .map((target) => ctx.framework.zones.getCardOwner(target as unknown as CardInstanceId))
      .find(Boolean) as PlayerId | undefined;
    if (selectedCardOwner) {
      return selectedCardOwner;
    }
  }

  return cardPlayed.playerId;
}

function resolveOptionalChooserId(
  ctx: PlayCardExecutionContext,
  cardPlayed: CardPlayedPayload,
  effect: OptionalLikeEffect,
  resolutionInput: ActionResolutionInput,
): PlayerId {
  if (!effect.chooser) {
    return cardPlayed.playerId;
  }

  const chooserSelectionInput = getEffectTargetSelectionInput(effect.chooser, resolutionInput);

  if (effect.chooser === "CHOSEN_PLAYER") {
    return (
      resolveSelectedPlayerIdsFromTargets(
        ctx.framework.state.playerIds,
        chooserSelectionInput,
      )?.[0] ?? cardPlayed.playerId
    );
  }

  return (
    resolveTargetPlayerIds(ctx, cardPlayed, effect.chooser as never, chooserSelectionInput)[0] ??
    cardPlayed.playerId
  );
}

function suspendActionEffect(
  ctx: PlayCardExecutionContext,
  pendingEffect: ReturnType<typeof createPendingActionEffect>,
): ActionResolutionResult {
  enqueuePendingActionEffect(ctx, pendingEffect);
  return {
    status: "suspended",
    pendingEffect,
  };
}

function maybeSuspendForChosenTargets(
  ctx: PlayCardExecutionContext,
  cardPlayed: CardPlayedPayload,
  effect: unknown,
  resolutionInput: ActionResolutionInput,
  options?: ActionEffectResolutionOptions,
): ActionResolutionResult | undefined {
  if (!effect || typeof effect !== "object") {
    return undefined;
  }

  if (effectUsesExistingChosenTarget(effect)) {
    if (hasSatisfiedChosenTargetContext(ctx, cardPlayed, effect, resolutionInput)) {
      return undefined;
    }
  }

  const effectRecord = effect as Record<string, unknown>;
  if (
    effectRecord.type === "choice" ||
    effectRecord.type === "conditional" ||
    effectRecord.type === "discard" ||
    effectRecord.type === "for-each-opponent" ||
    effectRecord.type === "name-a-card" ||
    effectRecord.type === "optional" ||
    effectRecord.type === "or" ||
    effectRecord.type === "sequence" ||
    effectRecord.type === "scry"
  ) {
    return undefined;
  }

  const selectionContext = buildResolutionSelectionContext({
    origin: "pending-effect",
    requestId: "pending-effect:preview",
    sourceCardId: cardPlayed.cardId,
    chooserId: resolveDefaultTargetChooserId(ctx, cardPlayed, effectRecord, resolutionInput),
    cardPlayed,
    effect,
    resolutionInput,
    ctx,
  });
  if (
    !selectionContext ||
    (selectionContext.kind !== "target-selection" && selectionContext.kind !== "discard-choice")
  ) {
    return undefined;
  }

  const hasNoCandidates =
    selectionContext.kind === "target-selection" &&
    selectionContext.cardCandidateIds.length === 0 &&
    selectionContext.playerCandidateIds.length === 0;
  if (hasNoCandidates && cardPlayed.cardType === "action") {
    return undefined;
  }

  const pendingEffect = createPendingActionEffect(ctx, {
    kind: selectionContext.kind,
    sourceCardId: cardPlayed.cardId,
    controllerId: cardPlayed.playerId,
    chooserId: selectionContext.chooserId,
    cardPlayed,
    effect,
    continuation: options?.continuation,
    resolutionInput,
    selectionContext,
  });
  return suspendActionEffect(ctx, pendingEffect);
}

function resolveDefaultTargetChooserId(
  ctx: PlayCardExecutionContext,
  cardPlayed: CardPlayedPayload,
  effectRecord: Record<string, unknown>,
  resolutionInput: ActionResolutionInput,
): PlayerId {
  const chosenBy = effectRecord.chosenBy;
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
    const selectedTargets = normalizeSelectedTargets(resolutionInput.targets) ?? [];
    const selectedPlayer = ctx.framework.state.playerIds.find((playerId) =>
      selectedTargets.some((target) => String(target) === String(playerId)),
    );
    if (selectedPlayer) {
      return selectedPlayer;
    }

    const selectedCardOwner = selectedTargets
      .map((target) => ctx.framework.zones.getCardOwner(target as CardInstanceId))
      .find((ownerId): ownerId is PlayerId => typeof ownerId === "string" && ownerId.length > 0);
    if (selectedCardOwner) {
      return selectedCardOwner;
    }
  }

  return getCurrentActionActorId(ctx, cardPlayed);
}

function maybeSuspendForChosenPlayerSelection(
  ctx: PlayCardExecutionContext,
  cardPlayed: CardPlayedPayload,
  effect: ChoiceLikeEffect | OrLikeEffect | OptionalLikeEffect,
  resolutionInput: ActionResolutionInput,
  options?: ActionEffectResolutionOptions,
): ActionResolutionResult | undefined {
  if (effect.chooser !== "CHOSEN_PLAYER") {
    return undefined;
  }

  const selectedPlayers = resolveSelectedPlayerIdsFromTargets(
    ctx.framework.state.playerIds,
    resolutionInput.targets,
  );
  if ((selectedPlayers?.length ?? 0) > 0) {
    return undefined;
  }

  const pendingEffect = createPendingActionEffect(ctx, {
    kind: "target-selection",
    sourceCardId: cardPlayed.cardId,
    controllerId: cardPlayed.playerId,
    chooserId: getCurrentActionActorId(ctx, cardPlayed),
    cardPlayed,
    effect,
    continuation: options?.continuation,
    resolutionInput,
  });
  return suspendActionEffect(ctx, pendingEffect);
}

function maybeSuspendForTargetOrdering(
  ctx: PlayCardExecutionContext,
  cardPlayed: CardPlayedPayload,
  effect: unknown,
  resolutionInput: ActionResolutionInput,
  options?: ActionEffectResolutionOptions,
): ActionResolutionResult | undefined {
  if (
    !effect ||
    typeof effect !== "object" ||
    !("type" in effect) ||
    (effect as { type?: unknown }).type !== "put-on-bottom" ||
    (effect as { ordering?: unknown }).ordering !== "player-choice"
  ) {
    return undefined;
  }

  const effectRecord = effect as {
    orderBy?: unknown;
    target?: unknown;
  };
  const candidateTargets =
    resolveEffectTargets(ctx, cardPlayed, effectRecord.target, resolutionInput.targets) ?? [];
  if (candidateTargets.length <= 1) {
    return undefined;
  }

  const targetsByOwner = new Map<PlayerId, number>();
  for (const targetId of candidateTargets) {
    const ownerId = ctx.framework.zones.getCardOwner(targetId) as PlayerId | undefined;
    if (!ownerId) {
      continue;
    }
    targetsByOwner.set(ownerId, (targetsByOwner.get(ownerId) ?? 0) + 1);
  }

  const requiresOrderedInput = [...targetsByOwner.values()].some((count) => count > 1);
  if (!requiresOrderedInput) {
    return undefined;
  }

  const selectedTargets = normalizeSelectedTargets(resolutionInput.targets) ?? [];
  const candidateSet = new Set(candidateTargets);
  const hasExactOrdering =
    selectedTargets.length === candidateTargets.length &&
    new Set(selectedTargets).size === candidateTargets.length &&
    selectedTargets.every((targetId) => candidateSet.has(targetId));
  if (hasExactOrdering) {
    return undefined;
  }

  const chooserId =
    effectRecord.orderBy === "owner"
      ? ((candidateTargets
          .map((targetId) => ctx.framework.zones.getCardOwner(targetId) as PlayerId | undefined)
          .find(Boolean) ?? cardPlayed.playerId) as PlayerId)
      : cardPlayed.playerId;
  const allowedZones =
    effectRecord.target &&
    typeof effectRecord.target === "object" &&
    !Array.isArray(effectRecord.target) &&
    Array.isArray((effectRecord.target as { zones?: unknown }).zones)
      ? ((effectRecord.target as { zones: string[] }).zones as Array<
          "deck" | "hand" | "play" | "discard" | "inkwell" | "limbo"
        >)
      : [];
  const selectionContext = {
    origin: "pending-effect" as const,
    requestId: "pending-effect:preview",
    kind: "target-selection" as const,
    sourceCardId: cardPlayed.cardId,
    chooserId,
    currentSelection: {},
    submitField: "targets" as const,
    targetDsl:
      effectRecord.target &&
      typeof effectRecord.target === "object" &&
      !Array.isArray(effectRecord.target)
        ? [effectRecord.target as never]
        : [],
    cardCandidateIds: [...candidateTargets],
    playerCandidateIds: [],
    allowedZones,
    minSelections: candidateTargets.length,
    maxSelections: candidateTargets.length,
    ordered: true,
    autoRejected: false,
  };

  const pendingEffect = createPendingActionEffect(ctx, {
    kind: "target-selection",
    sourceCardId: cardPlayed.cardId,
    controllerId: cardPlayed.playerId,
    chooserId,
    cardPlayed,
    effect,
    continuation: options?.continuation,
    resolutionInput,
    selectionContext,
  });
  return suspendActionEffect(ctx, pendingEffect);
}

function isNameACardEffect(effect: unknown): effect is NameACardEffect {
  return (
    typeof effect === "object" &&
    effect !== null &&
    "type" in effect &&
    (effect as { type?: unknown }).type === "name-a-card"
  );
}

function maybeSuspendForNamedCardSelection(
  ctx: PlayCardExecutionContext,
  cardPlayed: CardPlayedPayload,
  effect: NameACardEffect,
  resolutionInput: ActionResolutionInput,
  options?: ActionEffectResolutionOptions,
): ActionResolutionResult | undefined {
  if (
    typeof resolutionInput.namedCard === "string" &&
    resolutionInput.namedCard.trim().length > 0
  ) {
    return undefined;
  }

  const pendingEffect = createPendingActionEffect(ctx, {
    kind: "name-card-selection",
    sourceCardId: cardPlayed.cardId,
    controllerId: cardPlayed.playerId,
    chooserId: getCurrentActionActorId(ctx, cardPlayed),
    cardPlayed,
    effect,
    continuation: options?.continuation,
    resolutionInput,
  });
  return suspendActionEffect(ctx, pendingEffect);
}

function resolveSelectedPlayerIdsFromTargets(
  playerIds: readonly PlayerId[],
  targets: ActionResolutionInput["targets"],
): PlayerId[] | undefined {
  return resolveSelectedPlayerIds(playerIds, targets);
}

function resolveTargetPlayerIdsForEffect(
  ctx: PlayCardExecutionContext,
  cardPlayed: CardPlayedPayload,
  effect: unknown,
  resolutionInput: ActionResolutionInput,
): PlayerId[] | undefined {
  const effectTarget =
    effect && typeof effect === "object" && "target" in effect
      ? (effect as Record<string, unknown>).target
      : undefined;

  if (effectTarget === undefined) {
    return resolveSelectedPlayerIdsFromTargets(
      ctx.framework.state.playerIds,
      getCurrentSelectionInput(resolutionInput),
    );
  }

  return resolveTargetPlayerIds(
    ctx,
    cardPlayed,
    effectTarget,
    getEffectTargetSelectionInput(effectTarget, resolutionInput),
  );
}

function resolveSelectedCardTargetsForEffect(
  effect: unknown,
  resolutionInput: ActionResolutionInput,
): CardInstanceId[] | undefined {
  const effectTarget =
    effect && typeof effect === "object" && "target" in effect
      ? (effect as Record<string, unknown>).target
      : undefined;

  return normalizeSelectedTargets(getEffectTargetSelectionInput(effectTarget, resolutionInput));
}

export const ACTION_EFFECT_RESOLVER_TYPES = [
  "gain-keyword",
  "gain-keywords",
  "modify-stat",
  "sequence",
  "play-card",
  "conditional",
  "draw",
  "optional",
  "gain-lore",
  "restriction",
  "banish",
  "deal-damage",
  "return-to-hand",
  "remove-damage",
  "discard",
  "mill",
  "put-into-inkwell",
  "put-under",
  "enable-play-from-under",
  "pay-cost",
  "put-on-bottom",
  "put-on-top",
  "ready",
  "select-target",
  "scry",
  "for-each",
  "for-each-opponent",
  "return-from-discard",
  "return-random-from-inkwell",
  "exert",
  "choice",
  "or",
  "lose-lore",
  "shuffle-into-deck",
  "reveal",
  "reveal-top-card",
  "reveal-until-match",
  "name-a-card",
  "reveal-hand",
  "search-deck",
  "put-damage",
  "grant-ability",
  "cost-reduction",
  "additional-inkwell",
  "put-in-hand",
  "move-to-location",
  "move-damage",
  "count",
  "move-cards-from-under",
  "draw-until-hand-size",
  "create-triggered-ability",
  "create-replacement-effect",
  "support",
  "property-modification",
  "lose-keyword",
  "reveal-and-route",
] as const;

type SupportedActionEffectType = (typeof ACTION_EFFECT_RESOLVER_TYPES)[number];

function resolveEffectExecutionContext(
  ctx: PlayCardExecutionContext,
  cardPlayed: CardPlayedPayload,
  effect: unknown,
  resolutionInput: ActionResolutionInput,
): {
  resolvedDynamic: ReturnType<typeof resolveEffectDynamicFields>;
  resolvedTargets: CardInstanceId[];
} {
  const effectTarget =
    effect && typeof effect === "object" && "target" in effect
      ? (effect as Record<string, unknown>).target
      : undefined;
  const hasExplicitTarget = effect && typeof effect === "object" && "target" in effect;
  const selectedTargets = getCurrentSelectionTargets(resolutionInput).filter(
    (targetId): targetId is CardInstanceId => typeof targetId === "string",
  );
  const contextTargets = getContextSelectionTargets(resolutionInput).filter(
    (targetId): targetId is CardInstanceId => typeof targetId === "string",
  );
  const resolvedTargets = hasExplicitTarget
    ? (resolveEffectTargets(
        ctx,
        cardPlayed,
        effectTarget,
        getEffectTargetSelectionInput(effectTarget, resolutionInput),
        resolutionInput.eventSnapshot,
      ) ?? [])
    : selectedTargets;
  // When there are no current selected targets but there are context targets from a prior
  // sequence step (e.g. a "select-target" step preceding this effect), and the effect's
  // dynamic fields reference a prior selection (e.g. { ref: "previous-target" }), use the
  // context targets for dynamic field resolution so that variable amounts like
  // "strength-of { ref: 'previous-target' }" correctly resolve to the prior step's selection.
  const dynamicTargets =
    selectedTargets.length > 0
      ? selectedTargets
      : isTargetReferenceDescriptor(effectTarget) && contextTargets.length > 0
        ? contextTargets
        : resolvedTargets.length > 0
          ? resolvedTargets
          : contextTargets;
  const resolvedDynamic = resolveEffectDynamicFields(
    effect,
    {
      cardPlayed,
      ctx,
      eventSnapshot: resolutionInput.eventSnapshot,
    },
    dynamicTargets.length > 0 ? dynamicTargets : undefined,
  );

  return {
    resolvedDynamic,
    resolvedTargets,
  };
}

const actionEffectResolvers: Record<SupportedActionEffectType, ActionEffectResolver> = {
  sequence: (ctx, cardPlayed, effect, resolutionInput, options) => {
    if (!isSequenceLikeEffect(effect)) {
      handleUnsupportedActionEffect("sequence", "Malformed sequence effect payload");
      return RESOLVED_ACTION_EFFECT;
    }

    const nestedEffects = effect.steps ?? effect.effects ?? [];
    const stagedSequence =
      options?.continuation?.stagedSequence?.sequenceEffect === effect
        ? options.continuation.stagedSequence
        : undefined;
    const contextTargets = getContextSelectionTargets(resolutionInput);
    const currentTargets = getCurrentSelectionTargets(resolutionInput);
    const selectedTargetsBySignature = new Map<string, Array<CardInstanceId | PlayerId>>();
    let consumedTargets = 0;
    let stagedTargetCursor = 0;

    for (const [index, nestedEffect] of nestedEffects.entries()) {
      const remainingSequenceSteps = nestedEffects.slice(index + 1);
      const stagedTargetCount = stagedSequence?.collectedTargetCounts[index] ?? 0;
      const explicitSelections = sequenceStepConsumesExplicitTargets(
        ctx,
        cardPlayed,
        nestedEffect,
        resolutionInput,
      );
      const chosenTargetDescriptors = getEffectChosenTargetDescriptors(
        ctx,
        cardPlayed,
        nestedEffect,
        resolutionInput,
      );
      const targetSignature =
        chosenTargetDescriptors.length === 1 ? chosenTargetDescriptors[0]?.signature : undefined;
      const runtimeNestedEffect = resolveSequenceStepEffect(
        ctx,
        cardPlayed,
        nestedEffect,
        resolutionInput,
      );
      const requiresFullTargetContext =
        effectRequiresFullTargetContext(nestedEffect) ||
        effectRequiresFullTargetContext(runtimeNestedEffect);
      const requiresPriorTargetContext =
        requiresFullTargetContext || stepRequiresPriorTargetContext(chosenTargetDescriptors);
      const reusedTargets =
        !stagedSequence && targetSignature
          ? selectedTargetsBySignature.get(targetSignature)
          : undefined;
      const priorStepTargets = currentTargets.slice(0, consumedTargets);
      const stepContextTargets = [...contextTargets, ...priorStepTargets];
      const stepSelection = resolveChosenTargetAssignments(
        ctx,
        cardPlayed,
        nestedEffect,
        resolutionInput,
        currentTargets.slice(consumedTargets),
      );
      const fallbackStepTargets =
        explicitSelections > 0
          ? currentTargets.slice(consumedTargets, consumedTargets + explicitSelections)
          : [];
      const stepTargets =
        reusedTargets && reusedTargets.length > 0 ? reusedTargets : stepSelection.targets;
      const effectiveStepTargets =
        stepTargets.length > 0 || fallbackStepTargets.length === 0
          ? stepTargets
          : fallbackStepTargets;
      const nestedResolutionInput = (() => {
        if (stagedSequence && stagedTargetCount > 0) {
          return withCurrentSelectionTargets(
            withContextSelectionTargets(
              clearCurrentSelectionTargets(resolutionInput),
              stepContextTargets,
            ),
            stagedSequence.collectedTargets.slice(
              stagedTargetCursor,
              stagedTargetCursor + stagedTargetCount,
            ),
          );
        }

        if (explicitSelections > 0) {
          return withCurrentSelectionTargets(
            withContextSelectionTargets(
              clearCurrentSelectionTargets(resolutionInput),
              requiresPriorTargetContext ? stepContextTargets : contextTargets,
            ),
            effectiveStepTargets,
          );
        }

        if (consumedTargets > 0 && !requiresFullTargetContext) {
          return withCurrentSelectionTargets(
            withContextSelectionTargets(
              clearCurrentSelectionTargets(resolutionInput),
              stepContextTargets,
            ),
            currentTargets.slice(consumedTargets),
          );
        }

        if (requiresFullTargetContext && stepContextTargets.length > contextTargets.length) {
          const nextResolutionInput = withContextSelectionTargets(
            clearCurrentSelectionTargets(resolutionInput),
            stepContextTargets,
          );
          const remainingCurrentTargets = currentTargets.slice(consumedTargets);

          return remainingCurrentTargets.length > 0
            ? withCurrentSelectionTargets(nextResolutionInput, remainingCurrentTargets)
            : nextResolutionInput;
        }

        return resolutionInput;
      })();
      const implicitlyConsumesCurrentSelection =
        hasSatisfiedChosenTargetContext(
          ctx,
          cardPlayed,
          runtimeNestedEffect,
          nestedResolutionInput,
        ) || getEffectType(runtimeNestedEffect) === "play-card";
      const chosenContextConsumptionCount =
        !stagedSequence &&
        implicitlyConsumesCurrentSelection &&
        stepSelection.consumedCount === 0 &&
        currentTargets.length > consumedTargets
          ? 1
          : 0;
      stagedTargetCursor += stagedSequence?.collectedTargetCounts[index] ?? 0;
      if (!stagedSequence && explicitSelections > 0) {
        if (!reusedTargets) {
          consumedTargets += Math.max(stepSelection.consumedCount, fallbackStepTargets.length);
        }
      } else if (
        !stagedSequence &&
        stepSelection.consumedCount > 0 &&
        implicitlyConsumesCurrentSelection
      ) {
        consumedTargets += stepSelection.consumedCount;
      }
      if (!stagedSequence && chosenContextConsumptionCount > 0) {
        consumedTargets += chosenContextConsumptionCount;
      }
      if (!stagedSequence && stepSelection.assignments.length > 0) {
        stepSelection.assignments.forEach((assignment) => {
          if (
            assignment.signature &&
            assignment.targets.length > 0 &&
            !selectedTargetsBySignature.has(assignment.signature)
          ) {
            selectedTargetsBySignature.set(assignment.signature, [...assignment.targets]);
          }
        });
      }
      const continuation = mergeContinuationEffects(
        remainingSequenceSteps,
        options?.continuation?.remainingEffects
          ? { remainingEffects: options.continuation.remainingEffects }
          : {},
      );
      const result = resolveActionEffect(ctx, cardPlayed, nestedEffect, nestedResolutionInput, {
        ...options,
        continuation,
      });
      if (result.status === "suspended") {
        const selectionContext = result.pendingEffect.selectionContext;
        const isTargetSelection =
          selectionContext?.kind === "target-selection" ||
          selectionContext?.kind === "discard-choice";
        const hasNoCandidates =
          isTargetSelection &&
          selectionContext.cardCandidateIds.length === 0 &&
          selectionContext.playerCandidateIds.length === 0;
        if (hasNoCandidates) {
          removePendingActionEffect(ctx, result.pendingEffect.id);
          clearPendingActionChoice(ctx);
          continue;
        }
        if (
          index === 0 &&
          !stagedSequence &&
          canStageSequenceTargetCollection(ctx, cardPlayed, effect) &&
          result.pendingEffect.kind === "target-selection" &&
          remainingSequenceSteps.length > 0
        ) {
          result.pendingEffect.continuation = {
            ...(options?.continuation?.remainingEffects
              ? { remainingEffects: [...options.continuation.remainingEffects] }
              : {}),
            stagedSequence: {
              sequenceEffect: effect,
              collectedTargets: [...currentTargets],
              collectedTargetCounts: [],
              remainingSteps: [...remainingSequenceSteps],
            },
          };
        }
        return result;
      }
    }

    return RESOLVED_ACTION_EFFECT;
  },

  optional: (ctx, cardPlayed, effect, resolutionInput, options) => {
    if (!isOptionalLikeEffect(effect)) {
      handleUnsupportedActionEffect("optional", "Malformed optional effect payload");
      return RESOLVED_ACTION_EFFECT;
    }

    const pendingPlayerSelection = maybeSuspendForChosenPlayerSelection(
      ctx,
      cardPlayed,
      effect,
      resolutionInput,
      options,
    );
    if (pendingPlayerSelection) {
      return pendingPlayerSelection;
    }

    const chooserId = resolveOptionalChooserId(ctx, cardPlayed, effect, resolutionInput);
    const actorId = getCurrentActionActorId(ctx, cardPlayed);
    if (actorId !== chooserId || typeof resolutionInput.resolveOptional !== "boolean") {
      const pendingEffect = createPendingActionEffect(ctx, {
        kind: "optional-selection",
        sourceCardId: cardPlayed.cardId,
        controllerId: cardPlayed.playerId,
        chooserId,
        cardPlayed,
        effect,
        continuation: options?.continuation,
        resolutionInput,
      });
      return suspendActionEffect(ctx, pendingEffect);
    }

    if (!resolutionInput.resolveOptional) {
      markLastEffectPerformed(resolutionInput.eventSnapshot, false);
      return RESOLVED_ACTION_EFFECT;
    }

    if (effect.effect) {
      const nestedResolutionInput =
        effect.chooser === "CHOSEN_PLAYER"
          ? promoteSelectedPlayersToTargetContext(ctx, resolutionInput)
          : resolutionInput;
      return resolveActionEffect(ctx, cardPlayed, effect.effect, nestedResolutionInput, options);
    }

    return RESOLVED_ACTION_EFFECT;
  },

  choice: (ctx, cardPlayed, effect, resolutionInput, options) => {
    if (!isChoiceLikeEffect(effect)) {
      handleUnsupportedActionEffect("choice", "Malformed choice effect payload");
      return RESOLVED_ACTION_EFFECT;
    }

    const choiceOptions = effect.options ?? effect.choices ?? [];
    if (choiceOptions.length === 0) {
      return RESOLVED_ACTION_EFFECT;
    }

    const pendingPlayerSelection = maybeSuspendForChosenPlayerSelection(
      ctx,
      cardPlayed,
      effect,
      resolutionInput,
      options,
    );
    if (pendingPlayerSelection) {
      return pendingPlayerSelection;
    }

    const chooserId = resolveChoiceChooserId(ctx, cardPlayed, effect, resolutionInput);
    const actorId = getCurrentActionActorId(ctx, cardPlayed);
    const rawChoiceIndex = resolutionInput.choiceIndex;
    if (
      actorId !== chooserId ||
      typeof rawChoiceIndex !== "number" ||
      !Number.isInteger(rawChoiceIndex) ||
      rawChoiceIndex < 0
    ) {
      const pendingEffect = createPendingActionEffect(ctx, {
        kind: "choice-selection",
        sourceCardId: cardPlayed.cardId,
        controllerId: cardPlayed.playerId,
        chooserId,
        cardPlayed,
        effect,
        continuation: options?.continuation,
        resolutionInput,
      });
      return suspendActionEffect(ctx, pendingEffect);
    }

    const choiceIndex = Math.min(rawChoiceIndex, choiceOptions.length - 1);
    const nestedResolutionInput =
      effect.chooser === "CHOSEN_PLAYER"
        ? promoteSelectedPlayersToTargetContext(ctx, resolutionInput)
        : resolutionInput;
    return resolveActionEffect(
      ctx,
      cardPlayed,
      choiceOptions[choiceIndex],
      nestedResolutionInput,
      options,
    );
  },

  or: (ctx, cardPlayed, effect, resolutionInput, options) => {
    if (!isOrLikeEffect(effect)) {
      handleUnsupportedActionEffect("or", "Malformed or effect payload");
      return RESOLVED_ACTION_EFFECT;
    }

    const orOptions = effect.options ?? effect.choices ?? [];
    if (orOptions.length === 0) {
      markLastEffectPerformed(resolutionInput.eventSnapshot, false);
      return RESOLVED_ACTION_EFFECT;
    }

    const pendingPlayerSelection = maybeSuspendForChosenPlayerSelection(
      ctx,
      cardPlayed,
      effect,
      resolutionInput,
      options,
    );
    if (pendingPlayerSelection) {
      return pendingPlayerSelection;
    }

    const chooserId = resolveChoiceChooserId(ctx, cardPlayed, effect, resolutionInput);
    const actorId = getCurrentActionActorId(ctx, cardPlayed);
    const rawChoiceIndex = resolutionInput.choiceIndex;
    const legalOptionIndices = getLegalOrOptionIndices(ctx, cardPlayed, effect, resolutionInput);

    if (legalOptionIndices.length === 0) {
      markLastEffectPerformed(resolutionInput.eventSnapshot, false);
      return RESOLVED_ACTION_EFFECT;
    }

    if (legalOptionIndices.length === 1 && actorId === chooserId) {
      const forcedChoiceIndex = legalOptionIndices[0]!;
      const nestedResolutionInput =
        effect.chooser === "CHOSEN_PLAYER"
          ? promoteSelectedPlayersToTargetContext(ctx, resolutionInput)
          : resolutionInput;
      return resolveActionEffect(
        ctx,
        cardPlayed,
        orOptions[forcedChoiceIndex],
        nestedResolutionInput,
        options,
      );
    }

    if (
      actorId !== chooserId ||
      typeof rawChoiceIndex !== "number" ||
      !Number.isInteger(rawChoiceIndex) ||
      rawChoiceIndex < 0
    ) {
      const pendingEffect = createPendingActionEffect(ctx, {
        kind: "choice-selection",
        sourceCardId: cardPlayed.cardId,
        controllerId: cardPlayed.playerId,
        chooserId,
        cardPlayed,
        effect,
        continuation: options?.continuation,
        resolutionInput,
      });
      return suspendActionEffect(ctx, pendingEffect);
    }

    const requestedChoiceIndex = Math.min(rawChoiceIndex, orOptions.length - 1);
    const choiceIndex = legalOptionIndices.includes(requestedChoiceIndex)
      ? requestedChoiceIndex
      : legalOptionIndices.length === 1
        ? legalOptionIndices[0]!
        : requestedChoiceIndex;
    if (!legalOptionIndices.includes(choiceIndex)) {
      markLastEffectPerformed(resolutionInput.eventSnapshot, false);
      return RESOLVED_ACTION_EFFECT;
    }

    const nestedResolutionInput =
      effect.chooser === "CHOSEN_PLAYER"
        ? promoteSelectedPlayersToTargetContext(ctx, resolutionInput)
        : resolutionInput;
    return resolveActionEffect(
      ctx,
      cardPlayed,
      orOptions[choiceIndex],
      nestedResolutionInput,
      options,
    );
  },

  "for-each": (ctx, cardPlayed, effect, resolutionInput, options) => {
    if (!isForEachLikeEffect(effect)) {
      handleUnsupportedActionEffect("for-each", "Malformed for-each effect payload");
      return RESOLVED_ACTION_EFFECT;
    }

    if (!effect.effect) {
      return RESOLVED_ACTION_EFFECT;
    }

    const resolved = resolveEffectExecutionContext(ctx, cardPlayed, effect, resolutionInput);
    const resolvedForEachAmount = resolveEffectDynamicFields(
      {
        amount: {
          type: "for-each",
          counter: effect.counter,
        },
      },
      {
        cardPlayed,
        ctx,
        eventSnapshot: resolutionInput.eventSnapshot,
      },
      resolved.resolvedTargets.length > 0 ? resolved.resolvedTargets : undefined,
    );

    const rawRepeatCount = resolveAggregateFieldAmount(resolvedForEachAmount.amount) ?? 0;
    const configuredMaximum =
      typeof effect.maximum === "number" && Number.isFinite(effect.maximum) && effect.maximum >= 0
        ? effect.maximum
        : undefined;
    const repeatCount =
      configuredMaximum === undefined
        ? rawRepeatCount
        : Math.min(rawRepeatCount, configuredMaximum);

    const nestedTargets =
      resolved.resolvedTargets.length > 0 ? resolved.resolvedTargets : resolutionInput.targets;
    const nestedResolutionInput = {
      ...resolutionInput,
      targets: nestedTargets,
    };

    for (let index = 0; index < repeatCount; index += 1) {
      const result = resolveActionEffect(ctx, cardPlayed, effect.effect, nestedResolutionInput, {
        continuation: index === repeatCount - 1 ? options?.continuation : undefined,
      });
      if (result.status === "suspended") {
        return result;
      }
    }

    return RESOLVED_ACTION_EFFECT;
  },

  "for-each-opponent": (ctx, cardPlayed, effect, resolutionInput) => {
    if (!isForEachOpponentEffect(effect)) {
      handleUnsupportedActionEffect(
        "for-each-opponent",
        "Malformed for-each-opponent effect payload",
      );
      return RESOLVED_ACTION_EFFECT;
    }

    return resolveForEachOpponentEffect(
      ctx,
      cardPlayed,
      effect as ForEachOpponentEffect,
      resolutionInput,
    );
  },

  conditional: (ctx, cardPlayed, effect, resolutionInput, options) => {
    if (!isConditionalEffect(effect)) {
      handleUnsupportedActionEffect("conditional", "Malformed conditional effect payload");
      return RESOLVED_ACTION_EFFECT;
    }

    return resolveConditionalEffect(
      ctx,
      cardPlayed,
      effect as ConditionalEffect,
      resolutionInput,
      resolveActionEffect,
      options,
    );
  },

  draw: (ctx, cardPlayed, effect, resolutionInput) => {
    if (!isDrawEffect(effect)) {
      handleUnsupportedActionEffect("draw", "Malformed draw effect payload");
      return RESOLVED_ACTION_EFFECT;
    }

    const resolved = resolveEffectExecutionContext(ctx, cardPlayed, effect, resolutionInput);
    const drawAmount =
      resolved.resolvedDynamic.amount === undefined
        ? 1
        : resolveAggregateFieldAmount(resolved.resolvedDynamic.amount);
    resolveDrawEffect(
      ctx,
      cardPlayed,
      effect as DrawEffect,
      {
        drawAmount,
        selectedPlayerIds: resolveTargetPlayerIdsForEffect(
          ctx,
          cardPlayed,
          effect,
          resolutionInput,
        ),
        selectedTargets: resolveSelectedCardTargetsForEffect(effect, resolutionInput),
      },
      resolutionInput.eventSnapshot,
    );
    return RESOLVED_ACTION_EFFECT;
  },

  mill: (ctx, cardPlayed, effect, resolutionInput) => {
    if (!isMillEffect(effect)) {
      handleUnsupportedActionEffect("mill", "Malformed mill effect payload");
      return RESOLVED_ACTION_EFFECT;
    }

    const resolved = resolveEffectExecutionContext(ctx, cardPlayed, effect, resolutionInput);
    const millAmount =
      resolved.resolvedDynamic.amount === undefined
        ? 1
        : resolveAggregateFieldAmount(resolved.resolvedDynamic.amount);
    resolveMillEffect(ctx, cardPlayed, effect as MillEffect, {
      millAmount,
      selectedPlayerIds: resolveTargetPlayerIdsForEffect(ctx, cardPlayed, effect, resolutionInput),
    });
    return RESOLVED_ACTION_EFFECT;
  },

  "draw-until-hand-size": (ctx, cardPlayed, effect, resolutionInput) => {
    if (!isDrawUntilHandSizeEffect(effect)) {
      handleUnsupportedActionEffect(
        "draw-until-hand-size",
        "Malformed draw-until-hand-size effect payload",
      );
      return RESOLVED_ACTION_EFFECT;
    }

    resolveDrawUntilHandSizeEffect(
      ctx,
      cardPlayed,
      effect as DrawUntilHandSizeEffect,
      resolutionInput,
    );
    return RESOLVED_ACTION_EFFECT;
  },

  "gain-lore": (ctx, cardPlayed, effect, resolutionInput) => {
    if (!isGainLoreEffect(effect)) {
      handleUnsupportedActionEffect("gain-lore", "Malformed gain-lore effect payload");
      return RESOLVED_ACTION_EFFECT;
    }

    const resolved = resolveEffectExecutionContext(ctx, cardPlayed, effect, resolutionInput);
    const baseAmount =
      resolved.resolvedDynamic.amount === undefined
        ? 1
        : resolveAggregateFieldAmount(resolved.resolvedDynamic.amount);
    const selectedPlayerIds = resolveTargetPlayerIdsForEffect(
      ctx,
      cardPlayed,
      effect,
      resolutionInput,
    );
    const targetPlayerId = selectedPlayerIds?.[0] ?? cardPlayed.playerId;
    const replacedEvent = applyReplacementEffects(
      ctx,
      {
        kind: "gain-lore",
        eventId: `gain-lore:${cardPlayed.cardId}:${targetPlayerId}`,
        sourceId: cardPlayed.cardId,
        controllerId: cardPlayed.playerId,
        playerId: targetPlayerId,
        amount: typeof baseAmount === "number" ? baseAmount : 0,
      },
      {
        selfReplacement: (effect as GainLoreEffect).selfReplacement,
        cardPlayed,
        resolutionInput,
      },
    );
    resolveGainLoreEffect(ctx, cardPlayed, effect as GainLoreEffect, {
      gainAmount: replacedEvent.amount,
      selectedPlayerIds,
      selectedTargets: resolveSelectedCardTargetsForEffect(effect, resolutionInput),
    });
    return RESOLVED_ACTION_EFFECT;
  },

  "lose-lore": (ctx, cardPlayed, effect, resolutionInput) => {
    if (!isLoseLoreEffect(effect)) {
      handleUnsupportedActionEffect("lose-lore", "Malformed lose-lore effect payload");
      return RESOLVED_ACTION_EFFECT;
    }

    const resolved = resolveEffectExecutionContext(ctx, cardPlayed, effect, resolutionInput);
    const loseAmount = resolveAggregateFieldAmount(resolved.resolvedDynamic.amount);
    resolveLoseLoreEffect(ctx, cardPlayed, effect as LoseLoreEffect, {
      eventSnapshot: resolutionInput.eventSnapshot,
      loseAmount,
      selectedPlayerIds: resolveTargetPlayerIdsForEffect(ctx, cardPlayed, effect, resolutionInput),
    });
    return RESOLVED_ACTION_EFFECT;
  },

  "lose-keyword": (ctx, cardPlayed, effect, resolutionInput) => {
    if (!isLoseKeywordEffect(effect)) {
      handleUnsupportedActionEffect("lose-keyword", "Malformed lose-keyword effect payload");
      return RESOLVED_ACTION_EFFECT;
    }

    resolveLoseKeywordEffect(ctx, cardPlayed, effect as LoseKeywordEffect, resolutionInput);
    return RESOLVED_ACTION_EFFECT;
  },

  scry: (ctx, cardPlayed, effect, resolutionInput, options) => {
    if (!isScryEffect(effect)) {
      handleUnsupportedActionEffect("scry", "Malformed scry effect payload");
      return RESOLVED_ACTION_EFFECT;
    }

    const resolved = resolveEffectExecutionContext(ctx, cardPlayed, effect, resolutionInput);
    const scryAmount = resolveAggregateFieldAmount(resolved.resolvedDynamic.amount);
    const selectedPlayerIds = resolveTargetPlayerIdsForEffect(
      ctx,
      cardPlayed,
      effect,
      resolutionInput,
    );
    const hasExplicitDestinations = Array.isArray(resolutionInput.destinations);

    // Resolve the chooser early: this determines who should make the scry
    // destination decision. When the chooser is not the current actor, the
    // effect MUST suspend — even if destinations were provided — because
    // the wrong player cannot make this choice.
    const defaultChooser = getCurrentActionActorId(ctx, cardPlayed);
    const effectChooser = (effect as { chooser?: unknown }).chooser;
    const chooserId =
      effectChooser != null
        ? (resolveTargetPlayerIds(ctx, cardPlayed, effectChooser as never)[0] ?? defaultChooser)
        : defaultChooser;
    const actorId = getCurrentActionActorId(ctx, cardPlayed);
    const chooserIsNotCurrentActor = chooserId !== actorId;

    // Suspend when:
    // - destinations were not provided (normal first-entry path), OR
    // - destinations were provided but by the wrong player (safety guard)
    const shouldSuspend = !hasExplicitDestinations || chooserIsNotCurrentActor;

    if (shouldSuspend && Array.isArray(effect.destinations) && effect.destinations.length > 0) {
      const deckPlayerId = resolveScryDeckPlayerId(cardPlayed, selectedPlayerIds);
      // Top-of-deck cards to inspect. Prefer pre-resolved cards (from a preceding
      // reveal-top-card step in a sequence) over re-reading from the deck zone.
      const existingRevealedCards = resolutionInput.eventSnapshot?.revealedCardIds;
      const lookedAtCards =
        existingRevealedCards && existingRevealedCards.length > 0
          ? ([...existingRevealedCards] as CardInstanceId[])
          : getScryLookedAtCards(ctx, deckPlayerId, scryAmount);

      if (lookedAtCards.length > 0) {
        const revealWindowIds = [ctx.framework.zones.reveal(lookedAtCards, [chooserId])];
        const scryVisibility = {
          mode: "PUBLIC_WITH_OVERRIDES" as const,
          overrides: {
            [chooserId]: createLorcanaLogMessage("lorcana.scry.detail", {
              playerId: chooserId,
              count: lookedAtCards.length,
              lookedAt: lookedAtCards,
            }),
          },
        };
        ctx.framework.log({
          category: "action",
          visibility: scryVisibility,
          defaultMessage: createLorcanaLogMessage("lorcana.scry.count", {
            playerId: chooserId,
            count: lookedAtCards.length,
          }),
          typedEntry: createLorcanaGameLogEntry(
            "lorcana.scry.count",
            {
              playerId: chooserId,
              count: lookedAtCards.length,
            },
            scryVisibility,
            "action",
          ),
        });
        const pendingEffect = createPendingActionEffect(ctx, {
          kind: "scry-selection",
          sourceCardId: cardPlayed.cardId,
          controllerId: cardPlayed.playerId,
          chooserId,
          cardPlayed,
          effect,
          continuation: options?.continuation,
          resolutionInput: {
            ...resolutionInput,
            // Clear any injected destinations — they came from the wrong player.
            destinations: undefined,
            eventSnapshot: {
              ...resolutionInput.eventSnapshot,
              revealedCardIds: lookedAtCards,
              revealWindowIds,
            },
          },
        });

        return suspendActionEffect(ctx, pendingEffect);
      }
    }

    resolveScryEffect(ctx, cardPlayed, effect as ScryEffect, {
      destinations: resolutionInput.destinations,
      lookedAtCards: resolutionInput.eventSnapshot?.revealedCardIds,
      revealWindowIds: resolutionInput.eventSnapshot?.revealWindowIds,
      scryAmount,
      selectedPlayerIds,
    });

    // Handle repeatOnHandMatch: if any card was placed into hand, re-queue this scry effect.
    // Used for "repeat this effect" cards (e.g. Sisu - Uniting Dragon).
    const scryEffect = effect as ScryEffect;
    if (scryEffect.repeatOnHandMatch === true) {
      const resolvedDestinations = Array.isArray(resolutionInput.destinations)
        ? resolutionInput.destinations
        : [];
      const handSelection = resolvedDestinations.find((d) => d.zone === "hand");
      const cardsMovedToHand = Array.isArray(handSelection?.cards) ? handSelection.cards : [];

      if (cardsMovedToHand.length > 0) {
        const deckPlayerId = resolveScryDeckPlayerId(cardPlayed, selectedPlayerIds);
        const nextTopCards = getScryLookedAtCards(ctx, deckPlayerId, scryAmount ?? 1);

        if (nextTopCards.length > 0) {
          const defaultChooser = getCurrentActionActorId(ctx, cardPlayed);
          const effectChooser = (scryEffect as { chooser?: unknown }).chooser;
          const chooserId =
            effectChooser != null
              ? (resolveTargetPlayerIds(ctx, cardPlayed, effectChooser as never)[0] ??
                defaultChooser)
              : defaultChooser;
          const revealWindowIds = [ctx.framework.zones.reveal(nextTopCards, [chooserId])];
          const repeatPendingEffect = createPendingActionEffect(ctx, {
            kind: "scry-selection",
            sourceCardId: cardPlayed.cardId,
            controllerId: cardPlayed.playerId,
            chooserId,
            cardPlayed,
            effect: scryEffect,
            resolutionInput: {
              ...resolutionInput,
              destinations: undefined,
              eventSnapshot: {
                revealedCardIds: nextTopCards,
                revealWindowIds,
              },
            },
          });
          enqueuePendingActionEffect(ctx, repeatPendingEffect);
        }
      }
    }

    // Execute any action cards that were sent to a "play" destination with cost: "free".
    // The scry resolver already moved them to the play zone; now run their effects and
    // finalize them to discard, matching the normal action-card play lifecycle.
    const playDest = (scryEffect.destinations ?? []).find((d) => d.zone === "play");
    if (playDest && "cost" in playDest && playDest.cost === "free") {
      const resolvedDestinations = Array.isArray(resolutionInput.destinations)
        ? resolutionInput.destinations
        : [];
      const playSelection = resolvedDestinations.find((d) => d.zone === "play");
      const playCardIds = Array.isArray(playSelection?.cards) ? playSelection.cards : [];
      for (const cardId of playCardIds) {
        const def = ctx.cards.getDefinition(cardId) as { cardType?: string } | undefined;
        if (def?.cardType === "action") {
          executeScryActionCardPlay(
            ctx,
            cardId as CardInstanceId,
            cardPlayed.playerId,
            resolutionInput,
          );
        }
      }
    }

    return RESOLVED_ACTION_EFFECT;
  },

  "remove-damage": (ctx, cardPlayed, effect, resolutionInput) => {
    if (!isRemoveDamageEffect(effect)) {
      handleUnsupportedActionEffect("remove-damage", "Malformed remove-damage effect payload");
      return RESOLVED_ACTION_EFFECT;
    }

    const resolved = resolveEffectExecutionContext(ctx, cardPlayed, effect, resolutionInput);
    const replacedAmounts: Record<CardInstanceId, number> = {};
    const rawAmounts = resolvePerTargetFieldAmounts(
      resolved.resolvedDynamic.amount,
      resolved.resolvedTargets,
    );
    for (const targetId of resolved.resolvedTargets) {
      const replacedEvent = applyReplacementEffects(
        ctx,
        {
          kind: "remove-damage",
          eventId: `remove-damage:${cardPlayed.cardId}:${targetId}`,
          sourceId: cardPlayed.cardId,
          controllerId: cardPlayed.playerId,
          targetId,
          amount: rawAmounts?.[targetId] ?? 0,
        },
        {
          selfReplacement: (effect as RemoveDamageEffect).selfReplacement,
          cardPlayed,
          resolutionInput,
        },
      );
      replacedAmounts[replacedEvent.targetId] = replacedEvent.amount;
    }
    resolveRemoveDamageEffect(ctx, cardPlayed, effect as RemoveDamageEffect, {
      amountByTarget: Object.keys(replacedAmounts).length > 0 ? replacedAmounts : undefined,
      eventSnapshot: resolutionInput.eventSnapshot,
      selectedAmount:
        typeof resolutionInput.amount === "number" && Number.isFinite(resolutionInput.amount)
          ? Math.max(0, resolutionInput.amount)
          : undefined,
      targets: resolved.resolvedTargets,
    });
    return RESOLVED_ACTION_EFFECT;
  },

  "modify-stat": (ctx, cardPlayed, effect, resolutionInput) => {
    if (!isModifyStatEffect(effect)) {
      handleUnsupportedActionEffect("modify-stat", "Malformed modify-stat effect payload");
      return RESOLVED_ACTION_EFFECT;
    }

    const resolved = resolveEffectExecutionContext(ctx, cardPlayed, effect, resolutionInput);
    const modifierByTarget = resolvePerTargetFieldAmounts(
      resolved.resolvedDynamic.modifier,
      resolved.resolvedTargets,
    );
    const valueByTarget = resolvePerTargetFieldAmounts(
      resolved.resolvedDynamic.value,
      resolved.resolvedTargets,
    );
    const combinedByTarget: Record<CardInstanceId, number> = {};
    for (const targetId of resolved.resolvedTargets) {
      const modifierValue = modifierByTarget?.[targetId];
      const valueValue = valueByTarget?.[targetId];
      const baseValue =
        typeof modifierValue === "number" && Number.isFinite(modifierValue)
          ? modifierValue
          : typeof valueValue === "number" && Number.isFinite(valueValue)
            ? valueValue
            : undefined;
      if (baseValue === undefined) {
        continue;
      }

      const replacedEvent = applyReplacementEffects(
        ctx,
        {
          kind: "modify-stat",
          eventId: `modify-stat:${cardPlayed.cardId}:${targetId}:${String((effect as ModifyStatEffect).stat ?? "unknown")}`,
          sourceId: cardPlayed.cardId,
          controllerId: cardPlayed.playerId,
          targetId,
          amount: baseValue,
          stat: (effect as ModifyStatEffect).stat ?? "strength",
        },
        {
          selfReplacement: (effect as ModifyStatEffect).selfReplacement,
          cardPlayed,
          resolutionInput,
          selfReplacementField: "modifier",
        },
      );
      if (typeof replacedEvent.amount === "number" && Number.isFinite(replacedEvent.amount)) {
        combinedByTarget[targetId] = replacedEvent.amount;
        continue;
      }
    }

    resolveModifyStatEffect(ctx, cardPlayed, effect as ModifyStatEffect, {
      modifierByTarget: Object.keys(combinedByTarget).length > 0 ? combinedByTarget : undefined,
      targets: resolved.resolvedTargets,
    });
    return RESOLVED_ACTION_EFFECT;
  },

  "deal-damage": (ctx, cardPlayed, effect, resolutionInput) => {
    if (!isDealDamageEffect(effect)) {
      handleUnsupportedActionEffect("deal-damage", "Malformed deal-damage effect payload");
      return RESOLVED_ACTION_EFFECT;
    }

    const resolved = resolveEffectExecutionContext(ctx, cardPlayed, effect, resolutionInput);
    const replacedAmounts: Record<CardInstanceId, number> = {};
    const replacedTargetOrder: CardInstanceId[] = [];
    const rawAmounts = resolvePerTargetFieldAmounts(
      resolved.resolvedDynamic.amount,
      resolved.resolvedTargets,
    );
    for (const targetId of resolved.resolvedTargets) {
      const replacedEvent = applyReplacementEffects(
        ctx,
        {
          kind: "deal-damage",
          eventId: `deal-damage:${cardPlayed.cardId}:${targetId}`,
          sourceId: cardPlayed.cardId,
          controllerId: cardPlayed.playerId,
          targetId,
          amount: rawAmounts?.[targetId] ?? 0,
        },
        {
          selfReplacement: (effect as DealDamageEffect).selfReplacement,
          cardPlayed,
          resolutionInput,
        },
      );
      const finalTargetId = replacedEvent.targetId;
      replacedAmounts[finalTargetId] = (replacedAmounts[finalTargetId] ?? 0) + replacedEvent.amount;
      if (!replacedTargetOrder.includes(finalTargetId)) {
        replacedTargetOrder.push(finalTargetId);
      }
    }
    resolveDealDamageEffect(ctx, cardPlayed, effect as DealDamageEffect, {
      eventSnapshot: resolutionInput.eventSnapshot,
      amountByTarget: replacedAmounts,
      targets: replacedTargetOrder,
    });
    return RESOLVED_ACTION_EFFECT;
  },

  banish: (ctx, cardPlayed, effect, resolutionInput) => {
    if (!isBanishEffect(effect)) {
      handleUnsupportedActionEffect("banish", "Malformed banish effect payload");
      return RESOLVED_ACTION_EFFECT;
    }

    const resolved = resolveEffectExecutionContext(ctx, cardPlayed, effect, resolutionInput);
    resolutionInput.eventSnapshot ??= {};
    resolveBanishEffect(ctx, cardPlayed, effect as BanishEffect, {
      eventSnapshot: resolutionInput.eventSnapshot,
      targets: resolved.resolvedTargets,
    });
    return RESOLVED_ACTION_EFFECT;
  },

  exert: (ctx, cardPlayed, effect, resolutionInput) => {
    if (!isExertEffect(effect)) {
      handleUnsupportedActionEffect("exert", "Malformed exert effect payload");
      return RESOLVED_ACTION_EFFECT;
    }

    resolveExertEffect(ctx, cardPlayed, effect as ExertEffect, resolutionInput);
    return RESOLVED_ACTION_EFFECT;
  },

  "return-from-discard": (ctx, cardPlayed, effect, resolutionInput) => {
    if (!isReturnFromDiscardEffect(effect)) {
      handleUnsupportedActionEffect(
        "return-from-discard",
        "Malformed return-from-discard effect payload",
      );
      return RESOLVED_ACTION_EFFECT;
    }

    resolveReturnFromDiscardEffect(
      ctx,
      cardPlayed,
      effect as ReturnFromDiscardEffect,
      resolutionInput,
    );
    return RESOLVED_ACTION_EFFECT;
  },

  ready: (ctx, cardPlayed, effect, resolutionInput) => {
    if (!isReadyEffect(effect)) {
      handleUnsupportedActionEffect("ready", "Malformed ready effect payload");
      return RESOLVED_ACTION_EFFECT;
    }

    resolveReadyEffect(ctx, cardPlayed, effect as ReadyEffect, resolutionInput);
    return RESOLVED_ACTION_EFFECT;
  },

  "return-to-hand": (ctx, cardPlayed, effect, resolutionInput) => {
    if (!isReturnToHandEffect(effect)) {
      handleUnsupportedActionEffect("return-to-hand", "Malformed return-to-hand effect payload");
      return RESOLVED_ACTION_EFFECT;
    }

    resolveReturnToHandEffect(ctx, cardPlayed, effect as ReturnToHandEffect, resolutionInput);
    return RESOLVED_ACTION_EFFECT;
  },

  "return-random-from-inkwell": (ctx, cardPlayed, effect, resolutionInput) => {
    if (!isReturnRandomFromInkwellEffect(effect)) {
      handleUnsupportedActionEffect(
        "return-random-from-inkwell",
        "Malformed return-random-from-inkwell effect payload",
      );
      return RESOLVED_ACTION_EFFECT;
    }

    const resolved = resolveEffectExecutionContext(ctx, cardPlayed, effect, resolutionInput);
    const typedEffect = effect as ReturnRandomFromInkwellEffect;
    // Resolve returnCount from either the dynamic `amount` field or the typed `count` field
    const dynamicAmount = resolveAggregateFieldAmount(resolved.resolvedDynamic.amount);
    const staticCount =
      dynamicAmount === undefined && typeof typedEffect.count === "number"
        ? typedEffect.count
        : undefined;
    resolveReturnRandomFromInkwellEffect(ctx, cardPlayed, typedEffect, resolutionInput, {
      returnCount: dynamicAmount ?? staticCount,
    });
    return RESOLVED_ACTION_EFFECT;
  },

  discard: (ctx, cardPlayed, effect, resolutionInput, options) => {
    if (!isDiscardEffect(effect)) {
      handleUnsupportedActionEffect("discard", "Malformed discard effect payload");
      return RESOLVED_ACTION_EFFECT;
    }

    const resolved = resolveEffectExecutionContext(ctx, cardPlayed, effect, resolutionInput);
    const selectedTargets = getCombinedSelectionTargets(resolutionInput).filter(
      (targetId): targetId is CardInstanceId => typeof targetId === "string",
    );
    const discardAmount =
      effect.chosen === true && effect.amount === "DISCARDED_COUNT"
        ? selectedTargets.length
        : resolved.resolvedDynamic.amount === undefined
          ? 1
          : resolveAggregateFieldAmount(resolved.resolvedDynamic.amount);
    const discardAll = effect.amount === "all";

    return resolveDiscardEffect(
      ctx,
      cardPlayed,
      effect as DiscardEffect,
      resolutionInput,
      {
        discardAmount,
        discardAll,
        selectedTargets,
      },
      options,
    );
  },

  "put-into-inkwell": (ctx, cardPlayed, effect, resolutionInput) => {
    if (!isPutIntoInkwellEffect(effect)) {
      handleUnsupportedActionEffect(
        "put-into-inkwell",
        "Malformed put-into-inkwell effect payload",
      );
      return RESOLVED_ACTION_EFFECT;
    }

    resolvePutIntoInkwellEffect(ctx, cardPlayed, effect as PutIntoInkwellEffect, resolutionInput);
    return RESOLVED_ACTION_EFFECT;
  },

  "put-under": (ctx, cardPlayed, effect, resolutionInput) => {
    if (!isPutUnderEffect(effect)) {
      handleUnsupportedActionEffect("put-under", "Malformed put-under effect payload");
      return RESOLVED_ACTION_EFFECT;
    }

    resolvePutUnderEffect(ctx, cardPlayed, effect as PutUnderEffect, resolutionInput);
    return RESOLVED_ACTION_EFFECT;
  },

  "enable-play-from-under": (ctx, cardPlayed, effect, resolutionInput) => {
    if (!isEnablePlayFromUnderEffect(effect)) {
      handleUnsupportedActionEffect(
        "enable-play-from-under",
        "Malformed enable-play-from-under effect payload",
      );
      return RESOLVED_ACTION_EFFECT;
    }

    resolveEnablePlayFromUnderEffect(
      ctx,
      cardPlayed,
      effect as EnablePlayFromUnderEffect,
      resolutionInput,
    );
    return RESOLVED_ACTION_EFFECT;
  },

  "pay-cost": (ctx, cardPlayed, effect, resolutionInput, options) => {
    if (
      !effect ||
      typeof effect !== "object" ||
      (effect as { type?: unknown }).type !== "pay-cost"
    ) {
      handleUnsupportedActionEffect("pay-cost", "Malformed pay-cost effect payload");
      return RESOLVED_ACTION_EFFECT;
    }

    return resolvePayCostEffect(ctx, cardPlayed, effect as PayCostEffect, resolutionInput, options);
  },

  "put-on-bottom": (ctx, cardPlayed, effect, resolutionInput) => {
    if (!isPutOnBottomEffect(effect)) {
      handleUnsupportedActionEffect("put-on-bottom", "Malformed put-on-bottom effect payload");
      return RESOLVED_ACTION_EFFECT;
    }

    resolvePutOnBottomEffect(ctx, cardPlayed, effect as PutOnBottomEffect, resolutionInput);
    return RESOLVED_ACTION_EFFECT;
  },

  "put-on-top": (ctx, cardPlayed, effect, resolutionInput) => {
    if (!isPutOnTopEffect(effect)) {
      handleUnsupportedActionEffect("put-on-top", "Malformed put-on-top effect payload");
      return RESOLVED_ACTION_EFFECT;
    }

    resolvePutOnTopEffect(ctx, cardPlayed, effect as PutOnTopEffect, resolutionInput);
    return RESOLVED_ACTION_EFFECT;
  },

  "select-target": (ctx, cardPlayed, effect, resolutionInput) => {
    if (!isSelectTargetEffect(effect)) {
      handleUnsupportedActionEffect("select-target", "Malformed select-target effect payload");
      return RESOLVED_ACTION_EFFECT;
    }

    resolveSelectTargetEffect(ctx, cardPlayed, effect as SelectTargetEffect, resolutionInput);
    return RESOLVED_ACTION_EFFECT;
  },

  "additional-inkwell": (ctx, cardPlayed, effect) => {
    if (!isAdditionalInkwellEffect(effect)) {
      handleUnsupportedActionEffect(
        "additional-inkwell",
        "Malformed additional-inkwell effect payload",
      );
      return RESOLVED_ACTION_EFFECT;
    }

    resolveAdditionalInkwellEffect(ctx, cardPlayed, effect as AdditionalInkwellEffect);
    return RESOLVED_ACTION_EFFECT;
  },

  "shuffle-into-deck": (ctx, cardPlayed, effect, resolutionInput) => {
    if (!isShuffleIntoDeckEffect(effect)) {
      handleUnsupportedActionEffect(
        "shuffle-into-deck",
        "Malformed shuffle-into-deck effect payload",
      );
      return RESOLVED_ACTION_EFFECT;
    }

    resolveShuffleIntoDeckEffect(ctx, cardPlayed, effect as ShuffleIntoDeckEffect, resolutionInput);
    return RESOLVED_ACTION_EFFECT;
  },

  reveal: (_ctx, _cardPlayed, _effect, resolutionInput) => {
    // Reveal the currently selected card(s) to all players.
    // Used when a card ability requires revealing a card from hand (e.g. "reveal a song card").
    const targets = getCurrentSelectionTargets(resolutionInput) as CardInstanceId[];
    if (targets.length > 0) {
      _ctx.framework.zones.reveal(targets, "all");
      if (!resolutionInput.eventSnapshot) {
        resolutionInput.eventSnapshot = {};
      }
      resolutionInput.eventSnapshot.revealedCardIds = targets;
    }
    return RESOLVED_ACTION_EFFECT;
  },

  "reveal-top-card": (ctx, cardPlayed, effect, resolutionInput) => {
    if (!isRevealTopCardEffect(effect)) {
      handleUnsupportedActionEffect("reveal-top-card", "Malformed reveal-top-card effect payload");
      return RESOLVED_ACTION_EFFECT;
    }

    resolveRevealTopCardEffect(ctx, cardPlayed, effect as RevealTopCardEffect, resolutionInput);
    return RESOLVED_ACTION_EFFECT;
  },

  "reveal-until-match": (ctx, cardPlayed, effect, resolutionInput) => {
    if (!isRevealUntilMatchEffect(effect)) {
      handleUnsupportedActionEffect(
        "reveal-until-match",
        "Malformed reveal-until-match effect payload",
      );
      return RESOLVED_ACTION_EFFECT;
    }

    resolveRevealUntilMatchEffect(
      ctx,
      cardPlayed,
      effect as RevealUntilMatchEffect,
      resolutionInput,
    );
    return RESOLVED_ACTION_EFFECT;
  },

  "name-a-card": (ctx, cardPlayed, effect, resolutionInput, options) => {
    if (!isNameACardEffect(effect)) {
      handleUnsupportedActionEffect("name-a-card", "Malformed name-a-card effect payload");
      return RESOLVED_ACTION_EFFECT;
    }

    const suspended = maybeSuspendForNamedCardSelection(
      ctx,
      cardPlayed,
      effect,
      resolutionInput,
      options,
    );
    if (suspended) {
      return suspended;
    }

    const namedCardName = resolutionInput.namedCard?.trim();
    if (!namedCardName) {
      return RESOLVED_ACTION_EFFECT;
    }

    resolutionInput.eventSnapshot ??= {};
    resolutionInput.eventSnapshot.namedCardName = namedCardName;
    resolutionInput.eventSnapshot.lastEffectPerformed = true;
    return RESOLVED_ACTION_EFFECT;
  },

  "reveal-hand": (ctx, cardPlayed, effect, resolutionInput) => {
    if (!isRevealHandEffect(effect)) {
      handleUnsupportedActionEffect("reveal-hand", "Malformed reveal-hand effect payload");
      return RESOLVED_ACTION_EFFECT;
    }

    resolveRevealHandEffect(ctx, cardPlayed, effect as RevealHandEffect, resolutionInput);
    return RESOLVED_ACTION_EFFECT;
  },

  "search-deck": (ctx, cardPlayed, effect, resolutionInput) => {
    if (!isSearchDeckEffect(effect)) {
      handleUnsupportedActionEffect("search-deck", "Malformed search-deck effect payload");
      return RESOLVED_ACTION_EFFECT;
    }

    resolveSearchDeckEffect(ctx, cardPlayed, effect as SearchDeckEffect, resolutionInput);
    return RESOLVED_ACTION_EFFECT;
  },

  "put-damage": (ctx, cardPlayed, effect, resolutionInput) => {
    if (!isPutDamageEffect(effect)) {
      handleUnsupportedActionEffect("put-damage", "Malformed put-damage effect payload");
      return RESOLVED_ACTION_EFFECT;
    }

    const resolved = resolveEffectExecutionContext(ctx, cardPlayed, effect, resolutionInput);
    resolvePutDamageEffect(ctx, cardPlayed, effect as PutDamageEffect, {
      amountByTarget: resolvePerTargetFieldAmounts(
        resolved.resolvedDynamic.amount,
        resolved.resolvedTargets,
      ),
      targets: resolved.resolvedTargets,
    });
    return RESOLVED_ACTION_EFFECT;
  },

  "put-in-hand": (ctx, cardPlayed, effect, resolutionInput) => {
    if (!isPutInHandEffect(effect)) {
      handleUnsupportedActionEffect("put-in-hand", "Malformed put-in-hand effect payload");
      return RESOLVED_ACTION_EFFECT;
    }

    resolvePutInHandEffect(ctx, cardPlayed, effect as PutInHandEffectLike, resolutionInput);
    return RESOLVED_ACTION_EFFECT;
  },

  "play-card": (ctx, cardPlayed, effect, resolutionInput, options) => {
    if (!isPlayCardEffect(effect)) {
      handleUnsupportedActionEffect("play-card", "Malformed play-card effect payload");
      return RESOLVED_ACTION_EFFECT;
    }

    resolvePlayCardEffect(ctx, cardPlayed, effect as PlayCardEffect, resolutionInput, options);
    return RESOLVED_ACTION_EFFECT;
  },

  "gain-keyword": (ctx, cardPlayed, effect, resolutionInput) => {
    if (!isGainKeywordEffect(effect)) {
      handleUnsupportedActionEffect("gain-keyword", "Malformed gain-keyword effect payload");
      return RESOLVED_ACTION_EFFECT;
    }

    resolveGainKeywordEffect(ctx, cardPlayed, effect as GainKeywordEffect, resolutionInput);
    return RESOLVED_ACTION_EFFECT;
  },

  "property-modification": (ctx, cardPlayed, effect, resolutionInput) => {
    if (!isPropertyModificationEffect(effect)) {
      handleUnsupportedActionEffect(
        "property-modification",
        "Malformed property-modification effect payload",
      );
      return RESOLVED_ACTION_EFFECT;
    }

    resolvePropertyModificationEffect(
      ctx,
      cardPlayed,
      effect as PropertyModificationEffect,
      resolutionInput,
    );
    return RESOLVED_ACTION_EFFECT;
  },

  "gain-keywords": (ctx, cardPlayed, effect, resolutionInput) => {
    const gainKeywordsEffect = effect as GainKeywordsEffect;
    if (
      !gainKeywordsEffect ||
      typeof gainKeywordsEffect !== "object" ||
      !Array.isArray(gainKeywordsEffect.keywords)
    ) {
      handleUnsupportedActionEffect("gain-keywords", "Malformed gain-keywords effect payload");
      return RESOLVED_ACTION_EFFECT;
    }

    for (const kw of gainKeywordsEffect.keywords) {
      if (
        !kw ||
        typeof kw !== "object" ||
        !("keyword" in kw) ||
        !("value" in kw) ||
        typeof kw.keyword !== "string" ||
        typeof kw.value !== "number"
      ) {
        handleUnsupportedActionEffect(
          "gain-keywords",
          "Malformed keyword object in gain-keywords effect",
        );
        continue;
      }
      const singleEffect: GainKeywordEffect = {
        type: "gain-keyword",
        keyword: kw.keyword,
        value: kw.value,
        target: gainKeywordsEffect.target,
        duration: gainKeywordsEffect.duration,
      };
      resolveGainKeywordEffect(ctx, cardPlayed, singleEffect, resolutionInput);
    }
    return RESOLVED_ACTION_EFFECT;
  },

  restriction: (ctx, cardPlayed, effect, resolutionInput) => {
    if (!isRestrictionEffect(effect)) {
      handleUnsupportedActionEffect("restriction", "Malformed restriction effect payload");
      return RESOLVED_ACTION_EFFECT;
    }

    resolveRestrictionEffect(ctx, cardPlayed, effect as RestrictionEffect, resolutionInput);
    return RESOLVED_ACTION_EFFECT;
  },

  "grant-ability": (ctx, cardPlayed, effect, resolutionInput) => {
    if (!isGrantAbilityEffect(effect)) {
      handleUnsupportedActionEffect("grant-ability", "Malformed grant-ability effect payload");
      return RESOLVED_ACTION_EFFECT;
    }

    resolveGrantAbilityEffect(ctx, cardPlayed, effect as GrantAbilityEffect, resolutionInput);
    return RESOLVED_ACTION_EFFECT;
  },

  "cost-reduction": (ctx, cardPlayed, effect, resolutionInput) => {
    if (!isCostReductionEffect(effect)) {
      handleUnsupportedActionEffect("cost-reduction", "Malformed cost-reduction effect payload");
      return RESOLVED_ACTION_EFFECT;
    }

    const resolved = resolveEffectExecutionContext(ctx, cardPlayed, effect, resolutionInput);
    resolveCostReductionEffect(ctx, cardPlayed, effect as CostReductionEffect, resolutionInput, {
      reductionAmount: resolveAggregateFieldAmount(resolved.resolvedDynamic.amount),
    });
    return RESOLVED_ACTION_EFFECT;
  },

  "move-to-location": (ctx, cardPlayed, effect, resolutionInput) => {
    if (!isMoveToLocationEffect(effect)) {
      handleUnsupportedActionEffect(
        "move-to-location",
        "Malformed move-to-location effect payload",
      );
      return RESOLVED_ACTION_EFFECT;
    }

    resolveMoveToLocationEffect(ctx, cardPlayed, effect as MoveToLocationEffect, resolutionInput);
    return RESOLVED_ACTION_EFFECT;
  },

  "move-damage": (ctx, cardPlayed, effect, resolutionInput) => {
    if (!isMoveDamageEffect(effect)) {
      handleUnsupportedActionEffect("move-damage", "Malformed move-damage effect payload");
      return RESOLVED_ACTION_EFFECT;
    }

    resolveMoveDamageEffect(ctx, cardPlayed, effect as MoveDamageEffect, resolutionInput);
    return RESOLVED_ACTION_EFFECT;
  },

  count: (ctx, cardPlayed, effect, resolutionInput) => {
    if (!isCountEffect(effect)) {
      handleUnsupportedActionEffect("count", "Malformed count effect payload");
      return RESOLVED_ACTION_EFFECT;
    }

    resolveCountEffect(ctx, cardPlayed, effect as CountEffect, resolutionInput);
    return RESOLVED_ACTION_EFFECT;
  },

  "move-cards-from-under": (ctx, cardPlayed, effect, resolutionInput) => {
    if (!isMoveCardsFromUnderEffect(effect)) {
      handleUnsupportedActionEffect(
        "move-cards-from-under",
        "Malformed move-cards-from-under effect payload",
      );
      return RESOLVED_ACTION_EFFECT;
    }

    resolveMoveCardsFromUnderEffect(ctx, cardPlayed, effect, resolutionInput);
    return RESOLVED_ACTION_EFFECT;
  },

  "create-triggered-ability": (ctx, cardPlayed, effect, resolutionInput) => {
    if (!isCreateTriggeredAbilityEffect(effect)) {
      handleUnsupportedActionEffect(
        "create-triggered-ability",
        "Malformed create-triggered-ability effect payload",
      );
      return RESOLVED_ACTION_EFFECT;
    }

    resolveCreateTriggeredAbilityEffect(ctx, cardPlayed, effect, resolutionInput);
    return RESOLVED_ACTION_EFFECT;
  },

  "create-replacement-effect": (ctx, cardPlayed, effect, resolutionInput) => {
    if (!isCreateReplacementEffect(effect)) {
      handleUnsupportedActionEffect(
        "create-replacement-effect",
        "Malformed create-replacement-effect effect payload",
      );
      return RESOLVED_ACTION_EFFECT;
    }

    resolveCreateReplacementEffect(
      ctx,
      cardPlayed,
      effect as CreateReplacementEffect,
      resolutionInput,
    );
    return RESOLVED_ACTION_EFFECT;
  },

  support: (ctx, cardPlayed, effect, resolutionInput) => {
    if (!isSupportEffect(effect)) {
      handleUnsupportedActionEffect("support", "Malformed support effect payload");
      return RESOLVED_ACTION_EFFECT;
    }

    resolveSupportEffect(ctx, cardPlayed, effect as SupportEffect, resolutionInput);
    return RESOLVED_ACTION_EFFECT;
  },

  "reveal-and-route": (ctx, cardPlayed, effect, resolutionInput, options) => {
    if (!isRevealAndRouteEffect(effect)) {
      handleUnsupportedActionEffect(
        "reveal-and-route",
        "Malformed reveal-and-route effect payload",
      );
      return RESOLVED_ACTION_EFFECT;
    }

    return resolveRevealAndRouteEffect(
      ctx,
      cardPlayed,
      effect as RevealAndRouteEffect,
      resolutionInput,
      resolveActionEffect,
      options,
    );
  },
};

function isSequenceLikeEffect(effect: unknown): effect is SequenceLikeEffect {
  return isTypedEffect(effect, "sequence");
}

function isOptionalLikeEffect(effect: unknown): effect is OptionalLikeEffect {
  return isTypedEffect(effect, "optional");
}

function isChoiceLikeEffect(effect: unknown): effect is ChoiceLikeEffect {
  return isTypedEffect(effect, "choice");
}

function isOrLikeEffect(effect: unknown): effect is OrLikeEffect {
  return isTypedEffect(effect, "or");
}

function isForEachLikeEffect(effect: unknown): effect is ForEachLikeEffect {
  return isTypedEffect(effect, "for-each");
}

function isTypedEffect<TType extends string>(
  effect: unknown,
  type: TType,
): effect is { type: TType } {
  return (
    typeof effect === "object" &&
    effect !== null &&
    "type" in effect &&
    (effect as { type?: unknown }).type === type
  );
}

function getEffectType(effect: unknown): string | undefined {
  if (!effect || typeof effect !== "object") {
    return undefined;
  }

  const effectRecord = effect as EffectWithType;
  return typeof effectRecord.type === "string" ? effectRecord.type : undefined;
}

function preservesPriorEffectOutcome(effectType: string): boolean {
  return (
    effectType === "choice" ||
    effectType === "conditional" ||
    effectType === "for-each" ||
    effectType === "or" ||
    effectType === "optional" ||
    effectType === "sequence"
  );
}

function countDescriptorMinimum(count: unknown, selector: unknown): number {
  return resolveTargetBounds(count, selector === "all" ? "all" : "chosen").min;
}

function isEffectCurrentlyLegal(
  ctx: PlayCardExecutionContext,
  cardPlayed: CardPlayedPayload,
  effect: unknown,
  resolutionInput: ActionResolutionInput,
): boolean {
  if (!effect || typeof effect !== "object") {
    return false;
  }

  if (isSequenceLikeEffect(effect)) {
    const nestedEffects = effect.steps ?? effect.effects ?? [];
    const firstNestedEffect = nestedEffects[0];
    return firstNestedEffect
      ? isEffectCurrentlyLegal(ctx, cardPlayed, firstNestedEffect, resolutionInput)
      : false;
  }

  if (isConditionalEffect(effect)) {
    const conditionMet = evaluateActionCondition(
      effect.condition,
      ctx,
      cardPlayed,
      resolutionInput,
    );
    const nextEffect = conditionMet
      ? (effect.then ?? effect.effect ?? effect.ifTrue)
      : (effect.else ?? effect.ifFalse);
    return nextEffect
      ? isEffectCurrentlyLegal(ctx, cardPlayed, nextEffect, resolutionInput)
      : false;
  }

  if (isDiscardEffect(effect)) {
    const targetPlayerIds = resolveTargetPlayerIds(
      ctx,
      cardPlayed,
      effect.target,
      resolutionInput.targets,
    );
    if (targetPlayerIds.length === 0) {
      return false;
    }

    const sourceZone = effect.from ?? "hand";
    const rawFilter = effect.filter;
    const filter =
      rawFilter &&
      !Array.isArray(rawFilter) &&
      !("type" in rawFilter && typeof rawFilter.type === "string")
        ? (rawFilter as CardSelectionFilter)
        : undefined;
    const rawAmount =
      typeof effect.amount === "number" && Number.isFinite(effect.amount)
        ? Math.max(0, Math.floor(effect.amount))
        : 1;
    const requiredAmount = rawAmount;
    if (requiredAmount <= 0) {
      return false;
    }

    return targetPlayerIds.every((targetPlayerId) => {
      const candidates = (
        ctx.framework.zones.getCards({
          zone: sourceZone,
          playerId: targetPlayerId,
        }) as CardInstanceId[]
      ).filter((cardId) => {
        const definition = ctx.cards.getDefinition(cardId) as CardDefinitionLike | undefined;
        if (!definition) {
          return false;
        }

        if (
          filter &&
          typeof filter.cardType === "string" &&
          isCardType(filter.cardType) &&
          definition.cardType !== filter.cardType
        ) {
          return false;
        }
        if (
          filter &&
          typeof filter.notCardType === "string" &&
          isCardType(filter.notCardType) &&
          definition.cardType === filter.notCardType
        ) {
          return false;
        }
        if (
          filter &&
          typeof filter.maxCost === "number" &&
          typeof definition.cost === "number" &&
          definition.cost > filter.maxCost
        ) {
          return false;
        }
        if (
          filter &&
          typeof filter.classification === "string" &&
          isClassification(filter.classification) &&
          !(definition.classifications ?? []).includes(filter.classification)
        ) {
          return false;
        }
        return true;
      });

      return candidates.length >= requiredAmount;
    });
  }

  if (isReturnToHandEffect(effect)) {
    const descriptor = normalizeTargetDescriptor(effect.target);
    if (!descriptor) {
      return false;
    }

    const selectedTargets = normalizeSelectedTargets(resolutionInput.targets);
    const candidates = resolveCandidateTargets(ctx, cardPlayed, descriptor, {
      selectedTargets,
      sourceCardId: cardPlayed.cardId,
    });
    return candidates.length >= countDescriptorMinimum(descriptor.count, descriptor.selector);
  }

  if (isBanishEffect(effect)) {
    const targets =
      resolveEffectTargets(
        ctx,
        cardPlayed,
        effect.target,
        resolutionInput.targets,
        resolutionInput.eventSnapshot,
      ) ?? [];
    return targets.length > 0;
  }

  return true;
}

export function getLegalOrOptionIndices(
  ctx: PlayCardExecutionContext,
  cardPlayed: CardPlayedPayload,
  effect: OrLikeEffect,
  resolutionInput: ActionResolutionInput,
): number[] {
  const options = effect.options ?? effect.choices ?? [];
  return options.flatMap((option, index) =>
    isEffectCurrentlyLegal(ctx, cardPlayed, option, resolutionInput) ? [index] : [],
  );
}

export function resolveActionEffect(
  ctx: PlayCardExecutionContext,
  cardPlayed: CardPlayedPayload,
  effect: unknown,
  resolutionInput: ActionResolutionInput,
  options?: ActionEffectResolutionOptions,
): ActionResolutionResult {
  resolutionInput.eventSnapshot ??= {};
  const effectiveResolutionInput = resolutionInput;
  const effectType = getEffectType(effect);
  if (!effectType) {
    return RESOLVED_ACTION_EFFECT;
  }

  const resolver = actionEffectResolvers[effectType as SupportedActionEffectType];
  if (!resolver) {
    handleUnsupportedActionEffect(
      effectType,
      `No action-effect resolver is registered for effect type "${effectType}"`,
    );
    return RESOLVED_ACTION_EFFECT;
  }

  if (!preservesPriorEffectOutcome(effectType)) {
    resetLastEffectPerformed(effectiveResolutionInput.eventSnapshot);
  }

  const pendingTargetSelection = maybeSuspendForChosenTargets(
    ctx,
    cardPlayed,
    effect,
    effectiveResolutionInput,
    options,
  );
  if (pendingTargetSelection) {
    return pendingTargetSelection;
  }

  const pendingTargetOrdering = maybeSuspendForTargetOrdering(
    ctx,
    cardPlayed,
    effect,
    effectiveResolutionInput,
    options,
  );
  if (pendingTargetOrdering) {
    return pendingTargetOrdering;
  }

  recordVanishChosenTargets({
    ctx,
    effect,
    resolutionInput: effectiveResolutionInput,
    chooserId: getCurrentActionActorId(ctx, cardPlayed),
  });

  return resolver(ctx, cardPlayed, effect, effectiveResolutionInput, options);
}
