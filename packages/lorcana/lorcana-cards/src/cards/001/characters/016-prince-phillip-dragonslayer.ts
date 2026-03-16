import type { CharacterCard } from "@tcg/lorcana-types";

export const princePhillipDragonslayer: CharacterCard = {
  id: "0Xn",
  canonicalId: "ci_0Xn",
  reprints: ["set1-016"],
  cardType: "character",
  name: "Prince Phillip",
  version: "Dragonslayer",
  i18n: {
    en: {
      name: "Prince Phillip",
      version: "Dragonslayer",
      text: [
        {
          title: "HEROISM",
          description:
            "When this character challenges and is banished, you may banish the challenged character.",
        },
      ],
    },
    de: {
      name: "Prinz Phillip",
      version: "Drachenbändiger",
      text: [
        {
          title: "HELDENTUM",
          description:
            "Wenn dieser Charakter einen anderen Charakter herausfordert und dadurch verbannt wird, darfst du den herausgeforderten Charakter verbannen.",
        },
      ],
    },
    fr: {
      name: "PRINCE PHILIPPE",
      version: "Tueur de dragon",
      text: [
        {
          title: "HÉROÏSME",
          description:
            "Lorsque ce personnage en défie un autre et qu'il se fait bannir, vous pouvez bannir le personnage défié.",
        },
      ],
    },
    it: {
      name: "Prince Phillip",
      version: "Dragonslayer",
      text: [
        {
          title: "HEROISM",
          description:
            "When this character challenges and is banished, you may banish the challenged character.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Sleeping Beauty",
  set: "001",
  cardNumber: 16,
  rarity: "uncommon",
  cost: 4,
  strength: 3,
  willpower: 3,
  lore: 2,
  inkable: false,
  missingTests: true,
  externalIds: {
    lorcast: "crd_f1e67c29942c408daaa683520972e1ea",
    tcgPlayer: 505946,
  },
  text: [
    {
      title: "HEROISM",
      description:
        "When this character challenges and is banished, you may banish the challenged character.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Prince"],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          target: {
            selector: "chosen",
            count: 1,
            owner: "any",
            zones: ["play"],
            cardTypes: ["character"],
          },
          type: "banish",
        },
        type: "optional",
      },
      id: "152-1",
      name: "HEROISM",
      text: "HEROISM When this character challenges and is banished, you may banish the challenged character.",
      trigger: {
        event: "challenge",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
