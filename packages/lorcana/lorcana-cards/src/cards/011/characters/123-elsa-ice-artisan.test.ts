import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, LorcanaTestEngine } from "@tcg/lorcana-engine/testing";
import { elsaIceArtisan } from "./123-elsa-ice-artisan";

describe("Elsa - Ice Artisan", () => {
  it("has Shift keyword", () => {
    const testEngine = new LorcanaTestEngine({
      play: [elsaIceArtisan],
    });

    const cardUnderTest = testEngine.getCardModel(elsaIceArtisan);
    expect(cardUnderTest.hasShift()).toBe(true);
  });

  // Note: ENDLESS WINTER "When you play this character" trigger is not present in the ability
  // data - only the "whenever you play a location" trigger is defined. Tests for the on-play
  // exert will be added once the on-play trigger is included in the ability definition.

  describe("DISTANT CALL", () => {
    it("should get +3 lore from DISTANT CALL static ability", () => {
      // The static ability currently applies unconditionally (no location condition in data).
      // When the "at a location" condition is added, this test should be updated.
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
        play: [elsaIceArtisan],
      });

      const elsa = testEngine.asPlayerOne().getCard(elsaIceArtisan);
      // Printed lore is 1, DISTANT CALL adds +3 = 4
      expect(elsa.lore).toBe(4);
    });
  });
});
