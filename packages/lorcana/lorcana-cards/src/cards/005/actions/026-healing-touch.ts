import type { ActionCard } from "@tcg/lorcana-types";

export const healingTouch: ActionCard = {
  id: "b5J",
  canonicalId: "ci_b5J",
  reprints: ["set5-026"],
  cardType: "action",
  name: "Healing Touch",
  i18n: {
    en: {
      name: "Healing Touch",
      text: "Remove up to 4 damage from chosen character. Draw a card.",
    },
    de: {
      name: "Heilende Berührung",
      text: "Entferne bis zu 4 Schaden von einem Charakter deiner Wahl. Ziehe 1 Karte.",
    },
    fr: {
      name: "Toucher guérisseur",
      text: "Choisissez un personnage et retirez-lui jusqu'à 4 dommages. Piochez une carte.",
    },
    it: {
      name: "Tocco Curativo",
      text: "Rimuovi fino a 4 danni da un personaggio a tua scelta. Pesca una carta.",
    },
  },
  inkType: ["amber"],
  franchise: "Frozen",
  set: "005",
  cardNumber: 26,
  rarity: "common",
  cost: 3,
  inkable: true,
  externalIds: {
    lorcast: "crd_10b23643a0b146bcb95389cfb37c6133",
    tcgPlayer: 561259,
  },
  text: "Remove up to 4 damage from chosen character. Draw a card.",
  abilities: [
    {
      effect: {
        steps: [
          {
            amount: 4,
            target: {
              selector: "chosen",
              count: 1,
              owner: "any",
              zones: ["play"],
              cardTypes: ["character"],
            },
            type: "remove-damage",
            upTo: true,
          },
          {
            amount: 1,
            target: "CONTROLLER",
            type: "draw",
          },
        ],
        type: "sequence",
      },
      id: "9qq-1",
      text: "Remove up to 4 damage from chosen character. Draw a card.",
      type: "action",
    },
  ],
};
