import type { ActionCard } from "@tcg/lorcana-types";

export const waterHasMemory: ActionCard = {
  id: "mVr",
  canonicalId: "ci_mVr",
  reprints: ["set7-177"],
  cardType: "action",
  name: "Water Has Memory",
  i18n: {
    en: {
      name: "Water Has Memory",
      text: "Look at the top 4 cards of chosen player's deck. Put one on the top of their deck and the rest on the bottom of their deck in any order.",
    },
    de: {
      name: "Wasser hat ein Gedächtnis",
      text: "Schaue dir die obersten 4 Karten vom Deck einer Person deiner Wahl an. Lege 1 davon auf ihr Deck und die restlichen Karten in beliebiger Reihenfolge unter ihr Deck.",
    },
    fr: {
      name: "L’eau a de la mémoire",
      text: "Choisissez un joueur et regardez les 4 premières cartes de sa pioche. Placez l'une d'entre elles sur sa pioche et le reste sous sa pioche, dans l'ordre de votre choix.",
    },
    it: {
      name: "L'Acqua Ha Memoria",
      text: "Guarda le prime 4 carte del mazzo di un giocatore a tua scelta. Mettine una in cima al suo mazzo e il resto in fondo al suo mazzo in qualsiasi ordine.",
    },
  },
  inkType: ["sapphire"],
  franchise: "Frozen",
  set: "007",
  cardNumber: 177,
  rarity: "common",
  cost: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_63c20a20927a4cb1b67736648b2867c8",
    tcgPlayer: 618722,
  },
  text: "Look at the top 4 cards of chosen player's deck. Put one on the top of their deck and the rest on the bottom of their deck in any order.",
  abilities: [
    {
      effect: {
        amount: 4,
        destinations: [
          {
            max: 1,
            zone: "deck-top",
          },
          {
            zone: "deck-bottom",
            remainder: true,
            ordering: "player-choice",
          },
        ],
        target: "CHOSEN_PLAYER",
        type: "scry",
      },
      id: "q8v-1",
      text: "Look at the top 4 cards of chosen player's deck. Put one on the top of their deck and the rest on the bottom of their deck in any order.",
      type: "action",
    },
  ],
};
