import type { ItemCard } from "@tcg/lorcana-types";

export const peterPansDagger: ItemCard = {
  id: "USv",
  canonicalId: "ci_USv",
  reprints: ["set2-135"],
  cardType: "item",
  name: "Peter Pan's Dagger",
  i18n: {
    en: {
      name: "Peter Pan's Dagger",
      text: "Your characters with Evasive get +1 {S}.",
    },
    de: {
      name: "Peter Pans Dolch",
      text: "Deine Charaktere mit Wendig erhalten +1.",
    },
    fr: {
      name: "Dague de Peter Pan",
      text: "Vos personnages avec Insaisissable gagnent +1.",
    },
    it: {
      name: "Peter Pan's Dagger",
      text: "Your characters with Evasive get +1.",
    },
  },
  inkType: ["ruby"],
  franchise: "Peter Pan",
  set: "002",
  cardNumber: 135,
  rarity: "common",
  cost: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_d6f21fdca571497883e46666abc022bc",
    tcgPlayer: 527761,
  },
  text: "Your characters with Evasive get +1 {S}.",
  abilities: [
    {
      effect: {
        modifier: 1,
        stat: "strength",
        target: "YOUR_CHARACTERS",
        type: "modify-stat",
      },
      id: "hwz-1",
      text: "Your characters with Evasive get +1 {S}.",
      type: "static",
    },
  ],
};
