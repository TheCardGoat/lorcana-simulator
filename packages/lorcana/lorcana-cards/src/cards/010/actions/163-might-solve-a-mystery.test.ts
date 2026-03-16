import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, PLAYER_ONE } from "@tcg/lorcana-engine/testing";
import { goofyKnightForADay } from "../../002";
import { duckburgFunsosFunzone } from "../locations/034-duckburg-funsos-funzone";
import { fairyGodmothersWand } from "../items/168-fairy-godmothers-wand";
import { mowgliManCub } from "../characters/019-mowgli-man-cub";
import { sleepyHollowTheBridge } from "../locations/136-sleepy-hollow-the-bridge";
import { mightSolveAMystery } from "./163-might-solve-a-mystery";

describe("Might Solve a Mystery", () => {
  it("puts up to one character and one item into hand and the rest on the bottom", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [mightSolveAMystery],
      inkwell: mightSolveAMystery.cost,
      deck: [
        sleepyHollowTheBridge,
        goofyKnightForADay,
        fairyGodmothersWand,
        mowgliManCub,
        duckburgFunsosFunzone,
      ],
    });

    const playResult = testEngine.asPlayerOne().playCardWithDestinations(
      mightSolveAMystery,
      {
        zone: "hand",
        cards: mowgliManCub,
      },
      {
        zone: "hand",
        cards: fairyGodmothersWand,
      },
      {
        zone: "deck-bottom",
        cards: [duckburgFunsosFunzone, goofyKnightForADay],
      },
    );

    expect(playResult).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().getCardZone(mowgliManCub)).toBe("hand");
    expect(testEngine.asPlayerOne().getCardZone(fairyGodmothersWand)).toBe("hand");

    const deckIds = testEngine.getCardDefinitionIdsInZone("deck", PLAYER_ONE);
    expect(deckIds.slice(0, 2)).toEqual([duckburgFunsosFunzone.id, goofyKnightForADay.id]);
  });
});
