import type { CharacterCard } from "@tcg/lorcana-types";

export const vanellopeVonSchweetzSugarRushPrincess: CharacterCard = {
  id: "5Sq",
  canonicalId: "ci_MsB",
  reprints: ["set5-019"],
  cardType: "character",
  name: "Vanellope von Schweetz",
  version: "Sugar Rush Princess",
  i18n: {
    en: {
      name: "Vanellope von Schweetz",
      version: "Sugar Rush Princess",
      text: [
        {
          title: "Shift 2",
        },
        {
          title: "I HEREBY DECREE",
          description:
            "Whenever you play another Princess character, all opposing characters get -1 {S} until the start of your next turn.",
        },
      ],
    },
    de: {
      name: "Vanellope von Schweetz",
      version: "Sugar Rush Princess",
      text: [
        {
          title: "Shift 2",
          description:
            "(You may pay 2 to play this on top of one of your characters named Vanellope von Schweetz.) I HEREBY DECREE Whenever you play another Princess character, all opposing characters get -1 until the start of your next turn.",
        },
      ],
    },
    fr: {
      name: "Vanellope von Schweetz",
      version: "Sugar Rush Princess",
      text: [
        {
          title: "Shift 2",
          description:
            "(You may pay 2 to play this on top of one of your characters named Vanellope von Schweetz.) I HEREBY DECREE Whenever you play another Princess character, all opposing characters get -1 until the start of your next turn.",
        },
      ],
    },
    it: {
      name: "Vanellope von Schweetz",
      version: "Sugar Rush Princess",
      text: [
        {
          title: "Shift 2",
          description:
            "(You may pay 2 to play this on top of one of your characters named Vanellope von Schweetz.) I HEREBY DECREE Whenever you play another Princess character, all opposing characters get -1 until the start of your next turn.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Wreck It Ralph",
  set: "005",
  cardNumber: 19,
  rarity: "rare",
  cost: 4,
  strength: 2,
  willpower: 4,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_6d0b490fddd34aab828b26cb90a827d6",
    tcgPlayer: 561992,
  },
  text: [
    {
      title: "Shift 2",
    },
    {
      title: "I HEREBY DECREE",
      description:
        "Whenever you play another Princess character, all opposing characters get -1 {S} until the start of your next turn.",
    },
  ],
  classifications: ["Floodborn", "Hero", "Princess", "Racer"],
  abilities: [
    {
      cost: {
        ink: 2,
      },
      id: "s65-1",
      keyword: "Shift",
      text: "Shift 2",
      type: "keyword",
    },
    {
      effect: {
        modifier: -1,
        stat: "strength",
        target: "CHOSEN_CHARACTER",
        type: "modify-stat",
      },
      id: "s65-2",
      name: "I HEREBY DECREE",
      text: "I HEREBY DECREE Whenever you play another Princess character, all opposing characters get -1 {S} until the start of your next turn.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
