import type { CharacterCard } from "@tcg/lorcana-types";

export const vinnieGreenPigeon: CharacterCard = {
  id: "f0C",
  canonicalId: "ci_f0C",
  reprints: ["set8-194"],
  cardType: "character",
  name: "Vinnie",
  version: "Green Pigeon",
  i18n: {
    en: {
      name: "Vinnie",
      version: "Green Pigeon",
      text: [
        {
          title: "LEARNING EXPERIENCE",
          description:
            "During an opponent's turn, whenever one of your other characters is banished, gain 1 lore.",
        },
      ],
    },
    de: {
      name: "Vinnie",
      version: "Grüne Taube",
      text: [
        {
          title: "LEHRSAME ERFAHRUNG",
          description:
            "Jedes Mal, wenn einer deiner anderen Charaktere im Zug einer gegnerischen Person verbannt wird, sammelst du 1 Legende.",
        },
      ],
    },
    fr: {
      name: "Vinnie le pigeon",
      version: "Pigeon vert",
      text: [
        {
          title: "EXPÉRIENCE ENRICHISSANTE",
          description:
            "Durant le tour de vos adversaires, chaque fois qu'un autre de vos personnages est banni, gagnez 1 éclat de Lore.",
        },
      ],
    },
    it: {
      name: "Vinnie",
      version: "Piccione Verde",
      text: [
        {
          title: "ESPERIENZA FORMATIVA",
          description:
            "Durante il turno di un avversario, ogni volta che un tuo altro personaggio viene esiliato, ottieni 1 leggenda.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Bolt",
  set: "008",
  cardNumber: 194,
  rarity: "rare",
  cost: 3,
  strength: 1,
  willpower: 4,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_81959a7827c2427d9ec829539d2a7418",
    tcgPlayer: 631479,
  },
  text: [
    {
      title: "LEARNING EXPERIENCE",
      description:
        "During an opponent's turn, whenever one of your other characters is banished, gain 1 lore.",
    },
  ],
  classifications: ["Storyborn"],
  abilities: [
    {
      effect: {
        amount: 1,
        type: "gain-lore",
      },
      id: "ogk-1",
      text: "LEARNING EXPERIENCE During an opponent's turn, whenever one of your other characters is banished, gain 1 lore.",
      type: "action",
    },
  ],
};
