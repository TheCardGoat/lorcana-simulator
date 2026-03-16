import type { CharacterCard } from "@tcg/lorcana-types";

export const mauiSnowSlider: CharacterCard = {
  id: "1ji",
  canonicalId: "ci_1ji",
  reprints: ["set11-109"],
  cardType: "character",
  name: "Maui",
  version: "Snow Slider",
  i18n: {
    en: {
      name: "Maui",
      version: "Snow Slider",
      text: "Rush",
    },
    de: {
      name: "Maui",
      version: "Schneerutscher",
      text: "Rasant",
    },
    fr: {
      name: "Maui",
      version: "Glisseur des neiges",
      text: "Charge",
    },
    it: {
      name: "Maui",
      version: "Scivolatore su Neve",
      text: [
        {
          title: "Lesto",
          description: "(Questo personaggio può sfidare nel turno in cui è stato giocato.)",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Moana",
  set: "011",
  cardNumber: 109,
  rarity: "common",
  cost: 4,
  strength: 4,
  willpower: 3,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_d6b606b2691f493bb74f2faf13339c28",
    tcgPlayer: 675498,
  },
  text: "Rush",
  classifications: ["Storyborn", "Hero", "Deity"],
  abilities: [
    {
      id: "7r1-1",
      keyword: "Rush",
      type: "keyword",
      text: "Rush",
    },
  ],
};
