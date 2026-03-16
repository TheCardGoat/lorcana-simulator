import type { CharacterCard } from "@tcg/lorcana-types";

export const chiefSeasonedTracker: CharacterCard = {
  id: "pkL",
  canonicalId: "ci_pkL",
  reprints: ["set11-179"],
  cardType: "character",
  name: "Chief",
  version: "Seasoned Tracker",
  i18n: {
    en: {
      name: "Chief",
      version: "Seasoned Tracker",
      text: [
        {
          title: "GOOD RIDDANCE",
          description:
            "{E} — If an opposing character was banished in a challenge this turn, draw a card.",
        },
      ],
    },
    de: {
      name: "Chef, der Jagdhund",
      version: "Altgedienter Spurensucher",
      text: [
        {
          title: "AUF WIEDERSEHEN",
          description:
            "— Falls in diesem Zug ein gegnerischer Charakter durch eine Herausforderung verbannt wurde, ziehe 1 Karte.",
        },
      ],
    },
    fr: {
      name: "Chef",
      version: "Pisteur chevronné",
      text: [
        {
          title: "BON",
          description:
            "DÉBARRAS — Si un personnage adverse a été banni via un défi ce tour-ci, piochez une carte.",
        },
      ],
    },
    it: {
      name: "Fiuto",
      version: "Segugio Esperto",
      text: [
        {
          title: "UNA BELLA LIBERAZIONE",
          description:
            "— Se un personaggio avversario è stato esiliato in una sfida in questo turno, pesca una carta.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Fox and the Hound",
  set: "011",
  cardNumber: 179,
  rarity: "uncommon",
  cost: 3,
  strength: 2,
  willpower: 5,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_a26bf7d81173483589a2df5446ab1ec0",
    tcgPlayer: 673740,
  },
  text: [
    {
      title: "GOOD RIDDANCE",
      description:
        "{E} — If an opposing character was banished in a challenge this turn, draw a card.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      id: "1cy-1",
      cost: {
        exert: true,
      },
      effect: {
        condition: {
          expression: "an opposing character was banished in a challenge this turn",
          type: "if",
        },
        then: {
          amount: 1,
          target: "CONTROLLER",
          type: "draw",
        },
        type: "conditional",
      },
      type: "activated",
      text: "GOOD RIDDANCE {E} — If an opposing character was banished in a challenge this turn, draw a card.",
    },
  ],
};
