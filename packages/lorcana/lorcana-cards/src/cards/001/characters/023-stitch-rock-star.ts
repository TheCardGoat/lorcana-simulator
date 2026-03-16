import type { CharacterCard } from "@tcg/lorcana-types";

export const stitchRockStar: CharacterCard = {
  id: "kSG",
  canonicalId: "ci_zbd",
  reprints: ["set1-023", "set9-003"],
  cardType: "character",
  name: "Stitch",
  version: "Rock Star",
  i18n: {
    en: {
      name: "Stitch",
      version: "Rock Star",
      text: [
        {
          title: "Shift 4",
        },
        {
          title: "ADORING FANS",
          description:
            "Whenever you play a character with cost 2 or less, you may exert them to draw a card.",
        },
      ],
    },
    de: {
      name: "Stitch",
      version: "Rock Star",
      text: [
        {
          title: "Shift 4",
          description:
            "(You may pay 4 to play this on top of one of your characters named Stitch.) ADORING FANS Whenever you play a character with cost 2 or less, you may exert them to draw a card.",
        },
      ],
    },
    fr: {
      name: "Stitch",
      version: "Rock Star",
      text: [
        {
          title: "Shift 4",
          description:
            "(You may pay 4 to play this on top of one of your characters named Stitch.) ADORING FANS Whenever you play a character with cost 2 or less, you may exert them to draw a card.",
        },
      ],
    },
    it: {
      name: "Stitch",
      version: "Rock Star",
      text: [
        {
          title: "Shift 4",
          description:
            "(You may pay 4 to play this on top of one of your characters named Stitch.) ADORING FANS Whenever you play a character with cost 2 or less, you may exert them to draw a card.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Lilo and Stitch",
  set: "001",
  cardNumber: 23,
  rarity: "common",
  cost: 6,
  strength: 3,
  willpower: 5,
  lore: 3,
  inkable: true,
  missingTests: true,
  externalIds: {
    lorcast: "crd_1135ff76d7504441942b3f9e9edae58d",
    tcgPlayer: 649952,
  },
  text: [
    {
      title: "Shift 4",
    },
    {
      title: "ADORING FANS",
      description:
        "Whenever you play a character with cost 2 or less, you may exert them to draw a card.",
    },
  ],
  classifications: ["Floodborn", "Hero", "Alien"],
  abilities: [
    {
      cost: {
        ink: 4,
      },
      id: "y9k-1",
      keyword: "Shift",
      text: "Shift 4 {I}",
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
      id: "y9k-2",
      name: "ADORING FANS",
      text: "ADORING FANS Whenever you play a character with cost 2 or less, you may exert them to draw a card.",
      trigger: {
        event: "play",
        on: {
          cardType: "character",
          controller: "you",
          filters: [
            {
              type: "cost-comparison",
              comparison: "less-or-equal",
              value: 2,
            },
          ],
        },
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
