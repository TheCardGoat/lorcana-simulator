import type { CharacterCard } from "@tcg/lorcana-types";

export const arielOnHumanLegs: CharacterCard = {
  id: "WeA",
  canonicalId: "ci_WeA",
  reprints: ["set1-001"],
  cardType: "character",
  name: "Ariel",
  version: "On Human Legs",
  i18n: {
    en: {
      name: "Ariel",
      version: "On Human Legs",
      text: [
        {
          title: "VOICELESS",
          description: "This character can't {E} to sing songs.",
        },
      ],
    },
    de: {
      name: "Arielle",
      version: "Auf menschlichen Beinen",
      text: [
        {
          title: "VERSTUMMT",
          description: "Dieser Charakter kann nicht, um Lieder zu singen.",
        },
      ],
    },
    fr: {
      name: "ARIEL",
      version: "Sur des jambes humaines",
      text: [
        {
          title: "SANS VOIX",
          description: "Ce personnage ne peut pas être pour chanter des chansons.",
        },
      ],
    },
    it: {
      name: "Ariel",
      version: "On Human Legs",
      text: [
        {
          title: "VOICELESS",
          description: "This character can't to sing songs.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Little Mermaid",
  set: "001",
  cardNumber: 1,
  rarity: "uncommon",
  cost: 4,
  strength: 3,
  willpower: 4,
  lore: 2,
  inkable: true,
  missingTests: true,
  externalIds: {
    lorcast: "crd_d9f3b86af85f48579ed9d0d7ce0de129",
    tcgPlayer: 494102,
  },
  text: [
    {
      title: "VOICELESS",
      description: "This character can't {E} to sing songs.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Princess"],
  abilities: [
    {
      effect: {
        restriction: "cant-sing",
        target: "SELF",
        type: "restriction",
      },
      id: "2c9-1",
      name: "VOICELESS",
      text: "VOICELESS This character can't {E} to sing songs.",
      type: "static",
    },
  ],
};
