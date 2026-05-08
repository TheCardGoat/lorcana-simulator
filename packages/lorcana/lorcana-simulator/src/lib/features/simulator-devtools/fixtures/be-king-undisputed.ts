import { arielOnHumanLegs, simbaProtectiveCub } from "@tcg/lorcana-cards/cards/001";
import { beKingUndisputed } from "@tcg/lorcana-cards/cards/009";
import { createFixture } from "./fixture-factory";

export const beKingUndisputedFixture = createFixture({
  id: "be-king-undisputed",
  name: "Be King Undisputed — opponent chooses banish",
  description:
    "Validate Be King Undisputed (set 9 reprint). P1 plays Be King; the opponent (P2) must choose one of THEIR OWN characters to banish. Confirm: (a) the target-selection prompt opens on P2's view, (b) only P2's characters appear as candidates (P1's ally must not leak in), and (c) selecting Simba Protective Cub sends it to P2's discard while Ariel stays in play.",
  skipPreGame: true,
  playerOne: {
    inkwell: beKingUndisputed.cost,
    hand: [beKingUndisputed],
    play: [{ card: arielOnHumanLegs, isDrying: false }],
    deck: 5,
  },
  playerTwo: {
    inkwell: 5,
    hand: [],
    play: [
      { card: simbaProtectiveCub, isDrying: false },
      { card: arielOnHumanLegs, isDrying: false },
    ],
    deck: 5,
  },
});
