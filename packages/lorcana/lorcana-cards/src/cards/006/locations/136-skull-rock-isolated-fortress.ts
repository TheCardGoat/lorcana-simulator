import type { LocationCard } from "@tcg/lorcana-types";

export const skullRockIsolatedFortress: LocationCard = {
  id: "ZZ0",
  canonicalId: "ci_ZZ0",
  reprints: ["set6-136"],
  cardType: "location",
  name: "Skull Rock",
  version: "Isolated Fortress",
  i18n: {
    en: {
      name: "Skull Rock",
      version: "Isolated Fortress",
      text: [
        {
          title: "FAMILIAR GROUND",
          description: "Characters get +1 {S} while here.",
        },
        {
          title: "SAFE HAVEN",
          description:
            "At the start of your turn, if you have a Pirate character here, gain 1 lore.",
        },
      ],
    },
    de: {
      name: "Schädelfelsen",
      version: "Abgelegene Festung",
      text: [
        {
          title: "VERTRAUTER BODEN",
          description: "Charaktere an diesem Ort erhalten +1.",
        },
        {
          title: "SICHERER HAFEN",
          description:
            "Zu Beginn deines Zuges, wenn du mindestens einen Piraten an diesem Ort hast, sammelst du 1 Legende.",
        },
      ],
    },
    fr: {
      name: "Rocher du crâne",
      version: "Forteresse isolée",
      text: [
        {
          title: "EN TERRAIN CONNU",
          description: "Les personnages sur ce lieu gagnent +1.",
        },
        {
          title: "HAVRE DE PAIX",
          description:
            "Au début de votre tour, si vous avez un personnage Pirate sur ce lieu, gagnez 1 éclat de Lore.",
        },
      ],
    },
    it: {
      name: "Roccia del Teschio",
      version: "Fortezza Isolata",
      text: [
        {
          title: "TERRENO FAMILIARE I",
          description: "personaggi ricevono +1 mentre si trovano in questo luogo.",
        },
        {
          title: "PORTO SICURO",
          description:
            "All'inizio del tuo turno, se hai un personaggio Pirata in questo luogo, ottieni 1 leggenda.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Peter Pan",
  set: "006",
  cardNumber: 136,
  rarity: "common",
  cost: 2,
  willpower: 6,
  moveCost: 1,
  lore: 0,
  inkable: true,
  externalIds: {
    lorcast: "crd_5c09e6638f7f4eccaa8ae9cf545702cc",
    tcgPlayer: 591987,
  },
  text: [
    {
      title: "FAMILIAR GROUND",
      description: "Characters get +1 {S} while here.",
    },
    {
      title: "SAFE HAVEN",
      description: "At the start of your turn, if you have a Pirate character here, gain 1 lore.",
    },
  ],
  abilities: [
    {
      effect: {
        modifier: 1,
        stat: "strength",
        target: "CHARACTERS_HERE",
        type: "modify-stat",
      },
      id: "1rj-1",
      name: "FAMILIAR GROUND",
      text: "FAMILIAR GROUND Characters get +1 {S} while here.",
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
              {
                type: "has-classification",
                classification: "Pirate",
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
      id: "1rj-2",
      name: "SAFE HAVEN",
      text: "SAFE HAVEN At the start of your turn, if you have a Pirate character here, gain 1 lore.",
      trigger: {
        event: "start-turn",
        on: "YOU",
        timing: "at",
      },
      type: "triggered",
    },
  ],
};
