import type { ActionCard } from "@tcg/lorcana-types";

export const repair: ActionCard = {
  id: "2j4",
  canonicalId: "ci_2j4",
  reprints: ["set3-162"],
  cardType: "action",
  name: "Repair",
  i18n: {
    en: {
      name: "Repair",
      text: "Remove up to 3 damage from one of your locations or characters.",
    },
    de: {
      name: "Reparieren",
      text: "Entferne bis zu 3 Schaden von einem deiner Charaktere oder Orte.",
    },
    fr: {
      name: "Réparation",
      text: "Retirez jusqu'à 3 jetons Dommage de l'un de vos lieux ou personnages.",
    },
    it: {
      name: "Riparare",
      text: "Rimuovi fino a 3 danni da un tuo luogo o personaggio.",
    },
  },
  inkType: ["sapphire"],
  franchise: "Atlantis",
  set: "003",
  cardNumber: 162,
  rarity: "common",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_e2433a86940b43e8ac63f6eeddedf085",
    tcgPlayer: 538305,
  },
  text: "Remove up to 3 damage from one of your locations or characters.",
  abilities: [
    {
      type: "action",
      effect: {
        type: "remove-damage",
        amount: 3,
        upTo: true,
        target: {
          cardTypes: ["location", "character"],
          count: 1,
          owner: "you",
          selector: "chosen",
          zones: ["play"],
        },
      },
    },
  ],
};
