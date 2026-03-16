import type { CharacterCard } from "@tcg/lorcana-types";

export const grandDukeAdvisorToTheKing: CharacterCard = {
  id: "4Ol",
  canonicalId: "ci_4Ol",
  reprints: ["set2-009"],
  cardType: "character",
  name: "Grand Duke",
  version: "Advisor to the King",
  i18n: {
    en: {
      name: "Grand Duke",
      version: "Advisor to the King",
      text: [
        {
          title: "YES, YOUR MAJESTY",
          description: "Your Prince, Princess, King, and Queen characters get +1 {S}.",
        },
      ],
    },
    de: {
      name: "Großherzog",
      version: "Berater des Königs",
      text: [
        {
          title: "JA, EUER MAJESTÄT",
          description: "Deine Prinzessinnen, Prinzen, Königinnen und Könige erhalten +1.",
        },
      ],
    },
    fr: {
      name: "Grand Duke",
      version: "Conseiller du roi",
      text: [
        {
          title: "OUI, VOTRE MAJESTÉ",
          description: "Vos personnages Princesse, Prince, Reine et Roi gagnent +1.",
        },
      ],
    },
    it: {
      name: "Grand Duke",
      version: "Advisor to the King",
      text: [
        {
          title: "YES, YOUR MAJESTY",
          description: "Your Prince, Princess, King, and Queen characters get +1.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Cinderella",
  set: "002",
  cardNumber: 9,
  rarity: "rare",
  cost: 2,
  strength: 2,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_0b2c5d800fc14fdfacf098d74ec7ab74",
    tcgPlayer: 522735,
  },
  text: [
    {
      title: "YES, YOUR MAJESTY",
      description: "Your Prince, Princess, King, and Queen characters get +1 {S}.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      effect: {
        modifier: 1,
        stat: "strength",
        target: {
          selector: "all",
          count: "all",
          owner: "you",
          zones: ["play"],
          cardTypes: ["character"],
          filter: [
            {
              type: "has-classification",
              classification: "Prince",
            },
          ],
        },
        type: "modify-stat",
      },
      id: "126-1",
      text: "YES, YOUR MAJESTY Your Prince characters get +1 {S}.",
      type: "static",
    },
    {
      effect: {
        modifier: 1,
        stat: "strength",
        target: {
          selector: "all",
          count: "all",
          owner: "you",
          zones: ["play"],
          cardTypes: ["character"],
          filter: [
            {
              type: "has-classification",
              classification: "Princess",
            },
          ],
        },
        type: "modify-stat",
      },
      id: "126-2",
      text: "YES, YOUR MAJESTY Your Princess characters get +1 {S}.",
      type: "static",
    },
    {
      effect: {
        modifier: 1,
        stat: "strength",
        target: {
          selector: "all",
          count: "all",
          owner: "you",
          zones: ["play"],
          cardTypes: ["character"],
          filter: [
            {
              type: "has-classification",
              classification: "King",
            },
          ],
        },
        type: "modify-stat",
      },
      id: "126-3",
      text: "YES, YOUR MAJESTY Your King characters get +1 {S}.",
      type: "static",
    },
    {
      effect: {
        modifier: 1,
        stat: "strength",
        target: {
          selector: "all",
          count: "all",
          owner: "you",
          zones: ["play"],
          cardTypes: ["character"],
          filter: [
            {
              type: "has-classification",
              classification: "Queen",
            },
          ],
        },
        type: "modify-stat",
      },
      id: "126-4",
      text: "YES, YOUR MAJESTY Your Queen characters get +1 {S}.",
      type: "static",
    },
  ],
};
