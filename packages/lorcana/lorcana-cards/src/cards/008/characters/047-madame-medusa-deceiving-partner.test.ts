import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, createMockCharacter } from "@tcg/lorcana-engine/testing";
import { madameMedusaDeceivingPartner } from "./047-madame-medusa-deceiving-partner";
import { dormouseEasilyAgitated } from "./103-dormouse-easily-agitated";

const alliedCharacter = createMockCharacter({
  id: "madame-medusa-dp-allied-character",
  name: "Allied Character",
  cost: 3,
  strength: 3,
  willpower: 5,
  lore: 1,
});

const opponentCharacterCost2 = createMockCharacter({
  id: "madame-medusa-dp-opp-cost-2",
  name: "Opponent Character Cost 2",
  cost: 2,
  strength: 2,
  willpower: 3,
  lore: 1,
});

const opponentCharacterCost3 = createMockCharacter({
  id: "madame-medusa-dp-opp-cost-3",
  name: "Opponent Character Cost 3",
  cost: 3,
  strength: 3,
  willpower: 4,
  lore: 1,
});

describe("Madame Medusa - Deceiving Partner", () => {
  describe("DOUBLE-CROSS - When you play this character, you may deal 2 damage to another chosen character of yours to return chosen character with cost 2 or less to their player's hand.", () => {
    it("deals 2 damage to another friendly character and returns an opponent's character with cost 2 or less to their hand", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          hand: [madameMedusaDeceivingPartner],
          inkwell: madameMedusaDeceivingPartner.cost,
          play: [alliedCharacter],
        },
        {
          play: [opponentCharacterCost2],
        },
      );

      expect(
        testEngine.asPlayerOne().playCard(madameMedusaDeceivingPartner),
      ).toBeSuccessfulCommand();
      expect(
        testEngine.asPlayerOne().resolveNextBag({
          resolveOptional: true,
          targets: [alliedCharacter, opponentCharacterCost2],
        }),
      ).toBeSuccessfulCommand();

      expect(testEngine.asPlayerOne().getDamage(alliedCharacter)).toBe(2);
      expect(testEngine.asPlayerTwo().getCardZone(opponentCharacterCost2)).toBe("hand");
    });

    it("can return a friendly character with cost 2 or less to hand", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          hand: [madameMedusaDeceivingPartner],
          inkwell: madameMedusaDeceivingPartner.cost,
          play: [alliedCharacter, dormouseEasilyAgitated],
        },
        {},
      );

      expect(
        testEngine.asPlayerOne().playCard(madameMedusaDeceivingPartner),
      ).toBeSuccessfulCommand();
      expect(
        testEngine.asPlayerOne().resolveNextBag({
          resolveOptional: true,
          targets: [alliedCharacter, dormouseEasilyAgitated],
        }),
      ).toBeSuccessfulCommand();

      expect(testEngine.asPlayerOne().getDamage(alliedCharacter)).toBe(2);
      expect(testEngine.asPlayerOne().getCardZone(dormouseEasilyAgitated)).toBe("hand");
    });

    it("can decline the optional ability", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          hand: [madameMedusaDeceivingPartner],
          inkwell: madameMedusaDeceivingPartner.cost,
          play: [alliedCharacter],
        },
        {
          play: [opponentCharacterCost2],
        },
      );

      expect(
        testEngine.asPlayerOne().playCard(madameMedusaDeceivingPartner),
      ).toBeSuccessfulCommand();
      expect(
        testEngine.asPlayerOne().resolveNextBag({
          resolveOptional: false,
        }),
      ).toBeSuccessfulCommand();

      expect(testEngine.asPlayerOne().getDamage(alliedCharacter)).toBe(0);
      expect(testEngine.asPlayerTwo().getCardZone(opponentCharacterCost2)).toBe("play");
    });

    it("cannot target a character with cost greater than 2 for the return effect", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          hand: [madameMedusaDeceivingPartner],
          inkwell: madameMedusaDeceivingPartner.cost,
          play: [alliedCharacter],
        },
        {
          play: [opponentCharacterCost3],
        },
      );

      expect(
        testEngine.asPlayerOne().playCard(madameMedusaDeceivingPartner),
      ).toBeSuccessfulCommand();
      expect(
        testEngine.asPlayerOne().resolveNextBag({
          resolveOptional: true,
          targets: [alliedCharacter, opponentCharacterCost3],
        }),
      ).not.toBeSuccessfulCommand();
    });
  });
});
