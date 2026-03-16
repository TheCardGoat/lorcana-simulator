import type { ActionCard } from "@tcg/lorcana-types";

export const packTactics: ActionCard = {
  id: "GkR",
  canonicalId: "ci_GkR",
  reprints: ["set2-100"],
  cardType: "action",
  name: "Pack Tactics",
  i18n: {
    en: {
      name: "Pack Tactics",
      text: "Gain 1 lore for each damaged character opponents have in play.",
    },
    de: {
      name: "Rudeltaktiken",
      text: "Sammle 1 Legende für jeden gegnerischen Charakter, der beschädigt ist.",
    },
    fr: {
      name: "Tactique de meute",
      text: "Gagnez 1 éclat de Lore pour chaque personnage adverse blessé en jeu.",
    },
    it: {
      name: "Pack Tactics",
      text: "Gain 1 lore for each damaged character opponents have in play.",
    },
  },
  inkType: ["emerald"],
  franchise: "Emperors New Groove",
  set: "002",
  cardNumber: 100,
  rarity: "rare",
  cost: 4,
  inkable: true,
  externalIds: {
    lorcast: "crd_3255845b67e447e9821ea5cee4848f57",
    tcgPlayer: 525311,
  },
  text: "Gain 1 lore for each damaged character opponents have in play.",
  abilities: [
    {
      type: "action",
      effect: {
        type: "for-each",
        counter: {
          controller: "opponent",
          type: "damaged-characters",
        },
        effect: {
          amount: 1,
          target: "CONTROLLER",
          type: "gain-lore",
        },
      },
    },
  ],
};
