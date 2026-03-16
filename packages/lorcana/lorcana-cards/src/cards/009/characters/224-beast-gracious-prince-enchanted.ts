import type { CharacterCard } from "@tcg/lorcana-types";

export const beastGraciousPrinceEnchanted: CharacterCard = {
  id: "f7n",
  canonicalId: "ci_TjB",
  reprints: ["set9-004"],
  cardType: "character",
  name: "Beast",
  version: "Gracious Prince",
  i18n: {
    en: {
      name: "Beast",
      version: "Gracious Prince",
      text: [
        {
          title: "FULL DANCE CARD",
          description: "Your Princess characters get +1 {S} and +1 {W}.",
        },
      ],
    },
    de: {
      name: "Beast",
      version: "Gracious Prince",
      text: [
        {
          title: "FULL DANCE CARD",
          description: "Your Princess characters get +1 and +1.",
        },
      ],
    },
    fr: {
      name: "Beast",
      version: "Gracious Prince",
      text: [
        {
          title: "FULL DANCE CARD",
          description: "Your Princess characters get +1 and +1.",
        },
      ],
    },
    it: {
      name: "Beast",
      version: "Gracious Prince",
      text: [
        {
          title: "FULL DANCE CARD",
          description: "Your Princess characters get +1 and +1.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Beauty and the Beast",
  set: "009",
  cardNumber: 224,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 5,
  strength: 5,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_8016f590ebb344a2934d76f614fedbba",
    tcgPlayer: 651122,
  },
  text: [
    {
      title: "FULL DANCE CARD",
      description: "Your Princess characters get +1 {S} and +1 {W}.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Prince"],
  abilities: [
    {
      effect: {
        modifier: 1,
        stat: "strength",
        target: "YOUR_CHARACTERS",
        type: "modify-stat",
      },
      id: "144-1",
      name: "FULL DANCE CARD Your Princess",
      text: "FULL DANCE CARD Your Princess characters get +1 {S} and +1 {W}.",
      type: "static",
    },
  ],
};
