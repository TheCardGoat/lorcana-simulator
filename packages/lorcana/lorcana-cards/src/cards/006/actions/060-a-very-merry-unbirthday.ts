import type { ActionCard } from "@tcg/lorcana-types";

export const aVeryMerryUnbirthday: ActionCard = {
  id: "Nv8",
  canonicalId: "ci_Nv8",
  reprints: ["set6-060"],
  cardType: "action",
  name: "A Very Merry Unbirthday",
  i18n: {
    en: {
      name: "A Very Merry Unbirthday",
      text: "Each opponent puts the top 2 cards of their deck into their discard.",
    },
    de: {
      name: "Viel Glück zum Nichtgeburtstag",
      text: "Alle gegnerischen Mitspielenden legen die obersten 2 Karten ihres Decks auf ihren Ablagestapel.",
    },
    fr: {
      name: "Un Joyeux non-anniversaire",
      text: "Chaque adversaire place les 2 cartes du dessus de sa pioche dans sa défausse.",
    },
    it: {
      name: "Un Buon Non Compleanno",
      text: "(Un personaggio con costo 1 o superiore può per cantare questa canzone gratis.) Ogni avversario mette le prime 2 carte del suo mazzo nei suoi scarti.",
    },
  },
  inkType: ["amethyst"],
  franchise: "Alice in Wonderland",
  set: "006",
  cardNumber: 60,
  rarity: "common",
  cost: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_6b0de2d0a5b84b5f852ba2a8eccd1a17",
    tcgPlayer: 591114,
  },
  text: "Each opponent puts the top 2 cards of their deck into their discard.",
  actionSubtype: "song",
  abilities: [
    {
      type: "action",
      text: "Each opponent puts the top 2 cards of their deck into their discard.",
      effect: {
        type: "mill",
        amount: 2,
        target: "EACH_OPPONENT",
      },
    },
  ],
};
