import { robinHoodSharpshooter } from "@tcg/lorcana-cards/cards/005";
import { peteBadGuy } from "@tcg/lorcana-cards/cards/002";
import {
  chiefTuiRespectedLeader,
  donaldDuckStruttingHisStuff,
  friendsOnTheOtherSide,
  grabYourSword,
  grammaTalaStoryteller,
  mickeyMouseArtfulRogue,
} from "@tcg/lorcana-cards/cards/001";
import { createFixture } from "../../fixture-factory.js";

export const bug34RobinHoodSharpshooterFixture = createFixture({
  id: "bug-34-robin-hood-sharpshooter",
  name: "Bug 34 - Robin Hood Sharpshooter / Steel Boost",
  description:
    "Robin Hood - Sharpshooter in hand with ink to play and multiple opposing targets so the 2-target selection UI can be exercised.",
  playerOne: {
    play: [robinHoodSharpshooter],
    inkwell: 7,
    deck: [
      mickeyMouseArtfulRogue,
      donaldDuckStruttingHisStuff,
      grammaTalaStoryteller,
      friendsOnTheOtherSide,
      grabYourSword,
    ],
  },
  playerTwo: {
    play: [peteBadGuy, chiefTuiRespectedLeader, grammaTalaStoryteller],
    inkwell: 5,
    deck: [donaldDuckStruttingHisStuff],
  },
  seed: "bug-34-robin-hood-sharpshooter",
  skipPreGame: true,
});
