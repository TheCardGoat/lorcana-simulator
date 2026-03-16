import type { CharacterCard } from "@tcg/lorcana-types";

export const peterPanHighFlyer: CharacterCard = {
  id: "MnK",
  canonicalId: "ci_MnK",
  reprints: ["set10-105"],
  cardType: "character",
  name: "Peter Pan",
  version: "High Flyer",
  i18n: {
    en: {
      name: "Peter Pan",
      version: "High Flyer",
      text: "Evasive",
    },
    de: {
      name: "Peter Pan",
      version: "Überflieger",
      text: "Wendig",
    },
    fr: {
      name: "Peter Pan",
      version: "De haute volée",
      text: "Insaisissable",
    },
    it: {
      name: "Peter Pan",
      version: "Che Vola Alto",
      text: "Sfuggente",
    },
  },
  inkType: ["ruby"],
  franchise: "Peter Pan",
  set: "010",
  cardNumber: 105,
  rarity: "common",
  cost: 3,
  strength: 1,
  willpower: 3,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_9868e624b438444a9cdf1f4ef0878547",
    tcgPlayer: 659189,
  },
  text: "Evasive",
  classifications: ["Storyborn", "Hero"],
  abilities: [
    {
      id: "1sq-1",
      keyword: "Evasive",
      type: "keyword",
      text: "Evasive",
    },
  ],
};
