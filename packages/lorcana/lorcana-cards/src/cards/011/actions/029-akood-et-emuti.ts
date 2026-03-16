import type { ActionCard } from "@tcg/lorcana-types";

export const akoodEtEmuti: ActionCard = {
  id: "Y3X",
  canonicalId: "ci_Y3X",
  reprints: ["set11-029"],
  cardType: "action",
  name: "Akood et Emuti",
  i18n: {
    en: {
      name: "Akood et Emuti",
      text: "You pay 2 {I} less for the next character you play this turn. Draw a card.",
    },
    de: {
      name: "Akood et Emuti",
      text: "Du zahlst 2 weniger für den nächsten Charakter, den du in diesem Zug ausspielst. Ziehe 1 Karte.",
    },
    fr: {
      name: "Akood et Emuti",
      text: "Le prochain personnage que vous jouez ce tour-ci vous coûte 2 de moins. Piochez une carte.",
    },
    it: {
      name: "Akood et Emuti",
      text: "(Un personaggio con costo 3 o superiore può per cantare questa canzone gratis.) Paga 2 in meno per giocare il tuo prossimo personaggio per questo turno. Pesca una carta.",
    },
  },
  inkType: ["amber"],
  franchise: "Lilo and Stitch",
  set: "011",
  cardNumber: 29,
  rarity: "rare",
  cost: 3,
  inkable: false,
  externalIds: {
    lorcast: "crd_ff15d454e2f84f89a64bf17216e0b5f4",
    tcgPlayer: 674689,
  },
  text: "You pay 2 {I} less for the next character you play this turn. Draw a card.",
  actionSubtype: "song",
  abilities: [
    {
      type: "action",
      text: "You pay 2 {I} less for the next character you play this turn. Draw a card.",
      effect: {
        type: "sequence",
        steps: [
          {
            type: "cost-reduction",
            amount: 2,
            cardType: "character",
            duration: "next-play-this-turn",
            target: "CONTROLLER",
          },
          {
            type: "draw",
            amount: 1,
            target: "CONTROLLER",
          },
        ],
      },
    },
  ],
};
