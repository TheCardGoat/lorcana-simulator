import { createFixture } from "./fixture-factory.js";
import type { LorcanaSimulatorFixture } from "@/features/simulator/model/contracts.js";
import {
  mickeyMouseBraveLittleTailor,
  rapunzelGiftedWithHealing,
  dinglehopper,
  shieldOfVirtue,
  goofyMusketeer,
  tinkerBellPeterPansAlly,
  mauiHeroToAll,
  bePrepared,
  aladdinStreetRat,
  princePhillipDragonslayer,
  maleficentSorceress,
} from "./fixture-cards.js";

export const cardStatesFixture: LorcanaSimulatorFixture = createFixture({
  id: "card-states",
  name: "Card States Demo",
  description: "Board demonstrating various card states: ready, exerted, damaged, etc.",
  playerOne: {
    deck: 40,
    discard: [],
    hand: [mickeyMouseBraveLittleTailor, rapunzelGiftedWithHealing],
    inkwell: 4,
    lore: 8,
    play: [
      // Ready characters
      goofyMusketeer,
      tinkerBellPeterPansAlly,
      // Items
      dinglehopper,
      shieldOfVirtue,
    ],
  },
  playerTwo: {
    deck: 38,
    discard: [],
    hand: [mauiHeroToAll, bePrepared],
    inkwell: 5,
    lore: 10,
    play: [
      // Mix of ready and would-be exerted
      aladdinStreetRat,
      princePhillipDragonslayer,
      maleficentSorceress,
    ],
  },
  seed: "storybook-local-card-states",
});
