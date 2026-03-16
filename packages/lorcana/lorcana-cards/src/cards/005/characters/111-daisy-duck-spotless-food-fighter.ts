import type { CharacterCard } from "@tcg/lorcana-types";

export const daisyDuckSpotlessFoodfighter: CharacterCard = {
  id: "wsY",
  canonicalId: "ci_wsY",
  reprints: ["set5-111"],
  cardType: "character",
  name: "Daisy Duck",
  version: "Spotless Food-Fighter",
  i18n: {
    en: {
      name: "Daisy Duck",
      version: "Spotless Food-Fighter",
      text: "Evasive",
    },
    de: {
      name: "Daisy Duck",
      version: "Makellos trotz Essensschlacht",
      text: "Wendig",
    },
    fr: {
      name: "Daisy",
      version: "Bagarreuse immaculée",
      text: "Insaisissable",
    },
    it: {
      name: "Paperina",
      version: "Combattente Senza Macchia",
      text: "Sfuggente",
    },
  },
  inkType: ["ruby"],
  set: "005",
  cardNumber: 111,
  rarity: "common",
  cost: 2,
  strength: 2,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_bfe946722b9545b996eac2d8d5e13dfd",
    tcgPlayer: 561482,
  },
  text: "Evasive",
  classifications: ["Storyborn", "Hero"],
  abilities: [
    {
      id: "1d8-1",
      keyword: "Evasive",
      type: "keyword",
      text: "Evasive",
    },
  ],
};
