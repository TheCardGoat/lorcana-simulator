import type { CharacterCard } from "@tcg/lorcana-types";
import { mickeyMouseMusketeerCaptainI18n } from "./016-mickey-mouse-musketeer-captain.i18n";

export const mickeyMouseMusketeerCaptain: CharacterCard = {
  id: "OVa",
  canonicalId: "ci_OVa",
  reprints: ["set4-016"],
  cardType: "character",
  name: "Mickey Mouse",
  version: "Musketeer Captain",
  inkType: ["amber"],
  set: "004",
  cardNumber: 16,
  rarity: "legendary",
  cost: 7,
  strength: 3,
  willpower: 6,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_a8b84c38955448fc8e9851870f2829de",
    tcgPlayer: 549534,
  },
  text: [
    {
      title: "Shift 5",
    },
    {
      title: "Bodyguard, Support",
    },
    {
      title: "MUSKETEERS UNITED",
      description:
        "When you play this character, if you used Shift to play him, you may draw a card for each character with Bodyguard you have in play.",
    },
  ],
  classifications: ["Floodborn", "Hero", "Musketeer", "Captain"],
  abilities: [],
  i18n: mickeyMouseMusketeerCaptainI18n,
};
