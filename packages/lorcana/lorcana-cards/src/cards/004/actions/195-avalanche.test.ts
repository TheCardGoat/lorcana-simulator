import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { arielOnHumanLegs, simbaProtectiveCub } from "../../001";
import { duckburgFunsosFunzone } from "../../010/locations/034-duckburg-funsos-funzone";
import { avalanche } from "./195-avalanche";

describe("Avalanche", () => {
  it("deals 1 damage to each opposing character and can banish a chosen location", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [avalanche],
        inkwell: avalanche.cost,
      },
      {
        play: [duckburgFunsosFunzone, simbaProtectiveCub, arielOnHumanLegs],
      },
    );

    expect(
      testEngine.asPlayerOne().playCard(avalanche, {
        resolveOptional: true,
        targets: [duckburgFunsosFunzone],
      }).success,
    ).toBe(true);

    expect(testEngine.asPlayerTwo().getCardZone(duckburgFunsosFunzone)).toBe("discard");
    expect(testEngine.asPlayerTwo().getDamage(simbaProtectiveCub)).toBe(1);
    expect(testEngine.asPlayerTwo().getDamage(arielOnHumanLegs)).toBe(1);
  });
});
