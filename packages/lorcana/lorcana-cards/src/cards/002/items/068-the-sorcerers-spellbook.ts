import type { ItemCard } from "@tcg/lorcana-types";

export const theSorcerersSpellbook: ItemCard = {
  id: "ES1",
  canonicalId: "ci_ES1",
  reprints: ["set2-068"],
  cardType: "item",
  name: "The Sorcerer's Spellbook",
  i18n: {
    en: {
      name: "The Sorcerer's Spellbook",
      text: [
        {
          title: "KNOWLEDGE",
          description: "{E}, 1 {I} — Gain 1 lore.",
        },
      ],
    },
    de: {
      name: "Das Buch der Zaubersprüche",
      text: [
        {
          title: "WISSEN, 1",
          description: "— Sammle 1 Legende.",
        },
      ],
    },
    fr: {
      name: "Grimoire du sorcier",
      text: [
        {
          title: "CONNAISSANCE, 1",
          description: "— Gagnez 1 éclat de Lore.",
        },
      ],
    },
    it: {
      name: "The Sorcerer's Spellbook",
      text: [
        {
          title: "KNOWLEDGE, 1",
          description: "— Gain 1 lore.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Fantasia",
  set: "002",
  cardNumber: 68,
  rarity: "rare",
  cost: 3,
  inkable: false,
  externalIds: {
    lorcast: "crd_c48a5579b74d4299b4bc48db0776cd36",
    tcgPlayer: 516340,
  },
  text: [
    {
      title: "KNOWLEDGE",
      description: "{E}, 1 {I} — Gain 1 lore.",
    },
  ],
  abilities: [
    {
      cost: {
        exert: true,
        ink: 1,
      },
      effect: {
        amount: 1,
        target: "CONTROLLER",
        type: "gain-lore",
      },
      id: "1pk-1",
      name: "KNOWLEDGE",
      text: "KNOWLEDGE {E}, 1 {I} — Gain 1 lore.",
      type: "activated",
    },
  ],
};
