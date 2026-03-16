import type { ActionCard } from "@tcg/lorcana-types";

export const visitingChristmasPast: ActionCard = {
  id: "RW2",
  canonicalId: "ci_RW2",
  reprints: ["set11-162"],
  cardType: "action",
  name: "Visiting Christmas Past",
  i18n: {
    en: {
      name: "Visiting Christmas Past",
      text: "Put any number of cards from under your characters and locations into your inkwell facedown and exerted.",
    },
    de: {
      name: "Reise in die vergangene Weihnacht",
      text: "Lege eine beliebige Anzahl an Karten, die unter deinen Charakteren und Orten liegen, verdeckt und erschöpft in deinen Tintenvorrat.",
    },
    fr: {
      name: "Visite des Noëls passés",
      text: "Placez dans votre réserve d'encre, face cachée et épuisé, n'importe quel nombre de cartes provenant de sous vos personnages et de sous vos lieux.",
    },
    it: {
      name: "Verso i Natali Passati",
      text: "Aggiungi un qualsiasi numero di carte da sotto i tuoi personaggi e luoghi al tuo calamaio, a faccia in giù e impegnate.",
    },
  },
  inkType: ["sapphire"],
  franchise: "Mickey's Christmas Carol",
  set: "011",
  cardNumber: 162,
  rarity: "rare",
  cost: 3,
  inkable: true,
  externalIds: {
    lorcast: "crd_8c8dd7b9235e4b778aeff7b8b4da14ce",
    tcgPlayer: 673742,
  },
  text: "Put any number of cards from under your characters and locations into your inkwell facedown and exerted.",
  abilities: [
    {
      id: "z49-1",
      type: "action",
      text: "Put any number of cards from under your characters and locations into your inkwell facedown and exerted.",
      effect: {
        type: "move-cards-from-under",
        source: "selected",
        destination: "inkwell-facedown-exerted",
        target: {
          selector: "chosen",
          count: {
            upTo: 99,
          },
          zones: ["limbo"],
          filter: [
            {
              type: "under-parent",
              owner: "you",
              cardTypes: ["character", "location"],
            },
          ],
        },
      },
    },
  ],
};
