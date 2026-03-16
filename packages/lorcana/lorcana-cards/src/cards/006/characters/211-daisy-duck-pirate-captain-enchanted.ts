import type { CharacterCard } from "@tcg/lorcana-types";

export const daisyDuckPirateCaptainEnchanted: CharacterCard = {
  id: "JjK",
  canonicalId: "ci_Ad0",
  reprints: ["set6-081"],
  cardType: "character",
  name: "Daisy Duck",
  version: "Pirate Captain",
  i18n: {
    en: {
      name: "Daisy Duck",
      version: "Pirate Captain",
      text: [
        {
          title: "DISTANT SHORES",
          description:
            "Whenever one of your Pirate characters quests while at a location, draw a card.",
        },
      ],
    },
    de: {
      name: "Daisy Duck",
      version: "Pirate Captain",
      text: [
        {
          title: "DISTANT SHORES",
          description:
            "Whenever one of your Pirate characters quests while at a location, draw a card.",
        },
      ],
    },
    fr: {
      name: "Daisy Duck",
      version: "Pirate Captain",
      text: [
        {
          title: "DISTANT SHORES",
          description:
            "Whenever one of your Pirate characters quests while at a location, draw a card.",
        },
      ],
    },
    it: {
      name: "Daisy Duck",
      version: "Pirate Captain",
      text: [
        {
          title: "DISTANT SHORES",
          description:
            "Whenever one of your Pirate characters quests while at a location, draw a card.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  set: "006",
  cardNumber: 211,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 4,
  strength: 3,
  willpower: 3,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_21bfac43fba64c06ab62139f3befd6c1",
    tcgPlayer: 592040,
  },
  text: [
    {
      title: "DISTANT SHORES",
      description:
        "Whenever one of your Pirate characters quests while at a location, draw a card.",
    },
  ],
  classifications: ["Dreamborn", "Hero", "Pirate", "Captain"],
  abilities: [
    {
      effect: {
        amount: 1,
        target: "CONTROLLER",
        type: "draw",
      },
      id: "zzu-1",
      name: "DISTANT SHORES",
      text: "DISTANT SHORES Whenever one of your Pirate characters quests while at a location, draw a card.",
      trigger: {
        event: "banish",
        on: "YOUR_OTHER_CHARACTERS",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
