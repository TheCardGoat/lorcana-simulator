import { describe, expect, it } from "bun:test";
import { arielOnHumanLegs } from "@tcg/lorcana-cards/cards/001";
import { createAcceptedMoveRecord } from "@tcg/lorcana-engine";
import { PLAYER_ONE, LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import type { PersistedReplayData, PersistedReplayMove } from "./fetch-replay.js";
import { ReplayOrchestrator } from "./replay-orchestrator.svelte.ts";

function createReplayData(overrides: Partial<PersistedReplayMove> = {}): PersistedReplayData {
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
  const initialState = JSON.stringify({
    state: server.getState(),
    cardsMaps: engine.getCardsMaps(),
    historyLength: 0,
  });

  const moveResult = engine.asPlayerOne().ink(arielOnHumanLegs);
  expect(moveResult.success).toBe(true);

  const moveEntry = server.getMoveHistory(1).at(-1);
  expect(moveEntry).toBeDefined();
  if (!moveEntry) {
    throw new Error("Expected replay test move history entry");
  }

  return {
    version: 1,
    gameId: "game-1",
    matchId: "match-1",
    gameType: "lorcana",
    seed: "replay-seed",
    playerIds: ["player_one", "player_two"],
    initialState,
    moves: [
      {
        stateVersion: 1,
        acceptedMove: createAcceptedMoveRecord({
          gameId: "game-1",
          stateVersion: 1,
          actorId: PLAYER_ONE,
          moveEntry,
          sourceAuthority: "server",
        }),
        patches: [],
        state: server.getState(),
        engineLogs: [],
        ...overrides,
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
  it("supports step-through replay from server-materialized snapshots", () => {
    const orchestrator = new ReplayOrchestrator(createReplayData());

    expect(orchestrator.hasPatchData).toBe(true);
    expect(orchestrator.totalSteps).toBe(2);

    orchestrator.nextStep();

    expect(orchestrator.currentStep).toBe(1);
    expect(orchestrator.currentEngine.getState().ctx._stateID).toBe(1);
  });

  it("disables step-through for legacy replay blobs without move snapshots", () => {
    const orchestrator = new ReplayOrchestrator(createReplayData({ state: undefined }));

    expect(orchestrator.hasPatchData).toBe(false);
    expect(orchestrator.totalSteps).toBe(1);
  });
});
