import type { CharacterCard } from "@tcg/lorcana-types";
import { kaaSecretiveSnakeEpicI18n } from "./212-kaa-secretive-snake-epic.i18n";

export const kaaSecretiveSnakeEpic: CharacterCard = {
  id: "7c9",
  canonicalId: "ci_qS6",
  reprints: ["set10-079"],
  cardType: "character",
  name: "Kaa",
  version: "Secretive Snake",
  inkType: ["emerald"],
  franchise: "Jungle Book",
  set: "010",
  cardNumber: 212,
  rarity: "common",
  specialRarity: "epic",
  cost: 7,
  strength: 6,
  willpower: 7,
  lore: 3,
  inkable: true,
  externalIds: {
    lorcast: "crd_f2d99b79354c466ebcaaeadcba69678e",
    tcgPlayer: 660191,
  },
  text: "Evasive",
  classifications: ["Storyborn", "Villain"],
  abilities: [
    {
      id: "r2h-1",
      keyword: "Evasive",
      type: "keyword",
      text: "Evasive",
    },
  ],
  i18n: kaaSecretiveSnakeEpicI18n,
};
