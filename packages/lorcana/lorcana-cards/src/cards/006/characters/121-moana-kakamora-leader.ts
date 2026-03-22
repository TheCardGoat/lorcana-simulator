import type { CharacterCard } from "@tcg/lorcana-types";
import { moanaKakamoraLeaderI18n } from "./121-moana-kakamora-leader.i18n";

export const moanaKakamoraLeader: CharacterCard = {
  id: "OXn",
  canonicalId: "ci_OXn",
  reprints: ["set6-121"],
  cardType: "character",
  name: "Moana",
  version: "Kakamora Leader",
  inkType: ["ruby"],
  franchise: "Moana",
  set: "006",
  cardNumber: 121,
  rarity: "rare",
  cost: 7,
  strength: 6,
  willpower: 5,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_ea56665b30604ff0977e95ad7442f5f5",
    tcgPlayer: 588360,
  },
  text: [
    {
      title: "Shift 5",
    },
    {
      title: "GATHERING FORCES",
      description:
        "When you play this character, you may move any number of your characters to the same location for free. Gain 1 lore for each character you moved.",
    },
  ],
  classifications: ["Floodborn", "Hero", "Princess", "Pirate", "Captain"],
  abilities: [
    {
      cost: {
        ink: 5,
      },
      id: "cew-1",
      keyword: "Shift",
      text: "Shift 5",
      type: "keyword",
    },
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          amount: 1,
          type: "gain-lore",
        },
        type: "optional",
      },
      id: "cew-2",
      name: "GATHERING FORCES",
      text: "GATHERING FORCES When you play this character, you may move any number of your characters to the same location for free. Gain 1 lore for each character you moved.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
  i18n: moanaKakamoraLeaderI18n,
};
