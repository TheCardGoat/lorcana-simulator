import type { ActionCard } from "@tcg/lorcana-types";

export const visionOfTheFuture: ActionCard = {
  id: "Dub",
  canonicalId: "ci_Dub",
  reprints: ["set5-160"],
  cardType: "action",
  name: "Vision of the Future",
  i18n: {
    en: {
      name: "Vision of the Future",
      text: "Look at the top 5 cards of your deck. Put one into your hand and the rest on the bottom of your deck in any order.",
    },
    de: {
      name: "Prophezeiung der Zukunft",
      text: "Schaue dir die obersten 5 Karten deines Decks an. Nimm 1 davon auf deine Hand und lege die restlichen Karten in beliebiger Reihenfolge unter dein Deck.",
    },
    fr: {
      name: "Vision de l'Avenir",
      text: "Regardez les 5 premières cartes de votre pioche. Placez-en une dans votre main et le reste sous votre pioche, dans l'ordre de votre choix.",
    },
    it: {
      name: "Visione del Futuro",
      text: "Guarda le prime 5 carte del tuo mazzo. Aggiungine una alla tua mano e metti il resto in fondo al tuo mazzo in qualsiasi ordine.",
    },
  },
  inkType: ["sapphire"],
  franchise: "Sword in the Stone",
  set: "005",
  cardNumber: 160,
  rarity: "common",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_69128022cf3e4ff7bdd615ab371405a7",
    tcgPlayer: 561652,
  },
  text: "Look at the top 5 cards of your deck. Put one into your hand and the rest on the bottom of your deck in any order.",
  abilities: [
    {
      effect: {
        amount: 5,
        destinations: [
          {
            zone: "hand",
            min: 1,
            max: 1,
          },
          {
            zone: "deck-bottom",
            remainder: true,
            ordering: "player-choice",
          },
        ],
        target: "CONTROLLER",
        type: "scry",
      },
      id: "xym-1",
      text: "Look at the top 5 cards of your deck. Put one into your hand and the rest on the bottom of your deck in any order.",
      type: "action",
    },
  ],
};
