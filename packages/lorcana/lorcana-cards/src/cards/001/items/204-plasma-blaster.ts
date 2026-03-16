import type { ItemCard } from "@tcg/lorcana-types";

export const plasmaBlaster: ItemCard = {
  id: "zJQ",
  canonicalId: "ci_zJQ",
  reprints: ["set1-204"],
  cardType: "item",
  name: "Plasma Blaster",
  i18n: {
    en: {
      name: "Plasma Blaster",
      text: [
        {
          title: "QUICK SHOT",
          description: "{E}, 2 {I} — Deal 1 damage to chosen character.",
        },
      ],
    },
    de: {
      name: "Plasma-Kanone",
      text: [
        {
          title: "SCHNELLFEUER, 2",
          description: "— Füge einem Charakter deiner Wahl 1 Schaden zu.",
        },
      ],
    },
    fr: {
      name: "PISTOLET À PLASMA",
      text: [
        {
          title: "TIR RAPIDE, 2",
          description: "— Choisissez un personnage et infligez-lui 1 dommage.",
        },
      ],
    },
    it: {
      name: "Plasma Blaster",
      text: [
        {
          title: "QUICK SHOT, 2",
          description: "— Deal 1 damage to chosen character.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Lilo and Stitch",
  set: "001",
  cardNumber: 204,
  rarity: "rare",
  cost: 3,
  inkable: false,
  externalIds: {
    lorcast: "crd_22373df684c0420ea90d2f8508ac096c",
    tcgPlayer: 508929,
  },
  text: [
    {
      title: "QUICK SHOT",
      description: "{E}, 2 {I} — Deal 1 damage to chosen character.",
    },
  ],
  abilities: [
    {
      cost: {
        exert: true,
        ink: 2,
      },
      effect: {
        amount: 1,
        target: "CHOSEN_CHARACTER",
        type: "deal-damage",
      },
      id: "1mq-1",
      name: "QUICK SHOT",
      text: "QUICK SHOT {E}, 2 {I} — Deal 1 damage to chosen character.",
      type: "activated",
    },
  ],
};
