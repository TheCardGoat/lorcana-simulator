import type { CharacterCard } from "@tcg/lorcana-types";
import { theQueenConceitedRulerEpicI18n } from "./205-the-queen-conceited-ruler-epic.i18n";
import { support } from "../../../helpers/abilities/support";

export const theQueenConceitedRulerEpic: CharacterCard = {
  id: "4Tp",
  canonicalId: "ci_7pM",
  reprints: ["set9-001"],
  cardType: "character",
  name: "The Queen",
  version: "Conceited Ruler",
  inkType: ["amber"],
  franchise: "Snow White",
  set: "009",
  cardNumber: 205,
  rarity: "common",
  specialRarity: "epic",
  cost: 3,
  strength: 2,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_61593ca4abb44723ae95ab9228e27aee",
    tcgPlayer: 650141,
  },
  text: [
    {
      title: "Support",
    },
    {
      title: "ROYAL SUMMONS",
      description:
        "At the start of your turn, you may choose and discard a Princess or Queen character card to return a character card from your discard to your hand.",
    },
  ],
  classifications: ["Storyborn", "Villain", "Queen", "Sorcerer"],
  abilities: [
    support,
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          cardType: "character",
          target: "CONTROLLER",
          type: "return-from-discard",
        },
        type: "optional",
      },
      id: "3l5-2",
      text: "ROYAL SUMMONS At the start of your turn, you may choose and discard a Princess or Queen character card to return a character card from your discard to your hand.",
      type: "action",
    },
  ],
  i18n: theQueenConceitedRulerEpicI18n,
};
