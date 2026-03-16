import type { CharacterCard } from "@tcg/lorcana-types";

export const peteFreebooter: CharacterCard = {
  id: "SRs",
  canonicalId: "ci_SRs",
  reprints: ["set6-122"],
  cardType: "character",
  name: "Pete",
  version: "Freebooter",
  i18n: {
    en: {
      name: "Pete",
      version: "Freebooter",
    },
    de: {
      name: "Kater Karlo",
      version: "Freibeuter",
    },
    fr: {
      name: "Pat",
      version: "Flibustier",
    },
    it: {
      name: "Gambadilegno",
      version: "Filibustiere",
    },
  },
  inkType: ["ruby"],
  set: "006",
  cardNumber: 122,
  rarity: "rare",
  cost: 3,
  strength: 5,
  willpower: 2,
  lore: 1,
  inkable: true,
  vanilla: true,
  externalIds: {
    lorcast: "crd_a545a0ceb41d4f2583bdc22226df0e31",
    tcgPlayer: 593035,
  },
  classifications: ["Dreamborn", "Villain", "Pirate"],
};
