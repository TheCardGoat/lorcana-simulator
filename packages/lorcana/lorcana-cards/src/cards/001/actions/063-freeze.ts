import type { ActionCard } from "@tcg/lorcana-types";

export const freeze: ActionCard = {
  id: "D1e",
  canonicalId: "ci_D1e",
  reprints: ["set1-063"],
  cardType: "action",
  name: "Freeze",
  i18n: {
    en: {
      name: "Freeze",
      text: "Exert chosen opposing character.",
    },
    de: {
      name: "Einfrieren",
      text: "Erschöpfe einen gegnerischen Charakter deiner Wahl.",
    },
    fr: {
      name: "GEL",
      text: "Choisissez un personnage adverse et épuisez-le.",
    },
    it: {
      name: "Freeze",
      text: "Exert chosen opposing character.",
    },
  },
  inkType: ["amethyst"],
  franchise: "Frozen",
  set: "001",
  cardNumber: 63,
  rarity: "common",
  cost: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_7ea36567dec64789a714995b1f459a47",
    tcgPlayer: 508733,
  },
  text: "Exert chosen opposing character.",
  abilities: [
    {
      type: "action",
      effect: {
        target: "CHOSEN_OPPOSING_CHARACTER",
        type: "exert",
      },
    },
  ],
};
