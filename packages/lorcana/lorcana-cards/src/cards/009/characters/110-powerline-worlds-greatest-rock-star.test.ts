import { describe, expect, it } from "bun:test";
import {
  LorcanaMultiplayerTestEngine,
  createMockCharacter,
  createMockSong,
} from "@tcg/lorcana-engine/testing";
import { powerlineWorldsGreatestRockStar } from "./110-powerline-worlds-greatest-rock-star";

const singableSong = createMockSong({
  id: "powerline-sing-song",
  name: "Singable Song",
  cost: 3,
  text: "A cheap song for singing.",
  abilities: [],
});

// A song that qualifies for MASH-UP's play-for-free (cost <= 9)
const qualifyingSong = createMockSong({
  id: "powerline-qualifying-song",
  name: "Qualifying Song",
  cost: 5,
  text: "A qualifying song for MASH-UP.",
  abilities: [],
});

const deckFillerA = createMockCharacter({ id: "powerline-filler-a", name: "Filler A", cost: 1 });
const deckFillerB = createMockCharacter({ id: "powerline-filler-b", name: "Filler B", cost: 2 });
const deckFillerC = createMockCharacter({ id: "powerline-filler-c", name: "Filler C", cost: 3 });
const deckFillerD = createMockCharacter({ id: "powerline-filler-d", name: "Filler D", cost: 4 });

describe("Powerline - World's Greatest Rock Star", () => {
  // MASH-UP - "Once during your turn, whenever this character sings a song,
  // look at the top 4 cards of your deck. You may reveal a song card with cost 9 or less
  // and play it for free. Put the rest on the bottom of your deck in any order."

  it("MASH-UP - triggers scry when singing a song", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [singableSong],
      inkwell: singableSong.cost,
      deck: [deckFillerA, deckFillerB, deckFillerC, deckFillerD],
      play: [{ card: powerlineWorldsGreatestRockStar, isDrying: false }],
    });

    expect(
      testEngine.asPlayerOne().singSong(singableSong, powerlineWorldsGreatestRockStar),
    ).toBeSuccessfulCommand();

    // The sing trigger should create a bag for the scry effect
    expect(testEngine.asPlayerOne().getBagCount()).toBe(1);
  });

  it("MASH-UP - plays a qualifying song for free when resolving the scry bag", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [singableSong],
      inkwell: singableSong.cost,
      // qualifyingSong is at top of deck so it's in the looked-at 4 cards
      deck: [qualifyingSong, deckFillerA, deckFillerB, deckFillerC],
      play: [{ card: powerlineWorldsGreatestRockStar, isDrying: false }],
    });

    expect(
      testEngine.asPlayerOne().singSong(singableSong, powerlineWorldsGreatestRockStar),
    ).toBeSuccessfulCommand();

    expect(testEngine.asPlayerOne().getBagCount()).toBe(1);

    const bagId = testEngine.asPlayerOne().getBagEffects()[0]!.id;

    // Resolve the scry: play the qualifying song for free; put the rest on the bottom
    expect(
      testEngine.asPlayerOne().resolveBag(bagId, {
        destinations: [
          { zone: "play", cards: [qualifyingSong] },
          { zone: "deck-bottom", cards: [deckFillerA, deckFillerB, deckFillerC] },
        ],
      }),
    ).toBeSuccessfulCommand();

    // The qualifying song was played for free as an action card, so it ends up in discard
    expect(testEngine.getCardDefinitionIdsInZone("discard", "player_one")).toContain(
      qualifyingSong.id,
    );
  });
});
