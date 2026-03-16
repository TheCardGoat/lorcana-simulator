import type { ItemCard } from "@tcg/lorcana-types";

export const retroEvolutionDevice: ItemCard = {
  id: "WNZ",
  canonicalId: "ci_WNZ",
  reprints: ["set11-100"],
  cardType: "item",
  name: "Retro Evolution Device",
  i18n: {
    en: {
      name: "Retro Evolution Device",
      text: [
        {
          title: "TURN INTO DINOSAUR",
          description:
            "{E}, 1 {I}, Banish chosen character of yours — Play a character with cost up to 2 more than the banished character for free.",
        },
      ],
    },
    de: {
      name: "Evolutions-Umkehr-Gerät",
      text: [
        {
          title: "DINOSAURIERVERWANDLUNG, 1,",
          description:
            "Wähle und verbanne einen deiner Charaktere — Spiele einen Charakter, der bis zu 2 mehr als der verbannte Charakter kostet, kostenlos aus.",
        },
      ],
    },
    fr: {
      name: "Rétro-fusil à évolution",
      text: [
        {
          title: "TRANSFORMER EN DINOSAURE, 1,",
          description:
            "Choisissez l'un de vos personnages et bannissez-le — Jouez gratuitement un personnage coûtant jusqu'à 2 de plus que le personnage banni.",
        },
      ],
    },
    it: {
      name: "Apparecchio Retroevolutore",
      text: [
        {
          title: "TRASFORMARE IN DINOSAURO, 1,",
          description:
            "esilia un tuo personaggio a tua scelta — Gioca un personaggio con costo fino a 2 in più rispetto a quello del personaggio esiliato, gratis.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Darkwing Duck",
  set: "011",
  cardNumber: 100,
  rarity: "rare",
  cost: 3,
  inkable: true,
  externalIds: {
    lorcast: "crd_a7afac820f8249d9896e3cc693fe0094",
    tcgPlayer: 675393,
  },
  text: [
    {
      title: "TURN INTO DINOSAUR",
      description:
        "{E}, 1 {I}, Banish chosen character of yours — Play a character with cost up to 2 more than the banished character for free.",
    },
  ],
  abilities: [
    {
      id: "1bs-1",
      name: "TURN INTO DINOSAUR",
      type: "activated",
      cost: {
        exert: true,
        ink: 1,
      },
      effect: {
        type: "sequence",
        steps: [
          {
            type: "banish",
            target: "CHOSEN_CHARACTER_OF_YOURS",
          },
          {
            type: "conditional",
            condition: {
              type: "if-you-do",
            },
            then: {
              type: "play-card",
              from: "hand",
              cardType: "character",
              cost: "free",
              filter: {
                maxCost: {
                  type: "chosen-card-cost",
                  offset: 2,
                },
              },
            },
          },
        ],
      },
      text: "TURN INTO DINOSAUR {E}, 1 {I}, Banish chosen character of yours — Play a character with cost up to 2 more than the banished character for free.",
    },
  ],
};
