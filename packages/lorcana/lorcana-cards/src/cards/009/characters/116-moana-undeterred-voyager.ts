import type { CharacterCard } from "@tcg/lorcana-types";

export const moanaUndeterredVoyager: CharacterCard = {
  id: "6ld",
  canonicalId: "ci_HAc",
  reprints: ["set3-117", "set9-116"],
  cardType: "character",
  name: "Moana",
  version: "Undeterred Voyager",
  i18n: {
    en: {
      name: "Moana",
      version: "Undeterred Voyager",
      text: "Evasive",
    },
    de: {
      name: "Vaiana",
      version: "Unerschrockene Seefahrerin",
      text: "Wendig",
    },
    fr: {
      name: "Vaiana",
      version: "Voyageuse jamais découragée",
      text: "Insaisissable",
    },
    it: {
      name: "Vaiana",
      version: "Viaggiatrice Imperterrita",
      text: "Sfuggente",
    },
  },
  inkType: ["ruby"],
  franchise: "Moana",
  set: "009",
  cardNumber: 116,
  rarity: "common",
  cost: 4,
  strength: 3,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_0f11f39f42d84f9cb09ca24a2893f39d",
    tcgPlayer: 650052,
  },
  text: "Evasive",
  classifications: ["Storyborn", "Hero", "Princess"],
  abilities: [
    {
      id: "d5c-1",
      keyword: "Evasive",
      type: "keyword",
      text: "Evasive",
    },
  ],
};
