// .agents/skills/lorcana-rules/SKILL.md
// .agents/skills/lorcana-rules/indexes/by-topic/turn-actions.md

import type {
  CardInstanceId,
  MoveEnumerationContext,
  MoveExecutionContext,
  MoveValidationContext,
  PlayerId,
  RuntimeValidationResult,
} from "#core";
import { getLoreValue, hasKeyword, isLocation } from "../../../card-utils";
import {
  createLorcanaLogMessage,
  type LorcanaCard,
  type LorcanaCardMeta,
  type LorcanaMoveDefinition,
  type LorcanaRuntimeMoveInputs,
  type PendingTurnTransitionState,
} from "../../../types";
import { getEligibleChallengeAttackers } from "../../rules/challenge-rules";
import {
  cleanupDanglingTargetEffects,
  cleanupExpiredEffects,
} from "../../effects/continuous-effects";
import type { LorcanaCardDerived } from "../../../types/projected-board";
import {
  emitTriggeredLorcanaEvent,
  finalizeResolutionBoundary,
  hasPendingBagItems,
  openWindow,
  pruneExpiredTriggerRegistrations,
} from "../../effects/triggered-abilities";
import {
  hasTemporaryKeyword,
  hasTemporaryPlayerRestriction,
  pruneExpiredTemporaryPlayerRestrictions,
  hasTemporaryRestriction,
  pruneExpiredTemporaryEffects,
} from "../../effects/temporary-effects";
import { pruneExpiredReplacementEffects } from "../../effects/replacement-effects";
import {
  hasStaticCardRestriction,
  hasStaticPlayerRestriction,
} from "../../rules/static-ability-utils";
import { recordCardDrawnThisTurn } from "../../state/turn-metrics";

type PassTurnExecutionContext = Pick<
  MoveExecutionContext<LorcanaRuntimeMoveInputs["passTurn"]>,
  "G" | "playerId" | "query" | "framework" | "cards"
>;

type PassTurnValidationContext = MoveValidationContext<LorcanaRuntimeMoveInputs["passTurn"]>;

type PassTurnEnumerationContext = MoveEnumerationContext;

type PassTurnIntentContext = PassTurnValidationContext | PassTurnEnumerationContext;

type PassTurnFailure = Extract<RuntimeValidationResult, { valid: false }>;

function isCardStillInPlay(ctx: PassTurnExecutionContext, sourceId: string): boolean {
  const zoneKey = ctx.framework.zones.getCardZone(sourceId);
  return typeof zoneKey === "string" && (zoneKey === "play" || zoneKey.startsWith("play:"));
}

export const PASS_TURN_STACK_PENDING_ERROR_CODE = "PASS_TURN_STACK_PENDING";
export const PASS_TURN_DECISION_PENDING_ERROR_CODE = "PASS_TURN_DECISION_PENDING";
export const PASS_TURN_RECKLESS_CHALLENGE_REQUIRED_ERROR_CODE =
  "PASS_TURN_RECKLESS_CHALLENGE_REQUIRED";

export type AdvanceTurnResult = {
  previousPlayer: PlayerId;
  nextPlayer: PlayerId;
  turnNumber: number;
};

function pruneExpiredTemporaryCardMeta(ctx: PassTurnExecutionContext, currentTurn: number): void {
  const cardMetaEntries = ctx.cards.entriesMeta();
  for (const [cardId, rawMeta] of cardMetaEntries) {
    const currentMeta = (rawMeta ?? {}) as LorcanaCardMeta;
    const prunedMeta = pruneExpiredTemporaryEffects(currentMeta, currentTurn);
    if (!prunedMeta || prunedMeta === currentMeta) {
      continue;
    }

    ctx.cards.setMeta(cardId as CardInstanceId, prunedMeta as Record<string, unknown>);
  }
}

function clearActivatedAbilityUsageMeta(ctx: PassTurnExecutionContext, playerId: PlayerId): void {
  const cardsInPlay = ctx.framework.zones.getCards({ zone: "play", playerId }) as CardInstanceId[];
  for (const cardId of cardsInPlay) {
    const currentMeta = (ctx.cards.require(cardId).meta ?? {}) as LorcanaCardMeta;
    if (!currentMeta.activatedAbilityUses && !currentMeta.activatedAbilityUseTurns) {
      continue;
    }
    ctx.cards.patchMeta(cardId, {
      activatedAbilityUses: undefined,
      activatedAbilityUseTurns: undefined,
    });
  }
}

function readyCardsForPlayer(
  ctx: PassTurnExecutionContext,
  playerId: PlayerId,
  currentTurn: number,
): void {
  const readyOnlyOneCharacter = hasTemporaryPlayerRestriction(
    ctx.G.temporaryPlayerRestrictions,
    playerId,
    currentTurn,
    "ready-only-one-character",
  );
  let charactersReadied = 0;

  const playerZoneRefs = [
    { zone: "play", playerId },
    { zone: "inkwell", playerId },
  ] as const;

  for (const zone of playerZoneRefs) {
    const cards = ctx.framework.zones.getCards(zone) as CardInstanceId[];
    const clearDrying = zone.zone === "play";

    for (const cardId of cards) {
      const currentMeta = (ctx.cards.require(cardId).meta ?? {}) as LorcanaCardMeta;
      const nextMeta = { ...currentMeta } as Record<string, unknown>;
      const cantReady =
        hasTemporaryRestriction(currentMeta, currentTurn, "cant-ready", {
          isSourceInPlay: (sourceId) => isCardStillInPlay(ctx, sourceId),
        }) ||
        hasTemporaryRestriction(currentMeta, currentTurn, "doesnt-ready", {
          isSourceInPlay: (sourceId) => isCardStillInPlay(ctx, sourceId),
        }) ||
        hasStaticCardRestriction({
          state: ctx.framework.state,
          cardId,
          restriction: "cant-ready",
          getDefinitionByInstanceId: (id) => ctx.cards.getDefinition(id),
        });
      const exceedsReadyLimit =
        zone.zone === "play" && readyOnlyOneCharacter && charactersReadied >= 1;

      if (currentMeta.state === "exerted" && !cantReady && !exceedsReadyLimit) {
        nextMeta.state = "ready";
        if (zone.zone === "play") {
          charactersReadied += 1;
        }
        emitTriggeredLorcanaEvent(
          ctx,
          "cardReadied",
          { cardId },
          { event: "ready", playerId, subjectCardId: cardId },
        );
      }

      if (clearDrying) {
        delete nextMeta.isDrying;
      }

      ctx.cards.setMeta(cardId, nextMeta);
    }
  }
}

function drawForTurn(ctx: PassTurnExecutionContext, playerId: PlayerId, turnNumber: number): void {
  const openingTurnPlayer = ctx.framework.state.status.otp as PlayerId | undefined;
  const shouldSkipOpeningDraw = turnNumber === 1 && playerId === openingTurnPlayer;
  if (shouldSkipOpeningDraw) {
    return;
  }

  const deckCards = ctx.framework.zones.getCards({ zone: "deck", playerId });
  const deckHasCards = Array.isArray(deckCards) && deckCards.length > 0;
  ctx.framework.zones.drawCards({
    from: { zone: "deck", playerId },
    to: { zone: "hand", playerId },
    count: 1,
  });
  if (deckHasCards) {
    recordCardDrawnThisTurn(ctx, playerId);
  }
}

function shouldSkipDrawStepForPlayer(
  ctx: PassTurnExecutionContext,
  playerId: PlayerId,
  turnNumber: number,
): boolean {
  const openingTurnPlayer = ctx.framework.state.status.otp as PlayerId | undefined;
  if (turnNumber === 1 && playerId === openingTurnPlayer) {
    return true;
  }

  const currentTurn = ctx.framework.state.status.turn ?? turnNumber;
  if (
    hasTemporaryPlayerRestriction(
      ctx.G.temporaryPlayerRestrictions,
      playerId,
      currentTurn,
      "skip-draw-step",
    )
  ) {
    return true;
  }

  return hasStaticPlayerRestriction({
    state: ctx.framework.state,
    playerId,
    restriction: "skip-draw-step",
    getDefinitionByInstanceId: (cardId) => ctx.cards.getDefinition(cardId),
  });
}

function gainLoreFromLocations(ctx: PassTurnExecutionContext, playerId: PlayerId): void {
  const cardsInPlay = ctx.framework.zones.getCards({ zone: "play", playerId }) as CardInstanceId[];
  const loreGain = cardsInPlay.reduce((total, cardId) => {
    const definition = ctx.cards.require(cardId).definition;
    if (!definition || !isLocation(definition)) {
      return total;
    }

    return total + getLoreValue(definition);
  }, 0);

  if (loreGain <= 0) {
    return;
  }

  ctx.G.lore[playerId] = Number(ctx.G.lore[playerId] ?? 0) + loreGain;
}

function getOpponents(ctx: PassTurnExecutionContext, playerId: PlayerId): PlayerId[] {
  return (Object.keys(ctx.G.lore) as PlayerId[]).filter((candidate) => candidate !== playerId);
}

function playerHasNoCardsInDeck(ctx: PassTurnExecutionContext, playerId: PlayerId): boolean {
  const remainingDeckCards = ctx.framework.zones.getCards({
    zone: "deck",
    playerId,
  }) as CardInstanceId[];

  return remainingDeckCards.length === 0;
}

export function advanceTurnToNextPlayer(ctx: PassTurnExecutionContext): AdvanceTurnResult {
  const players = Object.keys(ctx.G.lore) as PlayerId[];
  const previousPlayer = ctx.framework.state.currentPlayer!;
  const currentIndex = players.indexOf(previousPlayer as PlayerId);
  const nextIndex = (currentIndex + 1) % players.length;
  const nextPlayer = players[nextIndex];

  // Update turn and priority
  ctx.framework.priority.setHolder(nextPlayer);
  const turnNumber = ctx.framework.status.incrementTurn();

  // Reset phase to beginning
  ctx.framework.status.setPhase("beginning");
  ctx.framework.priority.openWindow(nextPlayer);

  readyCardsForPlayer(ctx, nextPlayer, turnNumber);
  cleanupExpiredEffects(ctx, turnNumber);
  cleanupDanglingTargetEffects(ctx);
  pruneExpiredTemporaryCardMeta(ctx, turnNumber);
  pruneExpiredTriggerRegistrations(ctx.G, turnNumber);
  pruneExpiredReplacementEffects(ctx.G, turnNumber);
  clearActivatedAbilityUsageMeta(ctx, previousPlayer as PlayerId);
  ctx.G.temporaryPlayerRestrictions = pruneExpiredTemporaryPlayerRestrictions(
    ctx.G.temporaryPlayerRestrictions,
    turnNumber,
  ) ?? {
    restrictionsByPlayer: {},
    startsByPlayer: {},
  };

  const turnsCompletedByPlayer =
    ctx.G.turnsCompletedByPlayer ?? (ctx.G.turnsCompletedByPlayer = {} as Record<PlayerId, number>);
  turnsCompletedByPlayer[previousPlayer] = (turnsCompletedByPlayer[previousPlayer] ?? 0) + 1;

  // Reset turn metadata (inkedThisTurn is array; ink refills via cardMeta ready in beginning phase)
  ctx.G.turnMetadata = {
    cardsPlayedThisTurn: [],
    charactersQuesting: [],
    inkedThisTurn: [],
    additionalInkwellActions: 0,
    shiftPlayedThisTurn: [],
    challengesByPlayerThisTurn: {},
    damagedCharactersByOwnerThisTurn: {},
    challengedCharactersThisTurn: [],
    banishedCharactersThisTurn: [],
    banishedCharactersInChallengeByOwnerThisTurn: {},
    discardCardsLeftThisTurn: 0,
    pendingCostReductionsByPlayer: {},
    cardsDrawnThisTurnByPlayer: {},
    pendingPlayFromUnder: [],
  };

  gainLoreFromLocations(ctx, nextPlayer);

  ctx.framework.events.emit({
    kind: "TURN_STARTED",
    playerId: nextPlayer,
    turn: turnNumber,
    phase: "beginning",
  });

  return { previousPlayer: previousPlayer as PlayerId, nextPlayer, turnNumber };
}

function createPendingTurnTransitionState(
  previousPlayer: PlayerId,
  stage: PendingTurnTransitionState["stage"],
  patch: Partial<PendingTurnTransitionState> = {},
): PendingTurnTransitionState {
  return {
    previousPlayer,
    stage,
    ...patch,
  };
}

export function continuePendingTurnTransition(ctx: PassTurnExecutionContext): void {
  let transitionState = ctx.G.pendingTurnTransition;
  if (!transitionState) {
    return;
  }

  while (transitionState) {
    switch (transitionState.stage) {
      case "end-of-turn": {
        ctx.framework.status.setPhase("end");

        if (!transitionState.triggerWindowQueued) {
          openWindow(ctx, {
            window: "end-of-turn",
            playerId: transitionState.previousPlayer,
          });
          finalizeResolutionBoundary(ctx, {
            playerId: transitionState.previousPlayer,
            window: "end-of-turn",
          });
          transitionState = {
            ...transitionState,
            triggerWindowQueued: true,
          };
          ctx.G.pendingTurnTransition = transitionState;
          if (
            hasPendingBagItems(ctx) ||
            ctx.framework.state.priority.pendingChoice ||
            (ctx.G.pendingEffects?.length ?? 0) > 0
          ) {
            return;
          }
        }

        transitionState = createPendingTurnTransitionState(
          transitionState.previousPlayer,
          "advance-turn",
        );
        ctx.G.pendingTurnTransition = transitionState;
        continue;
      }

      case "advance-turn": {
        const { previousPlayer, nextPlayer, turnNumber } = advanceTurnToNextPlayer(ctx);
        emitTriggeredLorcanaEvent(ctx, "turnPassed", {
          previousPlayer,
          newPlayer: nextPlayer,
        });

        transitionState = createPendingTurnTransitionState(previousPlayer, "start-of-turn", {
          nextPlayer,
          turnNumber,
        });
        ctx.G.pendingTurnTransition = transitionState;
        continue;
      }

      case "start-of-turn": {
        const nextPlayer = transitionState.nextPlayer;
        if (!nextPlayer) {
          ctx.G.pendingTurnTransition = undefined;
          return;
        }

        if (!transitionState.triggerWindowQueued) {
          openWindow(ctx, {
            window: "start-of-turn",
            playerId: nextPlayer,
          });
          finalizeResolutionBoundary(ctx, {
            playerId: nextPlayer,
            window: "start-of-turn",
          });
          transitionState = {
            ...transitionState,
            triggerWindowQueued: true,
          };
          ctx.G.pendingTurnTransition = transitionState;
          if (hasPendingBagItems(ctx) || ctx.framework.state.priority.pendingChoice) {
            return;
          }
        }

        const turnNumber = transitionState.turnNumber ?? ctx.framework.state.status.turn ?? 1;
        const drawStepStarted = transitionState.drawStepStarted === true;
        if (!drawStepStarted) {
          transitionState = {
            ...transitionState,
            drawStepStarted: true,
          };
          ctx.G.pendingTurnTransition = transitionState;
          if (shouldSkipDrawStepForPlayer(ctx, nextPlayer, turnNumber)) {
            ctx.framework.status.setPhase("main");
            ctx.G.pendingTurnTransition = undefined;
            return;
          }
        }

        drawForTurn(ctx, nextPlayer, turnNumber);
        ctx.framework.status.setPhase("main");
        ctx.G.pendingTurnTransition = undefined;
        return;
      }
    }
  }
}

function getPassTurnFailure(ctx: PassTurnIntentContext): PassTurnFailure | null {
  if (
    ctx.G.pendingTurnTransition ||
    hasPendingBagItems(ctx) ||
    ctx.framework.state.priority.pendingChoice ||
    (ctx.G.pendingEffects?.length ?? 0) > 0
  ) {
    return {
      valid: false,
      error: "Cannot pass turn while a player decision is pending",
      errorCode: PASS_TURN_DECISION_PENDING_ERROR_CODE,
    };
  }

  if (ctx.framework.state.priority.stackDepth > 0) {
    return {
      valid: false,
      error: "Cannot pass turn while stack has unresolved effects",
      errorCode: PASS_TURN_STACK_PENDING_ERROR_CODE,
    };
  }

  const recklessAttackerCanChallenge = getEligibleChallengeAttackers(ctx).some((attackerId) => {
    const attackerDef = ctx.cards.getDefinition(attackerId);
    const hasStaticReckless = attackerDef ? hasKeyword(attackerDef, "Reckless") : false;
    const attackerMeta = ctx.cards.require(attackerId).meta;
    const currentTurn = ctx.framework.state.status.turn ?? 1;
    const controllerId = ctx.cards.require(attackerId).controllerID as PlayerId | undefined;
    const controllerCantChallenge =
      controllerId !== undefined &&
      (hasTemporaryPlayerRestriction(
        ctx.G.temporaryPlayerRestrictions,
        controllerId,
        currentTurn,
        "cant-challenge",
      ) ||
        hasStaticPlayerRestriction({
          state: ctx.framework.state,
          playerId: controllerId,
          restriction: "cant-challenge",
          getDefinitionByInstanceId: (instanceId) => ctx.cards.getDefinition(instanceId),
        }));
    if (controllerCantChallenge) {
      return false;
    }

    return hasStaticReckless || hasTemporaryKeyword(attackerMeta, currentTurn, "Reckless");
  });

  if (recklessAttackerCanChallenge) {
    return {
      valid: false,
      error: "A Reckless character must challenge if able",
      errorCode: PASS_TURN_RECKLESS_CHALLENGE_REQUIRED_ERROR_CODE,
    };
  }

  return null;
}

/**
 * Pass turn to next player
 */
export const passTurn: LorcanaMoveDefinition<"passTurn"> = {
  validate: (ctx): RuntimeValidationResult => getPassTurnFailure(ctx) ?? { valid: true },

  execute: (ctx) => {
    const currentPlayer = ctx.playerId as PlayerId;
    ctx.framework.log({
      category: "action",
      visibility: { mode: "PUBLIC" },
      defaultMessage: createLorcanaLogMessage("lorcana.move.passTurn", {
        playerId: currentPlayer,
      }),
    });
    if (playerHasNoCardsInDeck(ctx, currentPlayer)) {
      const winner = getOpponents(ctx, currentPlayer)[0];
      ctx.framework.events.endGame({
        winner,
        reason: `${currentPlayer} ended their turn with no cards in their deck`,
      });
      return;
    }

    ctx.G.pendingTurnTransition = createPendingTurnTransitionState(currentPlayer, "end-of-turn");
    continuePendingTurnTransition(ctx);
  },

  available: (ctx) => !getPassTurnFailure(ctx),
};
