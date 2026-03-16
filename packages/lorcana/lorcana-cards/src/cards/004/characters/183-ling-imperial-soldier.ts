import type { CharacterCard } from "@tcg/lorcana-types";

export const lingImperialSoldier: CharacterCard = {
  id: "HyV",
  canonicalId: "ci_HyV",
  reprints: ["set4-183"],
  cardType: "character",
  name: "Ling",
  version: "Imperial Soldier",
  i18n: {
    en: {
      name: "Ling",
      version: "Imperial Soldier",
      text: [
        {
          title: "FULL OF SPIRIT",
          description: "Your Hero characters get +1 {S}.",
        },
      ],
    },
    de: {
      name: "Ling",
      version: "Soldat des Kaisers",
      text: [
        {
          title: "VOLLER TATENDRANG",
          description: "Deine anderen Heldinnen und Helden erhalten +1.",
        },
      ],
    },
    fr: {
      name: "Ling",
      version: "Soldat Impérial",
      text: [
        {
          title: "PLEIN DE COURAGE",
          description: "Vos personnages Héros gagnent +1.",
        },
      ],
    },
    it: {
      name: "Ling",
      version: "Soldato Imperiale",
      text: [
        {
          title: "PIENO DI SPIRITO I",
          description: "tuoi personaggi Eroe ricevono +1.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Mulan",
  set: "004",
  cardNumber: 183,
  rarity: "uncommon",
  cost: 3,
  strength: 3,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_b99de29dfb744a0184319f957208d126",
    tcgPlayer: 548195,
  },
  text: [
    {
      title: "FULL OF SPIRIT",
      description: "Your Hero characters get +1 {S}.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      effect: {
        modifier: 1,
        stat: "strength",
        target: "YOUR_CHARACTERS",
        type: "modify-stat",
      },
      id: "joz-1",
      name: "FULL OF SPIRIT Your Hero",
      text: "FULL OF SPIRIT Your Hero characters get +1 {S}.",
      type: "static",
    },
  ],
};
