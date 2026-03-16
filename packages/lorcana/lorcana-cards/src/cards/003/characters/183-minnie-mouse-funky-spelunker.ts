import type { CharacterCard } from "@tcg/lorcana-types";

export const minnieMouseFunkySpelunker: CharacterCard = {
  id: "xPZ",
  canonicalId: "ci_xPZ",
  reprints: ["set3-183"],
  cardType: "character",
  name: "Minnie Mouse",
  version: "Funky Spelunker",
  i18n: {
    en: {
      name: "Minnie Mouse",
      version: "Funky Spelunker",
      text: [
        {
          title: "JOURNEY",
          description: "While this character is at a location, she gets +2 {S}.",
        },
      ],
    },
    de: {
      name: "Minnie Maus",
      version: "Flippige Höhlenforscherin",
      text: [
        {
          title: "REISE",
          description: "Solange dieser Charakter an einem Ort ist, erhält er +2.",
        },
      ],
    },
    fr: {
      name: "Minnie",
      version: "Spéléologue funky",
      text: [
        {
          title: "VOYAGE",
          description: "Tant que ce personnage se trouve sur un lieu, il gagne +2.",
        },
      ],
    },
    it: {
      name: "Minni",
      version: "Speleologa Eccentrica",
      text: [
        {
          title: "VIAGGIO",
          description: "Mentre questo personaggio si trova in un luogo, riceve +2.",
        },
      ],
    },
  },
  inkType: ["steel"],
  set: "003",
  cardNumber: 183,
  rarity: "common",
  cost: 1,
  strength: 0,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_e5e54863fdb8474db4d0515a2a562ced",
    tcgPlayer: 531824,
  },
  text: [
    {
      title: "JOURNEY",
      description: "While this character is at a location, she gets +2 {S}.",
    },
  ],
  classifications: ["Dreamborn", "Hero"],
  missingTests: true,
  abilities: [
    {
      effect: {
        modifier: 2,
        stat: "strength",
        target: "SELF",
        type: "modify-stat",
      },
      id: "11y-1",
      text: "JOURNEY While this character is at a location, she gets +2 {S}.",
      type: "static",
    },
  ],
};
