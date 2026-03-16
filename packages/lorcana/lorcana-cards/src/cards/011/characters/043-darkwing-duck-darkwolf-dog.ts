import type { CharacterCard } from "@tcg/lorcana-types";

export const darkwingDuckDarkwolfDog: CharacterCard = {
  id: "l2V",
  canonicalId: "ci_l2V",
  reprints: ["set11-043"],
  cardType: "character",
  name: "Darkwing Duck",
  version: "Darkwolf Dog",
  i18n: {
    en: {
      name: "Darkwing Duck",
      version: "Darkwolf Dog",
      text: "Rush",
    },
    de: {
      name: "Darkwing Duck",
      version: "Darkwolf Schnapp",
      text: "Rasant",
    },
    fr: {
      name: "Myster Mask",
      version: "Clébard Mask",
      text: "Charge",
    },
    it: {
      name: "Darkwing Duck",
      version: "Darkwolf Can",
      text: [
        {
          title: "Lesto",
          description: "(Questo personaggio può sfidare nel turno in cui è stato giocato.)",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Darkwing Duck",
  set: "011",
  cardNumber: 43,
  rarity: "common",
  cost: 3,
  strength: 2,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_72e6b0eee1f1425ea52d9be4a2984843",
    tcgPlayer: 674851,
  },
  text: "Rush",
  classifications: ["Storyborn", "Super", "Hero", "Detective"],
  abilities: [
    {
      id: "1en-1",
      keyword: "Rush",
      type: "keyword",
      text: "Rush",
    },
  ],
};
