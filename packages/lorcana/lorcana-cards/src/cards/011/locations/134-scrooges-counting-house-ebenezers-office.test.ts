import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { scroogesCountingHouseEbenezersOffice } from "./134-scrooges-counting-house-ebenezers-office";

describe("Scrooge's Counting House - Ebenezer's Office", () => {
  describe("Boost 2", () => {
    it("has Boost keyword", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
        play: [scroogesCountingHouseEbenezersOffice],
      });

      expect(testEngine.hasKeyword(scroogesCountingHouseEbenezersOffice, "Boost")).toBe(true);
    });

    it("can only use Boost once per turn", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
        play: [scroogesCountingHouseEbenezersOffice],
        inkwell: 4,
        deck: 5,
      });

      expect(
        testEngine.asPlayerOne().activateAbility(scroogesCountingHouseEbenezersOffice, {
          ability: "Boost 2",
        }),
      ).toBeSuccessfulCommand();
      expect(testEngine.getCardsUnder(scroogesCountingHouseEbenezersOffice)).toHaveLength(1);

      const result = testEngine
        .asPlayerOne()
        .activateAbility(scroogesCountingHouseEbenezersOffice, {
          ability: "Boost 2",
        });
      expect(result.success).toBe(false);
      expect(testEngine.getCardsUnder(scroogesCountingHouseEbenezersOffice)).toHaveLength(1);
    });
  });

  describe("GOOD BUSINESS - This location gets +1 willpower and +1 lore for each card under it", () => {
    it("gets +1 willpower and +1 lore after boosting once", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
        play: [scroogesCountingHouseEbenezersOffice],
        inkwell: 2,
        deck: 5,
      });

      expect(testEngine.getCard(scroogesCountingHouseEbenezersOffice).willpower).toBe(4);
      expect(testEngine.getCard(scroogesCountingHouseEbenezersOffice).lore).toBe(1);

      expect(
        testEngine.asPlayerOne().activateAbility(scroogesCountingHouseEbenezersOffice, {
          ability: "Boost 2",
        }),
      ).toBeSuccessfulCommand();

      expect(testEngine.getCardsUnder(scroogesCountingHouseEbenezersOffice)).toHaveLength(1);
      expect(testEngine.getCard(scroogesCountingHouseEbenezersOffice).willpower).toBe(5);
      expect(testEngine.getCard(scroogesCountingHouseEbenezersOffice).lore).toBe(2);
    });

    it("stacks bonuses over multiple turns", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
        play: [scroogesCountingHouseEbenezersOffice],
        inkwell: 4,
        deck: 10,
      });

      expect(testEngine.getCard(scroogesCountingHouseEbenezersOffice).willpower).toBe(4);
      expect(testEngine.getCard(scroogesCountingHouseEbenezersOffice).lore).toBe(1);

      expect(
        testEngine.asPlayerOne().activateAbility(scroogesCountingHouseEbenezersOffice, {
          ability: "Boost 2",
        }),
      ).toBeSuccessfulCommand();

      expect(testEngine.getCardsUnder(scroogesCountingHouseEbenezersOffice)).toHaveLength(1);
      expect(testEngine.getCard(scroogesCountingHouseEbenezersOffice).willpower).toBe(5);
      expect(testEngine.getCard(scroogesCountingHouseEbenezersOffice).lore).toBe(2);

      testEngine.asPlayerOne().passTurn();
      testEngine.asPlayerTwo().passTurn();

      expect(
        testEngine.asPlayerOne().activateAbility(scroogesCountingHouseEbenezersOffice, {
          ability: "Boost 2",
        }),
      ).toBeSuccessfulCommand();

      expect(testEngine.getCardsUnder(scroogesCountingHouseEbenezersOffice)).toHaveLength(2);
      expect(testEngine.getCard(scroogesCountingHouseEbenezersOffice).willpower).toBe(6);
      expect(testEngine.getCard(scroogesCountingHouseEbenezersOffice).lore).toBe(3);
    });
  });
});
