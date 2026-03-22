import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, createMockCharacter } from "@tcg/lorcana-engine/testing";
import { chiefSeasonedTracker } from "./179-chief-seasoned-tracker";

const weakOpponent = createMockCharacter({
  id: "chief-weak-opponent",
  name: "Weak Opponent",
  strength: 1,
  willpower: 1,
  cost: 1,
});

const strongAttacker = createMockCharacter({
  id: "chief-strong-attacker",
  name: "Strong Attacker",
  strength: 5,
  willpower: 5,
  cost: 3,
});

const chiefAttacker = createMockCharacter({
  id: "chief-attacker",
  name: "Chief Attacker",
  strength: 3,
  willpower: 3,
  cost: 2,
});

describe("Chief - Seasoned Tracker", () => {
  it("has an activated ability with exert cost", () => {
    const ability = chiefSeasonedTracker.abilities?.[0];
    expect(ability).toBeDefined();
    expect(ability?.type).toBe("activated");
    const abilityCost = (ability as unknown as Record<string, unknown>)?.cost as
      | Record<string, unknown>
      | undefined;
    expect(abilityCost?.exert).toBe(true);
  });

  it("exerts when ability is activated", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      play: [chiefSeasonedTracker],
      deck: 5,
    });

    expect(testEngine.asPlayerOne().isExerted(chiefSeasonedTracker)).toBe(false);

    expect(testEngine.asPlayerOne().activateAbility(chiefSeasonedTracker)).toBeSuccessfulCommand();

    expect(testEngine.asPlayerOne().isExerted(chiefSeasonedTracker)).toBe(true);
  });

  it("does not draw when no opposing character was banished in a challenge this turn", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      play: [chiefSeasonedTracker],
      deck: 5,
    });

    const handBefore = testEngine.asPlayerOne().getZonesCardCount().hand;

    expect(testEngine.asPlayerOne().activateAbility(chiefSeasonedTracker)).toBeSuccessfulCommand();

    const handAfter = testEngine.asPlayerOne().getZonesCardCount().hand;
    expect(handAfter).toBe(handBefore);
  });

  it("GOOD RIDDANCE - draws a card when an opposing character was banished in a challenge this turn", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        play: [chiefSeasonedTracker, chiefAttacker],
        deck: 5,
      },
      {
        play: [{ card: weakOpponent, exerted: true }],
      },
    );

    // Challenge to banish the weak opponent
    expect(testEngine.asPlayerOne().challenge(chiefAttacker, weakOpponent)).toBeSuccessfulCommand();
    expect(testEngine.asPlayerTwo().getCardZone(weakOpponent)).toBe("discard");

    const handBefore = testEngine.asPlayerOne().getZonesCardCount().hand;

    // Now activate Chief - condition is met, should draw
    expect(testEngine.asPlayerOne().activateAbility(chiefSeasonedTracker)).toBeSuccessfulCommand();

    const handAfter = testEngine.asPlayerOne().getZonesCardCount().hand;
    expect(handAfter).toBe(handBefore + 1);
  });
});
