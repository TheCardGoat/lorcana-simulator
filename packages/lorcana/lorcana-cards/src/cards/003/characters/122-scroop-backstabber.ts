import type { CharacterCard } from "@tcg/lorcana-types";

export const scroopBackstabber: CharacterCard = {
  id: "2ti",
  canonicalId: "ci_2ti",
  reprints: ["set3-122"],
  cardType: "character",
  name: "Scroop",
  version: "Backstabber",
  i18n: {
    en: {
      name: "Scroop",
      version: "Backstabber",
      text: [
        {
          title: "BRUTE",
          description: "While this character has damage, he gets +3 {S}.",
        },
      ],
    },
    de: {
      name: "Scroop",
      version: "Hinterlistig",
      text: [
        {
          title: "BRACHIAL",
          description: "Solange dieser Charakter beschädigt ist, erhält er +3.",
        },
      ],
    },
    fr: {
      name: "Scroop",
      version: "Traître",
      text: [
        {
          title: "BRUTE",
          description: "Tant que ce personnage a des jetons Dommage sur lui, il gagne +3.",
        },
      ],
    },
    it: {
      name: "Scroop",
      version: "Traditore",
      text: [
        {
          title: "BRUTO",
          description: "Mentre questo personaggio ha danno, riceve +3.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Treasure Planet",
  set: "003",
  cardNumber: 122,
  rarity: "uncommon",
  cost: 5,
  strength: 2,
  willpower: 5,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_d785c3ffe80440a5a9ef39641add4d23",
    tcgPlayer: 537610,
  },
  text: [
    {
      title: "BRUTE",
      description: "While this character has damage, he gets +3 {S}.",
    },
  ],
  classifications: ["Storyborn", "Villain", "Alien", "Pirate"],
  missingTests: true,
  abilities: [
    {
      effect: {
        modifier: 3,
        stat: "strength",
        target: "SELF",
        type: "modify-stat",
      },
      id: "58w-1",
      text: "BRUTE While this character has damage, he gets +3 {S}.",
      type: "static",
    },
  ],
};
