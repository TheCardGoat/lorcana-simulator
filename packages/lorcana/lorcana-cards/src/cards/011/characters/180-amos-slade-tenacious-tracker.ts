import type { CharacterCard } from "@tcg/lorcana-types";

export const amosSladeTenaciousTracker: CharacterCard = {
  id: "1j8",
  canonicalId: "ci_1j8",
  reprints: ["set11-180"],
  cardType: "character",
  name: "Amos Slade",
  version: "Tenacious Tracker",
  i18n: {
    en: {
      name: "Amos Slade",
      version: "Tenacious Tracker",
      text: [
        {
          title: "Alert",
          description: "(This character can challenge as if they had Evasive.)",
        },
      ],
    },
    de: {
      name: "Amos Slade",
      version: "Hartnäckiger Verfolger",
      text: [
        {
          title: "Alarmiert",
          description: "(Dieser Charakter kann herausfordern, als hätte er Wendig.)",
        },
      ],
    },
    fr: {
      name: "Amos Slade",
      version: "Pisteur tenace",
      text: "Agilité (Ce personnage peut défier comme s'il était Insaisissable.)",
    },
    it: {
      name: "Amos Slade",
      version: "Inseguitore Tenace",
      text: [
        {
          title: "Vigile",
          description: "(Questo personaggio può sfidare come se avesse Sfuggente.)",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Fox and the Hound",
  set: "011",
  cardNumber: 180,
  rarity: "common",
  cost: 4,
  strength: 6,
  willpower: 4,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_da80d9da41e84566969a1c1585dfc75c",
    tcgPlayer: 673738,
  },
  text: [
    {
      title: "Alert",
      description: "(This character can challenge as if they had Evasive.)",
    },
  ],
  classifications: ["Storyborn"],
  abilities: [
    {
      id: "18o-1",
      keyword: "Alert",
      type: "keyword",
      text: "Alert",
    },
  ],
};
