import type { ActionCard } from "@tcg/lorcana-types";

export const ransack: ActionCard = {
  id: "sgV",
  canonicalId: "ci_sgV",
  reprints: ["set1-199"],
  cardType: "action",
  name: "Ransack",
  i18n: {
    en: {
      name: "Ransack",
      text: "Draw 2 cards, then choose and discard 2 cards.",
    },
    de: {
      name: "Durchwühlen",
      text: "Ziehe 2 Karten. Wähle danach 2 Karten aus deiner Hand und wirf sie ab.",
    },
    fr: {
      name: "SENS DESSUS DESSOUS",
      text: "Piochez 2 cartes puis défaussez 2 cartes.",
    },
    it: {
      name: "Ransack",
      text: "Draw 2 cards, then choose and discard 2 cards.",
    },
  },
  inkType: ["steel"],
  franchise: "Emperors New Groove",
  set: "001",
  cardNumber: 199,
  rarity: "uncommon",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_151c0155aa7c4f4fbec1bdb3a10f2676",
    tcgPlayer: 508937,
  },
  text: "Draw 2 cards, then choose and discard 2 cards.",
  abilities: [
    {
      type: "action",
      effect: {
        type: "sequence",
        steps: [
          {
            amount: 2,
            target: "CONTROLLER",
            type: "draw",
          },
          {
            amount: 2,
            chosen: true,
            from: "hand",
            type: "discard",
            target: "CONTROLLER",
          },
        ],
      },
    },
  ],
};
