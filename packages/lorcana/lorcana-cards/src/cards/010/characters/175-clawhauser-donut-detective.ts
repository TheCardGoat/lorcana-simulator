import type { CharacterCard } from "@tcg/lorcana-types";
import { clawhauserDonutDetectiveI18n } from "./175-clawhauser-donut-detective.i18n";

export const clawhauserDonutDetective: CharacterCard = {
  id: "6w5",
  canonicalId: "ci_6w5",
  reprints: ["set10-175"],
  cardType: "character",
  name: "Clawhauser",
  version: "Donut Detective",
  inkType: ["steel"],
  franchise: "Zootropolis",
  set: "010",
  cardNumber: 175,
  rarity: "common",
  cost: 6,
  strength: 5,
  willpower: 6,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_d9964e71c9c442d48702f92af971833f",
    tcgPlayer: 660033,
  },
  text: "Challenger +2",
  classifications: ["Dreamborn", "Ally", "Detective"],
  abilities: [
    {
      id: "1ur-1",
      keyword: "Challenger",
      type: "keyword",
      value: 2,
      text: "Challenger +2",
    },
  ],
  i18n: clawhauserDonutDetectiveI18n,
};
