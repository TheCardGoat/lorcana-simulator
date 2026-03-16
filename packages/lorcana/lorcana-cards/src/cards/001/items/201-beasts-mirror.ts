import type { ItemCard } from "@tcg/lorcana-types";

export const beastsMirror: ItemCard = {
  id: "g9u",
  canonicalId: "ci_j5a",
  reprints: ["set1-201", "set9-203"],
  cardType: "item",
  name: "Beast’s Mirror",
  i18n: {
    en: {
      name: "Beast’s Mirror",
      text: [
        {
          title: "SHOW ME, 3",
          description: "— If you have no cards in your hand, draw a card.",
        },
      ],
    },
    de: {
      name: "Spiegel des Biests",
      text: [
        {
          title: "ZEIG'S MIR, 3",
          description: "— Wenn du keine Karten auf der Hand hast, ziehe 1 Karte.",
        },
      ],
    },
    fr: {
      name: "MIROIR DE LA BÊTE",
      text: [
        {
          title: "MONTRE-MOI, 3",
          description: "— Si vous n'avez plus de carte en main, piochez une carte.",
        },
      ],
    },
    it: {
      name: "Beast’s Mirror",
      text: [
        {
          title: "SHOW ME, 3",
          description: "— If you have no cards in your hand, draw a card.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Beauty and the Beast",
  set: "001",
  cardNumber: 201,
  rarity: "common",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_d23121463b6b482ab4af10faa55ba4ba",
    tcgPlayer: 650135,
  },
  text: [
    {
      title: "SHOW ME, 3",
      description: "— If you have no cards in your hand, draw a card.",
    },
  ],
  abilities: [
    {
      id: "6wc-1",
      cost: {
        exert: true,
        ink: 3,
      },
      effect: {
        condition: {
          type: "resource-count",
          controller: "you",
          what: "cards-in-hand",
          comparison: "equal",
          value: 0,
        },
        then: {
          amount: 1,
          target: "CONTROLLER",
          type: "draw",
        },
        type: "conditional",
      },
      name: "SHOW ME",
      type: "activated",
      text: "SHOW ME {E}, 3 {I} — If you have no cards in your hand, draw a card.",
    },
  ],
};
