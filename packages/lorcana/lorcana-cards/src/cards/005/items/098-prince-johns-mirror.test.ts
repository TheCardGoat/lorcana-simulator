import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, createMockCharacter } from "@tcg/lorcana-engine/testing";
import { princeJohnsMirror } from "./098-prince-johns-mirror";

const princeJohn = createMockCharacter({
  id: "prince-johns-mirror-prince-john",
  name: "Prince John",
  cost: 3,
});

describe("Prince John's Mirror", () => {
  it("costs 1 less to play if you have a character named Prince John in play", () => {
    const discountedEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [princeJohnsMirror],
      inkwell: 2,
      play: [princeJohn],
      deck: 2,
    });

    expect(discountedEngine.asPlayerOne().playCard(princeJohnsMirror)).toBeSuccessfulCommand();

    const fullPriceEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [princeJohnsMirror],
      inkwell: 2,
      deck: 2,
    });

    expect(fullPriceEngine.asPlayerOne().playCard(princeJohnsMirror).success).toBe(false);
  });
});
