import type { ActionCard } from "@tcg/lorcana-types";

export const justInTime: ActionCard = {
  id: "TAp",
  canonicalId: "ci_TAp",
  reprints: ["set1-029"],
  cardType: "action",
  name: "Just in Time",
  i18n: {
    en: {
      name: "Just in Time",
      text: "You may play a character with cost 5 or less for free.",
    },
    de: {
      name: "Gerade Rechtzeitig",
      text: "Du darfst einen Charakter, der 5 oder weniger kostet, kostenlos ausspielen.",
    },
    fr: {
      name: "JUSTE À TEMPS",
      text: "Vous pouvez jouer gratuitement un personnage coûtant 5 ou moins.",
    },
    it: {
      name: "Just in Time",
      text: "You may play a character with cost 5 or less for free.",
    },
  },
  inkType: ["amber"],
  franchise: "Moana",
  set: "001",
  cardNumber: 29,
  rarity: "rare",
  cost: 3,
  inkable: false,
  externalIds: {
    lorcast: "crd_4d9c8fd7ab2241d9893ca3ad6a31daed",
    tcgPlayer: 492737,
  },
  text: "You may play a character with cost 5 or less for free.",
  abilities: [
    {
      type: "action",
      effect: {
        type: "optional",
        chooser: "CONTROLLER",
        effect: {
          cardType: "character",
          cost: "free",
          from: "hand",
          type: "play-card",
          filter: {
            maxCost: 5,
          },
        },
      },
    },
  ],
};
