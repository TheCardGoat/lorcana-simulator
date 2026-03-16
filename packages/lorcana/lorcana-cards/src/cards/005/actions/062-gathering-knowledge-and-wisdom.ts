import type { ActionCard } from "@tcg/lorcana-types";

export const gatheringKnowledgeAndWisdom: ActionCard = {
  id: "hDY",
  canonicalId: "ci_hDY",
  reprints: ["set5-062"],
  cardType: "action",
  name: "Gathering Knowledge and Wisdom",
  i18n: {
    en: {
      name: "Gathering Knowledge and Wisdom",
      text: "Gain 2 lore.",
    },
    de: {
      name: "Wissen und Weisheit sammeln",
      text: "Sammle 2 Legenden.",
    },
    fr: {
      name: "Rassembler Connaissance et Sagesse",
      text: "Gagnez 2 éclats de Lore.",
    },
    it: {
      name: "Ottenere Sapere e Saggezza",
      text: "Ottieni 2 leggenda.",
    },
  },
  inkType: ["amethyst"],
  franchise: "Sword in the Stone",
  set: "005",
  cardNumber: 62,
  rarity: "common",
  cost: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_f199d7305e4a4b0a81d20610d4761aa9",
    tcgPlayer: 561620,
  },
  text: "Gain 2 lore.",
  abilities: [
    {
      type: "action",
      effect: {
        amount: 2,
        type: "gain-lore",
      },
    },
  ],
};
