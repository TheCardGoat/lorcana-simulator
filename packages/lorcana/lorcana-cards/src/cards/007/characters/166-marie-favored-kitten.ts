import type { CharacterCard } from "@tcg/lorcana-types";
import { marieFavoredKittenI18n } from "./166-marie-favored-kitten.i18n";

export const marieFavoredKitten: CharacterCard = {
  id: "44g",
  canonicalId: "ci_44g",
  reprints: ["set7-166"],
  cardType: "character",
  name: "Marie",
  version: "Favored Kitten",
  inkType: ["sapphire"],
  franchise: "Aristocats",
  set: "007",
  cardNumber: 166,
  rarity: "uncommon",
  cost: 2,
  strength: 1,
  willpower: 2,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_4022fcc6593a41dfb1f50cc003acd15c",
    tcgPlayer: 618156,
  },
  text: [
    {
      title: "I'LL SHOW YOU",
      description:
        "Whenever this character quests, you may give chosen character -2 {S} this turn.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [],
  i18n: marieFavoredKittenI18n,
};
