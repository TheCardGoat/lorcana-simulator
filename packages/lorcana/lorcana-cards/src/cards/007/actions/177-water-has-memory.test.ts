import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, PLAYER_TWO } from "@tcg/lorcana-engine/testing";
import { mickeyMouseTrueFriend, simbaProtectiveCub } from "../../001";
import { allIsFound } from "./178-all-is-found";
import { doubleTrouble } from "./202-double-trouble";
import { showMeMore } from "./082-show-me-more";
import { theReturnOfHercules } from "./118-the-return-of-hercules";
import { waterHasMemory } from "./177-water-has-memory";

describe("Water Has Memory", () => {
  it("reorders the chosen player's looked-at cards while leaving untouched cards in place", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [waterHasMemory],
        inkwell: waterHasMemory.cost,
        deck: [mickeyMouseTrueFriend, simbaProtectiveCub],
      },
      {
        deck: [doubleTrouble, allIsFound, theReturnOfHercules, showMeMore, mickeyMouseTrueFriend],
      },
    );

    expect(
      testEngine.asPlayerOne().playCardForPlayer(waterHasMemory, PLAYER_TWO),
    ).toBeSuccessfulCommand();
    expect(
      testEngine.asPlayerOne().resolveNextPending({
        destinations: [
          {
            zone: "deck-top",
            cards: [doubleTrouble],
          },
          {
            zone: "deck-bottom",
            cards: [allIsFound, theReturnOfHercules, showMeMore],
          },
        ],
      }),
    ).toBeSuccessfulCommand();

    expect(testEngine.getCardDefinitionIdsInZone("deck", PLAYER_TWO)).toEqual([
      mickeyMouseTrueFriend.id,
      doubleTrouble.id,
      allIsFound.id,
      theReturnOfHercules.id,
      showMeMore.id,
    ]);
  });
});
