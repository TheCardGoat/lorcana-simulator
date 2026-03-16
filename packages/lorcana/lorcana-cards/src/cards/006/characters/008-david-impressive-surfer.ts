import type { CharacterCard } from "@tcg/lorcana-types";

export const davidImpressiveSurfer: CharacterCard = {
  id: "Xi4",
  canonicalId: "ci_Xi4",
  reprints: ["set6-008"],
  cardType: "character",
  name: "David",
  version: "Impressive Surfer",
  i18n: {
    en: {
      name: "David",
      version: "Impressive Surfer",
      text: [
        {
          title: "SHOWING OFF",
          description: "While you have a character named Nani in play, this character gets +2 {L}.",
        },
      ],
    },
    de: {
      name: "David",
      version: "Eindrucksvoller Surfer",
      text: [
        {
          title: "PROTZEREI",
          description:
            "Solange du mindestens einen Nani-Charakter im Spiel hast, erhält dieser Charakter +2.",
        },
      ],
    },
    fr: {
      name: "David",
      version: "Surfeur impressionnant",
      text: [
        {
          title: "FRIMEUR",
          description: "Tant que vous avez un personnage Nani en jeu, ce personnage gagne +2.",
        },
      ],
    },
    it: {
      name: "David",
      version: "Surfista Impressionante",
      text: [
        {
          title: "METTERSI IN MOSTRA",
          description:
            "Mentre hai in gioco un personaggio chiamato Nani, questo personaggio riceve +2.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Lilo and Stitch",
  set: "006",
  cardNumber: 8,
  rarity: "uncommon",
  cost: 3,
  strength: 3,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_4e3967f948654fc9a2d9595743e1709f",
    tcgPlayer: 592006,
  },
  text: [
    {
      title: "SHOWING OFF",
      description: "While you have a character named Nani in play, this character gets +2 {L}.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      effect: {
        modifier: 2,
        stat: "lore",
        target: "SELF",
        type: "modify-stat",
      },
      id: "mrs-1",
      text: "SHOWING OFF While you have a character named Nani in play, this character gets +2 {L}.",
      type: "action",
    },
  ],
};
