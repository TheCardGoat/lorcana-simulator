import type { CharacterCard } from "@tcg/lorcana-types";

export const kenaiBigBrother: CharacterCard = {
  id: "6WD",
  canonicalId: "ci_6WD",
  reprints: ["set5-005"],
  cardType: "character",
  name: "Kenai",
  version: "Big Brother",
  i18n: {
    en: {
      name: "Kenai",
      version: "Big Brother",
      text: [
        {
          title: "BROTHERS FOREVER",
          description:
            "While this character is exerted, your characters named Koda can't be challenged.",
        },
      ],
    },
    de: {
      name: "Kenai",
      version: "Großer Bruder",
      text: [
        {
          title: "BRÜDER AUF EWIG",
          description:
            "Solange dieser Charakter erschöpft ist, können deine Koda-Charaktere nicht herausgefordert werden.",
        },
      ],
    },
    fr: {
      name: "Kenaï",
      version: "Grand frère",
      text: [
        {
          title: "FRÈRES POUR TOUJOURS",
          description:
            "Tant que ce personnage est épuisé, vos personnages Koda ne peuvent pas être défiés.",
        },
      ],
    },
    it: {
      name: "Kenai",
      version: "Fratello Grande",
      text: [
        {
          title: "FRATELLI PER SEMPRE",
          description:
            "Mentre questo personaggio è impegnato, i tuoi personaggi chiamati Koda non possono essere sfidati.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Brother Bear",
  set: "005",
  cardNumber: 5,
  rarity: "common",
  cost: 2,
  strength: 1,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_85a886f78a71416aa253879cbe81d8dd",
    tcgPlayer: 560502,
  },
  text: [
    {
      title: "BROTHERS FOREVER",
      description:
        "While this character is exerted, your characters named Koda can't be challenged.",
    },
  ],
  classifications: ["Storyborn", "Hero"],
  abilities: [
    {
      effect: {
        restriction: "cant-be-challenged",
        target: "SELF",
        type: "restriction",
      },
      id: "a82-1",
      text: "BROTHERS FOREVER While this character is exerted, your characters named Koda can't be challenged.",
      type: "static",
    },
  ],
};
