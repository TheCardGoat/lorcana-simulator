/**
 * Responsibility: authoritative runtime host and state distributor.
 * Owns command validation/execution against `MatchRuntime`, per-recipient view filtering,
 * and broadcasting sync/patch updates to connected clients.
 *
 * Docs:
 * - ../../docs/ENGINE_SIMPLIFICATION_PLAN.md
 */

import {
  MatchRuntime,
  createCardsMapsFromStaticResources,
  type DeepReadonly,
  type MatchRuntimeConfig,
  type MatchState,
  type FilteredMatchView,
  type ViewRoleContext,
  type CommandEnvelope,
  type CommandResult,
  type MoveInput,
  type MatchStaticResources,
  type MoveDefinition,
  type RuntimeActorRole,
  filterPatches,
  canApplyPatchesToState,
} from "../runtime";
import type { Player } from "../runtime/match-runtime.types";
import type {
  InMemoryTransport,
  ClientMessage,
  UpdatePatchMessage,
  UpdateFullMessage,
  SyncFullMessage,
  ErrorMessage,
} from "../runtime/protocol-types";
import {
  PROTOCOL_VERSION,
  isUpdateActionMessage,
  isSyncRequestMessage,
} from "../runtime/protocol-types";
import type {
  EngineProjectionSnapshot,
  GameEngine,
  EngineActorContext,
  EngineMoveValidationResult,
  EngineMoveExecutionResult,
  EngineMoveHistoryEntry,
} from "./contracts";
import type { BaseCardDefinition } from "../runtime/card-contracts";

import { getLogger } from "@logtape/logtape";

const logger = getLogger(["core-engine", "server-engine"]);

type EngineMoveDefinitions<G, TCardDerived extends object = {}> = Record<
  string,
  MoveDefinition<G, any, any, unknown, TCardDerived>
>;

type InferMoveInputMap<TMoves extends EngineMoveDefinitions<any, any>> = {
  [K in keyof TMoves]: TMoves[K] extends MoveDefinition<any, any, infer TInput, any, any>
    ? TInput
    : MoveInput;
};

export interface ServerEngineConfig<
  G,
  TCardDefinition extends BaseCardDefinition = BaseCardDefinition,
  TCardDerived extends object = {},
  TBoardView = FilteredMatchView<G>,
  TMoves extends EngineMoveDefinitions<G, TCardDerived> = EngineMoveDefinitions<G, TCardDerived>,
> {
  runtimeConfig: MatchRuntimeConfig<G, TMoves, TCardDefinition, TCardDerived, TBoardView>;
  players: Player[];
  seed?: string;
  staticResources: MatchStaticResources<TCardDefinition>;
  debugMode?: boolean;
}

export interface StateSnapshot<G> {
  stateID: number;
  state: MatchState<G>;
  timestamp: number;
}

// TO speed up development, we're temporarily disabling patch sending and just sending full state updates on every move. This is because we don't yet have a robust way to generate and filter patches for the complex state updates in our test game, and implementing that is taking more time than expected. Once we have a better patch generation/filtering system in place, we can re-enable patch sending for more efficient updates.
const arePatchesDisabled = true;

export class ServerEngine<
  G,
  TCardDefinition extends BaseCardDefinition = BaseCardDefinition,
  TCardDerived extends object = {},
  TBoardView = FilteredMatchView<G>,
  TMoves extends EngineMoveDefinitions<G, TCardDerived> = EngineMoveDefinitions<G, TCardDerived>,
> implements GameEngine<MatchState<G>, TBoardView, InferMoveInputMap<TMoves>> {
  private runtime: MatchRuntime<G, TMoves, TCardDefinition, TCardDerived, TBoardView>;
  private transports: Map<string, InMemoryTransport> = new Map();
  private stateHistory: StateSnapshot<G>[] = [];
  private moveHistory: EngineMoveHistoryEntry[] = [];
  private debug: boolean = false;
  private staticResources: MatchStaticResources<TCardDefinition>;

  constructor(config: ServerEngineConfig<G, TCardDefinition, TCardDerived, TBoardView, TMoves>) {
    this.debug = config.debugMode ?? false;
    this.staticResources = config.staticResources;
    this.runtime = new MatchRuntime(config.runtimeConfig, {
      players: config.players,
      seed: config.seed,
      //TODO: We could pass both `cardsMaps` and `cardCatalog` from constructuror
      cardsMaps: createCardsMapsFromStaticResources(config.staticResources),
      cardCatalog: config.staticResources.cards,
    });

    this.stateHistory.push({
      stateID: 0,
      state: this.runtime.getState(),
      timestamp: Date.now(),
    });
  }

  private resolveAuthoritativeActorPlayerId(): string {
    const state = this.runtime.getState();
    return state.ctx.priority.holder ?? state.ctx.playerIds[0] ?? "";
  }

  acceptConnection(playerId: string, transport: InMemoryTransport): void {
    this.transports.set(playerId, transport);

    transport.onMessage((message) => {
      this.handleClientMessage(playerId, message as ClientMessage);
    });

    this.sendFullSync(playerId);
  }

  private handleClientMessage(playerId: string, message: ClientMessage): void {
    if (isUpdateActionMessage(message)) {
      const currentStateID = this.runtime.getCurrentStateID();
      if (message.prevStateID !== currentStateID) {
        this.sendError(playerId, "STALE_STATE", `Expected state ${currentStateID}`, true);
        return;
      }

      if (this.debug) {
        logger.debug(
          `Received command from player ${playerId}: ${message.command.move} with input:`,
          { input: message.command.input },
        );
      }

      const previousState = this.runtime.getState();
      const result = this.runtime.processCommand(
        message.command,
        playerId,
        message.prevStateID,
        Date.now(),
        "player",
      );

      if (result.success) {
        const processedResult = this.withPacketAnimations(
          result,
          previousState,
          message.command,
          playerId,
          "player",
        );
        const newStateID = this.runtime.getCurrentStateID();
        const newState = this.runtime.getState();
        this.stateHistory.push({
          stateID: newStateID,
          state: newState,
          timestamp: Date.now(),
        });
        this.moveHistory.push({
          moveId: message.command.move,
          input: message.command.input,
          playerId,
          role: "player",
          timestamp: Date.now(),
          stateID: newStateID,
          turnNumber: newState.ctx.status.turn,
        });

        this.broadcastStateUpdate(processedResult, newStateID);
      } else {
        this.sendError(playerId, "INVALID_MOVE", result.error || "Command failed", false);
      }
    } else if (isSyncRequestMessage(message)) {
      this.sendFullSync(playerId);
    }
  }

  private broadcastStateUpdate(
    result: Extract<CommandResult, { success: true }>,
    stateID: number,
  ): void {
    const fullState = this.runtime.getState();
    const patches = result.patches;
    const command = result.processedCommand;
    const animations = result.animations;

    for (const [playerId, transport] of this.transports) {
      const roleContext: ViewRoleContext =
        playerId === "spectator" ? { role: "spectator" } : { role: "player", playerID: playerId };

      const { filteredView, projectedView } = this.buildRecipientUpdate(playerId);

      const filteredPatches =
        patches && patches.length > 0
          ? filterPatches(patches, this.runtime.getState(), roleContext)
          : [];

      const canSendPatch =
        filteredPatches.length > 0 &&
        canApplyPatchesToState(filteredView, filteredPatches as unknown[]);

      const shouldSendPatch =
        canSendPatch &&
        !arePatchesDisabled &&
        typeof this.runtime.getRuntimeConfig().projectBoard !== "function";

      if (shouldSendPatch) {
        const message: UpdatePatchMessage = {
          type: "UPDATE_PATCH",
          stateID,
          prevStateID: stateID - 1, // This doesn't sound right
          protocolVersion: PROTOCOL_VERSION,
          matchID: fullState.ctx.matchID,
          processedCommand: command,
          animations,
          patchFormat: "immer",
          // TODO: WE should send patches of board state, not only state
          patchOps: filteredPatches,
        };

        if (this.debug) {
          logger.debug(`Broadcasting state update to player ${playerId} (stateID: ${stateID}):`, {
            message,
            command,
          });
        }

        transport.simulateReceive(message);
      } else {
        const message: UpdateFullMessage = {
          type: "UPDATE_FULL",
          reason: !shouldSendPatch ? "PATCH_DISABLED" : undefined,
          stateID,
          protocolVersion: PROTOCOL_VERSION,
          matchID: fullState.ctx.matchID,
          processedCommand: command,
          animations,
          state: filteredView,
          board: projectedView,
        };
        if (this.debug) {
          logger.debug(
            `Broadcasting full state update to player ${playerId} (stateID: ${stateID}):`,
            {
              message,
              command,
            },
          );
          console.log(JSON.stringify(projectedView, null, 2));
        }

        transport.simulateReceive(message);
      }
    }
  }

  private sendFullSync(playerId: string): void {
    const transport = this.transports.get(playerId);
    if (!transport) return;
    const fullState = this.runtime.getState();
    const { projectedView, filteredView } = this.buildRecipientUpdate(playerId);

    const message: SyncFullMessage = {
      type: "SYNC_FULL",
      stateID: fullState.ctx._stateID,
      state: filteredView,
      board: projectedView,
      protocolVersion: PROTOCOL_VERSION,
      matchID: fullState.ctx.matchID,
      matchData: {
        gameID: fullState.ctx.gameID,
        rulesetHash: fullState.ctx.rulesetHash,
        playerIds: [...fullState.ctx.playerIds],
      },
    };

    transport.simulateReceive(message);
  }

  private buildRecipientUpdate(playerId: string): {
    filteredView: FilteredMatchView<G>;
    projectedView: TBoardView | undefined;
  } {
    if (playerId === "spectator") {
      return {
        filteredView: this.runtime.getFilteredView({ role: "spectator" }),
        projectedView: this.runtime.getProjectedBoardView(
          { role: "spectator" },
          { serverTimestamp: Date.now() },
        ),
      };
    }

    return {
      filteredView: this.runtime.getFilteredView({
        role: "player",
        playerID: playerId,
      }),
      projectedView: this.runtime.getProjectedBoardView(
        { role: "player", playerID: playerId },
        { serverTimestamp: Date.now() },
      ),
    };
  }

  private sendError(
    playerId: string,
    code: ErrorMessage["code"],
    message: string,
    resyncRequired: boolean,
  ): void {
    const transport = this.transports.get(playerId);
    if (!transport) return;
    transport.simulateReceive({
      type: "ERROR",
      code,
      message,
      resyncRequired,
      currentStateID: this.runtime.getCurrentStateID(),
      protocolVersion: PROTOCOL_VERSION,
      matchID: this.runtime.getState().ctx.matchID,
    } as ErrorMessage);
  }

  getState(): DeepReadonly<MatchState<G>> {
    return this.runtime.getState() as DeepReadonly<MatchState<G>>;
  }

  getStateID(): number {
    return this.runtime.getCurrentStateID();
  }

  getBoard(): DeepReadonly<TBoardView> {
    return this.runtime.getProjectedBoardView(
      { role: "judge" },
      { serverTimestamp: Date.now() },
    ) as DeepReadonly<TBoardView>;
  }

  validateMove<K extends keyof InferMoveInputMap<TMoves> & string>(
    moveId: K,
    input: InferMoveInputMap<TMoves>[K],
  ): EngineMoveValidationResult;
  validateMove(moveId: string, input: MoveInput): EngineMoveValidationResult;
  validateMove(moveId: string, input: MoveInput): EngineMoveValidationResult {
    return this.validateMoveForPlayer(
      this.resolveAuthoritativeActorPlayerId(),
      moveId,
      input,
      "judge",
    );
  }

  validateMoveForPlayer<K extends keyof InferMoveInputMap<TMoves> & string>(
    playerId: string,
    moveId: K,
    input: InferMoveInputMap<TMoves>[K],
    actorRole?: RuntimeActorRole,
  ): EngineMoveValidationResult;
  validateMoveForPlayer(
    playerId: string,
    moveId: string,
    input: MoveInput,
    actorRole?: RuntimeActorRole,
  ): EngineMoveValidationResult;
  validateMoveForPlayer(
    playerId: string,
    moveId: string,
    input: MoveInput,
    actorRole: RuntimeActorRole = "player",
  ): EngineMoveValidationResult {
    const command: CommandEnvelope = {
      commandID: `validate-${Date.now()}`,
      move: moveId as keyof InferMoveInputMap<TMoves> & string,
      input,
    };
    return this.runtime.validateCommand(
      command,
      playerId,
      this.runtime.getCurrentStateID(),
      actorRole,
    );
  }

  executeMove<K extends keyof InferMoveInputMap<TMoves> & string>(
    moveId: K,
    input: InferMoveInputMap<TMoves>[K],
  ): EngineMoveExecutionResult;
  executeMove(moveId: string, input: MoveInput): EngineMoveExecutionResult;
  executeMove(moveId: string, input: MoveInput): EngineMoveExecutionResult {
    return this.executeMoveForPlayer(
      this.resolveAuthoritativeActorPlayerId(),
      moveId,
      input,
      "judge",
    );
  }

  executeMoveForPlayer<K extends keyof InferMoveInputMap<TMoves> & string>(
    playerId: string,
    moveId: K,
    input: InferMoveInputMap<TMoves>[K],
    actorRole?: RuntimeActorRole,
  ): EngineMoveExecutionResult;
  executeMoveForPlayer(
    playerId: string,
    moveId: string,
    input: MoveInput,
    actorRole?: RuntimeActorRole,
  ): EngineMoveExecutionResult;
  executeMoveForPlayer(
    playerId: string,
    moveId: string,
    input: MoveInput,
    actorRole: RuntimeActorRole = "player",
  ): EngineMoveExecutionResult {
    const command: CommandEnvelope = {
      commandID: `server-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      move: moveId as keyof InferMoveInputMap<TMoves> & string,
      input,
    };
    const previousState = this.runtime.getState();
    const result = this.runtime.processCommand(
      command,
      playerId,
      this.runtime.getCurrentStateID(),
      Date.now(),
      actorRole,
    );

    if (result.success) {
      const processedResult = this.withPacketAnimations(
        result,
        previousState,
        command,
        playerId,
        actorRole,
      );
      this.broadcastStateUpdate(processedResult, this.runtime.getCurrentStateID());

      return { success: true };
    }

    // TODO: Reply to sender with the error.
    return { success: false, reason: result.error, code: result.errorCode };
  }

  enumerateMoves(): Array<keyof InferMoveInputMap<TMoves> & string> {
    const playerId = this.resolveAuthoritativeActorPlayerId();
    if (!playerId) {
      return [];
    }

    return this.runtime.enumerateMovesForPlayer(playerId, "judge") as Array<
      keyof InferMoveInputMap<TMoves> & string
    >;
  }

  enumerateMovesForPlayer(playerId: string): Array<keyof InferMoveInputMap<TMoves> & string> {
    return this.runtime.enumerateMovesForPlayer(playerId, "player") as Array<
      keyof InferMoveInputMap<TMoves> & string
    >;
  }

  getMoveHistory(limit?: number): EngineMoveHistoryEntry[] {
    return limit && limit > 0 ? this.moveHistory.slice(-limit) : [...this.moveHistory];
  }

  getActorContext(): EngineActorContext {
    return { role: "judge" };
  }

  async dispose(skipLogs?: boolean): Promise<void> {
    for (const transport of this.transports.values()) {
      await transport.disconnect(skipLogs);
    }
    this.transports.clear();
  }

  getRuntime(): MatchRuntime<G, TMoves, TCardDefinition, TCardDerived, TBoardView> {
    return this.runtime;
  }

  getConnectedPlayerIds(): string[] {
    return Array.from(this.transports.keys());
  }

  private withPacketAnimations(
    result: Extract<CommandResult, { success: true }>,
    previousState: MatchState<G>,
    command: CommandEnvelope,
    playerId: string,
    role: "player" | "judge",
  ): Extract<CommandResult, { success: true }> {
    return {
      ...result,
      processedCommand: command,
      animations: this.derivePacketAnimations(
        previousState,
        this.runtime.getState(),
        command,
        playerId,
        role,
      ),
    };
  }

  private derivePacketAnimations(
    previousState: MatchState<G>,
    nextState: MatchState<G>,
    command: CommandEnvelope,
    playerId: string,
    role: "player" | "judge",
  ) {
    const derivePacketAnimations = this.runtime.getRuntimeConfig().derivePacketAnimations;

    if (typeof derivePacketAnimations !== "function") {
      logger.warn("derivePacketAnimations is not a function; not deriving animations.");
      return [];
    }

    return [
      ...derivePacketAnimations({
        command,
        playerId,
        role,
        previousState,
        nextState,
        staticResources: this.staticResources,
      }),
    ];
  }
}
