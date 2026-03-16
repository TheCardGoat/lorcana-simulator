import type { LocationCard } from "@tcg/lorcana-types";

export const theFrozenVineMonstrousPlant: LocationCard = {
  id: "siR",
  canonicalId: "ci_5Ub",
  reprints: ["set11-068"],
  cardType: "location",
  name: "The Frozen Vine",
  version: "Monstrous Plant",
  i18n: {
    en: {
      name: "The Frozen Vine",
      version: "Monstrous Plant",
      text: [
        {
          title: "PERSISTENT PROBLEM",
          description:
            "When this location is banished, if there was an exerted character here, return this card from your discard to your hand.",
        },
      ],
    },
    de: {
      name: "Die gefrorene Ranke",
      version: "Monströse Pflanze",
      text: [
        {
          title: "HARTNÄCKIGES PROBLEM",
          description:
            "Wenn dieser Ort verbannt wird, falls du mindestens einen erschöpften Charakter an diesem Ort hattest, nimm diese Karte aus deinem Ablagestapel zurück auf deine Hand.",
        },
      ],
    },
    fr: {
      name: "La Plante gelée",
      version: "Monstrueux végétal",
      text: [
        {
          title: "PROBLÈME PERSISTANT",
          description:
            "Lorsque ce lieu est banni, s'il y avait un personnage épuisé sur lui, renvoyez dans votre main cette carte-ci de votre défausse.",
        },
      ],
    },
    it: {
      name: "Il Viticcio Congelato",
      version: "Pianta Mostruosa",
      text: [
        {
          title: "PROBLEMA PERSISTENTE",
          description:
            "Quando questo luogo viene esiliato, se c'era un personaggio impegnato in questo luogo, riprendi in mano questa carta dai tuoi scarti.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Lorcana",
  set: "011",
  cardNumber: 68,
  rarity: "uncommon",
  cost: 3,
  willpower: 4,
  moveCost: 1,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_27d46247102c480c8b2ce98be8bb15f5",
    tcgPlayer: 673308,
  },
  text: [
    {
      title: "PERSISTENT PROBLEM",
      description:
        "When this location is banished, if there was an exerted character here, return this card from your discard to your hand.",
    },
  ],
  abilities: [
    {
      id: "1xr-1",
      sourceZones: ["play", "discard"],
      effect: {
        target: {
          ref: "self",
        },
        type: "return-to-hand",
      },
      name: "PERSISTENT PROBLEM",
      trigger: {
        event: "banish",
        on: "SELF",
        timing: "when",
      },
      condition: {
        type: "target-query",
        query: {
          selector: "all",
          count: "all",
          owner: "any",
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
      type: "triggered",
      text: "PERSISTENT PROBLEM When this location is banished, if there was an exerted character here, return this card from your discard to your hand.",
    },
  ],
};
