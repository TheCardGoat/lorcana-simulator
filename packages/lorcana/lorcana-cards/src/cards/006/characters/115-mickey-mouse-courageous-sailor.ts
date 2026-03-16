import type { CharacterCard } from "@tcg/lorcana-types";

export const mickeyMouseCourageousSailor: CharacterCard = {
  id: "N8b",
  canonicalId: "ci_N8b",
  reprints: ["set6-115"],
  cardType: "character",
  name: "Mickey Mouse",
  version: "Courageous Sailor",
  i18n: {
    en: {
      name: "Mickey Mouse",
      version: "Courageous Sailor",
      text: [
        {
          title: "SOLID GROUND",
          description: "While this character is at a location, he gets +2 {S}.",
        },
      ],
    },
    de: {
      name: "Micky Maus",
      version: "Mutiger Seemann",
      text: [
        {
          title: "FESTER BODEN",
          description: "Solange dieser Charakter an einem Ort ist, erhält er +2.",
        },
      ],
    },
    fr: {
      name: "Mickey Mouse",
      version: "Marin courageux",
      text: [
        {
          title: "TERRE FERME",
          description: "Tant que ce personnage est sur un lieu, il gagne +2.",
        },
      ],
    },
    it: {
      name: "Topolino",
      version: "Marinaio Coraggioso",
      text: [
        {
          title: "TERRAFERMA",
          description: "Mentre questo personaggio si trova in un luogo, riceve +2.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  set: "006",
  cardNumber: 115,
  rarity: "common",
  cost: 3,
  strength: 2,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_01d728f9a98643378187ab0151a89b06",
    tcgPlayer: 586979,
  },
  text: [
    {
      title: "SOLID GROUND",
      description: "While this character is at a location, he gets +2 {S}.",
    },
  ],
  classifications: ["Dreamborn", "Hero"],
  abilities: [
    {
      effect: {
        modifier: 2,
        stat: "strength",
        target: "SELF",
        type: "modify-stat",
      },
      id: "wqx-1",
      text: "SOLID GROUND While this character is at a location, he gets +2 {S}.",
      type: "static",
    },
  ],
};
