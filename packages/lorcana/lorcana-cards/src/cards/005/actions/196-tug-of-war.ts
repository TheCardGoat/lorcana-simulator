import type { ActionCard } from "@tcg/lorcana-types";

export const tugofwar: ActionCard = {
  id: "J1D",
  canonicalId: "ci_J1D",
  reprints: ["set5-196"],
  cardType: "action",
  name: "Tug-of-War",
  i18n: {
    en: {
      name: "Tug-of-War",
      text: [
        {
          title: "Choose one:",
        },
        {
          title: "• Deal 1 damage to each opposing character without Evasive.",
        },
        {
          title: "• Deal 3 damage to each opposing character with Evasive.",
        },
      ],
    },
    de: {
      name: "Tauziehen",
      text: "Wähle eine Möglichkeit aus: • Füge jedem gegnerischen Charakter ohne Wendig 1 Schaden zu. • Füge jedem gegnerischen Charakter mit Wendig 3 Schaden zu.",
    },
    fr: {
      name: "Tir à la corde",
      text: "Choisissez entre: • Infligez 1 dommage à chaque personnage adverse sans Insaisissable. • Infligez 3 dommages à chaque personnage adverse avec Insaisissable.",
    },
    it: {
      name: "Tiro alla Fune",
      text: "Scegli uno: • Infliggi 1 danno a ogni personaggio avversario senza Sfuggente. • Infliggi 3 danni a ogni personaggio avversario con Sfuggente.",
    },
  },
  inkType: ["steel"],
  franchise: "Peter Pan",
  set: "005",
  cardNumber: 196,
  rarity: "rare",
  cost: 5,
  inkable: true,
  externalIds: {
    lorcast: "crd_3a34c665afa94105b0b19383925dd830",
    tcgPlayer: 557731,
  },
  text: [
    {
      title: "Choose one:",
    },
    {
      title: "• Deal 1 damage to each opposing character without Evasive.",
    },
    {
      title: "• Deal 3 damage to each opposing character with Evasive.",
    },
  ],
  abilities: [
    {
      type: "action",
      effect: {
        type: "choice",
        options: [
          {
            type: "deal-damage",
            amount: 1,
            target: {
              selector: "all",
              count: "all",
              owner: "opponent",
              zones: ["play"],
              cardTypes: ["character"],
              filter: [
                {
                  type: "not",
                  filter: {
                    type: "has-keyword",
                    keyword: "Evasive",
                  },
                },
              ],
            },
          },
          {
            type: "deal-damage",
            amount: 3,
            target: {
              selector: "all",
              count: "all",
              owner: "opponent",
              zones: ["play"],
              cardTypes: ["character"],
              filter: [
                {
                  type: "has-keyword",
                  keyword: "Evasive",
                },
              ],
            },
          },
        ],
      },
    },
  ],
};
