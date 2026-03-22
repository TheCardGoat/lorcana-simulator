import {
  buildEngineProjectionSnapshot,
  type EngineBoardProjection,
  type RuntimeBoardProjectionContext,
  type ViewRoleContext,
  type MatchStaticResources,
  type CardInstanceId,
  type PlayerId,
} from "#core";
import type { FrameworkStateSnapshot, RuntimeCardWithDefinition } from "../core/runtime";
import {
  createCardQueryAPIForState,
  createTimeQueryAPI,
  createZoneQueryAPI,
} from "../core/runtime/match-runtime.apis";
import type {
  LorcanaCard,
  LorcanaCardDefinition,
  LorcanaCardMeta,
  LorcanaG,
  LorcanaMatchState,
  LorcanaProjectedBoardView,
  LorcanaProjectedCard,
  LorcanaProjectedCardId,
  LorcanaProjectedPlayerBoard,
} from "../types";
import { buildResolutionSelectionContext } from "../runtime-moves/resolution/action-effects/selection-context";
import type { ResolutionSelectionRuntimeContext } from "../runtime-moves/resolution/action-effects/selection-context";
import {
  projectLorcanaCardDerived,
  createDefaultProjectedLorcanaCardDerived,
} from "../projection/card-derived";
import { canInkThisTurn } from "../runtime-moves/state/runtime-card-derived";

export type LorcanaBoardProjection = EngineBoardProjection;

function resolveTurnPlayer(state: LorcanaMatchState): PlayerId | null {
  const otp = state.ctx.status.otp as PlayerId | undefined;
  if (!otp) {
    return (state.ctx.priority.holder as PlayerId | undefined) ?? null;
  }

  const turnNumber = state.ctx.status.turn ?? 0;
  if (turnNumber <= 0) {
    return otp;
  }

  // Count completed turns across all players to determine if any passes have occurred.
  // When no turns have been completed (e.g. skipPreGame fixtures), the OTP is the turn player
  // regardless of the turn counter value, since the formula below only applies after actual passes.
  const turnsCompleted = state.G?.turnsCompletedByPlayer as Record<string, number> | undefined;
  const totalCompletedTurns = turnsCompleted
    ? Object.values(turnsCompleted).reduce((sum, count) => sum + (count ?? 0), 0)
    : 0;
  if (totalCompletedTurns === 0) {
    return otp;
  }

  const playerIds = state.ctx.playerIds ?? [];
  const otpIndex = playerIds.findIndex((playerId) => String(playerId) === String(otp));
  if (otpIndex < 0 || playerIds.length === 0) {
    return otp;
  }

  const offset = totalCompletedTurns % playerIds.length;
  return playerIds[(otpIndex + offset) % playerIds.length] as PlayerId;
}

function getDefinitionForInstance(
  staticResources: MatchStaticResources,
  instanceId: string,
): { definitionId?: string; definition?: LorcanaCardDefinition } {
  const record = staticResources.instances.get(instanceId);
  const definitionId = record?.definitionId;
  return {
    definitionId,
    definition: definitionId
      ? (staticResources.cards.get(definitionId) as LorcanaCardDefinition | undefined)
      : undefined,
  };
}

function createSelectionRuntimeContext(
  state: LorcanaMatchState,
  staticResources: MatchStaticResources,
  roleCtx: ViewRoleContext,
): ResolutionSelectionRuntimeContext {
  const actorPlayerId =
    roleCtx.role === "player" ? (roleCtx.playerID as PlayerId | undefined) : undefined;
  const frameworkState: FrameworkStateSnapshot = {
    priority: state.ctx.priority,
    status: state.ctx.status,
    _zonesPrivate: state.ctx.zones.private,
    _zonesPublic: state.ctx.zones.public,
    playerIds: [...state.ctx.playerIds] as PlayerId[],
    turn: state.ctx.status.turn ?? 0,
    phase: state.ctx.status.phase,
    step: state.ctx.status.step,
    gameSegment: state.ctx.status.gameSegment,
    currentPlayer: resolveTurnPlayer(state) ?? (state.ctx.priority.holder as PlayerId | undefined),
    stateID: state.ctx._stateID,
    matchID: state.ctx.matchID,
    gameID: state.ctx.gameID,
    gameEnded: state.ctx.status.gameEnded,
  };
  const rawCards = createCardQueryAPIForState(state, staticResources, () => ({}), actorPlayerId);
  const adaptRuntimeCard = (runtimeCard: RuntimeCardWithDefinition): RuntimeCardWithDefinition => ({
    ...runtimeCard,
    definition: runtimeCard.definition as LorcanaCard,
  });
  const projectRuntimeCard = <TResult>(
    runtimeCard: RuntimeCardWithDefinition,
    projector?: (card: RuntimeCardWithDefinition) => TResult,
  ): TResult => {
    const adaptedRuntimeCard = adaptRuntimeCard(runtimeCard);
    return projector ? projector(adaptedRuntimeCard) : (adaptedRuntimeCard as TResult);
  };
  const cards: ResolutionSelectionRuntimeContext["cards"] = {
    get: (cardId) => {
      const runtimeCard = rawCards.get(cardId);
      return runtimeCard ? adaptRuntimeCard(runtimeCard as RuntimeCardWithDefinition) : undefined;
    },
    require: (cardId) => {
      const runtimeCard = rawCards.get(cardId);
      if (!runtimeCard) {
        throw new Error(`Unknown card: ${cardId}`);
      }
      return adaptRuntimeCard(runtimeCard as RuntimeCardWithDefinition);
    },
    getDefinition: (cardId) => rawCards.getDefinition(cardId) as LorcanaCard | undefined,
    getDefinitionById: (definitionId) =>
      rawCards.getDefinitionById(definitionId) as LorcanaCard | undefined,
    getMeta: (cardId) => rawCards.getMeta(cardId),
    inZone: (zoneId) =>
      rawCards
        .inZone(zoneId)
        .map((runtimeCard) => adaptRuntimeCard(runtimeCard as RuntimeCardWithDefinition)),
    queryTargetDsl: rawCards.queryTargetDsl
      ? (targetDsl, projector) =>
          rawCards.queryTargetDsl?.(targetDsl, (runtimeCard) =>
            projectRuntimeCard(runtimeCard as RuntimeCardWithDefinition, projector),
          ) ?? []
      : undefined,
    queryRuntime: (targetDsl, projector) =>
      rawCards.queryRuntime(targetDsl, (runtimeCard) =>
        projectRuntimeCard(runtimeCard as RuntimeCardWithDefinition, projector),
      ),
  };
  const zones = createZoneQueryAPI(state, rawCards);
  const time = createTimeQueryAPI(state);
  const framework: ResolutionSelectionRuntimeContext["framework"] = {
    state: frameworkState,
    zones,
    time,
    cards,
  };

  return {
    G: state.G,
    playerId: actorPlayerId,
    framework,
    cards,
  };
}

function buildVisibleCard(args: {
  staticResources: MatchStaticResources;
  state: LorcanaMatchState;
  cardId: string;
  zone: LorcanaProjectedCard["zone"];
  actorPlayerId?: PlayerId;
  rawBoard: LorcanaBoardProjection;
}): LorcanaProjectedCard {
  const { staticResources, state, cardId, zone, actorPlayerId, rawBoard } = args;
  const projection = rawBoard.cards[cardId];
  const meta = (projection?.meta ?? {}) as LorcanaCardMeta;
  const ownerId = (projection?.ownerId ?? "unknown") as PlayerId;
  const controllerId = (projection?.controllerId ?? ownerId) as PlayerId;
  const { definitionId, definition } = getDefinitionForInstance(staticResources, cardId);

  return {
    id: cardId as CardInstanceId,
    ownerId,
    zone,
    controllerId,
    zoneIndex: projection?.zoneIndex,
    definitionId,
    atLocationId: meta.atLocationId as CardInstanceId | undefined,
    cardsUnder: Array.isArray(meta.cardsUnder)
      ? [...(meta.cardsUnder as CardInstanceId[])]
      : undefined,
    stackParentId: meta.stackParentId as CardInstanceId | undefined,
    ...projectLorcanaCardDerived({
      definition,
      meta,
      state,
      cardInstanceId: cardId as CardInstanceId,
      ownerID: ownerId,
      controllerID: controllerId,
      zoneID: projection?.zoneId,
      actorPlayerId,
      getDefinitionByInstanceId: (instanceId) =>
        getDefinitionForInstance(staticResources, instanceId).definition,
    }),
  };
}

function buildHiddenCard(args: {
  state: LorcanaMatchState;
  zone: LorcanaProjectedCard["zone"];
  ownerId: PlayerId;
  slotIndex: number;
  rawCardId?: string;
  rawBoard: LorcanaBoardProjection;
}): LorcanaProjectedCard {
  const { state, zone, ownerId, slotIndex, rawCardId, rawBoard } = args;
  const meta = rawCardId
    ? (rawBoard.cards[rawCardId]?.meta as LorcanaCardMeta | undefined)
    : undefined;
  const derived = rawCardId
    ? projectLorcanaCardDerived({
        state,
        meta,
      })
    : createDefaultProjectedLorcanaCardDerived();

  return {
    id: rawCardId ? (rawCardId as CardInstanceId) : `hidden:${zone}:${ownerId}:${slotIndex}`,
    ownerId,
    zone,
    zoneIndex: slotIndex,
    hidden: true,
    ...derived,
  };
}

function projectTimerView(
  state: LorcanaMatchState,
  serverTimestamp: number,
): LorcanaProjectedBoardView["timerView"] {
  const players = Object.fromEntries(
    state.ctx.playerIds.map((playerId) => {
      if (state.ctx.time.mode === "none") {
        return [
          playerId,
          {
            timeRemaining: 0,
            timerTicking: false,
            canDeclareVictory: false,
            canClaimAfkVictory: false,
            canClaimPreGameVictory: false,
            lastGameActionAt: 0,
          },
        ];
      }

      const playerState = state.ctx.time.players[String(playerId)];
      return [
        playerId,
        {
          timeRemaining: playerState?.reserveMsRemaining ?? 0,
          timerTicking: state.ctx.time.running && state.ctx.time.activePlayerID === playerId,
          canDeclareVictory: false,
          canClaimAfkVictory: false,
          canClaimPreGameVictory: false,
          lastGameActionAt: playerState?.lastUpdatedAtMs ?? 0,
        },
      ];
    }),
  );

  if (state.ctx.time.mode === "none") {
    return {
      serverTimestamp,
    };
  }

  return {
    serverTimestamp,
    players,
  };
}

function isCardVisibleViaReveal(
  state: LorcanaMatchState,
  cardId: string,
  roleCtx: ViewRoleContext,
): boolean {
  if (roleCtx.role === "judge") {
    return true;
  }

  return state.ctx.zones.reveals.active.some((reveal) => {
    if (!reveal.cardIDs.includes(cardId)) {
      return false;
    }

    if (reveal.visibleTo === "all") {
      return true;
    }

    return (
      roleCtx.role === "player" && !!roleCtx.playerID && reveal.visibleTo.includes(roleCtx.playerID)
    );
  });
}

function staticRevealAffectsPlayer(args: {
  sourceControllerId?: PlayerId;
  targetPlayerId: PlayerId;
  target: unknown;
}): boolean {
  const { sourceControllerId, targetPlayerId, target } = args;
  return (
    target === "EACH_PLAYER" ||
    target === "ALL_PLAYERS" ||
    (target === "CONTROLLER" && sourceControllerId === targetPlayerId) ||
    (target === "OPPONENT" &&
      sourceControllerId !== undefined &&
      sourceControllerId !== targetPlayerId)
  );
}

function isTopDeckCardVisibleViaStaticEffect(args: {
  state: LorcanaMatchState;
  staticResources: MatchStaticResources;
  rawBoard: LorcanaBoardProjection;
  targetPlayerId: PlayerId;
}): boolean {
  const { state, staticResources, rawBoard, targetPlayerId } = args;

  for (const [sourceId, entry] of Object.entries(state.ctx.zones.private.cardIndex)) {
    const zoneKey = entry?.zoneKey;
    if (typeof zoneKey !== "string" || (zoneKey !== "play" && !zoneKey.startsWith("play:"))) {
      continue;
    }

    const definitionId =
      rawBoard.cards[sourceId]?.definitionId ??
      staticResources.instances.get(sourceId)?.definitionId;
    const definition = definitionId
      ? (staticResources.cards.get(definitionId) as LorcanaCardDefinition | undefined)
      : undefined;
    if (!definition) {
      continue;
    }

    for (const ability of definition.abilities ?? []) {
      if (
        ability.type !== "static" ||
        !ability.effect ||
        (ability.effect as { type?: unknown }).type !== "reveal-top-card"
      ) {
        continue;
      }

      const revealTopEffect = ability.effect as { target?: unknown };

      if (
        staticRevealAffectsPlayer({
          sourceControllerId: entry.controllerID as PlayerId | undefined,
          targetPlayerId,
          target: revealTopEffect.target,
        })
      ) {
        return true;
      }
    }
  }

  return false;
}

function projectPlayerBoard(args: {
  state: LorcanaMatchState;
  rawBoard: LorcanaBoardProjection;
  staticResources: MatchStaticResources;
  roleCtx: ViewRoleContext;
  playerId: PlayerId;
  cards: Record<string, LorcanaProjectedCard>;
}): LorcanaProjectedPlayerBoard {
  const { state, rawBoard, staticResources, roleCtx, playerId, cards } = args;
  const actorPlayerId =
    roleCtx.role === "player" ? (roleCtx.playerID as PlayerId | undefined) : undefined;
  const registerCard = (projectedCard: LorcanaProjectedCard): LorcanaProjectedCardId => {
    cards[String(projectedCard.id)] = projectedCard;
    return projectedCard.id;
  };

  const canSeeHand = actorPlayerId === playerId;
  const handZone = rawBoard.zones[`hand:${playerId}`];
  const playZone = rawBoard.zones[`play:${playerId}`];
  const inkwellZone = rawBoard.zones[`inkwell:${playerId}`];
  const discardZone = rawBoard.zones[`discard:${playerId}`];
  const deckZone = rawBoard.zones[`deck:${playerId}`];
  const limboZone = rawBoard.zones[`limbo:${playerId}`];
  const authoritativeDeckCards = state.ctx.zones.private.zoneCards[`deck:${playerId}`] as
    | string[]
    | undefined;
  const indexedTopDeckCardId =
    authoritativeDeckCards === undefined || authoritativeDeckCards.length === 0
      ? (Object.entries(state.ctx.zones.private.cardIndex).reduce<{
          cardId?: string;
          index: number;
        }>(
          (best, [cardId, entry]) => {
            if (entry?.zoneKey !== `deck:${playerId}`) {
              return best;
            }

            const index = typeof entry.index === "number" ? entry.index : -1;
            return index > best.index ? { cardId, index } : best;
          },
          { cardId: undefined, index: -1 },
        ).cardId ?? undefined)
      : undefined;
  const topDeckCardId = isTopDeckCardVisibleViaStaticEffect({
    state,
    staticResources,
    rawBoard,
    targetPlayerId: playerId,
  })
    ? Array.isArray(authoritativeDeckCards) && authoritativeDeckCards.length > 0
      ? authoritativeDeckCards[authoritativeDeckCards.length - 1]
      : indexedTopDeckCardId
    : undefined;

  const hand = (handZone?.cards ?? []).map((cardId, index) => {
    if (canSeeHand || isCardVisibleViaReveal(state, cardId, roleCtx)) {
      return registerCard(
        buildVisibleCard({
          staticResources,
          state,
          cardId,
          zone: "hand",
          actorPlayerId,
          rawBoard,
        }),
      );
    }

    return registerCard(
      buildHiddenCard({
        state,
        zone: "hand",
        ownerId: playerId,
        slotIndex: index,
        rawBoard,
      }),
    );
  });

  const play = (playZone?.cards ?? []).map((cardId) =>
    registerCard(
      buildVisibleCard({
        staticResources,
        state,
        cardId,
        zone: "play",
        actorPlayerId,
        rawBoard,
      }),
    ),
  );

  const inkwell = Array.from({ length: inkwellZone?.count ?? 0 }, (_, index) => {
    const cardId = inkwellZone?.cards[index];
    if (cardId && isCardVisibleViaReveal(state, cardId, roleCtx)) {
      return registerCard(
        buildVisibleCard({
          staticResources,
          state,
          cardId,
          zone: "inkwell",
          actorPlayerId,
          rawBoard,
        }),
      );
    }

    return registerCard(
      buildHiddenCard({
        state,
        zone: "inkwell",
        ownerId: playerId,
        slotIndex: index,
        rawCardId: cardId,
        rawBoard,
      }),
    );
  });

  const discard = (discardZone?.cards ?? []).map((cardId) =>
    registerCard(
      buildVisibleCard({
        staticResources,
        state,
        cardId,
        zone: "discard",
        actorPlayerId,
        rawBoard,
      }),
    ),
  );

  // Limbo is projected for card lookup and previews, even though it is not rendered as a board lane.
  for (const cardId of limboZone?.cards ?? []) {
    registerCard(
      buildVisibleCard({
        staticResources,
        state,
        cardId,
        zone: "limbo",
        actorPlayerId,
        rawBoard,
      }),
    );
  }

  const deckTop = topDeckCardId
    ? registerCard(
        buildVisibleCard({
          staticResources,
          state,
          cardId: topDeckCardId,
          zone: "deck",
          actorPlayerId,
          rawBoard,
        }),
      )
    : undefined;

  return {
    lore: state.G.lore[playerId] ?? 0,
    canAddCardToInkwell:
      actorPlayerId === playerId
        ? canInkThisTurn({
            state,
            getDefinitionByInstanceId: (cardId) => {
              const definitionId = staticResources.instances.get(cardId)?.definitionId;
              return definitionId ? staticResources.cards.get(definitionId) : undefined;
            },
            playerId,
          })
        : false,
    handCount: handZone?.count ?? hand.length,
    deckCount: deckZone?.count ?? 0,
    deckTop,
    inkwell,
    hand,
    play,
    discard,
  };
}

export function projectLorcanaBoardView(
  state: LorcanaMatchState,
  roleCtx: ViewRoleContext,
  staticResources: MatchStaticResources,
  projectionCtx?: RuntimeBoardProjectionContext,
): LorcanaProjectedBoardView {
  const selectionRuntimeContext = createSelectionRuntimeContext(state, staticResources, roleCtx);
  const projection = buildEngineProjectionSnapshot(
    state,
    {
      role: roleCtx.role,
      playerId: roleCtx.role === "player" ? roleCtx.playerID : undefined,
    },
    {
      resolveDefinitionId: (cardId) => staticResources.instances.get(cardId)?.definitionId,
    },
  );

  // This projects the entire board, with no hidden information
  const rawBoard: LorcanaBoardProjection = projection.board;
  const cards: Record<string, LorcanaProjectedCard> = {};

  const players = Object.fromEntries(
    state.ctx.playerIds.map((playerId) => [
      playerId,
      projectPlayerBoard({
        state,
        rawBoard,
        staticResources,
        roleCtx,
        playerId: playerId as PlayerId,
        cards,
      }),
    ]),
  );
  const pendingChoice = state.ctx.priority.pendingChoice;

  return {
    gameID: state.ctx.gameID,
    matchID: state.ctx.matchID,
    stateID: state.ctx._stateID,
    playerOrder: [...state.ctx.playerIds],
    turnPlayer: resolveTurnPlayer(state),
    priorityPlayer: (state.ctx.priority.holder as PlayerId | undefined) ?? null,
    turnNumber: state.ctx.status.turn ?? 0,
    phase: state.ctx.status.phase,
    gameSegment: state.ctx.status.gameSegment,
    step: state.ctx.status.step ?? null,
    openingTurnPlayer: (state.ctx.status.otp as PlayerId | undefined) ?? null,
    pendingMulligan: [...(state.ctx.status.pendingMulligan ?? [])] as PlayerId[],
    choosingFirstPlayer: (state.ctx.status.choosingFirstPlayer as PlayerId | undefined) ?? null,
    status: state.ctx.status.gameEnded ? "finished" : "playing",
    winner: state.ctx.status.winner ?? null,
    reason: state.ctx.status.reason ?? null,
    timerView: projectTimerView(state, projectionCtx?.serverTimestamp ?? Date.now()),
    activeEffects: projection.activeEffects,
    pendingEffects: projection.pendingEffects
      .filter((pendingEffect) => pendingEffect.source !== "priority")
      .map((pendingEffect) => ({
        ...pendingEffect,
        selectionContext:
          pendingEffect.source === "game" &&
          pendingEffect.payload &&
          typeof pendingEffect.payload === "object" &&
          "selectionContext" in pendingEffect.payload
            ? ((
                pendingEffect.payload as {
                  selectionContext?: LorcanaProjectedBoardView["bagEffects"][number]["selectionContext"];
                }
              ).selectionContext ?? undefined)
            : undefined,
      })),
    pendingChoice: pendingChoice
      ? {
          type: pendingChoice.type,
          playerID: pendingChoice.playerID as PlayerId,
          requestID: pendingChoice.requestID,
        }
      : undefined,
    bagEffects: (state.G.triggeredAbilities?.bag?.items ?? []).map((entry) => ({
      id: entry.id,
      type: entry.kind,
      controllerId: entry.controllerId,
      chooserId: entry.chooserId,
      sourceId: entry.sourceId,
      payload: entry,
      selectionContext: buildResolutionSelectionContext({
        origin: "bag",
        requestId: entry.id,
        sourceCardId: entry.sourceId,
        chooserId: entry.chooserId,
        cardPlayed: entry.cardPlayed,
        effect: entry.effect,
        condition: entry.condition,
        resolutionInput: entry.resolutionInput,
        ctx: selectionRuntimeContext,
      }),
    })),
    temporaryPlayerRestrictions:
      state.G.temporaryPlayerRestrictions?.restrictionsByPlayer ?? undefined,
    cards,
    players: players,
  };
}
