import type { CharacterCard } from "@tcg/lorcana-types";
import { kidaRoyalWarriorI18n } from "./177-kida-royal-warrior.i18n";

export const kidaRoyalWarrior: CharacterCard = {
  id: "wgF",
  canonicalId: "ci_wgF",
  reprints: ["set3-177"],
  cardType: "character",
  name: "Kida",
  version: "Royal Warrior",
  inkType: ["steel"],
  franchise: "Atlantis",
  set: "003",
  cardNumber: 177,
  rarity: "common",
  cost: 2,
  strength: 2,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_3cead19199044fd5bb448a13f2ce8189",
    tcgPlayer: 536564,
  },
  text: "Bodyguard",
  classifications: ["Storyborn", "Hero", "Princess"],
  abilities: [
    {
      id: "1be-1",
      keyword: "Bodyguard",
      text: "Bodyguard",
      type: "keyword",
    },
  ],
  i18n: kidaRoyalWarriorI18n,
};
