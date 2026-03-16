import type { CharacterCard } from "@tcg/lorcana-types";

export const mauiHeroToAll: CharacterCard = {
  id: "bes",
  canonicalId: "ci_g8i",
  reprints: ["set1-114"],
  cardType: "character",
  name: "Maui",
  version: "Hero to All",
  i18n: {
    en: {
      name: "Maui",
      version: "Hero to All",
      text: [
        {
          title: "Rush",
        },
        {
          title: "Reckless",
        },
      ],
    },
    de: {
      name: "Maui",
      version: "Held von Allen",
      text: "Rasant Impulsiv",
    },
    fr: {
      name: "MAUI",
      version: "Idole des Hommes",
      text: "Charge Combattant",
    },
    it: {
      name: "Maui",
      version: "Hero to All",
      text: [
        {
          title: "Rush",
          description:
            "(This character can challenge the turn they're played.) Reckless (This character can't quest and must challenge each turn if able.)",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Moana",
  set: "001",
  cardNumber: 114,
  rarity: "rare",
  cost: 5,
  strength: 6,
  willpower: 5,
  lore: 0,
  inkable: true,
  missingTests: true,
  externalIds: {
    lorcast: "crd_f839f8a7cb9a47ae962503f3ea69bec5",
    tcgPlayer: 510158,
  },
  text: [
    {
      title: "Rush",
    },
    {
      title: "Reckless",
    },
  ],
  classifications: ["Storyborn", "Hero", "Deity"],
  abilities: [
    {
      id: "1s6-1",
      keyword: "Rush",
      type: "keyword",
      text: "Rush",
    },
    {
      id: "1s6-2",
      keyword: "Reckless",
      type: "keyword",
      text: "Reckless",
    },
  ],
};
