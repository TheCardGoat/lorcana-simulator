import type { ActionCard } from "@tcg/lorcana-types";

export const firstAid: ActionCard = {
  id: "qRf",
  canonicalId: "ci_qRf",
  reprints: ["set4-027"],
  cardType: "action",
  name: "First Aid",
  i18n: {
    en: {
      name: "First Aid",
      text: "Remove up to 1 damage from each of your characters.",
    },
    de: {
      name: "Erste Hilfe",
      text: "Entferne bis zu 1 Schaden von jedem deiner Charaktere.",
    },
    fr: {
      name: "Premiers Secours",
      text: "Retirez jusqu'à 1 jeton Dommage de chacun de vos personnages.",
    },
    it: {
      name: "Primo Soccorso",
      text: "Rimuovi fino a 1 danno da ogni tuo personaggio.",
    },
  },
  inkType: ["amber"],
  set: "004",
  cardNumber: 27,
  rarity: "common",
  cost: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_258d12e6617d4e648d73be028f191b40",
    tcgPlayer: 550563,
  },
  text: "Remove up to 1 damage from each of your characters.",
  abilities: [
    {
      id: "qRf-1",
      text: "Remove up to 1 damage from each of your characters.",
      name: "First Aid",
      effect: {
        amount: 1,
        target: {
          cardTypes: ["character"],
          count: "all",
          owner: "you",
          selector: "all",
          zones: ["play"],
        },
        type: "remove-damage",
        upTo: true,
      },
      type: "action",
    },
  ],
};
