import { desperatePlan } from "@tcg/lorcana-cards/cards/008";
import { chiefTuiRespectedLeader } from "@tcg/lorcana-cards/cards/001";
import { peteBadGuy } from "@tcg/lorcana-cards/cards/002";
import { heiheiBoatSnack } from "@tcg/lorcana-cards/cards/001";
import { createFixture } from "../../fixture-factory.js";

export const bug66DesperatePlanDiscardStep = createFixture({
  id: "bug-66-desperate-plan-discard-step",
  name: "Bug 66 - Desperate Plan discard chooser",
  description:
    "P1 has Desperate Plan in hand plus 4 other cards in hand to discard from, and 1 ink available. Bug: the discard-then-draw step UI doesn't render a discard chooser, blocking resolution. Correct behavior: play Desperate Plan, the discard chooser appears letting the player select any number of cards from hand to discard, then the player draws a card for each discarded card.",
  playerOne: {
    play: [],
    hand: [desperatePlan, chiefTuiRespectedLeader, peteBadGuy, heiheiBoatSnack, heiheiBoatSnack],
    inkwell: 1,
    deck: 10,
    lore: 0,
  },
  playerTwo: {
    play: [],
    deck: 10,
    lore: 0,
  },
  seed: "bug-66-desperate-plan-discard-step",
  skipPreGame: true,
});
