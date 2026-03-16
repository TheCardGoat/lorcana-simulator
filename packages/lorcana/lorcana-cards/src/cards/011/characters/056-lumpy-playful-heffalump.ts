import type { CharacterCard } from "@tcg/lorcana-types";

export const lumpyPlayfulHeffalump: CharacterCard = {
  id: "RK4",
  canonicalId: "ci_RK4",
  reprints: ["set11-056"],
  cardType: "character",
  name: "Lumpy",
  version: "Playful Heffalump",
  i18n: {
    en: {
      name: "Lumpy",
      version: "Playful Heffalump",
      text: "Evasive",
    },
    de: {
      name: "Lumpi",
      version: "Verspielter Heffalump",
      text: "Wendig",
    },
    fr: {
      name: "Lumpy",
      version: "Éfélant joueur",
      text: "Insaisissable",
    },
    it: {
      name: "Effy",
      version: "Efelante Giocoso",
      text: "Sfuggente",
    },
  },
  inkType: ["amethyst"],
  franchise: "Winnie the Pooh",
  set: "011",
  cardNumber: 56,
  rarity: "common",
  cost: 6,
  strength: 6,
  willpower: 5,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_89bb9007e02e4003911ada97cfbe4009",
    tcgPlayer: 675285,
  },
  text: "Evasive",
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      id: "2kg-1",
      keyword: "Evasive",
      type: "keyword",
      text: "Evasive",
    },
  ],
};
