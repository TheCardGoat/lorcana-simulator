import type { CharacterCard } from "@tcg/lorcana-types";

export const theQueenWickedAndVain: CharacterCard = {
  id: "hNb",
  canonicalId: "ci_yYu",
  reprints: ["set1-056", "set9-035"],
  cardType: "character",
  name: "The Queen",
  version: "Wicked and Vain",
  i18n: {
    en: {
      name: "The Queen",
      version: "Wicked and Vain",
      text: [
        {
          title: "I SUMMON THEE",
          description: "{E} — Draw a card.",
        },
      ],
    },
    de: {
      name: "Die Königin",
      version: "Boshaft und eitel",
      text: [
        {
          title: "HÖRE MICH!",
          description: "— Ziehe 1 Karte.",
        },
      ],
    },
    fr: {
      name: "LA REINE",
      version: "Vaniteuse et malfaisante",
      text: [
        {
          title: "JE TE L'ORDONNE",
          description: "— Piochez une carte.",
        },
      ],
    },
    it: {
      name: "The Queen",
      version: "Wicked and Vain",
      text: [
        {
          title: "I SUMMON THEE",
          description: "— Draw a card.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Snow White",
  set: "009",
  cardNumber: 35,
  rarity: "rare",
  cost: 5,
  strength: 4,
  willpower: 5,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_ab6a9775bfbb446bb03724f1f7ba0f3a",
    tcgPlayer: 649982,
  },
  text: [
    {
      title: "I SUMMON THEE",
      description: "{E} — Draw a card.",
    },
  ],
  classifications: ["Storyborn", "Villain", "Queen"],
  abilities: [
    {
      id: "2kk-1",
      cost: {
        exert: true,
      },
      effect: {
        amount: 1,
        target: "CONTROLLER",
        type: "draw",
      },
      type: "activated",
      text: "I SUMMON THEE {E} — Draw a card.",
    },
  ],
};
