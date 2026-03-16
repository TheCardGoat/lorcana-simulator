import type { LocationCard } from "@tcg/lorcana-types";

export const ursulasGardenFullOfTheUnfortunate: LocationCard = {
  id: "S3h",
  canonicalId: "ci_S3h",
  reprints: ["set4-102"],
  cardType: "location",
  name: "Ursula’s Garden",
  version: "Full of the Unfortunate",
  i18n: {
    en: {
      name: "Ursula’s Garden",
      version: "Full of the Unfortunate",
      text: [
        {
          title: "ABANDON HOPE",
          description: "While you have an exerted character here, opposing characters get -1 {L}.",
        },
      ],
    },
    de: {
      name: "Ursulas Garten",
      version: "Voll von Seelen in Not",
      text: [
        {
          title: "DIE HOFFNUNG VERLIEREN",
          description:
            "Solange du mindestens einen erschöpften Charakter an diesem Ort hast, erhalten gegnerische Charaktere -1.",
        },
      ],
    },
    fr: {
      name: "Jardin d'Ursula",
      version: "Rempli d'âmes en perdition",
      text: [
        {
          title: "ESPOIR PERDU",
          description:
            "Tant que vous avez au moins un personnage épuisé sur ce lieu, les personnages adverses subissent -1.",
        },
      ],
    },
    it: {
      name: "Il Giardino di Ursula",
      version: "Pieno di Anime Sole",
      text: [
        {
          title: "ABBANDONARE OGNI SPERANZA",
          description:
            "Mentre hai un personaggio impegnato in questo luogo, i personaggi avversari ricevono -1.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Little Mermaid",
  set: "004",
  cardNumber: 102,
  rarity: "rare",
  cost: 4,
  willpower: 7,
  moveCost: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_5b7970f5f54d4311882227c856ac28ac",
    tcgPlayer: 547688,
  },
  text: [
    {
      title: "ABANDON HOPE",
      description: "While you have an exerted character here, opposing characters get -1 {L}.",
    },
  ],
  abilities: [
    {
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
              type: "exerted",
            },
          ],
        },
        comparison: {
          operator: "gte",
          value: 1,
        },
      },
      effect: {
        modifier: -1,
        stat: "lore",
        target: {
          selector: "all",
          count: "all",
          owner: "opponent",
          zones: ["play"],
          cardTypes: ["character"],
        },
        type: "modify-stat",
      },
      id: "1h6-1",
      text: "ABANDON HOPE While you have an exerted character here, opposing characters get -1 {L}.",
      type: "static",
    },
  ],
};
