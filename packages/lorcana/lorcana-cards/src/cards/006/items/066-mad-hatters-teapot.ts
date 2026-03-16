import type { ItemCard } from "@tcg/lorcana-types";

export const madHattersTeapot: ItemCard = {
  id: "fMK",
  canonicalId: "ci_fMK",
  reprints: ["set6-066"],
  cardType: "item",
  name: "Mad Hatter's Teapot",
  i18n: {
    en: {
      name: "Mad Hatter's Teapot",
      text: [
        {
          title: "NO ROOM, NO ROOM",
          description:
            "{E}, 1 {I} — Each opponent puts the top card of their deck into their discard.",
        },
      ],
    },
    de: {
      name: "Teekanne des verrückten Hutmachers",
      text: [
        {
          title: "HIER IST KEIN PLATZ MEHR, 1",
          description:
            "— Alle gegnerischen Mitspielenden legen die oberste Karte ihres Decks auf ihren Ablagestapel.",
        },
      ],
    },
    fr: {
      name: "Théière du Chapelier Fou",
      text: [
        {
          title: "PAS D'PLACE, PAS D'PLACE, 1",
          description:
            "— Chaque adversaire place la carte du dessus de sa pioche dans sa défausse.",
        },
      ],
    },
    it: {
      name: "Teiera del Cappellaio Matto",
      text: [
        {
          title: "NON",
          description:
            "C'È POSTO, NON C'È POSTO, 1 — Ogni avversario mette la prima carta del suo mazzo nei suoi scarti.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Alice in Wonderland",
  set: "006",
  cardNumber: 66,
  rarity: "common",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_075482312a124f6585f77be3a693f63f",
    tcgPlayer: 578175,
  },
  text: [
    {
      title: "NO ROOM, NO ROOM",
      description: "{E}, 1 {I} — Each opponent puts the top card of their deck into their discard.",
    },
  ],
  abilities: [
    {
      id: "2bj-1",
      name: "NO ROOM, NO ROOM",
      type: "activated",
      cost: {
        exert: true,
        ink: 1,
      },
      effect: {
        type: "mill",
        amount: 1,
        target: "EACH_OPPONENT",
      },
      text: "NO ROOM, NO ROOM {E}, 1 {I} — Each opponent puts the top card of their deck into their discard.",
    },
  ],
};
