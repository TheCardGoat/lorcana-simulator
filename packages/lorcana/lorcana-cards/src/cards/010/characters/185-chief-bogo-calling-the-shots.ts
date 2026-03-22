import type { CharacterCard } from "@tcg/lorcana-types";
import { chiefBogoCallingTheShotsI18n } from "./185-chief-bogo-calling-the-shots.i18n";

export const chiefBogoCallingTheShots: CharacterCard = {
  id: "A6f",
  canonicalId: "ci_A6f",
  reprints: ["set10-185"],
  cardType: "character",
  name: "Chief Bogo",
  version: "Calling the Shots",
  inkType: ["steel"],
  franchise: "Zootropolis",
  set: "010",
  cardNumber: 185,
  rarity: "rare",
  cost: 4,
  strength: 4,
  willpower: 1,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_49b1333917404a9fa4e855f4c2da3487",
    tcgPlayer: 660273,
  },
  text: [
    {
      title: "MY JURISDICTION",
      description: "During your turn, this character can't be dealt damage.",
    },
    {
      title: "DEPUTIZE",
      description: "Your other characters gain the Detective classification.",
    },
  ],
  classifications: ["Storyborn"],
  abilities: [],
  i18n: chiefBogoCallingTheShotsI18n,
};
