import type { ActionCard } from "@tcg/lorcana-types";

export const fanTheFlames: ActionCard = {
  id: "iMK",
  canonicalId: "ci_iMK",
  reprints: ["set1-131"],
  cardType: "action",
  name: "Fan the Flames",
  i18n: {
    en: {
      name: "Fan the Flames",
      text: "Ready chosen character. They can't quest for the rest of this turn.",
    },
    de: {
      name: "Entfacht das Feuer!",
      text: "Mache einen Charakter deiner Wahl bereit. Er kann in diesem Zug nicht mehr erkunden.",
    },
    fr: {
      name: "ATTISER LES FLAMMES",
      text: "Choisissez un personnage et redressez-le. Il ne peut pas être envoyé à l'aventure pour le reste de ce tour.",
    },
    it: {
      name: "Fan the Flames",
      text: "Ready chosen character. They can't quest for the rest of this turn.",
    },
  },
  inkType: ["ruby"],
  franchise: "Beauty and the Beast",
  set: "001",
  cardNumber: 131,
  rarity: "uncommon",
  cost: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_0df4378c1d3d40409014b2502a9926b1",
    tcgPlayer: 505992,
  },
  text: "Ready chosen character. They can't quest for the rest of this turn.",
  abilities: [
    {
      type: "action",
      effect: {
        type: "sequence",
        steps: [
          {
            type: "ready",
            target: "CHOSEN_CHARACTER",
          },
          {
            type: "restriction",
            restriction: "cant-quest",
            duration: "this-turn",
            target: "CHOSEN_CHARACTER",
          },
        ],
      },
    },
  ],
};
