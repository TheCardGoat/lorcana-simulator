import type { CharacterCard } from "@tcg/lorcana-types";

export const herculesUnwaveringDemigod: CharacterCard = {
  id: "jJs",
  canonicalId: "ci_jJs",
  reprints: ["set6-180"],
  cardType: "character",
  name: "Hercules",
  version: "Unwavering Demigod",
  i18n: {
    en: {
      name: "Hercules",
      version: "Unwavering Demigod",
      text: "Challenger +2 (While challenging, this character gets +2 {S}).",
    },
    de: {
      name: "Hercules",
      version: "Unermüdlicher Halbgott",
      text: "Herausfordern +2",
    },
    fr: {
      name: "Hercule",
      version: "Demi-dieu inébranlable",
      text: "Offensif +2",
    },
    it: {
      name: "Ercole",
      version: "Semidio Risoluto",
      text: "Sfidante +2",
    },
  },
  inkType: ["steel"],
  franchise: "Hercules",
  set: "006",
  cardNumber: 180,
  rarity: "common",
  cost: 4,
  strength: 2,
  willpower: 4,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_1c5e7d4a006c4736baf5e602734fec5b",
    tcgPlayer: 593011,
  },
  text: "Challenger +2 (While challenging, this character gets +2 {S}).",
  classifications: ["Dreamborn", "Hero", "Prince"],
  abilities: [
    {
      id: "1n8-1",
      keyword: "Challenger",
      type: "keyword",
      value: 2,
      text: "Challenger +2.",
    },
  ],
};
