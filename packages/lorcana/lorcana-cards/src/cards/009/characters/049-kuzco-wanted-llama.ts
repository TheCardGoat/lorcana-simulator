import type { CharacterCard } from "@tcg/lorcana-types";

export const kuzcoWantedLlama: CharacterCard = {
  id: "mBW",
  canonicalId: "ci_AlR",
  reprints: ["set2-045", "set9-049"],
  cardType: "character",
  name: "Kuzco",
  version: "Wanted Llama",
  i18n: {
    en: {
      name: "Kuzco",
      version: "Wanted Llama",
      text: [
        {
          title: "OK, WHERE AM I?",
          description: "When this character is banished, you may draw a card.",
        },
      ],
    },
    de: {
      name: "Kusco",
      version: "Gesuchtes Lama",
      text: [
        {
          title: "ALSO, WO BIN ICH?",
          description: "Wenn dieser Charakter verbannt wird, darfst du 1 Karte ziehen.",
        },
      ],
    },
    fr: {
      name: "Kuzco",
      version: "Lama recherché",
      text: [
        {
          title: "BON, ALORS, J'SUIS OÙ?",
          description: "Lorsque ce personnage est banni, vous pouvez piocher une carte.",
        },
      ],
    },
    it: {
      name: "Kuzco",
      version: "Wanted Llama",
      text: [
        {
          title: "OK, WHERE AM I?",
          description: "When this character is banished, you may draw a card.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Emperors New Groove",
  set: "009",
  cardNumber: 49,
  rarity: "common",
  cost: 2,
  strength: 1,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_21489dcd479a4d209a1b740f356fff6f",
    tcgPlayer: 647657,
  },
  text: [
    {
      title: "OK, WHERE AM I?",
      description: "When this character is banished, you may draw a card.",
    },
  ],
  classifications: ["Storyborn", "King"],
  abilities: [
    {
      id: "zpa-1",
      effect: {
        chooser: "CONTROLLER",
        effect: {
          amount: 1,
          target: "CONTROLLER",
          type: "draw",
        },
        type: "optional",
      },
      type: "action",
      text: "OK, WHERE AM I? When this character is banished, you may draw a card.",
    },
  ],
};
