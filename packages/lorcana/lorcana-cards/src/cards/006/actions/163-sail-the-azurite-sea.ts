import type { ActionCard } from "@tcg/lorcana-types";

export const sailTheAzuriteSea: ActionCard = {
  id: "EfC",
  canonicalId: "ci_EfC",
  reprints: ["set6-163"],
  cardType: "action",
  name: "Sail the Azurite Sea",
  i18n: {
    en: {
      name: "Sail the Azurite Sea",
      text: "This turn, you may put an additional card from your hand into your inkwell facedown. Draw a card.",
    },
    de: {
      name: "Azurblaues Meer befahren",
      text: "Du darfst in diesem Zug 1 weitere Karte tinten. Ziehe 1 Karte.",
    },
    fr: {
      name: "Voguer sur la mer Azurite",
      text: "Ce tour-ci, vous pouvez encrer une carte supplémentaire. Piochez une carte.",
    },
    it: {
      name: "Navigare nel Mare di Azzurrite",
      text: "Per questo turno, puoi aggiungere una carta aggiuntiva al tuo calamaio dalla tua mano, a faccia in giù. Pesca una carta.",
    },
  },
  inkType: ["sapphire"],
  franchise: "Lorcana",
  set: "006",
  cardNumber: 163,
  rarity: "common",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_049739e69c034e898c3c48abd37544cc",
    tcgPlayer: 592008,
  },
  text: "This turn, you may put an additional card from your hand into your inkwell facedown. Draw a card.",
  abilities: [
    {
      type: "action",
      effect: {
        type: "sequence",
        steps: [
          {
            type: "additional-inkwell",
            amount: 1,
          },
          {
            amount: 1,
            target: "CONTROLLER",
            type: "draw",
          },
        ],
      },
    },
  ],
};
