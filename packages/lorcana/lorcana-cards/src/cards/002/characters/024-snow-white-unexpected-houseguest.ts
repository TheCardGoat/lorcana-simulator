import type { CharacterCard } from "@tcg/lorcana-types";

export const snowWhiteUnexpectedHouseguest: CharacterCard = {
  id: "BdH",
  canonicalId: "ci_BdH",
  reprints: ["set2-024"],
  cardType: "character",
  name: "Snow White",
  version: "Unexpected Houseguest",
  i18n: {
    en: {
      name: "Snow White",
      version: "Unexpected Houseguest",
      text: [
        {
          title: "HOW DO YOU DO?",
          description: "You pay 1 {I} less to play Seven Dwarfs characters.",
        },
      ],
    },
    de: {
      name: "Schneewittchen",
      version: "Unerwarteter Gast",
      text: [
        {
          title: "EINEN SCHÖNEN GUTEN MORGEN",
          description: "Du zahlst 1 weniger, um die Sieben Zwerge auszuspielen.",
        },
      ],
    },
    fr: {
      name: "Blanche-Neige",
      version: "Invitée inattendue",
      text: [
        {
          title: "ENCHANTÉE, MESSIEURS",
          description: "Les personnages Sept Nains vous coûtent 1 de moins à jouer.",
        },
      ],
    },
    it: {
      name: "Snow White",
      version: "Unexpected Houseguest",
      text: "How Do You Do?\\ You pay 1 less to play Seven Dwarfs characters.",
    },
  },
  inkType: ["amber"],
  franchise: "Snow White",
  set: "002",
  cardNumber: 24,
  rarity: "uncommon",
  cost: 2,
  strength: 1,
  willpower: 2,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_a40dcfcf0f944762a1b3f31d9a322c9a",
    tcgPlayer: 526378,
  },
  text: [
    {
      title: "HOW DO YOU DO?",
      description: "You pay 1 {I} less to play Seven Dwarfs characters.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Princess"],
  abilities: [
    {
      id: "1sk-1",
      name: "HOW DO YOU DO?",
      text: "HOW DO YOU DO? You pay 1 {I} less to play Seven Dwarfs characters.",
      type: "static",
      effect: {
        amount: 1,
        cardType: "character",
        classification: "Seven Dwarfs",
        target: "CONTROLLER",
        type: "cost-reduction",
      },
    },
  ],
};
