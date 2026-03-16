import type { CharacterCard } from "@tcg/lorcana-types";

export const miloThatchSpiritedScholar: CharacterCard = {
  id: "tGe",
  canonicalId: "ci_tGe",
  reprints: ["set3-115"],
  cardType: "character",
  name: "Milo Thatch",
  version: "Spirited Scholar",
  i18n: {
    en: {
      name: "Milo Thatch",
      version: "Spirited Scholar",
      text: [
        {
          title: "I'M YOUR MAN!",
          description: "While this character is at a location, he gets +2 {S}.",
        },
      ],
    },
    de: {
      name: "Milo Thatch",
      version: "Begabter Gelehrter",
      text: [
        {
          title: "ICH BIN DABEI!",
          description: "Solange dieser Charakter an einem Ort ist, erhält er +2.",
        },
      ],
    },
    fr: {
      name: "Milo Thatch",
      version: "Savant intrépide",
      text: [
        {
          title: "JE SUIS VOTRE HOMME",
          description: "Tant que ce personnage se trouve sur un lieu, il gagne +2.",
        },
      ],
    },
    it: {
      name: "Milo Thatch",
      version: "Studioso Vivace",
      text: [
        {
          title: "SONO L'UOMO GIUSTO!",
          description: "Mentre questo personaggio si trova in un luogo, riceve +2.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Atlantis",
  set: "003",
  cardNumber: 115,
  rarity: "common",
  cost: 2,
  strength: 2,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_c219f80dc2d34bea9b7a9bfdb4e04528",
    tcgPlayer: 536282,
  },
  text: [
    {
      title: "I'M YOUR MAN!",
      description: "While this character is at a location, he gets +2 {S}.",
    },
  ],
  classifications: ["Storyborn", "Hero"],
  missingTests: true,
  abilities: [
    {
      effect: {
        modifier: 2,
        stat: "strength",
        target: "SELF",
        type: "modify-stat",
      },
      id: "1cr-1",
      text: "I'M YOUR MAN! While this character is at a location, he gets +2 {S}.",
      type: "static",
    },
  ],
};
