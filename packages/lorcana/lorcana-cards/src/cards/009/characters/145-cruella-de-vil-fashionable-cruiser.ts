import type { CharacterCard } from "@tcg/lorcana-types";
import { cruellaDeVilFashionableCruiserI18n } from "./145-cruella-de-vil-fashionable-cruiser.i18n";

export const cruellaDeVilFashionableCruiser: CharacterCard = {
  id: "6E0",
  canonicalId: "ci_YdA",
  reprints: ["set2-144", "set9-145"],
  cardType: "character",
  name: "Cruella De Vil",
  version: "Fashionable Cruiser",
  inkType: ["sapphire"],
  franchise: "101 Dalmatians",
  set: "009",
  cardNumber: 145,
  rarity: "common",
  cost: 2,
  strength: 3,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_f3478602630b4f20aed9e34d8ce4d995",
    tcgPlayer: 650080,
  },
  text: [
    {
      title: "NOW GET GOING",
      description:
        "During your turn, this character gains Evasive. (They can challenge characters with Evasive.)",
    },
  ],
  classifications: ["Dreamborn", "Villain"],
  abilities: [
    {
      condition: {
        type: "turn",
        whose: "your",
      },
      effect: {
        keyword: "Evasive",
        target: "SELF",
        type: "gain-keyword",
      },
      type: "static",
    },
  ],
  i18n: cruellaDeVilFashionableCruiserI18n,
};
