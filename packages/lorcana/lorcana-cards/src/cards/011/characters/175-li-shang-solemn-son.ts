import type { CharacterCard } from "@tcg/lorcana-types";

export const liShangSolemnSon: CharacterCard = {
  id: "e25",
  canonicalId: "ci_e25",
  reprints: ["set11-175"],
  cardType: "character",
  name: "Li Shang",
  version: "Solemn Son",
  i18n: {
    en: {
      name: "Li Shang",
      version: "Solemn Son",
      text: "Challenger +2",
    },
    de: {
      name: "Li Shang",
      version: "Frommer Sohn",
      text: "Herausfordern +2",
    },
    fr: {
      name: "Li Shang",
      version: "Fils solennel",
      text: "Offensif +2",
    },
    it: {
      name: "Li Shang",
      version: "Figlio Solenne",
      text: "Sfidante +2",
    },
  },
  inkType: ["steel"],
  franchise: "Mulan",
  set: "011",
  cardNumber: 175,
  rarity: "common",
  cost: 3,
  strength: 2,
  willpower: 5,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_b63df19a6a2e47edb0325ce080a7ac04",
    tcgPlayer: 676237,
  },
  text: "Challenger +2",
  classifications: ["Storyborn", "Hero", "Captain"],
  abilities: [
    {
      id: "1bv-1",
      keyword: "Challenger",
      type: "keyword",
      value: 2,
      text: "Challenger +2",
    },
  ],
};
