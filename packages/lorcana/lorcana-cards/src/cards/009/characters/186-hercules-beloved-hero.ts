import type { CharacterCard } from "@tcg/lorcana-types";
import { herculesBelovedHeroI18n } from "./186-hercules-beloved-hero.i18n";
import { bodyguard } from "../../../helpers/abilities/bodyguard";
import { resist } from "../../../helpers/abilities/resist";

export const herculesBelovedHero: CharacterCard = {
  id: "sss",
  canonicalId: "ci_ZfB",
  reprints: ["set4-180", "set9-186"],
  cardType: "character",
  name: "Hercules",
  version: "Beloved Hero",
  inkType: ["steel"],
  franchise: "Hercules",
  set: "009",
  cardNumber: 186,
  rarity: "uncommon",
  cost: 6,
  strength: 6,
  willpower: 5,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_37be647e4dfe481996bdf2bad1909176",
    tcgPlayer: 650119,
  },
  text: [
    {
      title: "Bodyguard",
    },
    {
      title: "Resist +1",
    },
  ],
  classifications: ["Storyborn", "Hero", "Prince"],
  abilities: [bodyguard, resist(1)],
  i18n: herculesBelovedHeroI18n,
};
