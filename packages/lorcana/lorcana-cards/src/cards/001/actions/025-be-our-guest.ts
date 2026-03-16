import type { ActionCard } from "@tcg/lorcana-types";

export const beOurGuest: ActionCard = {
  id: "nXA",
  canonicalId: "ci_XYl",
  reprints: ["set1-025", "set9-031"],
  cardType: "action",
  name: "Be Our Guest",
  i18n: {
    en: {
      name: "Be Our Guest",
      text: "Look at the top 4 cards of your deck. You may reveal a character card and put it into your hand. Put the rest on the bottom of your deck in any order.",
    },
    de: {
      name: "Sei hier Gast!",
      text: "Schaue dir die obersten 4 Karten deines Decks an. Du darfst 1 Charakterkarte daraus aufdecken und auf deine Hand nehmen. Lege die restlichen Karten in beliebiger Reihenfolge unter dein Deck.",
    },
    fr: {
      name: "C'EST LA FÊTE",
      text: "Regardez les 4 premières cartes de votre pioche. Vous pouvez révéler une carte personnage parmi elles et l'ajouter à votre main. Remettez les autres sous votre pioche, dans l'ordre de votre choix.",
    },
    it: {
      name: "Be Our Guest",
      text: "Look at the top 4 cards of your deck. You may reveal a character card and put it into your hand. Put the rest on the bottom of your deck in any order.",
    },
  },
  inkType: ["amber"],
  franchise: "Beauty and the Beast",
  set: "001",
  cardNumber: 25,
  rarity: "uncommon",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_ecf737e88516492c9592efb0c0b6da85",
    tcgPlayer: 649978,
  },
  text: "Look at the top 4 cards of your deck. You may reveal a character card and put it into your hand. Put the rest on the bottom of your deck in any order.",
  actionSubtype: "song",
  abilities: [
    {
      type: "action",
      effect: {
        type: "scry",
        amount: 4,
        target: "CONTROLLER",
        destinations: [
          {
            zone: "hand",
            max: 1,
            reveal: true,
            filter: {
              type: "card-type",
              cardType: "character",
            },
          },
          {
            ordering: "player-choice",
            zone: "deck-bottom",
            remainder: true,
          },
        ],
      },
    },
  ],
};
