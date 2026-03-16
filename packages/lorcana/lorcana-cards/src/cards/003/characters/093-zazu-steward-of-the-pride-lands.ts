import type { CharacterCard } from "@tcg/lorcana-types";

export const zazuStewardOfThePrideLands: CharacterCard = {
  id: "13r",
  canonicalId: "ci_13r",
  reprints: ["set3-093"],
  cardType: "character",
  name: "Zazu",
  version: "Steward of the Pride Lands",
  i18n: {
    en: {
      name: "Zazu",
      version: "Steward of the Pride Lands",
      text: [
        {
          title: "IT'S TIME TO GO!",
          description: "While this character is at a location, he gets +1 {L}.",
        },
      ],
    },
    de: {
      name: "Zazu",
      version: "Verwaltet das Geweihte Land",
      text: [
        {
          title: "ES IST ZEIT ZU GEHEN!",
          description: "Solange dieser Charakter an einem Ort ist, erhält er +1.",
        },
      ],
    },
    fr: {
      name: "Zazu",
      version: "Intendant de la Terre des Lions",
      text: [
        {
          title: "IL EST TEMPS DE RENTRER!",
          description: "Tant que ce personnage se trouve sur un lieu, il gagne +1.",
        },
      ],
    },
    it: {
      name: "Zazu",
      version: "Attendente delle Terre del Branco",
      text: [
        {
          title: "È ORA DI ANDARE!",
          description: "Mentre questo personaggio si trova in un luogo, riceve +1.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Lion King",
  set: "003",
  cardNumber: 93,
  rarity: "common",
  cost: 1,
  strength: 2,
  willpower: 1,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_ad676278d4e74481af58729c5c986b7b",
    tcgPlayer: 539084,
  },
  text: [
    {
      title: "IT'S TIME TO GO!",
      description: "While this character is at a location, he gets +1 {L}.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  missingTests: true,
  abilities: [
    {
      effect: {
        modifier: 1,
        stat: "lore",
        target: "SELF",
        type: "modify-stat",
      },
      id: "18g-1",
      text: "IT'S TIME TO GO! While this character is at a location, he gets +1 {L}.",
      type: "static",
    },
  ],
};
