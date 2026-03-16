import type { MatchState, PlayerId, RuntimeFlowDefinition, RuntimeLifecycleContext } from "#core";
import type { LorcanaG } from "../types";
import { hasTemporaryRestriction } from "../runtime-moves/effects/temporary-effects";

function canAutoAdvanceBeginningPhase(state: MatchState<LorcanaG>): boolean {
  return (
    !state.G.pendingTurnTransition &&
    (state.G.triggeredAbilities?.bag?.items?.length ?? 0) === 0 &&
    !state.ctx.priority.pendingChoice &&
    (state.G.pendingEffects?.length ?? 0) === 0
  );
}

/**
 * Lorcana flow definition
 *
 * Game segments:
 * 1. startingAGame - Choose first player (OTP) and mulligan
 * 2. mainGame - Normal gameplay: beginning → main → end per turn
 */
export const lorcanaRuntimeFlow: RuntimeFlowDefinition<LorcanaG> = {
  initialGameSegment: "startingAGame",
  gameSegments: {
    startingAGame: {
      id: "startingAGame",
      name: "Starting a Game",
      order: 0,
      next: "mainGame",
      turn: {
        initialPhase: "chooseFirstPlayer",
        phases: {
          chooseFirstPlayer: {
            id: "chooseFirstPlayer",
            name: "Choose First Player",
            order: 1,
            validMoves: ["chooseWhoGoesFirst"],
            nextPhase: "mulligan",
            endIf: (state) => state.ctx.status.otp != null,
          },
          mulligan: {
            id: "mulligan",
            name: "Alter Hand",
            order: 2,
            onEnter: (ctx: RuntimeLifecycleContext<LorcanaG>) => {
              // Draw initial hands for each player (7 cards each)
              for (const playerId of ctx.framework.state.playerIds) {
                ctx.framework.zones.shuffle({ zone: "deck", playerId });
                ctx.framework.zones.drawCards({
                  from: { zone: "deck", playerId },
                  to: { zone: "hand", playerId },
                  count: 7,
                });
              }
            },
            validMoves: ["alterHand"],
            endIf: (state) => (state.ctx.status.pendingMulligan?.length ?? 0) === 0,
            // No nextPhase: segment transition to mainGame
          },
        },
      },
    },
    mainGame: {
      id: "mainGame",
      name: "Main Game",
      order: 1,
      onEnter: (ctx: RuntimeLifecycleContext<LorcanaG>) => {
        if (ctx.framework.state.ctx.status.otp) {
          // This should use the framework helper to set up priority
          ctx.framework.priority.openWindow(ctx.framework.state.ctx.status.otp as PlayerId);
        }
      },
      validMoves: [
        "concede",
        "passTurn",
        "moveCharacterToLocation",
        "resolveBag",
        "resolveEffect",
        "manualMoveCard",
        "manualExertCard",
        "manualReadyCard",
        "manualDryCard",
        "manualSetDamage",
        "manualSetLore",
        "manualShuffleDeck",
        "manualPassTurn",
      ], // For testing purposes, to be removed
      turn: {
        initialPhase: "beginning",
        phases: {
          beginning: {
            id: "beginning",
            name: "Beginning Phase",
            order: 1,
            onEnter: (ctx: RuntimeLifecycleContext<LorcanaG>) => {
              // Ready exerted cards and clear drying only for the current player (play + inkwell)
              const currentPlayer = ctx.playerId ?? ctx.framework.state.ctx.priority.holder;
              if (!currentPlayer) {
                return;
              }
              const currentTurn = ctx.framework.state.ctx.status.turn ?? 1;
              const playerZoneRefs = [
                { zone: "play", playerId: currentPlayer },
                { zone: "inkwell", playerId: currentPlayer },
              ] as const;
              for (const zone of playerZoneRefs) {
                const cards = ctx.framework.zones.getCards(zone);
                const clearDrying = zone.zone === "play";
                for (const cardId of cards) {
                  const card = ctx.cards.get(cardId);
                  if (!card?.meta) continue;
                  const nextMeta = { ...card.meta } as Record<string, unknown>;
                  const cantReady =
                    hasTemporaryRestriction(card.meta, currentTurn, "cant-ready", {
                      isSourceInPlay: (sourceId) => {
                        const zoneKey =
                          ctx.framework.state.ctx.zones.private.cardIndex[sourceId]?.zoneKey;
                        return (
                          typeof zoneKey === "string" &&
                          (zoneKey === "play" || zoneKey.startsWith("play:"))
                        );
                      },
                    }) ||
                    hasTemporaryRestriction(card.meta, currentTurn, "doesnt-ready", {
                      isSourceInPlay: (sourceId) => {
                        const zoneKey =
                          ctx.framework.state.ctx.zones.private.cardIndex[sourceId]?.zoneKey;
                        return (
                          typeof zoneKey === "string" &&
                          (zoneKey === "play" || zoneKey.startsWith("play:"))
                        );
                      },
                    });
                  if (
                    card.meta &&
                    (card.meta as Record<string, unknown>).state === "exerted" &&
                    !cantReady
                  ) {
                    nextMeta.state = "ready";
                  }
                  if (clearDrying) {
                    delete (nextMeta as Record<string, unknown>).isDrying;
                  }
                  ctx.cards.setMeta(cardId, nextMeta);
                }
              }
            },
            validMoves: [
              "concede",
              "resolveBag",
              "resolveEffect",
              "manualMoveCard",
              "manualExertCard",
              "manualReadyCard",
              "manualDryCard",
              "manualSetDamage",
              "manualSetLore",
              "manualShuffleDeck",
              "manualPassTurn",
            ],
            endIf: canAutoAdvanceBeginningPhase,
            nextPhase: "main",
          },
          main: {
            id: "main",
            name: "Main Phase",
            order: 2,
            validMoves: [
              "playCard",
              "quest",
              "questWithAll",
              "challenge",
              "moveCharacterToLocation",
              "activateAbility",
              "putCardIntoInkwell",
              "passTurn",
              "resolveBag",
              "resolveEffect",
              "concede",
              "manualMoveCard",
              "manualExertCard",
              "manualReadyCard",
              "manualDryCard",
              "manualSetDamage",
              "manualSetLore",
              "manualShuffleDeck",
              "manualPassTurn",
            ],
            endIf: () => false,
          },
          end: {
            id: "end",
            name: "End Phase",
            order: 3,
            onEnter: (_ctx: RuntimeLifecycleContext<LorcanaG>) => {},
            validMoves: [
              "concede",
              "resolveBag",
              "resolveEffect",
              "manualMoveCard",
              "manualExertCard",
              "manualReadyCard",
              "manualDryCard",
              "manualSetDamage",
              "manualSetLore",
              "manualShuffleDeck",
              "manualPassTurn",
            ],
            endIf: () => false,
            nextPhase: "beginning",
          },
        },
      },
      endIf: (state) => {
        // Concession or other game end set on ctx by moves
        if (state.ctx.status.gameEnded) {
          return {
            winner: state.ctx.status.winner ?? Object.keys(state.G.lore)[0],
            reason: state.ctx.status.reason ?? "Game ended",
          };
        }
        // Lore win
        const game: LorcanaG = state.G;
        for (const [playerId, lore] of Object.entries(game.lore)) {
          if (lore >= 20) {
            return {
              winner: playerId,
              reason: "Reached 20 lore",
            };
          }
        }
        return undefined;
      },
    },
  },
};
