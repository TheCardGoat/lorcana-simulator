import type { CharacterCard } from "@tcg/lorcana-types";
import { eeyoreOverstuffedDonkeyI18n } from "./183-eeyore-overstuffed-donkey.i18n";

export const eeyoreOverstuffedDonkey: CharacterCard = {
  id: "5Xs",
  canonicalId: "ci_n7U",
  reprints: ["set3-172", "set9-183"],
  cardType: "character",
  name: "Eeyore",
  version: "Overstuffed Donkey",
  inkType: ["steel"],
  franchise: "Winnie the Pooh",
  set: "009",
  cardNumber: 183,
  rarity: "common",
  cost: 5,
  strength: 4,
  willpower: 5,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_214cf74b7c2e445282009e4d227b2519",
    tcgPlayer: 650116,
  },
  text: "Resist +1",
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      id: "16o-1",
      keyword: "Resist",
      type: "keyword",
      value: 1,
      text: "Resist +1",
    },
  ],
  i18n: eeyoreOverstuffedDonkeyI18n,
};
