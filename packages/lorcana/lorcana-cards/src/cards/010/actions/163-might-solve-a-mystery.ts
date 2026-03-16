import type { ActionCard } from "@tcg/lorcana-types";

export const mightSolveAMystery: ActionCard = {
  id: "lhB",
  canonicalId: "ci_lhB",
  reprints: ["set10-163"],
  cardType: "action",
  name: "Might Solve a Mystery",
  i18n: {
    en: {
      name: "Might Solve a Mystery",
      text: "Look at the top 4 cards of your deck. You may reveal up to 1 character card and up to 1 item card and put them into your hand. Put the rest on the bottom of your deck in any order.",
    },
    de: {
      name: "Suchen nach Schätzen",
      text: "Schaue dir die obersten 4 Karten deines Decks an. Du darfst bis zu 1 Charakterkarte und bis zu 1 Gegenstandskarte daraus aufdecken und auf deine Hand nehmen. Lege die restlichen Karten in beliebiger Reihenfolge unter dein Deck.",
    },
    fr: {
      name: "En suivant Fifi, Riri et Loulou",
      text: "Regardez les 4 cartes du dessus de votre pioche. Vous pouvez révéler parmi ces cartes jusqu'à 1 carte Personnage et 1 carte Objet et les placer dans votre main. Placez les autres cartes sous votre pioche, dans l'ordre de votre choix.",
    },
    it: {
      name: "Storie di Paperi",
      text: "(Un personaggio con costo 4 o superiore può per cantare questa canzone gratis.) Guarda le prime 4 carte del tuo mazzo. Puoi rivelare fino a 1 carta personaggio e fino a 1 carta oggetto e aggiungerle alla tua mano. Metti il resto in fondo al tuo mazzo in qualsiasi ordine.",
    },
  },
  inkType: ["sapphire"],
  franchise: "Ducktales",
  set: "010",
  cardNumber: 163,
  rarity: "uncommon",
  cost: 4,
  inkable: true,
  externalIds: {
    lorcast: "crd_3f49acb68d7d44f4a8f98b555b7e47dd",
    tcgPlayer: 658459,
  },
  text: "Look at the top 4 cards of your deck. You may reveal up to 1 character card and up to 1 item card and put them into your hand. Put the rest on the bottom of your deck in any order.",
  actionSubtype: "song",
  abilities: [
    {
      effect: {
        amount: 4,
        destinations: [
          {
            filter: {
              type: "card-type",
              cardType: "character",
            },
            max: 1,
            reveal: true,
            zone: "hand",
          },
          {
            filter: {
              type: "card-type",
              cardType: "item",
            },
            max: 1,
            reveal: true,
            zone: "hand",
          },
          {
            ordering: "player-choice",
            remainder: true,
            zone: "deck-bottom",
          },
        ],
        target: "CONTROLLER",
        type: "scry",
      },
      type: "action",
    },
  ],
};
