import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { duckburgFunsosFunzone } from "../locations/034-duckburg-funsos-funzone";
import { begone } from "./061-begone";

describe("Begone!", () => {
  it("returns a chosen item or location with cost 3 or less to its player's hand", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [begone],
        inkwell: begone.cost,
      },
      {
        play: [duckburgFunsosFunzone],
      },
    );

    const playResult = testEngine.asPlayerOne().playCard(begone, {
      targets: [duckburgFunsosFunzone],
    });

    expect(playResult).toBeSuccessfulCommand();
    expect(testEngine.asPlayerTwo().getCardZone(duckburgFunsosFunzone)).toBe("hand");
    expect(testEngine.asPlayerTwo().getCardsInZone("play", "player_two").count).toBe(0);
  });
});
