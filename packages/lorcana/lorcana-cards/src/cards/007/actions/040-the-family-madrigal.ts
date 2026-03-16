import type { ActionCard } from "@tcg/lorcana-types";

export const theFamilyMadrigal: ActionCard = {
  id: "QHV",
  canonicalId: "ci_QHV",
  reprints: ["set7-040"],
  cardType: "action",
  name: "The Family Madrigal",
  i18n: {
    en: {
      name: "The Family Madrigal",
      text: "Look at the top 5 cards of your deck. You may reveal up to 1 Madrigal character card and up to 1 song card and put them into your hand. Put the rest on the top of your deck in any order.",
    },
    de: {
      name: "Familie Madrigal",
      text: "Schaue dir die obersten 5 Karten deines Decks an. Du darfst bis zu 1 Madrigal-Charakterkarte und bis zu 1 Liedkarte daraus aufdecken und auf deine Hand nehmen. Lege die restlichen Karten in beliebiger Reihenfolge auf dein Deck.",
    },
    fr: {
      name: "La Famille Madrigal",
      text: "Regardez les 5 premières cartes de votre pioche. Vous pouvez révéler jusqu'à 1 carte Personnage Madrigal et 1 carte Chanson parmi elles. Placez les cartes révélées dans votre main. Placez les autres cartes sur votre pioche, dans l'ordre de votre choix.",
    },
    it: {
      name: "La Famiglia Madrigal",
      text: "(Un personaggio con costo 5 o superiore può per cantare questa canzone gratis.) Guarda le prime 5 carte del tuo mazzo. Puoi rivelare fino a 1 carta personaggio Madrigal e fino a 1 carta canzone e aggiungerle alla tua mano. Metti il resto in cima al tuo mazzo in qualsiasi ordine.",
    },
  },
  inkType: ["amber", "amethyst"],
  franchise: "Encanto",
  set: "007",
  cardNumber: 40,
  rarity: "rare",
  cost: 5,
  inkable: true,
  externalIds: {
    lorcast: "crd_c6cad61cbf8445be93e29134eb073af6",
    tcgPlayer: 619429,
  },
  text: "Look at the top 5 cards of your deck. You may reveal up to 1 Madrigal character card and up to 1 song card and put them into your hand. Put the rest on the top of your deck in any order.",
  actionSubtype: "song",
  abilities: [
    {
      effect: {
        amount: 5,
        destinations: [
          {
            filter: {
              type: "and",
              filters: [
                {
                  type: "card-type",
                  cardType: "character",
                },
                {
                  type: "classification",
                  classification: "Madrigal",
                },
              ],
            },
            max: 1,
            min: 0,
            reveal: true,
            zone: "hand",
          },
          {
            filter: {
              type: "song",
            },
            max: 1,
            min: 0,
            reveal: true,
            zone: "hand",
          },
          {
            ordering: "player-choice",
            remainder: true,
            zone: "deck-top",
          },
        ],
        target: "CONTROLLER",
        type: "scry",
      },
      type: "action",
    },
  ],
};
