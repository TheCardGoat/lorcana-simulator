import type { ActionCard } from "@tcg/lorcana-types";

export const reflection: ActionCard = {
  id: "wVZ",
  canonicalId: "ci_wVZ",
  reprints: ["set1-065"],
  cardType: "action",
  name: "Reflection",
  i18n: {
    en: {
      name: "Reflection",
      text: "Look at the top 3 cards of your deck. Put them back on the top of your deck in any order.",
    },
    de: {
      name: "Wer bin ich?",
      text: "Schaue dir die obersten 3 Karten deines Decks an. Lege sie in beliebiger Reihenfolge zurück auf dein Deck.",
    },
    fr: {
      name: "Réflexion",
      text: "Regardez les 3 premières cartes de votre pioche. Remettez-les sur le dessus de votre pioche, dans l'ordre de votre choix.",
    },
    it: {
      name: "Riflesso",
      text: "(Un personaggio con costo 1 o superiore può per cantare questa canzone gratis.) Guarda le prime 3 carte del tuo mazzo. Rimettile in cima al tuo mazzo in qualsiasi ordine.",
    },
  },
  inkType: ["amethyst"],
  franchise: "Mulan",
  set: "001",
  cardNumber: 65,
  rarity: "uncommon",
  cost: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_2edd696f67314cde96ae6ff8f6661033",
    tcgPlayer: 506113,
  },
  text: "Look at the top 3 cards of your deck. Put them back on the top of your deck in any order.",
  actionSubtype: "song",
  abilities: [
    {
      type: "action",
      effect: {
        type: "scry",
        amount: 3,
        destinations: [
          {
            ordering: "player-choice",
            remainder: true,
            zone: "deck-top",
          },
        ],
      },
    },
  ],
};
