import type { CharacterCard } from "@tcg/lorcana-types";

export const flynnRiderFrenemy: CharacterCard = {
  id: "CR0",
  canonicalId: "ci_CR0",
  reprints: ["set4-106"],
  cardType: "character",
  name: "Flynn Rider",
  version: "Frenemy",
  i18n: {
    en: {
      name: "Flynn Rider",
      version: "Frenemy",
      text: [
        {
          title: "NARROW ADVANTAGE",
          description:
            "At the start of your turn, if you have a character in play with more {S} than each opposing character, gain 3 lore.",
        },
      ],
    },
    de: {
      name: "Flynn Rider",
      version: "Freind",
      text: [
        {
          title: "KNAPPER VORSPRUNG",
          description:
            "Zu Beginn deines Zuges, wenn du einen Charakter mit einer höheren als die aller gegnerischen Charaktere im Spiel hast, sammelst du 3 Legenden.",
        },
      ],
    },
    fr: {
      name: "Flynn Rider",
      version: "Faux ami",
      text: [
        {
          title: "MINCE AVANTAGE",
          description:
            "Au début de votre tour, si vous avez un personnage en jeu avec une supérieure à celle de chaque personnage adverse en jeu, gagnez 3 éclats de Lore.",
        },
      ],
    },
    it: {
      name: "Flynn Rider",
      version: "Amico-Nemico",
      text: [
        {
          title: "VANTAGGIO LIMITATO",
          description:
            "All'inizio del tuo turno, se hai in gioco un personaggio con superiore a quella di ogni personaggio avversario, ottieni 3 leggenda.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Tangled",
  set: "004",
  cardNumber: 106,
  rarity: "common",
  cost: 2,
  strength: 2,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_7cdbe543d7e447a6a84144d85870b3b9",
    tcgPlayer: 550591,
  },
  text: [
    {
      title: "NARROW ADVANTAGE",
      description:
        "At the start of your turn, if you have a character in play with more {S} than each opposing character, gain 3 lore.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Prince"],
  abilities: [
    {
      effect: {
        condition: {
          type: "target-aggregate-comparison",
          left: {
            query: {
              selector: "all",
              owner: "you",
              zones: ["play"],
              cardType: "character",
              filters: [],
            },
            attribute: "strength",
            aggregate: "max",
          },
          right: {
            query: {
              selector: "all",
              owner: "opponent",
              zones: ["play"],
              cardType: "character",
              filters: [],
            },
            attribute: "strength",
            aggregate: "max",
          },
          comparison: "gt",
          requireLeftNonEmpty: true,
          ifRightEmpty: "pass",
        },
        then: {
          amount: 3,
          type: "gain-lore",
        },
        type: "conditional",
      },
      id: "2t5-1",
      text: "NARROW ADVANTAGE At the start of your turn, if you have a character in play with more {S} than each opposing character, gain 3 lore.",
      type: "action",
    },
  ],
};
