import type { ActionCard } from "@tcg/lorcana-types";

export const energyBlast: ActionCard = {
  id: "uDQ",
  canonicalId: "ci_uDQ",
  reprints: ["set6-131"],
  cardType: "action",
  name: "Energy Blast",
  i18n: {
    en: {
      name: "Energy Blast",
      text: "Banish chosen character. Draw a card.",
    },
    de: {
      name: "Energie-Explosion",
      text: "Verbanne einen Charakter deiner Wahl. Ziehe 1 Karte.",
    },
    fr: {
      name: "Souffle d’énergie",
      text: "Choisissez un personnage et bannissez-le. Piochez une carte.",
    },
    it: {
      name: "Esplosione di Energia",
      text: "Esilia un personaggio a tua scelta. Pesca una carta.",
    },
  },
  inkType: ["ruby"],
  franchise: "Aladdin",
  set: "006",
  cardNumber: 131,
  rarity: "rare",
  cost: 7,
  inkable: false,
  externalIds: {
    lorcast: "crd_d65c18ee25cd417bbb2c14e01f2a69a5",
    tcgPlayer: 591982,
  },
  text: "Banish chosen character. Draw a card.",
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
              cardTypes: ["character"],
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
      id: "1j8-1",
      text: "Banish chosen character. Draw a card.",
      type: "action",
    },
  ],
};
