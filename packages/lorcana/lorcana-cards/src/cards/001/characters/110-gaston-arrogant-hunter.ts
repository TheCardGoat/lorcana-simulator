import type { CharacterCard } from "@tcg/lorcana-types";

export const gastonArrogantHunter: CharacterCard = {
  id: "sHc",
  canonicalId: "ci_pKT",
  reprints: ["set1-110", "set9-115"],
  cardType: "character",
  name: "Gaston",
  version: "Arrogant Hunter",
  i18n: {
    en: {
      name: "Gaston",
      version: "Arrogant Hunter",
      text: "Reckless",
    },
    de: {
      name: "Gaston",
      version: "Arrogant Hunter",
      text: [
        {
          title: "Reckless",
          description: "(This character can't quest and must challenge each turn if able.)",
        },
      ],
    },
    fr: {
      name: "Gaston",
      version: "Arrogant Hunter",
      text: [
        {
          title: "Reckless",
          description: "(This character can't quest and must challenge each turn if able.)",
        },
      ],
    },
    it: {
      name: "Gaston",
      version: "Arrogant Hunter",
      text: [
        {
          title: "Reckless",
          description: "(This character can't quest and must challenge each turn if able.)",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Beauty and the Beast",
  set: "001",
  cardNumber: 110,
  rarity: "common",
  cost: 2,
  strength: 4,
  willpower: 2,
  lore: 0,
  inkable: true,
  externalIds: {
    lorcast: "crd_6f87816bd3e042a4852e68f2d23a5807",
    tcgPlayer: 650051,
  },
  text: "Reckless",
  classifications: ["Storyborn", "Villain"],
  abilities: [
    {
      id: "enf-1",
      keyword: "Reckless",
      type: "keyword",
      text: "Reckless",
    },
  ],
};
