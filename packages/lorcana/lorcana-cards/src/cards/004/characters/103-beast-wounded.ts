import type { CharacterCard } from "@tcg/lorcana-types";

export const beastWounded: CharacterCard = {
  id: "f3O",
  canonicalId: "ci_f3O",
  reprints: ["set4-103"],
  cardType: "character",
  name: "Beast",
  version: "Wounded",
  i18n: {
    en: {
      name: "Beast",
      version: "Wounded",
      text: [
        {
          title: "THAT HURTS!",
          description: "This character enters play with 4 damage.",
        },
      ],
    },
    de: {
      name: "Biest",
      version: "Verwundet",
      text: [
        {
          title: "DAS TUT WEH!",
          description: "Dieser Charakter kommt mit 4 Schaden auf ihm ins Spiel.",
        },
      ],
    },
    fr: {
      name: "La Bête",
      version: "Blessée",
      text: [
        {
          title: "MAIS ÇA FAIT MAL!",
          description: "Ce personnage entre en jeu avec 4 jetons Dommage.",
        },
      ],
    },
    it: {
      name: "La Bestia",
      version: "Ferita",
      text: [
        {
          title: "FA MALE!",
          description: "Questo personaggio entra in gioco con 4 danni.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Beauty and the Beast",
  set: "004",
  cardNumber: 103,
  rarity: "uncommon",
  cost: 3,
  strength: 2,
  willpower: 6,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_c3acd1c879e645779501109c65580c93",
    tcgPlayer: 550588,
  },
  text: [
    {
      title: "THAT HURTS!",
      description: "This character enters play with 4 damage.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Prince"],
  abilities: [
    {
      effect: {
        from: "hand",
        type: "play-card",
      },
      id: "hmw-1",
      name: "THAT HURTS!",
      text: "THAT HURTS! This character enters play with 4 damage.",
      type: "static",
    },
  ],
};
