import type { ActionCard } from "@tcg/lorcana-types";

export const avalanche: ActionCard = {
  id: "4mu",
  canonicalId: "ci_4mu",
  reprints: ["set4-195"],
  cardType: "action",
  name: "Avalanche",
  i18n: {
    en: {
      name: "Avalanche",
      text: "Deal 1 damage to each opposing character. You may banish chosen location.",
    },
    de: {
      name: "Lawine",
      text: "Füge jedem gegnerischen Charakter 1 Schaden zu. Du darfst einen Ort deiner Wahl verbannen.",
    },
    fr: {
      name: "Avalanche",
      text: "Infligez 1 dommage à chaque personnage adverse. Vous pouvez choisir un lieu et le bannir.",
    },
    it: {
      name: "Valanga",
      text: "Infliggi 1 danno a ogni personaggio avversario. Puoi esiliare un luogo a tua scelta.",
    },
  },
  inkType: ["steel"],
  franchise: "Mulan",
  set: "004",
  cardNumber: 195,
  rarity: "uncommon",
  cost: 4,
  inkable: false,
  externalIds: {
    lorcast: "crd_9bf4859e7a784073aa4b4de08c5211f0",
    tcgPlayer: 550623,
  },
  text: "Deal 1 damage to each opposing character. You may banish chosen location.",
  abilities: [
    {
      effect: {
        type: "sequence",
        steps: [
          {
            amount: 1,
            target: {
              selector: "all",
              count: "all",
              owner: "opponent",
              zones: ["play"],
              cardTypes: ["character"],
            },
            type: "deal-damage",
          },
          {
            chooser: "CONTROLLER",
            effect: {
              target: {
                selector: "chosen",
                count: 1,
                owner: "any",
                zones: ["play"],
                cardTypes: ["location"],
              },
              type: "banish",
            },
            type: "optional",
          },
        ],
      },
      id: "1pv-1",
      text: "Deal 1 damage to each opposing character. You may banish chosen location.",
      type: "action",
    },
  ],
};
