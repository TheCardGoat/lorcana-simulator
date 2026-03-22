import type { CharacterCard } from "@tcg/lorcana-types";
import { brooklynSecondInCommandI18n } from "./120-brooklyn-second-in-command.i18n";

export const brooklynSecondInCommand: CharacterCard = {
  id: "jg3",
  canonicalId: "ci_jg3",
  reprints: ["set10-120"],
  cardType: "character",
  name: "Brooklyn",
  version: "Second in Command",
  inkType: ["ruby"],
  franchise: "Gargoyles",
  set: "010",
  cardNumber: 120,
  rarity: "common",
  cost: 2,
  strength: 3,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_07d54e366c0548e6890cee09e3eaa032",
    tcgPlayer: 659241,
  },
  text: [
    {
      title: "Evasive",
    },
    {
      title: "STONE BY DAY",
      description: "If you have 3 or more cards in your hand, this character can't ready.",
    },
  ],
  classifications: ["Storyborn", "Ally", "Gargoyle"],
  abilities: [
    {
      id: "nda-1",
      keyword: "Evasive",
      text: "Evasive",
      type: "keyword",
    },
    {
      id: "nda-2",
      name: "STONE BY DAY",
      text: "STONE BY DAY If you have 3 or more cards in your hand, this character can't ready.",
      type: "static",
      condition: {
        type: "resource-count",
        what: "cards-in-hand",
        controller: "you",
        comparison: "greater-or-equal",
        value: 3,
      },
      effect: {
        type: "restriction",
        restriction: "cant-ready",
        target: "SELF",
      },
    },
  ],
  i18n: brooklynSecondInCommandI18n,
};
