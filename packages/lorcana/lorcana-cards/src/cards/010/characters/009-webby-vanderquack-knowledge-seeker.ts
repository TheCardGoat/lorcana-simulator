import type { CharacterCard } from "@tcg/lorcana-types";

export const webbyVanderquackKnowledgeSeeker: CharacterCard = {
  id: "uBf",
  canonicalId: "ci_uBf",
  reprints: ["set10-009"],
  cardType: "character",
  name: "Webby Vanderquack",
  version: "Knowledge Seeker",
  i18n: {
    en: {
      name: "Webby Vanderquack",
      version: "Knowledge Seeker",
      text: [
        {
          title: "I'VE READ ABOUT THIS",
          description:
            "While you have a character or location in play with a card under them, this character gets +1 {L}.",
        },
      ],
    },
    de: {
      name: "Nicky Vanderquack",
      version: "Wissenssucherin",
      text: [
        {
          title: "ICH HABE DAVON GELESEN",
          description:
            "Solange du einen Charakter oder Ort im Spiel hast, der eine Karte unter sich hat, erhält dieser Charakter +1.",
        },
      ],
    },
    fr: {
      name: "Zaza",
      version: "À la recherche de connaissance",
      text: [
        {
          title: "J'AI LU QUELQUE CHOSE LÀ-DESSUS",
          description:
            "Tant que vous avez un personnage ou un lieu en jeu avec une carte sous lui, ce personnage-ci gagne +1.",
        },
      ],
    },
    it: {
      name: "Gaia Vanderquack",
      version: "Cercatrice di Conoscenza",
      text: [
        {
          title: "HO LETTO QUALCOSA IN MERITO",
          description:
            "Mentre hai in gioco un personaggio o un luogo con una carta sotto di sé, questo personaggio riceve +1.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Ducktales",
  set: "010",
  cardNumber: 9,
  rarity: "uncommon",
  cost: 3,
  strength: 1,
  willpower: 6,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_5608e887343c4adbadaacf7ba7379ff0",
    tcgPlayer: 659445,
  },
  text: [
    {
      title: "I'VE READ ABOUT THIS",
      description:
        "While you have a character or location in play with a card under them, this character gets +1 {L}.",
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
      id: "15d-1",
      text: "I'VE READ ABOUT THIS While you have a character or location in play with a card under them, this character gets +1 {L}.",
      type: "action",
    },
  ],
};
