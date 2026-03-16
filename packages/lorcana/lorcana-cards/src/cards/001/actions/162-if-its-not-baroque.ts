import type { ActionCard } from "@tcg/lorcana-types";

export const ifItsNotBaroque: ActionCard = {
  id: "wfG",
  canonicalId: "ci_wfG",
  reprints: ["set1-162"],
  cardType: "action",
  name: "If it’s Not Baroque",
  i18n: {
    en: {
      name: "If it’s Not Baroque",
      text: "Return an item card from your discard to your hand.",
    },
    de: {
      name: "Ist es nicht Barock",
      text: "Nimm 1 Gegenstandskarte aus deinem Ablagestapel zurück auf deine Hand.",
    },
    fr: {
      name: "SI C'EST PAS BAROQUE...",
      text: "Reprenez en main une carte objet de votre défausse.",
    },
    it: {
      name: "If it’s Not Baroque",
      text: "Return an item card from your discard to your hand.",
    },
  },
  inkType: ["sapphire"],
  franchise: "Beauty and the Beast",
  set: "001",
  cardNumber: 162,
  rarity: "rare",
  cost: 3,
  inkable: false,
  externalIds: {
    lorcast: "crd_fcfc387c36dc450c93bb85840e3b6957",
    tcgPlayer: 505980,
  },
  text: "Return an item card from your discard to your hand.",
  abilities: [
    {
      type: "action",
      effect: {
        cardType: "item",
        target: "CONTROLLER",
        type: "return-from-discard",
      },
    },
  ],
};
