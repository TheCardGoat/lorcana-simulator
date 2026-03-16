import type { CharacterCard } from "@tcg/lorcana-types";

export const motherGothelWitheredAndWicked: CharacterCard = {
  id: "5YN",
  canonicalId: "ci_5YN",
  reprints: ["set2-116"],
  cardType: "character",
  name: "Mother Gothel",
  version: "Withered and Wicked",
  i18n: {
    en: {
      name: "Mother Gothel",
      version: "Withered and Wicked",
      text: [
        {
          title: "WHAT HAVE YOU DONE?!",
          description: "This character enters play with 3 damage.",
        },
      ],
    },
    de: {
      name: "Mutter Gothel",
      version: "Verwelkt und verrucht",
      text: [
        {
          title: "WAS HAST DU GETAN?!",
          description: "Dieser Charakter kommt mit 3 Schaden auf ihm ins Spiel.",
        },
      ],
    },
    fr: {
      name: "Mère Gothel",
      version: "Mauvaise et desséchée",
      text: [
        {
          title: "QU'AVEZ-VOUS FAIT?!",
          description: "Ce personnage entre en jeu avec 3 jetons Dommage.",
        },
      ],
    },
    it: {
      name: "Mother Gothel",
      version: "Withered and Wicked",
      text: [
        {
          title: "WHAT HAVE YOU DONE?!",
          description: "This character enters play with 3 damage.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Tangled",
  set: "002",
  cardNumber: 116,
  rarity: "uncommon",
  cost: 2,
  strength: 3,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_0bac00816e484c9897881390d90a614f",
    tcgPlayer: 527253,
  },
  text: [
    {
      title: "WHAT HAVE YOU DONE?!",
      description: "This character enters play with 3 damage.",
    },
  ],
  classifications: ["Storyborn", "Villain"],
  missingTests: true,
  abilities: [
    {
      effect: {
        amount: 3,
        type: "enters-with-damage",
      },
      id: "6fh-1",
      name: "WHAT HAVE YOU DONE?!",
      text: "WHAT HAVE YOU DONE?! This character enters play with 3 damage.",
      type: "static",
    },
  ],
};
