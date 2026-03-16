import type { CharacterCard } from "@tcg/lorcana-types";

export const minnieMouseStylishSurfer: CharacterCard = {
  id: "7jJ",
  canonicalId: "ci_7jJ",
  reprints: ["set2-113"],
  cardType: "character",
  name: "Minnie Mouse",
  version: "Stylish Surfer",
  i18n: {
    en: {
      name: "Minnie Mouse",
      version: "Stylish Surfer",
      text: "Evasive",
    },
    de: {
      name: "Minnie Maus",
      version: "Stylische Surferin",
      text: "Wendig",
    },
    fr: {
      name: "Minnie",
      version: "Surfeuse élégante",
      text: "Insaisissable",
    },
    it: {
      name: "Minnie Mouse",
      version: "Stylish Surfer",
      text: [
        {
          title: "Evasive",
          description: "(Only characters with Evasive can challenge this character.)",
        },
      ],
    },
  },
  inkType: ["ruby"],
  set: "002",
  cardNumber: 113,
  rarity: "uncommon",
  cost: 3,
  strength: 1,
  willpower: 3,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_bce37cc08d944fb99b90fa9f6fcda16d",
    tcgPlayer: 526358,
  },
  text: "Evasive",
  classifications: ["Dreamborn", "Hero"],
  abilities: [
    {
      id: "1yy-1",
      keyword: "Evasive",
      type: "keyword",
      text: "Evasive",
    },
  ],
};
