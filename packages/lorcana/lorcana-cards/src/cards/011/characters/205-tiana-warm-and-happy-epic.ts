import type { CharacterCard } from "@tcg/lorcana-types";
import { tianaWarmAndHappyEpicI18n } from "./205-tiana-warm-and-happy-epic.i18n";

export const tianaWarmAndHappyEpic: CharacterCard = {
  id: "BEO",
  canonicalId: "ci_FOF",
  reprints: ["set11-005"],
  cardType: "character",
  name: "Tiana",
  version: "Warm and Happy",
  inkType: ["amber"],
  franchise: "Princess and the Frog",
  set: "011",
  cardNumber: 205,
  rarity: "common",
  specialRarity: "epic",
  cost: 4,
  strength: 3,
  willpower: 4,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_801cd6ba9a3048499af41d6186fa4100",
    tcgPlayer: 677142,
  },
  text: "Support",
  classifications: ["Dreamborn", "Hero", "Princess"],
  abilities: [
    {
      id: "1ft-1",
      keyword: "Support",
      type: "keyword",
      text: "Support",
    },
  ],
  i18n: tianaWarmAndHappyEpicI18n,
};
