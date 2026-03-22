import { describe, expect, it } from "bun:test";
import {
  LorcanaMultiplayerTestEngine,
  createMockCharacter,
  createMockLocation,
} from "@tcg/lorcana-engine/testing";
import { goofySetForAdventure } from "./074-goofy-set-for-adventure";

const vacationBuddy = createMockCharacter({
  id: "goofy-set-for-adventure-vacation-buddy",
  name: "Vacation Buddy",
  cost: 2,
  strength: 3,
  willpower: 3,
});

const vacationSpot = createMockLocation({
  id: "goofy-set-for-adventure-vacation-spot",
  name: "Vacation Spot",
  cost: 2,
  moveCost: 1,
  lore: 1,
  willpower: 6,
});

describe("Goofy - Set for Adventure", () => {
  it("moves one of your other characters to the same location for free and draws a card", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      play: [goofySetForAdventure, vacationBuddy, vacationSpot],
      inkwell: 1,
      deck: 1,
    });

    expect(
      testEngine.asPlayerOne().moveCharacterToLocation(goofySetForAdventure, vacationSpot),
    ).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().getBagCount()).toBe(1);

    expect(
      testEngine.asPlayerOne().resolveBag(testEngine.asPlayerOne().getBagEffects()[0]!.id),
    ).toBeSuccessfulCommand();
    expect(
      testEngine.asPlayerOne().resolveNextPending({
        resolveOptional: true,
        targets: [vacationBuddy],
      }),
    ).toBeSuccessfulCommand();

    expect(testEngine.asPlayerOne()).toBeAtLocation({
      card: vacationBuddy,
      location: vacationSpot,
    });
    expect(testEngine.asPlayerOne()).toHaveZoneCounts({ hand: 1, deck: 0 });
  });
});
