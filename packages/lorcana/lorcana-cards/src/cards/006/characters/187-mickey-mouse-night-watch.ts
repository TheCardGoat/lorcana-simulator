import type { CharacterCard } from "@tcg/lorcana-types";

export const mickeyMouseNightWatch: CharacterCard = {
  id: "3YP",
  canonicalId: "ci_3YP",
  reprints: ["set6-187"],
  cardType: "character",
  name: "Mickey Mouse",
  version: "Night Watch",
  i18n: {
    en: {
      name: "Mickey Mouse",
      version: "Night Watch",
      text: [
        {
          title: "SUPPORT",
          description: "Your Pluto characters get Resist +1.",
        },
      ],
    },
    de: {
      name: "Micky Maus",
      version: "Nachtwächter",
      text: [
        {
          title: "UNTERSTÜTZUNG",
          description:
            "Deine Pluto-Charaktere erhalten Robust +1. (Reduziere jeglichen Schaden, der ihnen zugefügt wird, um 1.)",
        },
      ],
    },
    fr: {
      name: "Mickey Mouse",
      version: "Veilleur de nuit",
      text: [
        {
          title: "RENFORT",
          description: "Vos personnages Pluto gagnent Résistance +1.",
        },
      ],
    },
    it: {
      name: "Topolino",
      version: "Sentinella Notturna",
      text: [
        {
          title: "SCORTA I",
          description: "tuoi personaggi chiamati Pluto ottengono Resistere +1.",
        },
      ],
    },
  },
  inkType: ["steel"],
  set: "006",
  cardNumber: 187,
  rarity: "uncommon",
  cost: 3,
  strength: 2,
  willpower: 3,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_59714153da7e4a6884f25a5c5edad2c1",
    tcgPlayer: 591144,
  },
  text: [
    {
      title: "SUPPORT",
      description: "Your Pluto characters get Resist +1.",
    },
  ],
  classifications: ["Storyborn", "Hero"],
  abilities: [
    {
      effect: {
        keyword: "Resist",
        target: "YOUR_CHARACTERS",
        type: "gain-keyword",
        value: 1,
      },
      id: "byr-1",
      name: "SUPPORT Your Pluto",
      text: "SUPPORT Your Pluto characters get Resist +1.",
      type: "static",
    },
  ],
};
