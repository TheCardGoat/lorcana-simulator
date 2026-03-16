import type { ActionCard } from "@tcg/lorcana-types";

export const breakCard: ActionCard = {
  id: "PsS",
  canonicalId: "ci_PsS",
  reprints: ["set1-196"],
  cardType: "action",
  name: "Break",
  i18n: {
    en: {
      name: "Break",
      text: "Banish chosen item.",
    },
    de: {
      name: "Zerfetzen",
      text: "Verbanne einen Gegenstand deiner Wahl.",
    },
    fr: {
      name: "DÉCHIQUETÉ",
      text: "Choisissez un objet et bannissez-le.",
    },
    it: {
      name: "Break",
      text: "Banish chosen item.",
    },
  },
  inkType: ["steel"],
  franchise: "Beauty and the Beast",
  set: "001",
  cardNumber: 196,
  rarity: "common",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_327f997026094ec49f0dc7d77e4628f5",
    tcgPlayer: 506000,
  },
  text: "Banish chosen item.",
  abilities: [
    {
      type: "action",
      effect: {
        type: "banish",
        target: "CHOSEN_ITEM",
      },
    },
  ],
};
