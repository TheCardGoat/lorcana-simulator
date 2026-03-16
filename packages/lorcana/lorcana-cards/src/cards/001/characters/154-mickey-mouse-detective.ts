import type { CharacterCard } from "@tcg/lorcana-types";

export const mickeyMouseDetective: CharacterCard = {
  id: "xKp",
  canonicalId: "ci_GYc",
  reprints: ["set1-154", "set10-160"],
  cardType: "character",
  name: "Mickey Mouse",
  version: "Detective",
  i18n: {
    en: {
      name: "Mickey Mouse",
      version: "Detective",
      text: [
        {
          title: "GET A CLUE",
          description:
            "When you play this character, you may put the top card of your deck into your inkwell facedown and exerted.",
        },
      ],
    },
    de: {
      name: "Mickey Mouse",
      version: "Detective",
      text: [
        {
          title: "GET A CLUE",
          description:
            "When you play this character, you may put the top card of your deck into your inkwell facedown and exerted.",
        },
      ],
    },
    fr: {
      name: "Mickey Mouse",
      version: "Detective",
      text: [
        {
          title: "GET A CLUE",
          description:
            "When you play this character, you may put the top card of your deck into your inkwell facedown and exerted.",
        },
      ],
    },
    it: {
      name: "Mickey Mouse",
      version: "Detective",
      text: [
        {
          title: "GET A CLUE",
          description:
            "When you play this character, you may put the top card of your deck into your inkwell facedown and exerted.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  set: "001",
  cardNumber: 154,
  rarity: "common",
  cost: 3,
  strength: 1,
  willpower: 3,
  lore: 1,
  inkable: false,
  missingTests: true,
  externalIds: {
    lorcast: "crd_9b6f273381924929ba2d6f6d3e990f66",
    tcgPlayer: 659388,
  },
  text: [
    {
      title: "GET A CLUE",
      description:
        "When you play this character, you may put the top card of your deck into your inkwell facedown and exerted.",
    },
  ],
  classifications: ["Dreamborn", "Hero", "Detective"],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          exerted: true,
          facedown: true,
          source: "top-of-deck",
          target: "CONTROLLER",
          type: "put-into-inkwell",
        },
        type: "optional",
      },
      id: "1wh-1",
      name: "GET A CLUE",
      text: "GET A CLUE When you play this character, you may put the top card of your deck into your inkwell facedown and exerted.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
