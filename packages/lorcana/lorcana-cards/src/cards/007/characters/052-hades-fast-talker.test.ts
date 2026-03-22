import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, createMockCharacter } from "@tcg/lorcana-engine/testing";
import { hadesFastTalker } from "./052-hades-fast-talker";

const damagedAlly = createMockCharacter({
  id: "hades-fast-talker-damaged-ally",
  name: "Damaged Ally",
  cost: 2,
  strength: 3,
  willpower: 4,
});

const banishableOpponent = createMockCharacter({
  id: "hades-fast-talker-banishable-opponent",
  name: "Banishable Opponent",
  cost: 3,
  strength: 2,
  willpower: 3,
});

describe("Hades - Fast Talker", () => {
  describe("FOR JUST A LITTLE PAIN - When you play this character, you may deal 2 damage to another chosen character of yours to banish chosen character with cost 3 or less.", () => {
    it("deals 2 damage to another friendly character and banishes a chosen character with cost 3 or less", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          hand: [hadesFastTalker],
          inkwell: hadesFastTalker.cost,
          play: [damagedAlly],
          deck: 2,
        },
        {
          play: [banishableOpponent],
          deck: 2,
        },
      );

      expect(testEngine.asPlayerOne().playCard(hadesFastTalker)).toBeSuccessfulCommand();

      expect(
        testEngine
          .asPlayerOne()
          .resolveNextBag({ resolveOptional: true, targets: [damagedAlly, banishableOpponent] }),
      ).toBeSuccessfulCommand();

      expect(testEngine.asPlayerOne().getCardByInstance(damagedAlly).damage).toBe(2);
      expect(testEngine.asPlayerTwo().getCardZone(banishableOpponent)).toBe("discard");
    });

    it("does nothing when the optional ability is declined", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          hand: [hadesFastTalker],
          inkwell: hadesFastTalker.cost,
          play: [damagedAlly],
          deck: 2,
        },
        {
          play: [banishableOpponent],
          deck: 2,
        },
      );

      expect(testEngine.asPlayerOne().playCard(hadesFastTalker)).toBeSuccessfulCommand();

      expect(
        testEngine.asPlayerOne().resolveNextBag({ resolveOptional: false }),
      ).toBeSuccessfulCommand();

      expect(testEngine.asPlayerOne().getCardByInstance(damagedAlly).damage).toBe(0);
      expect(testEngine.asPlayerTwo().getCardZone(banishableOpponent)).toBe("play");
    });
  });
});
