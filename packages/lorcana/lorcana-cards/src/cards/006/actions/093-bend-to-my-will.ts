import type { ActionCard } from "@tcg/lorcana-types";

export const bendToMyWill: ActionCard = {
  id: "7l9",
  canonicalId: "ci_7l9",
  reprints: ["set6-093"],
  cardType: "action",
  name: "Bend to My Will",
  i18n: {
    en: {
      name: "Bend to My Will",
      text: "Each opponent discards all cards in their hand.",
    },
    de: {
      name: "Beuge dich meinem Willen",
      text: "Alle gegnerischen Mitspielenden werfen alle Karten aus ihrer Hand ab.",
    },
    fr: {
      name: "Soumettez-vous à ma volonté",
      text: "Chaque adversaire défausse toutes les cartes de sa main.",
    },
    it: {
      name: "Piegati al Mio Volere",
      text: "Ogni avversario scarta tutte le carte che ha in mano.",
    },
  },
  inkType: ["emerald"],
  franchise: "Aladdin",
  set: "006",
  cardNumber: 93,
  rarity: "common",
  cost: 7,
  inkable: false,
  externalIds: {
    lorcast: "crd_5406218b8d7a41a68bdf0be3029acf05",
    tcgPlayer: 591980,
  },
  text: "Each opponent discards all cards in their hand.",
  abilities: [
    {
      type: "action",
      text: "Each opponent discards all cards in their hand.",
      effect: {
        type: "discard",
        amount: "all",
        from: "hand",
        target: "EACH_OPPONENT",
      },
    },
  ],
};
