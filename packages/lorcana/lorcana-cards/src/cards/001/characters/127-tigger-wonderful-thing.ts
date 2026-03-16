import type { CharacterCard } from "@tcg/lorcana-types";

export const tiggerWonderfulThing: CharacterCard = {
  id: "H06",
  canonicalId: "ci_H06",
  reprints: ["set1-127"],
  cardType: "character",
  name: "Tigger",
  version: "Wonderful Thing",
  i18n: {
    en: {
      name: "Tigger",
      version: "Wonderful Thing",
      text: "Evasive",
    },
    de: {
      name: "Tigger",
      version: "Superste Sache",
      text: "Wendig",
    },
    fr: {
      name: "TIGROU",
      version: "Merveilleux d'être un tigrou",
      text: "Insaisissable",
    },
    it: {
      name: "Tigro",
      version: "Pieno di Elettricità",
      text: "Sfuggente",
    },
  },
  inkType: ["ruby"],
  franchise: "Winnie the Pooh",
  set: "001",
  cardNumber: 127,
  rarity: "uncommon",
  cost: 6,
  strength: 4,
  willpower: 4,
  lore: 2,
  inkable: true,
  missingTests: true,
  externalIds: {
    lorcast: "crd_f1f7e5ef15f04872a721d1792aa677d1",
    tcgPlayer: 489638,
  },
  text: "Evasive",
  classifications: ["Storyborn", "Tigger"],
  abilities: [
    {
      id: "1cg-1",
      keyword: "Evasive",
      type: "keyword",
      text: "Evasive",
    },
  ],
};
