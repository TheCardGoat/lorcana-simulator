import type { CharacterCard } from "@tcg/lorcana-types";

export const belleStrangeButSpecialEnchanted: CharacterCard = {
  id: "Mfr",
  canonicalId: "ci_5l8",
  reprints: ["set1-142"],
  cardType: "character",
  name: "Belle",
  version: "Strange but Special",
  i18n: {
    en: {
      name: "Belle",
      version: "Strange but Special",
      text: [
        {
          title: "READ A BOOK",
          description:
            "During your turn, you may put an additional card from your hand into your inkwell facedown.",
        },
        {
          title: "MY FAVORITE PART!",
          description:
            "While you have 10 or more cards in your inkwell, this character gets +4 {L}.",
        },
      ],
    },
    de: {
      name: "Belle",
      version: "Eine ganz besondere Mademoiselle",
      text: [
        {
          title: "LIES EIN BUCH!",
          description: "Du darfst in deinem Zug 1 weitere Karte tinten.",
        },
        {
          title: "MEIN LIEBLINGSBUCH",
          description:
            "Solange du 10 oder mehr Karten in deinem Tintenvorrat hast, erhält dieser Charakter +4.",
        },
      ],
    },
    fr: {
      name: "BELLE",
      version: "Étrange demoiselle",
      text: [
        {
          title: "LIRE UN LIVRE",
          description: "Durant votre tour, vous pouvez encrer une carte supplémentaire.",
        },
        {
          title: "MON PASSAGE PRÉFÉRÉ!",
          description:
            "Tant que vous avez 10 cartes ou plus dans votre réserve d'encre, ce personnage gagne +4.",
        },
      ],
    },
    it: {
      name: "Belle",
      version: "Strange but Special",
      text: [
        {
          title: "READ A BOOK",
          description: "During your turn, you may ink an additional card.",
        },
        {
          title: "MY FAVORITE PART!",
          description: "While you have 10 or more cards in your inkwell, this character gets +4.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Beauty and the Beast",
  set: "001",
  cardNumber: 214,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 4,
  strength: 2,
  willpower: 4,
  lore: 1,
  inkable: true,
  missingTests: true,
  externalIds: {
    lorcast: "crd_021c1d57c42d4fb7836097cbe9eacfb7",
    tcgPlayer: 510161,
  },
  text: [
    {
      title: "READ A BOOK",
      description:
        "During your turn, you may put an additional card from your hand into your inkwell facedown.",
    },
    {
      title: "MY FAVORITE PART!",
      description: "While you have 10 or more cards in your inkwell, this character gets +4 {L}.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Princess"],
  abilities: [
    {
      effect: {
        amount: 1,
        type: "additional-inkwell",
      },
      id: "uxx-1",
      name: "READ A BOOK",
      text: "**READ A BOOK** During your turn, you may put an additional card from your hand into your inkwell facedown.",
      type: "static",
    },
    {
      effect: {
        condition: {
          type: "inkwell-count",
          comparison: "greater-or-equal",
          controller: "you",
          count: 10,
        },
        then: {
          duration: "while-in-play",
          modifier: 4,
          stat: "lore",
          target: "SELF",
          type: "modify-stat",
        },
        type: "conditional",
      },
      id: "uxx-2",
      name: "MY FAVORITE PART!",
      text: "**MY FAVORITE PART!** While you have 10 or more cards in your inkwell, this character gets +4 {L}.",
      type: "static",
    },
  ],
};
