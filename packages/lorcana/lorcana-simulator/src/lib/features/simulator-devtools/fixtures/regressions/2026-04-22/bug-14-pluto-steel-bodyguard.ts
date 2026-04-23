import { belleStrangeButSpecial, heiheiBoatSnack } from "@tcg/lorcana-cards/cards/001";
import { peteBadGuy } from "@tcg/lorcana-cards/cards/002";
import { plutoSteelChampion } from "@tcg/lorcana-cards/cards/010";
import { createFixture } from "../../fixture-factory.js";

// NOTE: "Pluto - Steel Bodyguard" does not exist in the repository.
// Substituted with the closest printing: "Pluto - Steel Champion" (Set 010).
export const bug14PlutoSteelBodyguard = createFixture({
  id: "bug-14-pluto-steel-bodyguard",
  name: "Bug 14 - Pluto, Steel Bodyguard (substituted with Steel Champion)",
  description:
    "Card 'Pluto - Steel Bodyguard' was not found in the repository; using Pluto - Steel Champion as the closest available printing to exercise the Steel-Pluto archetype bug scenario.",
  playerOne: {
    play: [plutoSteelChampion, belleStrangeButSpecial],
    hand: [heiheiBoatSnack],
    inkwell: 8,
    deck: [heiheiBoatSnack, heiheiBoatSnack],
  },
  playerTwo: {
    play: [peteBadGuy],
    deck: [peteBadGuy, peteBadGuy],
  },
  seed: "bug-14-pluto-steel-bodyguard",
  skipPreGame: true,
});
