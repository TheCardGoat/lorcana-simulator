import type { CharacterCard } from "@tcg/lorcana-types";
import { helgaSinclairRighthandWomanI18n } from "./175-helga-sinclair-right-hand-woman.i18n";

export const helgaSinclairRighthandWoman: CharacterCard = {
  id: "Sz8",
  canonicalId: "ci_Sz8",
  reprints: ["set3-175"],
  cardType: "character",
  name: "Helga Sinclair",
  version: "Right-Hand Woman",
  inkType: ["steel"],
  franchise: "Atlantis",
  set: "003",
  cardNumber: 175,
  rarity: "common",
  cost: 3,
  strength: 2,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_7cc596998ca54d02b163996079f18414",
    tcgPlayer: 536283,
  },
  text: "Challenger +2",
  classifications: ["Storyborn", "Villain"],
  abilities: [
    {
      id: "1fd-1",
      keyword: "Challenger",
      type: "keyword",
      value: 2,
      text: "Challenger +2",
    },
  ],
  i18n: helgaSinclairRighthandWomanI18n,
};
