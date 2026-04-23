import { heiheiBoatSnack } from "@tcg/lorcana-cards/cards/001";
import { peteBadGuy, theNokkWaterSpirit } from "@tcg/lorcana-cards/cards/002";
import { jafarAspiringRuler } from "@tcg/lorcana-cards/cards/007";
import { createFixture } from "../../fixture-factory.js";

export const bug22JafarAspiringRuler = createFixture({
  id: "bug-22-jafar-aspiring-ruler",
  name: "Bug 22 - Jafar, Aspiring Ruler",
  description:
    "Jafar in play with multiple opponent characters to choose from for the Challenger grant interaction.",
  playerOne: {
    play: [jafarAspiringRuler],
    hand: [heiheiBoatSnack],
    inkwell: 6,
    deck: [heiheiBoatSnack, heiheiBoatSnack, heiheiBoatSnack],
  },
  playerTwo: {
    play: [peteBadGuy, theNokkWaterSpirit, peteBadGuy],
    deck: [peteBadGuy, peteBadGuy, peteBadGuy],
  },
  seed: "bug-22-jafar-aspiring-ruler",
  skipPreGame: true,
});
