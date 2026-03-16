import type { CharacterCard } from "@tcg/lorcana-types";

export const pepaMadrigalSensitiveSister: CharacterCard = {
  id: "gZm",
  canonicalId: "ci_gZm",
  reprints: ["set7-037"],
  cardType: "character",
  name: "Pepa Madrigal",
  version: "Sensitive Sister",
  i18n: {
    en: {
      name: "Pepa Madrigal",
      version: "Sensitive Sister",
      text: [
        {
          title: "CLEAR SKIES, CLEAR SKIES",
          description: "Whenever one or more of your characters sings a song, gain 1 lore.",
        },
      ],
    },
    de: {
      name: "Pepa Madrigal",
      version: "Sensible Schwester",
      text: [
        {
          title: "SONNENSCHEIN, SONNENSCHEIN",
          description:
            "Jedes Mal, wenn einer oder mehrere deiner Charaktere ein Lied singen, sammelst du 1 Legende.",
        },
      ],
    },
    fr: {
      name: "Pepa Madrigal",
      version: "Sœur sensible",
      text: [
        {
          title: "ÉCLAIRCIE, ÉCLAIRCIE",
          description:
            "Chaque fois qu'un ou plusieurs de vos personnages chantent une chanson, gagnez 1 éclat de Lore.",
        },
      ],
    },
    it: {
      name: "Pepa Madrigal",
      version: "Sorella Sensibile",
      text: [
        {
          title: "CIELI TERSI, CIELI TERSI",
          description:
            "Ogni volta che uno o più dei tuoi personaggi canta una canzone, ottieni 1 leggenda.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Encanto",
  set: "007",
  cardNumber: 37,
  rarity: "common",
  cost: 3,
  strength: 2,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_dc149fc0470a4fc2a5cde6ba7dffbdd7",
    tcgPlayer: 619428,
  },
  text: [
    {
      title: "CLEAR SKIES, CLEAR SKIES",
      description: "Whenever one or more of your characters sings a song, gain 1 lore.",
    },
  ],
  classifications: ["Storyborn", "Ally", "Madrigal"],
  abilities: [
    {
      effect: {
        amount: 1,
        type: "gain-lore",
      },
      id: "1km-1",
      text: "CLEAR SKIES, CLEAR SKIES Whenever one or more of your characters sings a song, gain 1 lore.",
      type: "action",
    },
  ],
};
