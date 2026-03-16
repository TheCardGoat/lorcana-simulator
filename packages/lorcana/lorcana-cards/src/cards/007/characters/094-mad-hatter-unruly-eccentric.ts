import type { CharacterCard } from "@tcg/lorcana-types";

export const madHatterUnrulyEccentric: CharacterCard = {
  id: "RyL",
  canonicalId: "ci_6gF",
  reprints: ["set7-094"],
  cardType: "character",
  name: "Mad Hatter",
  version: "Unruly Eccentric",
  i18n: {
    en: {
      name: "Mad Hatter",
      version: "Unruly Eccentric",
      text: [
        {
          title: "UNBIRTHDAY PRESENT",
          description:
            "Whenever a damaged character challenges another character, you may draw a card.",
        },
      ],
    },
    de: {
      name: "Mad Hatter",
      version: "Unruly Eccentric",
      text: [
        {
          title: "UNBIRTHDAY PRESENT",
          description:
            "Whenever a damaged character challenges another character, you may draw a card.",
        },
      ],
    },
    fr: {
      name: "Mad Hatter",
      version: "Unruly Eccentric",
      text: [
        {
          title: "UNBIRTHDAY PRESENT",
          description:
            "Whenever a damaged character challenges another character, you may draw a card.",
        },
      ],
    },
    it: {
      name: "Mad Hatter",
      version: "Unruly Eccentric",
      text: [
        {
          title: "UNBIRTHDAY PRESENT",
          description:
            "Whenever a damaged character challenges another character, you may draw a card.",
        },
      ],
    },
  },
  inkType: ["emerald", "ruby"],
  franchise: "Alice in Wonderland",
  set: "007",
  cardNumber: 94,
  rarity: "rare",
  cost: 6,
  strength: 3,
  willpower: 5,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_6826d906dfc147e89f475f146034e75f",
    tcgPlayer: 619741,
  },
  text: [
    {
      title: "UNBIRTHDAY PRESENT",
      description:
        "Whenever a damaged character challenges another character, you may draw a card.",
    },
  ],
  classifications: ["Storyborn"],
  abilities: [
    {
      id: "11o-1",
      effect: {
        chooser: "CONTROLLER",
        effect: {
          amount: 1,
          target: "CONTROLLER",
          type: "draw",
        },
        type: "optional",
      },
      name: "UNBIRTHDAY PRESENT",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
      text: "UNBIRTHDAY PRESENT Whenever a damaged character challenges another character, you may draw a card.",
    },
  ],
};
