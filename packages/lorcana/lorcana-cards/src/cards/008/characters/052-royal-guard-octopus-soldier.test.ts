import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, createMockCharacter } from "@tcg/lorcana-engine/testing";
import { royalGuardOctopusSoldier } from "./052-royal-guard-octopus-soldier";
import { friendsOnTheOtherSide } from "../../001";

const opposingCharacter = createMockCharacter({
  id: "royal-guard-test-opposing",
  name: "Opposing Character",
  cost: 2,
  strength: 2,
  willpower: 5,
});

describe("Royal Guard - Octopus Soldier", () => {
  it("should have correct base stats", () => {
    expect(royalGuardOctopusSoldier.cost).toBe(1);
    expect(royalGuardOctopusSoldier.strength).toBe(1);
    expect(royalGuardOctopusSoldier.willpower).toBe(2);
    expect(royalGuardOctopusSoldier.lore).toBe(1);
    expect(royalGuardOctopusSoldier.inkable).toBe(true);
    expect(royalGuardOctopusSoldier.inkType).toEqual(["amethyst"]);
    expect(royalGuardOctopusSoldier.classifications).toEqual(["Storyborn"]);
  });

  describe("HEAVILY ARMED - Whenever you draw a card, this character gains Challenger +1 this turn.", () => {
    it("gains Challenger +1 when you draw a card", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          play: [{ card: royalGuardOctopusSoldier, exerted: false, isDrying: false }],
          hand: [friendsOnTheOtherSide],
          inkwell: friendsOnTheOtherSide.cost,
          deck: 5,
        },
        {
          play: [{ card: opposingCharacter, exerted: true }],
        },
      );

      expect(testEngine.asPlayerOne().hasKeyword(royalGuardOctopusSoldier, "Challenger")).toBe(
        false,
      );

      expect(testEngine.asPlayerOne().playCard(friendsOnTheOtherSide)).toBeSuccessfulCommand();

      const bagEffects = testEngine.asPlayerOne().getBagEffects();
      expect(bagEffects.length).toBe(2);
      for (const effect of bagEffects) {
        testEngine.asPlayerOne().resolveBag(effect!.id);
      }

      expect(testEngine.asPlayerOne().hasKeyword(royalGuardOctopusSoldier, "Challenger")).toBe(
        true,
      );
      expect(testEngine.asPlayerOne().getKeywordValue(royalGuardOctopusSoldier, "Challenger")).toBe(
        2,
      );
    });

    it("Challenger +1 applies during challenge", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          play: [{ card: royalGuardOctopusSoldier, exerted: false, isDrying: false }],
          hand: [friendsOnTheOtherSide],
          inkwell: friendsOnTheOtherSide.cost,
          deck: 5,
        },
        {
          play: [{ card: opposingCharacter, exerted: true }],
        },
      );

      expect(testEngine.asPlayerOne().playCard(friendsOnTheOtherSide)).toBeSuccessfulCommand();

      const bagEffects = testEngine.asPlayerOne().getBagEffects();
      for (const effect of bagEffects) {
        testEngine.asPlayerOne().resolveBag(effect!.id);
      }

      expect(
        testEngine.asPlayerOne().challenge(royalGuardOctopusSoldier, opposingCharacter),
      ).toBeSuccessfulCommand();

      expect(testEngine.asPlayerTwo().getDamage(opposingCharacter)).toBe(
        royalGuardOctopusSoldier.strength + 2,
      );
    });

    it("Challenger effect expires at end of turn", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          play: [{ card: royalGuardOctopusSoldier, exerted: false, isDrying: false }],
          hand: [friendsOnTheOtherSide],
          inkwell: friendsOnTheOtherSide.cost,
          deck: 5,
        },
        {
          play: [{ card: opposingCharacter, exerted: true }],
        },
      );

      expect(testEngine.asPlayerOne().playCard(friendsOnTheOtherSide)).toBeSuccessfulCommand();

      const bagEffects = testEngine.asPlayerOne().getBagEffects();
      for (const effect of bagEffects) {
        testEngine.asPlayerOne().resolveBag(effect!.id);
      }

      expect(testEngine.asPlayerOne().hasKeyword(royalGuardOctopusSoldier, "Challenger")).toBe(
        true,
      );

      expect(testEngine.asPlayerOne().passTurn()).toBeSuccessfulCommand();
      expect(testEngine.asPlayerTwo().passTurn()).toBeSuccessfulCommand();

      expect(testEngine.asPlayerOne().hasKeyword(royalGuardOctopusSoldier, "Challenger")).toBe(
        false,
      );
    });

    it("does NOT gain Challenger when opponent draws a card", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          play: [{ card: royalGuardOctopusSoldier, exerted: false, isDrying: false }],
          deck: 5,
        },
        {
          hand: [friendsOnTheOtherSide],
          inkwell: friendsOnTheOtherSide.cost,
          deck: 5,
        },
      );

      expect(testEngine.asPlayerOne().passTurn()).toBeSuccessfulCommand();
      expect(testEngine.asPlayerTwo().playCard(friendsOnTheOtherSide)).toBeSuccessfulCommand();

      const bagEffects = testEngine.asPlayerTwo().getBagEffects();
      for (const effect of bagEffects) {
        testEngine.asPlayerTwo().resolveBag(effect!.id);
      }

      expect(testEngine.asPlayerOne().hasKeyword(royalGuardOctopusSoldier, "Challenger")).toBe(
        false,
      );
    });
  });

  it("regression: HEAVILY ARMED should trigger on draws from abilities, not just from card effects", () => {
    // Bug: Royal Guard was not gaining Challenger +1 on ability-added draw triggers.
    // Any draw event should trigger HEAVILY ARMED, including draws from abilities.
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        play: [{ card: royalGuardOctopusSoldier, exerted: false, isDrying: false }],
        hand: [friendsOnTheOtherSide],
        inkwell: friendsOnTheOtherSide.cost,
        deck: 5,
      },
      {
        play: [{ card: opposingCharacter, exerted: true }],
      },
    );

    // Friends on the Other Side draws 2 cards - should trigger HEAVILY ARMED twice
    expect(testEngine.asPlayerOne().playCard(friendsOnTheOtherSide)).toBeSuccessfulCommand();

    const bagEffects = testEngine.asPlayerOne().getBagEffects();
    // Should have 2 bag effects (one for each card drawn)
    expect(bagEffects.length).toBe(2);

    for (const effect of bagEffects) {
      testEngine.asPlayerOne().resolveBag(effect!.id);
    }

    // Should now have Challenger +2 (two draws = two triggers)
    expect(testEngine.asPlayerOne().hasKeyword(royalGuardOctopusSoldier, "Challenger")).toBe(true);
    expect(testEngine.asPlayerOne().getKeywordValue(royalGuardOctopusSoldier, "Challenger")).toBe(
      2,
    );
  });
});
