import type { CharacterCard } from "@tcg/lorcana-types";

export const faZhouHonorableWarrior: CharacterCard = {
  id: "nta",
  canonicalId: "ci_nta",
  reprints: ["set11-110"],
  cardType: "character",
  name: "Fa Zhou",
  version: "Honorable Warrior",
  i18n: {
    en: {
      name: "Fa Zhou",
      version: "Honorable Warrior",
      text: [
        {
          title: "BATTLE WOUND",
          description: "This character enters play with 2 damage.",
        },
      ],
    },
    de: {
      name: "Fa Zhou",
      version: "Ehrenwerter Krieger",
      text: [
        {
          title: "KRIEGSWUNDE",
          description: "Dieser Charakter kommt mit 2 Schaden auf ihm ins Spiel.",
        },
      ],
    },
    fr: {
      name: "Fa Zhou",
      version: "Guerrier honorable",
      text: [
        {
          title: "BLESSURE AU COMBAT",
          description: "Ce personnage entre en jeu avec 2 dommages.",
        },
      ],
    },
    it: {
      name: "Fa Zhou",
      version: "Guerriero Onorevole",
      text: [
        {
          title: "FERITA DI GUERRA",
          description: "Questo personaggio entra in gioco con 2 danni.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Mulan",
  set: "011",
  cardNumber: 110,
  rarity: "common",
  cost: 2,
  strength: 1,
  willpower: 4,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_e10790e2f76f46f4aeb38d35164934b1",
    tcgPlayer: 676211,
  },
  text: [
    {
      title: "BATTLE WOUND",
      description: "This character enters play with 2 damage.",
    },
  ],
  classifications: ["Storyborn", "Mentor"],
  abilities: [
    {
      id: "12j-1",
      effect: {
        from: "hand",
        type: "play-card",
      },
      type: "static",
      name: "BATTLE WOUND",
      text: "BATTLE WOUND This character enters play with 2 damage.",
    },
  ],
};
