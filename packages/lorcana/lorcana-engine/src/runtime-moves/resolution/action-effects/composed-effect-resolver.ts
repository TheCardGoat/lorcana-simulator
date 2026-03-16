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
  GainKeywordEffect,
  GainLoreEffect,
  GrantAbilityEffect,
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
  PutOnBottomEffect,
  ReadyEffect,
  RevealHandEffect,
  RemoveDamageEffect,
  RestrictionEffect,
  ReturnRandomFromInkwellEffect,
  ReturnFromDiscardEffect,
  ReturnToHandEffect,
  RevealTopCardEffect,
  ScryEffect,
  SearchDeckEffect,
  SequenceEffect,
  ShuffleIntoDeckEffect,
  SupportEffect,
} from "@tcg/lorcana-types";
import { isCardType, isClassification } from "@tcg/lorcana-types";
import type { MillEffect } from "@tcg/lorcana-types/abilities";
import { createLorcanaLogMessage, type CardPlayedPayload } from "../../../types/index";
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
import { isLoseLoreEffect, resolveLoseLoreEffect } from "./lose-lore-effect";
import { isMillEffect, resolveMillEffect } from "./mill-effect";
import { isModifyStatEffect, resolveModifyStatEffect } from "./modify-stat-effect";
import {
  isMoveCardsFromUnderEffect,
  resolveMoveCardsFromUnderEffect,
} from "./move-cards-from-under-effect";
import { isMoveDamageEffect, resolveMoveDamageEffect } from "./move-damage-effect";
import { isMoveToLocationEffect, resolveMoveToLocationEffect } from "./move-to-location-effect";
import { isPlayCardEffect, resolvePlayCardEffect } from "./play-card-effect";
import { isPutDamageEffect, resolvePutDamageEffect } from "./put-damage-effect";
import {
  isPutInHandEffect,
  type PutInHandEffectLike,
  resolvePutInHandEffect,
} from "./put-in-hand-effect";
import { isPutIntoInkwellEffect, resolvePutIntoInkwellEffect } from "./put-into-inkwell-effect";
import { isPutOnTopEffect, resolvePutOnTopEffect } from "./put-on-top-effect";
import { isPutUnderEffect, resolvePutUnderEffect } from "./put-under-effect";
import { isPutOnBottomEffect, resolvePutOnBottomEffect } from "./put-on-bottom-effect";
import { isReadyEffect, resolveReadyEffect } from "./ready-effect";
import { payBasicCost, validateBasicCost } from "../../rules/play-card-rules";
import { isRevealHandEffect, resolveRevealHandEffect } from "./reveal-hand-effect";
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
import {
  getScryLookedAtCards,
  isScryEffect,
  resolveScryDeckPlayerId,
  resolveScryEffect,
} from "./scry-effect";
import { isSearchDeckEffect, resolveSearchDeckEffect } from "./search-deck-effect";
import { isShuffleIntoDeckEffect, resolveShuffleIntoDeckEffect } from "./shuffle-into-deck-effect";
import { isSupportEffect, resolveSupportEffect } from "./support-effect";
import { markLastEffectPerformed, resetLastEffectPerformed } from "./event-snapshot-utils";
import { handleUnsupportedActionEffect } from "./unsupported-action-effect";
import { createPendingActionEffect, enqueuePendingActionEffect } from "./pending-action-effects";
import { recordVanishChosenTargets } from "./vanish";
import { resolveTargetPlayerIds } from "./player-target-resolver";
import { applyReplacementEffects } from "../../effects/replacement-effects";
import {
  normalizeSelectedTargets,
  normalizeTargetDescriptor,
  resolveCandidateTargets,
  resolveEffectTargets,
  resolveSelectedPlayerIds,
  resolveTargetBounds,
} from "../../../targeting/runtime";

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
  return remainingEffects.length > 0 ? { remainingEffects } : undefined;
}

function getCurrentActionActorId(
  ctx: PlayCardExecutionContext,
  cardPlayed: CardPlayedPayload,
): PlayerId {
  const actorId =
    ctx.playerId ?? ctx.framework.state.currentPlayer ?? ctx.framework.state.ctx.priority.holder;
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
    if (effect.chooser === "CHOSEN_PLAYER") {
      return (
        resolveSelectedPlayerIdsFromTargets(
          ctx.framework.state.playerIds,
          resolutionInput.targets,
        )?.[0] ?? cardPlayed.playerId
      );
    }

    return (
      resolveTargetPlayerIds(ctx, cardPlayed, effect.chooser as never)[0] ?? cardPlayed.playerId
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
      .map(
        (target) =>
          ctx.framework.state.ctx.zones.private.cardIndex[target as unknown as CardInstanceId]
            ?.ownerID,
      )
      .find(Boolean);
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

  if (effect.chooser === "CHOSEN_PLAYER") {
    return (
      resolveSelectedPlayerIdsFromTargets(
        ctx.framework.state.playerIds,
        resolutionInput.targets,
      )?.[0] ?? cardPlayed.playerId
    );
  }

  return resolveTargetPlayerIds(ctx, cardPlayed, effect.chooser as never)[0] ?? cardPlayed.playerId;
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

  const effectRecord = effect as Record<string, unknown>;
  const descriptorSource =
    effectRecord.type === "put-on-top" && effectRecord.source !== undefined
      ? effectRecord.source
      : effectRecord.target;
  if (descriptorSource === undefined) {
    return undefined;
  }

  const descriptor = normalizeTargetDescriptor(descriptorSource);
  if (!descriptor || descriptor.selector !== "chosen") {
    return undefined;
  }

  const selectedTargets = normalizeSelectedTargets(resolutionInput.targets);
  const candidates = resolveCandidateTargets(ctx, cardPlayed, descriptor, {
    selectedTargets,
    sourceCardId: cardPlayed.cardId,
  });
  if (candidates.length === 0) {
    return undefined;
  }

  const selectedCandidateCount =
    selectedTargets?.filter((target) => candidates.includes(target)).length ?? 0;
  const { min } = resolveTargetBounds(descriptor.count, descriptor.selector);
  if (selectedCandidateCount >= min) {
    return undefined;
  }

  const chosenBy =
    effect && typeof effect === "object" ? (effect as { chosenBy?: unknown }).chosenBy : undefined;
  const chooserId =
    chosenBy === "you"
      ? cardPlayed.playerId
      : chosenBy === "opponent"
        ? ((ctx.framework.state.playerIds.find((playerId) => playerId !== cardPlayed.playerId) ??
            cardPlayed.playerId) as PlayerId)
        : getCurrentActionActorId(ctx, cardPlayed);

  const pendingEffect = createPendingActionEffect(ctx, {
    kind: "target-selection",
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
    const ownerId = ctx.framework.state.ctx.zones.private.cardIndex[targetId]?.ownerID as
      | PlayerId
      | undefined;
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
          .map(
            (targetId) =>
              ctx.framework.state.ctx.zones.private.cardIndex[targetId]?.ownerID as
                | PlayerId
                | undefined,
          )
          .find(Boolean) ?? cardPlayed.playerId) as PlayerId)
      : cardPlayed.playerId;

  const pendingEffect = createPendingActionEffect(ctx, {
    kind: "target-selection",
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

export const ACTION_EFFECT_RESOLVER_TYPES = [
  "gain-keyword",
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
  "pay-cost",
  "put-on-bottom",
  "put-on-top",
  "ready",
  "scry",
  "for-each",
  "return-from-discard",
  "return-random-from-inkwell",
  "exert",
  "choice",
  "or",
  "lose-lore",
  "shuffle-into-deck",
  "reveal-top-card",
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
  const selectedTargets = normalizeSelectedTargets(resolutionInput.targets) ?? [];
  const resolvedTargets = hasExplicitTarget
    ? (resolveEffectTargets(
        ctx,
        cardPlayed,
        effectTarget,
        resolutionInput.targets,
        resolutionInput.eventSnapshot,
      ) ?? [])
    : selectedTargets;
  const dynamicTargets = selectedTargets.length > 0 ? selectedTargets : resolvedTargets;
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
    for (const [index, nestedEffect] of nestedEffects.entries()) {
      const result = resolveActionEffect(ctx, cardPlayed, nestedEffect, resolutionInput, {
        continuation: mergeContinuationEffects(
          nestedEffects.slice(index + 1),
          options?.continuation,
        ),
      });
      if (result.status === "suspended") {
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
      return resolveActionEffect(ctx, cardPlayed, effect.effect, resolutionInput, options);
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
    return resolveActionEffect(
      ctx,
      cardPlayed,
      choiceOptions[choiceIndex],
      resolutionInput,
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

    const legalOptionIndices = getLegalOrOptionIndices(ctx, cardPlayed, effect, resolutionInput);
    if (legalOptionIndices.length === 0) {
      markLastEffectPerformed(resolutionInput.eventSnapshot, false);
      return RESOLVED_ACTION_EFFECT;
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

    return resolveActionEffect(ctx, cardPlayed, orOptions[choiceIndex], resolutionInput, options);
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
    resolveDrawEffect(ctx, cardPlayed, effect as DrawEffect, {
      drawAmount,
      selectedPlayerIds: resolveSelectedPlayerIdsFromTargets(
        ctx.framework.state.playerIds,
        resolutionInput.targets,
      ),
      selectedTargets: normalizeSelectedTargets(resolutionInput.targets),
    });
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
      selectedPlayerIds: resolveSelectedPlayerIdsFromTargets(
        ctx.framework.state.playerIds,
        resolutionInput.targets,
      ),
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
    const selectedPlayerIds = resolveSelectedPlayerIdsFromTargets(
      ctx.framework.state.playerIds,
      resolutionInput.targets,
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
      selectedTargets: normalizeSelectedTargets(resolutionInput.targets),
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
      selectedPlayerIds: resolveSelectedPlayerIdsFromTargets(
        ctx.framework.state.playerIds,
        resolutionInput.targets,
      ),
    });
    return RESOLVED_ACTION_EFFECT;
  },

  scry: (ctx, cardPlayed, effect, resolutionInput) => {
    if (!isScryEffect(effect)) {
      handleUnsupportedActionEffect("scry", "Malformed scry effect payload");
      return RESOLVED_ACTION_EFFECT;
    }

    const resolved = resolveEffectExecutionContext(ctx, cardPlayed, effect, resolutionInput);
    const scryAmount = resolveAggregateFieldAmount(resolved.resolvedDynamic.amount);
    const selectedPlayerIds = resolveSelectedPlayerIdsFromTargets(
      ctx.framework.state.playerIds,
      resolutionInput.targets,
    );
    const hasExplicitDestinations =
      Array.isArray(resolutionInput.destinations) && resolutionInput.destinations.length > 0;

    if (
      !hasExplicitDestinations &&
      Array.isArray(effect.destinations) &&
      effect.destinations.length > 0
    ) {
      const deckPlayerId = resolveScryDeckPlayerId(cardPlayed, selectedPlayerIds);
      const lookedAtCards = getScryLookedAtCards(ctx, deckPlayerId, scryAmount);

      if (lookedAtCards.length > 0) {
        const chooserId = getCurrentActionActorId(ctx, cardPlayed);
        const revealWindowIds = [ctx.framework.zones.reveal(lookedAtCards, [chooserId])];
        ctx.framework.logPublicWithOverrides({
          category: "action",
          defaultMessage: createLorcanaLogMessage("lorcana.scry.count", {
            playerId: chooserId,
            count: lookedAtCards.length,
          }),
          overrides: {
            [chooserId]: createLorcanaLogMessage("lorcana.scry.detail", {
              playerId: chooserId,
              count: lookedAtCards.length,
              lookedAt: lookedAtCards,
            }),
          },
        });
        const pendingEffect = createPendingActionEffect(ctx, {
          kind: "scry-selection",
          sourceCardId: cardPlayed.cardId,
          controllerId: cardPlayed.playerId,
          chooserId,
          cardPlayed,
          effect,
          resolutionInput: {
            ...resolutionInput,
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
    resolveReturnRandomFromInkwellEffect(
      ctx,
      cardPlayed,
      effect as ReturnRandomFromInkwellEffect,
      resolutionInput,
      {
        returnCount: resolveAggregateFieldAmount(resolved.resolvedDynamic.amount),
      },
    );
    return RESOLVED_ACTION_EFFECT;
  },

  discard: (ctx, cardPlayed, effect, resolutionInput, options) => {
    if (!isDiscardEffect(effect)) {
      handleUnsupportedActionEffect("discard", "Malformed discard effect payload");
      return RESOLVED_ACTION_EFFECT;
    }

    const resolved = resolveEffectExecutionContext(ctx, cardPlayed, effect, resolutionInput);
    const selectedTargets = Array.isArray(resolutionInput.targets)
      ? resolutionInput.targets.filter(
          (targetId): targetId is CardInstanceId => typeof targetId === "string",
        )
      : typeof resolutionInput.targets === "string"
        ? [resolutionInput.targets as CardInstanceId]
        : [];
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

  "reveal-top-card": (ctx, cardPlayed, effect, resolutionInput) => {
    if (!isRevealTopCardEffect(effect)) {
      handleUnsupportedActionEffect("reveal-top-card", "Malformed reveal-top-card effect payload");
      return RESOLVED_ACTION_EFFECT;
    }

    resolveRevealTopCardEffect(ctx, cardPlayed, effect as RevealTopCardEffect, resolutionInput);
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
