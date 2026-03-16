import type { CharacterCard } from "@tcg/lorcana-types";

export const naniNoWorries: CharacterCard = {
  id: "wNB",
  canonicalId: "ci_wNB",
  reprints: ["set11-184"],
  cardType: "character",
  name: "Nani",
  version: "No Worries",
  i18n: {
    en: {
      name: "Nani",
      version: "No Worries",
      text: [
        {
          title: "TAKE IT EASY",
          description: "While this character has no damage, she gets +1 {L}.",
        },
      ],
    },
    de: {
      name: "Nani",
      version: "Sorglos",
      text: [
        {
          title: "LOCKER BLEIBEN",
          description: "Solange dieser Charakter unbeschädigt ist, erhält er +1.",
        },
      ],
    },
    fr: {
      name: "Nani",
      version: "Sans tracas",
      text: [
        {
          title: "DÉTENDS-TOI",
          description: "Tant que ce personnage n'a aucun dommage sur lui, il gagne +1.",
        },
      ],
    },
    it: {
      name: "Nani",
      version: "Rilassata",
      text: [
        {
          title: "PRENDERSELA COMODA",
          description: "Mentre questo personaggio non ha danno, riceve +1.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Lilo and Stitch",
  set: "011",
  cardNumber: 184,
  rarity: "common",
  cost: 2,
  strength: 1,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_b10b1d80d4a94ec5b2ed59c1318bb046",
    tcgPlayer: 673760,
  },
  text: [
    {
      title: "TAKE IT EASY",
      description: "While this character has no damage, she gets +1 {L}.",
    },
  ],
  classifications: ["Storyborn", "Hero"],
  abilities: [
    {
      id: "1iz-1",
      effect: {
        modifier: 1,
        stat: "lore",
        target: "SELF",
        type: "modify-stat",
      },
      type: "static",
      text: "TAKE IT EASY While this character has no damage, she gets +1 {L}.",
    },
  ],
};
