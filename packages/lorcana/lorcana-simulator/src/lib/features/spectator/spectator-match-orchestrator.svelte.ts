import { getLorcanaCardCatalogSync } from "@tcg/lorcana-cards/cards/sync";
import {
  createPlayerId,
  createLorcanaClient,
  type LorcanaProjectedBoardView,
  type CardsMaps,
  type LorcanaClient,
  type LorcanaMatchState,
} from "@tcg/lorcana-engine";
import { applyPatches, type Patch } from "immer";
import type { GatewayClientStore } from "../gateway/gateway-client.svelte.js";
import type {
  LorcanaPlayerSide,
  LorcanaCardSnapshot,
  LorcanaSimulatorMoveId,
  LorcanaZoneId,
  MoveLogEntrySnapshot,
  MoveLogRelatedEntrySnapshot,
  SimulatorSerializedValue,
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

function snapshotRelatedEntries(
  history: SpectatorRecentHistory["engineLogs"],
): MoveLogRelatedEntrySnapshot[] {
  return history.map((entry) => ({
    sourceEventSeqs: [...entry.sourceEventSeqs],
    ...(entry.defaultMessage?.key && entry.defaultMessage.values
      ? {
          defaultMessage: {
            key: entry.defaultMessage.key,
            values: entry.defaultMessage.values as SimulatorSerializedObject,
          },
        }
      : {}),
  }));
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

    const relatedEntries = snapshotRelatedEntries(
      args.engineLogs.filter((entry) => entry.sourceEventSeqs.includes(move.stateVersion)),
    );
    const params = normalizePersistedMoveParams(move.input);

    const entry: MoveLogEntrySnapshot = {
      id: `spectator-history-${move.stateVersion}-${index}-${move.moveId}`,
      timestamp: move.timestamp,
      turnNumber: move.turnNumber,
      moveId: move.moveId,
      actorSide: args.resolveActorSide(move.actorId),
      title: "",
      rawLogRegistry: {
        move: {
          moveId: move.moveId,
          params,
          playerId: move.actorId,
          timestamp: move.timestamp,
        },
        relatedLogEntries: relatedEntries,
        cardReferences: buildLogCardReferences(args.engine, args.cardsMaps, params, relatedEntries),
      },
    };

    return [{ ...entry, title: formatEventLogBody(entry).text }];
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
  const relatedLogEntries = snapshotRelatedEntries(args.engineLogs);
  const entry: MoveLogEntrySnapshot = {
    id: `spectator-live-${args.acceptedMove.turnNumber}-${args.acceptedMove.timestamp}-${moveId}`,
    timestamp: args.acceptedMove.timestamp,
    turnNumber: args.acceptedMove.turnNumber,
    moveId,
    actorSide: args.resolveActorSide(args.acceptedMove.actorId),
    title: "",
    rawLogRegistry: {
      move: {
        moveId,
        params,
        playerId: args.acceptedMove.actorId,
        timestamp: args.acceptedMove.timestamp,
      },
      relatedLogEntries,
      cardReferences: buildLogCardReferences(
        args.engine,
        args.cardsMaps,
        params,
        relatedLogEntries,
      ),
    },
  };

  return { ...entry, title: formatEventLogBody(entry).text };
}

function buildLogCardReferences(
  engine: LorcanaClient | undefined,
  cardsMaps: CardsMaps | undefined,
  params: SimulatorSerializedObject | undefined,
  relatedLogEntries: MoveLogRelatedEntrySnapshot[],
): LorcanaCardSnapshot[] {
  if (!engine && !cardsMaps) {
    return [];
  }

  const cardIds = new Set<string>();

  const addCardId = (value: SimulatorSerializedValue | undefined) => {
    if (typeof value === "string" && value.trim().length > 0 && value.startsWith("t")) {
      cardIds.add(value);
    }
  };

  const addAllCardIds = (obj: SimulatorSerializedObject | undefined) => {
    if (!obj) {
      return;
    }

    addCardId(obj.cardId);
    addCardId(obj.attackerId);
    addCardId(obj.characterId);
    addCardId(obj.defenderId);
    addCardId(obj.locationId);
    addCardId(obj.shiftTargetId);
    addCardId(obj.sourceCardId);
    addCardId(obj.sourceId);

    for (const listKey of [
      "cardIds",
      "drawn",
      "lookedAt",
      "mulliganed",
      "singerIds",
      "targets",
    ] as const) {
      const list = obj[listKey];
      if (!Array.isArray(list)) {
        continue;
      }

      for (const item of list) {
        addCardId(item);
      }
    }
  };

  addAllCardIds(params);

  for (const entry of relatedLogEntries) {
    addAllCardIds(entry.defaultMessage?.values);
  }

  if (cardIds.size === 0) {
    return [];
  }

  const board = engine?.getBoard();
  const cardCatalog = getLorcanaCardCatalogSync();
  const references: LorcanaCardSnapshot[] = [];

  for (const cardId of cardIds) {
    const projectedCard = board?.cards[cardId];
    if (projectedCard) {
      const ownerSide =
        (engine ? resolveOwnerSide(engine, projectedCard.ownerId) : undefined) ?? "playerOne";
      const zoneId = parseBaseZone(projectedCard.zone) ?? "deck";
      references.push(projectCard(board, cardId, ownerSide, zoneId));
      continue;
    }

    const definitionId = cardsMaps?.cardInstances[cardId];
    if (!definitionId) {
      continue;
    }
    const definition = definitionId ? cardCatalog.get(definitionId) : undefined;
    if (!definition) {
      continue;
    }

    references.push({
      cardId,
      definitionId,
      label: definition.fullName ?? definition.name,
      ownerId: resolveOwnerId(cardsMaps, cardId) ?? "",
      ownerSide: "playerOne",
      zoneId: "deck",
      facePresentation: "faceUp",
      isMasked: false,
      cardType: "cardType" in definition ? definition.cardType : undefined,
      cost: "cost" in definition ? definition.cost : undefined,
      inkType: "inkType" in definition ? definition.inkType : undefined,
      inkable: "inkable" in definition ? definition.inkable : undefined,
      baseLoreValue: "lore" in definition ? definition.lore : undefined,
      baseStrength: "strength" in definition ? definition.strength : undefined,
      baseWillpower: "willpower" in definition ? definition.willpower : undefined,
      cardNumber: "cardNumber" in definition ? definition.cardNumber : undefined,
      classifications: "classifications" in definition ? definition.classifications : undefined,
      cardsUnderCount: 0,
      damage: 0,
      hasQuestRestriction: false,
      isDrying: false,
      keywords: [],
      readyState: "unknown",
      strength: "strength" in definition ? definition.strength : undefined,
      willpower: "willpower" in definition ? definition.willpower : undefined,
      loreValue: "lore" in definition ? definition.lore : undefined,
    });
  }

  return references;
}

function projectCard(
  board: LorcanaProjectedBoardView,
  cardId: string,
  ownerSide: LorcanaPlayerSide,
  zoneId: LorcanaZoneId,
): LorcanaCardSnapshot {
  const card = board.cards[cardId];
  const isMasked = card?.hidden === true;
  const label = isMasked ? "Hidden Card" : (card?.fullName ?? cardId);
  const atLocationCard = card?.atLocationId ? board.cards[card.atLocationId] : undefined;

  return {
    cardId,
    atLocationId: card?.atLocationId,
    atLocationLabel: atLocationCard?.fullName,
    cardsUnderCount: card?.cardsUnder?.length ?? 0,
    damage: card?.damage ?? 0,
    definitionId: card?.definitionId ?? cardId,
    keywordValues: card?.keywordValues,
    keywords: card?.keywords ?? [],
    hasQuestRestriction: card?.hasQuestRestriction ?? false,
    isDrying: card?.drying ?? false,
    isMasked,
    facePresentation: zoneId === "inkwell" && isMasked ? "faceDown" : "faceUp",
    label,
    ownerId: card?.ownerId ?? "",
    ownerSide,
    readyState: card?.exerted === true ? "exerted" : card?.exerted === false ? "ready" : "unknown",
    strength: card?.strength,
    willpower: card?.willpower,
    zoneId,
  };
}

function resolveOwnerId(cardsMaps: CardsMaps | undefined, cardId: string): string | undefined {
  if (!cardsMaps) {
    return undefined;
  }

  for (const [ownerId, instanceIds] of Object.entries(cardsMaps.owners)) {
    if (instanceIds.includes(cardId)) {
      return ownerId;
    }
  }

  return undefined;
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
