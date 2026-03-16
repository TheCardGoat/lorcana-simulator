import type { CharacterCard } from "@tcg/lorcana-types";

export const pigletVerySmallAnimal: CharacterCard = {
  id: "sVL",
  canonicalId: "ci_sVL",
  reprints: ["set2-018"],
  cardType: "character",
  name: "Piglet",
  version: "Very Small Animal",
  i18n: {
    en: {
      name: "Piglet",
      version: "Very Small Animal",
    },
    de: {
      name: "Ferkel",
      version: "So ein kleines Tier",
    },
    fr: {
      name: "Porcinet",
      version: "Si petit animal",
    },
    it: {
      name: "Pimpi",
      version: "Animale Molto Piccolo",
    },
  },
  inkType: ["amber"],
  franchise: "Winnie the Pooh",
  set: "002",
  cardNumber: 18,
  rarity: "common",
  cost: 3,
  strength: 2,
  willpower: 4,
  lore: 2,
  inkable: true,
  vanilla: true,
  externalIds: {
    lorcast: "crd_9eba1ff8237f48d9aa89b725e90e2fb4",
    tcgPlayer: 527720,
  },
  classifications: ["Storyborn", "Ally"],
};
