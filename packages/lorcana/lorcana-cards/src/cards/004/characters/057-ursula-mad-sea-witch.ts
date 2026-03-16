import type { CharacterCard } from "@tcg/lorcana-types";

export const ursulaMadSeaWitch: CharacterCard = {
  id: "pPz",
  canonicalId: "ci_pPz",
  reprints: ["set4-057"],
  cardType: "character",
  name: "Ursula",
  version: "Mad Sea Witch",
  i18n: {
    en: {
      name: "Ursula",
      version: "Mad Sea Witch",
      text: "Challenger +2",
    },
    de: {
      name: "Ursula",
      version: "Verrückte Seehexe",
      text: "Herausfordern +2",
    },
    fr: {
      name: "Ursula",
      version: "Sorcière des mers enragée",
      text: "Offensif +2",
    },
    it: {
      name: "Ursula",
      version: "Folle Strega del Mare",
      text: "Sfidante +2",
    },
  },
  inkType: ["amethyst"],
  franchise: "Little Mermaid",
  set: "004",
  cardNumber: 57,
  rarity: "uncommon",
  cost: 2,
  strength: 1,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_3bee770abeec4669a01be3a0e307cf14",
    tcgPlayer: 550570,
  },
  text: "Challenger +2",
  classifications: ["Dreamborn", "Villain", "Sorcerer"],
  abilities: [
    {
      id: "ui8-1",
      keyword: "Challenger",
      type: "keyword",
      value: 2,
      text: "Challenger +2",
    },
  ],
};
