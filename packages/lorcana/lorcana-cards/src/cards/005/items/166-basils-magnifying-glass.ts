import type { ItemCard } from "@tcg/lorcana-types";

export const basilsMagnifyingGlass: ItemCard = {
  id: "Ssx",
  canonicalId: "ci_Ssx",
  reprints: ["set5-166"],
  cardType: "item",
  name: "Basil's Magnifying Glass",
  i18n: {
    en: {
      name: "Basil's Magnifying Glass",
      text: [
        {
          title: "FIND WHAT'S HIDDEN",
          description:
            "{E}, 2 {I} — Look at the top 3 cards of your deck. You may reveal an item card and put it into your hand. Put the rest on the bottom of your deck in any order.",
        },
      ],
    },
    de: {
      name: "Basils Lupe",
      text: [
        {
          title: "VERBORGENES FINDEN, 2",
          description:
            "— Schaue dir die obersten 3 Karten deines Decks an. Du darfst 1 Gegenstandskarte daraus aufdecken und auf deine Hand nehmen. Lege die restlichen Karten in beliebiger Reihenfolge unter dein Deck.",
        },
      ],
    },
    fr: {
      name: "Loupe de Basil",
      text: [
        {
          title: "RÉVÉLER L'INVISIBLE,",
          description:
            "2 — Regardez les 3 cartes du dessus de votre pioche. Vous pouvez révéler une carte Objet parmi elles et la prendre en main. Remettez les autres cartes sous votre pioche, dans l'ordre de votre choix.",
        },
      ],
    },
    it: {
      name: "Lente d'Ingrandimento di Basil",
      text: [
        {
          title: "TROVARE",
          description:
            "CIÒ CHE È NASCOSTO, 2 — Guarda le prime 3 carte del tuo mazzo. Puoi rivelare una carta oggetto e aggiungerla alla tua mano. Metti il resto in fondo al tuo mazzo in qualsiasi ordine.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Great Mouse Detective",
  set: "005",
  cardNumber: 166,
  rarity: "rare",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_6e39ed3b74964c12a79afd63898cf58a",
    tcgPlayer: 560629,
  },
  text: [
    {
      title: "FIND WHAT'S HIDDEN",
      description:
        "{E}, 2 {I} — Look at the top 3 cards of your deck. You may reveal an item card and put it into your hand. Put the rest on the bottom of your deck in any order.",
    },
  ],
  abilities: [
    {
      id: "pnm-1",
      text: "FIND WHAT'S HIDDEN {E}, 2 {I} — Look at the top 3 cards of your deck. You may reveal an item card and put it into your hand. Put the rest on the bottom of your deck in any order.",
      name: "FIND WHAT'S HIDDEN",
      type: "activated",
      cost: {
        exert: true,
        ink: 2,
      },
      effect: {
        type: "scry",
        amount: 3,
        destinations: [
          {
            filter: {
              cardType: "item",
              type: "card-type",
            },
            max: 1,
            min: 0,
            zone: "hand",
          },
          {
            ordering: "player-choice",
            remainder: true,
            zone: "deck-bottom",
          },
        ],
        target: "CONTROLLER",
      },
    },
  ],
};
