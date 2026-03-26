import { getLorcanaCardCatalogSync } from "@tcg/lorcana-cards/cards/sync";
import {
  createPlayerId,
  createLorcanaClient,
  type CardsMaps,
  type LorcanaClient,
  type LorcanaMatchState,
} from "@tcg/lorcana-engine";
import { applyPatches, type Patch } from "immer";
import type { GatewayClientStore } from "../gateway/gateway-client.svelte.js";
import type {
  LogCardReference,
  LorcanaPlayerSide,
  LorcanaSimulatorMoveId,
  LorcanaZoneId,
  MoveLogEntrySnapshot,
  SimulatorSerializedObject,
} from "../simulator/model/contracts.js";
import {
  assertLorcanaSimulatorMoveId,
  isLorcanaSimulatorMoveId,
} from "../simulator/model/contracts.js";
import { formatEventLogBody } from "../simulator/model/event-log-formatting.js";

export interface SpectatorRecentHistory {
  acceptedMoves: Array<{
    actorId: string;
    moveId: string;
    stateVersion: number;
    timestamp: number;
    turnNumber: number;
    input?: unknown;
  }>;
  engineLogs: Array<{
    defaultMessage?: { key?: string; values?: Record<string, unknown> };
    sourceEventSeqs: number[];
  }>;
}

type SpectatorAcceptedMove = SpectatorRecentHistory["acceptedMoves"][number];
type SpectatorEngineLog = SpectatorRecentHistory["engineLogs"][number];

class SpectatorReadModel {
  #listeners = new Set<(stateID: number) => void>();
  #stateId = 0;
  #moveLog: MoveLogEntrySnapshot[] = [];

  getMoveLog(limit = 50): MoveLogEntrySnapshot[] {
    return limit > 0 ? this.#moveLog.slice(-limit) : [...this.#moveLog];
  }

  subscribeStateUpdates(handler: (stateID: number) => void): () => void {
    this.#listeners.add(handler);
    return () => {
      this.#listeners.delete(handler);
    };
  }

  pushEntries(entries: MoveLogEntrySnapshot[]): void {
    if (entries.length === 0) {
      return;
    }

    this.#moveLog = [...this.#moveLog, ...entries];
    this.bump();
  }

  notifyStateUpdated(): void {
    this.bump();
  }

  bump(): void {
    this.#stateId += 1;
    for (const listener of this.#listeners) {
      listener(this.#stateId);
    }
  }
}

function normalizePersistedMoveParams(input?: unknown): SimulatorSerializedObject | undefined {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return undefined;
  }

  const args = "args" in input ? (input as { args?: unknown }).args : undefined;
  if (!args || typeof args !== "object" || Array.isArray(args)) {
    return undefined;
  }

  return args as SimulatorSerializedObject;
}

function parseBaseZone(zone?: string): LorcanaZoneId | null {
  if (!zone) {
    return null;
  }

  const [baseZone] = zone.split(":");
  switch (baseZone) {
    case "deck":
    case "hand":
    case "play":
    case "discard":
    case "inkwell":
      return baseZone;
    default:
      return null;
  }
}

export function createSpectatorHistoryEntries(args: {
  acceptedMoves: SpectatorRecentHistory["acceptedMoves"];
  engineLogs: SpectatorRecentHistory["engineLogs"];
  engine?: LorcanaClient;
  cardsMaps?: CardsMaps;
  resolveActorSide: (actorId: string) => LorcanaPlayerSide | undefined;
}): MoveLogEntrySnapshot[] {
  return args.acceptedMoves.flatMap((move, index) => {
    if (!isLorcanaSimulatorMoveId(move.moveId)) {
      return [];
    }

    const params = normalizePersistedMoveParams(move.input);

    const entry: MoveLogEntrySnapshot = {
      id: `spectator-history-${move.stateVersion}-${index}-${move.moveId}`,
      timestamp: move.timestamp,
      turnNumber: move.turnNumber,
      moveId: move.moveId,
      actorSide: args.resolveActorSide(move.actorId),
      title: "",
      playerId: move.actorId,
      params,
    };

    const resolveCard = buildCardReferenceResolver(args.engine, args.cardsMaps);
    return [{ ...entry, title: formatEventLogBody(entry, undefined, undefined, resolveCard).text }];
  });
}

function createLiveEntry(args: {
  acceptedMove: SpectatorAcceptedMove;
  engineLogs: SpectatorEngineLog[];
  engine: LorcanaClient;
  cardsMaps: CardsMaps;
  resolveActorSide: (actorId: string) => LorcanaPlayerSide | undefined;
}): MoveLogEntrySnapshot {
  const moveId = assertLorcanaSimulatorMoveId(args.acceptedMove.moveId);
  const params = normalizePersistedMoveParams(args.acceptedMove.input);
  const entry: MoveLogEntrySnapshot = {
    id: `spectator-live-${args.acceptedMove.turnNumber}-${args.acceptedMove.timestamp}-${moveId}`,
    timestamp: args.acceptedMove.timestamp,
    turnNumber: args.acceptedMove.turnNumber,
    moveId,
    actorSide: args.resolveActorSide(args.acceptedMove.actorId),
    title: "",
    playerId: args.acceptedMove.actorId,
    params,
  };

  const resolveCard = buildCardReferenceResolver(args.engine, args.cardsMaps);
  return { ...entry, title: formatEventLogBody(entry, undefined, undefined, resolveCard).text };
}

function buildCardReferenceResolver(
  engine: LorcanaClient | undefined,
  cardsMaps: CardsMaps | undefined,
): (cardId: string) => LogCardReference | null {
  const board = engine?.getBoard();
  const cardCatalog = getLorcanaCardCatalogSync();

  return (cardId: string): LogCardReference | null => {
    const projectedCard = board?.cards[cardId];
    if (projectedCard) {
      const isMasked = projectedCard.hidden === true;
      const ownerSide =
        (engine ? resolveOwnerSide(engine, projectedCard.ownerId) : undefined) ?? "playerOne";
      const definitionId = cardsMaps?.cardInstances[cardId];
      const definition = definitionId ? cardCatalog.get(definitionId) : undefined;
      const label = isMasked ? "A card" : (definition?.fullName ?? definition?.name ?? cardId);

      return {
        cardId,
        definitionId: definitionId ?? cardId,
        label,
        inkType:
          "inkType" in (definition ?? {})
            ? (definition as { inkType: string[] }).inkType
            : undefined,
        inkable:
          "inkable" in (definition ?? {})
            ? (definition as { inkable: boolean }).inkable
            : undefined,
        isMasked,
        ownerSide,
        cardType: definition && "cardType" in definition ? definition.cardType : undefined,
        set: definition && "set" in definition ? definition.set : undefined,
        cardNumber: definition && "cardNumber" in definition ? definition.cardNumber : undefined,
      };
    }

    const definitionId = cardsMaps?.cardInstances[cardId];
    if (!definitionId) {
      return null;
    }
    const definition = definitionId ? cardCatalog.get(definitionId) : undefined;
    if (!definition) {
      return null;
    }

    return {
      cardId,
      definitionId,
      label: definition.fullName ?? definition.name,
      inkType: "inkType" in definition ? definition.inkType : undefined,
      inkable: "inkable" in definition ? definition.inkable : undefined,
      isMasked: false,
      ownerSide: "playerOne",
      cardType: "cardType" in definition ? definition.cardType : undefined,
      set: "set" in definition ? definition.set : undefined,
      cardNumber: "cardNumber" in definition ? definition.cardNumber : undefined,
    };
  };
}

function resolveOwnerSide(
  engine: LorcanaClient,
  ownerId: string | undefined,
): LorcanaPlayerSide | undefined {
  if (!ownerId) {
    return undefined;
  }

  const [playerOneId, playerTwoId] = engine.getBoard().playerOrder.map(String);
  if (ownerId === playerOneId) {
    return "playerOne";
  }
  if (ownerId === playerTwoId) {
    return "playerTwo";
  }
  return undefined;
}

export class SpectatorMatchOrchestrator {
  readonly readModel = new SpectatorReadModel();
  readonly #gateway: GatewayClientStore;
  readonly #cardsMaps: CardsMaps;
  #engine: LorcanaClient;

  constructor(args: {
    gateway: GatewayClientStore;
    state: LorcanaMatchState;
    cardsMaps: CardsMaps;
    recentHistory?: SpectatorRecentHistory;
  }) {
    this.#gateway = args.gateway;
    this.#cardsMaps = args.cardsMaps;
    const players = Object.keys(args.cardsMaps.owners).map((id) => ({ id }));
    this.#engine = createLorcanaClient({
      seed: args.state.ctx.random.seed,
      cardsMaps: args.cardsMaps,
      cardCatalog: getLorcanaCardCatalogSync(),
      players,
      playerId: "spectator",
      role: "spectator",
      matchID: args.state.ctx.matchID,
      gameID: args.state.ctx.gameID,
      goingFirst: createPlayerId(String(players[0]?.id ?? "player_one")),
    });
    this.#engine.loadState(args.state);

    if (args.recentHistory) {
      this.readModel.pushEntries(
        createSpectatorHistoryEntries({
          acceptedMoves: args.recentHistory.acceptedMoves,
          engineLogs: args.recentHistory.engineLogs,
          engine: this.#engine,
          cardsMaps: this.#cardsMaps,
          resolveActorSide: (actorId) => this.resolveActorSide(actorId),
        }),
      );
    }
  }

  get currentEngine(): LorcanaClient {
    return this.#engine;
  }

  dispose(): void {
    this.#gateway.send({ type: "leave_game", gameId: this.#engine.getState().ctx.gameID });
  }

  applyStateUpdate(msg: {
    actorId: string;
    moveType: string;
    stateVersion: number;
    patches: unknown[];
    acceptedMove?: SpectatorAcceptedMove;
    engineLogs?: SpectatorEngineLog[];
  }): void {
    const nextState = applyPatches(
      structuredClone(this.#engine.getState()) as LorcanaMatchState,
      msg.patches as Patch[],
    );
    this.#engine.loadState(nextState);

    if (msg.acceptedMove && isLorcanaSimulatorMoveId(msg.acceptedMove.moveId)) {
      this.readModel.pushEntries([
        createLiveEntry({
          acceptedMove: msg.acceptedMove,
          engineLogs: msg.engineLogs ?? [],
          engine: this.#engine,
          cardsMaps: this.#cardsMaps,
          resolveActorSide: (actorId) => this.resolveActorSide(actorId),
        }),
      ]);
      return;
    }

    this.readModel.notifyStateUpdated();
  }

  private resolveActorSide(actorId: string): LorcanaPlayerSide | undefined {
    const [playerOneId, playerTwoId] = this.#engine.getBoard().playerOrder.map(String);
    if (actorId === playerOneId) {
      return "playerOne";
    }
    if (actorId === playerTwoId) {
      return "playerTwo";
    }
    return undefined;
  }
}
