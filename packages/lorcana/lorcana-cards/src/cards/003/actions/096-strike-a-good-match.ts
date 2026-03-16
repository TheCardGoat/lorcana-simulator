import type { ActionCard } from "@tcg/lorcana-types";

export const strikeAGoodMatch: ActionCard = {
  id: "Uzr",
  canonicalId: "ci_vCE",
  reprints: ["set3-096", "set11-094"],
  cardType: "action",
  name: "Strike a Good Match",
  i18n: {
    en: {
      name: "Strike a Good Match",
      text: "Draw 2 cards, then choose and discard a card.",
    },
    de: {
      name: "Ein guter Ehemann",
      text: "Ziehe 2 Karten. Wähle danach 1 Karte aus deiner Hand und wirf sie ab.",
    },
    fr: {
      name: "Crois-moi j'ai vu pire",
      text: "Piochez 2 cartes puis choisissez et défaussez une carte.",
    },
    it: {
      name: "Un Uomo Purché Sia",
      text: "(Un personaggio con costo 2 o superiore può per giocare questa canzone gratis.) Pesca 2 carte, poi scegli e scarta 1 carta.",
    },
  },
  inkType: ["emerald"],
  franchise: "Mulan",
  set: "003",
  cardNumber: 96,
  rarity: "common",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_5423fd35369b41ebbfff99eeb1928fc4",
    tcgPlayer: 674693,
  },
  text: "Draw 2 cards, then choose and discard a card.",
  actionSubtype: "song",
  abilities: [
    {
      type: "action",
      effect: {
        type: "sequence",
        steps: [
          {
            amount: 2,
            target: "CONTROLLER",
            type: "draw",
          },
          {
            amount: 1,
            chosen: true,
            target: "CONTROLLER",
            from: "hand",
            type: "discard",
          },
        ],
      },
    },
  ],
};
