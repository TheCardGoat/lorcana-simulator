import type { CharacterCard } from "@tcg/lorcana-types";

export const gigiBestInSnow: CharacterCard = {
  id: "keA",
  canonicalId: "ci_keA",
  reprints: ["set11-189"],
  cardType: "character",
  name: "Gigi",
  version: "Best in Snow",
  i18n: {
    en: {
      name: "Gigi",
      version: "Best in Snow",
      text: [
        {
          title: "Alert",
          description: "(This character can challenge as if they had Evasive.)",
        },
        {
          title: "SO PRETTY",
          description: "While this character has no damage, she gets +2 {S}.",
        },
      ],
    },
    de: {
      name: "Gigi",
      version: "Die Beste im Schnee",
      text: [
        {
          title: "Alarmiert",
          description:
            "(Dieser Charakter kann herausfordern, als hätte er Wendig.) SO HÜBSCH Solange dieser Charakter unbeschädigt ist, erhält er +2.",
        },
      ],
    },
    fr: {
      name: "Gigi",
      version: "Premier prix de la neige",
      text: "Agilité (Ce personnage peut défier comme s'il était Insaisissable.) SI MIGNONNE Tant que ce personnage n'a aucun dommage sur lui, il gagne +2.",
    },
    it: {
      name: "Gigi",
      version: "La Migliore sulla Neve",
      text: [
        {
          title: "Vigile",
          description:
            "(Questo personaggio può sfidare come se avesse Sfuggente.) COSÌ CARINA Mentre questo personaggio non ha danno, riceve +2.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Lilo and Stitch",
  set: "011",
  cardNumber: 189,
  rarity: "uncommon",
  cost: 3,
  strength: 2,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_a1e3f0b6249140fcbab13e33ef76fba8",
    tcgPlayer: 676243,
  },
  text: [
    {
      title: "Alert",
      description: "(This character can challenge as if they had Evasive.)",
    },
    {
      title: "SO PRETTY",
      description: "While this character has no damage, she gets +2 {S}.",
    },
  ],
  classifications: ["Storyborn", "Alien"],
  abilities: [
    {
      id: "5r3-1",
      keyword: "Alert",
      type: "keyword",
      text: "Alert",
    },
    {
      id: "5r3-2",
      effect: {
        modifier: 2,
        stat: "strength",
        target: "SELF",
        type: "modify-stat",
      },
      type: "static",
      text: "SO PRETTY While this character has no damage, she gets +2 {S}.",
    },
  ],
};
