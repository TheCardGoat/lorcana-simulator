import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { princeNaveenPennilessRoyal } from "../characters";
import { croquetMallet } from "./066-croquet-mallet";

describe("Croquet Mallet", () => {
  it("banishes itself to give the chosen character Rush this turn", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      play: [croquetMallet, princeNaveenPennilessRoyal],
    });

    const result = testEngine.asPlayerOne().activateAbility(croquetMallet, {
      targets: [princeNaveenPennilessRoyal],
    });

    expect(result).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().getCard(princeNaveenPennilessRoyal).hasRush).toBe(true);
    expect(testEngine.asPlayerOne().getCardZone(croquetMallet)).toBe("discard");
  });
});
