import type { ActionCard } from "@tcg/lorcana-types";

export const thievery: ActionCard = {
  id: "C0T",
  canonicalId: "ci_C0T",
  reprints: ["set6-128"],
  cardType: "action",
  name: "Thievery",
  i18n: {
    en: {
      name: "Thievery",
      text: "Chosen opponent loses 1 lore. Gain 1 lore.",
    },
    de: {
      name: "Diebstahl",
      text: "Eine gegnerische Person deiner Wahl verliert 1 Legende. Sammle 1 Legende.",
    },
    fr: {
      name: "Chapardage",
      text: "Choisissez un adversaire qui perd 1 éclat de Lore. Gagnez 1 éclat de Lore.",
    },
    it: {
      name: "Furto",
      text: "Un avversario a tua scelta perde 1 leggenda. Ottieni 1 leggenda.",
    },
  },
  inkType: ["ruby"],
  franchise: "Aladdin",
  set: "006",
  cardNumber: 128,
  rarity: "common",
  cost: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_abdee4f2746b40b48c29ea5f3da815b2",
    tcgPlayer: 588086,
  },
  text: "Chosen opponent loses 1 lore. Gain 1 lore.",
  abilities: [
    {
      effect: {
        steps: [
          {
            amount: 1,
            target: "OPPONENT",
            type: "lose-lore",
          },
          {
            amount: 1,
            type: "gain-lore",
          },
        ],
        type: "sequence",
      },
      id: "f60-1",
      text: "Chosen opponent loses 1 lore. Gain 1 lore.",
      type: "action",
    },
  ],
};
