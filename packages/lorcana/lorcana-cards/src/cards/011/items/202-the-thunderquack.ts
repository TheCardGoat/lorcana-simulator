import type { ItemCard } from "@tcg/lorcana-types";

export const theThunderquack: ItemCard = {
  id: "JXM",
  canonicalId: "ci_JXM",
  reprints: ["set11-202"],
  cardType: "item",
  name: "The Thunderquack",
  i18n: {
    en: {
      name: "The Thunderquack",
      text: [
        {
          title: "VIGILANTE JUSTICE",
          description: "All opposing characters gain the Villain classification.",
        },
        {
          title: "LAY OF THE LAND",
          description: "{E} — If a character was banished in a challenge this turn, gain 1 lore.",
        },
      ],
    },
    de: {
      name: "Der Donnerquack",
      text: [
        {
          title: "SELBSTJUSTIZ",
          description:
            "Alle gegnerischen Charaktere erhalten die Klassifizierung Schurke. LAGE DES LANDES — Falls in diesem Zug ein Charakter durch eine Herausforderung verbannt wurde, sammelst du 1 Legende.",
        },
      ],
    },
    fr: {
      name: "Le Myster Quack",
      text: [
        {
          title: "LA JUSTICE DES JUSTICIERS",
          description:
            "Tous les personnages adverses gagnent la classification Méchant. RECONNAISSANCE DU TERRAIN — Si un personnage a été banni via un défi ce tour-ci, gagnez 1 éclat de Lore.",
        },
      ],
    },
    it: {
      name: "Il Thunderquack",
      text: [
        {
          title: "GIUSTIZIA DEL VIGILANTE",
          description:
            "Tutti i personaggi avversari ottengono la classificazione Cattivo. GIRO DI RICOGNIZIONE — Se un personaggio è stato esiliato in una sfida in questo turno, ottieni 1 leggenda.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Darkwing Duck",
  set: "011",
  cardNumber: 202,
  rarity: "rare",
  cost: 3,
  inkable: true,
  externalIds: {
    lorcast: "crd_997f90baa0e94ea6bf9babc7ded3bc8a",
    tcgPlayer: 676250,
  },
  text: [
    {
      title: "VIGILANTE JUSTICE",
      description: "All opposing characters gain the Villain classification.",
    },
    {
      title: "LAY OF THE LAND",
      description: "{E} — If a character was banished in a challenge this turn, gain 1 lore.",
    },
  ],
  abilities: [
    {
      id: "1ba-1",
      name: "VIGILANTE JUSTICE",
      type: "static",
      effect: {
        type: "property-modification",
        property: "classification",
        operation: "add",
        value: "Villain",
        target: {
          selector: "all",
          count: "all",
          owner: "opponent",
          zones: ["play"],
          cardTypes: ["character"],
        },
      },
      text: "VIGILANTE JUSTICE All opposing characters gain the Villain classification.",
    },
    {
      id: "1ba-2",
      name: "LAY OF THE LAND",
      type: "activated",
      cost: {
        exert: true,
      },
      effect: {
        type: "conditional",
        condition: {
          type: "banished-in-challenge-this-turn",
          owner: "any",
        },
        then: {
          type: "gain-lore",
          amount: 1,
          target: "CONTROLLER",
        },
      },
      text: "LAY OF THE LAND {E} — If a character was banished in a challenge this turn, gain 1 lore.",
    },
  ],
};
