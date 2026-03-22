import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { scroogeMcduckGhostlyEbenezer } from "./104-scrooge-mcduck-ghostly-ebenezer";

describe("Scrooge McDuck - Ghostly Ebenezer", () => {
  it("should be able to activate Boost 1", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      play: [scroogeMcduckGhostlyEbenezer],
      deck: 5,
      inkwell: 10,
    });

    const deckBefore = testEngine.asPlayerOne().getZonesCardCount().deck;

    expect(
      testEngine.asPlayerOne().activateAbility(scroogeMcduckGhostlyEbenezer, { ability: "Boost" }),
    ).toBeSuccessfulCommand();

    const deckAfter = testEngine.asPlayerOne().getZonesCardCount().deck;
    expect(deckAfter).toBe(deckBefore - 1);
  });

  it("should have COUNTING COINS static +1 strength modifier applied", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      play: [scroogeMcduckGhostlyEbenezer],
    });

    const scrooge = testEngine.asPlayerOne().getCard(scroogeMcduckGhostlyEbenezer);
    expect(scrooge.strength).toBe(4);
  });
});
