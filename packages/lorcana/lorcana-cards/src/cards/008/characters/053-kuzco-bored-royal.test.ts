import { describe, expect, it } from "bun:test";
import {
  LorcanaMultiplayerTestEngine,
  PLAYER_TWO,
  createMockCharacter,
  createMockItem,
  createMockLocation,
} from "@tcg/lorcana-engine/testing";
import { kuzcoBoredRoyal } from "./053-kuzco-bored-royal";

const opponentCharacterCost2 = createMockCharacter({
  id: "kuzco-test-opp-char-cost2",
  name: "Opponent Character Cost 2",
  cost: 2,
  strength: 1,
  willpower: 2,
  lore: 1,
});

const opponentCharacterCost3 = createMockCharacter({
  id: "kuzco-test-opp-char-cost3",
  name: "Opponent Character Cost 3",
  cost: 3,
  strength: 2,
  willpower: 2,
  lore: 1,
});

const ownCharacterCost1 = createMockCharacter({
  id: "kuzco-test-own-char-cost1",
  name: "Own Character Cost 1",
  cost: 1,
  strength: 1,
  willpower: 2,
  lore: 1,
});

const itemCost2 = createMockItem({
  id: "kuzco-test-item-cost2",
  name: "Item Cost 2",
  cost: 2,
});

const locationCost1 = createMockLocation({
  id: "kuzco-test-location-cost1",
  name: "Location Cost 1",
  cost: 1,
  moveCost: 1,
  willpower: 4,
  lore: 1,
});

describe("Kuzco - Bored Royal", () => {
  describe("LLAMA BREATH - When you play this character, you may return chosen character, item, or location with cost 2 or less to their player's hand.", () => {
    it("returns a chosen opponent character with cost 2 or less to their player's hand", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          hand: [kuzcoBoredRoyal],
          inkwell: kuzcoBoredRoyal.cost,
          deck: 3,
        },
        {
          play: [opponentCharacterCost2],
          deck: 3,
        },
      );

      expect(testEngine.asPlayerOne().playCard(kuzcoBoredRoyal)).toBeSuccessfulCommand();
      expect(testEngine.asPlayerOne().getBagCount()).toBe(1);

      const [bagEffect] = testEngine.asPlayerOne().getBagEffects();
      expect(testEngine.asPlayerOne().resolveBag(bagEffect!.id)).toBeSuccessfulCommand();
      expect(
        testEngine.asPlayerOne().resolveNextPending({
          resolveOptional: true,
          targets: [opponentCharacterCost2],
        }),
      ).toBeSuccessfulCommand();

      expect(testEngine.asPlayerOne().getCardsInZone("play", PLAYER_TWO).count).toBe(0);
      expect(testEngine.asPlayerOne().getCardsInZone("hand", PLAYER_TWO).count).toBe(1);
    });

    it("cannot target an opponent character with cost 3 (above limit)", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          hand: [kuzcoBoredRoyal],
          inkwell: kuzcoBoredRoyal.cost,
          deck: 3,
        },
        {
          play: [opponentCharacterCost3],
          deck: 3,
        },
      );

      expect(testEngine.asPlayerOne().playCard(kuzcoBoredRoyal)).toBeSuccessfulCommand();
      expect(testEngine.asPlayerOne().getBagCount()).toBe(1);

      const [bagEffect] = testEngine.asPlayerOne().getBagEffects();
      expect(testEngine.asPlayerOne().resolveBag(bagEffect!.id)).toBeSuccessfulCommand();

      // Targeting cost-3 character should fail (invalid target)
      expect(
        testEngine.asPlayerOne().resolveNextPending({
          resolveOptional: true,
          targets: [opponentCharacterCost3],
        }),
      ).not.toBeSuccessfulCommand();
    });

    it("can return an item with cost 2 or less to hand", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          hand: [kuzcoBoredRoyal],
          inkwell: kuzcoBoredRoyal.cost,
          play: [itemCost2],
          deck: 3,
        },
        {
          deck: 3,
        },
      );

      expect(testEngine.asPlayerOne().playCard(kuzcoBoredRoyal)).toBeSuccessfulCommand();
      expect(testEngine.asPlayerOne().getBagCount()).toBe(1);

      const [bagEffect] = testEngine.asPlayerOne().getBagEffects();
      expect(testEngine.asPlayerOne().resolveBag(bagEffect!.id)).toBeSuccessfulCommand();
      expect(
        testEngine.asPlayerOne().resolveNextPending({
          resolveOptional: true,
          targets: [itemCost2],
        }),
      ).toBeSuccessfulCommand();

      expect(testEngine.asPlayerOne().getCardZone(itemCost2)).toBe("hand");
    });

    it("can return a location with cost 2 or less to hand", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          hand: [kuzcoBoredRoyal],
          inkwell: kuzcoBoredRoyal.cost,
          play: [locationCost1],
          deck: 3,
        },
        {
          deck: 3,
        },
      );

      expect(testEngine.asPlayerOne().playCard(kuzcoBoredRoyal)).toBeSuccessfulCommand();
      expect(testEngine.asPlayerOne().getBagCount()).toBe(1);

      const [bagEffect] = testEngine.asPlayerOne().getBagEffects();
      expect(testEngine.asPlayerOne().resolveBag(bagEffect!.id)).toBeSuccessfulCommand();
      expect(
        testEngine.asPlayerOne().resolveNextPending({
          resolveOptional: true,
          targets: [locationCost1],
        }),
      ).toBeSuccessfulCommand();

      expect(testEngine.asPlayerOne().getCardZone(locationCost1)).toBe("hand");
    });

    it("can return own character to hand", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          hand: [kuzcoBoredRoyal],
          inkwell: kuzcoBoredRoyal.cost,
          play: [ownCharacterCost1],
          deck: 3,
        },
        {
          deck: 3,
        },
      );

      expect(testEngine.asPlayerOne().playCard(kuzcoBoredRoyal)).toBeSuccessfulCommand();
      expect(testEngine.asPlayerOne().getBagCount()).toBe(1);

      const [bagEffect] = testEngine.asPlayerOne().getBagEffects();
      expect(testEngine.asPlayerOne().resolveBag(bagEffect!.id)).toBeSuccessfulCommand();
      expect(
        testEngine.asPlayerOne().resolveNextPending({
          resolveOptional: true,
          targets: [ownCharacterCost1],
        }),
      ).toBeSuccessfulCommand();

      expect(testEngine.asPlayerOne().getCardZone(ownCharacterCost1)).toBe("hand");
    });

    it("allows declining the optional ability", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          hand: [kuzcoBoredRoyal],
          inkwell: kuzcoBoredRoyal.cost,
          play: [ownCharacterCost1],
          deck: 3,
        },
        {
          deck: 3,
        },
      );

      expect(testEngine.asPlayerOne().playCard(kuzcoBoredRoyal)).toBeSuccessfulCommand();
      expect(testEngine.asPlayerOne().getBagCount()).toBe(1);

      const [bagEffect] = testEngine.asPlayerOne().getBagEffects();
      expect(
        testEngine.asPlayerOne().resolveBag(bagEffect!.id, { resolveOptional: false }),
      ).toBeSuccessfulCommand();

      expect(testEngine.asPlayerOne().getCardZone(ownCharacterCost1)).toBe("play");
    });
  });
});
