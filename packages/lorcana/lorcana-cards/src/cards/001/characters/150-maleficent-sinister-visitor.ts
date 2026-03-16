import type { CharacterCard } from "@tcg/lorcana-types";

export const maleficentSinisterVisitor: CharacterCard = {
  id: "LcD",
  canonicalId: "ci_LcD",
  reprints: ["set1-150"],
  cardType: "character",
  name: "Maleficent",
  version: "Sinister Visitor",
  i18n: {
    en: {
      name: "Maleficent",
      version: "Sinister Visitor",
    },
    de: {
      name: "Malefiz",
      version: "Böser Besuch",
    },
    fr: {
      name: "MALÉFIQUE",
      version: "Sinistre visiteuse",
    },
    it: {
      name: "Maleficent",
      version: "Sinister Visitor",
    },
  },
  inkType: ["sapphire"],
  franchise: "Sleeping Beauty",
  set: "001",
  cardNumber: 150,
  rarity: "common",
  cost: 4,
  strength: 3,
  willpower: 4,
  lore: 2,
  inkable: true,
  missingTests: true,
  vanilla: true,
  externalIds: {
    lorcast: "crd_071ac28029b947ea8bf6b77d287ff401",
    tcgPlayer: 493493,
  },
  classifications: ["Storyborn", "Villain", "Sorcerer"],
};
