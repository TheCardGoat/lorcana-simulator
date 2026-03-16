import type { ActionCard } from "@tcg/lorcana-types";

export const marchingOffToBattle: ActionCard = {
  id: "P9W",
  canonicalId: "ci_P9W",
  reprints: ["set11-129"],
  cardType: "action",
  name: "Marching Off to Battle",
  i18n: {
    en: {
      name: "Marching Off to Battle",
      text: "If a character was banished this turn, draw 2 cards.",
    },
    de: {
      name: "Marschier'n wir für den Kaiser",
      text: "Falls in diesem Zug ein Charakter verbannt wurde, ziehe 2 Karten.",
    },
    fr: {
      name: "Vers notre champ de bataille",
      text: "Si un personnage a été banni ce tour-ci, piochez 2 cartes.",
    },
    it: {
      name: "Marciamo Verso il Fronte",
      text: "(Un personaggio con costo 4 o superiore può per cantare questa canzone gratis.) Se un personaggio è stato esiliato in questo turno, pesca 2 carte.",
    },
  },
  inkType: ["ruby"],
  franchise: "Mulan",
  set: "011",
  cardNumber: 129,
  rarity: "common",
  cost: 4,
  inkable: true,
  externalIds: {
    lorcast: "crd_ec2f9a5da94841b68ac5f69bfed3c1bd",
    tcgPlayer: 675506,
  },
  text: "If a character was banished this turn, draw 2 cards.",
  actionSubtype: "song",
  abilities: [
    {
      id: "yrv-1",
      effect: {
        condition: {
          type: "turn-metric",
          metric: "banished-characters",
          comparison: {
            operator: "gte",
            value: 1,
          },
        },
        then: {
          amount: 2,
          target: "CONTROLLER",
          type: "draw",
        },
        type: "conditional",
      },
      type: "action",
      text: "If a character was banished this turn, draw 2 cards.",
    },
  ],
};
