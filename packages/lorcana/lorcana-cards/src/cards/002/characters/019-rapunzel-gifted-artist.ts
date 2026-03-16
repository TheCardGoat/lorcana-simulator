import type { CharacterCard } from "@tcg/lorcana-types";

export const rapunzelGiftedArtist: CharacterCard = {
  id: "q6B",
  canonicalId: "ci_q6B",
  reprints: ["set2-019"],
  cardType: "character",
  name: "Rapunzel",
  version: "Gifted Artist",
  i18n: {
    en: {
      name: "Rapunzel",
      version: "Gifted Artist",
      text: [
        {
          title: "Shift 3",
        },
        {
          title: "LET YOUR POWER SHINE",
          description:
            "Whenever you remove 1 or more damage from one of your characters, you may draw a card.",
        },
      ],
    },
    de: {
      name: "Rapunzel",
      version: "Gifted Artist",
      text: [
        {
          title: "Shift 3",
          description:
            "(You may pay 3 to play this on top of one of your characters named Rapunzel.) LET YOUR POWER SHINE Whenever you remove 1 or more damage from one of your characters, you may draw a card.",
        },
      ],
    },
    fr: {
      name: "Rapunzel",
      version: "Gifted Artist",
      text: [
        {
          title: "Shift 3",
          description:
            "(You may pay 3 to play this on top of one of your characters named Rapunzel.) LET YOUR POWER SHINE Whenever you remove 1 or more damage from one of your characters, you may draw a card.",
        },
      ],
    },
    it: {
      name: "Rapunzel",
      version: "Gifted Artist",
      text: [
        {
          title: "Shift 3",
          description:
            "(You may pay 3 to play this on top of one of your characters named Rapunzel.) LET YOUR POWER SHINE Whenever you remove 1 or more damage from one of your characters, you may draw a card.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Tangled",
  set: "002",
  cardNumber: 19,
  rarity: "uncommon",
  cost: 5,
  strength: 0,
  willpower: 6,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_a324c0fddfab4d7681efcf47adae3c6d",
    tcgPlayer: 525089,
  },
  text: [
    {
      title: "Shift 3",
    },
    {
      title: "LET YOUR POWER SHINE",
      description:
        "Whenever you remove 1 or more damage from one of your characters, you may draw a card.",
    },
  ],
  classifications: ["Floodborn", "Hero", "Princess"],
  missingTests: true,
  abilities: [
    {
      cost: {
        ink: 3,
      },
      id: "n2g-1",
      keyword: "Shift",
      text: "Shift 3",
      type: "keyword",
    },
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          amount: 1,
          target: "CONTROLLER",
          type: "draw",
        },
        type: "optional",
      },
      id: "n2g-2",
      name: "LET YOUR POWER SHINE",
      text: "LET YOUR POWER SHINE Whenever you remove 1 or more damage from one of your characters, you may draw a card.",
      trigger: {
        event: "remove-damage",
        on: "YOUR_CHARACTERS",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
