import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, createMockCharacter } from "@tcg/lorcana-engine/testing";
import { recoveredPage } from "../items/030-recovered-page";
import { castleOfTheHornedKingBastionOfEvil } from "./170-castle-of-the-horned-king-bastion-of-evil";

const gloomQuester = createMockCharacter({
  id: "gloom-quester",
  name: "Gloom Quester",
  cost: 2,
  lore: 1,
});

describe("Castle of the Horned King - Bastion of Evil", () => {
  it("lets you ready a chosen item the first time a character quests here during your turn", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      play: [
        castleOfTheHornedKingBastionOfEvil,
        { card: gloomQuester, atLocation: castleOfTheHornedKingBastionOfEvil },
        { card: recoveredPage, exerted: true },
      ],
      deck: 1,
    });

    expect(testEngine.asPlayerOne().getCard(recoveredPage).exerted).toBe(true);
    expect(testEngine.asPlayerOne().quest(gloomQuester)).toBeSuccessfulCommand();
    expect(
      testEngine.asPlayerOne().resolveBag(testEngine.asPlayerOne().getBagEffects()[0]!.id).success,
    ).toBe(true);
    expect(
      testEngine
        .asPlayerOne()
        .resolveNextPending({ resolveOptional: true, targets: [recoveredPage] }).success,
    ).toBe(true);
    expect(testEngine.asPlayerOne().getCard(recoveredPage).exerted).toBe(false);
  });
});
