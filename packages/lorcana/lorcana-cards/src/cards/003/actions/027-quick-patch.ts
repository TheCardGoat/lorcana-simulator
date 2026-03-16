import type { ActionCard } from "@tcg/lorcana-types";

export const quickPatch: ActionCard = {
  id: "Wq8",
  canonicalId: "ci_Wq8",
  reprints: ["set3-027"],
  cardType: "action",
  name: "Quick Patch",
  i18n: {
    en: {
      name: "Quick Patch",
      text: "Remove up to 3 damage from chosen location.",
    },
    de: {
      name: "Provisorischer Flicken",
      text: "Entferne bis zu 3 Schaden von einem Ort deiner Wahl.",
    },
    fr: {
      name: "Réparation de fortune",
      text: "Choisissez un lieu et retirez-lui jusqu'à 3 jetons Dommage.",
    },
    it: {
      name: "Riparazione Rapida",
      text: "Rimuovi fino a 3 danni da un luogo a tua scelta.",
    },
  },
  inkType: ["amber"],
  franchise: "Talespin",
  set: "003",
  cardNumber: 27,
  rarity: "common",
  cost: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_5364fdf0cf144ac38d2d7c824f8cc72f",
    tcgPlayer: 538310,
  },
  text: "Remove up to 3 damage from chosen location.",
  abilities: [
    {
      type: "action",
      effect: {
        type: "remove-damage",
        upTo: true,
        amount: 3,
        target: {
          cardTypes: ["location"],
          count: 1,
          owner: "any",
          selector: "chosen",
          zones: ["play"],
        },
      },
    },
  ],
};
