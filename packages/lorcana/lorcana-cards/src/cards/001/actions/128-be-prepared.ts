import type { ActionCard } from "@tcg/lorcana-types";

export const bePrepared: ActionCard = {
  id: "4Sx",
  canonicalId: "ci_4Sx",
  reprints: ["set1-128"],
  cardType: "action",
  name: "Be Prepared",
  i18n: {
    en: {
      name: "Be Prepared",
      text: "Banish all characters.",
    },
    de: {
      name: "Seid bereit!",
      text: "Verbanne alle Charaktere.",
    },
    fr: {
      name: "SOYEZ PRÊTES !",
      text: "Bannissez tous les personnages.",
    },
    it: {
      name: "Be Prepared",
      text: "Banish all characters.",
    },
  },
  inkType: ["ruby"],
  franchise: "Lion King",
  set: "001",
  cardNumber: 128,
  rarity: "rare",
  cost: 7,
  inkable: false,
  externalIds: {
    lorcast: "crd_a7c6d3aa2de6462f8d205d70a8fcc54f",
    tcgPlayer: 506077,
  },
  text: "Banish all characters.",
  actionSubtype: "song",
  abilities: [
    {
      type: "action",
      effect: {
        target: "ALL_CHARACTERS",
        type: "banish",
      },
    },
  ],
};
