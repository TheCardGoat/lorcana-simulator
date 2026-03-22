import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, createMockCharacter } from "@tcg/lorcana-engine/testing";
import { freeze } from "../../001/actions/063-freeze";
import { grimorumArcanorum } from "./067-grimorum-arcanorum";

const demona = createMockCharacter({
  id: "grimorum-demona",
  name: "Demona",
  cost: 4,
  strength: 4,
  willpower: 4,
});

const challengeDummy = createMockCharacter({
  id: "grimorum-challenge-dummy",
  name: "Challenge Dummy",
  cost: 2,
  strength: 1,
  willpower: 2,
});

describe("Grimorum Arcanorum", () => {
  it("gains 1 lore during your turn when an opposing character becomes exerted", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        play: [grimorumArcanorum],
        hand: [freeze],
        inkwell: freeze.cost,
      },
      {
        play: [challengeDummy],
      },
    );

    const loreBefore = testEngine.getLore("player_one");

    expect(
      testEngine.asPlayerOne().playCard(freeze, {
        targets: [challengeDummy],
      }),
    ).toBeSuccessfulCommand();

    expect(testEngine.getLore("player_one")).toBe(loreBefore + 1);
  });

  it("lets your Demona challenge the turn she enters play", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        play: [grimorumArcanorum, { card: demona, isDrying: true }],
      },
      {
        play: [{ card: challengeDummy, exerted: true, isDrying: false }],
      },
    );

    expect(testEngine.asPlayerOne().canChallenge(demona, challengeDummy)).toBe(true);
  });
});
