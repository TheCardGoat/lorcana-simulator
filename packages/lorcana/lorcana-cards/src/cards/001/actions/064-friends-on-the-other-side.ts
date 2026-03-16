import type { ActionCard } from "@tcg/lorcana-types";

export const friendsOnTheOtherSide: ActionCard = {
  id: "3E2",
  canonicalId: "ci_3E2",
  reprints: ["set1-064"],
  cardType: "action",
  name: "Friends on the Other Side",
  i18n: {
    en: {
      name: "Friends on the Other Side",
      text: "Draw 2 cards.",
    },
    de: {
      name: "Freunde im Schattenreich",
      text: "Ziehe 2 Karten.",
    },
    fr: {
      name: "MES AMIS DE L'AU-DELÀ",
      text: "Piochez 2 cartes.",
    },
    it: {
      name: "Gli Amici nell'Aldilà",
      text: "(Un personaggio con costo 3 o superiore può per cantare questa canzone gratis.) Pesca 2 carte.",
    },
  },
  inkType: ["amethyst"],
  franchise: "Princess and the Frog",
  set: "001",
  cardNumber: 64,
  rarity: "common",
  cost: 3,
  inkable: true,
  externalIds: {
    lorcast: "crd_f9097c53f99d488aa8685b73ea5a9373",
    tcgPlayer: 494100,
  },
  text: "Draw 2 cards.",
  actionSubtype: "song",
  abilities: [
    {
      type: "action",
      effect: {
        amount: 2,
        target: "CONTROLLER",
        type: "draw",
      },
    },
  ],
};
