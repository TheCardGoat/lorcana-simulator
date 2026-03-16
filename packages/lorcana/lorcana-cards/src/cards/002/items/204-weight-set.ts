import type { ItemCard } from "@tcg/lorcana-types";

export const weightSet: ItemCard = {
  id: "X1T",
  canonicalId: "ci_X1T",
  reprints: ["set2-204"],
  cardType: "item",
  name: "Weight Set",
  i18n: {
    en: {
      name: "Weight Set",
      text: [
        {
          title: "TRAINING",
          description:
            "Whenever you play a character with 4 {S} or more, you may pay 1 {I} to draw a card.",
        },
      ],
    },
    de: {
      name: "Hantel",
      text: [
        {
          title: "KRAFTTRAINING",
          description:
            "Jedes Mal, wenn du einen Charakter mit 4 oder mehr ausspielst, darfst du 1 bezahlen, um 1 Karte zu ziehen.",
        },
      ],
    },
    fr: {
      name: "Haltères",
      text: [
        {
          title: "ENTRAINEMENT",
          description:
            "Chaque fois que vous jouez un personnage ayant au moins 4, vous pouvez payer 1 pour piocher une carte.",
        },
      ],
    },
    it: {
      name: "Weight Set",
      text: [
        {
          title: "TRAINING",
          description:
            "Whenever you play a character with 4 or more, you may pay 1 to draw a card.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Hercules",
  set: "002",
  cardNumber: 204,
  rarity: "rare",
  cost: 3,
  inkable: true,
  externalIds: {
    lorcast: "crd_c3f4b42a04de464a8f93814fd4e1884b",
    tcgPlayer: 527529,
  },
  text: [
    {
      title: "TRAINING",
      description:
        "Whenever you play a character with 4 {S} or more, you may pay 1 {I} to draw a card.",
    },
  ],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          type: "pay-cost",
          cost: {
            ink: 1,
          },
          effect: {
            amount: 1,
            target: "CONTROLLER",
            type: "draw",
          },
        },
        type: "optional",
      },
      trigger: {
        event: "play",
        on: {
          cardType: "character",
          controller: "you",
          filters: [
            {
              type: "strength-comparison",
              comparison: "greater-or-equal",
              value: 4,
            },
          ],
        },
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
