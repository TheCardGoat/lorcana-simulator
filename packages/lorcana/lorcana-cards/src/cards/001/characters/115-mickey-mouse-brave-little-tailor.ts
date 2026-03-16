import type { CharacterCard } from "@tcg/lorcana-types";

export const mickeyMouseBraveLittleTailor: CharacterCard = {
  id: "vrS",
  canonicalId: "ci_vrS",
  reprints: ["set1-115"],
  cardType: "character",
  name: "Mickey Mouse",
  version: "Brave Little Tailor",
  i18n: {
    en: {
      name: "Mickey Mouse",
      version: "Brave Little Tailor",
      text: "Evasive",
    },
    de: {
      name: "Mickey Mouse",
      version: "Brave Little Tailor",
      text: [
        {
          title: "Evasive",
          description: "(Only characters with Evasive can challenge this character.)",
        },
      ],
    },
    fr: {
      name: "Mickey Mouse",
      version: "Brave Little Tailor",
      text: [
        {
          title: "Evasive",
          description: "(Only characters with Evasive can challenge this character.)",
        },
      ],
    },
    it: {
      name: "Mickey Mouse",
      version: "Brave Little Tailor",
      text: [
        {
          title: "Evasive",
          description: "(Only characters with Evasive can challenge this character.)",
        },
      ],
    },
  },
  inkType: ["ruby"],
  set: "001",
  cardNumber: 115,
  rarity: "legendary",
  cost: 8,
  strength: 5,
  willpower: 5,
  lore: 4,
  inkable: true,
  missingTests: true,
  externalIds: {
    lorcast: "crd_a0a1e1bb99794f04991929ced6001ae8",
    tcgPlayer: 559532,
  },
  text: "Evasive",
  classifications: ["Dreamborn", "Hero"],
  abilities: [
    {
      id: "a81-1",
      keyword: "Evasive",
      type: "keyword",
      text: "Evasive",
    },
  ],
};
