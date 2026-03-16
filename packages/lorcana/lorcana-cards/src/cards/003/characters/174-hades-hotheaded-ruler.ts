import type { CharacterCard } from "@tcg/lorcana-types";

export const hadesHotheadedRuler: CharacterCard = {
  id: "3Tj",
  canonicalId: "ci_3Tj",
  reprints: ["set3-174"],
  cardType: "character",
  name: "Hades",
  version: "Hotheaded Ruler",
  i18n: {
    en: {
      name: "Hades",
      version: "Hotheaded Ruler",
      text: [
        {
          title: "CALL THE TITANS",
          description: "{E} — Ready your Titan characters.",
        },
      ],
    },
    de: {
      name: "Hades",
      version: "Hitzköpfiger Herrscher",
      text: [
        {
          title: "DIE TITANEN RUFEN",
          description: "— Mache alle deine Titanen bereit.",
        },
      ],
    },
    fr: {
      name: "Hadès",
      version: "Souverain enflammé",
      text: [
        {
          title: "APPEL DES TITANS",
          description: "— Redressez vos personnages Titan.",
        },
      ],
    },
    it: {
      name: "Ade",
      version: "Governante Irascibile",
      text: [
        {
          title: "RICHIAMARE I TITANI",
          description: "— Prepara i tuoi personaggi Titano.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Hercules",
  set: "003",
  cardNumber: 174,
  rarity: "rare",
  cost: 6,
  strength: 5,
  willpower: 5,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_380dc3639d7349c28a244b65ed675fcb",
    tcgPlayer: 539106,
  },
  text: [
    {
      title: "CALL THE TITANS",
      description: "{E} — Ready your Titan characters.",
    },
  ],
  classifications: ["Storyborn", "Villain", "Deity"],
  abilities: [
    {
      id: "3Tj-1",
      name: "CALL THE TITANS",
      text: "CALL THE TITANS {E} — Ready your Titan characters.",
      type: "activated",
      cost: {
        exert: true,
      },
      effect: {
        type: "ready",
        target: {
          selector: "all",
          count: "all",
          owner: "you",
          zones: ["play"],
          cardTypes: ["character"],
          filter: [
            {
              type: "has-classification",
              classification: "Titan",
            },
          ],
        },
      },
    },
  ],
};
