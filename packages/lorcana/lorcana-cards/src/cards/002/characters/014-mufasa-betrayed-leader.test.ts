import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { mufasaBetrayedLeader } from "./014-mufasa-betrayed-leader";
import { gastonBaritoneBully } from "./008-gaston-baritone-bully";
import { bibbidiBobbidiBoo } from "../../002/actions/096-bibbidi-bobbidi-boo";

describe("Mufasa - Betrayed Leader", () => {
  it("THE SUN WILL SET - When banished, reveals top card. If character, play for free exerted.", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      play: [{ card: mufasaBetrayedLeader }],
      deck: [
        { card: gastonBaritoneBully }, // Top card is character
      ],
    });

    const mufasaId = testEngine.findCardInstanceId(mufasaBetrayedLeader, "play");
    const gastonId = testEngine.findCardInstanceId(gastonBaritoneBully, "deck");

    // Banish Mufasa via damage
    testEngine.asServer().manualSetDamage(mufasaId, 10);
    testEngine.asServer().passTurn();

    // Resolve triggers
    testEngine.asPlayerOne().resolveNextBag();

    // Since it's a character, we should be prompted if we want to play it (optional effect)
    let pendingChoice = testEngine.asPlayerOne().getPendingChoice();
    console.log("Pending choice:", pendingChoice);
    if (pendingChoice) {
      testEngine.asPlayerOne().resolveNextPending({ resolveOptional: true });
    }

    // Gaston should be in play and exerted
    const gastonZone = testEngine.asServer().getState().ctx.zones.private.cardIndex[
      gastonId
    ]?.zoneKey;
    expect(gastonZone?.startsWith("play")).toBe(true);
    const gaston = testEngine.asServer().getCard(gastonId);
    expect(gaston.exerted).toBe(true);
  });

  it("THE SUN WILL SET - When banished, reveals top card. If NOT character, put on top.", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      play: [{ card: mufasaBetrayedLeader }],
      deck: [
        { card: bibbidiBobbidiBoo }, // Top card is action
      ],
    });

    const mufasaId = testEngine.findCardInstanceId(mufasaBetrayedLeader, "play");
    const actionId = testEngine.findCardInstanceId(bibbidiBobbidiBoo, "deck");

    // Banish Mufasa via damage
    testEngine.asServer().manualSetDamage(mufasaId, 10);
    testEngine.asServer().passTurn();

    // Resolve triggers
    testEngine.asPlayerOne().resolveNextBag();

    // Should not be prompted to play, just puts it back on top.
    // Wait, the "reveal-top-card" actually moves it to "limbo" or keeps in deck?
    // Usually it stays in deck or limbo, then "put-on-top" moves it back to deck.
    const actionZone = testEngine.asServer().getState().ctx.zones.private.cardIndex[
      actionId
    ]?.zoneKey;
    expect(actionZone?.startsWith("deck")).toBe(true);
  });
});
