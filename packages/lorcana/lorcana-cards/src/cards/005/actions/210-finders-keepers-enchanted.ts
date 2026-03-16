import type { ActionCard } from "@tcg/lorcana-types";

export const findersKeepersEnchanted: ActionCard = {
  id: "b01",
  canonicalId: "ci_LfA",
  reprints: ["set5-060"],
  cardType: "action",
  name: "Finders Keepers",
  i18n: {
    en: {
      name: "Finders Keepers",
      text: "Draw 3 cards.",
    },
    de: {
      name: "Wer's findet, darf's behalten",
      text: "Ziehe 3 Karten.",
    },
    fr: {
      name: "Force hypnotique",
      text: "Piochez une carte. Choisissez un personnage qui gagne Offensif +2 pour le reste de ce tour.",
    },
    it: {
      name: "Chi Trova Tiene",
      text: "Pesca 3 carte.",
    },
  },
  inkType: ["amethyst"],
  franchise: "Aladdin",
  set: "005",
  cardNumber: 210,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 5,
  inkable: true,
  externalIds: {
    lorcast: "crd_c2ea432892434d9c9814d4bf6c3791a5",
    tcgPlayer: 561997,
  },
  text: "Draw 3 cards.",
  abilities: [
    {
      id: "q4f-1",
      effect: {
        amount: 3,
        target: "CONTROLLER",
        type: "draw",
      },
      type: "action",
      text: "Draw 3 cards.",
    },
  ],
};
