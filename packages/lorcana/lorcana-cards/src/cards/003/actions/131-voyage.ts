import type { ActionCard } from "@tcg/lorcana-types";

export const voyage: ActionCard = {
  id: "Xj3",
  canonicalId: "ci_Xj3",
  reprints: ["set3-131"],
  cardType: "action",
  name: "Voyage",
  i18n: {
    en: {
      name: "Voyage",
      text: "Move up to 2 characters of yours to the same location for free.",
    },
    de: {
      name: "Seefahrt",
      text: "Wähle bis zu 2 deiner Charaktere und bewege sie kostenlos zu dem selben Ort.",
    },
    fr: {
      name: "Voyage",
      text: "Déplacez gratuitement jusqu'à 2 de vos personnages sur un même lieu.",
    },
    it: {
      name: "Navigare",
      text: "Muovi fino a 2 tuoi personaggi nello stesso luogo, gratis.",
    },
  },
  inkType: ["ruby"],
  franchise: "Moana",
  set: "003",
  cardNumber: 131,
  rarity: "common",
  cost: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_cc0c5bf9ccbf4884926461d06eed76b0",
    tcgPlayer: 537384,
  },
  text: "Move up to 2 characters of yours to the same location for free.",
  abilities: [
    {
      type: "action",
      effect: {
        type: "move-to-location",
        cost: "free",
        character: {
          selector: "chosen",
          count: {
            upTo: 2,
          },
          owner: "you",
          zones: ["play"],
          cardTypes: ["character"],
        },
        location: {
          selector: "chosen",
          count: 1,
          owner: "you",
          zones: ["play"],
          cardTypes: ["location"],
        },
      },
    },
  ],
};
