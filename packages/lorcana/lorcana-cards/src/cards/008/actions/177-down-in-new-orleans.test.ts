import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, PLAYER_ONE } from "@tcg/lorcana-engine/testing";
import { goofyKnightForADay } from "../../002";
import { duckburgFunsosFunzone } from "../../010/locations/034-duckburg-funsos-funzone";
import { fairyGodmothersWand } from "../../010/items/168-fairy-godmothers-wand";
import { downInNewOrleans } from "./177-down-in-new-orleans";
import { lightTheFuse } from "./149-light-the-fuse";
import { wrongLever } from "./116-wrong-lever";
import { desperatePlan } from "./201-desperate-plan";

describe("Down in New Orleans", () => {
  it("plays one eligible card for free and puts the rest on the bottom in the chosen order", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [downInNewOrleans],
      inkwell: downInNewOrleans.cost,
      deck: [goofyKnightForADay, fairyGodmothersWand, duckburgFunsosFunzone],
    });

    expect(
      testEngine
        .asPlayerOne()
        .playCardWithDestinations(
          downInNewOrleans,
          { zone: "play", cards: duckburgFunsosFunzone },
          { zone: "deck-bottom", cards: [fairyGodmothersWand, goofyKnightForADay] },
        ).success,
    ).toBe(true);

    expect(testEngine.asPlayerOne().getCardZone(duckburgFunsosFunzone)).toBe("play");
    expect(testEngine.getCardDefinitionIdsInZone("deck", PLAYER_ONE)).toEqual([
      fairyGodmothersWand.id,
      goofyKnightForADay.id,
    ]);
  });

  it("keeps all looked-at cards on the bottom when none can be played", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [downInNewOrleans],
      inkwell: downInNewOrleans.cost,
      deck: [lightTheFuse, wrongLever, desperatePlan],
    });

    expect(
      testEngine.asPlayerOne().playCardWithDestinations(downInNewOrleans, {
        zone: "deck-bottom",
        cards: [desperatePlan, wrongLever, lightTheFuse],
      }).success,
    ).toBe(true);

    expect(testEngine.getCardDefinitionIdsInZone("deck", PLAYER_ONE)).toEqual([
      desperatePlan.id,
      wrongLever.id,
      lightTheFuse.id,
    ]);
  });
});
