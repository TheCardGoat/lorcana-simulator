import type { CharacterCard } from "@tcg/lorcana-types";

export const ticktockEverpresentPursuer: CharacterCard = {
  id: "OT7",
  canonicalId: "ci_UpL",
  reprints: ["set4-056", "set9-050"],
  cardType: "character",
  name: "Tick-Tock",
  version: "Ever-Present Pursuer",
  i18n: {
    en: {
      name: "Tick-Tock",
      version: "Ever-Present Pursuer",
      text: "Evasive",
    },
    de: {
      name: "Ticktack",
      version: "Ständiger Verfolger",
      text: "Wendig",
    },
    fr: {
      name: "Tic-Tac",
      version: "Implacable poursuivant",
      text: "Insaisissable",
    },
    it: {
      name: "Cocò",
      version: "Inseguitore Onnipresente",
      text: "Sfuggente",
    },
  },
  inkType: ["amethyst"],
  franchise: "Peter Pan",
  set: "009",
  cardNumber: 50,
  rarity: "common",
  cost: 6,
  strength: 4,
  willpower: 7,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_cefa62e7a0f246dd81c4c7628c3c054c",
    tcgPlayer: 649994,
  },
  text: "Evasive",
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      id: "16h-1",
      keyword: "Evasive",
      type: "keyword",
      text: "Evasive",
    },
  ],
};
