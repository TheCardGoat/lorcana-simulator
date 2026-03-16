import type { ActionCard } from "@tcg/lorcana-types";

export const theBareNecessities: ActionCard = {
  id: "chI",
  canonicalId: "ci_chI",
  reprints: ["set3-028"],
  cardType: "action",
  name: "The Bare Necessities",
  i18n: {
    en: {
      name: "The Bare Necessities",
      text: "Chosen opponent reveals their hand and discards a non-character card of your choice.",
    },
    de: {
      name: "Probier's mal mit Gemütlichkeit",
      text: "Einer der gegnerischen Mitspielenden deiner Wahl zeigt alle Handkarten für alle sichtbar vor und wirft eine Karte deiner Wahl, die keine Charakterkarte ist, ab.",
    },
    fr: {
      name: "Il en faut peu pour être heureux",
      text: "Choisissez un adversaire, il révèle sa main et défausse une carte non-Personnage de votre choix.",
    },
    it: {
      name: "Lo Stretto Indispensabile",
      text: "(Un personaggio con costo 2 o superiore può per giocare questa canzone gratis.) Un avversario a tua scelta rivela la sua mano e scarta una carta non personaggio a tua scelta.",
    },
  },
  inkType: ["amber"],
  franchise: "Jungle Book",
  set: "003",
  cardNumber: 28,
  rarity: "rare",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_54e5e880c70e4e2bb68cc318a7d47e34",
    tcgPlayer: 538224,
  },
  text: "Chosen opponent reveals their hand and discards a non-character card of your choice.",
  actionSubtype: "song",
  abilities: [
    {
      type: "action",
      text: "Chosen opponent reveals their hand and discards a non-character card of your choice.",
      effect: {
        type: "sequence",
        steps: [
          {
            type: "reveal-hand",
            target: "CHOSEN_PLAYER",
          },
          {
            type: "discard",
            amount: 1,
            target: "CHOSEN_PLAYER",
            from: "hand",
            chosen: true,
            chosenBy: "you",
            filter: {
              notCardType: "character",
            },
          },
        ],
      },
    },
  ],
};
