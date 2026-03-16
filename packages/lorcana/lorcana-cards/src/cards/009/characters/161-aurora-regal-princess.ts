import type { CharacterCard } from "@tcg/lorcana-types";

export const auroraRegalPrincess: CharacterCard = {
  id: "Pi7",
  canonicalId: "ci_LLH",
  reprints: ["set1-140", "set9-161"],
  cardType: "character",
  name: "Aurora",
  version: "Regal Princess",
  i18n: {
    en: {
      name: "Aurora",
      version: "Regal Princess",
    },
    de: {
      name: "Aurora",
      version: "Vornehme Prinzessin",
    },
    fr: {
      name: "AURORE",
      version: "Princesse Royale",
    },
    it: {
      name: "Aurora",
      version: "Principessa Regale",
    },
  },
  inkType: ["sapphire"],
  franchise: "Sleeping Beauty",
  set: "009",
  cardNumber: 161,
  rarity: "uncommon",
  cost: 2,
  strength: 2,
  willpower: 2,
  lore: 2,
  inkable: true,
  vanilla: true,
  externalIds: {
    lorcast: "crd_3935700ef8a04122935f3a9289dfa4af",
    tcgPlayer: 650095,
  },
  classifications: ["Storyborn", "Hero", "Princess"],
};
