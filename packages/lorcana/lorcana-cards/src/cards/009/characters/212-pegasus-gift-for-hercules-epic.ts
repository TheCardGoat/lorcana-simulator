import type { CharacterCard } from "@tcg/lorcana-types";
import { pegasusGiftForHerculesEpicI18n } from "./212-pegasus-gift-for-hercules-epic.i18n";

export const pegasusGiftForHerculesEpic: CharacterCard = {
  id: "fMf",
  canonicalId: "ci_Sj7",
  reprints: ["set4-084", "set9-084"],
  cardType: "character",
  name: "Pegasus",
  version: "Gift for Hercules",
  inkType: ["emerald"],
  franchise: "Hercules",
  set: "009",
  cardNumber: 212,
  rarity: "common",
  specialRarity: "epic",
  cost: 1,
  strength: 1,
  willpower: 1,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_5623b1aaf330477aa9d14cd755597509",
    tcgPlayer: 650149,
  },
  text: "Evasive",
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      id: "1fc-1",
      keyword: "Evasive",
      type: "keyword",
      text: "Evasive",
    },
  ],
  i18n: pegasusGiftForHerculesEpicI18n,
};
