import type { CharacterCard } from "@tcg/lorcana-types";

export const daleFriendInNeed: CharacterCard = {
  id: "y2t",
  canonicalId: "ci_y2t",
  reprints: ["set6-007"],
  cardType: "character",
  name: "Dale",
  version: "Friend in Need",
  i18n: {
    en: {
      name: "Dale",
      version: "Friend in Need",
      text: [
        {
          title: "CHIP'S PARTNER",
          description:
            "This character enters play exerted unless you have a character named Chip in play.",
        },
      ],
    },
    de: {
      name: "Chap",
      version: "Freund in der Not",
      text: [
        {
          title: "CHIPS PARTNER",
          description:
            "Dieser Charakter kommt erschöpft ins Spiel, außer du hast mindestens einen Chip-Charakter im Spiel.",
        },
      ],
    },
    fr: {
      name: "Tac",
      version: "Ami dans le besoin",
      text: [
        {
          title: "PARTENAIRE DE TIC",
          description:
            "Ce personnage entre en jeu épuisé à moins que vous n'ayez un personnage Tic en jeu.",
        },
      ],
    },
    it: {
      name: "Ciop",
      version: "Amico Bisognoso",
      text: [
        {
          title: "PARTNER DI CIP",
          description:
            "Questo personaggio entra in gioco impegnato a meno che tu non abbia in gioco un personaggio chiamato Cip.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Rescue Rangers",
  set: "006",
  cardNumber: 7,
  rarity: "common",
  cost: 3,
  strength: 3,
  willpower: 4,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_166f05d54db54c06813b6dbb7693255d",
    tcgPlayer: 578168,
  },
  text: [
    {
      title: "CHIP'S PARTNER",
      description:
        "This character enters play exerted unless you have a character named Chip in play.",
    },
  ],
  classifications: ["Storyborn", "Hero"],
  abilities: [
    {
      effect: {
        restriction: "enters-play-exerted",
        target: "SELF",
        type: "restriction",
      },
      id: "1pa-1",
      name: "CHIP'S PARTNER",
      text: "CHIP'S PARTNER This character enters play exerted unless you have a character named Chip in play.",
      type: "static",
    },
  ],
};
