import type { CharacterCard } from "@tcg/lorcana-types";

export const agnarrKingOfArendelle: CharacterCard = {
  id: "8bt",
  canonicalId: "ci_8bt",
  reprints: ["set11-114"],
  cardType: "character",
  name: "Agnarr",
  version: "King of Arendelle",
  i18n: {
    en: {
      name: "Agnarr",
      version: "King of Arendelle",
      text: [
        {
          title: "PROTECTIVE INSTINCT",
          description: "While you have a Queen character in play, this character gets +2 {S}.",
        },
      ],
    },
    de: {
      name: "Agnarr",
      version: "König von Arendelle",
      text: [
        {
          title: "BESCHÜTZERINSTINKT",
          description:
            "Solange du mindestens eine Königin im Spiel hast, erhält dieser Charakter +2.",
        },
      ],
    },
    fr: {
      name: "Agnarr",
      version: "Roi d'Arendelle",
      text: [
        {
          title: "INSTINCT PROTECTEUR",
          description: "Tant que vous avez un personnage Reine en jeu, ce personnage-ci gagne +2.",
        },
      ],
    },
    it: {
      name: "Agnarr",
      version: "Re di Arendelle",
      text: [
        {
          title: "ISTINTO PROTETTIVO",
          description: "Mentre hai in gioco un personaggio Regina, questo personaggio riceve +2.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Frozen",
  set: "011",
  cardNumber: 114,
  rarity: "common",
  cost: 3,
  strength: 3,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_9315eb79ba14485fa0ecc0b6dcabd054",
    tcgPlayer: 675500,
  },
  text: [
    {
      title: "PROTECTIVE INSTINCT",
      description: "While you have a Queen character in play, this character gets +2 {S}.",
    },
  ],
  classifications: ["Storyborn", "Mentor", "King"],
  abilities: [
    {
      id: "1bq-1",
      effect: {
        modifier: 2,
        stat: "strength",
        target: "SELF",
        type: "modify-stat",
      },
      type: "action",
      text: "PROTECTIVE INSTINCT While you have a Queen character in play, this character gets +2 {S}.",
    },
  ],
};
