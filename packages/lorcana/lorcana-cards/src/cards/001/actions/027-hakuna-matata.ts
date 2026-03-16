import type { ActionCard } from "@tcg/lorcana-types";

export const hakunaMatata: ActionCard = {
  id: "2U7",
  canonicalId: "ci_2U7",
  reprints: ["set1-027"],
  cardType: "action",
  name: "Hakuna Matata",
  i18n: {
    en: {
      name: "Hakuna Matata",
      text: "Remove up to 3 damage from each of your characters.",
    },
    de: {
      name: "Hakuna Matata",
      text: "Entferne bis zu 3 Schaden von jedem deiner Charaktere.",
    },
    fr: {
      name: "HAKUNA MATATA",
      text: "Retirez jusqu'à 3 jetons Dommage de chacun de vos personnages.",
    },
    it: {
      name: "Hakuna Matata",
      text: "(Un personaggio con costo 4 o superiore può per cantare questa canzone gratis.) Rimuovi fino a 3 danni da ogni tuo personaggio.",
    },
  },
  inkType: ["amber"],
  franchise: "Lion King",
  set: "001",
  cardNumber: 27,
  rarity: "common",
  cost: 4,
  inkable: true,
  externalIds: {
    lorcast: "crd_2894c74113e7436abf095fe35dde6ea8",
    tcgPlayer: 506124,
  },
  text: "Remove up to 3 damage from each of your characters.",
  actionSubtype: "song",
  abilities: [
    {
      id: "10e-1",
      text: "Remove up to 3 damage from each of your characters.",
      name: "Hakuna Matata",
      effect: {
        amount: 3,
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
