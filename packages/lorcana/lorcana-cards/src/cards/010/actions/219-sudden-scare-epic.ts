import type { ActionCard } from "@tcg/lorcana-types";

export const suddenScareEpic: ActionCard = {
  id: "d49",
  canonicalId: "ci_zXX",
  reprints: ["set10-164"],
  cardType: "action",
  name: "Sudden Scare",
  i18n: {
    en: {
      name: "Sudden Scare",
      text: "Put chosen opposing character into their player's inkwell facedown. That player puts the top card of their deck into their inkwell facedown.",
    },
    de: {
      name: "Plötzlicher Schreck",
      text: "Lege einen gegnerischen Charakter deiner Wahl verdeckt und erschöpft in den zugehörigen Tintenvorrat. Die Person, die den gewählten Charakter im Spiel hatte, legt die oberste Karte ihres Decks verdeckt und erschöpft in ihren Tintenvorrat.",
    },
    fr: {
      name: "Frousse soudaine",
      text: "Choisissez un personnage adverse et placez-le dans la réserve d'encre de son propriétaire, face cachée. Son propriétaire place la carte du dessus de sa pioche dans sa réserve d'encre, face cachée.",
    },
    it: {
      name: "Spavento Improvviso",
      text: "Aggiungi un personaggio avversario a tua scelta al calamaio del suo giocatore, a faccia in giù. Quel giocatore aggiunge la prima carta del suo mazzo al suo calamaio, a faccia in giù.",
    },
  },
  inkType: ["sapphire"],
  set: "010",
  cardNumber: 219,
  rarity: "common",
  specialRarity: "epic",
  cost: 4,
  inkable: true,
  externalIds: {
    lorcast: "crd_7101d6f7aaba488e9a508b0d40172743",
    tcgPlayer: 660271,
  },
  text: "Put chosen opposing character into their player's inkwell facedown. That player puts the top card of their deck into their inkwell facedown.",
  abilities: [
    {
      effect: {
        steps: [
          {
            facedown: true,
            source: "chosen-character",
            target: "CHOSEN_CHARACTER",
            type: "put-into-inkwell",
          },
          {
            facedown: true,
            source: "top-of-deck",
            target: "OPPONENT",
            type: "put-into-inkwell",
          },
        ],
        type: "sequence",
      },
      type: "action",
    },
  ],
};
