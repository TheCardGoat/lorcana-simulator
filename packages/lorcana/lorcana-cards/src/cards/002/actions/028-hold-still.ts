import type { ActionCard } from "@tcg/lorcana-types";

export const holdStill: ActionCard = {
  id: "T4i",
  canonicalId: "ci_T4i",
  reprints: ["set2-028"],
  cardType: "action",
  name: "Hold Still",
  i18n: {
    en: {
      name: "Hold Still",
      text: "Remove up to 4 damage from chosen character.",
    },
    de: {
      name: "Nun halt doch still",
      text: "Entferne bis zu 4 Schaden von einem Charakter deiner Wahl.",
    },
    fr: {
      name: "Ne bougez pas",
      text: "Choisissez un personnage et retirez-lui jusqu'à 4 jetons Dommage.",
    },
    it: {
      name: "Hold Still",
      text: "Remove up to 4 damage from chosen character.",
    },
  },
  inkType: ["amber"],
  franchise: "Beauty and the Beast",
  set: "002",
  cardNumber: 28,
  rarity: "common",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_7672e43ea7ac4d9a8a51e463a77b6358",
    tcgPlayer: 527726,
  },
  text: "Remove up to 4 damage from chosen character.",
  abilities: [
    {
      type: "action",
      effect: {
        amount: 4,
        target: "CHOSEN_CHARACTER",
        type: "remove-damage",
        upTo: true,
      },
    },
  ],
};
