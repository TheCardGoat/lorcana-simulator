import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { nanaDarlingFamilyPet } from "./017-nana-darling-family-pet";
import { cinderellaStouthearted } from "./177-cinderella-stouthearted";
import { gastonBaritoneBully } from "./008-gaston-baritone-bully";

describe("Nana - Darling Family Pet", () => {
  it("NURSEMAID - Whenever you play a Floodborn character, remove all damage from chosen character", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      play: [
        { card: nanaDarlingFamilyPet, damage: 2 },
        { card: gastonBaritoneBully, damage: 3 },
      ],
      hand: [
        { card: cinderellaStouthearted }, // Floodborn
      ],
      inkwell: Array.from({ length: 10 }).map(() => ({ card: gastonBaritoneBully })), // Lots of ink
    });

    const nanaId = testEngine.findCardInstanceId(nanaDarlingFamilyPet, "play");
    const gastonId = testEngine.findCardInstanceId(gastonBaritoneBully, "play");
    const cinderellaId = testEngine.findCardInstanceId(cinderellaStouthearted, "hand");

    // Play Floodborn
    testEngine.asPlayerOne().playCard(cinderellaId);

    // Should have trigger
    testEngine.asPlayerOne().resolveNextBag();

    // Target a character to heal (Gaston)
    let pendingChoice = testEngine.asPlayerOne().getPendingChoice();
    if (pendingChoice) {
      testEngine.asPlayerOne().resolveNextPending({ targets: [gastonId] });
    }

    // Gaston should be healed completely
    const gaston = testEngine.asServer().getCard(gastonId);
    expect(gaston.damage).toBe(0);

    // Nana should still have 2 damage
    const nana = testEngine.asServer().getCard(nanaId);
    expect(nana.damage).toBe(2);
  });
});
