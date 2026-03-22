import type { CharacterCard } from "@tcg/lorcana-types";
import { zeusGodOfLightningI18n } from "./061-zeus-god-of-lightning.i18n";

export const zeusGodOfLightning: CharacterCard = {
  id: "oPz",
  canonicalId: "ci_oPz",
  reprints: ["set1-061"],
  cardType: "character",
  name: "Zeus",
  version: "God of Lightning",
  inkType: ["amethyst"],
  franchise: "Hercules",
  set: "001",
  cardNumber: 61,
  rarity: "rare",
  cost: 4,
  strength: 0,
  willpower: 4,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_48d5eae218d14c72a3b0485e369b2d06",
    tcgPlayer: 502540,
  },
  text: [
    {
      title: "Rush",
    },
    {
      title: "Challenger +4",
    },
  ],
  classifications: ["Storyborn", "Deity"],
  abilities: [
    {
      id: "1o1-1",
      keyword: "Rush",
      type: "keyword",
      text: "Rush",
    },
    {
      id: "1o1-2",
      keyword: "Challenger",
      type: "keyword",
      value: 4,
      text: "Challenger +4",
    },
  ],
  i18n: zeusGodOfLightningI18n,
};
