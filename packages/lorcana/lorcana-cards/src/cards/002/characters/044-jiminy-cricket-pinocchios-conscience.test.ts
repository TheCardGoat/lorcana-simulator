import { describe, expect, it } from "bun:test";
import {
  LorcanaMultiplayerTestEngine,
  LorcanaTestEngine,
  createMockCharacter,
} from "@tcg/lorcana-engine/testing";
import { jiminyCricketPinocchiosConscience } from "./044-jiminy-cricket-pinocchios-conscience";
import { pinocchioOnTheRun } from "./057-pinocchio-on-the-run";

const drawnCard = createMockCharacter({
  id: "jiminy-draw",
  name: "Jiminy Draw",
  cost: 1,
});

describe("Jiminy Cricket - Pinocchio's Conscience", () => {
  it("has Evasive", () => {
    const testEngine = new LorcanaTestEngine({
      play: [jiminyCricketPinocchiosConscience],
    });

    expect(testEngine.getCardModel(jiminyCricketPinocchiosConscience).hasEvasive).toBe(true);
  });

  it("lets you draw when Pinocchio is already in play", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [jiminyCricketPinocchiosConscience],
      inkwell: jiminyCricketPinocchiosConscience.cost,
      play: [pinocchioOnTheRun],
      deck: [drawnCard],
    });

    expect(
      testEngine.asPlayerOne().playCard(jiminyCricketPinocchiosConscience),
    ).toBeSuccessfulCommand();
    expect(
      testEngine.asPlayerOne().resolvePendingByCard(jiminyCricketPinocchiosConscience),
    ).toBeSuccessfulCommand();

    expect(testEngine.asPlayerOne().getCardZone(drawnCard)).toBe("hand");
  });

  it("does not trigger without Pinocchio in play", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [jiminyCricketPinocchiosConscience],
      inkwell: jiminyCricketPinocchiosConscience.cost,
      deck: [drawnCard],
    });

    expect(
      testEngine.asPlayerOne().playCard(jiminyCricketPinocchiosConscience),
    ).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().getBagCount()).toBe(0);
    expect(testEngine.asPlayerOne().getCardZone(drawnCard)).toBe("deck");
  });
});
