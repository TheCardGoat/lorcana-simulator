import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, PLAYER_TWO } from "../../../testing";
import {
  chiefTuiRespectedLeader,
  heiheiBoatSnack,
  liloMakingAWish,
  moanaOfMotunui,
  mickeyMouseTrueFriend,
  simbaProtectiveCub,
  tinkerBellPeterPansAlly,
} from "../../../../../lorcana-cards/src/cards/001";
import { reflection } from "../../../../../lorcana-cards/src/cards/001/actions/065-reflection";
import { soMuchToGive } from "../../../../../lorcana-cards/src/cards/007/actions/038-so-much-to-give";
import { waterHasMemory } from "../../../../../lorcana-cards/src/cards/007/actions/177-water-has-memory";
import { allIsFound } from "../../../../../lorcana-cards/src/cards/007/actions/178-all-is-found";
import { doubleTrouble } from "../../../../../lorcana-cards/src/cards/007/actions/202-double-trouble";
import { showMeMore } from "../../../../../lorcana-cards/src/cards/007/actions/082-show-me-more";

describe("scry ordering", () => {
  it("preserves the selected top-card order while keeping untouched cards in place", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [reflection],
        inkwell: reflection.cost,
        deck: [
          liloMakingAWish,
          moanaOfMotunui,
          chiefTuiRespectedLeader,
          heiheiBoatSnack,
          mickeyMouseTrueFriend,
        ],
      },
      {
        deck: [simbaProtectiveCub, tinkerBellPeterPansAlly],
      },
    );

    expect(
      testEngine.asPlayerOne().playCardWithDestinations(reflection, {
        zone: "deck-top",
        cards: [chiefTuiRespectedLeader, liloMakingAWish, moanaOfMotunui],
      }),
    ).toBeSuccessfulCommand();

    expect(testEngine.getCardDefinitionIdsInZone("deck", "player_one")).toEqual([
      heiheiBoatSnack.id,
      mickeyMouseTrueFriend.id,
      chiefTuiRespectedLeader.id,
      liloMakingAWish.id,
      moanaOfMotunui.id,
    ]);
  });

  it("keeps the chosen player's untouched card ahead of the reordered looked-at cards", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [waterHasMemory],
        inkwell: waterHasMemory.cost,
        deck: [mickeyMouseTrueFriend, simbaProtectiveCub],
      },
      {
        deck: [doubleTrouble, allIsFound, showMeMore, soMuchToGive, tinkerBellPeterPansAlly],
      },
    );

    expect(
      testEngine.asPlayerOne().playCardForPlayer(waterHasMemory, PLAYER_TWO),
    ).toBeSuccessfulCommand();
    expect(
      testEngine.asPlayerOne().resolveNextPending({
        destinations: [
          { zone: "deck-top", cards: [doubleTrouble] },
          { zone: "deck-bottom", cards: [allIsFound, showMeMore, soMuchToGive] },
        ],
      }),
    ).toBeSuccessfulCommand();

    expect(testEngine.getCardDefinitionIdsInZone("deck", PLAYER_TWO)).toEqual([
      tinkerBellPeterPansAlly.id,
      doubleTrouble.id,
      allIsFound.id,
      showMeMore.id,
      soMuchToGive.id,
    ]);
  });
});
