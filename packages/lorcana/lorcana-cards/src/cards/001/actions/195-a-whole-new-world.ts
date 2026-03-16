import type { ActionCard } from "@tcg/lorcana-types";

export const aWholeNewWorld: ActionCard = {
  id: "YDE",
  canonicalId: "ci_YDE",
  reprints: ["set1-195"],
  cardType: "action",
  name: "A Whole New World",
  i18n: {
    en: {
      name: "A Whole New World",
      text: "Each player discards their hand and draws 7 cards.",
    },
    de: {
      name: "A Whole New World",
      text: [
        {
          title: "(A",
          description:
            "character with cost 5 or more can to sing this song for free.) Each player discards their hand and draws 7 cards.",
        },
      ],
    },
    fr: {
      name: "A Whole New World",
      text: [
        {
          title: "(A",
          description:
            "character with cost 5 or more can to sing this song for free.) Each player discards their hand and draws 7 cards.",
        },
      ],
    },
    it: {
      name: "A Whole New World",
      text: "Each player discards their hand and draws 7 cards.",
    },
  },
  inkType: ["steel"],
  franchise: "Aladdin",
  set: "001",
  cardNumber: 195,
  rarity: "common",
  cost: 5,
  inkable: false,
  externalIds: {
    lorcast: "crd_94aea01bdb0a49a4aff52b8802388bb1",
  },
  text: "Each player discards their hand and draws 7 cards.",
  actionSubtype: "song",
  abilities: [
    {
      type: "action",
      effect: {
        type: "sequence",
        steps: [
          {
            amount: "all",
            from: "hand",
            target: "EACH_PLAYER",
            type: "discard",
          },
          {
            amount: 7,
            target: "EACH_PLAYER",
            type: "draw",
          },
        ],
      },
    },
  ],
};
