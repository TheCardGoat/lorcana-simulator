import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { simbaProtectiveCub } from "../../001";
import { dumptruckKarnagesSecondMate } from "../characters";
import { walkThePlank } from "./118-walk-the-plank";

describe("Walk the Plank!", () => {
  it("grants your Pirate characters a temporary activated ability to banish a chosen damaged character", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [walkThePlank],
        inkwell: walkThePlank.cost,
        play: [dumptruckKarnagesSecondMate],
      },
      {
        play: [simbaProtectiveCub],
      },
    );

    expect(testEngine.asServer().manualSetDamage(simbaProtectiveCub, 1)).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().playCard(walkThePlank)).toBeSuccessfulCommand();
    expect(
      testEngine.asPlayerOne().activateAbility(dumptruckKarnagesSecondMate, {
        targets: [simbaProtectiveCub],
      }),
    ).toBeSuccessfulCommand();

    expect(testEngine.asPlayerTwo().getCardZone(simbaProtectiveCub)).toBe("discard");
  });
});
