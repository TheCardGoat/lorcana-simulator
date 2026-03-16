import type { LocationCard } from "@tcg/lorcana-types";

export const instituteOfTechnologyPrestigiousUniversity: LocationCard = {
  id: "cKc",
  canonicalId: "ci_cKc",
  reprints: ["set6-170"],
  cardType: "location",
  name: "Institute of Technology",
  version: "Prestigious University",
  i18n: {
    en: {
      name: "Institute of Technology",
      version: "Prestigious University",
      text: [
        {
          title: "WELCOME TO THE LAB",
          description: "Inventor characters get +1 {W} while here.",
        },
        {
          title: "PUSH THE BOUNDARIES",
          description: "At the start of your turn, if you have a character here, gain 1 lore.",
        },
      ],
    },
    de: {
      name: "Institut für Technologie",
      version: "Renommierte Universität",
      text: [
        {
          title: "WILLKOMMEN IM LABOR",
          description: "Erfinder an diesem Ort erhalten +1.",
        },
        {
          title: "WIR ÜBERWINDEN DIE GRENZEN",
          description:
            "Zu Beginn deines Zuges, wenn du mindestens einen Charakter an diesem Ort hast, sammelst du 1 Legende.",
        },
      ],
    },
    fr: {
      name: "Institut de Technologie",
      version: "Prestigieuse faculté",
      text: [
        {
          title: "BIENVENUE AU LABO DES INTELLOS",
          description: "Les personnages Inventeur sur ce lieu gagnent +1.",
        },
        {
          title: "REPOUSSONS LES LIMITES",
          description:
            "Au début de votre tour, si vous avez un personnage sur ce lieu, gagnez 1 éclat de Lore.",
        },
      ],
    },
    it: {
      name: "Istituto Tecnologico",
      version: "Università Prestigiosa",
      text: [
        {
          title: "BENVENUTO AL LABORATORIO I",
          description: "personaggi Inventore ricevono +1 mentre si trovano in questo luogo.",
        },
        {
          title: "AVANGUARDIA DELLA ROBOTICA",
          description:
            "All'inizio del tuo turno, se hai un personaggio in questo luogo, ottieni 1 leggenda.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Big Hero 6",
  set: "006",
  cardNumber: 170,
  rarity: "common",
  cost: 1,
  willpower: 5,
  moveCost: 1,
  lore: 0,
  inkable: true,
  externalIds: {
    lorcast: "crd_b499c66fd5104b3a994c3a6bd51ba692",
    tcgPlayer: 591988,
  },
  text: [
    {
      title: "WELCOME TO THE LAB",
      description: "Inventor characters get +1 {W} while here.",
    },
    {
      title: "PUSH THE BOUNDARIES",
      description: "At the start of your turn, if you have a character here, gain 1 lore.",
    },
  ],
  abilities: [
    {
      effect: {
        modifier: 1,
        stat: "willpower",
        target: {
          selector: "all",
          count: "all",
          owner: "any",
          zones: ["play"],
          cardTypes: ["character"],
          filter: [
            {
              type: "same-location-as-source",
            },
            {
              type: "has-classification",
              classification: "Inventor",
            },
          ],
        },
        type: "modify-stat",
      },
      id: "5mi-1",
      name: "WELCOME TO THE LAB",
      text: "WELCOME TO THE LAB Inventor characters get +1 {W} while here.",
      type: "static",
    },
    {
      effect: {
        condition: {
          type: "target-query",
          query: {
            selector: "all",
            owner: "you",
            zones: ["play"],
            cardType: "character",
            filters: [
              {
                type: "same-location-as-source",
              },
            ],
          },
          comparison: {
            operator: "gte",
            value: 1,
          },
        },
        then: {
          amount: 1,
          type: "gain-lore",
        },
        type: "conditional",
      },
      id: "5mi-2",
      name: "PUSH THE BOUNDARIES",
      text: "PUSH THE BOUNDARIES At the start of your turn, if you have a character here, gain 1 lore.",
      trigger: {
        event: "start-turn",
        on: "YOU",
        timing: "at",
      },
      type: "triggered",
    },
  ],
};
