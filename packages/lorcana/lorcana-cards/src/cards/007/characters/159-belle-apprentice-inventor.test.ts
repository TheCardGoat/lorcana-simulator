import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, createMockItem } from "@tcg/lorcana-engine/testing";
import { belleApprenticeInventor } from "./159-belle-apprentice-inventor";

const testItem = createMockItem({
  id: "test-item",
  name: "Test Item",
  cost: 2,
});

const testItem2 = createMockItem({
  id: "test-item-2",
  name: "Test Item 2",
  cost: 1,
});

describe("Belle - Apprentice Inventor", () => {
  describe("WHAT A MESS - During your turn, you may banish chosen item of yours to play this character for free.", () => {
    it("can be played for free by banishing an item you control", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
        hand: [belleApprenticeInventor],
        play: [testItem],
        inkwell: 0,
      });
      const sacrificeTarget = testEngine.findCardInstanceId(testItem, "play");

      expect(
        testEngine.asPlayerOne().playCard(belleApprenticeInventor, {
          cost: { cost: "sacrifice", sacrificeTarget },
        }),
      ).toBeSuccessfulCommand();

      expect(testEngine.asPlayerOne().getCard(testItem).zone).toBe("discard");
      expect(testEngine.asPlayerOne().getCard(belleApprenticeInventor).zone).toBe("play");
    });

    it("can still be played normally with ink", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
        hand: [belleApprenticeInventor],
        inkwell: belleApprenticeInventor.cost,
      });

      expect(testEngine.asPlayerOne().playCard(belleApprenticeInventor)).toBeSuccessfulCommand();

      expect(testEngine.asPlayerOne().getCard(belleApprenticeInventor).zone).toBe("play");
    });

    it("cannot sacrifice an item you don't control", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          hand: [belleApprenticeInventor],
          play: [testItem],
          inkwell: 0,
        },
        {
          play: [testItem2],
        },
      );
      const opponentItemId = testEngine.findCardInstanceId(testItem2, "play", "player_two");

      expect(
        testEngine.asPlayerOne().playCard(belleApprenticeInventor, {
          cost: { cost: "sacrifice", sacrificeTarget: opponentItemId },
        }),
      ).not.toBeSuccessfulCommand();
    });

    it("cannot use sacrifice cost without an item in play", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
        hand: [belleApprenticeInventor],
        inkwell: 0,
      });
      const invalidSacrificeTarget = testEngine.findCardInstanceId(belleApprenticeInventor, "hand");

      expect(
        testEngine.asPlayerOne().playCard(belleApprenticeInventor, {
          cost: { cost: "sacrifice", sacrificeTarget: invalidSacrificeTarget },
        }),
      ).not.toBeSuccessfulCommand();
    });
  });
});
