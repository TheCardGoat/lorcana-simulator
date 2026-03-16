import type { CharacterCard } from "@tcg/lorcana-types";

export const percyPupsicle: CharacterCard = {
  id: "0V8",
  canonicalId: "ci_0V8",
  reprints: ["set11-027"],
  cardType: "character",
  name: "Percy",
  version: "Pupsicle",
  i18n: {
    en: {
      name: "Percy",
      version: "Pupsicle",
      text: [
        {
          title: "ICE BATH",
          description: "This character can't challenge.",
        },
      ],
    },
    de: {
      name: "Percy",
      version: "Kalter Hund",
      text: [
        {
          title: "EISBAD",
          description: "Dieser Charakter kann nicht herausfordern.",
        },
      ],
    },
    fr: {
      name: "Percy",
      version: "Chien givré",
      text: [
        {
          title: "BAIN DE GLACE",
          description: "Ce personnage ne peut pas défier.",
        },
      ],
    },
    it: {
      name: "Perlin",
      version: "Canghiacciolo",
      text: [
        {
          title: "BAGNO DI GHIACCIO",
          description: "Questo personaggio non può sfidare.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Pocahontas",
  set: "011",
  cardNumber: 27,
  rarity: "common",
  cost: 3,
  strength: 1,
  willpower: 4,
  lore: 3,
  inkable: true,
  externalIds: {
    lorcast: "crd_1a61d954f0524416a6c0f46814520495",
    tcgPlayer: 674830,
  },
  text: [
    {
      title: "ICE BATH",
      description: "This character can't challenge.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      id: "v8p-1",
      effect: {
        restriction: "cant-challenge",
        target: "SELF",
        type: "restriction",
      },
      type: "static",
      name: "ICE BATH",
      text: "ICE BATH This character can't challenge.",
    },
  ],
};
