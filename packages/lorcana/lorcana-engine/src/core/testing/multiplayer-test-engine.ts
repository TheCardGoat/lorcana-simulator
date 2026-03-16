/**
 * Responsibility: generic multiplayer test harness.
 * Wires one authoritative `ServerEngine` with per-view `ClientEngine` instances via
 * `InMemoryTransport`, so tests exercise sync/serialization behavior end-to-end.
 * This class must stay game-agnostic and avoid game-specific fixture/projection logic.
 *
 * Docs:
 * - ../../docs/ENGINE_SIMPLIFICATION_PLAN.md
 */

import type {
  DeepReadonly,
  MatchRuntimeConfig,
  MatchState,
  FilteredMatchView,
  MatchStaticResources,
  MoveDefinition,
  MoveInput,
} from "../runtime";
import type { CardQueryAPI } from "../runtime/card-runtime";
import { createCardQueryAPI } from "../runtime/card-runtime";
import type { BaseCardDefinition, BaseCardMeta } from "../runtime/card-contracts";
import type { Player } from "../runtime/match-runtime.types";
import {
  createInMemoryTransportPair,
  type InMemoryTransport,
} from "../runtime/in-memory-transport";
import type {
  GameEngine,
  EngineActorContext,
  EngineMoveValidationResult,
  EngineMoveExecutionResult,
  EngineMoveHistoryEntry,
} from "../engine/contracts";
import { CoreTestEngine } from "./core-test-engine";
import type { GameTestView, PlayerActionInterface } from "./core-test-engine";
import { ServerEngine } from "../engine/server-engine";
import { ClientEngine } from "../engine/client-engine";

export const SPECTATOR_PLAYER_ID = "spectator";
export const CANONICAL_PLAYER_ONE = "player_one";
export const CANONICAL_PLAYER_TWO = "player_two";

type MultiplayerMoveDefinitions<G, TCardDerived extends object> = Record<
  string,
  MoveDefinition<G, any, any, unknown, TCardDerived>
>;

type InferMoveInputMap<TMoves extends MultiplayerMoveDefinitions<any, any>> = {
  [K in keyof TMoves]: TMoves[K] extends MoveDefinition<any, any, infer TInput, any, any>
    ? TInput
    : MoveInput;
};

export interface MultiplayerTestEngineConfig<
  G,
  TCardDefinition extends BaseCardDefinition = BaseCardDefinition,
  TCardDerived extends object = {},
  TStateView = FilteredMatchView<G>,
> {
  runtimeConfig: MatchRuntimeConfig<
    G,
    MultiplayerMoveDefinitions<G, TCardDerived>,
    TCardDefinition,
    TCardDerived,
    TStateView
  >;
  players: Player[];
  seed?: string;
  staticResources: MatchStaticResources<TCardDefinition>;
  includeSpectator?: boolean;
  debugServerCommunication?: boolean;
  engines?: {
    clientEngines?: Record<
      string,
      {
        engine: ClientEngine<
          G,
          TCardDefinition,
          TCardDerived,
          TStateView,
          MultiplayerMoveDefinitions<G, TCardDerived>
        >;
        player: Player;
      }
    >;
    spectatorEngine?: ClientEngine<G, TCardDefinition, TCardDerived, TStateView>;
    serverEngine?: ServerEngine<
      G,
      TCardDefinition,
      TCardDerived,
      TStateView,
      MultiplayerMoveDefinitions<G, TCardDerived>
    >;
  };
}

export interface SyncOptions {
  timeoutMs?: number;
  pollIntervalMs?: number;
}

export class MultiplayerTestEngine<
  G,
  TCardDefinition extends BaseCardDefinition = BaseCardDefinition,
  TCardDerived extends object = {},
  TStateView = FilteredMatchView<G>,
> extends CoreTestEngine<TStateView, Record<string, MoveInput>, MatchState<G>> {
  private serverEngine: ServerEngine<
    G,
    TCardDefinition,
    TCardDerived,
    TStateView,
    MultiplayerMoveDefinitions<G, TCardDerived>
  >;
  private playerEngines: Map<
    GameTestView,
    ClientEngine<
      G,
      TCardDefinition,
      TCardDerived,
      TStateView,
      MultiplayerMoveDefinitions<G, TCardDerived>
    >
  > = new Map();
  private transportPairs: Map<string, { client: InMemoryTransport; server: InMemoryTransport }> =
    new Map();
  private config: MultiplayerTestEngineConfig<G, TCardDefinition, TCardDerived, TStateView>;
  private initialized: boolean = false;

  constructor(config: MultiplayerTestEngineConfig<G, TCardDefinition, TCardDerived, TStateView>) {
    super();
    this.config = config;

    this.serverEngine =
      config.engines?.serverEngine ??
      new ServerEngine({
        runtimeConfig: config.runtimeConfig,
        players: config.players,
        seed: config.seed,
        staticResources: config.staticResources,
        debugMode: config.debugServerCommunication,
      });

    for (const player of config.players) {
      const transportPair = createInMemoryTransportPair();
      transportPair.identifier = `${player.id}:in-memory-transport`;
      this.transportPairs.set(player.id, transportPair);
      this.serverEngine.acceptConnection(player.id, transportPair.server);

      const clientEngine =
        config.engines?.clientEngines?.[player.id].engine ||
        new ClientEngine({
          playerId: player.id,
          transport: transportPair.client,
          role: "player",
          runtimeConfig: config.runtimeConfig,
          staticResources: config.staticResources,
          debugMode: config.debugServerCommunication,
          identifier: `${player.id}:client-engine`,
          players: config.players,
          seed: config.seed,
        });
      clientEngine.setTransport(transportPair.client);

      const view = player.id === config.players[0].id ? "playerOne" : "playerTwo";

      this.playerEngines.set(view, clientEngine);
    }

    if (config.includeSpectator) {
      const spectatorTransport = createInMemoryTransportPair();
      spectatorTransport.identifier = `${SPECTATOR_PLAYER_ID}:in-memory-transport`;
      this.transportPairs.set(SPECTATOR_PLAYER_ID, spectatorTransport);
      this.serverEngine.acceptConnection(SPECTATOR_PLAYER_ID, spectatorTransport.server);

      const spectatorEngine =
        config.engines?.spectatorEngine ||
        new ClientEngine({
          playerId: SPECTATOR_PLAYER_ID,
          transport: spectatorTransport.client,
          role: SPECTATOR_PLAYER_ID,
          runtimeConfig: config.runtimeConfig,
          staticResources: config.staticResources,
          players: config.players,
          seed: config.seed,
          debugMode: config.debugServerCommunication,
          identifier: `${SPECTATOR_PLAYER_ID}:client-engine`,
        });

      spectatorEngine.setTransport(spectatorTransport.client);
      this.playerEngines.set(SPECTATOR_PLAYER_ID, spectatorEngine);
    }
  }

  /**
   * Synchronously initialize all client engines.
   * In sync mode, all transports are fully synchronous - no async delays.
   */
  initializeSync(): void {
    if (this.initialized) {
      return;
    }
    for (const engine of this.playerEngines.values()) {
      engine.connectSync();
    }
    this.initialized = true;
  }

  async initialize(): Promise<void> {
    this.initializeSync();
  }

  static async create<
    G,
    TCardDefinition extends BaseCardDefinition = BaseCardDefinition,
    TCardDerived extends object = {},
    TStateView = FilteredMatchView<G>,
  >(
    config: MultiplayerTestEngineConfig<G, TCardDefinition, TCardDerived, TStateView>,
  ): Promise<MultiplayerTestEngine<G, TCardDefinition, TCardDerived, TStateView>> {
    const engine = new MultiplayerTestEngine<G, TCardDefinition, TCardDerived, TStateView>(config);
    await engine.initialize();
    return engine;
  }

  getStateForView(view: GameTestView): TStateView {
    if (view === "authoritative") {
      return this.getAuthoritativeVisibleState();
    }

    const engine = this.playerEngines.get(view);
    if (!engine) {
      throw new Error(`View not found: ${view}`);
    }

    return engine.getBoard() as TStateView;
  }

  getAuthoritativeState(): DeepReadonly<MatchState<G>> {
    return this.serverEngine.getState();
  }

  executeMoveForView(
    view: GameTestView,
    moveId: string,
    input: MoveInput,
  ): EngineMoveExecutionResult {
    if (view === "authoritative") {
      return this.serverEngine.executeMove(moveId, input);
    }
    const engine = this.playerEngines.get(view);
    if (!engine) {
      return { success: false, reason: "View not found", code: "VIEW_NOT_FOUND" };
    }
    return engine.executeMove(moveId, input);
  }

  validateMoveForView(
    view: GameTestView,
    moveId: string,
    input: MoveInput,
  ): EngineMoveValidationResult {
    if (view === "authoritative") {
      return this.serverEngine.validateMove(moveId, input);
    }
    const engine = this.playerEngines.get(view);
    if (!engine) {
      return { valid: false, reason: "View not found", code: "VIEW_NOT_FOUND" };
    }
    return engine.validateMove(moveId, input);
  }

  getEngineForView(view: GameTestView): GameEngine<TStateView> {
    if (view === "authoritative") {
      return new ServerEngineAdapter(this.serverEngine, () => this.getAuthoritativeVisibleState());
    }

    const engine = this.playerEngines.get(view);
    if (!engine) {
      throw new Error(`View not found: ${view}`);
    }

    return new ClientEngineAdapter(engine);
  }

  getStateID(): number {
    return this.serverEngine.getStateID();
  }

  getProjection() {
    return this.serverEngine.getBoard();
  }

  getMoveHistory(limit?: number): EngineMoveHistoryEntry[] {
    return this.serverEngine.getMoveHistory(limit);
  }

  async dispose(): Promise<void> {
    await this.serverEngine.dispose(true);

    for (const engine of this.playerEngines.values()) {
      await engine.dispose(true);
    }

    this.playerEngines.clear();
    this.transportPairs.clear();
    this.initialized = false;
  }

  asPlayerOne(): PlayerActionInterface<TStateView> {
    return this.createPlayerActionInterface(
      "playerOne",
      this.config.players[0]?.id || CANONICAL_PLAYER_ONE,
    );
  }

  asPlayerTwo(): PlayerActionInterface<TStateView> {
    return this.createPlayerActionInterface(
      "playerTwo",
      this.config.players[1]?.id || CANONICAL_PLAYER_TWO,
    );
  }

  override asPlayer(playerId: string): PlayerActionInterface<TStateView> {
    const view = this.resolveViewForPlayerId(playerId);
    if (!view) {
      throw new Error(`Unknown player: ${playerId}`);
    }
    return this.createPlayerActionInterface(view, playerId);
  }

  private createPlayerActionInterface(
    view: GameTestView,
    playerId: string,
  ): PlayerActionInterface<TStateView> {
    return {
      playerId,
      getState: () => this.getStateForView(view) as DeepReadonly<TStateView>,
      getBoard: () => this.getStateForView(view),
      executeMove: (moveId, params) => this.executeMoveForView(view, String(moveId), params),
      canExecuteMove: (moveId, params) =>
        this.validateMoveForView(view, String(moveId), params).valid,
      getValidMoves: () => [],
    };
  }

  async syncToStateID(targetStateID: number, options: SyncOptions = {}): Promise<void> {
    const timeoutMs = options.timeoutMs ?? 1000;
    const pollIntervalMs = options.pollIntervalMs ?? 10;
    const startTime = Date.now();
    while (Date.now() - startTime < timeoutMs) {
      const allSynced = Array.from(this.playerEngines.values()).every(
        (e) => e.getStateID() >= targetStateID,
      );
      if (allSynced) {
        return;
      }
      await new Promise((r) => setTimeout(r, pollIntervalMs));
    }

    throw new Error(`Timeout waiting for sync to state ${targetStateID}`);
  }

  async sync(options: SyncOptions = {}): Promise<void> {
    await this.syncToStateID(this.serverEngine.getStateID(), options);
  }

  getServerEngine(): ServerEngine<
    G,
    TCardDefinition,
    TCardDerived,
    TStateView,
    MultiplayerMoveDefinitions<G, TCardDerived>
  > {
    return this.serverEngine;
  }

  /**
   * Get the CardQueryAPI for accessing card definitions and metadata.
   * This provides rich RuntimeCardWithDefinition access without requiring manual registry building.
   */
  getCardQuery(): CardQueryAPI<TCardDefinition, BaseCardMeta, TCardDerived> {
    const state = this.serverEngine.getRuntime().getState();
    return createCardQueryAPI(state, this.config.staticResources, {
      deriveRuntimeCard: this.config.runtimeConfig.deriveRuntimeCard,
    });
  }

  getClientEngine(
    view: "playerOne" | "playerTwo" | "spectator",
  ):
    | ClientEngine<
        G,
        TCardDefinition,
        TCardDerived,
        TStateView,
        MultiplayerMoveDefinitions<G, TCardDerived>
      >
    | GameEngine<TStateView>
    | undefined;
  override getClientEngine(playerId: string): GameEngine<TStateView> | undefined;
  getClientEngine(
    playerOrView: string,
  ):
    | ClientEngine<
        G,
        TCardDefinition,
        TCardDerived,
        TStateView,
        MultiplayerMoveDefinitions<G, TCardDerived>
      >
    | GameEngine<TStateView>
    | undefined {
    const view =
      playerOrView === "playerOne" || playerOrView === "playerTwo" || playerOrView === "spectator"
        ? playerOrView
        : this.resolveViewForPlayerId(playerOrView);

    if (!view || view === "authoritative") {
      return undefined;
    }

    const engine = this.playerEngines.get(view);
    if (!engine) {
      return undefined;
    }

    if (
      playerOrView === "playerOne" ||
      playerOrView === "playerTwo" ||
      playerOrView === "spectator"
    ) {
      return engine;
    }

    return new ClientEngineAdapter(engine);
  }

  areAllClientsSynced(): boolean {
    const serverStateID = this.serverEngine.getStateID();
    return Array.from(this.playerEngines.values()).every((e) => e.getStateID() >= serverStateID);
  }

  getConnectedPlayerIds(): string[] {
    return this.serverEngine.getConnectedPlayerIds();
  }

  protected override resolveViewForPlayerId(playerId: string): GameTestView | undefined {
    const firstId = this.config.players[0]?.id;
    const secondId = this.config.players[1]?.id;
    if (playerId === firstId || playerId === CANONICAL_PLAYER_ONE || playerId === "p1") {
      return "playerOne";
    }
    if (playerId === secondId || playerId === CANONICAL_PLAYER_TWO || playerId === "p2") {
      return "playerTwo";
    }
    if (playerId === "spectator") {
      return this.config.includeSpectator ? "spectator" : undefined;
    }
    if (playerId === "authoritative") {
      return "authoritative";
    }
    return undefined;
  }

  private getAuthoritativeVisibleState(): TStateView {
    if (typeof this.config.runtimeConfig.projectBoard === "function") {
      return this.serverEngine
        .getRuntime()
        .getProjectedBoardView({ role: "judge" }, { serverTimestamp: Date.now() }) as TStateView;
    }

    return this.serverEngine.getState().G as unknown as TStateView;
  }

  getBoardForView(view: GameTestView): TStateView {
    return this.getStateForView(view);
  }
}

class ServerEngineAdapter<
  G,
  TCardDefinition extends BaseCardDefinition = BaseCardDefinition,
  TCardDerived extends object = {},
  TStateView = FilteredMatchView<G>,
> implements GameEngine<
  TStateView,
  TStateView,
  InferMoveInputMap<MultiplayerMoveDefinitions<G, TCardDerived>>
> {
  constructor(
    private serverEngine: ServerEngine<
      G,
      TCardDefinition,
      TCardDerived,
      TStateView,
      MultiplayerMoveDefinitions<G, TCardDerived>
    >,
    private readonly getVisibleState: () => TStateView,
  ) {}

  getState(): DeepReadonly<TStateView> {
    return this.getVisibleState() as DeepReadonly<TStateView>;
  }

  getBoard(): DeepReadonly<TStateView> {
    return this.getVisibleState() as DeepReadonly<TStateView>;
  }

  getStateID(): number {
    return this.serverEngine.getStateID();
  }

  validateMove<
    K extends keyof InferMoveInputMap<MultiplayerMoveDefinitions<G, TCardDerived>> & string,
  >(
    moveId: K,
    input: InferMoveInputMap<MultiplayerMoveDefinitions<G, TCardDerived>>[K],
  ): EngineMoveValidationResult {
    return this.serverEngine.validateMove(moveId, input);
  }

  executeMove<
    K extends keyof InferMoveInputMap<MultiplayerMoveDefinitions<G, TCardDerived>> & string,
  >(
    moveId: K,
    input: InferMoveInputMap<MultiplayerMoveDefinitions<G, TCardDerived>>[K],
  ): EngineMoveExecutionResult {
    return this.serverEngine.executeMove(moveId, input);
  }

  enumerateMoves(): Array<
    keyof InferMoveInputMap<MultiplayerMoveDefinitions<G, TCardDerived>> & string
  > {
    return this.serverEngine.enumerateMoves();
  }

  getMoveHistory(limit?: number): EngineMoveHistoryEntry[] {
    return this.serverEngine.getMoveHistory(limit);
  }

  getActorContext(): EngineActorContext {
    return { role: "judge" };
  }

  async dispose(): Promise<void> {
    await this.serverEngine.dispose();
  }
}

class ClientEngineAdapter<
  G,
  TCardDefinition extends BaseCardDefinition = BaseCardDefinition,
  TCardDerived extends object = {},
  TStateView = FilteredMatchView<G>,
> implements GameEngine<
  TStateView,
  TStateView,
  InferMoveInputMap<MultiplayerMoveDefinitions<G, TCardDerived>>
> {
  constructor(
    private clientEngine: ClientEngine<
      G,
      TCardDefinition,
      TCardDerived,
      TStateView,
      MultiplayerMoveDefinitions<G, TCardDerived>
    >,
  ) {}

  getState(): DeepReadonly<TStateView> {
    return this.clientEngine.getBoard() as DeepReadonly<TStateView>;
  }

  getBoard(): DeepReadonly<TStateView> {
    return this.clientEngine.getBoard() as DeepReadonly<TStateView>;
  }

  getStateID(): number {
    return this.clientEngine.getStateID();
  }

  validateMove<
    K extends keyof InferMoveInputMap<MultiplayerMoveDefinitions<G, TCardDerived>> & string,
  >(
    moveId: K,
    input: InferMoveInputMap<MultiplayerMoveDefinitions<G, TCardDerived>>[K],
  ): EngineMoveValidationResult {
    return this.clientEngine.validateMove(moveId, input);
  }

  executeMove<
    K extends keyof InferMoveInputMap<MultiplayerMoveDefinitions<G, TCardDerived>> & string,
  >(
    moveId: K,
    input: InferMoveInputMap<MultiplayerMoveDefinitions<G, TCardDerived>>[K],
  ): EngineMoveExecutionResult {
    return this.clientEngine.executeMove(moveId, input);
  }

  enumerateMoves(): Array<
    keyof InferMoveInputMap<MultiplayerMoveDefinitions<G, TCardDerived>> & string
  > {
    return this.clientEngine.enumerateMoves();
  }

  getMoveHistory(limit?: number): EngineMoveHistoryEntry[] {
    return this.clientEngine.getMoveHistory(limit);
  }

  getActorContext(): EngineActorContext {
    return this.clientEngine.getActorContext();
  }

  async dispose(): Promise<void> {
    await this.clientEngine.dispose();
  }
}
