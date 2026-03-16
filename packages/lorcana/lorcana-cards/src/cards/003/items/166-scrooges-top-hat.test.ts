import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { wildcatsWrench } from "./031-wildcats-wrench";
import { scroogesTopHat } from "./166-scrooges-top-hat";

describe("Scrooge's Top Hat", () => {
  it("reduces the cost of the next item you play this turn by 1", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [wildcatsWrench],
      inkwell: 1,
      play: [scroogesTopHat],
    });

    expect(testEngine.asPlayerOne().canPlayCard(wildcatsWrench)).toBe(false);

    const result = testEngine.asPlayerOne().activateAbility(scroogesTopHat, {
      ability: "BUSINESS EXPERTISE",
    });

    expect(result).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().canPlayCard(wildcatsWrench)).toBe(true);
    expect(testEngine.asPlayerOne().playCard(wildcatsWrench)).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().isExerted(scroogesTopHat)).toBe(true);
    expect(testEngine.asPlayerOne().getCardZone(wildcatsWrench)).toBe("play");
  });
});
