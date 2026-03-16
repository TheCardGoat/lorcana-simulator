/**
 * Production serialization helpers for LorcanaServer.
 *
 * These helpers centralize authoritative state extraction/loading so
 * consumers (API, persistence layers, replay tooling) don't need to
 * call engine internals directly.
 */

import type { CardCatalog, CardsMaps, PlayerId } from "#core";
import type { LorcanaCard } from "@tcg/lorcana-types";
import { LorcanaServer, createLorcanaServerGame } from "./lorcana-server";
import type { LorcanaMatchState } from "./types";

/**
 * Get the full authoritative Lorcana match state for persistence.
 * Only works in server mode.
 */
export function getLorcanaServerAuthoritativeState(engine: LorcanaServer): LorcanaMatchState {
  return structuredClone(engine.getState()) as LorcanaMatchState;
}

/**
 * Load a previously serialized authoritative Lorcana match state.
 * Caller must pass cardCatalog (e.g. getLorcanaCardCatalog() from @tcg/lorcana-cards).
 */
export function loadLorcanaServerAuthoritativeState(
  state: LorcanaMatchState,
  cardsMaps: CardsMaps,
  cardCatalog: CardCatalog<LorcanaCard>,
  eng?: LorcanaServer,
): LorcanaServer {
  const players = Object.keys(cardsMaps.owners).map((id) => ({ id: id as PlayerId }));
  const playersInfo = players.map((player) => ({ player }));
  const engine =
    eng ??
    createLorcanaServerGame(playersInfo, {
      seed: state.ctx.random.seed,
      cardsMaps,
      cardCatalog,
      players,
      matchID: state.ctx.matchID,
      gameID: state.ctx.gameID,
      goingFirst: (state.ctx.status.choosingFirstPlayer ?? "") as PlayerId,
    });
  engine.loadState(state);

  return engine;
}
