import type { LocationCard } from "@tcg/lorcana-types";

export const casaMadrigalCasita: LocationCard = {
  id: "oye",
  canonicalId: "ci_Onk",
  reprints: ["set4-067", "set9-068"],
  cardType: "location",
  name: "Casa Madrigal",
  version: "Casita",
  i18n: {
    en: {
      name: "Casa Madrigal",
      version: "Casita",
      text: [
        {
          title: "OUR HOME",
          description: "At the start of your turn, if you have a character here gain 1 lore.",
        },
      ],
    },
    de: {
      name: "Casa Madrigal",
      version: "Casita",
      text: [
        {
          title: "UNSER ZUHAUSE",
          description:
            "Zu Beginn deines Zuges, wenn du mindestens einen Charakter an diesem Ort hast, sammelst du 1 Legende.",
        },
      ],
    },
    fr: {
      name: "Casa Madrigal",
      version: "Casita",
      text: [
        {
          title: "NOTRE MAISON",
          description:
            "Au début de votre tour, si vous avez un personnage sur ce lieu, gagnez 1 éclat de Lore.",
        },
      ],
    },
    it: {
      name: "Casa Madrigal",
      version: "Casita",
      text: [
        {
          title: "CASA NOSTRA",
          description:
            "All'inizio del tuo turno, se hai un personaggio in questo luogo, ottieni 1 leggenda.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Encanto",
  set: "004",
  cardNumber: 67,
  rarity: "common",
  cost: 1,
  willpower: 6,
  moveCost: 1,
  lore: 0,
  inkable: true,
  externalIds: {
    lorcast: "crd_3badd6eb64ca49b18e7ee2cefea06b46",
    tcgPlayer: 650010,
  },
  text: [
    {
      title: "OUR HOME",
      description: "At the start of your turn, if you have a character here gain 1 lore.",
    },
  ],
  abilities: [
    {
      id: "115-1",
      name: "OUR HOME",
      text: "OUR HOME At the start of your turn, if you have a character here, gain 1 lore.",
      type: "triggered",
      trigger: {
        event: "start-turn",
        on: "YOU",
        timing: "at",
      },
      effect: {
        type: "conditional",
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
      },
    },
  ],
};
