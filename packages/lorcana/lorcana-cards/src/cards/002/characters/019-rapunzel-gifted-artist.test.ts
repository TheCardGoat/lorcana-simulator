import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { rapunzelGiftedArtist } from "./019-rapunzel-gifted-artist";
import { gastonBaritoneBully } from "./008-gaston-baritone-bully";
import { magicGoldenFlower } from "../../001/items/169-magic-golden-flower";

describe("Rapunzel - Gifted Artist", () => {
  it("LET YOUR POWER SHINE - Whenever you remove 1 or more damage from one of your characters, you may draw a card.", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      play: [
        { card: rapunzelGiftedArtist },
        { card: gastonBaritoneBully, damage: 3 },
        { card: magicGoldenFlower },
      ],
      deck: Array.from({ length: 10 }).map(() => ({ card: gastonBaritoneBully })),
    });

    const rapunzelId = testEngine.findCardInstanceId(rapunzelGiftedArtist, "play");
    const gastonId = testEngine.findCardInstanceId(gastonBaritoneBully, "play");
    const flowerId = testEngine.findCardInstanceId(magicGoldenFlower, "play");

    const handSizeBefore = testEngine.getCardInstanceIdsInZone("hand", "player_one").length;

    // Use Magic Golden Flower to heal Gaston
    testEngine.asPlayerOne().activateAbility(flowerId, { abilityIndex: 0, targets: [gastonId] });

    // Ensure it was healed
    expect(testEngine.asServer().getCard(gastonId).damage).toBe(0);

    // Resolve triggers (Rapunzel's draw)
    testEngine.asPlayerOne().resolveNextBag();

    // It's optional, say yes
    let pendingChoice = testEngine.asPlayerOne().getPendingChoice();
    if (pendingChoice) {
      testEngine.asPlayerOne().resolveNextPending({ resolveOptional: true });
    }

    // Should have drawn a card
    const handSizeAfter = testEngine.getCardInstanceIdsInZone("hand", "player_one").length;
    expect(handSizeAfter).toBe(handSizeBefore + 1);
  });
});
