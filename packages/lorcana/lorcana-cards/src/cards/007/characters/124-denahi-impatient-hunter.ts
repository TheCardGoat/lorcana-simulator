import type { CharacterCard } from "@tcg/lorcana-types";
import { denahiImpatientHunterI18n } from "./124-denahi-impatient-hunter.i18n";

export const denahiImpatientHunter: CharacterCard = {
  id: "OYJ",
  canonicalId: "ci_OYJ",
  reprints: ["set7-124"],
  cardType: "character",
  name: "Denahi",
  version: "Impatient Hunter",
  inkType: ["ruby", "steel"],
  franchise: "Brother Bear",
  set: "007",
  cardNumber: 124,
  rarity: "uncommon",
  cost: 3,
  strength: 3,
  willpower: 2,
  lore: 0,
  inkable: true,
  externalIds: {
    lorcast: "crd_b91e58cc0277450595a28974cf70c180",
    tcgPlayer: 618144,
  },
  text: [
    {
      title: "Reckless",
    },
    {
      title: "Resist +2",
    },
  ],
  classifications: ["Storyborn"],
  abilities: [
    {
      id: "8xy-1",
      keyword: "Reckless",
      type: "keyword",
      text: "Reckless",
    },
    {
      id: "8xy-2",
      keyword: "Resist",
      type: "keyword",
      value: 2,
      text: "Resist +2",
    },
  ],
  i18n: denahiImpatientHunterI18n,
};
