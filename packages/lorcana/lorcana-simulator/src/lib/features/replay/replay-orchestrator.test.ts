import { describe, expect, it } from "bun:test";
import { arielOnHumanLegs } from "@tcg/lorcana-cards/cards/001";
import { PLAYER_ONE, LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import type { Patch } from "mutative";
import type { PersistedReplayData, PersistedReplayStep } from "./fetch-replay.js";
import { ReplayOrchestrator } from "./replay-orchestrator.svelte.ts";

function createReplayData(stepOverrides?: Partial<PersistedReplayStep>): PersistedReplayData {
  const engine = LorcanaMultiplayerTestEngine.createWithFixture(
    {
      hand: [arielOnHumanLegs],
      deck: [arielOnHumanLegs],
    },
    {
      deck: [arielOnHumanLegs],
    },
  );
  const server = engine.getServerEngine();
  const stateBefore = JSON.parse(JSON.stringify(server.getState()));
  const cardsMaps = engine.getCardsMaps();

  // initialState no longer contains cardsMaps — state-only
  const initialState = JSON.stringify({
    state: stateBefore,
    historyLength: 0,
  });

  const moveResult = engine.asPlayerOne().ink(arielOnHumanLegs);
  expect(moveResult.success).toBe(true);

  const stateAfter = server.getState();

  const patches: Patch[] = [
    { op: "replace" as const, path: ["ctx", "_stateID"], value: stateAfter.ctx._stateID },
  ];

  return {
    version: 2,
    gameId: "game-1",
    matchId: "match-1",
    gameType: "lorcana",
    seed: "replay-seed",
    playerIds: ["player_one", "player_two"],
    cardsMaps,
    initialState,
    steps: [
      {
        patches,
        logs: [],
        acceptedMove: {
          stateVersion: 1,
          turnNumber: 0,
          actorId: PLAYER_ONE,
          moveId: "inkCard",
          timestamp: Date.now(),
        },
        ...stepOverrides,
      },
    ],
    metadata: {
      totalMoves: 1,
      totalTurns: 1,
      createdAt: new Date(0).toISOString(),
      completedAt: new Date(1).toISOString(),
    },
  };
}

describe("ReplayOrchestrator", () => {
  it("reconstructs states by applying patches", () => {
    const orchestrator = new ReplayOrchestrator(createReplayData());

    expect(orchestrator.hasPatchData).toBe(true);
    expect(orchestrator.totalSteps).toBe(2); // initial + 1 step

    orchestrator.nextStep();

    expect(orchestrator.currentStep).toBe(1);
    expect(orchestrator.currentEngine.getState().ctx._stateID).toBe(1);
  });

  it("handles steps with empty patches (state unchanged)", () => {
    const orchestrator = new ReplayOrchestrator(createReplayData({ patches: [] }));

    // Empty patches still produce a step
    expect(orchestrator.totalSteps).toBe(2);
  });
});
