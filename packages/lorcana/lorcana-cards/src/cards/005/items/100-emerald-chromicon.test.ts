import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, createMockCharacter } from "@tcg/lorcana-engine/testing";
import { emeraldChromicon } from "./100-emerald-chromicon";

const fragileAlly = createMockCharacter({
  id: "emerald-chromicon-fragile-ally",
  name: "Fragile Ally",
  cost: 2,
  strength: 1,
  willpower: 1,
});

const opposingAttacker = createMockCharacter({
  id: "emerald-chromicon-opposing-attacker",
  name: "Opposing Attacker",
  cost: 3,
  strength: 3,
  willpower: 3,
});

const retreatingTarget = createMockCharacter({
  id: "emerald-chromicon-retreating-target",
  name: "Retreating Target",
  cost: 2,
  strength: 2,
  willpower: 2,
});

const steadfastDefender = createMockCharacter({
  id: "emerald-chromicon-steadfast-defender",
  name: "Steadfast Defender",
  cost: 4,
  strength: 4,
  willpower: 4,
});

describe("Emerald Chromicon", () => {
  it("can return a chosen character to its player's hand when one of your characters is banished during an opponent's turn", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        deck: 1,
        play: [emeraldChromicon, { card: fragileAlly, exerted: true }],
      },
      {
        deck: 1,
        play: [opposingAttacker, retreatingTarget],
      },
    );

    expect(testEngine.asPlayerOne().passTurn()).toBeSuccessfulCommand();
    expect(
      testEngine.asPlayerTwo().challenge(opposingAttacker, fragileAlly),
    ).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().getBagCount()).toBe(1);
    expect(
      testEngine.asPlayerOne().resolveBag(testEngine.asPlayerOne().getBagEffects()[0]!.id, {
        resolveOptional: true,
        targets: [retreatingTarget],
      }),
    ).toBeSuccessfulCommand();

    expect(testEngine.asPlayerTwo().getCardZone(retreatingTarget)).toBe("hand");
  });

  it("does not trigger when your character is banished on your own turn", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        deck: 1,
        play: [emeraldChromicon, fragileAlly],
      },
      {
        deck: 1,
        play: [{ card: steadfastDefender, exerted: true }],
      },
    );

    expect(
      testEngine.asPlayerOne().challenge(fragileAlly, steadfastDefender),
    ).toBeSuccessfulCommand();

    expect(testEngine.asPlayerOne().getBagCount()).toBe(0);
  });
});
