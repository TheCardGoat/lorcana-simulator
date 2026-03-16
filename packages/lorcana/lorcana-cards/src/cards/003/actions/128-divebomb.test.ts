import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { arielOnHumanLegs } from "../../001";
import { mauiSoaringDemigod } from "../characters";
import { divebomb } from "./128-divebomb";

describe("Divebomb", () => {
  it("banishes one of your reckless characters to banish a weaker chosen character", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [divebomb],
        inkwell: divebomb.cost,
        play: [mauiSoaringDemigod],
      },
      {
        play: [arielOnHumanLegs],
      },
    );

    expect(
      testEngine.asPlayerOne().playCard(divebomb, {
        targets: [mauiSoaringDemigod, arielOnHumanLegs],
      }),
    ).toBeSuccessfulCommand();

    expect(testEngine.asPlayerOne().getCardZone(mauiSoaringDemigod)).toBe("discard");
    expect(testEngine.asPlayerTwo().getCardZone(arielOnHumanLegs)).toBe("discard");
  });
});
