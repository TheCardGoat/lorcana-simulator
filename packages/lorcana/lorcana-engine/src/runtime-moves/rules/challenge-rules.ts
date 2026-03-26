import type {
  CardInstanceId,
  MoveEnumerationContext,
  MoveExecutionContext,
  MoveValidationContext,
  PlayerId,
  RuntimeCardWithDefinition,
  RuntimeValidationResult,
} from "#core";
import type { CharacterCard, LorcanaCard, LocationCard } from "@tcg/lorcana-types";
import { isCharacterCard, isLocationCard } from "@tcg/lorcana-types";
import { getTotalKeyword, hasKeyword } from "../../card-utils";
import { projectLorcanaCardDerived } from "../../projection/card-derived";
import { createProjectionState } from "../../rules/derived-state";
import { resolveCandidateTargets } from "../../targeting/runtime";
import type { ChallengeState, LorcanaCardMeta, LorcanaRuntimeMoveInputs } from "../../types";
import type { LorcanaCardDerived } from "../../types/projected-board";
type LorcanaRuntimeCard = RuntimeCardWithDefinition & LorcanaCardDerived;
import {
  hasStaticCardRestriction,
  hasStaticChallengerFilteredRestriction,
  hasStaticPlayerRestriction,
  getStaticChallengeLimit,
  isCardInPlay,
  evaluateStaticCondition,
} from "./static-ability-utils";
import {
  getTemporaryAbilityPayload,
  hasTemporaryAbility,
  hasTemporaryPlayerRestriction,
  hasTemporaryRestriction,
} from "../effects/temporary-effects";

export const CHALLENGE_DEFENDER_TARGET_DSL = {
  selector: "chosen",
  count: 1,
  owner: "opponent",
  zones: ["play"],
} as const;

export type ChallengeValidationContext = MoveValidationContext<
  LorcanaRuntimeMoveInputs["challenge"]
>;

export type ChallengeEnumerationContext = MoveEnumerationContext;

export type ChallengeExecutionContext = MoveExecutionContext<LorcanaRuntimeMoveInputs["challenge"]>;

type ChallengeIntentValidationContext = MoveValidationContext<
  LorcanaRuntimeMoveInputs[keyof LorcanaRuntimeMoveInputs]
>;

type ChallengeIntentContext = ChallengeIntentValidationContext | ChallengeEnumerationContext;

type ChallengeAnyContext = ChallengeIntentContext | ChallengeExecutionContext;
type ChallengeCardReadContext = { cards: unknown };
type ChallengeFrameworkReadContext = Pick<ChallengeAnyContext, "framework" | "G">;
type ChallengeCardStateContext = ChallengeCardReadContext & ChallengeFrameworkReadContext;

type RuntimeLorcanaCardWithDerived = RuntimeCardWithDefinition & LorcanaCardDerived;

function isCardStillInPlay(ctx: ChallengeAnyContext, sourceId: string): boolean {
  const zoneKey = ctx.framework.zones.getCardZone(sourceId);
  return typeof zoneKey === "string" && (zoneKey === "play" || zoneKey.startsWith("play:"));
}

type ChallengeCardsAPI = {
  getDefinition(cardId: CardInstanceId): LorcanaCard | undefined;
  get(cardId: CardInstanceId): RuntimeLorcanaCardWithDerived | undefined;
  require(cardId: CardInstanceId): RuntimeLorcanaCardWithDerived;
};

function getCardsApi(ctx: ChallengeCardReadContext): ChallengeCardsAPI {
  return ctx.cards as unknown as ChallengeCardsAPI;
}

function isInPlayZone(zoneId: string | undefined): boolean {
  return zoneId === "play" || (typeof zoneId === "string" && zoneId.startsWith("play:"));
}

function getCardDefinition(
  ctx: ChallengeCardReadContext,
  cardId: CardInstanceId,
): LorcanaCard | undefined {
  return getCardsApi(ctx).getDefinition(cardId);
}

function getCardMeta(ctx: ChallengeCardReadContext, cardId: CardInstanceId): LorcanaCardMeta {
  return getCardsApi(ctx).require(cardId).meta ?? {};
}

function isReady(meta: LorcanaCardMeta): boolean {
  return meta.state !== "exerted";
}

function getCurrentTurn(ctx: ChallengeFrameworkReadContext): number {
  return ctx.framework.state.status.turn ?? 1;
}

function hasKeywordIncludingTemporary(
  ctx: ChallengeCardStateContext,
  cardId: CardInstanceId,
  keyword: string,
): boolean {
  const runtimeCard = getCardsApi(ctx).require(cardId);
  return runtimeCard.keywords?.includes(keyword) ?? false;
}

function hasRushForChallenge(ctx: ChallengeAnyContext, cardId: CardInstanceId): boolean {
  return hasKeywordIncludingTemporary(ctx, cardId, "Rush");
}

function canChallengeReadyCharacters(
  ctx: ChallengeAnyContext,
  attackerId: CardInstanceId,
  defenderId?: CardInstanceId,
): boolean {
  const currentTurn = getCurrentTurn(ctx);
  const attackerMeta = getCardMeta(ctx, attackerId);
  const evaluateClassificationRestriction = (classification: unknown): boolean => {
    if (typeof classification !== "string" || classification.length === 0) {
      return true;
    }

    if (!defenderId) {
      return false;
    }

    const defenderRuntimeCard = getCardsApi(ctx).get(defenderId);
    if (!defenderRuntimeCard) {
      return false;
    }

    return Array.isArray(defenderRuntimeCard.classifications)
      ? defenderRuntimeCard.classifications.includes(classification)
      : false;
  };

  const temporaryReadyGrant = hasTemporaryAbility(attackerMeta, currentTurn, "can-challenge-ready");
  if (temporaryReadyGrant) {
    const payload = getTemporaryAbilityPayload(attackerMeta, currentTurn, "can-challenge-ready");
    return evaluateClassificationRestriction(
      payload && typeof payload === "object" && !Array.isArray(payload)
        ? (payload as { classification?: unknown }).classification
        : undefined,
    );
  }

  const attackerRuntime = getCardsApi(ctx).get(attackerId);
  const attackerDefinition = attackerRuntime?.definition;
  if (!attackerDefinition) {
    return false;
  }

  const evaluateDamagedRestriction = (onlyDamaged: unknown): boolean => {
    if (!onlyDamaged) {
      return true;
    }

    if (!defenderId) {
      return false;
    }

    const defenderMeta = getCardMeta(ctx, defenderId);
    return Number(defenderMeta.damage ?? 0) > 0;
  };

  const attackerControllerId = getCardsApi(ctx).require(attackerId).controllerID as
    | PlayerId
    | undefined;

  const matchesStaticReadyGrant = (attackerDefinition.abilities ?? []).some((ability) => {
    if (ability.type !== "static" || ability.effect.type !== "grant-ability") {
      return false;
    }

    if (ability.effect.target !== undefined && ability.effect.target !== "SELF") {
      return false;
    }

    const grantedAbility = ability.effect.ability;
    const grantedAbilityType =
      typeof grantedAbility === "string"
        ? grantedAbility
        : grantedAbility && typeof grantedAbility === "object" && !Array.isArray(grantedAbility)
          ? grantedAbility.type
          : undefined;

    if (grantedAbilityType !== "can-challenge-ready") {
      return false;
    }

    if (
      !evaluateStaticCondition({
        condition: ability.condition,
        state: ctx.framework.state,
        controllerId: attackerControllerId,
        sourceId: attackerId,
        getDefinitionByInstanceId: (instanceId) => getCardDefinition(ctx, instanceId),
      })
    ) {
      return false;
    }

    const grantedClassification =
      grantedAbility && typeof grantedAbility === "object" && !Array.isArray(grantedAbility)
        ? (grantedAbility as { classification?: unknown }).classification
        : undefined;

    const grantedOnlyDamaged =
      grantedAbility && typeof grantedAbility === "object" && !Array.isArray(grantedAbility)
        ? (grantedAbility as { onlyDamaged?: unknown }).onlyDamaged
        : undefined;

    return (
      evaluateClassificationRestriction(grantedClassification) &&
      evaluateDamagedRestriction(grantedOnlyDamaged)
    );
  });

  return matchesStaticReadyGrant;
}

function hasStaticTakesNoDamageFromChallenges(
  ctx: ChallengeCardStateContext,
  cardId: CardInstanceId,
): boolean {
  const cardDef = getCardDefinition(ctx, cardId);
  if (!cardDef) {
    return false;
  }

  const abilities = cardDef.abilities ?? [];
  const controllerId = getCardsApi(ctx).require(cardId).controllerID as PlayerId | undefined;

  for (const ability of abilities) {
    if (ability.type !== "static") {
      continue;
    }
    const effect = ability.effect;
    if (effect.type !== "grant-ability") {
      continue;
    }
    if (effect.ability !== "takes-no-damage-from-challenges") {
      continue;
    }
    // Must target SELF (or undefined, which defaults to SELF)
    if (effect.target !== undefined && effect.target !== "SELF") {
      continue;
    }

    // Evaluate the condition
    if (!ability.condition) {
      return true; // Unconditional static grant
    }

    if (!controllerId) {
      continue;
    }

    // Merge G into the state so that condition evaluator can access turnMetadata
    const stateWithG = { ...ctx.framework.state, G: ctx.G };

    const conditionMet = evaluateStaticCondition({
      condition: ability.condition,
      state: stateWithG,
      controllerId,
      sourceId: cardId,
      getDefinitionByInstanceId: (instanceId) => getCardDefinition(ctx, instanceId),
    });

    if (conditionMet) {
      return true;
    }
  }

  return false;
}

function takesNoDamageFromChallenges(
  ctx: ChallengeCardStateContext,
  cardId: CardInstanceId,
  opponentCardId?: CardInstanceId,
): boolean {
  const currentTurn = getCurrentTurn(ctx);
  const cardMeta = getCardMeta(ctx, cardId);

  // Unconditional "takes no damage from challenges"
  if (hasTemporaryAbility(cardMeta, currentTurn, "takes-no-damage-from-challenges")) {
    return true;
  }

  // Conditional variant: "takes no damage from challenges against <classification>"
  if (
    opponentCardId &&
    hasTemporaryAbility(cardMeta, currentTurn, "takes-no-damage-from-challenges-conditional")
  ) {
    const payload = getTemporaryAbilityPayload(
      cardMeta,
      currentTurn,
      "takes-no-damage-from-challenges-conditional",
    );
    if (payload && typeof payload.type === "string") {
      const requiredClassification = payload.type;
      const opponentDef = getCardDefinition(ctx, opponentCardId);
      if (opponentDef && "classifications" in opponentDef) {
        const classifications = (opponentDef as { classifications?: string[] }).classifications;
        if (Array.isArray(classifications) && classifications.includes(requiredClassification)) {
          return true;
        }
      }
      // Also check derived/projected classifications for runtime modifications
      const runtimeCard = getCardsApi(ctx).get(opponentCardId);
      if (runtimeCard) {
        if (
          Array.isArray(runtimeCard.classifications) &&
          runtimeCard.classifications.includes(requiredClassification)
        ) {
          return true;
        }
      }
    }
  }

  // Check static abilities on the card definition that grant "takes-no-damage-from-challenges"
  if (hasStaticTakesNoDamageFromChallenges(ctx, cardId)) {
    return true;
  }

  return false;
}

function cantBeChallenged(
  ctx: ChallengeAnyContext,
  cardId: CardInstanceId,
  attackerId?: CardInstanceId,
): boolean {
  const currentTurn = getCurrentTurn(ctx);
  const cardMeta = getCardMeta(ctx, cardId);
  if (
    hasTemporaryRestriction(cardMeta, currentTurn, "cant-be-challenged", {
      isSourceInPlay: (sourceId) => isCardStillInPlay(ctx, sourceId),
    })
  ) {
    return true;
  }

  const ownerId = getCardsApi(ctx).require(cardId).ownerID as PlayerId | undefined;
  if (!ownerId) {
    return false;
  }

  if (
    hasTemporaryPlayerRestriction(
      ctx.G.temporaryPlayerRestrictions,
      ownerId,
      currentTurn,
      "cant-be-challenged",
    )
  ) {
    return true;
  }

  // Check for static cant-be-challenged restrictions, including challenger-filtered ones
  if (
    hasStaticChallengerFilteredRestriction({
      state: ctx.framework.state,
      cardId,
      attackerId,
      getDefinitionByInstanceId: (instanceId) => getCardDefinition(ctx, instanceId),
    })
  ) {
    return true;
  }

  return false;
}

function canChallengeEvasive(ctx: ChallengeAnyContext, attackerId: CardInstanceId): boolean {
  return (
    hasKeywordIncludingTemporary(ctx, attackerId, "Evasive") ||
    hasKeywordIncludingTemporary(ctx, attackerId, "Alert")
  );
}

function isChallengeReadyAttacker(ctx: ChallengeAnyContext, attackerId: CardInstanceId): boolean {
  const attackerDef = getCardDefinition(ctx, attackerId);
  if (!attackerDef || !isCharacterCard(attackerDef)) {
    return false;
  }

  const attackerMeta = getCardMeta(ctx, attackerId);
  if (!isReady(attackerMeta)) {
    return false;
  }

  const currentTurn = getCurrentTurn(ctx);
  const controllerId = getCardsApi(ctx).require(attackerId).controllerID as PlayerId | undefined;

  if (
    controllerId &&
    hasTemporaryPlayerRestriction(
      ctx.G.temporaryPlayerRestrictions,
      controllerId,
      currentTurn,
      "cant-challenge",
    )
  ) {
    return false;
  }

  if (
    hasTemporaryRestriction(attackerMeta, currentTurn, "cant-challenge", {
      isSourceInPlay: (sourceId) => isCardStillInPlay(ctx, sourceId),
    })
  ) {
    return false;
  }

  if (
    hasStaticCardRestriction({
      state: ctx.framework.state,
      cardId: attackerId,
      restriction: "cant-challenge",
      getDefinitionByInstanceId: (instanceId) => getCardDefinition(ctx, instanceId),
    })
  ) {
    return false;
  }

  if (
    controllerId &&
    hasStaticPlayerRestriction({
      state: ctx.framework.state,
      playerId: controllerId,
      restriction: "cant-challenge",
      getDefinitionByInstanceId: (instanceId) => getCardDefinition(ctx, instanceId),
    })
  ) {
    return false;
  }

  if (attackerMeta.isDrying === true && !hasRushForChallenge(ctx, attackerId)) {
    return false;
  }

  if (hasExceededChallengeLimit(ctx, attackerId)) {
    return false;
  }

  return true;
}

function hasExceededChallengeLimit(ctx: ChallengeAnyContext, attackerId: CardInstanceId): boolean {
  const challengeLimit = getStaticChallengeLimit({
    state: ctx.framework.state,
    getDefinitionByInstanceId: (instanceId) => getCardDefinition(ctx, instanceId),
  });
  if (challengeLimit === null) {
    return false;
  }

  const attackerControllerId = getCardsApi(ctx).require(attackerId).controllerID as
    | PlayerId
    | undefined;
  if (!attackerControllerId) {
    return false;
  }

  const challengesDoneThisTurn =
    ctx.G.turnMetadata?.challengesByPlayerThisTurn?.[attackerControllerId] ?? 0;
  return challengesDoneThisTurn >= challengeLimit;
}

function getActingPlayerId(ctx: ChallengeIntentContext): PlayerId | undefined {
  const candidate =
    ctx.framework.state.currentPlayer ?? ctx.playerId ?? ctx.framework.state.priority.holder;
  return typeof candidate === "string" && candidate.length > 0
    ? (candidate as PlayerId)
    : undefined;
}

function getControlledCardsInPlay(ctx: ChallengeIntentContext): CardInstanceId[] {
  const actingPlayerId = getActingPlayerId(ctx);
  if (!actingPlayerId) {
    return [];
  }

  return resolveCandidateTargets(
    ctx,
    {
      selector: "all",
      count: "all",
      owner: "you",
      zones: ["play"],
    },
    { controllerId: actingPlayerId },
  );
}

function getOpposingCardsInPlay(ctx: ChallengeIntentContext): CardInstanceId[] {
  const actingPlayerId = getActingPlayerId(ctx);
  if (!actingPlayerId) {
    return [];
  }

  return resolveCandidateTargets(
    ctx,
    {
      selector: "all",
      count: "all",
      owner: "opponent",
      zones: ["play"],
    },
    { controllerId: actingPlayerId },
  );
}

function getBodyguardCandidatesForOwner(
  ctx: ChallengeIntentContext,
  attackerId: CardInstanceId,
  ownerId: PlayerId,
): CardInstanceId[] {
  return getOpposingCardsInPlay(ctx).filter((candidateId) => {
    const runtimeCard = getCardsApi(ctx).get(candidateId);
    if (!runtimeCard || runtimeCard.ownerID !== ownerId || !isInPlayZone(runtimeCard.zoneID)) {
      return false;
    }

    const candidateDef = runtimeCard.definition;
    if (!isCharacterCard(candidateDef)) {
      return false;
    }

    const candidateMeta = getCardMeta(ctx, candidateId);
    if (candidateMeta.state !== "exerted") {
      return false;
    }

    if (!hasKeywordIncludingTemporary(ctx, candidateId, "Bodyguard")) {
      return false;
    }

    if (cantBeChallenged(ctx, candidateId)) {
      return false;
    }

    if (
      hasKeywordIncludingTemporary(ctx, candidateId, "Evasive") &&
      !canChallengeEvasive(ctx, attackerId)
    ) {
      return false;
    }

    return true;
  });
}

function hasMandatoryBodyguardTarget(
  ctx: ChallengeIntentContext,
  attackerId: CardInstanceId,
  defenderOwnerId: PlayerId,
): boolean {
  return getBodyguardCandidatesForOwner(ctx, attackerId, defenderOwnerId).length > 0;
}

function violatesBodyguardIfAbleRestriction(
  ctx: ChallengeIntentContext,
  attackerId: CardInstanceId,
  defenderDef: CharacterCard | LocationCard,
  defenderId: CardInstanceId,
  defenderOwnerId: PlayerId,
): boolean {
  if (isCharacterCard(defenderDef) && hasKeywordIncludingTemporary(ctx, defenderId, "Bodyguard")) {
    return false;
  }

  return hasMandatoryBodyguardTarget(ctx, attackerId, defenderOwnerId);
}

function isLegalDefenderForAttacker(
  ctx: ChallengeIntentContext,
  attackerId: CardInstanceId,
  defenderId: CardInstanceId,
): boolean {
  const attackerDef = getCardDefinition(ctx, attackerId);
  if (!attackerDef || !isCharacterCard(attackerDef)) {
    return false;
  }

  if (!isChallengeReadyAttacker(ctx, attackerId)) {
    return false;
  }

  const defenderRuntime = getCardsApi(ctx).get(defenderId);
  if (!defenderRuntime || !isInPlayZone(defenderRuntime.zoneID)) {
    return false;
  }

  const defenderDef = defenderRuntime.definition;
  if (!(isCharacterCard(defenderDef) || isLocationCard(defenderDef))) {
    return false;
  }

  if (cantBeChallenged(ctx, defenderId)) {
    return false;
  }

  const defenderOwnerId = defenderRuntime.ownerID as PlayerId;
  if (
    violatesBodyguardIfAbleRestriction(ctx, attackerId, defenderDef, defenderId, defenderOwnerId)
  ) {
    return false;
  }

  if (isCharacterCard(defenderDef)) {
    const defenderMeta = getCardMeta(ctx, defenderId);
    if (
      defenderMeta.state !== "exerted" &&
      !canChallengeReadyCharacters(ctx, attackerId, defenderId)
    ) {
      return false;
    }
  }

  if (
    hasKeywordIncludingTemporary(ctx, defenderId, "Evasive") &&
    !canChallengeEvasive(ctx, attackerId)
  ) {
    return false;
  }

  return true;
}

export function getLegalChallengeDefendersForAttacker(
  ctx: ChallengeIntentContext,
  attackerId: CardInstanceId,
): CardInstanceId[] {
  return getOpposingCardsInPlay(ctx)
    .filter((cardId) => {
      const runtimeCard = getCardsApi(ctx).get(cardId);
      return Boolean(runtimeCard && isInPlayZone(runtimeCard.zoneID));
    })
    .filter((defenderId) => isLegalDefenderForAttacker(ctx, attackerId, defenderId));
}

export function getEligibleChallengeAttackers(ctx: ChallengeIntentContext): CardInstanceId[] {
  return getControlledCardsInPlay(ctx)
    .filter((cardId) => {
      const runtimeCard = getCardsApi(ctx).get(cardId);
      return Boolean(runtimeCard && isInPlayZone(runtimeCard.zoneID));
    })
    .filter((cardId) => {
      const cardDef = getCardDefinition(ctx, cardId);
      return Boolean(cardDef && isCharacterCard(cardDef));
    })
    .filter((cardId) => isChallengeReadyAttacker(ctx, cardId))
    .filter((cardId) => getLegalChallengeDefendersForAttacker(ctx, cardId).length > 0);
}

function createFailure(
  error: string,
  errorCode: string,
): Extract<RuntimeValidationResult, { valid: false }> {
  return {
    valid: false,
    error,
    errorCode,
  };
}

export function validateChallengeAction(ctx: ChallengeValidationContext): RuntimeValidationResult {
  const { attackerId, defenderId } = ctx.args;
  const isPreflight = ctx.validationMode === "preflight";

  const controlledCardsInPlay = getControlledCardsInPlay(ctx);
  if (!controlledCardsInPlay.includes(attackerId)) {
    return createFailure("Attacker not in your play zone", "ATTACKER_NOT_IN_PLAY");
  }

  const attackerDef = getCardDefinition(ctx, attackerId);
  if (!attackerDef || !isCharacterCard(attackerDef)) {
    return createFailure("Only characters can challenge", "ATTACKER_NOT_CHARACTER");
  }

  const attackerMeta = getCardMeta(ctx, attackerId);
  if (!isReady(attackerMeta)) {
    return createFailure("Attacker is exerted", "ATTACKER_EXERTED");
  }

  const currentTurn = getCurrentTurn(ctx);
  const attackerControllerId = getCardsApi(ctx).require(attackerId).controllerID as
    | PlayerId
    | undefined;
  if (
    attackerControllerId &&
    hasTemporaryPlayerRestriction(
      ctx.G.temporaryPlayerRestrictions,
      attackerControllerId,
      currentTurn,
      "cant-challenge",
    )
  ) {
    return createFailure("Attacker cannot challenge", "ATTACKER_CANT_CHALLENGE");
  }

  if (
    hasTemporaryRestriction(attackerMeta, currentTurn, "cant-challenge", {
      isSourceInPlay: (sourceId) => isCardStillInPlay(ctx, sourceId),
    })
  ) {
    return createFailure("Attacker cannot challenge", "ATTACKER_CANT_CHALLENGE");
  }

  if (
    hasStaticCardRestriction({
      state: ctx.framework.state,
      cardId: attackerId,
      restriction: "cant-challenge",
      getDefinitionByInstanceId: (instanceId) => getCardDefinition(ctx, instanceId),
    })
  ) {
    return createFailure("Attacker cannot challenge", "ATTACKER_CANT_CHALLENGE");
  }

  if (
    attackerControllerId &&
    hasStaticPlayerRestriction({
      state: ctx.framework.state,
      playerId: attackerControllerId,
      restriction: "cant-challenge",
      getDefinitionByInstanceId: (instanceId) => getCardDefinition(ctx, instanceId),
    })
  ) {
    return createFailure("Attacker cannot challenge", "ATTACKER_CANT_CHALLENGE");
  }

  if (attackerMeta.isDrying === true && !hasRushForChallenge(ctx, attackerId)) {
    return createFailure("Attacker is drying and does not have Rush", "ATTACKER_DRYING");
  }

  if (hasExceededChallengeLimit(ctx, attackerId)) {
    return createFailure(
      "Challenge limit reached: only one character can challenge this turn",
      "CHALLENGE_LIMIT_REACHED",
    );
  }

  if (isPreflight && !defenderId) {
    return { valid: true };
  }

  const opposingCardsInPlay = getOpposingCardsInPlay(ctx);
  if (!opposingCardsInPlay.includes(defenderId)) {
    return createFailure("Defender not in an opponent's play zone", "DEFENDER_NOT_IN_PLAY");
  }

  const defenderRuntime = getCardsApi(ctx).get(defenderId);
  if (!defenderRuntime || !isInPlayZone(defenderRuntime.zoneID)) {
    return createFailure("Defender not in play", "DEFENDER_NOT_IN_PLAY");
  }

  const defenderDef = defenderRuntime.definition;
  if (!(isCharacterCard(defenderDef) || isLocationCard(defenderDef))) {
    return createFailure(
      "Defender must be an opposing character or location",
      "DEFENDER_INVALID_TYPE",
    );
  }

  if (cantBeChallenged(ctx, defenderId, attackerId)) {
    return createFailure("Defender can't be challenged", "DEFENDER_CANT_BE_CHALLENGED");
  }

  if (isCharacterCard(defenderDef)) {
    const defenderMeta = getCardMeta(ctx, defenderId);
    if (
      defenderMeta.state !== "exerted" &&
      !canChallengeReadyCharacters(ctx, attackerId, defenderId)
    ) {
      return createFailure("Defending character must be exerted", "DEFENDER_CHARACTER_NOT_EXERTED");
    }
  }

  if (
    hasKeywordIncludingTemporary(ctx, defenderId, "Evasive") &&
    !canChallengeEvasive(ctx, attackerId)
  ) {
    return createFailure(
      "Defender has Evasive and attacker cannot challenge Evasive characters",
      "DEFENDER_EVASIVE_RESTRICTION",
    );
  }

  const defenderOwnerId = defenderRuntime.ownerID as PlayerId;
  if (
    violatesBodyguardIfAbleRestriction(ctx, attackerId, defenderDef, defenderId, defenderOwnerId)
  ) {
    return createFailure(
      "A Bodyguard character must be challenged if able",
      "DEFENDER_BODYGUARD_RESTRICTION",
    );
  }

  return { valid: true };
}

function resolveConditionalKeywordValueTODO(
  _cardDef: CharacterCard | LocationCard,
  _keyword: "Challenger" | "Resist",
): number {
  // TODO: integrate condition-aware keyword evaluation (conditional Challenger/Resist from
  // ability conditions).
  return 0;
}

function resolveDynamicCombatModifierTODO(_cardId: CardInstanceId): {
  strengthModifier: number;
  damageIncrease: number;
  damageReduction: number;
} {
  // TODO: integrate dynamic non-keyword combat modifiers from continuous/replacement effects.
  return {
    strengthModifier: 0,
    damageIncrease: 0,
    damageReduction: 0,
  };
}

function resolveChallengeStrength(
  ctx: ChallengeCardStateContext,
  card: RuntimeLorcanaCardWithDerived,
  challenging: boolean,
  challengeContext?: { attackerId: CardInstanceId; defenderId: CardInstanceId },
): number {
  const cardDef = card.definition;
  if (!isCharacterCard(cardDef)) {
    return 0;
  }

  // Build a challenge-aware G so that "while being challenged/challenging" static
  // conditions (type: "in-challenge") resolve correctly during strength projection.
  let projectionG = ctx.G;
  if (challengeContext) {
    const attackerEntry =
      ctx.framework.state._zonesPrivate?.cardIndex?.[challengeContext.attackerId];
    const defenderEntry =
      ctx.framework.state._zonesPrivate?.cardIndex?.[challengeContext.defenderId];
    const syntheticChallengeState: ChallengeState = {
      attacker: challengeContext.attackerId,
      defender: challengeContext.defenderId,
      attackerOwnerId: (attackerEntry?.controllerID ?? attackerEntry?.ownerID ?? "") as PlayerId,
      defenderOwnerId: (defenderEntry?.controllerID ?? defenderEntry?.ownerID ?? "") as PlayerId,
      stage: "damage",
    };
    projectionG = { ...ctx.G, challengeState: syntheticChallengeState };
  }

  const derived = projectLorcanaCardDerived({
    definition: card.definition,
    meta: card.meta,
    state: createProjectionState(ctx.framework.state, projectionG),
    cardInstanceId: card.instanceId as CardInstanceId,
    ownerID: card.ownerID as PlayerId,
    controllerID: card.controllerID as PlayerId,
    zoneID: card.zoneID,
    getDefinitionByInstanceId: (instanceId) => getCardDefinition(ctx, instanceId),
  });
  const challengerBonus = challenging ? (derived.keywordValues?.challenger ?? 0) : 0;

  const dynamic = resolveDynamicCombatModifierTODO(card.instanceId as CardInstanceId);
  // Use derived.strength (which includes static modify-stat effects with in-challenge
  // conditions evaluated against the synthetic challengeState) instead of the
  // pre-projected card strength to correctly handle "while being challenged" bonuses.
  const baseStrength = derived.strength ?? (card as LorcanaRuntimeCard).strength;
  const totalStrength = baseStrength + challengerBonus + dynamic.strengthModifier;

  return Math.max(0, totalStrength);
}

function reduceDamageByResist(
  ctx: ChallengeCardStateContext,
  targetId: CardInstanceId,
  targetDef: CharacterCard | LocationCard,
  incomingDamage: number,
): number {
  const dynamic = resolveDynamicCombatModifierTODO(targetId);
  const runtimeCard = getCardsApi(ctx).require(targetId);
  const derived = projectLorcanaCardDerived({
    definition: runtimeCard.definition,
    meta: runtimeCard.meta,
    state: createProjectionState(ctx.framework.state, ctx.G),
    cardInstanceId: targetId,
    ownerID: runtimeCard.ownerID as PlayerId,
    controllerID: runtimeCard.controllerID as PlayerId,
    zoneID: runtimeCard.zoneID,
    getDefinitionByInstanceId: (instanceId) => getCardDefinition(ctx, instanceId),
  });
  const resistValue = (derived.keywordValues?.resist ?? 0) + dynamic.damageReduction;

  const reduced = incomingDamage + dynamic.damageIncrease - Math.max(0, resistValue);
  return Math.max(0, reduced);
}

export function finalizeChallengeDamageAmount(
  ctx: ChallengeCardStateContext,
  targetId: CardInstanceId,
  targetDef: CharacterCard | LocationCard,
  incomingDamage: number,
  opponentCardId?: CardInstanceId,
): number {
  const reduced = reduceDamageByResist(ctx, targetId, targetDef, incomingDamage);
  if (takesNoDamageFromChallenges(ctx, targetId, opponentCardId)) {
    return 0;
  }

  return reduced;
}

export interface ChallengeDamageResult {
  rawAttackerToDefenderDamage: number;
  rawDefenderToAttackerDamage: number;
  attackerToDefenderDamage: number;
  defenderToAttackerDamage: number;
  attackerCurrentDamage: number;
  defenderCurrentDamage: number;
  attackerNextDamage: number;
  defenderNextDamage: number;
  attackerWillpower: number;
  defenderWillpower: number;
  attackerLethal: boolean;
  defenderLethal: boolean;
  attackerDefinition: CharacterCard;
  defenderDefinition: CharacterCard | LocationCard;
}

export function computeChallengeDamageResult(
  ctx: ChallengeCardStateContext,
  attackerId: CardInstanceId,
  defenderId: CardInstanceId,
): ChallengeDamageResult {
  const attackerRuntime = getCardsApi(ctx).get(attackerId);
  const defenderRuntime = getCardsApi(ctx).get(defenderId);
  const attackerDef = attackerRuntime?.definition;
  const defenderDef = defenderRuntime?.definition;

  if (!attackerDef || !isCharacterCard(attackerDef)) {
    throw new Error(`Invalid challenge attacker '${attackerId}': expected a character in play`);
  }
  if (!defenderDef || !(isCharacterCard(defenderDef) || isLocationCard(defenderDef))) {
    throw new Error(
      `Invalid challenge defender '${defenderId}': expected an opposing character or location`,
    );
  }

  const attackerMeta = getCardMeta(ctx, attackerId);
  const defenderMeta = getCardMeta(ctx, defenderId);

  const attackerCurrentDamage = Number(attackerMeta.damage ?? 0);
  const defenderCurrentDamage = Number(defenderMeta.damage ?? 0);

  if (!attackerRuntime || !defenderRuntime) {
    throw new Error("Challenge combatants are unavailable in runtime card query");
  }

  const challengeContext = { attackerId, defenderId };
  const attackerStrength = resolveChallengeStrength(ctx, attackerRuntime, true, challengeContext);
  const defenderStrength = isCharacterCard(defenderDef)
    ? resolveChallengeStrength(ctx, defenderRuntime, false, challengeContext)
    : 0;

  const rawAttackerToDefenderDamage = attackerStrength;
  const rawDefenderToAttackerDamage = isCharacterCard(defenderDef) ? defenderStrength : 0;
  const attackerToDefenderDamage = finalizeChallengeDamageAmount(
    ctx,
    defenderId,
    defenderDef,
    rawAttackerToDefenderDamage,
  );
  const defenderToAttackerDamage = isCharacterCard(defenderDef)
    ? finalizeChallengeDamageAmount(ctx, attackerId, attackerDef, rawDefenderToAttackerDamage)
    : 0;

  const attackerNextDamage = attackerCurrentDamage + defenderToAttackerDamage;
  const defenderNextDamage = defenderCurrentDamage + attackerToDefenderDamage;

  const attackerWillpower = (attackerRuntime as LorcanaRuntimeCard).willpower;
  const defenderWillpower = (defenderRuntime as LorcanaRuntimeCard).willpower;

  const attackerLethal = attackerWillpower > 0 && attackerNextDamage >= attackerWillpower;
  const defenderLethal = defenderWillpower > 0 && defenderNextDamage >= defenderWillpower;

  return {
    rawAttackerToDefenderDamage,
    rawDefenderToAttackerDamage,
    attackerToDefenderDamage,
    defenderToAttackerDamage,
    attackerCurrentDamage,
    defenderCurrentDamage,
    attackerNextDamage,
    defenderNextDamage,
    attackerWillpower,
    defenderWillpower,
    attackerLethal,
    defenderLethal,
    attackerDefinition: attackerDef,
    defenderDefinition: defenderDef,
  };
}
