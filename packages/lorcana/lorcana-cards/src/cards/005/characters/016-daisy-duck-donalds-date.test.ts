import { describe, expect, it } from "bun:test";
import {
  LorcanaMultiplayerTestEngine,
  PLAYER_TWO,
  createMockAction,
  createMockCharacter,
} from "@tcg/lorcana-engine/testing";
import { daisyDuckDonaldsDate } from "./016-daisy-duck-donalds-date";

const topCharacter = createMockCharacter({
  id: "daisy-duck-donalds-date-top-character",
  name: "Top Character",
  cost: 2,
});

const bottomAction = createMockAction({
  id: "daisy-duck-donalds-date-bottom-action",
  name: "Bottom Action",
  cost: 1,
  text: "A test action.",
});

const topAction = createMockAction({
  id: "daisy-duck-donalds-date-top-action",
  name: "Top Action",
  cost: 1,
  text: "Another test action.",
});

describe("Daisy Duck - Donald's Date", () => {
  it("lets the opponent put a revealed character card into their hand when Daisy quests", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        play: [daisyDuckDonaldsDate],
        deck: 5,
      },
      {
        deck: [topCharacter],
      },
    );

    expect(testEngine.asPlayerOne().quest(daisyDuckDonaldsDate)).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().getBagCount()).toBe(1);

    expect(testEngine.asPlayerOne().resolveNextBag()).toBeSuccessfulCommand();
    expect(
      testEngine.asPlayerTwo().resolveNextPending({
        choiceIndex: 0,
      }),
    ).toBeSuccessfulCommand();

    expect(testEngine.asPlayerTwo().getCardZone(topCharacter)).toBe("hand");
  });

  it("puts a revealed non-character card on the bottom of the opponent's deck when Daisy quests", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        play: [daisyDuckDonaldsDate],
        deck: 5,
      },
      {
        deck: [topAction, bottomAction],
      },
    );

    expect(testEngine.asPlayerOne().quest(daisyDuckDonaldsDate)).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().getBagCount()).toBe(1);

    expect(testEngine.asPlayerOne().resolveNextBag()).toBeSuccessfulCommand();

    expect(testEngine.asPlayerTwo().getCardZone(topAction)).toBe("deck");
    expect(testEngine.asPlayerTwo().getCardZone(bottomAction)).toBe("deck");
    expect(testEngine.getCardDefinitionIdsInZone("deck", PLAYER_TWO).slice(0, 2)).toEqual([
      topAction.id,
      bottomAction.id,
    ]);
  });
});
