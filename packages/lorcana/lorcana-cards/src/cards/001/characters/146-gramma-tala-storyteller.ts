import type { CharacterCard } from "@tcg/lorcana-types";

export const grammaTalaStoryteller: CharacterCard = {
  id: "ROE",
  canonicalId: "ci_ROE",
  reprints: ["set1-146"],
  cardType: "character",
  name: "Gramma Tala",
  version: "Storyteller",
  i18n: {
    en: {
      name: "Gramma Tala",
      version: "Storyteller",
      text: [
        {
          title: "I WILL BE WITH YOU",
          description:
            "When this character is banished, you may put this card into your inkwell facedown and exerted.",
        },
      ],
    },
    de: {
      name: "Gramma Tala",
      version: "Geschichtenerzählerin",
      text: [
        {
          title: "ICH WERDE DICH BEGLEITEN",
          description:
            "Wenn dieser Charakter verbannt wird, darfst du diese Karte verdeckt und erschöpft in deinen Tintenvorrat legen.",
        },
      ],
    },
    fr: {
      name: "GRAND-MÈRE TALA",
      version: "Conteuse",
      text: [
        {
          title: "TOUJOURS PRÈS DE TOI",
          description:
            "Lorsque ce personnage est banni, vous pouvez la placer dans votre réserve d'encre, face cachée et épuisée.",
        },
      ],
    },
    it: {
      name: "Gramma Tala",
      version: "Storyteller",
      text: [
        {
          title: "I WILL BE WITH YOU",
          description:
            "When this character is banished, you may put this card into your inkwell facedown and exerted.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Moana",
  set: "001",
  cardNumber: 146,
  rarity: "uncommon",
  cost: 2,
  strength: 1,
  willpower: 1,
  lore: 1,
  inkable: true,
  missingImplementation: true,
  externalIds: {
    lorcast: "crd_2556ec8a10224e6bb75f2bd54e7a612f",
    tcgPlayer: 508842,
  },
  text: [
    {
      title: "I WILL BE WITH YOU",
      description:
        "When this character is banished, you may put this card into your inkwell facedown and exerted.",
    },
  ],
  classifications: ["Storyborn", "Mentor"],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          exerted: true,
          facedown: true,
          source: "this-card",
          target: "CONTROLLER",
          type: "put-into-inkwell",
        },
        type: "optional",
      },
      id: "n00-1",
      text: "**I WILL BE WITH YOU** When this character is banished, you may put this card into your inkwell facedown and exerted.",
      type: "action",
    },
  ],
};
