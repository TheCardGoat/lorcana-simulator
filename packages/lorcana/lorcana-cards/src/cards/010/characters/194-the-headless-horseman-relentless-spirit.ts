import type { CharacterCard } from "@tcg/lorcana-types";
import { theHeadlessHorsemanRelentlessSpiritI18n } from "./194-the-headless-horseman-relentless-spirit.i18n";

export const theHeadlessHorsemanRelentlessSpirit: CharacterCard = {
  id: "Dfg",
  canonicalId: "ci_Dfg",
  reprints: ["set10-194"],
  cardType: "character",
  name: "The Headless Horseman",
  version: "Relentless Spirit",
  inkType: ["steel"],
  franchise: "Sleepy Hollow",
  set: "010",
  cardNumber: 194,
  rarity: "common",
  cost: 4,
  strength: 4,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_27747f32e8a3479cac5b138f81f0dff0",
    tcgPlayer: 660017,
  },
  text: "Bodyguard",
  classifications: ["Storyborn", "Villain"],
  abilities: [
    {
      id: "i51-1",
      keyword: "Bodyguard",
      text: "Bodyguard",
      type: "keyword",
    },
  ],
  i18n: theHeadlessHorsemanRelentlessSpiritI18n,
};
