import type { ItemCard } from "@tcg/lorcana-types";

export const munchingsAndCrunchings: ItemCard = {
  id: "iM5",
  canonicalId: "ci_iM5",
  reprints: ["set10-033"],
  cardType: "item",
  name: "Munchings and Crunchings",
  i18n: {
    en: {
      name: "Munchings and Crunchings",
      text: [
        {
          title: "WHAT A JUICY APPLE",
          description: "{E} — Remove up to 2 damage from chosen character.",
        },
        {
          title: "COME ON OUT",
          description: "You pay 1 {I} less to play characters named Gurgi.",
        },
      ],
    },
    de: {
      name: "Ein Leckerschmeckerchen",
      text: [
        {
          title: "SO EIN SAFTIGER APFEL",
          description:
            "— Entferne bis zu 2 Schaden von einem Charakter deiner Wahl. KOMM HERAUS Du zahlst 1 weniger, um Gurgi-Charaktere auszuspielen.",
        },
      ],
    },
    fr: {
      name: "Mâchouiller et crachouiller",
      text: [
        {
          title: "BIEN JUTEUSE EN PLUS",
          description:
            "— Choisissez un personnage et retirez-lui jusqu'à 2 dommages. VIENS MAINTENANT Jouer des personnages nommés Gurgi vous coûte 1 de moins.",
        },
      ],
    },
    it: {
      name: "Mangiucchiare e Sgranocchiare",
      text: [
        {
          title: "CHE BELLA MELA SUCCOSA",
          description:
            "— Rimuovi fino a 2 danni da un personaggio a tua scelta. VIENI FUORI Paga 1 in meno per giocare i personaggi chiamati Gurghi.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Black Cauldron",
  set: "010",
  cardNumber: 33,
  rarity: "common",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_ef6c610fc243499c894239a4f0d50c00",
    tcgPlayer: 658768,
  },
  text: [
    {
      title: "WHAT A JUICY APPLE",
      description: "{E} — Remove up to 2 damage from chosen character.",
    },
    {
      title: "COME ON OUT",
      description: "You pay 1 {I} less to play characters named Gurgi.",
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
          cardTypes: ["character"],
          count: 1,
          owner: "any",
          selector: "chosen",
          zones: ["play"],
        },
        type: "remove-damage",
        upTo: true,
      },
      id: "16w-1",
      text: "WHAT A JUICY APPLE {E} — Remove up to 2 damage from chosen character.",
      type: "activated",
    },
  ],
};
