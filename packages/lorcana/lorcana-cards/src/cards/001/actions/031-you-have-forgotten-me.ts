import type { ActionCard } from "@tcg/lorcana-types";

export const youHaveForgottenMe: ActionCard = {
  id: "7me",
  canonicalId: "ci_7me",
  reprints: ["set1-031"],
  cardType: "action",
  name: "You Have Forgotten Me",
  i18n: {
    en: {
      name: "You Have Forgotten Me",
      text: "Each opponent chooses and discards 2 cards.",
    },
    de: {
      name: "Du hast mich vergessen",
      text: "Alle gegnerischen Mitspielenden wählen je 2 Karten aus ihrer Hand und werfen sie ab.",
    },
    fr: {
      name: "TU M'AS OUBLIÉ",
      text: "Chaque adversaire choisit 2 cartes de sa main et les défausse.",
    },
    it: {
      name: "You Have Forgotten Me",
      text: "Each opponent chooses and discards 2 cards.",
    },
  },
  inkType: ["amber"],
  franchise: "Lion King",
  set: "001",
  cardNumber: 31,
  rarity: "uncommon",
  cost: 4,
  inkable: true,
  externalIds: {
    lorcast: "crd_c91b8810b881450faa5942daf03e03ef",
    tcgPlayer: 508716,
  },
  text: "Each opponent chooses and discards 2 cards.",
  abilities: [
    {
      type: "action",
      effect: {
        amount: 2,
        chosen: true,
        from: "hand",
        target: "EACH_OPPONENT",
        type: "discard",
      },
    },
  ],
};
