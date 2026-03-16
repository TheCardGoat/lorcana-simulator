import type { ActionCard } from "@tcg/lorcana-types";

export const developYourBrain: ActionCard = {
  id: "GGr",
  canonicalId: "ci_w1L",
  reprints: ["set1-161", "set9-163"],
  cardType: "action",
  name: "Develop Your Brain",
  i18n: {
    en: {
      name: "Develop Your Brain",
      text: "Look at the top 2 cards of your deck. Put one into your hand and the other on the bottom of the deck.",
    },
    de: {
      name: "Entwickle dein Gehirn",
      text: "Schaue dir die obersten 2 Karten deines Decks an. Nimm 1 davon auf deine Hand und lege die andere unter dein Deck.",
    },
    fr: {
      name: "DÉVELOPPE TON CERVEAU",
      text: "Regardez les 2 premières cartes de votre pioche. Ajoutez-en une à votre main et remettez l'autre sous votre pioche.",
    },
    it: {
      name: "Develop Your Brain",
      text: "Look at the top 2 cards of your deck. Put one into your hand and the other on the bottom of the deck.",
    },
  },
  inkType: ["sapphire"],
  franchise: "Sword in the Stone",
  set: "001",
  cardNumber: 161,
  rarity: "common",
  cost: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_441f1bb9f8c2478d84c13e70dd62755c",
    tcgPlayer: 650097,
  },
  text: "Look at the top 2 cards of your deck. Put one into your hand and the other on the bottom of the deck.",
  abilities: [
    {
      type: "action",
      effect: {
        type: "scry",
        amount: 2,
        target: "CONTROLLER",
        destinations: [
          {
            zone: "hand",
            min: 1,
            max: 1,
          },
          {
            zone: "deck-bottom",
            remainder: true,
          },
        ],
      },
    },
  ],
};
