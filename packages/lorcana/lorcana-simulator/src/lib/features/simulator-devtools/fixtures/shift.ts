import { createFixture } from "./fixture-factory";
import {
  genieOnTheJob,
  geniePowersUnleashed,
  hakunaMatata,
  mickeyMouseTrueFriend,
  reflection,
} from "@tcg/lorcana-cards/cards/001";
import { moanaDeterminedExplorer } from "@tcg/lorcana-cards/cards/005";
import { chipFriendIndeed, chipNDaleRecoveryRangers } from "@tcg/lorcana-cards/cards/006";
import { daleBumbler } from "@tcg/lorcana-cards/cards/008";
import { balooCarefreeBear, balooLaidbackBear } from "@tcg/lorcana-cards/cards/010";

export const shiftFixture = createFixture({
  id: "shift",
  name: "Shift",
  description:
    "Testing shift UI: universal shift, named shift (single name), and named shift (multiple names)",
  skipPreGame: true,
  playerOne: {
    inkwell: 20,
    hand: [balooCarefreeBear, geniePowersUnleashed, chipNDaleRecoveryRangers],
    play: [
      balooLaidbackBear,
      genieOnTheJob,
      chipFriendIndeed,
      daleBumbler,
      moanaDeterminedExplorer,
    ],
    deck: [reflection, hakunaMatata],
  },
  playerTwo: {
    hand: [mickeyMouseTrueFriend, reflection, hakunaMatata],
    play: [],
    deck: [hakunaMatata, reflection],
  },
});
