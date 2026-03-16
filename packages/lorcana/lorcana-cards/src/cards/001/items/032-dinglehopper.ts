import type { ItemCard } from "@tcg/lorcana-types";

export const dinglehopper: ItemCard = {
  id: "hoX",
  canonicalId: "ci_hoX",
  reprints: ["set1-032"],
  cardType: "item",
  name: "Dinglehopper",
  i18n: {
    en: {
      name: "Dinglehopper",
      text: [
        {
          title: "STRAIGHTEN HAIR",
          description: "{E} — Remove up to 1 damage from chosen character.",
        },
      ],
    },
    de: {
      name: "Dingelhopper",
      text: [
        {
          title: "HAARE STRIEGELN",
          description: "— Entferne bis zu 1 Schaden von einem Charakter deiner Wahl.",
        },
      ],
    },
    fr: {
      name: "ZIRGOUFLEX",
      text: [
        {
          title: "RATISSER LES POILS DE",
          description: "TÊTE — Choisissez un personnage et retirez-lui 1 jeton Dommage.",
        },
      ],
    },
    it: {
      name: "Arricciaspiccia",
      text: [
        {
          title: "SISTEMARE I CAPELLI",
          description: "— Rimuovi fino a 1 danno da un personaggio a tua scelta.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Little Mermaid",
  set: "001",
  cardNumber: 32,
  rarity: "common",
  cost: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_4ab0c55e07324d30903f51b7bbd41c8d",
    tcgPlayer: 492733,
  },
  text: [
    {
      title: "STRAIGHTEN HAIR",
      description: "{E} — Remove up to 1 damage from chosen character.",
    },
  ],
  abilities: [
    {
      cost: {
        exert: true,
      },
      effect: {
        amount: 1,
        target: "CHOSEN_CHARACTER",
        type: "remove-damage",
        upTo: true,
      },
      id: "7r6-1",
      name: "STRAIGHTEN HAIR",
      text: "STRAIGHTEN HAIR {E} — Remove up to 1 damage from chosen character.",
      type: "activated",
    },
  ],
};
