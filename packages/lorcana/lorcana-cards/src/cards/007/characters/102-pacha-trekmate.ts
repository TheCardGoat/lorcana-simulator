import type { CharacterCard } from "@tcg/lorcana-types";

export const pachaTrekmate: CharacterCard = {
  id: "ooN",
  canonicalId: "ci_ooN",
  reprints: ["set7-102"],
  cardType: "character",
  name: "Pacha",
  version: "Trekmate",
  i18n: {
    en: {
      name: "Pacha",
      version: "Trekmate",
      text: [
        {
          title: "FULL PACK",
          description:
            "While you have more cards in your hand than each opponent, this character gets +2 {L}.",
        },
      ],
    },
    de: {
      name: "Patcha",
      version: "Wanderkumpan",
      text: [
        {
          title: "VOLLES GEPÄCK",
          description:
            "Solange du mehr Karten als jede gegnerische Person auf der Hand hast, erhält dieser Charakter +2.",
        },
      ],
    },
    fr: {
      name: "Pacha",
      version: "Compagnon de randonnée",
      text: [
        {
          title: "SAC PLEIN À CRAQUER",
          description:
            "Tant que vous avez plus de cartes en main que chacun de vos adversaires, ce personnage gagne +2.",
        },
      ],
    },
    it: {
      name: "Pacha",
      version: "Compagno di Cammino",
      text: [
        {
          title: "ZAINO PIENO",
          description:
            "Mentre hai in mano più carte di ogni avversario, questo personaggio riceve +2.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Emperors New Groove",
  set: "007",
  cardNumber: 102,
  rarity: "common",
  cost: 3,
  strength: 3,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_b2930c4282b145fe8eabadae2c6567f9",
    tcgPlayer: 619460,
  },
  text: [
    {
      title: "FULL PACK",
      description:
        "While you have more cards in your hand than each opponent, this character gets +2 {L}.",
    },
  ],
  classifications: ["Storyborn", "Hero"],
  abilities: [
    {
      effect: {
        modifier: 2,
        stat: "lore",
        target: "SELF",
        type: "modify-stat",
      },
      id: "19c-1",
      text: "FULL PACK While you have more cards in your hand than each opponent, this character gets +2 {L}.",
      type: "action",
    },
  ],
};
