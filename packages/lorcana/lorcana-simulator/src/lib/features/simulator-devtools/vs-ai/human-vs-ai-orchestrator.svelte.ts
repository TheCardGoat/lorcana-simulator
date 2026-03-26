import {
  getAutomatedActionStrategyOption,
  computeAutomatedActionStateFingerprint,
  loadLorcanaServerAuthoritativeSnapshot,
  type AutomatedActionExecutionResult,
  type AutomatedActionStrategyOption,
  type AutomatedActionTraceSink,
  type CardsMaps,
  type LorcanaServer,
  type LorcanaServerAuthoritativeSnapshot,
} from "@tcg/lorcana-engine";
import { getLorcanaCardCatalogSync } from "@tcg/lorcana-cards/cards/sync";
import {
  DEFAULT_DYNAMIC_CLOCK_CONFIG,
  LorcanaMultiplayerTestEngine,
} from "@tcg/lorcana-engine/testing";
import {
  AutomatedMatchPlaybackReadModel,
  type AutomatedMatchPlaybackServer,
  type AutomatedMatchPlaybackSession,
} from "../ai-match/playback-controller.js";
import {
  createRepeatedStateDeadlockTracker,
  resolveRepeatedStateDeadlockByConceding,
} from "../automation-deadlock.js";
import { createAutomatedMatchFixture } from "../ai-match/fixture.js";
import type { LorcanaSimulatorReadModel } from "@/features/simulator/model/contracts.js";
import {
  AI_SPEED_MS,
  type AiPlayMode,
  type AiSpeed,
  type HumanVsAiMatchConfig,
  type HumanVsAiOrchestratorState,
} from "./types.js";
import { resolveHumanVsAiMode } from "./mode-resolution.js";

export class HumanVsAiOrchestrator {
  #session: AutomatedMatchPlaybackSession<LorcanaServer, LorcanaSimulatorReadModel>;
  #testEngine: LorcanaMultiplayerTestEngine;
  #cardsMaps: CardsMaps;
  #strategyOption: AutomatedActionStrategyOption;
  #deadlockTracker = createRepeatedStateDeadlockTracker();
  #timer: ReturnType<typeof setTimeout> | null = null;
  #timerRevision = 0;
  #listeners = new Set<() => void>();
  #stateUnsubscribe: (() => void) | null = null;
  #gameId: string;

  sessionRevision = $state(0);
  state = $state<HumanVsAiOrchestratorState>({
    mode: "waiting-for-human",
    aiPlayMode: "auto",
    aiSpeed: "balanced",
    strategyId: "",
    strategyLabel: "",
    currentPerspective: "playerOne",
    turnNumber: 0,
  });

  constructor(config: HumanVsAiMatchConfig) {
    const strategyOption = getAutomatedActionStrategyOption(config.strategyId);
    if (!strategyOption) {
      throw new Error(`Unknown strategy "${config.strategyId}".`);
    }

    this.#strategyOption = strategyOption;
    this.#gameId = config.seed;

    const fixture = createAutomatedMatchFixture({
      playerOneDeckText: config.playerOneDeckText,
      playerTwoDeckText: config.playerTwoDeckText,
      playerOneFixtureId: config.playerOneFixtureId,
      playerTwoFixtureId: config.playerTwoFixtureId,
      playerOneStrategyId: config.strategyId,
      playerTwoStrategyId: config.strategyId,
      seed: config.seed,
    });

    this.#testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      fixture.playerOne,
      fixture.playerTwo,
      {
        seed: fixture.seed,
        skipPreGame: false,
        validateSync: false,
        timeControl: { mode: "dynamic", config: DEFAULT_DYNAMIC_CLOCK_CONFIG },
      },
    );
    this.#cardsMaps = this.#testEngine.getCardsMaps();

    const readModel = new AutomatedMatchPlaybackReadModel(this.#testEngine);
    const server = this.#testEngine.asServer();
    this.#session = {
      dispose: () => readModel.dispose(),
      engine: server,
      readModel: readModel as unknown as LorcanaSimulatorReadModel,
      server: server as AutomatedMatchPlaybackServer,
    };

    this.state = {
      mode: "waiting-for-human",
      aiPlayMode: "auto",
      aiSpeed: "balanced",
      strategyId: config.strategyId,
      strategyLabel: strategyOption.label,
      currentPerspective: "playerOne",
      turnNumber: this.#session.server.getTurnNumber(),
    };

    this.#subscribeToStateUpdates();
    this.#syncMode();
  }

  get gameId(): string {
    return this.#gameId;
  }

  get cardsMaps(): CardsMaps {
    return this.#cardsMaps;
  }

  /** Load a serialized state into the engine, syncing all views (server + clients). */
  loadState(state: unknown): void {
    // biome-ignore lint/suspicious/noExplicitAny: MatchState is an internal core type
    this.#testEngine.loadState(state as any);
    // Bump session revision to force simulator UI re-mount with the restored state
    this.sessionRevision += 1;
    this.#syncMode();
    this.#notify();
  }

  restoreAuthoritativeSnapshot(snapshot: LorcanaServerAuthoritativeSnapshot): void {
    loadLorcanaServerAuthoritativeSnapshot(
      snapshot,
      getLorcanaCardCatalogSync(),
      this.server as LorcanaServer,
    );
    this.sessionRevision += 1;
    this.#syncMode();
    this.#notify();
  }

  get currentEngine(): LorcanaServer {
    if (this.state.currentPerspective === "playerTwo") {
      return this.#testEngine.asPlayerTwo() as unknown as LorcanaServer;
    }
    return this.#testEngine.asPlayerOne() as unknown as LorcanaServer;
  }

  get readModel(): LorcanaSimulatorReadModel {
    return this.#session.readModel;
  }

  get server(): AutomatedMatchPlaybackServer {
    return this.#session.server;
  }

  subscribe(listener: () => void): () => void {
    this.#listeners.add(listener);
    return () => {
      this.#listeners.delete(listener);
    };
  }

  stepAi(): void {
    if (this.state.mode !== "ai-paused" && this.state.mode !== "ai-thinking") {
      return;
    }
    // Clear any pending timer to prevent double execution
    this.#clearTimer();
    this.#executeAiAction();
  }

  togglePlayMode(): void {
    const nextMode: AiPlayMode = this.state.aiPlayMode === "step" ? "auto" : "step";
    this.state = { ...this.state, aiPlayMode: nextMode };

    if (nextMode === "auto" && this.state.mode === "ai-paused") {
      this.state = { ...this.state, mode: "ai-thinking" };
      this.#scheduleAiAction();
    } else if (nextMode === "step") {
      this.#clearTimer();
      if (this.state.mode === "ai-thinking") {
        this.state = { ...this.state, mode: "ai-paused" };
      }
    }

    this.#notify();
  }

  setSpeed(speed: AiSpeed): void {
    this.state = { ...this.state, aiSpeed: speed };
    if (this.state.mode === "ai-thinking" && this.state.aiPlayMode === "auto") {
      this.#clearTimer();
      this.#scheduleAiAction();
    }
    this.#notify();
  }

  setStrategy(strategyId: string): void {
    const option = getAutomatedActionStrategyOption(strategyId);
    if (!option) return;

    this.#strategyOption = option;
    this.state = {
      ...this.state,
      strategyId,
      strategyLabel: option.label,
    };
    this.#notify();
  }

  takeover(): void {
    this.#clearTimer();
    this.state = {
      ...this.state,
      mode: "takeover",
      currentPerspective: "playerTwo",
    };
    this.sessionRevision += 1;
    this.#notify();
  }

  releaseTakeover(): void {
    this.#clearTimer();
    this.state = {
      ...this.state,
      currentPerspective: "playerOne",
      mode: "waiting-for-human", // Reset mode so #syncMode can determine correct state
    };
    this.sessionRevision += 1;
    this.#syncMode();
    this.#notify();
  }

  dispose(): void {
    this.#clearTimer();
    this.#stateUnsubscribe?.();
    this.#session.dispose();
    this.#listeners.clear();
  }

  #subscribeToStateUpdates(): void {
    if (this.#session.readModel && "subscribeStateUpdates" in this.#session.readModel) {
      const readModel = this.#session.readModel as {
        subscribeStateUpdates(h: (id: number) => void): () => void;
      };
      this.#stateUnsubscribe = readModel.subscribeStateUpdates(() => {
        this.#syncMode();
        this.#notify();
      });
    }
  }

  #syncMode(): void {
    const turnNumber = this.#session.server.getTurnNumber();
    const { actorId } = this.#session.server.enumerateAutomatedActionsForCurrentActor({
      strategy: this.#strategyOption.strategy,
    });

    const resolution = resolveHumanVsAiMode({
      state: this.state,
      winner: this.#session.server.getWinner() ?? undefined,
      turnNumber,
      actorId,
    });

    if (resolution.shouldClearTimer) {
      this.#clearTimer();
    }

    this.state = resolution.nextState;

    if (resolution.shouldScheduleAi) {
      this.#scheduleAiAction();
    }
  }

  #executeAiAction(): void {
    const winner = this.#session.server.getWinner();
    if (winner) {
      this.state = { ...this.state, mode: "complete", winner };
      return;
    }

    const traceSink: AutomatedActionTraceSink = {
      push() {},
    };

    const fingerprint = computeAutomatedActionStateFingerprint(this.#session.server.getState());
    let result: AutomatedActionExecutionResult;

    try {
      result = this.#session.server.takeAutomatedActionForCurrentActor({
        strategy: this.#strategyOption.strategy,
        traceSink,
      });
    } catch (error) {
      this.#clearTimer();
      this.state = {
        ...this.state,
        mode: "error",
        error: error instanceof Error ? error.message : "AI action failed.",
      };
      return;
    }

    if (!result.finalResult.success) {
      this.#clearTimer();
      this.state = {
        ...this.state,
        mode: "error",
        error: result.finalResult.error ?? "AI action failed.",
      };
      return;
    }

    const observation = this.#deadlockTracker.observe({
      actorId: result.actorId,
      stateFingerprint: fingerprint,
    });
    const deadlockResolution = resolveRepeatedStateDeadlockByConceding({
      actorId: result.actorId,
      concede: (actorId) => this.#session.server.concede(actorId),
      observation,
    });

    if (deadlockResolution.attempted) {
      if (deadlockResolution.conceded) {
        console.warn(
          `[HumanVsAI] AI conceded due to repeated-state deadlock.\n` +
            `  Actor: ${result.actorId}\n` +
            `  State fingerprint (seen ${observation.count}×): ${observation.key ?? fingerprint}\n` +
            `  Strategy: ${this.#strategyOption.label}`,
        );
      } else {
        this.#clearTimer();
        this.state = {
          ...this.state,
          mode: "error",
          error: deadlockResolution.error ?? "Repeated state detected - AI appears stuck.",
        };
        return;
      }
    }

    // Check who the automation actor is after the action.
    const { actorId: nextActorId } = this.#session.server.enumerateAutomatedActionsForCurrentActor({
      strategy: this.#strategyOption.strategy,
    });
    const resolution = resolveHumanVsAiMode({
      state: this.state,
      winner: this.#session.server.getWinner() ?? undefined,
      turnNumber: this.#session.server.getTurnNumber(),
      actorId: nextActorId,
    });

    if (resolution.shouldClearTimer) {
      this.#clearTimer();
    }

    this.state = resolution.nextState;

    if (resolution.shouldScheduleAi) {
      this.#scheduleAiAction();
    }

    this.#notify();
  }

  #scheduleAiAction(): void {
    this.#clearTimer();

    if (this.state.mode !== "ai-thinking") {
      return;
    }

    const revision = ++this.#timerRevision;
    const speedMs = AI_SPEED_MS[this.state.aiSpeed];

    this.#timer = setTimeout(() => {
      if (revision !== this.#timerRevision) return;
      this.#timer = null;
      this.#executeAiAction();
    }, speedMs);
  }

  #clearTimer(): void {
    this.#timerRevision += 1;
    if (this.#timer !== null) {
      clearTimeout(this.#timer);
      this.#timer = null;
    }
  }

  #notify(): void {
    for (const listener of this.#listeners) {
      listener();
    }
  }
}
