import type { CharacterCard } from "@tcg/lorcana-types";
import { peterPanShadowFinderI18n } from "./054-peter-pan-shadow-finder.i18n";

export const peterPanShadowFinder: CharacterCard = {
  id: "mNf",
  canonicalId: "ci_mNf",
  reprints: ["set4-054"],
  cardType: "character",
  name: "Peter Pan",
  version: "Shadow Finder",
  inkType: ["amethyst"],
  franchise: "Peter Pan",
  set: "004",
  cardNumber: 54,
  rarity: "common",
  cost: 3,
  strength: 2,
  willpower: 3,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_2d0021113d084cee92cd6b33f104c1b4",
    tcgPlayer: 549458,
  },
  text: [
    {
      title: "Rush",
    },
    {
      title: "Evasive",
    },
    {
      title: "FLY, OF COURSE!",
      description: "Your other characters with Evasive gain Rush.",
    },
  ],
  classifications: ["Storyborn", "Hero"],
  abilities: [
    {
      id: "g3g-1",
      keyword: "Rush",
      text: "Rush",
      type: "keyword",
    },
    {
      id: "g3g-2",
      keyword: "Evasive",
      text: "Evasive",
      type: "keyword",
    },
    {
      effect: {
        keyword: "Rush",
        target: "YOUR_CHARACTERS",
        type: "gain-keyword",
      },
      id: "g3g-3",
      text: "FLY, OF COURSE! Your other characters with Evasive gain Rush.",
      type: "action",
    },
  ],
  i18n: peterPanShadowFinderI18n,
};
