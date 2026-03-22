import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, PLAYER_ONE } from "@tcg/lorcana-engine/testing";
import { friendsOnTheOtherSide } from "../../001";
import { jafarStrikingIllusionist } from "./042-jafar-striking-illusionist";

describe("Jafar - Striking Illusionist", () => {
  describe("POWER BEYOND MEASURE - During your turn, while this character is exerted, whenever you draw a card, gain 1 lore.", () => {
    it("gains 1 lore per card drawn while exerted during your turn", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
        play: [{ card: jafarStrikingIllusionist, exerted: true, isDrying: false }],
        hand: [friendsOnTheOtherSide],
        inkwell: friendsOnTheOtherSide.cost,
        deck: 5,
      });

      // Friends on the Other Side draws 2 cards, so Jafar should trigger twice (1 lore per draw)
      expect(testEngine.asPlayerOne().playCard(friendsOnTheOtherSide)).toBeSuccessfulCommand();

      // Two bag effects are queued (one per draw); manually resolve the first
      expect(testEngine.asPlayerOne().getBagCount()).toBe(2);
      const [bagEffect] = testEngine.asPlayerOne().getBagEffects();
      expect(testEngine.asPlayerOne().resolveBag(bagEffect!.id)).toBeSuccessfulCommand();

      // After resolving the first, the second auto-resolves (1 remaining = auto-resolved)
      expect(testEngine.asPlayerOne().getBagCount()).toBe(0);
      expect(testEngine.getLore(PLAYER_ONE)).toBe(2);
    });

    it("does not gain lore when drawing a card while NOT exerted", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
        play: [{ card: jafarStrikingIllusionist, exerted: false, isDrying: false }],
        hand: [friendsOnTheOtherSide],
        inkwell: friendsOnTheOtherSide.cost,
        deck: 5,
      });

      expect(testEngine.asPlayerOne().playCard(friendsOnTheOtherSide)).toBeSuccessfulCommand();

      expect(testEngine.asPlayerOne().getBagCount()).toBe(0);
      expect(testEngine.getLore(PLAYER_ONE)).toBe(0);
    });

    it("does not gain lore when opponent draws a card during opponent's turn", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          play: [{ card: jafarStrikingIllusionist, exerted: true, isDrying: false }],
          deck: 5,
        },
        {
          hand: [friendsOnTheOtherSide],
          inkwell: friendsOnTheOtherSide.cost,
          deck: 5,
        },
      );

      // Pass to P2's turn
      expect(testEngine.asPlayerOne().passTurn()).toBeSuccessfulCommand();

      // P2 plays Friends on the Other Side — draws 2 cards during their turn
      expect(testEngine.asPlayerTwo().playCard(friendsOnTheOtherSide)).toBeSuccessfulCommand();

      // Jafar should not trigger since it's not P1's turn
      expect(testEngine.asPlayerOne().getBagCount()).toBe(0);
      expect(testEngine.getLore(PLAYER_ONE)).toBe(0);
    });
  });
});
