import type { CharacterCard } from "@tcg/lorcana-types";

export const bashfulHopelessRomantic: CharacterCard = {
  id: "0Tb",
  canonicalId: "ci_0Tb",
  reprints: ["set2-001"],
  cardType: "character",
  name: "Bashful",
  version: "Hopeless Romantic",
  i18n: {
    en: {
      name: "Bashful",
      version: "Hopeless Romantic",
      text: [
        {
          title: "OH, GOSH!",
          description:
            "This character can't quest unless you have another Seven Dwarfs character in play.",
        },
      ],
    },
    de: {
      name: "Pimpel",
      version: "Hoffnungsloser Romantiker",
      text: [
        {
          title: "OH, JA!",
          description:
            "Dieser Charakter kann nicht erkunden, außer du hast mindestens einen weiteren der Sieben Zwerge im Spiel.",
        },
      ],
    },
    fr: {
      name: "Timide",
      version: "Grand sentimental",
      text: [
        {
          title: "OH...",
          description:
            "Vous devez avoir un autre personnage Sept Nains en jeu pour pouvoir envoyer ce personnage à l'aventure.",
        },
      ],
    },
    it: {
      name: "Bashful",
      version: "Hopeless Romantic",
      text: [
        {
          title: "OH, GOSH!",
          description:
            "This character can't quest unless you have another Seven Dwarfs character in play.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Snow White",
  set: "002",
  cardNumber: 1,
  rarity: "uncommon",
  cost: 4,
  strength: 2,
  willpower: 5,
  lore: 3,
  inkable: true,
  externalIds: {
    lorcast: "crd_ac175f73ee3c4cce86c8ffe6d32db73a",
    tcgPlayer: 526599,
  },
  text: [
    {
      title: "OH, GOSH!",
      description:
        "This character can't quest unless you have another Seven Dwarfs character in play.",
    },
  ],
  classifications: ["Storyborn", "Ally", "Seven Dwarfs"],
  abilities: [
    {
      condition: {
        type: "not",
        condition: {
          type: "has-character-count",
          classification: "Seven Dwarfs",
          comparison: "greater-or-equal",
          controller: "you",
          count: 2,
        },
      },
      effect: {
        restriction: "cant-quest",
        target: "SELF",
        type: "restriction",
      },
      id: "1ff-1",
      name: "OH, GOSH!",
      text: "OH, GOSH! This character can't quest unless you have another Seven Dwarfs character in play.",
      type: "static",
    },
  ],
};
