import type { CharacterCard } from "@tcg/lorcana-types";

export const zeusGodOfLightning: CharacterCard = {
  id: "oPz",
  canonicalId: "ci_oPz",
  reprints: ["set1-061"],
  cardType: "character",
  name: "Zeus",
  version: "God of Lightning",
  i18n: {
    en: {
      name: "Zeus",
      version: "God of Lightning",
      text: [
        {
          title: "Rush",
        },
        {
          title: "Challenger +4",
        },
      ],
    },
    de: {
      name: "Zeus",
      version: "Gott der Blitze",
      text: "Rasant Herausfordern +4",
    },
    fr: {
      name: "ZEUS",
      version: "Dieu de la Foudre",
      text: "Charge Offensif +4",
    },
    it: {
      name: "Zeus",
      version: "God of Lightning",
      text: [
        {
          title: "Rush",
          description:
            "(This character can challenge the turn they're played.) Challenger +4 (While challenging, this character gets +4.)",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Hercules",
  set: "001",
  cardNumber: 61,
  rarity: "rare",
  cost: 4,
  strength: 0,
  willpower: 4,
  lore: 2,
  inkable: false,
  missingTests: true,
  externalIds: {
    lorcast: "crd_48d5eae218d14c72a3b0485e369b2d06",
    tcgPlayer: 502540,
  },
  text: [
    {
      title: "Rush",
    },
    {
      title: "Challenger +4",
    },
  ],
  classifications: ["Storyborn", "Deity"],
  abilities: [
    {
      id: "1o1-1",
      keyword: "Rush",
      type: "keyword",
      text: "Rush",
    },
    {
      id: "1o1-2",
      keyword: "Challenger",
      type: "keyword",
      value: 4,
      text: "Challenger +4",
    },
  ],
};
