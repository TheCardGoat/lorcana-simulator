import type { CharacterCard } from "@tcg/lorcana-types";

export const tinkerBellFastFlier: CharacterCard = {
  id: "kEF",
  canonicalId: "ci_kEF",
  reprints: ["set6-043"],
  cardType: "character",
  name: "Tinker Bell",
  version: "Fast Flier",
  i18n: {
    en: {
      name: "Tinker Bell",
      version: "Fast Flier",
      text: "Evasive",
    },
    de: {
      name: "Naseweis",
      version: "Flinke Fliegerin",
      text: "Wendig",
    },
    fr: {
      name: "La Fée Clochette",
      version: "Volant à toute allure",
      text: "Insaisissable",
    },
    it: {
      name: "Trilli",
      version: "Ali Rapide",
      text: "Sfuggente",
    },
  },
  inkType: ["amethyst"],
  franchise: "Peter Pan",
  set: "006",
  cardNumber: 43,
  rarity: "common",
  cost: 3,
  strength: 1,
  willpower: 3,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_ea5cca0b6f8747b8a438b6cdced02d93",
    tcgPlayer: 593045,
  },
  text: "Evasive",
  classifications: ["Storyborn", "Ally", "Fairy"],
  abilities: [
    {
      id: "1k9-1",
      keyword: "Evasive",
      type: "keyword",
      text: "Evasive",
    },
  ],
};
