import type { CharacterCard } from "@tcg/lorcana-types";

export const markowskiSpaceTrooper: CharacterCard = {
  id: "hrO",
  canonicalId: "ci_hrO",
  reprints: ["set6-113"],
  cardType: "character",
  name: "Markowski",
  version: "Space Trooper",
  i18n: {
    en: {
      name: "Markowski",
      version: "Space Trooper",
      text: "Evasive",
    },
    de: {
      name: "Markowski",
      version: "Soldat im All",
      text: "Wendig",
    },
    fr: {
      name: "Markowski",
      version: "Soldat de l'espace",
      text: "Insaisissable",
    },
    it: {
      name: "Markowski",
      version: "Soldato Spaziale",
      text: "Sfuggente",
    },
  },
  inkType: ["ruby"],
  franchise: "Wreck It Ralph",
  set: "006",
  cardNumber: 113,
  rarity: "common",
  cost: 4,
  strength: 3,
  willpower: 2,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_df8f4f463d6e4b7483db0bfccd609059",
    tcgPlayer: 592019,
  },
  text: "Evasive",
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      id: "1t3-1",
      keyword: "Evasive",
      type: "keyword",
      text: "Evasive",
    },
  ],
};
