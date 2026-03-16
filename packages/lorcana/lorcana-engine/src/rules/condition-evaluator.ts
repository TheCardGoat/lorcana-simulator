import type { CardInstanceId, DeepReadonly, PlayerId } from "#core";
import type {
  Condition,
  ConditionComparison,
  ConditionComparisonOperator,
  LorcanaCardDefinition,
  TargetAggregateComparisonCondition,
  TargetQueryCondition,
  TurnMetricCondition,
  PlayContextCondition,
  ResourceCountCondition,
  HasItemCountCondition,
  HasLocationCountCondition,
} from "@tcg/lorcana-types";
import type { LorcanaG, CardPlayedPayload, LorcanaMatchState } from "../types";
import type { ActionResolutionInput } from "../runtime-moves/resolution/action-effects/types";
import { getEffectiveLore, getEffectiveStrength, type DerivedStateContext } from "./derived-state";
import { normalizeSelectedTargets, resolveTargetQuery } from "../targeting/runtime";
import { didLastEffectPerform } from "../runtime-moves/resolution/action-effects/event-snapshot-utils";

export interface ConditionEvaluationContext {
  framework: {
    state: {
      ctx: DeepReadonly<LorcanaMatchState["ctx"]>;
      playerIds: readonly PlayerId[];
      currentPlayer?: PlayerId;
    };
    zones: {
      getCards: (query: { zone: string; playerId: PlayerId }) => readonly CardInstanceId[];
    };
  };
  cards: {
    getDefinition: (cardId: CardInstanceId) => LorcanaCardDefinition | undefined;
    require: (cardId: CardInstanceId) => { meta?: Record<string, unknown> };
    get?: (cardId: CardInstanceId) => { definition?: LorcanaCardDefinition };
  };
  G: DeepReadonly<LorcanaG>;
  playerId: PlayerId;
  sourceCardId?: CardInstanceId;

  // Optional action-specific context
  cardPlayed?: CardPlayedPayload;
  resolutionInput?: ActionResolutionInput;
}

const DEFAULT_EXISTS_COMPARISON: ConditionComparison = {
  operator: "gte",
  value: 1,
};

function compareNumbers(
  left: number,
  operator: ConditionComparisonOperator | string,
  right: number,
): boolean {
  switch (operator) {
    case "eq":
    case "equal":
      return left === right;
    case "ne":
    case "not-equal":
      return left !== right;
    case "gt":
    case "greater":
    case "greater-than":
    case "more-than":
      return left > right;
    case "gte":
    case "greater-or-equal":
    case "or-more":
      return left >= right;
    case "lt":
    case "less":
    case "less-than":
      return left < right;
    case "lte":
    case "less-or-equal":
    case "or-less":
      return left <= right;
    default:
      return false;
  }
}

function getSelectedTargets(ctx: ConditionEvaluationContext): CardInstanceId[] {
  return normalizeSelectedTargets(ctx.resolutionInput?.targets) ?? [];
}

function resolveScopedPlayerIds(
  scope: "you" | "opponent" | "any" | undefined,
  controllerId: PlayerId,
  allPlayers: readonly PlayerId[],
): PlayerId[] {
  switch (scope) {
    case "you":
      return [controllerId];
    case "opponent":
      return allPlayers.filter((playerId) => playerId !== controllerId);
    case "any":
    default:
      return [...allPlayers];
  }
}

function evaluateTargetQueryCondition(
  condition: TargetQueryCondition,
  ctx: ConditionEvaluationContext,
): boolean {
  // Create a pseudo cardPlayed if missing, using sourceCardId or a dummy
  const cardPlayed: CardPlayedPayload = ctx.cardPlayed ?? {
    cardId: ctx.sourceCardId ?? ("unknown" as CardInstanceId),
    playerId: ctx.playerId,
    cardType: "action", // Dummy
    costType: "free",
  };

  const result = resolveTargetQuery(ctx as any, cardPlayed, condition.query, {
    sourceCardId: ctx.sourceCardId ?? cardPlayed.cardId,
    selectedTargets: getSelectedTargets(ctx),
    eventSnapshot: ctx.resolutionInput?.eventSnapshot,
    strictUnknownFilters: true,
    controllerId: ctx.playerId,
  });

  const count = result.kind === "card" ? result.cardIds.length : result.playerIds.length;
  const comparison = condition.comparison ?? DEFAULT_EXISTS_COMPARISON;
  return compareNumbers(count, comparison.operator, comparison.value);
}

function getCardNumericAttribute(
  ctx: ConditionEvaluationContext,
  cardId: CardInstanceId,
  attribute: TargetAggregateComparisonCondition["left"]["attribute"],
): number {
  const definition = ctx.cards.getDefinition(cardId);

  switch (attribute) {
    case "strength": {
      return getEffectiveStrength(
        definition,
        ctx.framework.state as unknown as DerivedStateContext,
        cardId,
        ctx.cards.getDefinition,
      );
    }
    case "willpower": {
      const runtimeCard = ctx.cards.require(cardId) as { getWillpower?: () => number } | undefined;
      return Number(runtimeCard?.getWillpower?.() ?? definition?.willpower ?? 0);
    }
    case "cost":
      return Number(definition?.cost ?? 0);
    case "lore":
      return getEffectiveLore(
        definition,
        ctx.framework.state as unknown as DerivedStateContext,
        cardId,
        ctx.cards.getDefinition,
      );
    case "damage":
      return Number(ctx.cards.require(cardId).meta?.damage ?? 0);
    default:
      return 0;
  }
}

function reduceAggregate(
  values: number[],
  aggregate: TargetAggregateComparisonCondition["left"]["aggregate"],
): number | undefined {
  if (values.length === 0) {
    return undefined;
  }

  switch (aggregate ?? "max") {
    case "count":
      return values.length;
    case "min":
      return Math.min(...values);
    case "sum":
      return values.reduce((total, value) => total + value, 0);
    case "max":
    default:
      return Math.max(...values);
  }
}

function evaluateTargetAggregateComparisonCondition(
  condition: TargetAggregateComparisonCondition,
  ctx: ConditionEvaluationContext,
): boolean {
  const cardPlayed: CardPlayedPayload = ctx.cardPlayed ?? {
    cardId: ctx.sourceCardId ?? ("unknown" as CardInstanceId),
    playerId: ctx.playerId,
    cardType: "action",
    costType: "free",
  };

  const queryContext = {
    sourceCardId: ctx.sourceCardId ?? cardPlayed.cardId,
    selectedTargets: getSelectedTargets(ctx),
    eventSnapshot: ctx.resolutionInput?.eventSnapshot,
    strictUnknownFilters: true,
    controllerId: ctx.playerId,
  };

  const leftResult = resolveTargetQuery(ctx as any, cardPlayed, condition.left.query, queryContext);
  const rightResult = resolveTargetQuery(
    ctx as any,
    cardPlayed,
    condition.right.query,
    queryContext,
  );
  if (leftResult.kind !== "card" || rightResult.kind !== "card") {
    return false;
  }

  if (condition.requireLeftNonEmpty && leftResult.cardIds.length === 0) {
    return false;
  }

  if (rightResult.cardIds.length === 0 && condition.ifRightEmpty === "pass") {
    return !condition.requireLeftNonEmpty || leftResult.cardIds.length > 0;
  }

  const leftValues = leftResult.cardIds.map((cardId) =>
    getCardNumericAttribute(ctx, cardId, condition.left.attribute),
  );
  const rightValues = rightResult.cardIds.map((cardId) =>
    getCardNumericAttribute(ctx, cardId, condition.right.attribute),
  );

  const leftAggregate = reduceAggregate(leftValues, condition.left.aggregate);
  const rightAggregate = reduceAggregate(rightValues, condition.right.aggregate);

  if (leftAggregate === undefined || rightAggregate === undefined) {
    return false;
  }

  return compareNumbers(leftAggregate, condition.comparison, rightAggregate);
}

function countCardsPlayedThisTurnMatching(
  ctx: ConditionEvaluationContext,
  predicate: (definition: LorcanaCardDefinition | undefined) => boolean,
): number {
  const cardsPlayedThisTurn = ctx.G.turnMetadata?.cardsPlayedThisTurn ?? [];
  return cardsPlayedThisTurn.reduce((count, cardId) => {
    return predicate(ctx.cards.getDefinition(cardId)) ? count + 1 : count;
  }, 0);
}

function resolveScopedPlayerCount(
  countsByPlayer: Record<PlayerId, number> | undefined,
  scope: "you" | "opponent" | "any" | undefined,
  controllerId: PlayerId,
  allPlayers: readonly PlayerId[],
): number {
  const counts = countsByPlayer ?? {};
  switch (scope ?? "you") {
    case "you":
      return counts[controllerId] ?? 0;
    case "opponent":
      return allPlayers
        .filter((playerId) => playerId !== controllerId)
        .reduce((total, playerId) => total + (counts[playerId] ?? 0), 0);
    case "any":
      return allPlayers.reduce((total, playerId) => total + (counts[playerId] ?? 0), 0);
    default:
      return 0;
  }
}

function evaluateTurnMetricCondition(
  condition: TurnMetricCondition,
  ctx: ConditionEvaluationContext,
): boolean {
  const comparison = condition.comparison ?? DEFAULT_EXISTS_COMPARISON;
  const controllerId = ctx.playerId;

  let value = 0;
  switch (condition.metric) {
    case "played-songs":
      value = countCardsPlayedThisTurnMatching(
        ctx,
        (definition) => definition?.cardType === "action" && definition?.actionSubtype === "song",
      );
      break;

    case "played-actions":
      value = countCardsPlayedThisTurnMatching(
        ctx,
        (definition) => definition?.cardType === "action",
      );
      break;

    case "played-character-with-classification":
      value = countCardsPlayedThisTurnMatching(
        ctx,
        (definition) =>
          definition?.cardType === "character" &&
          Array.isArray(definition.classifications) &&
          typeof condition.classification === "string" &&
          (definition.classifications as readonly string[]).includes(condition.classification),
      );
      break;

    case "cards-inked":
      value = ctx.G.turnMetadata?.inkedThisTurn?.length ?? 0;
      break;

    case "challenges-by-player":
      value = resolveScopedPlayerCount(
        ctx.G.turnMetadata?.challengesByPlayerThisTurn,
        condition.playerScope,
        controllerId,
        ctx.framework.state.playerIds,
      );
      break;

    case "banished-characters":
      value = ctx.G.turnMetadata?.banishedCharactersThisTurn?.length ?? 0;
      break;

    case "damaged-characters-by-owner":
      value = resolveScopedPlayerCount(
        ctx.G.turnMetadata?.damagedCharactersByOwnerThisTurn,
        condition.ownerScope,
        controllerId,
        ctx.framework.state.playerIds,
      );
      break;

    case "discard-cards-left":
      value = ctx.G.turnMetadata?.discardCardsLeftThisTurn ?? 0;
      break;

    case "quested-characters": {
      const questing = ctx.G.turnMetadata?.charactersQuesting ?? [];
      value = condition.excludeSource
        ? questing.filter((cardId) => cardId !== ctx.sourceCardId).length
        : questing.length;
      break;
    }

    default:
      value = 0;
      break;
  }

  return compareNumbers(value, comparison.operator, comparison.value);
}

function evaluatePlayContextCondition(
  condition: PlayContextCondition,
  cardPlayed?: CardPlayedPayload,
  eventSnapshot?: ActionResolutionInput["eventSnapshot"],
): boolean {
  switch (condition.context) {
    case "used-shift": {
      const usedShift = cardPlayed?.usedShift ?? eventSnapshot?.playedCardUsedShift ?? false;
      if (!condition.comparison) {
        return usedShift === true;
      }
      return compareNumbers(
        usedShift === true ? 1 : 0,
        condition.comparison.operator,
        condition.comparison.value,
      );
    }

    case "characters-sang-this-song": {
      const singerCount =
        (Array.isArray(cardPlayed?.singerIds) ? cardPlayed?.singerIds.length : undefined) ??
        eventSnapshot?.playedCardSingerCount ??
        0;
      const comparison = condition.comparison ?? DEFAULT_EXISTS_COMPARISON;
      return compareNumbers(singerCount, comparison.operator, comparison.value);
    }

    default:
      return false;
  }
}

function countCardsOfTypeInPlay(
  ctx: ConditionEvaluationContext,
  playerId: PlayerId,
  expectedType: "character" | "item" | "location",
): number {
  return ctx.framework.zones
    .getCards({ zone: "play", playerId })
    .filter(
      (cardId) => ctx.cards.getDefinition(cardId as CardInstanceId)?.cardType === expectedType,
    ).length;
}

function countDamagedCharactersInPlay(ctx: ConditionEvaluationContext, playerId: PlayerId): number {
  return ctx.framework.zones.getCards({ zone: "play", playerId }).filter((cardId) => {
    if (ctx.cards.getDefinition(cardId as CardInstanceId)?.cardType !== "character") {
      return false;
    }

    return Number(ctx.cards.require(cardId as CardInstanceId).meta?.damage ?? 0) > 0;
  }).length;
}

function countExertedCharactersInPlay(ctx: ConditionEvaluationContext, playerId: PlayerId): number {
  return ctx.framework.zones.getCards({ zone: "play", playerId }).filter((cardId) => {
    if (ctx.cards.getDefinition(cardId as CardInstanceId)?.cardType !== "character") {
      return false;
    }

    return ctx.cards.require(cardId as CardInstanceId).meta?.state === "exerted";
  }).length;
}

function evaluateLegacyCardTypeCountCondition(
  condition: HasItemCountCondition | HasLocationCountCondition,
  ctx: ConditionEvaluationContext,
): boolean {
  const playerIds = resolveScopedPlayerIds(
    condition.controller,
    ctx.playerId,
    ctx.framework.state.playerIds,
  );
  const expectedType = condition.type === "has-item-count" ? "item" : "location";
  const value = playerIds.reduce(
    (total, playerId) => total + countCardsOfTypeInPlay(ctx, playerId, expectedType),
    0,
  );

  return compareNumbers(value, condition.comparison, condition.count ?? 0);
}

function evaluateResourceCountCondition(
  condition: ResourceCountCondition,
  ctx: ConditionEvaluationContext,
): boolean {
  const playerIds = resolveScopedPlayerIds(
    condition.controller,
    ctx.playerId,
    ctx.framework.state.playerIds,
  );

  const value = (() => {
    switch (condition.what) {
      case "characters":
        return playerIds.reduce(
          (total, playerId) => total + countCardsOfTypeInPlay(ctx, playerId, "character"),
          0,
        );
      case "items":
        return playerIds.reduce(
          (total, playerId) => total + countCardsOfTypeInPlay(ctx, playerId, "item"),
          0,
        );
      case "locations":
        return playerIds.reduce(
          (total, playerId) => total + countCardsOfTypeInPlay(ctx, playerId, "location"),
          0,
        );
      case "cards-in-hand":
        return playerIds.reduce(
          (total, playerId) =>
            total + ctx.framework.zones.getCards({ zone: "hand", playerId }).length,
          0,
        );
      case "cards-in-inkwell":
        return playerIds.reduce(
          (total, playerId) =>
            total + ctx.framework.zones.getCards({ zone: "inkwell", playerId }).length,
          0,
        );
      case "cards-in-discard":
        return playerIds.reduce(
          (total, playerId) =>
            total + ctx.framework.zones.getCards({ zone: "discard", playerId }).length,
          0,
        );
      case "damaged-characters":
        return playerIds.reduce(
          (total, playerId) => total + countDamagedCharactersInPlay(ctx, playerId),
          0,
        );
      case "exerted-characters":
        return playerIds.reduce(
          (total, playerId) => total + countExertedCharactersInPlay(ctx, playerId),
          0,
        );
      case "damage-on-self":
        return ctx.sourceCardId ? Number(ctx.cards.require(ctx.sourceCardId).meta?.damage ?? 0) : 0;
      default:
        return 0;
    }
  })();

  return compareNumbers(value, condition.comparison, condition.value);
}

function evaluateInChallengeCondition(
  condition: Extract<Condition, { type: "in-challenge" }>,
  ctx: ConditionEvaluationContext,
): boolean {
  if (!ctx.sourceCardId) return false;

  const challenge = ctx.G.challengeState;
  if (!challenge) return false;

  const isAttacker = challenge.attacker === ctx.sourceCardId;
  const isDefender = challenge.defender === ctx.sourceCardId;

  if (condition.role === "attacker" && !isAttacker) return false;
  if (condition.role === "defender" && !isDefender) return false;
  if (!condition.role && !isAttacker && !isDefender) return false;

  if (!condition.againstCardType) return true;

  const opposingCardId = isAttacker ? challenge.defender : challenge.attacker;
  const opposingDefinition = ctx.cards.getDefinition(opposingCardId);
  return opposingDefinition?.cardType === condition.againstCardType;
}

function evaluateBanishedInChallengeCondition(
  condition: Extract<Condition, { type: "banished-in-challenge-this-turn" }>,
  ctx: ConditionEvaluationContext,
): boolean {
  const counts = ctx.G?.turnMetadata?.banishedCharactersInChallengeByOwnerThisTurn ?? {};

  if (condition.owner === "you") {
    return (counts[ctx.playerId] ?? 0) > 0;
  }

  if (condition.owner === "opponent") {
    return Object.entries(counts).some(
      ([playerId, count]) => playerId !== ctx.playerId && Number(count) > 0,
    );
  }

  return Object.values(counts).some((count) => Number(count) > 0);
}

function evaluateStaticTurnCondition(
  condition: Extract<Condition, { type: "turn" | "during-turn" | "your-turn" }>,
  ctx: ConditionEvaluationContext,
): boolean {
  const activePlayer = ctx.framework.state.currentPlayer ?? ctx.framework.state.ctx.priority.holder;
  if (!activePlayer) return false;

  switch (condition.type) {
    case "turn":
    case "during-turn":
      return condition.whose === "your"
        ? activePlayer === ctx.playerId
        : activePlayer !== ctx.playerId;

    case "your-turn":
      return activePlayer === ctx.playerId;

    default:
      return false;
  }
}

export function evaluateCondition(
  condition: Condition | undefined,
  ctx: ConditionEvaluationContext,
): boolean {
  if (!condition) {
    return true;
  }

  switch (condition.type) {
    case "and":
      return condition.conditions.every((sub) => evaluateCondition(sub, ctx));
    case "or":
      return condition.conditions.some((sub) => evaluateCondition(sub, ctx));
    case "not":
      return !evaluateCondition(condition.condition, ctx);

    case "target-query":
      return evaluateTargetQueryCondition(condition, ctx);

    case "target-aggregate-comparison":
      return evaluateTargetAggregateComparisonCondition(condition, ctx);

    case "turn-metric":
      return evaluateTurnMetricCondition(condition, ctx);

    case "play-context":
      return evaluatePlayContextCondition(
        condition,
        ctx.cardPlayed,
        ctx.resolutionInput?.eventSnapshot,
      );

    case "used-shift":
      return ctx.cardPlayed?.usedShift === true;

    case "resource-count":
      return evaluateResourceCountCondition(condition, ctx);

    case "has-item-count":
    case "has-location-count":
      return evaluateLegacyCardTypeCountCondition(condition, ctx);

    case "has-character-count": {
      // Map to target query to avoid duplication
      const query: TargetQueryCondition = {
        type: "target-query",
        query: {
          selector: "all",
          zones: ["play"],
          cardType: "character",
          owner: condition.controller,
          filters: [
            condition.classification
              ? { type: "classification", classification: condition.classification }
              : undefined,
            condition.keyword ? { type: "keyword", keyword: condition.keyword } : undefined,
          ].filter((f) => !!f) as any,
        },
        comparison: {
          operator: (typeof condition.comparison === "string"
            ? condition.comparison
            : "gte") as ConditionComparisonOperator,
          value: condition.count ?? 0,
        },
      };
      return evaluateTargetQueryCondition(query, ctx);
    }

    case "has-named-character": {
      const query: TargetQueryCondition = {
        type: "target-query",
        query: {
          selector: "all",
          zones: ["play"],
          cardType: "character",
          owner: condition.controller,
          filters: [{ type: "name", name: condition.name }] as any,
        },
        comparison: { operator: "gte", value: 1 },
      };
      return evaluateTargetQueryCondition(query, ctx);
    }

    case "first-turn-non-otp": {
      const otp = ctx.framework.state.ctx.status.otp as PlayerId | undefined;
      if (!otp) return false;
      if (otp === ctx.playerId) return false;
      const turnsCompleted = ctx.G.turnsCompletedByPlayer?.[ctx.playerId] ?? 0;
      return turnsCompleted === 0;
    }

    case "revealed-matches-chosen-name": {
      const revealedCardId = ctx.resolutionInput?.eventSnapshot?.revealedCardIds?.[0] as
        | CardInstanceId
        | undefined;
      const selectedTargets = normalizeSelectedTargets(ctx.resolutionInput?.targets) ?? [];
      const chosenCardId =
        (ctx.resolutionInput?.eventSnapshot?.chosenCardId as CardInstanceId | undefined) ??
        selectedTargets[0] ??
        ctx.sourceCardId;

      const revealedName = revealedCardId
        ? ctx.cards.getDefinition(revealedCardId)?.name
        : undefined;
      const chosenName = chosenCardId ? ctx.cards.getDefinition(chosenCardId)?.name : undefined;

      return (
        typeof revealedName === "string" && revealedName.length > 0 && revealedName === chosenName
      );
    }

    case "revealed-matches-named": {
      const revealedCardId = ctx.resolutionInput?.eventSnapshot?.revealedCardIds?.[0] as
        | CardInstanceId
        | undefined;
      const revealedName = revealedCardId
        ? ctx.cards.getDefinition(revealedCardId)?.name
        : undefined;
      const namedCardName = ctx.resolutionInput?.eventSnapshot?.namedCardName?.trim();

      return (
        typeof revealedName === "string" &&
        revealedName.length > 0 &&
        typeof namedCardName === "string" &&
        namedCardName.length > 0 &&
        revealedName === namedCardName
      );
    }

    case "exerted": {
      const selectedTargets = normalizeSelectedTargets(ctx.resolutionInput?.targets) ?? [];
      const target = condition.target ?? "SELF";
      const targetId = target === "SELF" ? ctx.sourceCardId : selectedTargets[0];
      if (!targetId) {
        return false;
      }
      return ctx.cards.require(targetId).meta?.state === "exerted";
    }

    case "if-you-do":
      return didLastEffectPerform(ctx.resolutionInput?.eventSnapshot);

    case "in-challenge":
      return evaluateInChallengeCondition(condition, ctx);

    case "banished-in-challenge-this-turn":
      return evaluateBanishedInChallengeCondition(condition, ctx);

    case "turn":
    case "during-turn":
    case "your-turn":
      return evaluateStaticTurnCondition(condition, ctx);

    case "if":
      // Unsupported
      return false;

    default:
      return false;
  }
}
