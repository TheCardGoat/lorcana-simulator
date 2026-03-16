import type { CharacterCard } from "@tcg/lorcana-types";

export const snowWhiteFairestInTheLand: CharacterCard = {
  id: "3bd",
  canonicalId: "ci_3bd",
  reprints: ["set7-033"],
  cardType: "character",
  name: "Snow White",
  version: "Fairest in the Land",
  i18n: {
    en: {
      name: "Snow White",
      version: "Fairest in the Land",
      text: [
        {
          title: "HIDDEN AWAY",
          description: "This character can't be challenged.",
        },
      ],
    },
    de: {
      name: "Schneewittchen",
      version: "Die Schönste im Land",
      text: [
        {
          title: "VERSTECKT",
          description: "Dieser Charakter kann nicht herausgefordert werden.",
        },
      ],
    },
    fr: {
      name: "Blanche-Neige",
      version: "Plus belle que jamais",
      text: [
        {
          title: "DISSIMULÉE",
          description: "Ce personnage ne peut pas être défié.",
        },
      ],
    },
    it: {
      name: "Biancaneve",
      version: "La Più Bella del Reame",
      text: [
        {
          title: "NASCOSTA",
          description: "Questo personaggio non può essere sfidato.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Snow White",
  set: "007",
  cardNumber: 33,
  rarity: "uncommon",
  cost: 4,
  strength: 2,
  willpower: 2,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_2f6b2d82972a4c47aca9ebf61a664045",
    tcgPlayer: 619425,
  },
  text: [
    {
      title: "HIDDEN AWAY",
      description: "This character can't be challenged.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Princess"],
  abilities: [
    {
      effect: {
        restriction: "cant-be-challenged",
        target: "SELF",
        type: "restriction",
      },
      id: "1wd-1",
      name: "HIDDEN AWAY",
      text: "HIDDEN AWAY This character can't be challenged.",
      type: "static",
    },
  ],
};
