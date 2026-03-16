import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { mickeyMouseTrueFriend, simbaProtectiveCub } from "../../001";
import { theReturnOfHercules } from "./118-the-return-of-hercules";

describe("The Return of Hercules", () => {
  it("can resolve free plays for both players in order", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [theReturnOfHercules, simbaProtectiveCub],
        inkwell: theReturnOfHercules.cost,
      },
      {
        hand: [mickeyMouseTrueFriend],
      },
    );

    const simbaId = testEngine.findCardInstanceId(simbaProtectiveCub, "hand", "p1");
    const mickeyId = testEngine.findCardInstanceId(mickeyMouseTrueFriend, "hand", "p2");

    expect(testEngine.asPlayerOne().playCard(theReturnOfHercules)).toBeSuccessfulCommand();
    expect(
      testEngine.asPlayerOne().resolveNextPending({
        resolveOptional: true,
        targets: [simbaId],
      }),
    ).toBeSuccessfulCommand();
    expect(
      testEngine.asPlayerTwo().resolveNextPending({
        resolveOptional: true,
        targets: [mickeyId],
      }),
    ).toBeSuccessfulCommand();

    expect(testEngine.asPlayerOne().getCardZone(simbaProtectiveCub)).toBe("play");
    expect(testEngine.asPlayerTwo().getCardZone(mickeyMouseTrueFriend)).toBe("play");
  });
});
