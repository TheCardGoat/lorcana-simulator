import type { ActionCard } from "@tcg/lorcana-types";

export const friendLikeMe: ActionCard = {
  id: "wbB",
  canonicalId: "ci_wbB",
  reprints: ["set3-160"],
  cardType: "action",
  name: "Friend Like Me",
  i18n: {
    en: {
      name: "Friend Like Me",
      text: "Each player puts the top 3 cards of their deck into their inkwell facedown and exerted.",
    },
    de: {
      name: "Einen Freund wie mich",
      text: [
        {
          title: "Alle Mitspielenden",
          description:
            "(auch du) legen die obersten 3 Karten ihres Decks verdeckt und erschöpft in ihren Tintenvorrat.",
        },
      ],
    },
    fr: {
      name: "Je suis ton meilleur ami",
      text: "Chaque joueur place les 3 premières cartes de sa pioche dans sa réserve d'encre, faces cachées et épuisées.",
    },
    it: {
      name: "Un Amico Come Me",
      text: "(Un personaggio con costo 5 o superiore può per giocare questa canzone gratis.) Ogni giocatore aggiunge le prime 3 carte del proprio mazzo al suo calamaio, a faccia in giù e impegnate.",
    },
  },
  inkType: ["sapphire"],
  franchise: "Aladdin",
  set: "003",
  cardNumber: 160,
  rarity: "rare",
  cost: 5,
  inkable: true,
  externalIds: {
    lorcast: "crd_dda178292c7746de913c4dacee008ac9",
    tcgPlayer: 536285,
  },
  text: "Each player puts the top 3 cards of their deck into their inkwell facedown and exerted.",
  actionSubtype: "song",
  abilities: [
    {
      effect: {
        type: "sequence",
        steps: [
          {
            type: "put-into-inkwell",
            source: "top-of-deck",
            target: "EACH_PLAYER",
            facedown: true,
            exerted: true,
          },
          {
            type: "put-into-inkwell",
            source: "top-of-deck",
            target: "EACH_PLAYER",
            facedown: true,
            exerted: true,
          },
          {
            type: "put-into-inkwell",
            source: "top-of-deck",
            target: "EACH_PLAYER",
            facedown: true,
            exerted: true,
          },
        ],
      },
      id: "h7y-1",
      text: "Each player puts the top 3 cards of their deck into their inkwell facedown and exerted.",
      type: "action",
    },
  ],
};
