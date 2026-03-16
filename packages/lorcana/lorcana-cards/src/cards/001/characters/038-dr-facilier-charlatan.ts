import type { CharacterCard } from "@tcg/lorcana-types";

export const drFacilierCharlatan: CharacterCard = {
  id: "wGC",
  canonicalId: "ci_wGC",
  reprints: ["set1-038"],
  cardType: "character",
  name: "Dr. Facilier",
  version: "Charlatan",
  i18n: {
    en: {
      name: "Dr. Facilier",
      version: "Charlatan",
      text: "Challenger +2",
    },
    de: {
      name: "Dr. Facilier",
      version: "Scharlatan",
      text: "Herausfordern +2",
    },
    fr: {
      name: "DR. FACILIER",
      version: "Charlatan",
      text: "Offensif +2",
    },
    it: {
      name: "Dr. Facilier",
      version: "Charlatan",
      text: "Challenger +2 (While challenging, this character gets +2.)",
    },
  },
  inkType: ["amethyst"],
  franchise: "Princess and the Frog",
  set: "001",
  cardNumber: 38,
  rarity: "common",
  cost: 2,
  strength: 0,
  willpower: 4,
  lore: 1,
  inkable: true,
  missingTests: true,
  externalIds: {
    lorcast: "crd_17c7228380dd4d8e8b5e2cce3058d9d3",
    tcgPlayer: 494099,
  },
  text: "Challenger +2",
  classifications: ["Storyborn", "Villain", "Sorcerer"],
  abilities: [
    {
      id: "8u0-1",
      keyword: "Challenger",
      type: "keyword",
      value: 2,
      text: "Challenger +2",
    },
  ],
};
