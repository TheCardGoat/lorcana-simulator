import type { CharacterCard } from "@tcg/lorcana-types";
import { herculesDivineHeroEnchantedI18n } from "./215-hercules-divine-hero-enchanted.i18n";

export const herculesDivineHeroEnchanted: CharacterCard = {
  id: "VdL",
  canonicalId: "ci_1UQ",
  reprints: ["set2-181"],
  cardType: "character",
  name: "Hercules",
  version: "Divine Hero",
  inkType: ["steel"],
  franchise: "Hercules",
  set: "002",
  cardNumber: 215,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 6,
  strength: 6,
  willpower: 3,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_42ef053d7aab445fa7b0a2bf2e028864",
    tcgPlayer: 528113,
  },
  text: [
    {
      title: "Shift 4",
    },
    {
      title: "Resist +2",
    },
  ],
  classifications: ["Floodborn", "Hero", "Prince", "Deity"],
  abilities: [
    {
      id: "5e9-1",
      cost: {
        ink: 4,
      },
      keyword: "Shift",
      type: "keyword",
      text: "Shift 4",
    },
    {
      id: "5e9-2",
      keyword: "Resist",
      type: "keyword",
      value: 2,
      text: "Resist +2",
    },
  ],
  i18n: herculesDivineHeroEnchantedI18n,
};
