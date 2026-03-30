import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, createMockCharacter } from "@tcg/lorcana-engine/testing";
import { johnSmithsCompass } from "./033-john-smiths-compass";

const helpfulScout = createMockCharacter({
  id: "john-smiths-compass-helpful-scout",
  name: "Helpful Scout",
  cost: 3,
});

const pocahontasCharacter = createMockCharacter({
  id: "john-smiths-compass-pocahontas",
  name: "Pocahontas",
  cost: 5,
});

const expensiveCharacter = createMockCharacter({
  id: "john-smiths-compass-expensive",
  name: "Expensive Character",
  cost: 7,
  strength: 1,
  willpower: 7,
});

const attacker = createMockCharacter({
  id: "john-smiths-compass-attacker",
  name: "Compass Attacker",
  cost: 2,
  strength: 2,
  willpower: 2,
});

const defender = createMockCharacter({
  id: "john-smiths-compass-defender",
  name: "Compass Defender",
  cost: 2,
  strength: 1,
  willpower: 5,
});

describe("John Smith's Compass", () => {
  describe("SPINNING ARROW", () => {
    it("banishes the compass at end of turn when a character of yours challenged this turn", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          play: [johnSmithsCompass, { card: attacker, isDrying: false }],
          deck: 2,
        },
        {
          play: [{ card: defender, exerted: true }],
          deck: 2,
        },
      );

      expect(testEngine.asPlayerOne().challenge(attacker, defender)).toBeSuccessfulCommand();
      expect(testEngine.asPlayerOne().passTurn()).toBeSuccessfulCommand();

      // SPINNING ARROW triggers (mandatory banish) - compass goes to discard
      expect(testEngine.asPlayerOne().getCardZone(johnSmithsCompass)).toBe("discard");
    });

    it("does NOT banish the compass when no character challenged this turn", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          play: [johnSmithsCompass],
          deck: [helpfulScout],
        },
        {
          deck: 2,
        },
      );

      expect(testEngine.asPlayerOne().passTurn()).toBeSuccessfulCommand();
      // Only YOUR PATH fires - SPINNING ARROW does not trigger
      expect(testEngine.asPlayerOne().getBagCount()).toBe(1);
      // Resolve YOUR PATH and send card to bottom
      expect(
        testEngine.asPlayerOne().resolvePendingByCard(johnSmithsCompass),
      ).toBeSuccessfulCommand();
      expect(
        testEngine.asPlayerOne().resolvePendingEffect(johnSmithsCompass, {
          destinations: [
            {
              zone: "deck-bottom",
              cards: [helpfulScout],
            },
          ],
        }),
      ).toBeSuccessfulCommand();

      expect(testEngine.asPlayerOne().getCardZone(johnSmithsCompass)).toBe("play");
    });
  });

  describe("YOUR PATH", () => {
    it("reveals the top card and lets you put a matching character (cost 3 or less) into your hand when none of your characters challenged", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          deck: [helpfulScout],
          play: [johnSmithsCompass],
        },
        {
          deck: 2,
        },
      );

      expect(testEngine.asPlayerOne().passTurn()).toBeSuccessfulCommand();
      // Only YOUR PATH fires - SPINNING ARROW's turn-metric condition (challenges >= 1) is false
      expect(testEngine.asPlayerOne().getBagCount()).toBe(1);
      expect(
        testEngine.asPlayerOne().resolvePendingByCard(johnSmithsCompass),
      ).toBeSuccessfulCommand();
      expect(
        testEngine.asPlayerOne().resolvePendingEffect(johnSmithsCompass, {
          destinations: [
            {
              zone: "hand",
              cards: [helpfulScout],
            },
          ],
        }),
      ).toBeSuccessfulCommand();

      expect(testEngine.asPlayerOne().getCardZone(helpfulScout)).toBe("hand");
      expect(testEngine.asPlayerOne().getCardZone(johnSmithsCompass)).toBe("play");
    });

    it("allows putting a character named Pocahontas (cost > 3) into hand", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          deck: [pocahontasCharacter],
          play: [johnSmithsCompass],
        },
        {
          deck: 2,
        },
      );

      expect(testEngine.asPlayerOne().passTurn()).toBeSuccessfulCommand();
      expect(testEngine.asPlayerOne().getBagCount()).toBe(1);
      expect(
        testEngine.asPlayerOne().resolvePendingByCard(johnSmithsCompass),
      ).toBeSuccessfulCommand();
      expect(
        testEngine.asPlayerOne().resolvePendingEffect(johnSmithsCompass, {
          destinations: [
            {
              zone: "hand",
              cards: [pocahontasCharacter],
            },
          ],
        }),
      ).toBeSuccessfulCommand();

      expect(testEngine.asPlayerOne().getCardZone(pocahontasCharacter)).toBe("hand");
      expect(testEngine.asPlayerOne().getCardZone(johnSmithsCompass)).toBe("play");
    });

    it("puts a non-matching character (cost > 3, not named Pocahontas) on the bottom of the deck", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          deck: [expensiveCharacter],
          play: [johnSmithsCompass],
        },
        {
          deck: 2,
        },
      );

      expect(testEngine.asPlayerOne().passTurn()).toBeSuccessfulCommand();
      expect(testEngine.asPlayerOne().getBagCount()).toBe(1);
      expect(
        testEngine.asPlayerOne().resolvePendingByCard(johnSmithsCompass),
      ).toBeSuccessfulCommand();
      expect(
        testEngine.asPlayerOne().resolvePendingEffect(johnSmithsCompass, {
          destinations: [
            {
              zone: "deck-bottom",
              cards: [expensiveCharacter],
            },
          ],
        }),
      ).toBeSuccessfulCommand();

      expect(testEngine.asPlayerOne().getCardZone(expensiveCharacter)).toBe("deck");
      expect(testEngine.asPlayerOne().getCardZone(johnSmithsCompass)).toBe("play");
    });

    it("does NOT trigger when a character of yours challenged this turn", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          play: [johnSmithsCompass, { card: attacker, isDrying: false }],
          deck: [helpfulScout],
        },
        {
          play: [{ card: defender, exerted: true }],
          deck: 2,
        },
      );

      expect(testEngine.asPlayerOne().challenge(attacker, defender)).toBeSuccessfulCommand();
      expect(testEngine.asPlayerOne().passTurn()).toBeSuccessfulCommand();

      // SPINNING ARROW fires and banishes the compass - YOUR PATH does NOT trigger
      expect(testEngine.asPlayerOne().getCardZone(johnSmithsCompass)).toBe("discard");
      // No bag items for YOUR PATH
      expect(testEngine.asPlayerOne().getBagCount()).toBe(0);
      // helpfulScout stays in deck
      expect(testEngine.asPlayerOne().getCardZone(helpfulScout)).toBe("deck");
    });
  });
});
