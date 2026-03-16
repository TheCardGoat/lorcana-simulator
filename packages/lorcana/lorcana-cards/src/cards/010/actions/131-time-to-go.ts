import type { ActionCard } from "@tcg/lorcana-types";

export const timeToGo: ActionCard = {
  id: "W3D",
  canonicalId: "ci_W3D",
  reprints: ["set10-131"],
  cardType: "action",
  name: "Time to Go!",
  i18n: {
    en: {
      name: "Time to Go!",
      text: "Banish chosen character of yours to draw 2 cards. If that character had a card under them, draw 3 cards instead.",
    },
    de: {
      name: "Zeit, zu gehen!",
      text: "Wähle und verbanne einen deiner Charaktere, um 2 Karten zu ziehen. Falls der Charakter mindestens eine Karte unter sich hatte, ziehe stattdessen 3 Karten.",
    },
    fr: {
      name: "Il est temps de partir !",
      text: "Choisissez l'un de vos personnages et bannissez-le pour piocher 2 cartes. S'il y avait une carte sous lui, piochez 3 cartes à la place.",
    },
    it: {
      name: "È ora di Andare!",
      text: "Esilia un tuo personaggio a tua scelta per pescare 2 carte. Se quel personaggio aveva una carta sotto di sé, pesca invece 3 carte.",
    },
  },
  inkType: ["ruby"],
  franchise: "Beauty and the Beast",
  set: "010",
  cardNumber: 131,
  rarity: "uncommon",
  cost: 3,
  inkable: true,
  externalIds: {
    lorcast: "crd_a34fbc1360b340faa269ab2347af7ee1",
    tcgPlayer: 660003,
  },
  text: "Banish chosen character of yours to draw 2 cards. If that character had a card under them, draw 3 cards instead.",
  abilities: [
    {
      type: "action",
      effect: {
        type: "conditional",
        condition: {
          type: "target-query",
          query: {
            selector: "all",
            reference: "selected-first",
            filters: [
              {
                type: "cards-under",
                comparison: "gte",
                value: 1,
              },
            ],
          },
          comparison: {
            operator: "gte",
            value: 1,
          },
        },
        then: {
          type: "sequence",
          steps: [
            {
              type: "banish",
              target: {
                selector: "chosen",
                count: 1,
                owner: "you",
                zones: ["play"],
                cardTypes: ["character"],
              },
            },
            {
              type: "draw",
              amount: 3,
              target: "CONTROLLER",
            },
          ],
        },
        else: {
          type: "sequence",
          steps: [
            {
              type: "banish",
              target: {
                selector: "chosen",
                count: 1,
                owner: "you",
                zones: ["play"],
                cardTypes: ["character"],
              },
            },
            {
              type: "draw",
              amount: 2,
              target: "CONTROLLER",
            },
          ],
        },
      },
    },
  ],
};
