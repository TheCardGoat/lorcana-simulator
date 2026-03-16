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
import { resolveCandidateTargets } from "../../targeting/runtime";
import type { LorcanaCardMeta, LorcanaG, LorcanaRuntimeMoveInputs } from "../../types";
import type { LorcanaRuntimeCardDerivedMethods } from "../state/runtime-card-derived";
import { hasStaticCardRestriction, hasStaticPlayerRestriction } from "./static-ability-utils";
import {
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
  LorcanaG,
  LorcanaCard,
  LorcanaRuntimeMoveInputs["challenge"],
  LorcanaRuntimeCardDerivedMethods
>;

export type ChallengeEnumerationContext = MoveEnumerationContext<
  LorcanaG,
  LorcanaCard,
  LorcanaRuntimeCardDerivedMethods
>;

export type ChallengeExecutionContext = MoveExecutionContext<
  LorcanaG,
  LorcanaCard,
  LorcanaRuntimeMoveInputs["challenge"],
  LorcanaRuntimeCardDerivedMethods
>;

type ChallengeIntentValidationContext = MoveValidationContext<
  LorcanaG,
  LorcanaCard,
  LorcanaRuntimeMoveInputs[keyof LorcanaRuntimeMoveInputs],
  LorcanaRuntimeCardDerivedMethods
>;

type ChallengeIntentContext = ChallengeIntentValidationContext | ChallengeEnumerationContext;

type ChallengeAnyContext = ChallengeIntentContext | ChallengeExecutionContext;
type ChallengeCardReadContext = { cards: unknown };
type ChallengeFrameworkReadContext = Pick<ChallengeAnyContext, "framework" | "G">;
type ChallengeCardStateContext = ChallengeCardReadContext & ChallengeFrameworkReadContext;

type RuntimeLorcanaCardWithDerived = RuntimeCardWithDefinition<
  LorcanaCard,
  LorcanaCardMeta,
  LorcanaRuntimeCardDerivedMethods
>;

function isCardStillInPlay(ctx: ChallengeAnyContext, sourceId: string): boolean {
  const zoneKey = ctx.framework.state.ctx.zones.private.cardIndex[sourceId]?.zoneKey;
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
  return ctx.framework.state.ctx.status.turn ?? 1;
}

function hasKeywordIncludingTemporary(
  ctx: ChallengeCardStateContext,
  cardId: CardInstanceId,
  keyword: string,
): boolean {
  const runtimeCard = getCardsApi(ctx).require(cardId);
  const derived = projectLorcanaCardDerived({
    definition: runtimeCard.definition,
    meta: runtimeCard.meta,
    state: {
      ctx: ctx.framework.state.ctx,
      G: ctx.G,
    },
    cardInstanceId: cardId,
    ownerID: runtimeCard.ownerID as PlayerId,
    controllerID: runtimeCard.controllerID as PlayerId,
    zoneID: runtimeCard.zoneID,
    getDefinitionByInstanceId: (instanceId) => getCardDefinition(ctx, instanceId),
  });

  return derived.keywords?.includes(keyword) ?? false;
}

function hasRushForChallenge(ctx: ChallengeAnyContext, cardId: CardInstanceId): boolean {
  return hasKeywordIncludingTemporary(ctx, cardId, "Rush");
}

function canChallengeReadyCharacters(
  ctx: ChallengeAnyContext,
  attackerId: CardInstanceId,
): boolean {
  const currentTurn = getCurrentTurn(ctx);
  const attackerMeta = getCardMeta(ctx, attackerId);
  return hasTemporaryAbility(attackerMeta, currentTurn, "can-challenge-ready");
}

function takesNoDamageFromChallenges(
  ctx: ChallengeCardStateContext,
  cardId: CardInstanceId,
): boolean {
  const currentTurn = getCurrentTurn(ctx);
  const cardMeta = getCardMeta(ctx, cardId);
  return hasTemporaryAbility(cardMeta, currentTurn, "takes-no-damage-from-challenges");
}

function cantBeChallenged(ctx: ChallengeAnyContext, cardId: CardInstanceId): boolean {
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

  return (
    hasTemporaryPlayerRestriction(
      ctx.G.temporaryPlayerRestrictions,
      ownerId,
      currentTurn,
      "cant-be-challenged",
    ) ||
    hasStaticCardRestriction({
      state: ctx.framework.state,
      cardId,
      restriction: "cant-be-challenged",
      getDefinitionByInstanceId: (instanceId) => getCardDefinition(ctx, instanceId),
    })
  );
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

  return true;
}

function getActingPlayerId(ctx: ChallengeIntentContext): PlayerId | undefined {
  const candidate =
    ctx.framework.state.currentPlayer ?? ctx.playerId ?? ctx.framework.state.ctx.priority.holder;
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
    if (defenderMeta.state !== "exerted" && !canChallengeReadyCharacters(ctx, attackerId)) {
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

  if (cantBeChallenged(ctx, defenderId)) {
    return createFailure("Defender can't be challenged", "DEFENDER_CANT_BE_CHALLENGED");
  }

  if (isCharacterCard(defenderDef)) {
    const defenderMeta = getCardMeta(ctx, defenderId);
    if (defenderMeta.state !== "exerted" && !canChallengeReadyCharacters(ctx, attackerId)) {
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
): number {
  const cardDef = card.definition;
  if (!isCharacterCard(cardDef)) {
    return 0;
  }

  const currentTurn = getCurrentTurn(ctx);
  const derived = projectLorcanaCardDerived({
    definition: card.definition,
    meta: card.meta,
    state: {
      ctx: ctx.framework.state.ctx,
      G: ctx.G,
    },
    cardInstanceId: card.instanceId as CardInstanceId,
    ownerID: card.ownerID as PlayerId,
    controllerID: card.controllerID as PlayerId,
    zoneID: card.zoneID,
    getDefinitionByInstanceId: (instanceId) => getCardDefinition(ctx, instanceId),
  });
  const challengerBonus = challenging ? (derived.keywordValues?.challenger ?? 0) : 0;

  const dynamic = resolveDynamicCombatModifierTODO(card.instanceId as CardInstanceId);
  const totalStrength = card.getStrength() + challengerBonus + dynamic.strengthModifier;

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
    state: {
      ctx: ctx.framework.state.ctx,
      G: ctx.G,
    },
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
): number {
  const reduced = reduceDamageByResist(ctx, targetId, targetDef, incomingDamage);
  if (takesNoDamageFromChallenges(ctx, targetId)) {
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

  const attackerStrength = resolveChallengeStrength(ctx, attackerRuntime, true);
  const defenderStrength = isCharacterCard(defenderDef)
    ? resolveChallengeStrength(ctx, defenderRuntime, false)
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

  const attackerWillpower = attackerRuntime.getWillpower();
  const defenderWillpower = defenderRuntime.getWillpower();

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
