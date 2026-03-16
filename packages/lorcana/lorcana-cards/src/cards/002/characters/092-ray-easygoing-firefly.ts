import type { CharacterCard } from "@tcg/lorcana-types";

export const rayEasygoingFirefly: CharacterCard = {
  id: "Jkc",
  canonicalId: "ci_Jkc",
  reprints: ["set2-092"],
  cardType: "character",
  name: "Ray",
  version: "Easygoing Firefly",
  i18n: {
    en: {
      name: "Ray",
      version: "Easygoing Firefly",
      text: "Evasive",
    },
    de: {
      name: "Ray",
      version: "Unbekümmertes Glühwürmchen",
      text: "Wendig",
    },
    fr: {
      name: "Ray",
      version: "Luciole décontractée",
      text: "Insaisissable",
    },
    it: {
      name: "Ray",
      version: "Easygoing Firefly",
      text: [
        {
          title: "Evasive",
          description: "(Only characters with Evasive can challenge this character.)",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Princess and the Frog",
  set: "002",
  cardNumber: 92,
  rarity: "common",
  cost: 5,
  strength: 3,
  willpower: 3,
  lore: 3,
  inkable: true,
  externalIds: {
    lorcast: "crd_b7cb9265f8b84f77afabe12e61219153",
    tcgPlayer: 527250,
  },
  text: "Evasive",
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      id: "1bk-1",
      keyword: "Evasive",
      type: "keyword",
      text: "Evasive",
    },
  ],
};
