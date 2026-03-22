import type { CharacterCard } from "@tcg/lorcana-types";
import { mickeyMousePlayfulSorcererEpicI18n } from "./225-mickey-mouse-playful-sorcerer-epic.i18n";

export const mickeyMousePlayfulSorcererEpic: CharacterCard = {
  id: "oqp",
  canonicalId: "ci_mJq",
  reprints: ["set4-187"],
  cardType: "character",
  name: "Mickey Mouse",
  version: "Playful Sorcerer",
  inkType: ["steel"],
  set: "004",
  cardNumber: 225,
  rarity: "rare",
  specialRarity: "epic",
  cost: 5,
  strength: 3,
  willpower: 4,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_bd9957831e61475fa527ff77c2976f40",
    tcgPlayer: 544485,
  },
  text: [
    {
      title: "Shift 3",
    },
    {
      title: "Resist +1",
    },
    {
      title: "SWEEP AWAY",
      description:
        "When you play this character, deal damage to chosen character equal to the number of Broom characters you have in play.",
    },
  ],
  classifications: ["Floodborn", "Hero", "Sorcerer"],
  abilities: [],
  i18n: mickeyMousePlayfulSorcererEpicI18n,
};
