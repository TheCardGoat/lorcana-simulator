import type { CharacterCard } from "@tcg/lorcana-types";

export const heathcliffStoicButler: CharacterCard = {
  id: "tMg",
  canonicalId: "ci_tMg",
  reprints: ["set6-078"],
  cardType: "character",
  name: "Heathcliff",
  version: "Stoic Butler",
  i18n: {
    en: {
      name: "Heathcliff",
      version: "Stoic Butler",
      text: "Ward",
    },
    de: {
      name: "Heathcliff",
      version: "Aristokratischer Butler",
      text: "Behütet",
    },
    fr: {
      name: "Heathcliff",
      version: "Majordome stoïque",
      text: "Hors d'atteinte",
    },
    it: {
      name: "Heathcliff",
      version: "Stoico Maggiordomo",
      text: "Protetto",
    },
  },
  inkType: ["emerald"],
  franchise: "Big Hero 6",
  set: "006",
  cardNumber: 78,
  rarity: "common",
  cost: 4,
  strength: 3,
  willpower: 3,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_aab30247315a46debf548693f0b814c0",
    tcgPlayer: 593010,
  },
  text: "Ward",
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      id: "fob-1",
      keyword: "Ward",
      type: "keyword",
      text: "Ward",
    },
  ],
};
