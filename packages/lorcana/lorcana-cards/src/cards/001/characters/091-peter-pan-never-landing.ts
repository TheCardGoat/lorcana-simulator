import type { CharacterCard } from "@tcg/lorcana-types";

export const peterPanNeverLanding: CharacterCard = {
  id: "k9e",
  canonicalId: "ci_k9e",
  reprints: ["set1-091"],
  cardType: "character",
  name: "Peter Pan",
  version: "Never Landing",
  i18n: {
    en: {
      name: "Peter Pan",
      version: "Never Landing",
      text: "Evasive",
    },
    de: {
      name: "Peter Pan",
      version: "Landet nimmer",
      text: "Wendig",
    },
    fr: {
      name: "PETER PAN",
      version: "Toujours dans les airs",
      text: "Insaisissable",
    },
    it: {
      name: "Peter Pan",
      version: "Never Landing",
      text: [
        {
          title: "Evasive",
          description: "(Only characters with Evasive can challenge this character.)",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Peter Pan",
  set: "001",
  cardNumber: 91,
  rarity: "common",
  cost: 3,
  strength: 3,
  willpower: 2,
  lore: 1,
  inkable: true,
  missingTests: true,
  externalIds: {
    lorcast: "crd_91d042c887b54b7098c9044a36816008",
    tcgPlayer: 502535,
  },
  text: "Evasive",
  classifications: ["Dreamborn", "Hero"],
  abilities: [
    {
      id: "1g6-1",
      keyword: "Evasive",
      type: "keyword",
      text: "Evasive",
    },
  ],
};
