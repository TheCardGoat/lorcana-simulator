import type { CharacterCard } from "@tcg/lorcana-types";

export const shenziHyenaPackLeader: CharacterCard = {
  id: "BdK",
  canonicalId: "ci_VGS",
  reprints: ["set3-085", "set9-087"],
  cardType: "character",
  name: "Shenzi",
  version: "Hyena Pack Leader",
  i18n: {
    en: {
      name: "Shenzi",
      version: "Hyena Pack Leader",
      text: [
        {
          title: "I'LL HANDLE THIS",
          description: "While this character is at a location, she gets +3 {S}.",
        },
        {
          title: "WHAT'S THE HURRY?",
          description:
            "While this character is at a location, whenever she challenges another character, you may draw a card.",
        },
      ],
    },
    de: {
      name: "Shenzi",
      version: "Hyänen-Rudelführerin",
      text: [
        {
          title: "ICH MACH' DAS SCHON",
          description: "Solange dieser Charakter an einem Ort ist, erhält er +3.",
        },
        {
          title: "SO EILIG?",
          description:
            "Solange dieser Charakter an einem Ort ist, darfst du jedes Mal, wenn er einen anderen Charakter herausfordert, 1 Karte ziehen.",
        },
      ],
    },
    fr: {
      name: "Shenzi",
      version: "Cheffe de meute des hyènes",
      text: [
        {
          title: "LAISSE, J'M'EN OCCUPE",
          description: "Tant que ce personnage se trouve sur un lieu, il gagne +3.",
        },
        {
          title: "RIEN NE PRESSE",
          description:
            "Si ce personnage se trouve sur un lieu et défie un autre personnage, vous pouvez piocher une carte.",
        },
      ],
    },
    it: {
      name: "Shenzi",
      version: "Iena Capobranco",
      text: [
        {
          title: "ME NE OCCUPO IO",
          description: "Mentre questo personaggio si trova in un luogo, riceve +3.",
        },
        {
          title: "CHE FRETTA C'È?",
          description:
            "Mentre questo personaggio si trova in un luogo, ogni volta che sfida un altro personaggio, puoi pescare una carta.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Lion King",
  set: "003",
  cardNumber: 85,
  rarity: "common",
  cost: 4,
  strength: 0,
  willpower: 6,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_b082a2cb0d9f4c24a54a8ebb85f6b0a6",
    tcgPlayer: 650027,
  },
  text: [
    {
      title: "I'LL HANDLE THIS",
      description: "While this character is at a location, she gets +3 {S}.",
    },
    {
      title: "WHAT'S THE HURRY?",
      description:
        "While this character is at a location, whenever she challenges another character, you may draw a card.",
    },
  ],
  classifications: ["Storyborn", "Ally", "Hyena"],
  missingTests: true,
  abilities: [
    {
      effect: {
        modifier: 3,
        stat: "strength",
        target: "SELF",
        type: "modify-stat",
      },
      id: "qk2-1",
      text: "I'LL HANDLE THIS While this character is at a location, she gets +3 {S}.",
      type: "static",
    },
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          amount: 1,
          target: "CONTROLLER",
          type: "draw",
        },
        type: "optional",
      },
      id: "qk2-2",
      text: "WHAT'S THE HURRY? While this character is at a location, whenever she challenges another character, you may draw a card.",
      type: "static",
    },
  ],
};
