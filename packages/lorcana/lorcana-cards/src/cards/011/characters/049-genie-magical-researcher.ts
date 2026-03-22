import type { CharacterCard } from "@tcg/lorcana-types";
import { genieMagicalResearcherI18n } from "./049-genie-magical-researcher.i18n";

export const genieMagicalResearcher: CharacterCard = {
  id: "fkH",
  canonicalId: "ci_PvV",
  reprints: ["set11-049"],
  cardType: "character",
  name: "Genie",
  version: "Magical Researcher",
  inkType: ["amethyst"],
  franchise: "Aladdin",
  set: "011",
  cardNumber: 49,
  rarity: "rare",
  cost: 3,
  strength: 3,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_13f9925099454b7a8fd6225381d11061",
    tcgPlayer: 675280,
  },
  text: "Boost 1 {I} INCREASING WISDOM This character gets +1 {L} for each card under him.",
  classifications: ["Storyborn", "Ally", "Whisper"],
  abilities: [
    {
      id: "h4v-1",
      keyword: "Boost",
      type: "keyword",
      value: 1,
      text: "Boost 1 {I}",
    },
    {
      id: "h4v-2",
      name: "INCREASING WISDOM",
      type: "static",
      effect: {
        modifier: {
          type: "cards-under-self",
        },
        stat: "lore",
        target: "SELF",
        type: "modify-stat",
      },
      text: "INCREASING WISDOM This character gets +1 {L} for each card under him.",
    },
  ],
  i18n: genieMagicalResearcherI18n,
};
