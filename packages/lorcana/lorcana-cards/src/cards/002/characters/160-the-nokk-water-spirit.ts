import type { CharacterCard } from "@tcg/lorcana-types";

export const theNokkWaterSpirit: CharacterCard = {
  id: "2Pk",
  canonicalId: "ci_2Pk",
  reprints: ["set2-160"],
  cardType: "character",
  name: "The Nokk",
  version: "Water Spirit",
  i18n: {
    en: {
      name: "The Nokk",
      version: "Water Spirit",
      text: "Ward",
    },
    de: {
      name: "Der Nokk",
      version: "Geist des Wassers",
      text: "Behütet",
    },
    fr: {
      name: "Nokk",
      version: "Esprit de l'Eau",
      text: "Hors d'atteinte",
    },
    it: {
      name: "The Nokk",
      version: "Water Spirit",
      text: [
        {
          title: "Ward",
          description: "(Opponents can't choose this character except to challenge.)",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Frozen",
  set: "002",
  cardNumber: 160,
  rarity: "common",
  cost: 4,
  strength: 4,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_780972e5c4f84315bcd27496ef5184a3",
    tcgPlayer: 527768,
  },
  text: "Ward",
  classifications: ["Storyborn"],
  abilities: [
    {
      id: "q84-1",
      keyword: "Ward",
      type: "keyword",
      text: "Ward",
    },
  ],
};
