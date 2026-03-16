import type { ItemCard } from "@tcg/lorcana-types";

export const wildcatsWrench: ItemCard = {
  id: "vtL",
  canonicalId: "ci_vtL",
  reprints: ["set3-031"],
  cardType: "item",
  name: "Wildcat's Wrench",
  i18n: {
    en: {
      name: "Wildcat's Wrench",
      text: [
        {
          title: "REBUILD",
          description: "{E} — Remove up to 2 damage from chosen location.",
        },
      ],
    },
    de: {
      name: "Wildkatz' Schraubenschlüssel",
      text: [
        {
          title: "WIEDERHERSTELLEN",
          description: "— Entferne bis zu 2 Schaden von einem Ort deiner Wahl.",
        },
      ],
    },
    fr: {
      name: "Clé de Turbo",
      text: [
        {
          title: "RÉPARATION",
          description: "— Choisissez un Lieu et retirez-lui jusqu'à 2 jetons Dommage.",
        },
      ],
    },
    it: {
      name: "Chiave Inglese di Valvola",
      text: [
        {
          title: "RICOSTRUIRE",
          description: "— Rimuovi fino a 2 danni da un luogo a tua scelta.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Talespin",
  set: "003",
  cardNumber: 31,
  rarity: "uncommon",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_e46266028977431da15b820d9f665664",
    tcgPlayer: 538229,
  },
  text: [
    {
      title: "REBUILD",
      description: "{E} — Remove up to 2 damage from chosen location.",
    },
  ],
  abilities: [
    {
      cost: {
        exert: true,
      },
      effect: {
        amount: 2,
        target: {
          cardTypes: ["location"],
          count: 1,
          owner: "any",
          selector: "chosen",
          zones: ["play"],
        },
        type: "remove-damage",
        upTo: true,
      },
      id: "1wk-1",
      name: "REBUILD",
      text: "REBUILD {E} — Remove up to 2 damage from chosen location.",
      type: "activated",
    },
  ],
};
