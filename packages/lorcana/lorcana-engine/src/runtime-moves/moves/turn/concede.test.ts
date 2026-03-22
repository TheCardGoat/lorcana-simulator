import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, PLAYER_ONE, PLAYER_TWO } from "../../../testing";

describe("concede", () => {
  it("ends the game and emits a concede log entry", () => {
    const engine = LorcanaMultiplayerTestEngine.createWithFixture({ deck: 1 }, { deck: 1 });

    expect(engine.asPlayerOne().concede(PLAYER_ONE).success).toBe(true);
    expect(engine.asServer().isGameOver()).toBe(true);
    expect(engine.asServer().getWinner()).toBe(PLAYER_TWO);

    const concedeEntry = engine
      .getServerEngine()
      .getRuntime()
      .getGameLog()
      .find((entry) => entry.defaultMessage?.key === "lorcana.move.concede");
    expect(concedeEntry?.defaultMessage).toMatchObject({
      key: "lorcana.move.concede",
      values: {
        playerId: PLAYER_ONE,
      },
    });
  });
});
