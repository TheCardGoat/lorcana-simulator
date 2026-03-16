import type { CharacterCard } from "@tcg/lorcana-types";

export const kaaSecretiveSnakeEpic: CharacterCard = {
  id: "7c9",
  canonicalId: "ci_qS6",
  reprints: ["set10-079"],
  cardType: "character",
  name: "Kaa",
  version: "Secretive Snake",
  i18n: {
    en: {
      name: "Kaa",
      version: "Secretive Snake",
      text: "Evasive",
    },
    de: {
      name: "Kaa",
      version: "Geheimnisvolle Schlange",
      text: "Wendig",
    },
    fr: {
      name: "Kaa",
      version: "Serpent dissimulé",
      text: "Insaisissable",
    },
    it: {
      name: "Kaa",
      version: "Serpente sulle Sue",
      text: "Sfuggente",
    },
  },
  inkType: ["emerald"],
  franchise: "Jungle Book",
  set: "010",
  cardNumber: 212,
  rarity: "common",
  specialRarity: "epic",
  cost: 7,
  strength: 6,
  willpower: 7,
  lore: 3,
  inkable: true,
  externalIds: {
    lorcast: "crd_f2d99b79354c466ebcaaeadcba69678e",
    tcgPlayer: 660191,
  },
  text: "Evasive",
  classifications: ["Storyborn", "Villain"],
  abilities: [
    {
      id: "r2h-1",
      keyword: "Evasive",
      type: "keyword",
      text: "Evasive",
    },
  ],
};
