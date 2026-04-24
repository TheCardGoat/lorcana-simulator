import { mulanEliteArcher } from "@tcg/lorcana-cards/cards/004";
import { peteBadGuy } from "@tcg/lorcana-cards/cards/002";
import {
  chiefTuiRespectedLeader,
  donaldDuckStruttingHisStuff,
  heiheiBoatSnack,
} from "@tcg/lorcana-cards/cards/001";
import { createFixture } from "../../fixture-factory.js";
import { donaldDuckAlongForTheRide } from "@tcg/lorcana-cards/cards/011";

export const bug05MulanEliteArcher = createFixture({
  id: "bug-05-mulan-elite-archer",
  name: "Bug 05 - Mulan Elite Archer Triple Shot",
  description:
    "Mulan - Elite Archer ready in play with three or more opposing characters. When Mulan challenges and deals damage, Triple Shot should allow choosing up to 2 other characters to take the same damage.",
  playerOne: {
    play: [mulanEliteArcher],
    hand: [heiheiBoatSnack],
    inkwell: 6,
    deck: 10,
  },
  playerTwo: {
    play: [
      { card: peteBadGuy, exerted: true },
      { card: chiefTuiRespectedLeader, exerted: true },
      { card: donaldDuckAlongForTheRide, exerted: true },
    ],
    deck: 10,
  },
  seed: "bug-05-mulan-elite-archer",
  skipPreGame: true,
});
