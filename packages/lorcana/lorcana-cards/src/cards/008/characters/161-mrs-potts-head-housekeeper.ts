import type { CharacterCard } from "@tcg/lorcana-types";

export const mrsPottsHeadHousekeeper: CharacterCard = {
  id: "XCS",
  canonicalId: "ci_XCS",
  reprints: ["set8-161"],
  cardType: "character",
  name: "Mrs. Potts",
  version: "Head Housekeeper",
  i18n: {
    en: {
      name: "Mrs. Potts",
      version: "Head Housekeeper",
      text: [
        {
          title: "CLEAN UP",
          description: "{E}, Banish one of your items — Draw a card.",
        },
      ],
    },
    de: {
      name: "Mme. Pottine",
      version: "Hausdame",
      text: [
        {
          title: "AUFRÄUMEN,",
          description: "Verbanne einen deiner Gegenstände — Ziehe 1 Karte.",
        },
      ],
    },
    fr: {
      name: "Madame Samovar",
      version: "Gouvernante en chef",
      text: [
        {
          title: "NETTOYAGE,",
          description: "Bannissez l'un de vos objets — Piochez une carte.",
        },
      ],
    },
    it: {
      name: "Mrs. Bric",
      version: "Prima Governante",
      text: [
        {
          title: "PULIZIA,",
          description: "esilia uno dei tuoi oggetti — Pesca una carta.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Beauty and the Beast",
  set: "008",
  cardNumber: 161,
  rarity: "common",
  cost: 3,
  strength: 2,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_28a3d3d8855040c3a9fcb602177ff86e",
    tcgPlayer: 631458,
  },
  text: [
    {
      title: "CLEAN UP",
      description: "{E}, Banish one of your items — Draw a card.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      id: "cpn-1",
      cost: {
        exert: true,
      },
      effect: {
        amount: 1,
        target: "CONTROLLER",
        type: "draw",
      },
      type: "activated",
      text: "CLEAN UP {E}, Banish one of your items — Draw a card.",
    },
  ],
};
