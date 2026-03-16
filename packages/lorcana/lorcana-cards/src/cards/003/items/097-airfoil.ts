import type { ItemCard } from "@tcg/lorcana-types";

export const airfoil: ItemCard = {
  id: "L6c",
  canonicalId: "ci_L6c",
  reprints: ["set3-097"],
  cardType: "item",
  name: "Airfoil",
  i18n: {
    en: {
      name: "Airfoil",
      text: [
        {
          title: "I GOT TO BE GOING",
          description: "{E} — If you've played 2 or more actions this turn, draw a card.",
        },
      ],
    },
    de: {
      name: "Wolkensurfer",
      text: [
        {
          title: "ICH MUSS JETZT GEHEN",
          description:
            "— Falls du in diesem Zug mindestens 2 Aktionen ausgespielt hast, ziehe 1 Karte.",
        },
      ],
    },
    fr: {
      name: "Aéro-surf",
      text: [
        {
          title: "IL FAUT QUE J'Y AILLE",
          description:
            "— Si vous avez joué au moins 2 cartes Action durant votre tour, piochez une carte.",
        },
      ],
    },
    it: {
      name: "Surf Aereo",
      text: [
        {
          title: "IO ALLORA VADO",
          description: "— Se hai giocato 2 o più azioni in questo turno, pesca 1 carta.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Talespin",
  set: "003",
  cardNumber: 97,
  rarity: "common",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_bb11d0da1233459c84ade5157719208f",
    tcgPlayer: 537757,
  },
  text: [
    {
      title: "I GOT TO BE GOING",
      description: "{E} — If you've played 2 or more actions this turn, draw a card.",
    },
  ],
  abilities: [
    {
      id: "1kp-1",
      cost: {
        exert: true,
      },
      effect: {
        condition: {
          type: "turn-metric",
          metric: "played-actions",
          comparison: {
            operator: "gte",
            value: 2,
          },
        },
        then: {
          amount: 1,
          target: "CONTROLLER",
          type: "draw",
        },
        type: "conditional",
      },
      type: "activated",
      name: "I GOT TO BE GOING",
      text: "I GOT TO BE GOING {E} — If you've played 2 or more actions this turn, draw a card.",
    },
  ],
};
