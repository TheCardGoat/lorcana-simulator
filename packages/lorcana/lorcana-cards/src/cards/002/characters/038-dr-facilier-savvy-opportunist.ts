import type { CharacterCard } from "@tcg/lorcana-types";

export const drFacilierSavvyOpportunist: CharacterCard = {
  id: "25Q",
  canonicalId: "ci_25Q",
  reprints: ["set2-038"],
  cardType: "character",
  name: "Dr. Facilier",
  version: "Savvy Opportunist",
  i18n: {
    en: {
      name: "Dr. Facilier",
      version: "Savvy Opportunist",
      text: "Evasive",
    },
    de: {
      name: "Dr. Facilier",
      version: "Gerissener Opportunist",
      text: "Wendig",
    },
    fr: {
      name: "Dr. Facilier",
      version: "Opportuniste bien renseigné",
      text: "Insaisissable",
    },
    it: {
      name: "Dr. Facilier",
      version: "Savvy Opportunist",
      text: [
        {
          title: "Evasive",
          description: "(Only characters with Evasive can challenge this character.)",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Princess and the Frog",
  set: "002",
  cardNumber: 38,
  rarity: "common",
  cost: 4,
  strength: 4,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_bb645060d48e4242b0003701c6b27400",
    tcgPlayer: 527731,
  },
  text: "Evasive",
  classifications: ["Storyborn", "Villain", "Sorcerer"],
  abilities: [
    {
      id: "z5l-1",
      keyword: "Evasive",
      type: "keyword",
      text: "Evasive",
    },
  ],
};
