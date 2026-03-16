import type { CharacterCard } from "@tcg/lorcana-types";

export const liloSnowArtist: CharacterCard = {
  id: "pzM",
  canonicalId: "ci_pzM",
  reprints: ["set11-002"],
  cardType: "character",
  name: "Lilo",
  version: "Snow Artist",
  i18n: {
    en: {
      name: "Lilo",
      version: "Snow Artist",
      text: [
        {
          title: "CREATIVE INSPIRATION",
          description:
            "While you have a character named Stitch in play, this character gets +1 {L}.",
        },
      ],
    },
    de: {
      name: "Lilo",
      version: "Schneekünstlerin",
      text: [
        {
          title: "KREATIVE INSPIRATION",
          description:
            "Solange du mindestens einen Stitch-Charakter im Spiel hast, erhält dieser Charakter +1.",
        },
      ],
    },
    fr: {
      name: "Lilo",
      version: "Artiste de la neige",
      text: [
        {
          title: "INSPIRATION CRÉATIVE",
          description: "Tant que vous avez un personnage Stitch en jeu, ce personnage-ci gagne +1.",
        },
      ],
    },
    it: {
      name: "Lilo",
      version: "Artista della Neve",
      text: [
        {
          title: "ISPIRAZIONE CREATIVA",
          description:
            "Mentre hai in gioco un personaggio chiamato Stitch, questo personaggio riceve +1.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Lilo and Stitch",
  set: "011",
  cardNumber: 2,
  rarity: "common",
  cost: 1,
  strength: 1,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_df49511658c9468b9a5353f1561cc9cc",
    tcgPlayer: 675377,
  },
  text: [
    {
      title: "CREATIVE INSPIRATION",
      description: "While you have a character named Stitch in play, this character gets +1 {L}.",
    },
  ],
  classifications: ["Storyborn", "Hero"],
  abilities: [
    {
      id: "12l-1",
      effect: {
        modifier: 1,
        stat: "lore",
        target: "SELF",
        type: "modify-stat",
      },
      type: "action",
      text: "CREATIVE INSPIRATION While you have a character named Stitch in play, this character gets +1 {L}.",
    },
  ],
};
