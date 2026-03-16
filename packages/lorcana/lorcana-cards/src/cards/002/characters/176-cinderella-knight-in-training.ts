import type { CharacterCard } from "@tcg/lorcana-types";

export const cinderellaKnightInTraining: CharacterCard = {
  id: "FdD",
  canonicalId: "ci_FdD",
  reprints: ["set2-176"],
  cardType: "character",
  name: "Cinderella",
  version: "Knight in Training",
  i18n: {
    en: {
      name: "Cinderella",
      version: "Knight in Training",
      text: [
        {
          title: "HAVE COURAGE",
          description:
            "When you play this character, you may draw a card, then choose and discard a card.",
        },
      ],
    },
    de: {
      name: "Cinderella",
      version: "Knight in Training",
      text: [
        {
          title: "HAVE COURAGE",
          description:
            "When you play this character, you may draw a card, then choose and discard a card.",
        },
      ],
    },
    fr: {
      name: "Cinderella",
      version: "Knight in Training",
      text: [
        {
          title: "HAVE COURAGE",
          description:
            "When you play this character, you may draw a card, then choose and discard a card.",
        },
      ],
    },
    it: {
      name: "Cinderella",
      version: "Knight in Training",
      text: [
        {
          title: "HAVE COURAGE",
          description:
            "When you play this character, you may draw a card, then choose and discard a card.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Cinderella",
  set: "002",
  cardNumber: 176,
  rarity: "common",
  cost: 2,
  strength: 2,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_be028c8d6e9144f4ac4f03b17462db1c",
    tcgPlayer: 521726,
  },
  text: [
    {
      title: "HAVE COURAGE",
      description:
        "When you play this character, you may draw a card, then choose and discard a card.",
    },
  ],
  classifications: ["Dreamborn", "Hero", "Princess", "Knight"],
  missingTests: true,
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          amount: 1,
          chosen: true,
          target: "CONTROLLER",
          type: "discard",
        },
        type: "optional",
      },
      id: "8ex-1",
      name: "HAVE COURAGE",
      text: "HAVE COURAGE When you play this character, you may draw a card, then choose and discard a card.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
