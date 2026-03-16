import type { ActionCard } from "@tcg/lorcana-types";

export const quickShot: ActionCard = {
  id: "4ke",
  canonicalId: "ci_4ke",
  reprints: ["set8-203"],
  cardType: "action",
  name: "Quick Shot",
  i18n: {
    en: {
      name: "Quick Shot",
      text: "Deal 1 damage to chosen character. Draw a card.",
    },
    de: {
      name: "Schneller Schuss",
      text: "Füge einem Charakter deiner Wahl 1 Schaden zu. Ziehe 1 Karte.",
    },
    fr: {
      name: "Tir rapide",
      text: "Choisissez un personnage et infligez-lui 1 dommage. Piochez une carte.",
    },
    it: {
      name: "Colpo Rapido",
      text: "Infliggi 1 danno a un personaggio a tua scelta. Pesca una carta.",
    },
  },
  inkType: ["steel"],
  franchise: "Lilo and Stitch",
  set: "008",
  cardNumber: 203,
  rarity: "uncommon",
  cost: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_312b989c72124b8ba3e6722d4ffa16b6",
    tcgPlayer: 631484,
  },
  text: "Deal 1 damage to chosen character. Draw a card.",
  abilities: [
    {
      effect: {
        steps: [
          {
            amount: 1,
            target: {
              selector: "chosen",
              count: 1,
              owner: "any",
              zones: ["play"],
              cardTypes: ["character"],
            },
            type: "deal-damage",
          },
          {
            amount: 1,
            target: "CONTROLLER",
            type: "draw",
          },
        ],
        type: "sequence",
      },
      id: "1ex-1",
      text: "Deal 1 damage to chosen character. Draw a card.",
      type: "action",
    },
  ],
};
