import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, createMockCharacter } from "@tcg/lorcana-engine/testing";
import { cinderellaResourcefulTraveler } from "./155-cinderella-resourceful-traveler";

const anotherCharacter = createMockCharacter({
  id: "cinderella-ally",
  name: "Ally",
  cost: 1,
  strength: 1,
  willpower: 1,
});

describe("Cinderella - Resourceful Traveler", () => {
  it("THIS AND THAT - puts top card of deck into inkwell when questing after playing another character", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [anotherCharacter],
        play: [cinderellaResourcefulTraveler],
        inkwell: 1,
        deck: 5,
      },
      {
        deck: 5,
      },
    );

    expect(testEngine.asPlayerOne().playCard(anotherCharacter)).toBeSuccessfulCommand();

    const inkwellBefore = testEngine.asPlayerOne().getZonesCardCount().inkwell;
    const deckBefore = testEngine.asPlayerOne().getZonesCardCount().deck;

    expect(testEngine.asPlayerOne().quest(cinderellaResourcefulTraveler)).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().getBagCount()).toBe(1);
    expect(
      testEngine.asPlayerOne().resolvePendingByCard(cinderellaResourcefulTraveler, {
        resolveOptional: true,
      }),
    ).toBeSuccessfulCommand();

    expect(testEngine.asPlayerOne().getZonesCardCount().inkwell).toBe(inkwellBefore + 1);
    expect(testEngine.asPlayerOne().getZonesCardCount().deck).toBe(deckBefore - 1);
  });
});
