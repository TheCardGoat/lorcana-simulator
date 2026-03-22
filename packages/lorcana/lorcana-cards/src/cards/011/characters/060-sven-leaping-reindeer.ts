import type { CharacterCard } from "@tcg/lorcana-types";
import { svenLeapingReindeerI18n } from "./060-sven-leaping-reindeer.i18n";

export const svenLeapingReindeer: CharacterCard = {
  id: "JOj",
  canonicalId: "ci_JOj",
  reprints: ["set11-060"],
  cardType: "character",
  name: "Sven",
  version: "Leaping Reindeer",
  inkType: ["amethyst"],
  franchise: "Frozen",
  set: "011",
  cardNumber: 60,
  rarity: "common",
  cost: 4,
  strength: 2,
  willpower: 3,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_ad33da4d6a2e44569e0bb8f16810ba1a",
    tcgPlayer: 676195,
  },
  text: [
    {
      title: "Rush",
    },
    {
      title: "Challenger +3",
    },
    {
      title: "Evasive",
    },
  ],
  classifications: ["Dreamborn", "Ally"],
  abilities: [
    {
      id: "1kr-1",
      keyword: "Rush",
      type: "keyword",
      text: "Rush",
    },
    {
      id: "1kr-2",
      keyword: "Challenger",
      type: "keyword",
      value: 3,
      text: "Challenger +3",
    },
    {
      id: "1kr-3",
      keyword: "Evasive",
      type: "keyword",
      text: "Evasive",
    },
  ],
  i18n: svenLeapingReindeerI18n,
};
