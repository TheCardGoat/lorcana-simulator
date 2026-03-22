import { createFixture } from "./fixture-factory.js";
import type { LorcanaSimulatorFixture } from "@/features/simulator/model/contracts.js";
import {
  amberAmethystControl,
  steelSapphireMidrange,
} from "@/features/simulator-devtools/deck-fixtures/index.js";

export const preGameFixture: LorcanaSimulatorFixture = createFixture({
  id: "pre-game",
  name: "Pre-Game",
  description: "Fresh hands and realistic decks for running full pre-game setup flow.",
  seed: "storybook-local-pre-game",
  skipPreGame: false,
  playerOne: {
    deck: amberAmethystControl.cards,
    hand: 0,
    inkwell: 0,
    lore: 0,
    play: [],
    discard: [],
  },
  playerTwo: {
    deck: steelSapphireMidrange.cards,
    hand: 0,
    inkwell: 0,
    lore: 0,
    play: [],
    discard: [],
  },
});
