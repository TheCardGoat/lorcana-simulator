import type { CharacterCard } from "@tcg/lorcana-types";

export const yzmaTransformedKitten: CharacterCard = {
  id: "uOG",
  canonicalId: "ci_uOG",
  reprints: ["set7-059"],
  cardType: "character",
  name: "Yzma",
  version: "Transformed Kitten",
  i18n: {
    en: {
      name: "Yzma",
      version: "Transformed Kitten",
      text: [
        {
          title: "I WIN",
          description:
            "When this character is banished, if you have more cards in your hand than each opponent, you may return this card to your hand.",
        },
      ],
    },
    de: {
      name: "Isma",
      version: "Verwandeltes Kätzchen",
      text: [
        {
          title: "GEWONNEN",
          description:
            "Wenn dieser Charakter verbannt wird und du mehr Karten als jede gegnerische Person auf der Hand hast, darfst du diese Karte zurück auf deine Hand nehmen.",
        },
      ],
    },
    fr: {
      name: "Yzma",
      version: "Changée en chaton",
      text: [
        {
          title: "J'AI GAGNÉ",
          description:
            "Lorsque ce personnage est banni, si vous avez plus de cartes en main que chaque adversaire, vous pouvez renvoyer cette carte dans votre main.",
        },
      ],
    },
    it: {
      name: "Yzma",
      version: "Trasformata in Gattina",
      text: [
        {
          title: "HO VINTO",
          description:
            "Quando questo personaggio viene esiliato, se hai in mano più carte di ogni avversario, puoi riprendere in mano questa carta.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Emperors New Groove",
  set: "007",
  cardNumber: 59,
  rarity: "common",
  cost: 2,
  strength: 2,
  willpower: 1,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_5a028a55c4554cfd94686805d26929b1",
    tcgPlayer: 619437,
  },
  text: [
    {
      title: "I WIN",
      description:
        "When this character is banished, if you have more cards in your hand than each opponent, you may return this card to your hand.",
    },
  ],
  classifications: ["Storyborn", "Villain", "Sorcerer"],
  abilities: [
    {
      effect: {
        condition: {
          expression: "you have more cards in your hand than each opponent",
          type: "if",
        },
        then: {
          target: "SELF",
          type: "return-to-hand",
        },
        type: "conditional",
      },
      id: "192-1",
      name: "I WIN",
      text: "I WIN When this character is banished, if you have more cards in your hand than each opponent, you may return this card to your hand.",
      trigger: {
        event: "banish",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
