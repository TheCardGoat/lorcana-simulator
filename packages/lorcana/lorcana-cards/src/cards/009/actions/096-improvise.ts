import type { ActionCard } from "@tcg/lorcana-types";

export const improvise: ActionCard = {
  id: "9XU",
  canonicalId: "ci_nRj",
  reprints: ["set2-099", "set9-096"],
  cardType: "action",
  name: "Improvise",
  i18n: {
    en: {
      name: "Improvise",
      text: "Chosen character gets +1 {S} this turn. Draw a card.",
    },
    de: {
      name: "Improvisieren",
      text: "Gib einem Charakter deiner Wahl in diesem Zug +1. Ziehe 1 Karte.",
    },
    fr: {
      name: "Improviser",
      text: "Choisissez un personnage, il gagne +1 pour le reste de ce tour. Piochez une carte.",
    },
    it: {
      name: "Improvvisare",
      text: "Un personaggio a tua scelta riceve +1 per questo turno. Pesca una carta.",
    },
  },
  inkType: ["emerald"],
  franchise: "Mulan",
  set: "009",
  cardNumber: 96,
  rarity: "common",
  cost: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_856e21edc8814f10863eae7f75635f23",
    tcgPlayer: 650034,
  },
  text: "Chosen character gets +1 {S} this turn. Draw a card.",
  abilities: [
    {
      type: "action",
      effect: {
        type: "sequence",
        steps: [
          {
            type: "modify-stat",
            stat: "strength",
            modifier: 1,
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
