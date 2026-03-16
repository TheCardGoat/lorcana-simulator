import type { CharacterCard } from "@tcg/lorcana-types";

export const lefouBumbler: CharacterCard = {
  id: "irS",
  canonicalId: "ci_irS",
  reprints: ["set1-008"],
  cardType: "character",
  name: "LeFou",
  version: "Bumbler",
  i18n: {
    en: {
      name: "LeFou",
      version: "Bumbler",
      text: [
        {
          title: "LOYAL",
          description:
            "If you have a character named Gaston in play, you pay 1 {I} less to play this character.",
        },
      ],
    },
    de: {
      name: "Le Fou",
      version: "Tollpatsch",
      text: [
        {
          title: "LOYAL",
          description:
            "Wenn du einen Gaston-Charakter im Spiel hast, zahlst du 1 weniger, um diesen Charakter auszuspielen.",
        },
      ],
    },
    fr: {
      name: "LE FOU",
      version: "Empoté",
      text: [
        {
          title: "LOYAL",
          description:
            "Si vous avez un personnage Gaston en jeu, jouer ce personnage coûte 1 de moins.",
        },
      ],
    },
    it: {
      name: "LeFou",
      version: "Bumbler",
      text: [
        {
          title: "LOYAL",
          description:
            "If you have a character named Gaston in play, you pay 1 less to play this character.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Beauty and the Beast",
  set: "001",
  cardNumber: 8,
  rarity: "uncommon",
  cost: 2,
  strength: 1,
  willpower: 2,
  lore: 2,
  inkable: true,
  missingTests: true,
  externalIds: {
    lorcast: "crd_5a1091c1a03c43d4854b66426d49aa10",
    tcgPlayer: 492738,
  },
  text: [
    {
      title: "LOYAL",
      description:
        "If you have a character named Gaston in play, you pay 1 {I} less to play this character.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      condition: {
        controller: "you",
        name: "Gaston",
        type: "has-named-character",
      },
      effect: {
        amount: 1,
        cardType: "character",
        type: "cost-reduction",
      },
      id: "9i4-1",
      name: "LOYAL",
      sourceZones: ["hand"],
      text: "LOYAL If you have a character named Gaston in play, you pay 1 {I} less to play this character.",
      type: "static",
    },
  ],
};
