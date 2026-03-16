import type { CharacterCard } from "@tcg/lorcana-types";

export const merlinGoat: CharacterCard = {
  id: "nZn",
  canonicalId: "ci_nZn",
  reprints: ["set2-051"],
  cardType: "character",
  name: "Merlin",
  version: "Goat",
  i18n: {
    en: {
      name: "Merlin",
      version: "Goat",
      text: [
        {
          title: "HERE I COME!",
          description: "When you play this character and when he leaves play, gain 1 lore.",
        },
      ],
    },
    de: {
      name: "Merlin",
      version: "Ziege",
      text: [
        {
          title: "JETZT KOMME ICH!",
          description:
            "Wenn du diesen Charakter ausspielst und wenn er das Spiel verlässt, sammelst du 1 Legende.",
        },
      ],
    },
    fr: {
      name: "Merlin",
      version: "En chèvre",
      text: [
        {
          title: "ATTENTION, J'ARRIVE!",
          description:
            "Lorsque vous jouez ce personnage et lorsqu'il quitte la zone de jeu, gagnez 1 éclat de Lore.",
        },
      ],
    },
    it: {
      name: "Merlin",
      version: "Goat",
      text: [
        {
          title: "HERE I COME!",
          description: "When you play this character and when he leaves play, gain 1 lore.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Sword in the Stone",
  set: "002",
  cardNumber: 51,
  rarity: "uncommon",
  cost: 4,
  strength: 4,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_760a3c258ef143de8f8e85176c0bfd1d",
    tcgPlayer: 522719,
  },
  text: [
    {
      title: "HERE I COME!",
      description: "When you play this character and when he leaves play, gain 1 lore.",
    },
  ],
  classifications: ["Storyborn", "Mentor", "Sorcerer"],
  missingTests: true,
  abilities: [
    {
      effect: {
        steps: [
          {
            from: "hand",
            type: "play-card",
          },
          {
            amount: 1,
            type: "gain-lore",
          },
        ],
        type: "sequence",
      },
      id: "198-1",
      name: "HERE I COME! When you play this character and",
      text: "HERE I COME! When you play this character and when he leaves play, gain 1 lore.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
