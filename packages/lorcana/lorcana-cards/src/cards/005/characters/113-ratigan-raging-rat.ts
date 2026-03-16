import type { CharacterCard } from "@tcg/lorcana-types";

export const ratiganRagingRat: CharacterCard = {
  id: "A6r",
  canonicalId: "ci_A6r",
  reprints: ["set5-113"],
  cardType: "character",
  name: "Ratigan",
  version: "Raging Rat",
  i18n: {
    en: {
      name: "Ratigan",
      version: "Raging Rat",
      text: [
        {
          title: "NOTHING CAN STAND IN MY WAY",
          description: "While this character has damage, he gets +2 {S}.",
        },
      ],
    },
    de: {
      name: "Rattenzahn",
      version: "Rasende Ratte",
      text: [
        {
          title: "NICHTS WIRD SICH MIR IN DEN WEG STELLEN",
          description: "Solange dieser Charakter beschädigt ist, erhält er +2.",
        },
      ],
    },
    fr: {
      name: "Ratigan",
      version: "Rat enragé",
      text: [
        {
          title: "RIEN NE ME RÉSISTERA",
          description: "Tant que ce personnage a au moins un dommage sur lui, il gagne +2.",
        },
      ],
    },
    it: {
      name: "Rattigan",
      version: "Ratto Rabbioso",
      text: [
        {
          title: "NESSUNO PUÒ METTERMI I BASTONI TRA LE RUOTE",
          description: "Mentre questo personaggio ha danno, riceve +2.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Great Mouse Detective",
  set: "005",
  cardNumber: 113,
  rarity: "common",
  cost: 3,
  strength: 1,
  willpower: 5,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_833361002e2a4571b9d12ba392560b16",
    tcgPlayer: 561636,
  },
  text: [
    {
      title: "NOTHING CAN STAND IN MY WAY",
      description: "While this character has damage, he gets +2 {S}.",
    },
  ],
  classifications: ["Dreamborn", "Villain"],
  abilities: [
    {
      effect: {
        modifier: 2,
        stat: "strength",
        target: "SELF",
        type: "modify-stat",
      },
      id: "1g7-1",
      text: "NOTHING CAN STAND IN MY WAY While this character has damage, he gets +2 {S}.",
      type: "static",
    },
  ],
};
