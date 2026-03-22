import type { CharacterCard } from "@tcg/lorcana-types";
import { scroogeMcduckGhostlyEbenezerI18n } from "./104-scrooge-mcduck-ghostly-ebenezer.i18n";

export const scroogeMcduckGhostlyEbenezer: CharacterCard = {
  id: "cXq",
  canonicalId: "ci_cXq",
  reprints: ["set11-104"],
  cardType: "character",
  name: "Scrooge McDuck",
  version: "Ghostly Ebenezer",
  inkType: ["ruby"],
  franchise: "Mickey's Christmas Carol",
  set: "011",
  cardNumber: 104,
  rarity: "uncommon",
  cost: 2,
  strength: 3,
  willpower: 3,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_4209198480ed495d9d5ed7608ece035f",
    tcgPlayer: 676209,
  },
  text: [
    {
      title: "Boost 1 {I}",
    },
    {
      title: "COUNTING COINS",
      description: "This character gets +1 {S} and +1 {W} for each card under him.",
    },
  ],
  classifications: ["Dreamborn", "Villain", "Ghost"],
  abilities: [
    {
      id: "11x-1",
      keyword: "Boost",
      type: "keyword",
      value: 1,
      text: "Boost 1 {I}",
    },
    {
      id: "11x-2",
      effect: {
        modifier: 1,
        stat: "strength",
        target: "SELF",
        type: "modify-stat",
      },
      type: "static",
      text: "COUNTING COINS This character gets +1 {S} and +1 {W} for each card under him.",
    },
  ],
  i18n: scroogeMcduckGhostlyEbenezerI18n,
};
