import type { CharacterCard } from "@tcg/lorcana-types";
import { mirabelMadrigalProphecyFinderI18n } from "./019-mirabel-madrigal-prophecy-finder.i18n";

export const mirabelMadrigalProphecyFinder: CharacterCard = {
  id: "tXZ",
  canonicalId: "ci_tXZ",
  reprints: ["set4-019"],
  cardType: "character",
  name: "Mirabel Madrigal",
  version: "Prophecy Finder",
  inkType: ["amber"],
  franchise: "Encanto",
  set: "004",
  cardNumber: 19,
  rarity: "common",
  cost: 2,
  strength: 2,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_42b2c061d90345869820c14b4bad81ee",
    tcgPlayer: 549248,
  },
  text: "Support",
  classifications: ["Storyborn", "Hero", "Madrigal"],
  abilities: [
    {
      id: "1lv-1",
      keyword: "Support",
      type: "keyword",
      text: "Support",
    },
  ],
  i18n: mirabelMadrigalProphecyFinderI18n,
};
