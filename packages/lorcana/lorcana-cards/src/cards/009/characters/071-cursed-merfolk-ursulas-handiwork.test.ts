import { describe, expect, it } from "bun:test";
import {
  LorcanaMultiplayerTestEngine,
  PLAYER_ONE,
  createMockCharacter,
} from "@tcg/lorcana-engine/testing";
import { cursedMerfolkUrsulasHandiwork } from "./071-cursed-merfolk-ursulas-handiwork";

const attacker = createMockCharacter({
  id: "cursed-merfolk-attacker",
  name: "Attacker",
  cost: 3,
  strength: 3,
  willpower: 3,
  lore: 1,
});

const handCard = createMockCharacter({
  id: "cursed-merfolk-hand-card",
  name: "Hand Card",
  cost: 1,
  strength: 1,
  willpower: 1,
  lore: 1,
});

describe("Cursed Merfolk - Ursula's Handiwork", () => {
  describe("POOR SOULS: Whenever this character is challenged, each opponent chooses and discards a card.", () => {
    it("makes the challenging player discard a chosen card when challenged", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          play: [{ card: attacker, isDrying: false }],
          hand: [handCard],
          deck: 1,
        },
        {
          play: [{ card: cursedMerfolkUrsulasHandiwork, exerted: true }],
          deck: 1,
        },
      );

      const handCardId = testEngine.findCardInstanceId(handCard, "hand", PLAYER_ONE);

      expect(
        testEngine.asPlayerOne().challenge(attacker, cursedMerfolkUrsulasHandiwork),
      ).toBeSuccessfulCommand();

      expect(testEngine.asPlayerTwo().getBagCount()).toBeGreaterThan(0);
      expect(
        testEngine.asPlayerTwo().resolveBag(testEngine.asPlayerTwo().getBagEffects()[0]!.id),
      ).toBeSuccessfulCommand();

      expect(
        testEngine.asPlayerOne().resolvePendingEffect(cursedMerfolkUrsulasHandiwork, {
          targets: [handCardId],
        }),
      ).toBeSuccessfulCommand();

      expect(testEngine.asPlayerOne().getCardZone(handCard)).toBe("discard");
      expect(testEngine.asPlayerOne().getZonesCardCount(PLAYER_ONE).hand).toBe(0);
      expect(testEngine.asPlayerOne().getCardZone(cursedMerfolkUrsulasHandiwork)).toBe("discard");
    });

    it("auto-resolves when the challenging player has no cards in hand", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          play: [{ card: attacker, isDrying: false }],
          deck: 1,
        },
        {
          play: [{ card: cursedMerfolkUrsulasHandiwork, exerted: true }],
          deck: 1,
        },
      );

      expect(
        testEngine.asPlayerOne().challenge(attacker, cursedMerfolkUrsulasHandiwork),
      ).toBeSuccessfulCommand();

      expect(testEngine.asPlayerTwo().getBagCount()).toBeGreaterThan(0);
      expect(
        testEngine.asPlayerTwo().resolveBag(testEngine.asPlayerTwo().getBagEffects()[0]!.id),
      ).toBeSuccessfulCommand();

      expect(testEngine.asPlayerOne().getZonesCardCount(PLAYER_ONE).hand).toBe(0);
      expect(testEngine.asServer().getState().G.pendingEffects ?? []).toEqual([]);
      expect(testEngine.asServer().getState().G.challengeState).toBeUndefined();
    });
  });
});
