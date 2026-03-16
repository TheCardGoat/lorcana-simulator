import type { LocationCard } from "@tcg/lorcana-types";

export const whiteAgonyPlainsGoldenLagoon: LocationCard = {
  id: "4XD",
  canonicalId: "ci_4XD",
  reprints: ["set10-102"],
  cardType: "location",
  name: "White Agony Plains",
  version: "Golden Lagoon",
  i18n: {
    en: {
      name: "White Agony Plains",
      version: "Golden Lagoon",
      text: [
        {
          title: "PURE LIQUID GOLD",
          description: "This location gets +1 {L} for each character here.",
        },
      ],
    },
    de: {
      name: "Tal des weißen Todes",
      version: "Goldene Lagune",
      text: [
        {
          title: "REINES FLÜSSIGES GOLD",
          description: "Dieser Ort erhält +1 für jeden Charakter an diesem Ort.",
        },
      ],
    },
    fr: {
      name: "Plaines de l’Agonie Blanche",
      version: "Lagon doré",
      text: [
        {
          title: "DE L'OR LIQUIDE PUR",
          description: "Ce lieu gagne +1 pour chaque personnage sur lui.",
        },
      ],
    },
    it: {
      name: "Pianure dell'Agonia Bianca",
      version: "Laguna Dorata",
      text: [
        {
          title: "CASCATE DI ORO LIQUIDO",
          description: "Questo luogo riceve +1 per ogni personaggio in questo luogo.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Ducktales",
  set: "010",
  cardNumber: 102,
  rarity: "rare",
  cost: 2,
  willpower: 7,
  moveCost: 1,
  lore: 0,
  inkable: true,
  externalIds: {
    lorcast: "crd_4296f5bd9774451e920827cc374b8981",
    tcgPlayer: 660040,
  },
  text: [
    {
      title: "PURE LIQUID GOLD",
      description: "This location gets +1 {L} for each character here.",
    },
  ],
  abilities: [
    {
      id: "4XD-1",
      name: "PURE LIQUID GOLD",
      text: "PURE LIQUID GOLD This location gets +1 {L} for each character here.",
      type: "static",
      effect: {
        type: "modify-stat",
        stat: "lore",
        modifier: {
          type: "filtered-count",
          owner: "any",
          zones: ["play"],
          cardType: "character",
          filters: [
            {
              type: "same-location-as-source",
            },
          ],
        },
        target: "SELF",
      },
    },
  ],
};
