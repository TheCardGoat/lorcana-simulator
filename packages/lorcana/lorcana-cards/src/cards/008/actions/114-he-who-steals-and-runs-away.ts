import type { ActionCard } from "@tcg/lorcana-types";

export const heWhoStealsAndRunsAway: ActionCard = {
  id: "STB",
  canonicalId: "ci_STB",
  reprints: ["set8-114"],
  cardType: "action",
  name: "He Who Steals and Runs Away",
  i18n: {
    en: {
      name: "He Who Steals and Runs Away",
      text: "Banish chosen item. Draw a card.",
    },
    de: {
      name: "Der, der stiehlt und nichts gewinnt",
      text: "Verbanne einen Gegenstand deiner Wahl. Ziehe 1 Karte.",
    },
    fr: {
      name: "Qui prend son avion de chassage",
      text: "Choisissez un objet et bannissez-le. Piochez une carte.",
    },
    it: {
      name: "Se colui che ruba poi scappa via",
      text: "Esilia un oggetto a tua scelta. Pesca una carta.",
    },
  },
  inkType: ["emerald"],
  franchise: "Talespin",
  set: "008",
  cardNumber: 114,
  rarity: "common",
  cost: 3,
  inkable: true,
  externalIds: {
    lorcast: "crd_b575a1f23d864e64841909db44f25221",
    tcgPlayer: 631683,
  },
  text: "Banish chosen item. Draw a card.",
  abilities: [
    {
      effect: {
        steps: [
          {
            target: {
              selector: "chosen",
              count: 1,
              owner: "any",
              zones: ["play"],
              cardTypes: ["item"],
            },
            type: "banish",
          },
          {
            amount: 1,
            target: "CONTROLLER",
            type: "draw",
          },
        ],
        type: "sequence",
      },
      id: "h00-1",
      text: "Banish chosen item. Draw a card.",
      type: "action",
    },
  ],
};
