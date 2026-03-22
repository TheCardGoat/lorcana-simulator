import { describe, expect, it } from "bun:test";
import {
  LorcanaMultiplayerTestEngine,
  PLAYER_ONE,
  createMockCharacter,
} from "@tcg/lorcana-engine/testing";
import { mauiSoaringDemigod } from "./113-maui-soaring-demigod";
import { heiheiAccidentalExplorer } from "./107-heihei-accidental-explorer";

const nonHeiHeiCharacter = createMockCharacter({
  id: "non-heihei-character",
  name: "Random Character",
  cost: 2,
  willpower: 5,
  lore: 1,
});

describe("Maui - Soaring Demigod", () => {
  describe("Reckless", () => {
    it("has Reckless keyword", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
        play: [{ card: mauiSoaringDemigod, isDrying: false }],
      });

      expect(testEngine.hasKeyword(mauiSoaringDemigod, "Reckless")).toBe(true);
    });

    it("cannot quest due to Reckless", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
        play: [{ card: mauiSoaringDemigod, isDrying: false }],
      });

      expect(testEngine.asPlayerOne().quest(mauiSoaringDemigod)).not.toBeSuccessfulCommand();
    });
  });

  describe("IN MA BELLY — Whenever a character of yours named HeiHei quests, this character gets +1 {L} and loses Reckless this turn.", () => {
    it("gains +1 lore when HeiHei quests", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
        play: [
          { card: mauiSoaringDemigod, isDrying: false },
          { card: heiheiAccidentalExplorer, isDrying: false },
        ],
      });

      const loreBefore = testEngine.getLore(PLAYER_ONE);

      expect(testEngine.asPlayerOne().quest(heiheiAccidentalExplorer)).toBeSuccessfulCommand();

      expect(testEngine.getLore(PLAYER_ONE)).toBe(loreBefore + heiheiAccidentalExplorer.lore + 1);
    });

    it("loses Reckless when HeiHei quests", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
        play: [
          { card: mauiSoaringDemigod, isDrying: false },
          { card: heiheiAccidentalExplorer, isDrying: false },
        ],
      });

      expect(testEngine.hasKeyword(mauiSoaringDemigod, "Reckless")).toBe(true);

      expect(testEngine.asPlayerOne().quest(heiheiAccidentalExplorer)).toBeSuccessfulCommand();

      expect(testEngine.hasKeyword(mauiSoaringDemigod, "Reckless")).toBe(false);
    });

    it("can quest after losing Reckless", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
        play: [
          { card: mauiSoaringDemigod, isDrying: false },
          { card: heiheiAccidentalExplorer, isDrying: false },
        ],
      });

      expect(testEngine.asPlayerOne().quest(mauiSoaringDemigod)).not.toBeSuccessfulCommand();

      expect(testEngine.asPlayerOne().quest(heiheiAccidentalExplorer)).toBeSuccessfulCommand();

      expect(testEngine.asPlayerOne().quest(mauiSoaringDemigod)).toBeSuccessfulCommand();
    });

    it("does not trigger when a non-HeiHei character quests", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
        play: [
          { card: mauiSoaringDemigod, isDrying: false },
          { card: nonHeiHeiCharacter, isDrying: false },
        ],
      });

      const loreBefore = testEngine.getLore(PLAYER_ONE);

      expect(testEngine.asPlayerOne().quest(nonHeiHeiCharacter)).toBeSuccessfulCommand();

      expect(testEngine.asPlayerOne().getBagCount()).toBe(0);
      expect(testEngine.getLore(PLAYER_ONE)).toBe(loreBefore + nonHeiHeiCharacter.lore);
      expect(testEngine.hasKeyword(mauiSoaringDemigod, "Reckless")).toBe(true);
    });

    it("effect lasts only for this turn", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
        play: [
          { card: mauiSoaringDemigod, isDrying: false },
          { card: heiheiAccidentalExplorer, isDrying: false },
        ],
      });

      expect(testEngine.asPlayerOne().quest(heiheiAccidentalExplorer)).toBeSuccessfulCommand();

      expect(testEngine.hasKeyword(mauiSoaringDemigod, "Reckless")).toBe(false);

      testEngine.asPlayerOne().passTurn();
      testEngine.asPlayerTwo().passTurn();

      expect(testEngine.hasKeyword(mauiSoaringDemigod, "Reckless")).toBe(true);
    });
  });
});
