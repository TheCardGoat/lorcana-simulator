import type { ActionCard } from "@tcg/lorcana-types";

export const letsGetDangerousEnchanted: ActionCard = {
  id: "p0y",
  canonicalId: "ci_iht",
  reprints: ["set11-198"],
  cardType: "action",
  name: "Let's Get Dangerous",
  i18n: {
    en: {
      name: "Let's Get Dangerous",
      text: "Each player shuffles their deck and then reveals the top card. Each player who reveals a character card may play that character for free. Otherwise, put the revealed cards on the bottom of their player's deck.",
    },
    de: {
      name: "Zwo, Eins, Risiko",
      text: [
        {
          title: "Alle Mitspielenden",
          description:
            "(auch du) mischen ihr Deck und decken dann die oberste Karte auf. Wer auf diese Weise eine Charakterkarte aufdeckt, darf diese kostenlos ausspielen. Wer sie nicht spielt, legt die Karte unter das eigene Deck.",
        },
      ],
    },
    fr: {
      name: "Cette chanson craint un mask",
      text: "Chaque joueur mélange sa pioche, puis révèle la carte du dessus de sa pioche. Chaque joueur qui révèle une carte Personnage peut jouer ce personnage gratuitement. Sinon, placez les cartes révélées sous la pioche de leur propriétaire.",
    },
    it: {
      name: "Dagli Addosso, Duck",
      text: "Ogni giocatore mescola il suo mazzo e poi rivela la prima carta. Ogni giocatore che ha rivelato una carta personaggio può giocare quel personaggio gratis. Altrimenti, metti le carte rivelate in fondo al mazzo dei loro giocatori.",
    },
  },
  inkType: ["steel"],
  franchise: "Darkwing Duck",
  set: "011",
  cardNumber: 240,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 4,
  inkable: true,
  externalIds: {
    lorcast: "crd_656cd1bfb0084f92bfd003ca69b3b3c9",
    tcgPlayer: 677171,
  },
  text: "Each player shuffles their deck and then reveals the top card. Each player who reveals a character card may play that character for free. Otherwise, put the revealed cards on the bottom of their player's deck.",
  actionSubtype: "song",
  abilities: [
    {
      id: "w7s-1",
      effect: {
        type: "sequence",
        steps: [
          {
            type: "shuffle-into-deck",
            target: "EACH_PLAYER",
          },
          {
            type: "reveal-top-card",
            target: "CONTROLLER",
          },
          {
            type: "conditional",
            condition: {
              type: "target-query",
              query: {
                selector: "chosen",
                count: 1,
                reference: "revealed-first",
                cardTypes: ["character"],
              },
            },
            then: {
              type: "choice",
              chooser: "CONTROLLER",
              options: [
                {
                  type: "play-card",
                  from: "revealed",
                  cardType: "character",
                  cost: "free",
                  target: "CONTROLLER",
                },
                {
                  type: "put-on-bottom",
                  target: {
                    selector: "chosen",
                    count: 1,
                    reference: "revealed-first",
                  },
                },
              ],
            },
            else: {
              type: "put-on-bottom",
              target: {
                selector: "chosen",
                count: 1,
                reference: "revealed-first",
              },
            },
          },
          {
            type: "reveal-top-card",
            target: "OPPONENT",
          },
          {
            type: "conditional",
            condition: {
              type: "target-query",
              query: {
                selector: "chosen",
                count: 1,
                reference: "revealed-first",
                cardTypes: ["character"],
              },
            },
            then: {
              type: "choice",
              chooser: "OPPONENT",
              options: [
                {
                  type: "play-card",
                  from: "revealed",
                  cardType: "character",
                  cost: "free",
                  target: "OPPONENT",
                },
                {
                  type: "put-on-bottom",
                  target: {
                    selector: "chosen",
                    count: 1,
                    reference: "revealed-first",
                  },
                },
              ],
            },
            else: {
              type: "put-on-bottom",
              target: {
                selector: "chosen",
                count: 1,
                reference: "revealed-first",
              },
            },
          },
        ],
      },
      type: "action",
      text: "Each player shuffles their deck and then reveals the top card. Each player who reveals a character card may play that character for free. Otherwise, put the revealed cards on the bottom of their player’s deck.",
    },
  ],
};
