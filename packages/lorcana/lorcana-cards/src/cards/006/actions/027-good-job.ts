import type { ActionCard } from "@tcg/lorcana-types";

export const goodJob: ActionCard = {
  id: "B7K",
  canonicalId: "ci_B7K",
  reprints: ["set6-027"],
  cardType: "action",
  name: "Good Job!",
  i18n: {
    en: {
      name: "Good Job!",
      text: "Chosen character gets +1 {L} this turn.",
    },
    de: {
      name: "Gut gemacht!",
      text: "Gib einem Charakter deiner Wahl in diesem Zug +1.",
    },
    fr: {
      name: "Beau travail !",
      text: "Choisissez un personnage qui gagne +1 pour le reste de ce tour.",
    },
    it: {
      name: "Ben fatto!",
      text: "Un personaggio a tua scelta riceve +1 per questo turno.",
    },
  },
  inkType: ["amber"],
  franchise: "Zootropolis",
  set: "006",
  cardNumber: 27,
  rarity: "common",
  cost: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_a9d39ce276fd4f1b9435d1bb1d09559c",
    tcgPlayer: 591977,
  },
  text: "Chosen character gets +1 {L} this turn.",
  abilities: [
    {
      effect: {
        duration: "this-turn",
        modifier: 1,
        stat: "lore",
        target: {
          cardTypes: ["character"],
          count: 1,
          owner: "any",
          selector: "chosen",
          zones: ["play"],
        },
        type: "modify-stat",
      },
      id: "1q8-1",
      text: "Chosen character gets +1 {L} this turn.",
      type: "action",
    },
  ],
};
