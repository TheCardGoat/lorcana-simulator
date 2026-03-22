import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, createMockCharacter } from "../../testing";
import { hiddenCoveTranquilHaven } from "../../../../lorcana-cards/src/cards/004/locations/101-hidden-cove-tranquil-haven";

const coveGuest = createMockCharacter({
  id: "client-engine-cove-guest",
  name: "Client Engine Cove Guest",
  cost: 2,
  strength: 2,
  willpower: 3,
});

describe("ClientEngine move history", () => {
  it("throws in development when projected localView is treated as authoritative state", () => {
    const previousNodeEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = "development";

    try {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
        play: [hiddenCoveTranquilHaven, coveGuest],
        inkwell: hiddenCoveTranquilHaven.moveCost,
      });

      const client = testEngine.getClientEngine("playerOne");
      expect(client).toBeDefined();
      if (!client) {
        throw new Error("Expected client engine to be defined");
      }
      expect(
        () => (client.engine as unknown as { localView: { ctx: unknown } }).localView.ctx,
      ).toThrow(/projected board snapshot/);
    } finally {
      process.env.NODE_ENV = previousNodeEnv;
    }
  });

  it("builds projections from runtime state when the client board is projected", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      play: [hiddenCoveTranquilHaven, coveGuest],
      inkwell: hiddenCoveTranquilHaven.moveCost,
    });

    const client = testEngine.getClientEngine("playerOne");
    expect(client).toBeDefined();

    const projection = client?.engine.getProjection();
    expect(Object.keys(projection?.board.cards ?? {}).length).toBeGreaterThan(0);
  });

  it("records turn number from runtime state when the client board is projected", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      play: [hiddenCoveTranquilHaven, coveGuest],
      inkwell: hiddenCoveTranquilHaven.moveCost,
    });

    const result = testEngine
      .asPlayerOne()
      .moveCharacterToLocation(coveGuest, hiddenCoveTranquilHaven);

    expect(result.success).toBe(true);
    expect(testEngine.asPlayerOne().getMoveHistory(1)[0]).toMatchObject({
      moveId: "moveCharacterToLocation",
      turnNumber: 1,
    });
  });

  it("tracks undo availability from server sync and sends undo requests", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [coveGuest],
      deck: 1,
    });

    const client = testEngine.getClientEngine("playerOne");
    const playerOne = testEngine.asPlayerOne();

    expect(client?.engine.canUndo("player_one")).toBe(false);
    expect(playerOne.getStateID()).toBe(0);

    expect(playerOne.ink(coveGuest)).toBeSuccessfulCommand();
    expect(client?.engine.canUndo("player_one")).toBe(true);
    expect(playerOne.getStateID()).toBe(1);

    const undoResult = playerOne.undo();
    expect(undoResult.success).toBe(true);
    expect(client?.engine.canUndo("player_one")).toBe(false);
    expect(playerOne.getCardZone(coveGuest)).toBe("hand");
    expect(playerOne.getStateID()).toBe(2);
  });
});
