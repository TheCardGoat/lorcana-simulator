import type { ActionCard } from "@tcg/lorcana-types";

export const theReturnOfHercules: ActionCard = {
  id: "yAe",
  canonicalId: "ci_B2d",
  reprints: ["set7-118"],
  cardType: "action",
  name: "The Return of Hercules",
  i18n: {
    en: {
      name: "The Return of Hercules",
      text: "Each player may reveal a character card from their hand and play it for free.",
    },
    de: {
      name: "Die Rückkehr von Hercules",
      text: [
        {
          title: "Alle Mitspielenden",
          description:
            "(auch du) dürfen je 1 Charakterkarte aus ihrer Hand vorzeigen und kostenlos ausspielen.",
        },
      ],
    },
    fr: {
      name: "Le retour d’Hercule",
      text: "Chaque joueur peut révéler une carte Personnage de sa main et la jouer gratuitement.",
    },
    it: {
      name: "Il Ritorno di Ercole",
      text: "Ogni giocatore può rivelare una carta personaggio dalla sua mano e giocarla gratis.",
    },
  },
  inkType: ["emerald"],
  franchise: "Hercules",
  set: "007",
  cardNumber: 118,
  rarity: "legendary",
  cost: 5,
  inkable: true,
  externalIds: {
    lorcast: "crd_7896cd21215c42609fc262c908068d94",
    tcgPlayer: 619743,
  },
  text: "Each player may reveal a character card from their hand and play it for free.",
  abilities: [
    {
      effect: {
        steps: [
          {
            chooser: "CONTROLLER",
            effect: {
              cardType: "character",
              cost: "free",
              filter: {
                cardType: "character",
              },
              from: "hand",
              target: "CONTROLLER",
              type: "play-card",
            },
            type: "optional",
          },
          {
            chooser: "OPPONENT",
            effect: {
              cardType: "character",
              cost: "free",
              filter: {
                cardType: "character",
              },
              from: "hand",
              target: "OPPONENT",
              type: "play-card",
            },
            type: "optional",
          },
        ],
        type: "sequence",
      },
      id: "nej-1",
      text: "Each player may reveal a character card from their hand and play it for free.",
      type: "action",
    },
  ],
};
