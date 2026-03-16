import type { ActionCard } from "@tcg/lorcana-types";

export const distract: ActionCard = {
  id: "d5v",
  canonicalId: "ci_ktc",
  reprints: ["set3-159", "set11-164"],
  cardType: "action",
  name: "Distract",
  i18n: {
    en: {
      name: "Distract",
      text: "Chosen character gets -2 {S} this turn. Draw a card.",
    },
    de: {
      name: "Ablenken",
      text: "Gib einem Charakter deiner Wahl in diesem Zug -2. Ziehe 1 Karte.",
    },
    fr: {
      name: "Distraction",
      text: "Choisissez un personnage, il subit -2 pour le reste de ce tour. Piochez une carte.",
    },
    it: {
      name: "Distrarre",
      text: "Un personaggio a tua scelta riceve -2 per questo turno. Pesca una carta.",
    },
  },
  inkType: ["sapphire"],
  franchise: "Mickey's Christmas Carol",
  set: "011",
  cardNumber: 164,
  rarity: "common",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_8ca0325f7667410d8b83628e02028294",
    tcgPlayer: 676228,
  },
  text: "Chosen character gets -2 {S} this turn. Draw a card.",
  abilities: [
    {
      type: "action",
      effect: {
        type: "sequence",
        steps: [
          {
            type: "modify-stat",
            stat: "strength",
            modifier: -2,
            duration: "this-turn",
            target: "CHOSEN_CHARACTER",
          },
          {
            type: "draw",
            amount: 1,
            target: "CONTROLLER",
          },
        ],
      },
    },
  ],
};
