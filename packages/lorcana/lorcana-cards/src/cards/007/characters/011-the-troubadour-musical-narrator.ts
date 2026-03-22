import type { CharacterCard } from "@tcg/lorcana-types";
import { theTroubadourMusicalNarratorI18n } from "./011-the-troubadour-musical-narrator.i18n";

export const theTroubadourMusicalNarrator: CharacterCard = {
  id: "k1P",
  canonicalId: "ci_k1P",
  reprints: ["set7-011"],
  cardType: "character",
  name: "The Troubadour",
  version: "Musical Narrator",
  inkType: ["amber", "steel"],
  set: "007",
  cardNumber: 11,
  rarity: "uncommon",
  cost: 2,
  strength: 1,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_7f80a94bb56149dea86cbcf92b7eff6f",
    tcgPlayer: 618128,
  },
  text: [
    {
      title: "Resist +1",
    },
    {
      title: "Singer 4",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      id: "1is-1",
      keyword: "Resist",
      type: "keyword",
      value: 1,
      text: "Resist +1",
    },
    {
      id: "1is-2",
      keyword: "Singer",
      type: "keyword",
      value: 4,
      text: "Singer 4",
    },
  ],
  i18n: theTroubadourMusicalNarratorI18n,
};
