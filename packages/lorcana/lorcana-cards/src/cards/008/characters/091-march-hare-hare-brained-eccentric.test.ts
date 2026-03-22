import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, createMockCharacter } from "@tcg/lorcana-engine/testing";
import { marchHareHarebrainedEccentric } from "./091-march-hare-hare-brained-eccentric";

const damagedCharacter = createMockCharacter({
  id: "march-hare-damaged-char",
  name: "Damaged Character",
  cost: 3,
  strength: 3,
  willpower: 4,
  lore: 1,
});

const undamagedCharacter = createMockCharacter({
  id: "march-hare-undamaged-char",
  name: "Undamaged Character",
  cost: 3,
  strength: 3,
  willpower: 4,
  lore: 1,
});

describe("March Hare - Hare-Brained Eccentric", () => {
  describe("LIGHT THE CANDLES: When you play this character, you may deal 2 damage to chosen damaged character.", () => {
    it("deals 2 damage to chosen damaged character", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          inkwell: marchHareHarebrainedEccentric.cost,
          hand: [marchHareHarebrainedEccentric],
          deck: 2,
        },
        {
          play: [damagedCharacter],
          deck: 2,
        },
      );

      expect(testEngine.asServer().manualSetDamage(damagedCharacter, 1)).toBeSuccessfulCommand();
      expect(testEngine.asServer().getDamage(damagedCharacter)).toBe(1);

      expect(
        testEngine.asPlayerOne().playCard(marchHareHarebrainedEccentric),
      ).toBeSuccessfulCommand();

      const [bagEffect] = testEngine.asPlayerOne().getBagEffects();

      expect(
        testEngine.asPlayerOne().resolveBag(bagEffect!.id, {
          resolveOptional: true,
          targets: [damagedCharacter],
        }),
      ).toBeSuccessfulCommand();

      expect(testEngine.asServer().getDamage(damagedCharacter)).toBe(3);
    });

    it("is optional - player can decline", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          inkwell: marchHareHarebrainedEccentric.cost,
          hand: [marchHareHarebrainedEccentric],
          deck: 2,
        },
        {
          play: [damagedCharacter],
          deck: 2,
        },
      );

      expect(testEngine.asServer().manualSetDamage(damagedCharacter, 1)).toBeSuccessfulCommand();

      expect(
        testEngine.asPlayerOne().playCard(marchHareHarebrainedEccentric),
      ).toBeSuccessfulCommand();

      const [bagEffect] = testEngine.asPlayerOne().getBagEffects();

      expect(
        testEngine.asPlayerOne().resolveBag(bagEffect!.id, {
          resolveOptional: false,
        }),
      ).toBeSuccessfulCommand();

      expect(testEngine.asServer().getDamage(damagedCharacter)).toBe(1);
    });

    it("auto-skips when only undamaged characters are in play", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          inkwell: marchHareHarebrainedEccentric.cost,
          hand: [marchHareHarebrainedEccentric],
          deck: 2,
        },
        {
          play: [undamagedCharacter],
          deck: 2,
        },
      );

      expect(testEngine.asServer().getDamage(undamagedCharacter)).toBe(0);

      expect(
        testEngine.asPlayerOne().playCard(marchHareHarebrainedEccentric),
      ).toBeSuccessfulCommand();

      expect(testEngine.asPlayerOne().getBagCount()).toBe(0);

      expect(testEngine.asServer().getDamage(undamagedCharacter)).toBe(0);
    });
  });
});
