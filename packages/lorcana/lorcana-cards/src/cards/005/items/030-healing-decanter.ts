import type { ItemCard } from "@tcg/lorcana-types";

export const healingDecanter: ItemCard = {
  id: "5HB",
  canonicalId: "ci_5HB",
  reprints: ["set5-030"],
  cardType: "item",
  name: "Healing Decanter",
  i18n: {
    en: {
      name: "Healing Decanter",
      text: [
        {
          title: "RENEWING ESSENCE",
          description: "{E} — Remove up to 2 damage from chosen character.",
        },
      ],
    },
    de: {
      name: "Heilende Karaffe",
      text: [
        {
          title: "ERNEUERNDE ESSENZ",
          description: "— Entferne bis zu 2 Schaden von einem Charakter deiner Wahl.",
        },
      ],
    },
    fr: {
      name: "Philtre de guérison",
      text: [
        {
          title: "SOLUTION",
          description: "RÉGÉNÉRANTE — Choisissez un personnage et retirez-lui jusqu'à 2 dommages.",
        },
      ],
    },
    it: {
      name: "Ampolla Curativa",
      text: [
        {
          title: "ESSENZA DI RINNOVAMENTO",
          description: "— Rimuovi fino a 2 danni da un personaggio a tua scelta.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Lorcana",
  set: "005",
  cardNumber: 30,
  rarity: "common",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_af887c9fbbbf4e12bf91a9d221681e71",
    tcgPlayer: 560645,
  },
  text: [
    {
      title: "RENEWING ESSENCE",
      description: "{E} — Remove up to 2 damage from chosen character.",
    },
  ],
  abilities: [
    {
      cost: {
        exert: true,
      },
      effect: {
        amount: 2,
        target: "CHOSEN_CHARACTER",
        type: "remove-damage",
        upTo: true,
      },
      id: "el0-1",
      name: "RENEWING ESSENCE",
      text: "RENEWING ESSENCE {E} — Remove up to 2 damage from chosen character.",
      type: "activated",
    },
  ],
};
