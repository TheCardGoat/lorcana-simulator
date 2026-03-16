import {
  createMatchStaticResourcesFromCardsMaps,
  type CardCatalog,
  type MatchStaticResources,
  type Player,
  type PlayerId,
} from "#core";

import type { LorcanaCard } from "./types";
import { lorcanaRuntimeZones } from "./zones";

export type LorcanaCardsMaps = {
  cardInstances: Record<string, string>;
  owners: Record<string, string[]>;
};

export type LorcanaBaseEngineParams = {
  seed: string;
  instanceIdPrefix?: string;
  matchID?: string;
  gameID?: string;
  goingFirst: PlayerId;
  cardCatalog: CardCatalog<LorcanaCard>;
  players: Player[];
  cardsMaps: LorcanaCardsMaps;
  staticResources?: MatchStaticResources<LorcanaCard>;
  debugServerCommunication?: boolean;
};

type LorcanaStaticResourcesParams = Pick<
  LorcanaBaseEngineParams,
  "cardsMaps" | "cardCatalog" | "staticResources"
>;

export type LorcanaBaseInitialization = {
  players: Player[];
  cardCatalog: CardCatalog<LorcanaCard>;
  staticResources: MatchStaticResources<LorcanaCard>;
  cardInstanceToDefinitionId: Map<string, string>;
};

export function resolveLorcanaStaticResources(
  init: LorcanaStaticResourcesParams,
): MatchStaticResources<LorcanaCard> {
  return (
    init.staticResources ||
    createMatchStaticResourcesFromCardsMaps(init.cardsMaps, init.cardCatalog, lorcanaRuntimeZones)
  );
}

export function createCardInstanceDefinitionIndex(
  cardsMaps: LorcanaCardsMaps,
): Map<string, string> {
  return new Map(Object.entries(cardsMaps.cardInstances));
}

export function initializeLorcanaEngineBase(
  init: LorcanaBaseEngineParams,
): LorcanaBaseInitialization {
  return {
    players: init.players,
    cardCatalog: init.cardCatalog,
    staticResources: resolveLorcanaStaticResources(init),
    cardInstanceToDefinitionId: createCardInstanceDefinitionIndex(init.cardsMaps),
  };
}

export function normalizeBoardPlayerId(
  playerId: string,
  playerOrder: readonly PlayerId[] | undefined,
): PlayerId | undefined {
  return playerOrder?.find((candidate) => String(candidate) === playerId);
}
