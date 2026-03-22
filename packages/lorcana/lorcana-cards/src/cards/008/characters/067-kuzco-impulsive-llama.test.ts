import { describe, expect, it } from "bun:test";
import {
  LorcanaMultiplayerTestEngine,
  PLAYER_TWO,
  createMockCharacter,
} from "@tcg/lorcana-engine/testing";
import { kuzcoImpulsiveLlama } from "./067-kuzco-impulsive-llama";

const opponentCharacterA = createMockCharacter({
  id: "kuzco-il-opponent-a",
  name: "Opponent Character A",
  cost: 3,
  strength: 3,
  willpower: 3,
  lore: 1,
});

const opponentCharacterB = createMockCharacter({
  id: "kuzco-il-opponent-b",
  name: "Opponent Character B",
  cost: 2,
  strength: 2,
  willpower: 2,
  lore: 1,
});

describe("Kuzco - Impulsive Llama", () => {
  it("has Shift 4", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      play: [kuzcoImpulsiveLlama],
      deck: 1,
    });

    const card = kuzcoImpulsiveLlama.abilities?.find(
      (a) => a.type === "keyword" && "keyword" in a && a.keyword === "Shift",
    );
    expect(card).toBeDefined();
    expect((card as { cost: { ink: number } }).cost.ink).toBe(4);
  });

  describe("WHAT DOES THIS DO? - When you play this character, each opponent chooses one of their characters and puts that card on the bottom of their deck. Then, each opponent may draw a card.", () => {
    it("opponent must choose one of their characters to put on the bottom of their deck", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          hand: [kuzcoImpulsiveLlama],
          inkwell: kuzcoImpulsiveLlama.cost,
          deck: 1,
        },
        {
          play: [opponentCharacterA, opponentCharacterB],
          deck: 5,
        },
      );

      expect(testEngine.asPlayerOne().playCard(kuzcoImpulsiveLlama)).toBeSuccessfulCommand();

      // The triggered ability is in the bag - player one resolves it
      expect(testEngine.asPlayerOne().getBagCount()).toBe(1);
      const [bagEffect] = testEngine.asPlayerOne().getBagEffects();
      expect(testEngine.asPlayerOne().resolveBag(bagEffect!.id)).toBeSuccessfulCommand();

      // Opponent must choose one character to put on the bottom of their deck
      expect(testEngine.asPlayerTwo()).toHavePendingEffectCount(1);

      expect(
        testEngine.asPlayerTwo().resolveNextPending({
          targets: [opponentCharacterA],
        }),
      ).toBeSuccessfulCommand();

      // The chosen character should be in the opponent's deck
      expect(testEngine.asPlayerTwo().getCardZone(opponentCharacterA)).toBe("deck");
      // The unchosen character should still be in play
      expect(testEngine.asPlayerTwo().getCardZone(opponentCharacterB)).toBe("play");
    });

    it("opponent may draw a card after putting their character on the bottom of the deck", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          hand: [kuzcoImpulsiveLlama],
          inkwell: kuzcoImpulsiveLlama.cost,
          deck: 1,
        },
        {
          play: [opponentCharacterA],
          deck: 5,
        },
      );

      const opponentHandBefore = testEngine.asPlayerOne().getCardsInZone("hand", PLAYER_TWO).count;
      expect(testEngine.asPlayerOne().playCard(kuzcoImpulsiveLlama)).toBeSuccessfulCommand();

      // Resolve the bag (triggered ability)
      const [bagEffect] = testEngine.asPlayerOne().getBagEffects();
      expect(testEngine.asPlayerOne().resolveBag(bagEffect!.id)).toBeSuccessfulCommand();

      // Resolve the mandatory put-on-bottom choice
      expect(
        testEngine.asPlayerTwo().resolveNextPending({
          targets: [opponentCharacterA],
        }),
      ).toBeSuccessfulCommand();

      expect(testEngine.asPlayerTwo().getCardZone(opponentCharacterA)).toBe("deck");

      // After putting the character on the bottom, opponent may draw a card
      expect(testEngine.asPlayerTwo()).toHavePendingEffectCount(1);

      expect(
        testEngine.asPlayerTwo().resolveNextPending({ resolveOptional: true }),
      ).toBeSuccessfulCommand();

      const opponentHandAfter = testEngine.asPlayerOne().getCardsInZone("hand", PLAYER_TWO).count;
      expect(opponentHandAfter).toBe(opponentHandBefore + 1);
    });

    it("opponent may decline to draw a card", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          hand: [kuzcoImpulsiveLlama],
          inkwell: kuzcoImpulsiveLlama.cost,
          deck: 1,
        },
        {
          play: [opponentCharacterA],
          deck: 5,
        },
      );

      const opponentHandBefore = testEngine.asPlayerOne().getCardsInZone("hand", PLAYER_TWO).count;
      expect(testEngine.asPlayerOne().playCard(kuzcoImpulsiveLlama)).toBeSuccessfulCommand();

      // Resolve the bag (triggered ability)
      const [bagEffect] = testEngine.asPlayerOne().getBagEffects();
      expect(testEngine.asPlayerOne().resolveBag(bagEffect!.id)).toBeSuccessfulCommand();

      // Resolve the mandatory put-on-bottom choice
      expect(
        testEngine.asPlayerTwo().resolveNextPending({
          targets: [opponentCharacterA],
        }),
      ).toBeSuccessfulCommand();

      // Decline to draw
      expect(
        testEngine.asPlayerTwo().resolveNextPending({ resolveOptional: false }),
      ).toBeSuccessfulCommand();

      const opponentHandAfter = testEngine.asPlayerOne().getCardsInZone("hand", PLAYER_TWO).count;
      expect(opponentHandAfter).toBe(opponentHandBefore);
    });
  });
});
