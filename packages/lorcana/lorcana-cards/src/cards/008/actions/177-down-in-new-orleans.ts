import type { ActionCard } from "@tcg/lorcana-types";

export const downInNewOrleans: ActionCard = {
  id: "AvD",
  canonicalId: "ci_AvD",
  reprints: ["set8-177"],
  cardType: "action",
  name: "Down in New Orleans",
  i18n: {
    en: {
      name: "Down in New Orleans",
      text: "Look at the top 3 cards of your deck. You may reveal a character, item, or location card with cost 6 or less and play it for free. Put the rest on the bottom of your deck in any order.",
    },
    de: {
      name: "In New Orleans",
      text: "Schaue dir die obersten 3 Karten deines Decks an. Du darfst 1 Charakter-, Gegenstands- oder Ortskarte, die 6 oder weniger kostet, daraus aufdecken und kostenlos ausspielen. Lege die restlichen Karten in beliebiger Reihenfolge unter dein Deck.",
    },
    fr: {
      name: "La Nouvelle-Orléans",
      text: "Regardez les 3 premières cartes de votre pioche. Vous pouvez révéler parmi elles une carte Personnage, Objet ou Lieu coûtant 6 ou moins et la jouer gratuitement. Placez les autres cartes sous votre pioche, dans l'ordre de votre choix.",
    },
    it: {
      name: "Benvenuto a New Orleans",
      text: "(Un personaggio con costo 6 o superiore può per cantare questa canzone gratis.) Guarda le prime 3 carte del tuo mazzo. Puoi rivelare una carta personaggio, oggetto o luogo con costo 6 o inferiore e giocarla gratis. Metti il resto in fondo al tuo mazzo in qualsiasi ordine.",
    },
  },
  inkType: ["sapphire"],
  franchise: "Princess and the Frog",
  set: "008",
  cardNumber: 177,
  rarity: "common",
  cost: 6,
  inkable: false,
  externalIds: {
    lorcast: "crd_eaa05e5b86e743a08331ddbbc5f19f4b",
    tcgPlayer: 631845,
  },
  text: "Look at the top 3 cards of your deck. You may reveal a character, item, or location card with cost 6 or less and play it for free. Put the rest on the bottom of your deck in any order.",
  actionSubtype: "song",
  abilities: [
    {
      effect: {
        type: "scry",
        amount: 3,
        target: "CONTROLLER",
        destinations: [
          {
            zone: "play",
            max: 1,
            reveal: true,
            cost: "free",
            filter: [
              {
                type: "or",
                filters: [
                  {
                    type: "card-type",
                    cardType: "character",
                  },
                  {
                    type: "card-type",
                    cardType: "item",
                  },
                  {
                    type: "card-type",
                    cardType: "location",
                  },
                ],
              },
              {
                type: "cost-comparison",
                comparison: "less-or-equal",
                value: 6,
              },
            ],
          },
          {
            zone: "deck-bottom",
            ordering: "player-choice",
            remainder: true,
          },
        ],
      },
      id: "nqg-1",
      text: "Look at the top 3 cards of your deck. You may reveal a character, item, or location card with cost 6 or less and play it for free. Put the rest on the bottom of your deck in any order.",
      type: "action",
    },
  ],
};
