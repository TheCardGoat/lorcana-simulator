import { describe, expect, it } from "bun:test";
import { arielOnHumanLegs } from "@tcg/lorcana-cards/cards/001";
import { createPlayerId } from "@tcg/lorcana-engine";
import { PLAYER_ONE, PLAYER_TWO, LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import type { GatewayClientStore } from "../gateway/gateway-client.svelte.js";
import {
  SpectatorMatchOrchestrator,
  createSpectatorHistoryEntries,
} from "./spectator-match-orchestrator.svelte.ts";

const PLAYER_ONE_ID = createPlayerId("player-one");

describe("createSpectatorHistoryEntries", () => {
  it("converts accepted moves into spectator event log entries", () => {
    const entries = createSpectatorHistoryEntries({
      acceptedMoves: [
        {
          actorId: "player-one",
          moveId: "passTurn",
          stateVersion: 3,
          timestamp: 123,
          turnNumber: 2,
        },
      ],
      engineLogs: [
        {
          stateVersion: 3,
          log: {
            type: "passTurn",
            playerId: "player-one",
            timestamp: 123,
          },
        },
      ],
      resolveActorSide: (actorId) => (actorId === "player-one" ? "playerOne" : undefined),
    });

    expect(entries).toHaveLength(1);
    expect(entries[0]?.moveId).toBe("passTurn");
    expect(entries[0]?.actorSide).toBe("playerOne");
    expect(entries[0]?.title.length).toBeGreaterThan(0);
  });

  it("preserves typed log entries when spectator history includes them", () => {
    const entries = createSpectatorHistoryEntries({
      acceptedMoves: [
        {
          actorId: "player-one",
          moveId: "passTurn",
          stateVersion: 3,
          timestamp: 123,
          turnNumber: 2,
        },
      ],
      engineLogs: [
        {
          stateVersion: 3,
          log: {
            type: "passTurn",
            playerId: PLAYER_ONE_ID,
            timestamp: 123,
          },
        },
      ],
      resolveActorSide: (actorId) => (actorId === "player-one" ? "playerOne" : undefined),
    });

    expect(entries).toHaveLength(1);
    expect((entries[0]?.typedLogEntry as { type?: string })?.type).toBe("passTurn");
    expect(entries[0]?.title).toBe("Passed the turn.");
  });

  it("hydrates live spectator state from full snapshots without applying patches in the browser", () => {
    const engine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [arielOnHumanLegs],
        deck: [arielOnHumanLegs],
      },
      {
        deck: [arielOnHumanLegs],
      },
    );
    const gateway = { send: () => {} } as unknown as GatewayClientStore;
    const orchestrator = new SpectatorMatchOrchestrator({
      gateway,
      state: engine
        .getServerEngine()
        .getState() as unknown as import("@tcg/lorcana-engine").LorcanaMatchState,
      cardsMaps: engine.getCardsMaps(),
    });

    const moveResult = engine.asPlayerOne().ink(arielOnHumanLegs);
    expect(moveResult.success).toBe(true);

    const nextState = engine.getServerEngine().getState();
    orchestrator.applyStateUpdate({
      actorId: PLAYER_ONE,
      moveType: "putCardIntoInkwell",
      stateVersion: nextState.ctx._stateID,
      patches: [
        {
          op: "replace",
          path: ["ctx", "_stateID"],
          value: -1,
        },
      ],
      state: nextState,
    });

    expect(orchestrator.currentEngine.getState().ctx._stateID).toBe(nextState.ctx._stateID);
    expect(orchestrator.currentEngine.getState().ctx.playerIds).toEqual([PLAYER_ONE, PLAYER_TWO]);
  });
});
