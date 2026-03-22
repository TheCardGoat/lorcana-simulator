import type { CharacterCard } from "@tcg/lorcana-types";
import { peterPansShadowNotSewnOnI18n } from "./042-peter-pans-shadow-not-sewn-on.i18n";

export const peterPansShadowNotSewnOn: CharacterCard = {
  id: "o8t",
  canonicalId: "ci_5eN",
  reprints: ["set2-055", "set9-042"],
  cardType: "character",
  name: "Peter Pan's Shadow",
  version: "Not Sewn On",
  inkType: ["amethyst"],
  franchise: "Peter Pan",
  set: "009",
  cardNumber: 42,
  rarity: "common",
  cost: 4,
  strength: 2,
  willpower: 3,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_929d3fa7c5324a1dbc9ebc1d93bbee6d",
    tcgPlayer: 649989,
  },
  text: [
    {
      title: "Rush",
    },
    {
      title: "Evasive",
    },
    {
      title: "TIPTOE",
      description: "Your other characters with Rush gain Evasive.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      id: "1n6-1",
      keyword: "Rush",
      text: "Rush",
      type: "keyword",
    },
    {
      id: "1n6-2",
      keyword: "Evasive",
      text: "Evasive",
      type: "keyword",
    },
    {
      effect: {
        keyword: "Evasive",
        target: "YOUR_CHARACTERS",
        type: "gain-keyword",
      },
      id: "1n6-3",
      text: "TIPTOE Your other characters with Rush gain Evasive.",
      type: "action",
    },
  ],
  i18n: peterPansShadowNotSewnOnI18n,
};
