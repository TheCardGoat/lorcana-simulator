import type { CharacterCard } from "@tcg/lorcana-types";

export const grumpyBadtempered: CharacterCard = {
  id: "Xv5",
  canonicalId: "ci_Xv5",
  reprints: ["set2-010"],
  cardType: "character",
  name: "Grumpy",
  version: "Bad-Tempered",
  i18n: {
    en: {
      name: "Grumpy",
      version: "Bad-Tempered",
      text: [
        {
          title: "THERE'S TROUBLE A-BREWIN'",
          description: "Your other Seven Dwarfs characters get +1 {S}.",
        },
      ],
    },
    de: {
      name: "Brummbär",
      version: "Schlecht gelaunt",
      text: [
        {
          title: "UNS STEHT UNHEIL BEVOR",
          description: "Deine anderen Sieben Zwerge erhalten +1.",
        },
      ],
    },
    fr: {
      name: "Grincheux",
      version: "Sale caractère",
      text: [
        {
          title: "IL Y A QUELQUE CHOSE DE LOUCHE",
          description: "Vos autres personnages Sept Nains gagnent +1.",
        },
      ],
    },
    it: {
      name: "Grumpy",
      version: "Bad-Tempered",
      text: "There's Trouble A-Brewin'\\ Your other Seven Dwarfs characters get +1.",
    },
  },
  inkType: ["amber"],
  franchise: "Snow White",
  set: "002",
  cardNumber: 10,
  rarity: "common",
  cost: 4,
  strength: 3,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_9d62c487faa543c78f964ac8ff1a73f6",
    tcgPlayer: 526388,
  },
  text: [
    {
      title: "THERE'S TROUBLE A-BREWIN'",
      description: "Your other Seven Dwarfs characters get +1 {S}.",
    },
  ],
  classifications: ["Storyborn", "Ally", "Seven Dwarfs"],
  abilities: [
    {
      effect: {
        modifier: 1,
        stat: "strength",
        target: "YOUR_OTHER_SEVEN_DWARFS_CHARACTERS",
        type: "modify-stat",
      },
      type: "static",
    },
  ],
};
