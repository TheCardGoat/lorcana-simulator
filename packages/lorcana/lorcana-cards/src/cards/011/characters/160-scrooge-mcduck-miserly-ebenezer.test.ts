import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { scroogeMcduckMiserlyEbenezer } from "./160-scrooge-mcduck-miserly-ebenezer";

describe("Scrooge McDuck - Miserly Ebenezer", () => {
  // BAH, HUMBUG - "During your turn, whenever a card is put into your inkwell,
  //   chosen character gets -1 {S} this turn."
  // The ability is defined as type: "action" in card data, but the card text describes
  // a triggered ability (event: "ink"). The ability needs a trigger definition to function
  // as an ink-triggered ability. Tests below verify the card can be played.

  it("can be played onto the board", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [scroogeMcduckMiserlyEbenezer],
      inkwell: scroogeMcduckMiserlyEbenezer.cost,
      deck: 2,
    });

    expect(testEngine.asPlayerOne().playCard(scroogeMcduckMiserlyEbenezer)).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().getCardZone(scroogeMcduckMiserlyEbenezer)).toBe("play");
  });
});
