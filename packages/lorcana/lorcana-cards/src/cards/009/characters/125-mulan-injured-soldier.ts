import type { CharacterCard } from "@tcg/lorcana-types";

export const mulanInjuredSoldier: CharacterCard = {
  id: "yMt",
  canonicalId: "ci_Z2S",
  reprints: ["set4-116", "set9-125"],
  cardType: "character",
  name: "Mulan",
  version: "Injured Soldier",
  i18n: {
    en: {
      name: "Mulan",
      version: "Injured Soldier",
      text: [
        {
          title: "BATTLE WOUND",
          description: "This character enters play with 2 damage.",
        },
      ],
    },
    de: {
      name: "Mulan",
      version: "Verwundete Soldatin",
      text: [
        {
          title: "KRIEGSWUNDE",
          description: "Dieser Charakter kommt mit 2 Schaden auf ihm ins Spiel.",
        },
      ],
    },
    fr: {
      name: "Mulan",
      version: "Soldate blessée",
      text: [
        {
          title: "BLESSURE AU COMBAT",
          description: "Ce personnage entre en jeu avec 2 jetons Dommage.",
        },
      ],
    },
    it: {
      name: "Mulan",
      version: "Guerriera Ferita",
      text: [
        {
          title: "FERITA DA COMBATTIMENTO",
          description: "Questo personaggio entra in gioco con 2 danni.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Mulan",
  set: "009",
  cardNumber: 125,
  rarity: "common",
  cost: 1,
  strength: 2,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_2acf4a3090844ac6a8e091f806c28aed",
    tcgPlayer: 650060,
  },
  text: [
    {
      title: "BATTLE WOUND",
      description: "This character enters play with 2 damage.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Princess"],
  abilities: [
    {
      effect: {
        amount: 2,
        type: "enters-with-damage",
      },
      id: "1g0-1",
      name: "BATTLE WOUND",
      text: "BATTLE WOUND This character enters play with 2 damage.",
      type: "static",
    },
  ],
};
