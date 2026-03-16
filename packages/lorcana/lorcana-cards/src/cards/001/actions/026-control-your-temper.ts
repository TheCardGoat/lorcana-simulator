import type { ActionCard } from "@tcg/lorcana-types";

export const controlYourTemper: ActionCard = {
  id: "PZv",
  canonicalId: "ci_PZv",
  reprints: ["set1-026"],
  cardType: "action",
  name: "Control Your Temper!",
  i18n: {
    en: {
      name: "Control Your Temper!",
      text: "Chosen character gets -2 {S} this turn.",
    },
    de: {
      name: "Halten Sie ihr Temperament im Zaum!",
      text: "Gib einem Charakter deiner Wahl in diesem Zug -2.",
    },
    fr: {
      name: "TRÈS MAUVAIS CARACTÈRE !",
      text: "Choisissez un personnage, il subit -2 pour le reste de ce tour.",
    },
    it: {
      name: "Control Your Temper!",
      text: "Chosen character gets –2 this turn.",
    },
  },
  inkType: ["amber"],
  franchise: "Beauty and the Beast",
  set: "001",
  cardNumber: 26,
  rarity: "common",
  cost: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_3a593c8dd2fe4552a4874f7346527387",
    tcgPlayer: 493501,
  },
  text: "Chosen character gets -2 {S} this turn.",
  abilities: [
    {
      type: "action",
      effect: {
        duration: "this-turn",
        modifier: -2,
        stat: "strength",
        target: {
          cardTypes: ["character"],
          count: 1,
          owner: "any",
          selector: "chosen",
          zones: ["play"],
        },
        type: "modify-stat",
      },
    },
  ],
};
