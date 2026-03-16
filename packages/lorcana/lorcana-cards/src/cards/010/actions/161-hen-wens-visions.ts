import type { ActionCard } from "@tcg/lorcana-types";

export const henWensVisions: ActionCard = {
  id: "337",
  canonicalId: "ci_337",
  reprints: ["set10-161"],
  cardType: "action",
  name: "Hen Wen's Visions",
  i18n: {
    en: {
      name: "Hen Wen's Visions",
      text: "Look at the top 4 cards of your deck. Put 1 on the top of your deck and the rest on the bottom in any order.",
    },
    de: {
      name: "Hen Wens Visionen",
      text: "Schaue dir die obersten 4 Karten deines Decks an. Lege 1 davon auf dein Deck und die restlichen Karten in beliebiger Reihenfolge darunter.",
    },
    fr: {
      name: "Visions de Tirelire",
      text: "Regardez les 4 cartes du dessus de votre pioche. Placez-en une sur votre pioche et le reste sous votre pioche dans l'ordre de votre choix.",
    },
    it: {
      name: "Visioni di Ewy",
      text: "Guarda le prime 4 carte del tuo mazzo. Mettine 1 in cima al tuo mazzo e il resto in fondo in qualsiasi ordine.",
    },
  },
  inkType: ["sapphire"],
  franchise: "Black Cauldron",
  set: "010",
  cardNumber: 161,
  rarity: "common",
  cost: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_e118a4c9805c426687bc202180e54e46",
    tcgPlayer: 657891,
  },
  text: "Look at the top 4 cards of your deck. Put 1 on the top of your deck and the rest on the bottom in any order.",
  abilities: [
    {
      effect: {
        amount: 4,
        destinations: [
          {
            max: 1,
            min: 1,
            ordering: "player-choice",
            zone: "deck-top",
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
