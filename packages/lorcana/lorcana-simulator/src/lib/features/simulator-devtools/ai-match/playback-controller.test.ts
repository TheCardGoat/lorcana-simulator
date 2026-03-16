import { afterEach, describe, expect, it } from "bun:test";
import type { AutomatedActionExecutionResult, CommandFailure } from "@tcg/lorcana-engine";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { DECK_FIXTURES } from "../deck-fixtures/index.js";
import {
  AutomatedMatchPlaybackController,
  type AutomatedMatchConfig,
  type AutomatedMatchPlaybackServer,
  type AutomatedMatchPlaybackSession,
} from "./index.js";

function createConfig(): AutomatedMatchConfig {
  return {
    playerOneDeckText: DECK_FIXTURES[0]!.cards,
    playerTwoDeckText: DECK_FIXTURES[1]!.cards,
    playerOneFixtureName: DECK_FIXTURES[0]!.name,
    playerTwoFixtureName: DECK_FIXTURES[1]!.name,
    strategyId: "default-lore-race",
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
      getActivePlayer: () => actorId,
      getCurrentPhase: () => "main",
      getCurrentStep: () => null,
      getGameSegment: () => "mainGame",
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
      getActivePlayer: () => undefined,
      getCurrentPhase: () => "main",
      getCurrentStep: () => null,
      getGameSegment: () => "mainGame",
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
});
