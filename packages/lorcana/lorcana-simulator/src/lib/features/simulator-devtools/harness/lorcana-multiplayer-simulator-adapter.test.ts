import { afterEach, describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, PLAYER_ONE } from "@tcg/lorcana-engine/testing";

import { filterEntriesToLastTurns } from "@/features/simulator/panels/event-log-presentation.js";
import { LorcanaMultiplayerSimulatorAdapter } from "./lorcana-multiplayer-simulator-adapter.js";

describe("LorcanaMultiplayerSimulatorAdapter", () => {
  let engine: LorcanaMultiplayerTestEngine | null = null;

  afterEach(() => {
    engine?.dispose();
    engine = null;
  });

  it("populates turnNumber on move log snapshots from engine move history", () => {
    engine = LorcanaMultiplayerTestEngine.createWithFixture({ deck: 3 }, { deck: 3 });
    const adapter = new LorcanaMultiplayerSimulatorAdapter(engine);

    expect(engine.asLorcanaPlayerOne().passTurn().success).toBe(true);
    expect(engine.asLorcanaPlayerTwo().passTurn().success).toBe(true);
    expect(engine.asLorcanaPlayerOne().passTurn().success).toBe(true);

    const moveLog = adapter.getMoveLog(10, "authoritative");

    expect(moveLog.map((entry) => entry.turnNumber)).toEqual([2, 3, 4]);
  });

  it("keeps enough raw log data for the typed Lorcana bridge to recover setup messages", () => {
    engine = LorcanaMultiplayerTestEngine.createWithFixture(
      { hand: 0, deck: 60 },
      { hand: 0, deck: 60 },
      { skipPreGame: false },
    );
    const adapter = new LorcanaMultiplayerSimulatorAdapter(engine);

    const chooseResult = engine.asLorcanaPlayerOne().chooseFirstPlayer(PLAYER_ONE);
    expect(chooseResult.success).toBe(true);

    const moveLog = adapter.getMoveLog(10, "playerOne");
    const chooseEntry = moveLog.find((entry) => entry.moveId === "chooseWhoGoesFirst");

    expect(chooseEntry).toBeDefined();
    expect(
      chooseEntry?.rawLogRegistry?.relatedLogEntries.some(
        (entry) => entry.defaultMessage?.key === "lorcana.setup.firstPlayerChosen",
      ),
    ).toBe(true);
  });

  it("supports exact last-two-turn filtering on adapter snapshots", () => {
    engine = LorcanaMultiplayerTestEngine.createWithFixture({ deck: 3 }, { deck: 3 });
    const adapter = new LorcanaMultiplayerSimulatorAdapter(engine);

    expect(engine.asLorcanaPlayerOne().passTurn().success).toBe(true);
    expect(engine.asLorcanaPlayerTwo().passTurn().success).toBe(true);
    expect(engine.asLorcanaPlayerOne().passTurn().success).toBe(true);

    const filteredLog = filterEntriesToLastTurns(adapter.getMoveLog(10, "authoritative"));

    expect([...new Set(filteredLog.map((entry) => entry.turnNumber))]).toEqual([3, 4]);
    expect(filteredLog).toHaveLength(2);
  });

  it("forwards client engine state updates through the adapter subscription", () => {
    engine = LorcanaMultiplayerTestEngine.createWithFixture(
      { deck: 3 },
      { deck: 3 },
      { skipPreGame: false },
    );
    const adapter = new LorcanaMultiplayerSimulatorAdapter(engine);
    let observedStateID: number | null = null;
    const viewUpdateCounts = {
      playerOne: 0,
      playerTwo: 0,
      spectator: 0,
    };

    const unsubscribePlayerOne = engine.getClientEngine("playerOne")?.engine.onStateUpdate(() => {
      viewUpdateCounts.playerOne += 1;
    });
    const unsubscribePlayerTwo = engine.getClientEngine("playerTwo")?.engine.onStateUpdate(() => {
      viewUpdateCounts.playerTwo += 1;
    });
    const unsubscribeSpectator = engine.getClientEngine("spectator")?.engine.onStateUpdate(() => {
      viewUpdateCounts.spectator += 1;
    });

    const unsubscribe = adapter.subscribeStateUpdates((stateID) => {
      observedStateID = stateID;
    });

    engine.asServer().takeAutomatedActionForCurrentActor();

    unsubscribe();
    unsubscribePlayerOne?.();
    unsubscribePlayerTwo?.();
    unsubscribeSpectator?.();

    expect(observedStateID).not.toBeNull();
    if (typeof observedStateID !== "number") {
      throw new Error("Expected a forwarded state update.");
    }

    const forwardedStateID: number = observedStateID;
    expect(forwardedStateID).toBe(adapter.getStateID());
    expect(viewUpdateCounts).toEqual({
      playerOne: 1,
      playerTwo: 1,
      spectator: 1,
    });
  });
});
