import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, createMockCharacter } from "@tcg/lorcana-engine/testing";
import { pedroMadrigalFamilyPatriarch } from "./005-pedro-madrigal-family-patriarch";

const madrigalAlly = createMockCharacter({
  id: "pedro-madrigal-ally",
  name: "Madrigal Ally",
  cost: 2,
  strength: 2,
  willpower: 4,
  lore: 1,
  classifications: ["Storyborn", "Madrigal"],
});

const nonMadrigalAlly = createMockCharacter({
  id: "pedro-non-madrigal-ally",
  name: "Non-Madrigal Ally",
  cost: 2,
  strength: 2,
  willpower: 4,
  lore: 1,
  classifications: ["Storyborn", "Hero"],
});

describe("Pedro Madrigal - Family Patriarch", () => {
  describe("DIFFICULT JOURNEY - This character enters play with 1 damage.", () => {
    it("enters play with 1 damage", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
        hand: [pedroMadrigalFamilyPatriarch],
        inkwell: pedroMadrigalFamilyPatriarch.cost,
      });

      expect(
        testEngine.asPlayerOne().playCard(pedroMadrigalFamilyPatriarch),
      ).toBeSuccessfulCommand();

      expect(testEngine.asPlayerOne().getCard(pedroMadrigalFamilyPatriarch)?.damage).toBe(1);
    });
  });

  describe("DEVOTED FAMILY - When you play this character, if you have another Madrigal character in play, you may remove up to 1 damage from him.", () => {
    it("removes 1 damage from Pedro when another Madrigal is in play", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
        hand: [pedroMadrigalFamilyPatriarch],
        play: [madrigalAlly],
        inkwell: pedroMadrigalFamilyPatriarch.cost,
      });

      expect(
        testEngine.asPlayerOne().playCard(pedroMadrigalFamilyPatriarch),
      ).toBeSuccessfulCommand();

      // Pedro entered with 1 damage from DIFFICULT JOURNEY
      expect(testEngine.asPlayerOne().getCard(pedroMadrigalFamilyPatriarch)?.damage).toBe(1);

      expect(testEngine.asPlayerOne().getBagCount()).toBe(1);
      expect(
        testEngine.asPlayerOne().resolvePendingByCard(pedroMadrigalFamilyPatriarch, {
          resolveOptional: true,
          amount: 1,
        }),
      ).toBeSuccessfulCommand();

      expect(testEngine.asPlayerOne().getCard(pedroMadrigalFamilyPatriarch)?.damage).toBe(0);
    });

    it("does not trigger when no other Madrigal character is in play", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
        hand: [pedroMadrigalFamilyPatriarch],
        play: [nonMadrigalAlly],
        inkwell: pedroMadrigalFamilyPatriarch.cost,
      });

      expect(
        testEngine.asPlayerOne().playCard(pedroMadrigalFamilyPatriarch),
      ).toBeSuccessfulCommand();

      // Condition fails at resolution, so even if queued, it resolves without effect.
      if (testEngine.asPlayerOne().getBagCount() > 0) {
        expect(
          testEngine.asPlayerOne().resolvePendingByCard(pedroMadrigalFamilyPatriarch),
        ).toBeSuccessfulCommand();
      }

      // Pedro still has 1 damage from DIFFICULT JOURNEY
      expect(testEngine.asPlayerOne().getCard(pedroMadrigalFamilyPatriarch)?.damage).toBe(1);
    });

    it("can decline the optional trigger", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
        hand: [pedroMadrigalFamilyPatriarch],
        play: [madrigalAlly],
        inkwell: pedroMadrigalFamilyPatriarch.cost,
      });

      expect(
        testEngine.asPlayerOne().playCard(pedroMadrigalFamilyPatriarch),
      ).toBeSuccessfulCommand();

      expect(testEngine.asPlayerOne().getBagCount()).toBe(1);
      expect(
        testEngine.asPlayerOne().resolvePendingByCard(pedroMadrigalFamilyPatriarch, {
          resolveOptional: false,
        }),
      ).toBeSuccessfulCommand();

      // Damage remains because player declined the optional effect
      expect(testEngine.asPlayerOne().getCard(pedroMadrigalFamilyPatriarch)?.damage).toBe(1);
    });
  });
});
