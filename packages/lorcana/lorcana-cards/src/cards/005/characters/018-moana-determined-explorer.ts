import type { CharacterCard } from "@tcg/lorcana-types";

export const moanaDeterminedExplorer: CharacterCard = {
  id: "plr",
  canonicalId: "ci_plr",
  reprints: ["set5-018"],
  cardType: "character",
  name: "Moana",
  version: "Determined Explorer",
  i18n: {
    en: {
      name: "Moana",
      version: "Determined Explorer",
    },
    de: {
      name: "Vaiana",
      version: "Entschlossene Entdeckerin",
    },
    fr: {
      name: "Vaiana",
      version: "Exploratrice résolue",
    },
    it: {
      name: "Vaiana",
      version: "Esploratrice Determinata",
    },
  },
  inkType: ["amber"],
  franchise: "Moana",
  set: "005",
  cardNumber: 18,
  rarity: "rare",
  cost: 3,
  strength: 3,
  willpower: 4,
  lore: 2,
  inkable: false,
  vanilla: true,
  externalIds: {
    lorcast: "crd_da584233ea5149dd814bd6b372e015d5",
    tcgPlayer: 561602,
  },
  classifications: ["Storyborn", "Hero", "Princess"],
};
