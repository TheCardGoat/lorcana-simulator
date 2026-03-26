import { describe, expect, it } from "bun:test";
import {
  LorcanaMultiplayerTestEngine,
  PLAYER_ONE,
  createMockCharacter,
} from "@tcg/lorcana-engine/testing";
import { plutoSteelChampion } from "./191-pluto-steel-champion";

const steelAlly = createMockCharacter({
  id: "pluto-steel-ally",
  name: "Steel Ally",
  cost: 3,
  strength: 5,
  willpower: 5,
  inkType: ["steel"],
  classifications: ["Storyborn"],
});

const weakOpponent = createMockCharacter({
  id: "pluto-weak-opponent",
  name: "Weak Opponent",
  cost: 1,
  strength: 1,
  willpower: 1,
});

describe("Pluto - Steel Champion", () => {
  it("regression: gains 2 lore when another Steel character banishes an opponent in a challenge", () => {
    // Bug: Pluto was not gaining lore when another Steel character banished
    // an opponent's character in a challenge.
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        play: [plutoSteelChampion, { card: steelAlly, isDrying: false }],
        lore: 0,
      },
      {
        play: [{ card: weakOpponent, exerted: true }],
      },
    );

    expect(testEngine.getLore(PLAYER_ONE)).toBe(0);

    // Steel ally challenges and banishes the weak opponent
    expect(testEngine.asPlayerOne().challenge(steelAlly, weakOpponent)).toBeSuccessfulCommand();

    // Weak opponent should be banished
    expect(testEngine.asPlayerTwo().getCardZone(weakOpponent)).toBe("discard");

    // Pluto's WINNER TAKE ALL should trigger, gaining 2 lore
    // Resolve bag effects if needed
    const bagEffects = testEngine.asPlayerOne().getBagEffects();
    for (const bagEffect of bagEffects) {
      testEngine.asPlayerOne().resolveBag(bagEffect.id);
    }

    expect(testEngine.getLore(PLAYER_ONE)).toBe(2);
  });

  it("does not gain lore when Pluto himself banishes a character (only OTHER Steel characters)", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        play: [{ card: plutoSteelChampion, isDrying: false }],
        lore: 0,
      },
      {
        play: [{ card: weakOpponent, exerted: true }],
      },
    );

    expect(testEngine.getLore(PLAYER_ONE)).toBe(0);

    expect(
      testEngine.asPlayerOne().challenge(plutoSteelChampion, weakOpponent),
    ).toBeSuccessfulCommand();

    expect(testEngine.asPlayerTwo().getCardZone(weakOpponent)).toBe("discard");

    // Pluto should NOT gain lore when he himself banishes (trigger is on OTHER characters)
    const bagEffects = testEngine.asPlayerOne().getBagEffects();
    for (const bagEffect of bagEffects) {
      testEngine.asPlayerOne().resolveBag(bagEffect.id);
    }

    expect(testEngine.getLore(PLAYER_ONE)).toBe(0);
  });
});
