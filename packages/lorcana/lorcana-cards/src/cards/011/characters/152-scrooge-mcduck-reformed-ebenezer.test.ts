import { describe, expect, it } from "bun:test";
import {
  LorcanaMultiplayerTestEngine,
  LorcanaTestEngine,
  createMockCharacter,
} from "@tcg/lorcana-engine/testing";
import { scroogeMcduckReformedEbenezer } from "./152-scrooge-mcduck-reformed-ebenezer";

const allyOne = createMockCharacter({
  id: "scrooge-reformed-ally-one",
  name: "Ally One",
  cost: 2,
});

const allyTwo = createMockCharacter({
  id: "scrooge-reformed-ally-two",
  name: "Ally Two",
  cost: 2,
});

describe("Scrooge McDuck - Reformed Ebenezer", () => {
  it("has Shift 4 keyword", () => {
    const testEngine = new LorcanaTestEngine({
      play: [scroogeMcduckReformedEbenezer],
    });

    const cardUnderTest = testEngine.getCardModel(scroogeMcduckReformedEbenezer);
    expect(cardUnderTest.hasShift()).toBe(true);
    expect(cardUnderTest.shiftInkCost).toBe(4);
  });

  it("SPREADING JOY - triggers on play and grants Ward to other characters", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [scroogeMcduckReformedEbenezer],
      play: [allyOne, allyTwo],
      inkwell: scroogeMcduckReformedEbenezer.cost,
      deck: 5,
    });

    // Allies should not have Ward before Scrooge is played
    expect(testEngine.hasKeyword(allyOne, "Ward")).toBe(false);
    expect(testEngine.hasKeyword(allyTwo, "Ward")).toBe(false);

    expect(
      testEngine.asPlayerOne().playCard(scroogeMcduckReformedEbenezer),
    ).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().getCardZone(scroogeMcduckReformedEbenezer)).toBe("play");

    // Resolve the SPREADING JOY triggered ability via bag
    if (testEngine.asPlayerOne().getBagCount() > 0) {
      expect(
        testEngine.asPlayerOne().resolveBag(testEngine.asPlayerOne().getBagEffects()[0]!.id),
      ).toBeSuccessfulCommand();
    }

    // Both allies should now have Ward
    expect(testEngine.hasKeyword(allyOne, "Ward")).toBe(true);
    expect(testEngine.hasKeyword(allyTwo, "Ward")).toBe(true);
    // Scrooge himself should NOT have Ward (only OTHER characters)
    expect(testEngine.hasKeyword(scroogeMcduckReformedEbenezer, "Ward")).toBe(false);
  });

  it("SPREADING JOY - does not grant Ward to opponent characters", () => {
    const opponentAlly = createMockCharacter({
      id: "scrooge-reformed-opponent-ally",
      name: "Opponent Ally",
      cost: 2,
    });

    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [scroogeMcduckReformedEbenezer],
        play: [allyOne],
        inkwell: scroogeMcduckReformedEbenezer.cost,
        deck: 5,
      },
      {
        play: [opponentAlly],
        deck: 2,
      },
    );

    expect(
      testEngine.asPlayerOne().playCard(scroogeMcduckReformedEbenezer),
    ).toBeSuccessfulCommand();

    // Resolve the SPREADING JOY triggered ability
    if (testEngine.asPlayerOne().getBagCount() > 0) {
      expect(
        testEngine.asPlayerOne().resolveBag(testEngine.asPlayerOne().getBagEffects()[0]!.id),
      ).toBeSuccessfulCommand();
    }

    // Opponent's character should not gain Ward
    expect(testEngine.hasKeyword(opponentAlly, "Ward")).toBe(false);
    // Player's ally should have Ward
    expect(testEngine.hasKeyword(allyOne, "Ward")).toBe(true);
  });
});
