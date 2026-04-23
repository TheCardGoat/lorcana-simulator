import type { CardInstanceId, PlayerId, RuntimeCardWithDefinition } from "#core";
import { isClassification, type Classification } from "@tcg/lorcana-types";
import type { LorcanaCardDerived } from "../../../types/projected-board";
import { createLorcanaLogProjection, type LorcanaMoveDefinition } from "../../../types";

type LorcanaRuntimeCard = RuntimeCardWithDefinition & LorcanaCardDerived;
import {
  CHALLENGE_DEFENDER_TARGET_DSL,
  computeChallengeDamageResult,
  finalizeChallengeDamageAmount,
  getEligibleChallengeAttackers,
  getLegalChallengeDefendersForAttacker,
  validateChallengeAction,
} from "../../rules/challenge-rules";
import { moveCardOutOfPlayWithStack, getCharacterIdsAtLocation } from "../../state/shift-stack";
import {
  EFFECT_PENDING_ERROR_CODE,
  hasPendingActionEffectResolution,
} from "../../resolution/action-effects/pending-action-effects";
import {
  recordBanishedCharacterThisTurn,
  recordBanishedCharacterInChallengeThisTurn,
  recordChallengeByPlayerThisTurn,
  recordChallengedCharacterThisTurn,
  recordDamagedCharacterThisTurn,
} from "../../state/turn-metrics";
import { hasTemporaryAbility as hasTempAbility } from "../../effects/temporary-effects";
import { applyReplacementEffects } from "../../effects/replacement-effects";
import {
  emitTriggeredLorcanaEvent,
  finalizeResolutionBoundary,
  hasPendingBagItems,
  openWindow,
  snapshotTriggeredCandidatesForCard,
} from "../../effects/triggered-abilities";
import { projectLorcanaCardDerived } from "../../../projection/card-derived";
import { createProjectionState } from "../../../rules/derived-state";
import { getKeywordsBeforeBanish } from "../../shared/banish-snapshot";
import { hasStaticCardRestriction } from "../../rules/static-ability-utils";
import { buildStaticEffectRegistry } from "../../../rules/static-effect-registry";
import type { StaticEffectRegistry } from "../../../rules/static-effect-registry";
import { sweepLethalDamageInPlay } from "../../state/lethal-damage-sweep";

type ChallengeExecutionContext = Parameters<LorcanaMoveDefinition<"challenge">["execute"]>[0];
type ChallengeContinuationContext = Pick<ChallengeExecutionContext, "G" | "framework" | "cards">;

function consumeTemporaryAbility(
  ctx: {
    cards: {
      require: (id: CardInstanceId) => { meta?: Record<string, unknown> };
      patchMeta: (id: CardInstanceId, patch: Record<string, unknown>) => void;
    };
  },
  cardId: CardInstanceId,
  ability: string,
): void {
  const card = ctx.cards.require(cardId);
  const currentMeta = card.meta ?? {};
  const temporaryAbilities: Record<string, unknown> = {
    ...(currentMeta.temporaryAbilities as Record<string, unknown> | undefined),
  };
  const temporaryAbilityStarts: Record<string, unknown> = {
    ...(currentMeta.temporaryAbilityStarts as Record<string, unknown> | undefined),
  };
  const temporaryAbilityPayloads: Record<string, unknown> = {
    ...(currentMeta.temporaryAbilityPayloads as Record<string, unknown> | undefined),
  };

  delete temporaryAbilities[ability];
  delete temporaryAbilityStarts[ability];
  delete temporaryAbilityPayloads[ability];

  ctx.cards.patchMeta(cardId, {
    temporaryAbilities: Object.keys(temporaryAbilities).length > 0 ? temporaryAbilities : undefined,
    temporaryAbilityStarts:
      Object.keys(temporaryAbilityStarts).length > 0 ? temporaryAbilityStarts : undefined,
    temporaryAbilityPayloads:
      Object.keys(temporaryAbilityPayloads).length > 0 ? temporaryAbilityPayloads : undefined,
  });
}

function shouldReturnToHandWhenBanishedInChallenge(
  ctx: ChallengeContinuationContext,
  cardId: CardInstanceId,
): boolean {
  const currentTurn = ctx.framework.state.status.turn ?? 1;
  const cardMeta = ctx.cards.require(cardId).meta;
  return hasTempAbility(cardMeta, currentTurn, "return-to-hand-when-banished");
}

function isCardStillInPlay(ctx: ChallengeContinuationContext, cardId: CardInstanceId): boolean {
  const zoneKey = ctx.framework.zones.getCardZone(cardId);
  return typeof zoneKey === "string" && (zoneKey === "play" || zoneKey.startsWith("play:"));
}

function getClassificationsBeforeBanish(
  ctx: ChallengeContinuationContext,
  cardId: CardInstanceId,
  actorPlayerId: PlayerId,
  registry: StaticEffectRegistry,
): Classification[] | undefined {
  const definition = ctx.cards.getDefinition(cardId);
  const ownerID = ctx.cards.require(cardId).ownerID as PlayerId | undefined;
  if (!definition || !ownerID) {
    return undefined;
  }

  const projected = projectLorcanaCardDerived({
    definition,
    meta: ctx.cards.require(cardId).meta ?? {},
    state: createProjectionState(ctx.framework.state, ctx.G),
    cardInstanceId: cardId,
    ownerID,
    controllerID:
      (ctx.framework.zones.getCardController(cardId) as PlayerId | undefined) ?? ownerID,
    zoneID: ctx.framework.zones.getCardZone(cardId),
    actorPlayerId,
    getDefinitionByInstanceId: (id) => ctx.cards.getDefinition(id),
    registry,
  });

  return Array.isArray(projected.classifications)
    ? projected.classifications.filter(isClassification)
    : undefined;
}

function resolveChallengeDamage(
  ctx: ChallengeContinuationContext,
  state: NonNullable<ChallengeContinuationContext["G"]["challengeState"]>,
): void {
  const { attacker: attackerId, defender: defenderId, attackerOwnerId, defenderOwnerId } = state;
  const getDefinitionByInstanceId = (cardId: CardInstanceId) => ctx.cards.getDefinition(cardId);
  // ctx.G.challengeState is set at this point; build fresh so in-challenge conditions resolve.
  const registry = buildStaticEffectRegistry(
    createProjectionState(ctx.framework.state, ctx.G),
    getDefinitionByInstanceId,
  );
  if (!isCardStillInPlay(ctx, attackerId) || !isCardStillInPlay(ctx, defenderId)) {
    return;
  }

  const damageResult = computeChallengeDamageResult(
    ctx as ChallengeExecutionContext,
    attackerId,
    defenderId,
  );

  const defenderMeta = ctx.cards.require(defenderId).meta ?? {};
  const attackerMeta = ctx.cards.require(attackerId).meta ?? {};
  const currentTurn = ctx.framework.state.status.turn ?? 1;
  const attackerHasGainTwoLoreOnBanish = hasTempAbility(
    attackerMeta,
    currentTurn,
    "gain-2-lore-on-banish-in-challenge",
  );
  const defenderHasGainTwoLoreOnBanish = hasTempAbility(
    defenderMeta,
    currentTurn,
    "gain-2-lore-on-banish-in-challenge",
  );
  const defenderEvent = applyReplacementEffects(ctx, {
    kind: "challenge-damage",
    eventId: `challenge-damage:${attackerId}:${defenderId}:defender`,
    sourceId: attackerId,
    controllerId: attackerOwnerId,
    attackerId,
    defenderId,
    targetId: defenderId,
    amount: damageResult.rawAttackerToDefenderDamage,
  });
  const attackerEvent = applyReplacementEffects(ctx, {
    kind: "challenge-damage",
    eventId: `challenge-damage:${attackerId}:${defenderId}:attacker`,
    sourceId: defenderId,
    controllerId: defenderOwnerId,
    attackerId,
    defenderId,
    targetId: attackerId,
    amount: damageResult.rawDefenderToAttackerDamage,
  });
  const finalDefenderTargetId = defenderEvent.targetId;
  const finalAttackerTargetId = attackerEvent.targetId;
  const finalDefenderTargetDef = ctx.cards.getDefinition(finalDefenderTargetId) as
    | typeof damageResult.defenderDefinition
    | typeof damageResult.attackerDefinition;
  const finalAttackerTargetDef = ctx.cards.getDefinition(finalAttackerTargetId) as
    | typeof damageResult.defenderDefinition
    | typeof damageResult.attackerDefinition;

  const attackerToDefenderDamage =
    finalDefenderTargetDef &&
    "cardType" in finalDefenderTargetDef &&
    (finalDefenderTargetDef.cardType === "character" ||
      finalDefenderTargetDef.cardType === "location")
      ? finalizeChallengeDamageAmount(
          ctx,
          finalDefenderTargetId,
          finalDefenderTargetDef,
          defenderEvent.amount,
          attackerId,
          registry,
        )
      : 0;
  const defenderToAttackerDamage =
    finalAttackerTargetDef &&
    "cardType" in finalAttackerTargetDef &&
    (finalAttackerTargetDef.cardType === "character" ||
      finalAttackerTargetDef.cardType === "location")
      ? finalizeChallengeDamageAmount(
          ctx,
          finalAttackerTargetId,
          finalAttackerTargetDef,
          attackerEvent.amount,
          defenderId,
          registry,
        )
      : 0;

  // Check for "cant-be-dealt-damage" static restriction on targets
  const defenderHasDamageRestriction = hasStaticCardRestriction({
    state: ctx.framework.state as Parameters<typeof hasStaticCardRestriction>[0]["state"],
    cardId: finalDefenderTargetId,
    restriction: "cant-be-dealt-damage",
    registry,
  });
  const attackerHasDamageRestriction = hasStaticCardRestriction({
    state: ctx.framework.state as Parameters<typeof hasStaticCardRestriction>[0]["state"],
    cardId: finalAttackerTargetId,
    restriction: "cant-be-dealt-damage",
    registry,
  });

  const effectiveAttackerToDefenderDamage = defenderHasDamageRestriction
    ? 0
    : attackerToDefenderDamage;
  const effectiveDefenderToAttackerDamage = attackerHasDamageRestriction
    ? 0
    : defenderToAttackerDamage;

  const defenderCurrentDamage = Number(ctx.cards.require(finalDefenderTargetId).meta?.damage ?? 0);
  const attackerCurrentDamage = Number(ctx.cards.require(finalAttackerTargetId).meta?.damage ?? 0);
  const defenderNextDamage = defenderCurrentDamage + effectiveAttackerToDefenderDamage;
  const attackerNextDamage = attackerCurrentDamage + effectiveDefenderToAttackerDamage;

  if (effectiveAttackerToDefenderDamage > 0) {
    ctx.cards.patchMeta(finalDefenderTargetId, { damage: defenderNextDamage });
    recordDamagedCharacterThisTurn(ctx, finalDefenderTargetId);
    emitTriggeredLorcanaEvent(
      ctx,
      "damageDealt",
      {
        targetId: finalDefenderTargetId,
        amount: effectiveAttackerToDefenderDamage,
        newDamage: defenderNextDamage,
        sourceId: attackerId,
        damageType: "combat",
      },
      [
        {
          event: "damage",
          subjectCardId: finalDefenderTargetId,
          triggerSourceCardId: attackerId,
          playerId: defenderOwnerId,
          attackerId,
          defenderId,
          happenedInChallenge: true,
          eventSnapshot: {
            triggerAmount: effectiveAttackerToDefenderDamage,
            damageDealt: effectiveAttackerToDefenderDamage,
          },
        },
        {
          event: "deal-damage",
          subjectCardId: attackerId,
          triggerSourceCardId: attackerId,
          playerId: attackerOwnerId,
          attackerId,
          defenderId,
          happenedInChallenge: true,
          eventSnapshot: {
            triggerAmount: effectiveAttackerToDefenderDamage,
            damageDealt: effectiveAttackerToDefenderDamage,
          },
        },
      ],
    );
  }

  if (effectiveDefenderToAttackerDamage > 0) {
    ctx.cards.patchMeta(finalAttackerTargetId, { damage: attackerNextDamage });
    recordDamagedCharacterThisTurn(ctx, finalAttackerTargetId);
    emitTriggeredLorcanaEvent(
      ctx,
      "damageDealt",
      {
        targetId: finalAttackerTargetId,
        amount: effectiveDefenderToAttackerDamage,
        newDamage: attackerNextDamage,
        sourceId: defenderId,
        damageType: "combat",
      },
      [
        {
          event: "damage",
          subjectCardId: finalAttackerTargetId,
          triggerSourceCardId: defenderId,
          playerId: attackerOwnerId,
          attackerId,
          defenderId,
          happenedInChallenge: true,
          eventSnapshot: {
            triggerAmount: effectiveDefenderToAttackerDamage,
            damageDealt: effectiveDefenderToAttackerDamage,
          },
        },
        {
          event: "deal-damage",
          subjectCardId: defenderId,
          triggerSourceCardId: defenderId,
          playerId: defenderOwnerId,
          attackerId,
          defenderId,
          happenedInChallenge: true,
          eventSnapshot: {
            triggerAmount: effectiveDefenderToAttackerDamage,
            damageDealt: effectiveDefenderToAttackerDamage,
          },
        },
      ],
    );
  }

  const finalDefenderWillpower = (ctx.cards.require(finalDefenderTargetId) as LorcanaRuntimeCard)
    .willpower;
  const finalAttackerWillpower = (ctx.cards.require(finalAttackerTargetId) as LorcanaRuntimeCard)
    .willpower;
  const defenderLethal = finalDefenderWillpower > 0 && defenderNextDamage >= finalDefenderWillpower;
  const attackerLethal = finalAttackerWillpower > 0 && attackerNextDamage >= finalAttackerWillpower;

  // Snapshot trigger candidates for banish-in-challenge events before any cards leave play.
  // In mutual kills, both cards are moved to discard before buffered events are processed,
  // so the snapshot preserves trigger candidates that would otherwise be lost.
  const attackerBanishInChallengeCandidates = defenderLethal
    ? snapshotTriggeredCandidatesForCard(ctx, attackerId)
    : undefined;
  const defenderBanishInChallengeCandidates = attackerLethal
    ? snapshotTriggeredCandidatesForCard(ctx, defenderId)
    : undefined;

  if (defenderLethal) {
    const finalDefenderMeta = ctx.cards.require(finalDefenderTargetId).meta ?? {};
    const defenderSubjectAtLocationId = finalDefenderMeta.atLocationId as
      | CardInstanceId
      | undefined;
    const defenderClassificationsBeforeBanish = getClassificationsBeforeBanish(
      ctx,
      finalDefenderTargetId,
      attackerOwnerId,
      registry,
    );
    const defenderKeywordsBeforeBanish = getKeywordsBeforeBanish(
      ctx,
      finalDefenderTargetId,
      attackerOwnerId,
    );
    const defenderStrengthBeforeBanish = (
      ctx.cards.require(finalDefenderTargetId) as LorcanaRuntimeCard
    ).strength;
    const defenderCardsUnderCountBeforeBanish = Array.isArray(finalDefenderMeta.cardsUnder)
      ? finalDefenderMeta.cardsUnder.length
      : 0;
    const defenderCardsUnderIdsBeforeBanish = Array.isArray(finalDefenderMeta.cardsUnder)
      ? [...finalDefenderMeta.cardsUnder]
      : [];
    const defenderDestinationZone = shouldReturnToHandWhenBanishedInChallenge(
      ctx,
      finalDefenderTargetId,
    )
      ? "hand"
      : "discard";
    const defenderTriggerCandidates = snapshotTriggeredCandidatesForCard(
      ctx,
      finalDefenderTargetId,
    );
    const defenderCharsAtLocation =
      finalDefenderTargetDef?.cardType === "location"
        ? getCharacterIdsAtLocation(ctx, finalDefenderTargetId)
        : undefined;
    moveCardOutOfPlayWithStack(ctx, finalDefenderTargetId, {
      zone: defenderDestinationZone,
      playerId: ctx.cards.require(finalDefenderTargetId).ownerID as PlayerId,
    });
    emitTriggeredLorcanaEvent(
      ctx,
      "cardBanished",
      {
        cardId: finalDefenderTargetId,
        sourceId: attackerToDefenderDamage > 0 ? attackerId : null,
        snapshot: {
          cardsUnderCountBeforeBanish: defenderCardsUnderCountBeforeBanish,
          classificationsBeforeBanish: defenderClassificationsBeforeBanish,
          damageDealt: attackerToDefenderDamage,
          keywordsBeforeBanish: defenderKeywordsBeforeBanish,
          subjectAtLocationId: defenderSubjectAtLocationId,
          strengthBeforeBanish:
            typeof defenderStrengthBeforeBanish === "number" &&
            Number.isFinite(defenderStrengthBeforeBanish)
              ? defenderStrengthBeforeBanish
              : undefined,
        },
        reason: "lethal damage from challenge",
      },
      [
        ...(finalDefenderTargetId === defenderId
          ? [
              {
                event: "challenged-and-banished" as const,
                playerId: ctx.cards.require(finalDefenderTargetId).ownerID as PlayerId,
                subjectCardId: finalDefenderTargetId,
                triggerSourceCardId: finalDefenderTargetId,
                attackerId,
                defenderId,
                happenedInChallenge: true,
                triggerCandidates: defenderTriggerCandidates,
                eventSnapshot: {
                  classificationsBeforeBanish: defenderClassificationsBeforeBanish,
                  cardsUnderCountBeforeBanish: defenderCardsUnderCountBeforeBanish,
                  cardsUnderIdsBeforeBanish: defenderCardsUnderIdsBeforeBanish,
                  keywordsBeforeBanish: defenderKeywordsBeforeBanish,
                  subjectAtLocationId: defenderSubjectAtLocationId,
                  charactersAtSourceLocationBeforeBanish: defenderCharsAtLocation,
                },
              },
            ]
          : []),
        {
          event: "banish",
          playerId: ctx.cards.require(finalDefenderTargetId).ownerID as PlayerId,
          subjectCardId: finalDefenderTargetId,
          triggerSourceCardId: finalDefenderTargetId,
          attackerId,
          defenderId,
          happenedInChallenge: true,
          triggerCandidates: [
            ...(defenderTriggerCandidates ?? []),
            ...(attackerBanishInChallengeCandidates ?? []),
          ],
          eventSnapshot: {
            classificationsBeforeBanish: defenderClassificationsBeforeBanish,
            cardsUnderCountBeforeBanish: defenderCardsUnderCountBeforeBanish,
            cardsUnderIdsBeforeBanish: defenderCardsUnderIdsBeforeBanish,
            keywordsBeforeBanish: defenderKeywordsBeforeBanish,
            subjectAtLocationId: defenderSubjectAtLocationId,
            charactersAtSourceLocationBeforeBanish: defenderCharsAtLocation,
          },
        },
        ...(attackerToDefenderDamage > 0 && finalDefenderTargetDef?.cardType === "character"
          ? [
              {
                event: "banish-in-challenge" as const,
                playerId: attackerOwnerId,
                subjectCardId: attackerId,
                triggerSourceCardId: finalDefenderTargetId,
                attackerId,
                defenderId,
                happenedInChallenge: true,
                triggerCandidates: attackerBanishInChallengeCandidates,
              },
            ]
          : []),
      ],
    );
    recordBanishedCharacterThisTurn(ctx, finalDefenderTargetId);
    recordBanishedCharacterInChallengeThisTurn(ctx, finalDefenderTargetId);

    if (
      attackerHasGainTwoLoreOnBanish &&
      attackerToDefenderDamage > 0 &&
      finalDefenderTargetDef?.cardType === "character"
    ) {
      ctx.G.lore[attackerOwnerId] = Number(ctx.G.lore[attackerOwnerId] ?? 0) + 2;
    }
  }

  if (attackerLethal) {
    const finalAttackerMeta = ctx.cards.require(finalAttackerTargetId).meta ?? {};
    const attackerSubjectAtLocationId = finalAttackerMeta.atLocationId as
      | CardInstanceId
      | undefined;
    const attackerClassificationsBeforeBanish = getClassificationsBeforeBanish(
      ctx,
      finalAttackerTargetId,
      defenderOwnerId,
      registry,
    );
    const attackerKeywordsBeforeBanish = getKeywordsBeforeBanish(
      ctx,
      finalAttackerTargetId,
      defenderOwnerId,
    );
    const attackerStrengthBeforeBanish = (
      ctx.cards.require(finalAttackerTargetId) as LorcanaRuntimeCard
    ).strength;
    const attackerCardsUnderCountBeforeBanish = Array.isArray(finalAttackerMeta.cardsUnder)
      ? finalAttackerMeta.cardsUnder.length
      : 0;
    const attackerCardsUnderIdsBeforeBanish = Array.isArray(finalAttackerMeta.cardsUnder)
      ? [...finalAttackerMeta.cardsUnder]
      : [];
    const attackerDestinationZone = shouldReturnToHandWhenBanishedInChallenge(
      ctx,
      finalAttackerTargetId,
    )
      ? "hand"
      : "discard";
    const attackerTriggerCandidates = snapshotTriggeredCandidatesForCard(
      ctx,
      finalAttackerTargetId,
    );
    const attackerCharsAtLocation =
      finalAttackerTargetDef?.cardType === "location"
        ? getCharacterIdsAtLocation(ctx, finalAttackerTargetId)
        : undefined;
    moveCardOutOfPlayWithStack(ctx, finalAttackerTargetId, {
      zone: attackerDestinationZone,
      playerId: ctx.cards.require(finalAttackerTargetId).ownerID as PlayerId,
    });
    emitTriggeredLorcanaEvent(
      ctx,
      "cardBanished",
      {
        cardId: finalAttackerTargetId,
        sourceId: defenderToAttackerDamage > 0 ? defenderId : null,
        snapshot: {
          cardsUnderCountBeforeBanish: attackerCardsUnderCountBeforeBanish,
          classificationsBeforeBanish: attackerClassificationsBeforeBanish,
          damageDealt: defenderToAttackerDamage,
          keywordsBeforeBanish: attackerKeywordsBeforeBanish,
          subjectAtLocationId: attackerSubjectAtLocationId,
          strengthBeforeBanish:
            typeof attackerStrengthBeforeBanish === "number" &&
            Number.isFinite(attackerStrengthBeforeBanish)
              ? attackerStrengthBeforeBanish
              : undefined,
        },
        reason: "lethal damage from challenge",
      },
      [
        {
          event: "banish",
          playerId: ctx.cards.require(finalAttackerTargetId).ownerID as PlayerId,
          subjectCardId: finalAttackerTargetId,
          triggerSourceCardId: finalAttackerTargetId,
          attackerId,
          defenderId,
          happenedInChallenge: true,
          triggerCandidates: attackerTriggerCandidates,
          eventSnapshot: {
            classificationsBeforeBanish: attackerClassificationsBeforeBanish,
            cardsUnderCountBeforeBanish: attackerCardsUnderCountBeforeBanish,
            cardsUnderIdsBeforeBanish: attackerCardsUnderIdsBeforeBanish,
            keywordsBeforeBanish: attackerKeywordsBeforeBanish,
            strengthBeforeBanish:
              typeof attackerStrengthBeforeBanish === "number" &&
              Number.isFinite(attackerStrengthBeforeBanish)
                ? attackerStrengthBeforeBanish
                : undefined,
            subjectAtLocationId: attackerSubjectAtLocationId,
            charactersAtSourceLocationBeforeBanish: attackerCharsAtLocation,
          },
        },
        ...(defenderToAttackerDamage > 0 && finalAttackerTargetDef?.cardType === "character"
          ? [
              {
                event: "banish-in-challenge" as const,
                playerId: defenderOwnerId,
                subjectCardId: defenderId,
                triggerSourceCardId: finalAttackerTargetId,
                attackerId,
                defenderId,
                happenedInChallenge: true,
                triggerCandidates: defenderBanishInChallengeCandidates,
              },
            ]
          : []),
      ],
    );
    recordBanishedCharacterThisTurn(ctx, finalAttackerTargetId);
    recordBanishedCharacterInChallengeThisTurn(ctx, finalAttackerTargetId);

    if (
      defenderHasGainTwoLoreOnBanish &&
      defenderToAttackerDamage > 0 &&
      finalAttackerTargetDef?.cardType === "character"
    ) {
      ctx.G.lore[defenderOwnerId] = Number(ctx.G.lore[defenderOwnerId] ?? 0) + 2;
    }
  }

  emitTriggeredLorcanaEvent(ctx, "challenged", {
    attackerId,
    defenderId,
    attackerDamage: defenderToAttackerDamage,
    defenderDamage: attackerToDefenderDamage,
  });

  // A banished character may have been a source of continuous static abilities
  // (e.g. +Willpower aura). Re-check all remaining cards for lethal damage.
  if (defenderLethal || attackerLethal) {
    const reasonCardId = defenderLethal ? defenderId : attackerId;
    sweepLethalDamageInPlay(
      {
        ...ctx,
        playerId: state.attackerOwnerId,
      },
      { reasonCardId },
    );
  }
}

export function continuePendingChallengeResolution(ctx: ChallengeContinuationContext): void {
  const challengeState = ctx.G.challengeState;
  if (!challengeState) {
    return;
  }

  if (challengeState.stage === "declaration") {
    ctx.G.challengeState = {
      ...challengeState,
      stage: "damage",
    };
    resolveChallengeDamage(ctx, ctx.G.challengeState);
    ctx.G.challengeState = {
      ...ctx.G.challengeState,
      stage: "post-damage",
    };
    openWindow(ctx, { window: "after-challenge" });
    finalizeResolutionBoundary(ctx, { window: "after-challenge" });
    if (hasPendingBagItems(ctx) || ctx.framework.state.priority.pendingChoice) {
      return;
    }
  }

  if (
    ctx.G.challengeState?.stage === "post-damage" &&
    !hasPendingBagItems(ctx) &&
    !ctx.framework.state.priority.pendingChoice &&
    (ctx.G.pendingEffects?.length ?? 0) === 0
  ) {
    ctx.G.challengeState = undefined;
  }
}

/**
 * Challenge with a character
 */
export const challenge: LorcanaMoveDefinition<"challenge"> = {
  validate: (ctx) => {
    if (hasPendingActionEffectResolution(ctx)) {
      return {
        valid: false,
        error: "Cannot challenge while an action effect is pending",
        errorCode: EFFECT_PENDING_ERROR_CODE,
      };
    }

    if (hasPendingBagItems(ctx)) {
      return {
        valid: false,
        error: "Cannot challenge while bag effects are pending",
        errorCode: "BAG_PENDING",
      };
    }

    return validateChallengeAction(ctx);
  },

  execute: (ctx) => {
    const { attackerId, defenderId } = ctx.args;
    const attackerOwnerId = (ctx.framework.state.currentPlayer ??
      ctx.playerId ??
      ctx.framework.state.priority.holder) as PlayerId | undefined;

    if (!attackerOwnerId) {
      throw new Error("Challenge execution requires an active player");
    }

    const defenderOwnerId = ctx.cards.require(defenderId).ownerID as PlayerId;
    recordChallengeByPlayerThisTurn(ctx, attackerOwnerId);
    recordChallengedCharacterThisTurn(ctx, defenderId);

    // CR 4.6.4.4 - exert the challenging character.
    ctx.cards.patchMeta(attackerId, { state: "exerted" });

    const currentTurn = ctx.framework.state.status.turn ?? 1;
    const attackerMetaAfterExert = ctx.cards.require(attackerId).meta;
    const defenderDefinition = ctx.cards.getDefinition(defenderId) as
      | { cardType?: string }
      | undefined;
    if (
      defenderDefinition?.cardType === "character" &&
      hasTempAbility(attackerMetaAfterExert, currentTurn, "gain-lore-when-challenging")
    ) {
      ctx.G.lore[attackerOwnerId] = Number(ctx.G.lore[attackerOwnerId] ?? 0) + 1;
      consumeTemporaryAbility(ctx, attackerId, "gain-lore-when-challenging");
    }

    ctx.G.challengeState = {
      attacker: attackerId,
      defender: defenderId,
      attackerOwnerId,
      defenderOwnerId,
      stage: "declaration",
    };
    ctx.framework.log(
      createLorcanaLogProjection(
        "lorcana.move.challenge",
        {
          playerId: attackerOwnerId,
          attackerId,
          defenderId,
        },
        { mode: "PUBLIC" },
        "action",
      ),
    );

    const attackerTriggerCandidatesDecl = snapshotTriggeredCandidatesForCard(ctx, attackerId);
    const defenderTriggerCandidatesDecl = snapshotTriggeredCandidatesForCard(ctx, defenderId);

    openWindow(ctx, {
      window: "challenge-declaration",
      events: [
        {
          event: "exert",
          playerId: attackerOwnerId,
          subjectCardId: attackerId,
          triggerCandidates: attackerTriggerCandidatesDecl,
        },
        {
          event: "challenge",
          playerId: attackerOwnerId,
          subjectCardId: attackerId,
          attackerId,
          defenderId,
          happenedInChallenge: true,
          triggerCandidates: attackerTriggerCandidatesDecl,
        },
        {
          event: "challenged",
          playerId: defenderOwnerId,
          subjectCardId: defenderId,
          attackerId,
          defenderId,
          happenedInChallenge: true,
          triggerCandidates: defenderTriggerCandidatesDecl,
        },
      ],
    });
    finalizeResolutionBoundary(ctx);
    if (hasPendingBagItems(ctx) || ctx.framework.state.priority.pendingChoice) {
      return;
    }

    continuePendingChallengeResolution(ctx);
  },

  available: (ctx) => {
    if (hasPendingActionEffectResolution(ctx)) {
      return false;
    }

    if (hasPendingBagItems(ctx)) {
      return false;
    }

    const eligibleAttackers = getEligibleChallengeAttackers(ctx);

    return eligibleAttackers.some(
      (attackerId) => getLegalChallengeDefendersForAttacker(ctx, attackerId).length > 0,
    );
  },
};
