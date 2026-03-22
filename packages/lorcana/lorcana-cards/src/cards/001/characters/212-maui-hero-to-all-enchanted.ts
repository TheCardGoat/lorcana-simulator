import type { CharacterCard } from "@tcg/lorcana-types";
import { mauiHeroToAllEnchantedI18n } from "./212-maui-hero-to-all-enchanted.i18n";

export const mauiHeroToAllEnchanted: CharacterCard = {
  id: "9q7",
  canonicalId: "ci_g8i",
  reprints: ["set1-114"],
  cardType: "character",
  name: "Maui",
  version: "Hero to All",
  inkType: ["ruby"],
  franchise: "Moana",
  set: "001",
  cardNumber: 212,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 5,
  strength: 6,
  willpower: 5,
  lore: 0,
  inkable: true,
  externalIds: {
    lorcast: "crd_f839f8a7cb9a47ae962503f3ea69bec5",
    tcgPlayer: 510158,
  },
  text: [
    {
      title: "Rush",
    },
    {
      title: "Reckless",
    },
  ],
  classifications: ["Storyborn", "Hero", "Deity"],
  abilities: [
    {
      id: "1s6-1",
      keyword: "Rush",
      type: "keyword",
      text: "Rush",
    },
    {
      id: "1s6-2",
      keyword: "Reckless",
      type: "keyword",
      text: "Reckless",
    },
  ],
  i18n: mauiHeroToAllEnchantedI18n,
};
