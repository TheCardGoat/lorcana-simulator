import type { ActionCard } from "@tcg/lorcana-types";

export const itCallsMe: ActionCard = {
  id: "LAX",
  canonicalId: "ci_LAX",
  reprints: ["set3-061"],
  cardType: "action",
  name: "It Calls Me",
  i18n: {
    en: {
      name: "It Calls Me",
      text: "Draw a card. Then, choose up to 3 cards from chosen opponent's discard and shuffle them into their deck.",
    },
    de: {
      name: "Es ruft mich",
      text: "Ziehe 1 Karte. Mische danach bis zu 3 Karten deiner Wahl aus einem gegnerischen Ablagestapel zurück in das zugehörige Deck.",
    },
    fr: {
      name: "Il m'appelle",
      text: "Piochez une carte. Choisissez ensuite jusqu'à 3 cartes de la défausse d'un adversaire, puis remettez-les dans sa pioche et remélangez-la.",
    },
    it: {
      name: "Per Nome",
      text: "(Un personaggio con costo 1 o superiore può per giocare questa canzone gratis.) Pesca una carta. Dopodiché, scegli fino a 3 carte dagli scarti di un avversario a tua scelta e rimescolale nel suo mazzo.",
    },
  },
  inkType: ["amethyst"],
  franchise: "Moana",
  set: "003",
  cardNumber: 61,
  rarity: "uncommon",
  cost: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_7a47845bdb01452e9faae9028fb22eeb",
    tcgPlayer: 539078,
  },
  text: "Draw a card. Then, choose up to 3 cards from chosen opponent's discard and shuffle them into their deck.",
  actionSubtype: "song",
  abilities: [
    {
      effect: {
        steps: [
          {
            amount: 1,
            target: "CONTROLLER",
            type: "draw",
          },
          {
            type: "shuffle-into-deck",
            intoDeck: "owner",
            target: {
              selector: "chosen",
              count: {
                upTo: 3,
              },
              owner: "opponent",
              zones: ["discard"],
              cardTypes: ["action", "character", "item", "location"],
            },
          },
        ],
        type: "sequence",
      },
      type: "action",
    },
  ],
};
