import type { CharacterCard } from "@tcg/lorcana-types";

export const idunaAlarmedQueen: CharacterCard = {
  id: "whR",
  canonicalId: "ci_HXk",
  reprints: ["set11-113"],
  cardType: "character",
  name: "Iduna",
  version: "Alarmed Queen",
  i18n: {
    en: {
      name: "Iduna",
      version: "Alarmed Queen",
      text: "Evasive",
    },
    de: {
      name: "Iduna",
      version: "Alarmierte Königin",
      text: "Wendig",
    },
    fr: {
      name: "Iduna",
      version: "Reine inquiète",
      text: "Insaisissable",
    },
    it: {
      name: "Iduna",
      version: "Regina Allarmata",
      text: "Sfuggente",
    },
  },
  inkType: ["ruby"],
  franchise: "Frozen",
  set: "011",
  cardNumber: 113,
  rarity: "common",
  cost: 2,
  strength: 2,
  willpower: 3,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_d79f18fa0da949079077eb5ecaad8426",
    tcgPlayer: 675499,
  },
  text: "Evasive",
  classifications: ["Storyborn", "Mentor", "Queen"],
  abilities: [
    {
      id: "mvk-1",
      keyword: "Evasive",
      type: "keyword",
      text: "Evasive",
    },
  ],
};
