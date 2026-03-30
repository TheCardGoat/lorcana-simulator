import { describe, expect, it } from "bun:test";
import { createMockCharacter, LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { elsaSpiritOfWinter } from "../../001/characters/042-elsa-spirit-of-winter";
import { monstroInfamousWhale } from "./064-monstro-infamous-whale";

const discardFodder = createMockCharacter({
  id: "monstro-test-discard-fodder",
  name: "Discard Fodder",
  cost: 1,
  strength: 1,
  willpower: 1,
  lore: 1,
});

describe("Monstro - Infamous Whale", () => {
  describe("Rush", () => {
    it("has Rush keyword", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
        play: [monstroInfamousWhale],
        deck: 2,
      });

      expect(testEngine.hasKeyword(monstroInfamousWhale, "Rush")).toBe(true);
    });
  });

  describe("FULL BREACH - Choose and discard a card — Ready this character. He can't quest for the rest of this turn.", () => {
    it("readies an exerted Monstro when activated by discarding a card", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
        play: [{ card: monstroInfamousWhale, exerted: true }],
        hand: [discardFodder],
        deck: 2,
      });

      expect(testEngine.isExerted(monstroInfamousWhale)).toBe(true);

      expect(
        testEngine.asPlayerOne().activateAbility(monstroInfamousWhale, {
          costs: {
            discardCards: [discardFodder],
          },
        }),
      ).toBeSuccessfulCommand();

      // Monstro should be readied
      expect(testEngine.isExerted(monstroInfamousWhale)).toBe(false);
      // The discard fodder should be in discard
      expect(testEngine.asPlayerOne().getCardZone(discardFodder)).toBe("discard");
    });

    it("applies cant-quest restriction for the rest of the turn", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
        play: [{ card: monstroInfamousWhale, exerted: true }],
        hand: [discardFodder],
        deck: 2,
      });

      expect(
        testEngine.asPlayerOne().activateAbility(monstroInfamousWhale, {
          costs: {
            discardCards: [discardFodder],
          },
        }),
      ).toBeSuccessfulCommand();

      expect(testEngine.hasRestriction(monstroInfamousWhale, "cant-quest")).toBe(true);
    });

    it("cant-quest restriction expires after the turn ends", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
        play: [{ card: monstroInfamousWhale, exerted: true }],
        hand: [discardFodder],
        deck: 2,
      });

      expect(
        testEngine.asPlayerOne().activateAbility(monstroInfamousWhale, {
          costs: {
            discardCards: [discardFodder],
          },
        }),
      ).toBeSuccessfulCommand();

      expect(testEngine.hasRestriction(monstroInfamousWhale, "cant-quest")).toBe(true);

      // Pass both turns
      expect(testEngine.asPlayerOne().passTurn()).toBeSuccessfulCommand();
      expect(testEngine.asPlayerTwo().passTurn()).toBeSuccessfulCommand();

      // Restriction should have expired
      expect(testEngine.hasRestriction(monstroInfamousWhale, "cant-quest")).toBe(false);
    });
  });
});

describe("Regression Tests", () => {
  it("FULL BREACH should NOT be blocked by cant-ready-at-start-of-turn effects (e.g. Elsa's DEEP FREEZE)", () => {
    // Player one has Elsa, player two has Monstro
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        inkwell: elsaSpiritOfWinter.cost,
        hand: [elsaSpiritOfWinter],
        deck: 2,
      },
      {
        play: [monstroInfamousWhale],
        hand: [discardFodder],
        deck: 2,
      },
    );

    // Player one plays Elsa, targeting Monstro with DEEP FREEZE
    expect(testEngine.asPlayerOne().playCard(elsaSpiritOfWinter)).toBeSuccessfulCommand();
    expect(
      testEngine
        .asPlayerOne()
        .resolvePendingByCard(elsaSpiritOfWinter, { targets: [monstroInfamousWhale] }),
    ).toBeSuccessfulCommand();

    // Monstro should be exerted and have cant-ready restriction
    expect(testEngine.asPlayerTwo().isExerted(monstroInfamousWhale)).toBe(true);

    // Pass player one's turn — now it's player two's turn, cant-ready restriction is active
    expect(testEngine.asPlayerOne().passTurn()).toBeSuccessfulCommand();
    expect(testEngine.asPlayerTwo().isExerted(monstroInfamousWhale)).toBe(true);

    // FULL BREACH should still be able to ready Monstro despite cant-ready restriction
    expect(
      testEngine.asPlayerTwo().activateAbility(monstroInfamousWhale, {
        costs: { discardCards: [discardFodder] },
      }),
    ).toBeSuccessfulCommand();

    expect(testEngine.asPlayerTwo().isExerted(monstroInfamousWhale)).toBe(false);
  });
});
