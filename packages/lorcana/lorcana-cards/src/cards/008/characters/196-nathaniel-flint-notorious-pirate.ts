import type { CharacterCard } from "@tcg/lorcana-types";

export const nathanielFlintNotoriousPirate: CharacterCard = {
  id: "mAf",
  canonicalId: "ci_mAf",
  reprints: ["set8-196"],
  cardType: "character",
  name: "Nathaniel Flint",
  version: "Notorious Pirate",
  i18n: {
    en: {
      name: "Nathaniel Flint",
      version: "Notorious Pirate",
      text: [
        {
          title: "PREDATORY INSTINCT",
          description:
            "You can't play this character unless an opposing character was damaged this turn.",
        },
      ],
    },
    de: {
      name: "Käpt'n Flint",
      version: "Berüchtigter Pirat",
      text: [
        {
          title: "RAUBTIERINSTINKT",
          description:
            "Du kannst diesen Charakter nicht ausspielen, außer in diesem Zug wurde ein gegnerischer Charakter beschädigt.",
        },
      ],
    },
    fr: {
      name: "Nathaniel Flint",
      version: "Illustre pirate",
      text: [
        {
          title: "INSTINCT DE PRÉDATEUR",
          description:
            "Vous ne pouvez pas jouer ce personnage sauf si un personnage adverse a subi un dommage ou plus ce tour-ci.",
        },
      ],
    },
    it: {
      name: "Nathaniel Flint",
      version: "Famigerato Pirata",
      text: [
        {
          title: "ISTINTO PREDATORIO",
          description:
            "Non puoi giocare questo personaggio a meno che un personaggio avversario non sia stato danneggiato in questo turno.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Treasure Planet",
  set: "008",
  cardNumber: 196,
  rarity: "rare",
  cost: 2,
  strength: 3,
  willpower: 3,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_06dcb232c2b84e47923c74acc1f755aa",
    tcgPlayer: 631836,
  },
  text: [
    {
      title: "PREDATORY INSTINCT",
      description:
        "You can't play this character unless an opposing character was damaged this turn.",
    },
  ],
  classifications: ["Storyborn", "Villain", "Alien", "Pirate", "Captain"],
  abilities: [
    {
      effect: {
        from: "hand",
        type: "play-card",
      },
      id: "1ub-1",
      text: "PREDATORY INSTINCT You can't play this character unless an opposing character was damaged this turn.",
      type: "static",
    },
  ],
};
