import type { CharacterCard } from "@tcg/lorcana-types";

export const donaldDuckSleepwalker: CharacterCard = {
  id: "oVH",
  canonicalId: "ci_P3k",
  reprints: ["set2-078", "set9-083"],
  cardType: "character",
  name: "Donald Duck",
  version: "Sleepwalker",
  i18n: {
    en: {
      name: "Donald Duck",
      version: "Sleepwalker",
      text: [
        {
          title: "STARTLED AWAKE",
          description: "Whenever you play an action, this character gets +2 {S} this turn.",
        },
      ],
    },
    de: {
      name: "Donald Duck",
      version: "Schlafwandler",
      text: [
        {
          title: "AUFSCHRECKEN",
          description:
            "Jedes Mal, wenn du eine Aktion ausspielst, erhält dieser Charakter in diesem Zug +2.",
        },
      ],
    },
    fr: {
      name: "Donald",
      version: "Somnambule",
      text: [
        {
          title: "RÉVEIL EN SURSAUT",
          description:
            "Chaque fois que vous jouez une carte Action, ce personnage gagne +2 pour le reste de ce tour.",
        },
      ],
    },
    it: {
      name: "Donald Duck",
      version: "Sleepwalker",
      text: [
        {
          title: "STARTLED AWAKE",
          description: "Whenever you play an action, this character gets +2 this turn.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  set: "009",
  cardNumber: 83,
  rarity: "common",
  cost: 3,
  strength: 0,
  willpower: 5,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_a93802d7a13a4535acb8c9a6bc31dfc2",
    tcgPlayer: 650023,
  },
  text: [
    {
      title: "STARTLED AWAKE",
      description: "Whenever you play an action, this character gets +2 {S} this turn.",
    },
  ],
  classifications: ["Storyborn"],
  abilities: [
    {
      effect: {
        duration: "this-turn",
        modifier: 2,
        stat: "strength",
        target: "SELF",
        type: "modify-stat",
      },
      id: "1nl-1",
      name: "STARTLED AWAKE",
      text: "STARTLED AWAKE Whenever you play an action, this character gets +2 {S} this turn.",
      trigger: {
        event: "play",
        on: {
          cardType: "action",
          controller: "you",
        },
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
