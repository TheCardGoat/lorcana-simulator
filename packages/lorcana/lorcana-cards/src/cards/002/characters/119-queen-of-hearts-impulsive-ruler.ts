import type { CharacterCard } from "@tcg/lorcana-types";

export const queenOfHeartsImpulsiveRuler: CharacterCard = {
  id: "D0w",
  canonicalId: "ci_cCq",
  reprints: ["set2-119", "set9-123"],
  cardType: "character",
  name: "Queen of Hearts",
  version: "Impulsive Ruler",
  i18n: {
    en: {
      name: "Queen of Hearts",
      version: "Impulsive Ruler",
      text: "Rush",
    },
    de: {
      name: "Die Herzkönigin",
      version: "Impulsive Herrscherin",
      text: "Rasant",
    },
    fr: {
      name: "La Reine de Cœur",
      version: "Souveraine impulsive",
      text: "Charge",
    },
    it: {
      name: "Queen of Hearts",
      version: "Impulsive Ruler",
      text: [
        {
          title: "Rush",
          description: "(This character can challenge the turn they're played.)",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Alice in Wonderland",
  set: "002",
  cardNumber: 119,
  rarity: "uncommon",
  cost: 2,
  strength: 2,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_2eb6be8b7b7a4bd6b131eacfee97dbc0",
    tcgPlayer: 650058,
  },
  text: "Rush",
  classifications: ["Storyborn", "Villain", "Queen"],
  abilities: [
    {
      id: "106-1",
      keyword: "Rush",
      type: "keyword",
      text: "Rush",
    },
  ],
};
