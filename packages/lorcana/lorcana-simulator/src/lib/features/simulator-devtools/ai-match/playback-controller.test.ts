import { afterEach, describe, expect, it } from "bun:test";
import {
  DEFAULT_AUTOMATED_ACTION_STRATEGY_ID,
  createAcceptedMoveRecord,
  createEngineLogRecord,
  type AutomatedActionTraceSink,
  type AutomatedActionExecutionResult,
  type CommandFailure,
} from "@tcg/lorcana-engine";
import type { PlayerId } from "@tcg/lorcana-types";
import { LorcanaMultiplayerTestEngine, PLAYER_TWO } from "@tcg/lorcana-engine/testing";
import { DECK_FIXTURES } from "../deck-fixtures/index.js";
import {
  AutomatedMatchPlaybackController,
  AutomatedMatchPlaybackReadModel,
  createPersistedMoveLogEntries,
  type AutomatedMatchConfig,
  type AutomatedMatchPlaybackServer,
  type AutomatedMatchPlaybackSession,
} from "./index.js";

function createConfig(): AutomatedMatchConfig {
  return {
    playerOneDeckText: DECK_FIXTURES[0]!.cards,
    playerTwoDeckText: DECK_FIXTURES[1]!.cards,
    playerOneFixtureId: DECK_FIXTURES[0]!.id,
    playerTwoFixtureId: DECK_FIXTURES[1]!.id,
    playerOneStrategyId: DEFAULT_AUTOMATED_ACTION_STRATEGY_ID,
    playerTwoStrategyId: "board-control-lore-race",
    seed: "ai-match:test",
  };
}

function waitForCondition(predicate: () => boolean, timeoutMs = 10000): Promise<void> {
  const deadline = Date.now() + timeoutMs;

  return new Promise((resolve, reject) => {
    const poll = () => {
      if (predicate()) {
        resolve();
        return;
      }

      if (Date.now() > deadline) {
        reject(new Error("Condition timed out."));
        return;
      }

      setTimeout(poll, 10);
    };

    poll();
  });
}

function createErrorResult(currentStateID: number): CommandFailure {
  return {
    currentStateID,
    error: "Injected execution failure",
    errorCode: "AUTOMATION_FAILED",
    success: false,
  };
}

describe("AutomatedMatchPlaybackController", () => {
  const disposables: Array<{ dispose(): void }> = [];

  afterEach(() => {
    while (disposables.length > 0) {
      disposables.pop()?.dispose();
    }
  });

  it("step advances state and captures the latest decision trace", () => {
    const controller = new AutomatedMatchPlaybackController(createConfig());
    disposables.push(controller);

    const initialStateId = controller.getEngine().getStateID();
    const result = controller.step();

    expect(result?.finalResult.success).toBe(true);
    expect(controller.getEngine().getStateID()).toBeGreaterThan(initialStateId);
    expect(controller.getPlaybackState().lastTrace).toBeDefined();
  });

  it("captures synthetic move log entries for automated playback", () => {
    const controller = new AutomatedMatchPlaybackController(createConfig());
    disposables.push(controller);

    for (let i = 0; i < 6; i += 1) {
      controller.step();
    }

    expect(controller.getReadModel().getMoveLog(20, "authoritative").length).toBeGreaterThan(0);
  });

  it("rebuilds sidebar entries from persisted accepted moves and raw logs", () => {
    const engine = LorcanaMultiplayerTestEngine.createWithFixture({ deck: 3 }, { deck: 3 });
    disposables.push(engine);

    expect(engine.asPlayerOne().passTurn().success).toBe(true);
    expect(engine.asPlayerTwo().passTurn().success).toBe(true);
    expect(engine.asPlayerOne().passTurn().success).toBe(true);

    const server = engine.asServer();
    const acceptedMoves = server.getMoveHistory().map((moveEntry, index) =>
      createAcceptedMoveRecord({
        actorId: String(moveEntry.playerId ?? ""),
        gameId: "game-1",
        moveEntry,
        sourceAuthority: "server",
        stateVersion: index + 1,
      }),
    );
    const engineLogs = server.getGameLog().map((logEntry) =>
      createEngineLogRecord({
        gameId: "game-1",
        logEntry,
        sourceAuthority: "server",
        stateVersion: acceptedMoves.at(-1)?.stateVersion ?? 0,
      }),
    );

    const hydratedEntries = createPersistedMoveLogEntries({
      acceptedMoves: acceptedMoves.slice(-2),
      engineLogs,
      resolveActorSide: (actorId) =>
        actorId === "player_one" ? "playerOne" : actorId === "player_two" ? "playerTwo" : undefined,
    });

    expect(hydratedEntries).toHaveLength(2);
    expect(hydratedEntries.map((entry) => entry.turnNumber)).toEqual([2, 3]);
    expect(hydratedEntries.every((entry) => entry.title.length > 0)).toBe(true);
    expect(
      hydratedEntries[0]?.rawLogRegistry?.relatedLogEntries.some(
        (entry) => entry.defaultMessage?.key === "move.executed",
      ),
    ).toBe(true);
  });

  it("keeps hydrated synthetic entries ordered with live entries by turn", () => {
    const engine = LorcanaMultiplayerTestEngine.createWithFixture({ deck: 3 }, { deck: 3 });
    disposables.push(engine);

    expect(engine.asPlayerOne().passTurn().success).toBe(true);
    expect(engine.asPlayerTwo().passTurn().success).toBe(true);
    expect(engine.asPlayerOne().passTurn().success).toBe(true);

    const readModel = new AutomatedMatchPlaybackReadModel(engine);
    const liveEntries = readModel.getMoveLog(10, "authoritative");
    const turnSixEntry = liveEntries[liveEntries.length - 1];
    const turnFiveEntry = liveEntries[liveEntries.length - 2];

    if (!turnSixEntry || !turnFiveEntry) {
      throw new Error("Expected live event log entries for ordering test.");
    }

    readModel.pushSyntheticMoveEntries([
      { ...turnSixEntry, id: "synthetic-turn-6" },
      { ...turnFiveEntry, id: "synthetic-turn-5" },
    ]);

    const mergedEntries = readModel.getMoveLog(20, "authoritative");
    const mergedTurnNumbers = mergedEntries.map((entry) => entry.turnNumber);

    expect(mergedTurnNumbers).toEqual([...mergedTurnNumbers].sort((left, right) => left - right));
  });

  it("auto mode repeatedly advances until paused", async () => {
    const controller = new AutomatedMatchPlaybackController(createConfig());
    disposables.push(controller);

    controller.setSpeed(1);
    controller.play();

    await waitForCondition(() => controller.getActionCount() > 1);

    controller.pause();

    expect(controller.getActionCount()).toBeGreaterThan(1);
    expect(controller.getPlaybackState().mode).toBe("paused");
  });

  it("auto mode stops on winner", async () => {
    const sampleEngine = LorcanaMultiplayerTestEngine.createWithFixture({ deck: 3 }, { deck: 3 });
    disposables.push(sampleEngine);

    const sampleServer = sampleEngine.asServer();
    const actorId = sampleServer.getActivePlayer();
    if (!actorId) {
      throw new Error("Expected an active player for the playback test.");
    }

    const successTemplate = sampleEngine.asPlayerOne().passTurn();
    if (!successTemplate.success) {
      throw new Error("Expected passPriority to succeed for the playback test.");
    }

    let stepCount = 0;
    let winner: typeof actorId | undefined;

    const fakeServer: AutomatedMatchPlaybackServer = {
      concede: () => ({
        success: true,
      }),
      enumerateAutomatedActionsForCurrentActor: () => ({
        actorId,
      }),
      getActivePlayer: () => actorId,
      getCurrentPhase: () => "main",
      getCurrentStep: () => null,
      getGameLog: () => [],
      getGameSegment: () => "mainGame",
      getMoveHistory: () => [],
      getState: () => sampleServer.getState(),
      getStateID: () => sampleServer.getStateID() + stepCount,
      getTurnNumber: () => 1,
      getWinner: () => winner,
      takeAutomatedActionForCurrentActor: () => {
        stepCount += 1;
        if (stepCount >= 2) {
          winner = actorId;
        }

        return {
          actorId,
          diagnostics: [],
          executionAttempts: [],
          finalResult: successTemplate,
          orderedCandidates: [],
          unsupportedSkips: [],
          validationSkips: [],
        } satisfies AutomatedActionExecutionResult;
      },
    };

    const controller = new AutomatedMatchPlaybackController<{ id: string }, { id: string }>(
      createConfig(),
      {
        createSession: (): AutomatedMatchPlaybackSession<{ id: string }, { id: string }> => ({
          dispose() {},
          engine: { id: "engine" },
          readModel: { id: "read-model" },
          server: fakeServer,
        }),
      },
    );
    disposables.push(controller);

    controller.setSpeed(0);
    controller.play();

    await waitForCondition(() => controller.getPlaybackState().mode === "complete", 1000);

    expect(controller.getActionCount()).toBe(2);
    expect(controller.getStatusSnapshot().winner).toBe(actorId);
  });

  it("auto mode stops and reports errors on failed automated execution", () => {
    const sampleEngine = LorcanaMultiplayerTestEngine.createWithFixture({ deck: 3 }, { deck: 3 });
    disposables.push(sampleEngine);
    const sampleServer = sampleEngine.asServer();
    const sampleState = sampleServer.getState();
    const sampleStateId = sampleServer.getStateID();

    const fakeServer: AutomatedMatchPlaybackServer = {
      concede: () => ({
        success: true,
      }),
      enumerateAutomatedActionsForCurrentActor: () => ({
        actorId: PLAYER_TWO,
      }),
      getActivePlayer: () => PLAYER_TWO,
      getCurrentPhase: () => "main",
      getCurrentStep: () => null,
      getGameLog: () => [],
      getGameSegment: () => "mainGame",
      getMoveHistory: () => [],
      getState: () => sampleState,
      getStateID: () => sampleStateId,
      getTurnNumber: () => 1,
      getWinner: () => undefined,
      takeAutomatedActionForCurrentActor: () =>
        ({
          diagnostics: [],
          executionAttempts: [],
          finalResult: createErrorResult(sampleStateId),
          orderedCandidates: [],
          unsupportedSkips: [],
          validationSkips: [],
        }) as AutomatedActionExecutionResult,
    };

    const controller = new AutomatedMatchPlaybackController<{ id: string }, { id: string }>(
      createConfig(),
      {
        createSession: (): AutomatedMatchPlaybackSession<{ id: string }, { id: string }> => ({
          dispose() {},
          engine: { id: "engine" },
          readModel: { id: "read-model" },
          server: fakeServer,
        }),
      },
    );
    disposables.push(controller);

    const result = controller.step();

    expect(result?.finalResult.success).toBe(false);
    expect(controller.getPlaybackState().mode).toBe("error");
    expect(controller.getPlaybackState().error).toContain("Injected execution failure");
  });

  it("restart rebuilds the engine from the saved config and original seed", () => {
    const controller = new AutomatedMatchPlaybackController(createConfig());
    disposables.push(controller);

    const initialStateId = controller.getEngine().getStateID();
    const initialSeed = controller.getConfig().seed;

    controller.step();
    controller.restart();

    expect(controller.getConfig().seed).toBe(initialSeed);
    expect(controller.getActionCount()).toBe(0);
    expect(controller.getEngine().getStateID()).toBe(initialStateId);
    expect(controller.getSessionRevision()).toBe(1);
  });

  it("uses the acting player's configured strategy", () => {
    const sampleEngine = LorcanaMultiplayerTestEngine.createWithFixture({ deck: 3 }, { deck: 3 });
    disposables.push(sampleEngine);
    const sampleServer = sampleEngine.asServer();
    const successTemplate = sampleEngine.asPlayerOne().passTurn();
    if (!successTemplate.success) {
      throw new Error("Expected passTurn to succeed for the playback test.");
    }

    let usedStrategyName = "";
    const fakeServer: AutomatedMatchPlaybackServer = {
      concede: () => ({
        success: true,
      }),
      enumerateAutomatedActionsForCurrentActor: () => ({
        actorId: PLAYER_TWO,
      }),
      getActivePlayer: () => PLAYER_TWO,
      getCurrentPhase: () => "main",
      getCurrentStep: () => null,
      getGameLog: () => [],
      getGameSegment: () => "mainGame",
      getMoveHistory: () => [],
      getState: () => sampleServer.getState(),
      getStateID: () => sampleServer.getStateID(),
      getTurnNumber: () => 1,
      getWinner: () => undefined,
      takeAutomatedActionForCurrentActor: (args: {
        strategy: { name: string };
        traceSink?: AutomatedActionTraceSink;
      }) => {
        usedStrategyName = args.strategy.name;
        return {
          actorId: PLAYER_TWO,
          diagnostics: [],
          executionAttempts: [],
          finalResult: successTemplate,
          orderedCandidates: [],
          unsupportedSkips: [],
          validationSkips: [],
        } satisfies AutomatedActionExecutionResult;
      },
    };

    const controller = new AutomatedMatchPlaybackController<{ id: string }, { id: string }>(
      createConfig(),
      {
        createSession: (): AutomatedMatchPlaybackSession<{ id: string }, { id: string }> => ({
          dispose() {},
          engine: { id: "engine" },
          readModel: { id: "read-model" },
          server: fakeServer,
        }),
      },
    );
    disposables.push(controller);

    controller.step();

    expect(usedStrategyName).toBe("board-control-lore-race");
  });

  it("concedes the repeated-state actor instead of surfacing a playback deadlock error", () => {
    const sampleEngine = LorcanaMultiplayerTestEngine.createWithFixture({ deck: 3 }, { deck: 3 });
    disposables.push(sampleEngine);
    const sampleServer = sampleEngine.asServer();
    const actorId = sampleServer.getActivePlayer();
    if (!actorId) {
      throw new Error("Expected an active player for the playback test.");
    }

    const successTemplate = sampleEngine.asPlayerOne().passTurn();
    if (!successTemplate.success) {
      throw new Error("Expected passTurn to succeed for the playback test.");
    }

    let concededActor: typeof actorId | undefined;
    const fakeServer: AutomatedMatchPlaybackServer = {
      concede: (playerId) => {
        concededActor = playerId;
        return {
          success: true,
        };
      },
      enumerateAutomatedActionsForCurrentActor: () => ({
        actorId,
      }),
      getActivePlayer: () => actorId,
      getCurrentPhase: () => "main",
      getCurrentStep: () => null,
      getGameLog: () => [],
      getGameSegment: () => "mainGame",
      getMoveHistory: () => [],
      getState: () => sampleServer.getState(),
      getStateID: () => sampleServer.getStateID(),
      getTurnNumber: () => 1,
      getWinner: () => (concededActor === actorId ? ("player_two" as PlayerId) : undefined),
      takeAutomatedActionForCurrentActor: () =>
        ({
          actorId,
          diagnostics: [],
          executionAttempts: [],
          finalResult: successTemplate,
          orderedCandidates: [],
          unsupportedSkips: [],
          validationSkips: [],
        }) as AutomatedActionExecutionResult,
    };

    const controller = new AutomatedMatchPlaybackController<{ id: string }, { id: string }>(
      createConfig(),
      {
        createSession: (): AutomatedMatchPlaybackSession<{ id: string }, { id: string }> => ({
          dispose() {},
          engine: { id: "engine" },
          readModel: { id: "read-model" },
          server: fakeServer,
        }),
      },
    );
    disposables.push(controller);

    controller.step();
    controller.step();
    controller.step();

    expect(concededActor).toBe(actorId);
    expect(controller.getPlaybackState().mode).toBe("complete");
    expect(controller.getPlaybackState().error).toBeUndefined();
  });

  it("rejects unknown strategy ids", () => {
    expect(
      () =>
        new AutomatedMatchPlaybackController({
          ...createConfig(),
          playerTwoStrategyId: "not-a-real-strategy",
        }),
    ).toThrow('Unknown automated match player two strategy "not-a-real-strategy".');
  });
});
