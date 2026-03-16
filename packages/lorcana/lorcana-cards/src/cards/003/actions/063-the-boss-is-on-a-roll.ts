import type { ActionCard } from "@tcg/lorcana-types";

export const theBossIsOnARoll: ActionCard = {
  id: "rx8",
  canonicalId: "ci_rx8",
  reprints: ["set3-063"],
  cardType: "action",
  name: "The Boss is on a Roll",
  i18n: {
    en: {
      name: "The Boss is on a Roll",
      text: "Look at the top 5 cards of your deck. Put any number of them on the top or the bottom of your deck in any order. Gain 1 lore.",
    },
    de: {
      name: "Der Boss ist doch der Held",
      text: "Schaue dir die obersten 5 Karten deines Decks an. Lege sie anschließend in beliebiger Reihenfolge auf dein Deck und darunter. Sammle 1 Legende.",
    },
    fr: {
      name: "Je complète ma collection",
      text: "Regardez les 5 premières cartes de votre pioche. Remettez-en autant que vous voulez sur le dessus de votre pioche et le reste en dessous, dans l'ordre de votre choix. Gagnez 1 éclat de Lore.",
    },
    it: {
      name: "Abbiam vinto Ancora Noi",
      text: "(Un personaggio con costo 3 o superiore può per giocare questa canzone gratis.) Guarda le prime 5 carte del tuo mazzo. Mettine un qualsiasi numero in cima o in fondo al tuo mazzo in qualsiasi ordine. Ottieni 1 leggenda.",
    },
  },
  inkType: ["amethyst"],
  franchise: "Little Mermaid",
  set: "003",
  cardNumber: 63,
  rarity: "rare",
  cost: 3,
  inkable: true,
  externalIds: {
    lorcast: "crd_716a89f3b6cf4f57b66888fd4166d1df",
    tcgPlayer: 537633,
  },
  text: "Look at the top 5 cards of your deck. Put any number of them on the top or the bottom of your deck in any order. Gain 1 lore.",
  actionSubtype: "song",
  abilities: [
    {
      effect: {
        type: "sequence",
        steps: [
          {
            amount: 5,
            target: "CONTROLLER",
            type: "scry",
            destinations: [
              {
                zone: "deck-top",
                max: 5,
                ordering: "player-choice",
              },
              {
                zone: "deck-bottom",
                max: 5,
                remainder: true,
                ordering: "player-choice",
              },
            ],
          },
          {
            amount: 1,
            type: "gain-lore",
          },
        ],
      },
      type: "action",
    },
  ],
};
