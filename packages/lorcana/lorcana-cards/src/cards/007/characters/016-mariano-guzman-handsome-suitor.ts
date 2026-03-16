import type { CharacterCard } from "@tcg/lorcana-types";

export const marianoGuzmanHandsomeSuitor: CharacterCard = {
  id: "QkD",
  canonicalId: "ci_QkD",
  reprints: ["set7-016"],
  cardType: "character",
  name: "Mariano Guzman",
  version: "Handsome Suitor",
  i18n: {
    en: {
      name: "Mariano Guzman",
      version: "Handsome Suitor",
      text: [
        {
          title: "I SEE YOU",
          description:
            "While you have a character named Dolores Madrigal in play, this character gets +1 {L}.",
        },
      ],
    },
    de: {
      name: "Mariano Guzmán",
      version: "Gutaussehender Verehrer",
      text: [
        {
          title: "ICH SEHE DICH",
          description:
            "Solange du mindestens einen Dolores-Madrigal-Charakter im Spiel hast, erhält dieser Charakter +1.",
        },
      ],
    },
    fr: {
      name: "Mariano Guzmán",
      version: "Prétendant séduisant",
      text: [
        {
          title: "JE TE VOIS",
          description:
            "Tant que vous avez un personnage Dolores Madrigal en jeu, ce personnage-ci gagne +1.",
        },
      ],
    },
    it: {
      name: "Mariano Guzman",
      version: "Bellissimo Pretendente",
      text: [
        {
          title: "IO TI VEDO",
          description:
            "Mentre hai in gioco un personaggio chiamato Dolores Madrigal, questo personaggio riceve +1.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Encanto",
  set: "007",
  cardNumber: 16,
  rarity: "common",
  cost: 3,
  strength: 3,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_e21853e17196454badd15ded13c064fc",
    tcgPlayer: 618688,
  },
  text: [
    {
      title: "I SEE YOU",
      description:
        "While you have a character named Dolores Madrigal in play, this character gets +1 {L}.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      effect: {
        modifier: 1,
        stat: "lore",
        target: "SELF",
        type: "modify-stat",
      },
      id: "15v-1",
      text: "I SEE YOU While you have a character named Dolores Madrigal in play, this character gets +1 {L}.",
      type: "action",
    },
  ],
};
