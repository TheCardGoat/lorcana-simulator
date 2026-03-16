import type { CharacterCard } from "@tcg/lorcana-types";

export const figaroTuxedoCat: CharacterCard = {
  id: "Nrd",
  canonicalId: "ci_Nrd",
  reprints: ["set8-133"],
  cardType: "character",
  name: "Figaro",
  version: "Tuxedo Cat",
  i18n: {
    en: {
      name: "Figaro",
      version: "Tuxedo Cat",
      text: [
        {
          title: "PLAYFULNESS",
          description: "Opposing items enter play exerted.",
        },
      ],
    },
    de: {
      name: "Figaro",
      version: "Tuxedo-Katze",
      text: [
        {
          title: "VERSPIELTHEIT",
          description: "Gegnerische Gegenstände kommen erschöpft ins Spiel.",
        },
      ],
    },
    fr: {
      name: "Figaro",
      version: "Chat tuxedo",
      text: [
        {
          title: "ESPIÈGLERIE",
          description: "Les objets adverses entrent en jeu épuisés.",
        },
      ],
    },
    it: {
      name: "Figaro",
      version: "Gatto Bicolore",
      text: [
        {
          title: "GIOCOSO",
          description: "Gli oggetti avversari entrano in gioco impegnati.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Pinocchio",
  set: "008",
  cardNumber: 133,
  rarity: "uncommon",
  cost: 3,
  strength: 3,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_9da6ba4d41244f61b558bc6a63a93ec3",
    tcgPlayer: 632714,
  },
  text: [
    {
      title: "PLAYFULNESS",
      description: "Opposing items enter play exerted.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      effect: {
        restriction: "enters-play-exerted",
        target: "SELF",
        type: "restriction",
      },
      id: "1w3-1",
      text: "PLAYFULNESS Opposing items enter play exerted.",
      type: "static",
    },
  ],
};
