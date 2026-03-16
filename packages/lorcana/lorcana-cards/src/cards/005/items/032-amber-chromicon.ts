import type { ItemCard } from "@tcg/lorcana-types";

export const amberChromicon: ItemCard = {
  id: "1vP",
  canonicalId: "ci_1vP",
  reprints: ["set5-032"],
  cardType: "item",
  name: "Amber Chromicon",
  i18n: {
    en: {
      name: "Amber Chromicon",
      text: [
        {
          title: "AMBER LIGHT",
          description: "{E} — Remove up to 1 damage from each of your characters.",
        },
      ],
    },
    de: {
      name: "Bernstein Chromikon",
      text: [
        {
          title: "BERNSTEINFARBENES LICHT",
          description: "— Entferne bis zu 1 Schaden von jedem deiner Charaktere.",
        },
      ],
    },
    fr: {
      name: "Chromicône d'Ambre",
      text: [
        {
          title: "LUEUR D'AMBRE",
          description: "— Retirez jusqu'à 1 dommage de chacun de vos personnages.",
        },
      ],
    },
    it: {
      name: "Cromicon d'Ambra",
      text: [
        {
          title: "LUCE D'AMBRA",
          description: "— Rimuovi fino a 1 danno da ogni tuo personaggio.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Lorcana",
  set: "005",
  cardNumber: 32,
  rarity: "uncommon",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_a849716500754889824d4a9aeb2c6b84",
    tcgPlayer: 560093,
  },
  text: [
    {
      title: "AMBER LIGHT",
      description: "{E} — Remove up to 1 damage from each of your characters.",
    },
  ],
  abilities: [
    {
      cost: {
        exert: true,
      },
      effect: {
        amount: 1,
        target: "YOUR_CHARACTERS",
        type: "remove-damage",
        upTo: true,
      },
      id: "1yv-1",
      name: "AMBER LIGHT",
      text: "AMBER LIGHT {E} — Remove up to 1 damage from each of your characters.",
      type: "activated",
    },
  ],
};
