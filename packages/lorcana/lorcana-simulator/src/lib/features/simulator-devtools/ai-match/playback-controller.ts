import {
  computeAutomatedActionStateFingerprint,
  type AutomatedActionExecutionResult,
  type AutomatedActionTraceSink,
  type DeepReadonly,
  type LorcanaMatchState,
  type LorcanaServer,
  type PlayerId,
} from "@tcg/lorcana-engine";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { LorcanaMultiplayerSimulatorAdapter } from "../harness/index.js";
import { createAutomatedMatchFixture } from "./fixture.js";
import { getAutomatedMatchStrategyOption } from "./strategy-registry.js";
import type {
  LorcanaPlayerSide,
  LorcanaSimulatorView,
  MoveLogEntrySnapshot,
} from "@/features/simulator/model/contracts.js";
import { assertLorcanaSimulatorMoveId } from "@/features/simulator/model/contracts.js";
import { formatEventLogBody } from "@/features/simulator/model/event-log-formatting.js";
import type {
  AutomatedMatchConfig,
  AutomatedMatchPlaybackState,
  AutomatedMatchStatusSnapshot,
  AutomatedMatchStrategyOption,
} from "./types.js";

const DEFAULT_AUTOMATED_MATCH_SPEED_MS = 800;
const REPEATED_STATE_DEADLOCK_THRESHOLD = 3;
interface RepeatedStateObservation {
  actorId?: PlayerId;
  stateFingerprint: string;
}

interface RepeatedStateObservationResult {
  count: number;
  repeatedStateDeadlock: boolean;
}

function createRepeatedStateDeadlockTracker(repeatThreshold = REPEATED_STATE_DEADLOCK_THRESHOLD) {
  const seenStates = new Map<string, number>();

  return {
    observe(observation: RepeatedStateObservation): RepeatedStateObservationResult {
      if (!observation.actorId) {
        return {
          count: 0,
          repeatedStateDeadlock: false,
        };
      }

      const key = `${observation.actorId}:${observation.stateFingerprint}`;
      const count = (seenStates.get(key) ?? 0) + 1;
      seenStates.set(key, count);

      return {
        count,
        repeatedStateDeadlock: count >= repeatThreshold,
      };
    },
  };
}

export interface AutomatedMatchPlaybackServer {
  getActivePlayer(): PlayerId | undefined;
  getCurrentPhase(): string | undefined;
  getCurrentStep(): string | null | undefined;
  getGameSegment(): string | undefined;
  getState(): DeepReadonly<LorcanaMatchState>;
  getStateID(): number;
  getTurnNumber(): number;
  getWinner(): PlayerId | undefined;
  takeAutomatedActionForCurrentActor(args: {
    strategy: AutomatedMatchStrategyOption["strategy"];
    traceSink?: AutomatedActionTraceSink;
  }): AutomatedActionExecutionResult;
}

export interface AutomatedMatchPlaybackSession<
  TEngine = LorcanaServer,
  TReadModel = AutomatedMatchPlaybackReadModel,
> {
  dispose(): void;
  engine: TEngine;
  readModel: TReadModel;
  server: AutomatedMatchPlaybackServer;
}

export function createAutomatedMatchPlaybackSession(
  config: AutomatedMatchConfig,
): AutomatedMatchPlaybackSession {
  const fixture = createAutomatedMatchFixture(config);
  const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
    fixture.playerOne,
    fixture.playerTwo,
    {
      seed: fixture.seed,
      skipPreGame: false,
      validateSync: false,
    },
  );
  const readModel = new AutomatedMatchPlaybackReadModel(testEngine);
  const server = testEngine.asServer();

  return {
    dispose() {
      readModel.dispose();
    },
    engine: server,
    readModel,
    server: server as AutomatedMatchPlaybackServer,
  };
}

interface ProcessedCommandSnapshot {
  input?: {
    args?: Record<string, unknown>;
  };
  move?: MoveLogEntrySnapshot["moveId"] | string;
}

function toPlayerSide(playerId?: PlayerId): LorcanaPlayerSide | undefined {
  if (playerId === "player_one") {
    return "playerOne";
  }

  if (playerId === "player_two") {
    return "playerTwo";
  }

  return undefined;
}

function createAutomatedMoveLogEntry(
  result: AutomatedActionExecutionResult,
  playbackState: AutomatedMatchPlaybackState,
  turnNumber: number,
  actionCount: number,
): MoveLogEntrySnapshot | null {
  if (!result.finalResult.success) {
    return null;
  }

  const processedCommand = result.finalResult.processedCommand as
    | ProcessedCommandSnapshot
    | undefined;
  const moveId = processedCommand?.move ?? playbackState.lastTrace?.selectedCandidate?.family;
  if (!moveId) {
    return null;
  }

  const timestamp = Date.now();
  const normalizedMoveId = assertLorcanaSimulatorMoveId(moveId);
  const entry: MoveLogEntrySnapshot = {
    actorSide: toPlayerSide(result.actorId),
    detail: undefined,
    id: `automated-${actionCount}-${timestamp}-${moveId}`,
    moveId: normalizedMoveId,
    rawLogRegistry: {
      move: {
        moveId: normalizedMoveId,
        playerId: result.actorId ?? "unknown",
        timestamp,
      },
      relatedLogEntries: [],
    },
    timestamp,
    title: "",
    turnNumber,
  };

  const presentation = formatEventLogBody(entry);
  return {
    ...entry,
    title: presentation.text,
  };
}

export class AutomatedMatchPlaybackReadModel extends LorcanaMultiplayerSimulatorAdapter {
  #listeners = new Set<(stateID: number) => void>();
  #manualRevision = 0;
  #syntheticEntries: MoveLogEntrySnapshot[] = [];

  override getMoveLog(
    limit = 50,
    view: LorcanaSimulatorView = "authoritative",
  ): MoveLogEntrySnapshot[] {
    const entries = [...super.getMoveLog(limit, view), ...this.#syntheticEntries];
    return limit > 0 ? entries.slice(-limit) : entries;
  }

  override getStateID(): number {
    return super.getStateID() * 1_000 + this.#manualRevision;
  }

  pushSyntheticMoveEntry(entry: MoveLogEntrySnapshot): void {
    this.#syntheticEntries = [...this.#syntheticEntries, entry];
    this.#notifySyntheticListeners();
  }

  override subscribeStateUpdates(handler: (stateID: number) => void): () => void {
    this.#listeners.add(handler);
    const unsubscribe = super.subscribeStateUpdates(handler);

    return () => {
      this.#listeners.delete(handler);
      unsubscribe();
    };
  }

  #notifySyntheticListeners(): void {
    this.#manualRevision = (this.#manualRevision + 1) % 1_000;
    const stateID = this.getStateID();
    for (const listener of this.#listeners) {
      listener(stateID);
    }
  }
}

interface AutomatedMatchPlaybackControllerDependencies<
  TEngine = LorcanaServer,
  TReadModel = AutomatedMatchPlaybackReadModel,
> {
  createSession?: (
    config: AutomatedMatchConfig,
  ) => AutomatedMatchPlaybackSession<TEngine, TReadModel>;
}

export class AutomatedMatchPlaybackController<
  TEngine = LorcanaServer,
  TReadModel = AutomatedMatchPlaybackReadModel,
> {
  #actionCount = 0;
  #config: AutomatedMatchConfig;
  #createSession: (
    config: AutomatedMatchConfig,
  ) => AutomatedMatchPlaybackSession<TEngine, TReadModel>;
  #listeners = new Set<() => void>();
  #playbackState: AutomatedMatchPlaybackState;
  #repeatTracker = createRepeatedStateDeadlockTracker();
  #session: AutomatedMatchPlaybackSession<TEngine, TReadModel>;
  #sessionRevision = 0;
  #strategyOption: AutomatedMatchStrategyOption;
  #timer: ReturnType<typeof setTimeout> | null = null;
  #timerRevision = 0;

  constructor(
    config: AutomatedMatchConfig,
    dependencies: AutomatedMatchPlaybackControllerDependencies<TEngine, TReadModel> = {},
  ) {
    const strategyOption = getAutomatedMatchStrategyOption(config.strategyId);
    if (!strategyOption) {
      throw new Error(`Unknown automated match strategy "${config.strategyId}".`);
    }

    this.#config = config;
    this.#strategyOption = strategyOption;
    this.#createSession =
      dependencies.createSession ??
      ((nextConfig) =>
        createAutomatedMatchPlaybackSession(nextConfig) as AutomatedMatchPlaybackSession<
          TEngine,
          TReadModel
        >);
    this.#playbackState = {
      mode: "idle",
      speedMs: DEFAULT_AUTOMATED_MATCH_SPEED_MS,
    };
    this.#session = this.#createSession(this.#config);
    this.#syncTerminalState();
  }

  dispose(): void {
    this.#clearTimer();
    this.#session.dispose();
    this.#listeners.clear();
  }

  getActionCount(): number {
    return this.#actionCount;
  }

  getConfig(): AutomatedMatchConfig {
    return this.#config;
  }

  getEngine(): TEngine {
    return this.#session.engine;
  }

  getPlaybackState(): AutomatedMatchPlaybackState {
    return this.#playbackState;
  }

  getReadModel(): TReadModel {
    return this.#session.readModel;
  }

  getSessionRevision(): number {
    return this.#sessionRevision;
  }

  getStatusSnapshot(): AutomatedMatchStatusSnapshot {
    return {
      actionsExecuted: this.#actionCount,
      gameSegment: this.#session.server.getGameSegment(),
      phase: this.#session.server.getCurrentPhase(),
      priorityPlayer: this.#session.server.getActivePlayer(),
      step: this.#session.server.getCurrentStep(),
      turnNumber: this.#session.server.getTurnNumber(),
      winner: this.#session.server.getWinner(),
    };
  }

  play(): void {
    if (this.#playbackState.mode === "complete" || this.#playbackState.mode === "error") {
      return;
    }

    this.#setPlaybackState({
      ...this.#playbackState,
      mode: "running",
    });
    this.#scheduleNextStep();
  }

  pause(): void {
    if (this.#playbackState.mode !== "running") {
      return;
    }

    this.#clearTimer();
    this.#setPlaybackState({
      ...this.#playbackState,
      mode: "paused",
    });
  }

  restart(): void {
    this.#clearTimer();
    this.#session.dispose();
    this.#session = this.#createSession(this.#config);
    this.#sessionRevision += 1;
    this.#repeatTracker = createRepeatedStateDeadlockTracker();
    this.#actionCount = 0;
    this.#setPlaybackState({
      mode: "idle",
      speedMs: this.#playbackState.speedMs,
    });
    this.#syncTerminalState();
  }

  setSpeed(speedMs: number): void {
    this.#setPlaybackState({
      ...this.#playbackState,
      speedMs,
    });

    if (this.#playbackState.mode === "running") {
      this.#clearTimer();
      this.#scheduleNextStep();
    }
  }

  step(): AutomatedActionExecutionResult | undefined {
    if (this.#playbackState.mode === "running") {
      return undefined;
    }

    return this.#executeStep();
  }

  subscribe(listener: () => void): () => void {
    this.#listeners.add(listener);
    return () => {
      this.#listeners.delete(listener);
    };
  }

  #clearTimer(): void {
    this.#timerRevision += 1;

    if (this.#timer === null) {
      return;
    }

    clearTimeout(this.#timer);
    this.#timer = null;
  }

  #executeStep(): AutomatedActionExecutionResult | undefined {
    const winner = this.#session.server.getWinner();
    if (winner) {
      this.#setPlaybackState({
        ...this.#playbackState,
        mode: "complete",
      });
      return undefined;
    }

    let latestTrace = this.#playbackState.lastTrace;
    const traceSink: AutomatedActionTraceSink = {
      push(trace) {
        latestTrace = trace;
      },
    };

    const stateFingerprint = computeAutomatedActionStateFingerprint(
      this.#session.server.getState(),
    );
    const result = this.#session.server.takeAutomatedActionForCurrentActor({
      strategy: this.#strategyOption.strategy,
      traceSink,
    });

    this.#actionCount += 1;

    const observation = this.#repeatTracker.observe({
      actorId: result.actorId,
      stateFingerprint,
    });

    if (!result.finalResult.success) {
      this.#setPlaybackState({
        error: result.finalResult.error ?? "Automated action failed.",
        lastResult: result,
        lastTrace: latestTrace,
        mode: "error",
        speedMs: this.#playbackState.speedMs,
      });
      return result;
    }

    if (observation.repeatedStateDeadlock) {
      this.#setPlaybackState({
        error: "Repeated state detected while both AIs were taking actions.",
        lastResult: result,
        lastTrace: latestTrace,
        mode: "error",
        speedMs: this.#playbackState.speedMs,
      });
      return result;
    }

    const nextWinner = this.#session.server.getWinner();
    this.#setPlaybackState({
      error: undefined,
      lastResult: result,
      lastTrace: latestTrace,
      mode: nextWinner ? "complete" : this.#playbackState.mode,
      speedMs: this.#playbackState.speedMs,
    });
    const logEntry = createAutomatedMoveLogEntry(
      result,
      this.#playbackState,
      this.#session.server.getTurnNumber(),
      this.#actionCount,
    );
    if (logEntry && this.#session.readModel instanceof AutomatedMatchPlaybackReadModel) {
      this.#session.readModel.pushSyntheticMoveEntry(logEntry);
    }
    this.#syncTerminalState();

    return result;
  }

  #notify(): void {
    for (const listener of this.#listeners) {
      listener();
    }
  }

  #scheduleNextStep(): void {
    if (this.#playbackState.mode !== "running") {
      return;
    }

    const timerRevision = this.#timerRevision + 1;
    this.#timerRevision = timerRevision;

    this.#timer = setTimeout(
      () => {
        if (timerRevision !== this.#timerRevision) {
          return;
        }

        this.#timer = null;
        const result = this.#executeStep();
        if (!result) {
          return;
        }

        if (this.#playbackState.mode === "running") {
          this.#scheduleNextStep();
        }
      },
      this.#playbackState.speedMs,
    );
  }

  #setPlaybackState(nextState: AutomatedMatchPlaybackState): void {
    this.#playbackState = nextState;
    this.#notify();
  }

  #syncTerminalState(): void {
    if (this.#playbackState.mode === "complete" || this.#playbackState.mode === "error") {
      this.#clearTimer();
      return;
    }

    if (this.#session.server.getWinner()) {
      this.#clearTimer();
      this.#setPlaybackState({
        ...this.#playbackState,
        mode: "complete",
      });
    }
  }
}
