import type { CharacterCard } from "@tcg/lorcana-types";

export const skippyEnergeticRabbit: CharacterCard = {
  id: "Wyz",
  canonicalId: "ci_Wyz",
  reprints: ["set3-087"],
  cardType: "character",
  name: "Skippy",
  version: "Energetic Rabbit",
  i18n: {
    en: {
      name: "Skippy",
      version: "Energetic Rabbit",
      text: "Ward",
    },
    de: {
      name: "Skippy",
      version: "Kaninchen mit viel Energie",
      text: "Behütet",
    },
    fr: {
      name: "Bobby",
      version: "Lapin énergique",
      text: "Hors d'atteinte",
    },
    it: {
      name: "Saetta",
      version: "Coniglio Vivace",
      text: "Protetto",
    },
  },
  inkType: ["emerald"],
  franchise: "Robin Hood",
  set: "003",
  cardNumber: 87,
  rarity: "common",
  cost: 2,
  strength: 2,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_5aab3c53b77844b2921a280dfe53bdaa",
    tcgPlayer: 537933,
  },
  text: "Ward",
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      id: "1ma-1",
      keyword: "Ward",
      type: "keyword",
      text: "Ward",
    },
  ],
};
