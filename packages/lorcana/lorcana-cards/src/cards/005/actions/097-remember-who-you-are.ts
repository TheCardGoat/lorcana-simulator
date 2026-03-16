import type { ActionCard } from "@tcg/lorcana-types";

export const rememberWhoYouAre: ActionCard = {
  id: "f6o",
  canonicalId: "ci_2KA",
  reprints: ["set5-097"],
  cardType: "action",
  name: "Remember Who You Are",
  i18n: {
    en: {
      name: "Remember Who You Are",
      text: "If chosen opponent has more cards in their hand than you, draw cards until you have the same number.",
    },
    de: {
      name: "Vergiss niemals, wer du bist",
      text: "Wenn eine gegnerische Person deiner Wahl mehr Karten auf der Hand hat als du, ziehe so viele Karten, bis ihr die selbe Anzahl an Handkarten habt.",
    },
    fr: {
      name: "N'oublie pas qui tu es",
      text: "Choisissez un adversaire. Si vous avez moins de cartes en main que lui, piochez pour en avoir autant que lui.",
    },
    it: {
      name: "Ricordati Chi Sei",
      text: "Se un avversario a tua scelta ha più carte in mano di te, pesca carte finché non ne hai lo stesso numero.",
    },
  },
  inkType: ["emerald"],
  franchise: "Lion King",
  set: "005",
  cardNumber: 97,
  rarity: "rare",
  cost: 4,
  inkable: false,
  externalIds: {
    lorcast: "crd_d5e31be3b67a41c0a0f6ce871e8c69c4",
    tcgPlayer: 556975,
  },
  text: "If chosen opponent has more cards in their hand than you, draw cards until you have the same number.",
  abilities: [
    {
      type: "action",
      text: "If chosen opponent has more cards in their hand than you, draw cards until you have the same number.",
      effect: {
        type: "draw",
        target: "CONTROLLER",
        amount: {
          type: "difference",
          left: {
            type: "cards-in-hand",
            controller: "you",
          },
          right: {
            type: "cards-in-hand",
            controller: "opponent",
          },
          invert: true,
        },
      },
    },
  ],
};
