import type { LocationCard } from "@tcg/lorcana-types";

export const mauisPlaceOfExileHiddenIsland: LocationCard = {
  id: "3Ro",
  canonicalId: "ci_jZZ",
  reprints: ["set3-202", "set9-204"],
  cardType: "location",
  name: "Maui's Place of Exile",
  version: "Hidden Island",
  i18n: {
    en: {
      name: "Maui's Place of Exile",
      version: "Hidden Island",
      text: [
        {
          title: "ISOLATED",
          description: "Characters gain Resist +1 while here.",
        },
      ],
    },
    de: {
      name: "Mauis Insel im Exil",
      version: "Verborgene Insel",
      text: [
        {
          title: "ISOLIERT",
          description:
            "Charaktere an diesem Ort erhalten Robust +1. (Reduziere jeglichen Schaden, der den Charakteren zugefügt wird, um 1.)",
        },
      ],
    },
    fr: {
      name: "Île d'exil de Maui",
      version: "Rocher caché",
      text: [
        {
          title: "ISOLÉ",
          description: "Les personnages sur ce lieu gagnent Résistance +1.",
        },
      ],
    },
    it: {
      name: "Luogo dell'Esilio di Maui",
      version: "Isola Nascosta",
      text: [
        {
          title: "ISOLATA I",
          description: "personaggi ottengono Resistere +1 mentre si trovano in questo luogo.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Moana",
  set: "009",
  cardNumber: 204,
  rarity: "uncommon",
  cost: 2,
  willpower: 5,
  moveCost: 1,
  lore: 0,
  inkable: true,
  externalIds: {
    lorcast: "crd_f2169b618849493a969102f760825622",
    tcgPlayer: 650136,
  },
  text: [
    {
      title: "ISOLATED",
      description: "Characters gain Resist +1 while here.",
    },
  ],
  abilities: [
    {
      effect: {
        keyword: "Resist",
        target: "CHARACTERS_HERE",
        type: "gain-keyword",
        value: 1,
      },
      id: "s6w-1",
      name: "ISOLATED",
      text: "ISOLATED Characters gain Resist +1 while here.",
      type: "static",
    },
  ],
};
