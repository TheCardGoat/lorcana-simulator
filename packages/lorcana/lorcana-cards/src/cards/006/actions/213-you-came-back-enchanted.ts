import type { ActionCard } from "@tcg/lorcana-types";

export const youCameBackEnchanted: ActionCard = {
  id: "8ys",
  canonicalId: "ci_wY5",
  reprints: ["set6-097"],
  cardType: "action",
  name: "You Came Back",
  i18n: {
    en: {
      name: "You Came Back",
      text: "Ready chosen character.",
    },
    de: {
      name: "Du bist zurückgekommen",
      text: "Mache einen Charakter deiner Wahl bereit.",
    },
    fr: {
      name: "Tu es revenu",
      text: "Choisissez un personnage et redressez-le.",
    },
    it: {
      name: "Sei Tornato",
      text: "Prepara un personaggio a tua scelta.",
    },
  },
  inkType: ["emerald"],
  franchise: "Lilo and Stitch",
  set: "006",
  cardNumber: 213,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 3,
  inkable: false,
  externalIds: {
    lorcast: "crd_b29e4a26e9324724aab37e97a7738476",
    tcgPlayer: 591998,
  },
  text: "Ready chosen character.",
  abilities: [
    {
      effect: {
        target: {
          cardTypes: ["character"],
          count: 1,
          owner: "any",
          selector: "chosen",
          zones: ["play"],
        },
        type: "ready",
      },
      id: "1dw-1",
      text: "Ready chosen character.",
      type: "action",
    },
  ],
};
