import type { CharacterCard } from "@tcg/lorcana-types";

export const pongoOlRascal: CharacterCard = {
  id: "Sa8",
  canonicalId: "ci_Sa8",
  reprints: ["set1-120"],
  cardType: "character",
  name: "Pongo",
  version: "Ol’ Rascal",
  i18n: {
    en: {
      name: "Pongo",
      version: "Ol’ Rascal",
      text: "Evasive",
    },
    de: {
      name: "Pongo",
      version: "Alter Gauner",
      text: "Wendig",
    },
    fr: {
      name: "PONGO",
      version: "Sacripant",
      text: "Insaisissable",
    },
    it: {
      name: "Pongo",
      version: "Ol’ Rascal",
      text: [
        {
          title: "Evasive",
          description: "(Only characters with Evasive can challenge this character.)",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "101 Dalmatians",
  set: "001",
  cardNumber: 120,
  rarity: "common",
  cost: 4,
  strength: 2,
  willpower: 3,
  lore: 2,
  inkable: true,
  missingTests: true,
  externalIds: {
    lorcast: "crd_e17a4efa1eaf47e2aefdcf3b98d4f03c",
    tcgPlayer: 503321,
  },
  text: "Evasive",
  classifications: ["Storyborn", "Hero"],
  abilities: [
    {
      id: "37j-1",
      keyword: "Evasive",
      type: "keyword",
      text: "Evasive",
    },
  ],
};
