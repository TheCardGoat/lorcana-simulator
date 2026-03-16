import type { ActionCard } from "@tcg/lorcana-types";

export const tangle: ActionCard = {
  id: "X1Y",
  canonicalId: "ci_X1Y",
  reprints: ["set1-133"],
  cardType: "action",
  name: "Tangle",
  i18n: {
    en: {
      name: "Tangle",
      text: "Each opponent loses 1 lore.",
    },
    de: {
      name: "Einwickeln",
      text: "Alle gegnerischen Mitspielenden verlieren je 1 Legende.",
    },
    fr: {
      name: "ENCHEVÊTRÉ",
      text: "Chaque adversaire perd 1 éclat de Lore.",
    },
    it: {
      name: "Tangle",
      text: "Each opponent loses 1 lore.",
    },
  },
  inkType: ["ruby"],
  franchise: "Tangled",
  set: "001",
  cardNumber: 133,
  rarity: "common",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_6e0a4c7a191f4e6fbdc58193e35bbc7c",
    tcgPlayer: 508598,
  },
  text: "Each opponent loses 1 lore.",
  abilities: [
    {
      effect: {
        amount: 1,
        target: "EACH_OPPONENT",
        type: "lose-lore",
      },
      type: "action",
    },
  ],
};
