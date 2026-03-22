import type { CharacterCard } from "@tcg/lorcana-types";
import { stitchExperiment626EnchantedI18n } from "./220-stitch-experiment-626-enchanted.i18n";

export const stitchExperiment626Enchanted: CharacterCard = {
  id: "pTa",
  canonicalId: "ci_jjP",
  reprints: ["set8-166"],
  cardType: "character",
  name: "Stitch",
  version: "Experiment 626",
  inkType: ["sapphire"],
  franchise: "Lilo and Stitch",
  set: "008",
  cardNumber: 220,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 3,
  strength: 3,
  willpower: 3,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_1a6358dd0385477eb83213749cb5d38f",
    tcgPlayer: 633104,
  },
  text: [
    {
      title: "SO NAUGHTY",
      description:
        "When you play this character, each opponent puts the top card of their deck into their inkwell facedown and exerted.",
    },
    {
      title: "STEALTH MODE",
      description:
        "At the start of your turn, if this card is in your discard, you may choose and discard a card with {IW} to play this character for free and he enters play exerted.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Alien"],
  abilities: [
    {
      effect: {
        exerted: true,
        facedown: true,
        source: "hand",
        target: "OPPONENT",
        type: "put-into-inkwell",
      },
      id: "bxo-1",
      name: "SO NAUGHTY",
      text: "SO NAUGHTY When you play this character, each opponent puts the top card of their deck into their inkwell facedown and exerted.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
    {
      effect: {
        condition: {
          expression: "this card is in your discard",
          type: "if",
        },
        then: {
          restriction: "enters-play-exerted",
          target: "SELF",
          type: "restriction",
        },
        type: "conditional",
      },
      id: "bxo-2",
      text: "STEALTH MODE At the start of your turn, if this card is in your discard, you may choose and discard a card with {IW} to play this character for free and he enters play exerted.",
      type: "static",
    },
  ],
  i18n: stitchExperiment626EnchantedI18n,
};
