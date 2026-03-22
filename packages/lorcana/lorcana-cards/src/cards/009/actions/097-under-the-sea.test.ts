import { describe, expect, it } from "bun:test";
import {
  LorcanaMultiplayerTestEngine,
  PLAYER_TWO,
  createMockCharacter,
} from "@tcg/lorcana-engine/testing";
import { simbaProtectiveCub, tinkerBellPeterPansAlly } from "../../001";
import { underTheSea } from "./097-under-the-sea";

const weakCharacterA = createMockCharacter({
  id: "under-sea-weak-a",
  name: "Weak Character A",
  cost: 2,
  strength: 1,
  willpower: 2,
  lore: 1,
});

const weakCharacterB = createMockCharacter({
  id: "under-sea-weak-b",
  name: "Weak Character B",
  cost: 2,
  strength: 2,
  willpower: 3,
  lore: 1,
});

describe("Under the Sea", () => {
  it("puts opposing characters with 2 strength or less on the bottom of their deck", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [underTheSea],
        inkwell: underTheSea.cost,
      },
      {
        play: [simbaProtectiveCub, tinkerBellPeterPansAlly],
      },
    );

    expect(testEngine.asPlayerOne().playCard(underTheSea)).toBeSuccessfulCommand();
    expect(testEngine.asPlayerTwo().getCardZone(simbaProtectiveCub)).toBe("deck");
    expect(testEngine.asPlayerTwo().getCardZone(tinkerBellPeterPansAlly)).toBe("play");
  });

  it("does not affect characters with strength greater than 2", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [underTheSea],
        inkwell: underTheSea.cost,
      },
      {
        play: [tinkerBellPeterPansAlly],
      },
    );

    expect(testEngine.asPlayerOne().playCard(underTheSea)).toBeSuccessfulCommand();
    expect(testEngine.asPlayerTwo().getCardZone(tinkerBellPeterPansAlly)).toBe("play");
  });

  it("suspends for opponent ordering when multiple qualifying characters are present", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [underTheSea],
        inkwell: underTheSea.cost,
      },
      {
        play: [weakCharacterA, weakCharacterB],
      },
    );

    expect(testEngine.asPlayerOne().playCard(underTheSea)).toBeSuccessfulCommand();

    // Both qualify, ordering should be suspended until the opponent (owner) provides an order
    const weakAId = testEngine.findCardInstanceId(weakCharacterA, "play", PLAYER_TWO);
    const weakBId = testEngine.findCardInstanceId(weakCharacterB, "play", PLAYER_TWO);

    // The opponent resolves the ordering: A goes to bottom first, then B (so B ends up on top of the two)
    expect(
      testEngine.asPlayerTwo().resolveNextPending({ targets: [weakCharacterA, weakCharacterB] }),
    ).toBeSuccessfulCommand();

    expect(testEngine.asPlayerTwo().getCardZone(weakCharacterA)).toBe("deck");
    expect(testEngine.asPlayerTwo().getCardZone(weakCharacterB)).toBe("deck");
    // Verify both are no longer in play
    expect(weakAId).toBeDefined();
    expect(weakBId).toBeDefined();
  });
});
