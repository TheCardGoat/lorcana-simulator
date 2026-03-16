import type { CharacterCard } from "@tcg/lorcana-types";

export const camiloMadrigalCenterStage: CharacterCard = {
  id: "lBR",
  canonicalId: "ci_lBR",
  reprints: ["set8-075"],
  cardType: "character",
  name: "Camilo Madrigal",
  version: "Center Stage",
  i18n: {
    en: {
      name: "Camilo Madrigal",
      version: "Center Stage",
      text: [
        {
          title: "ENCORE!",
        },
        {
          title: "ENCORE!",
          description:
            "When this character is banished in a challenge, return this card to your hand.",
        },
      ],
    },
    de: {
      name: "Camilo Madrigal",
      version: "Bühnen-Mittelpunkt",
      text: [
        {
          title: "ZUGABE!",
        },
        {
          title: "ZUGABE!",
          description:
            "Wenn dieser Charakter durch eine Herausforderung verbannt wird, nimm ihn zurück auf deine Hand.",
        },
      ],
    },
    fr: {
      name: "Camilo Madrigal",
      version: "Sur le devant de la scène",
      text: [
        {
          title: "BIS!",
        },
        {
          title: "BIS!",
          description: "Lorsque ce personnage est banni via un défi, renvoyez-le dans votre main.",
        },
      ],
    },
    it: {
      name: "Camilo Madrigal",
      version: "Al Centro dell'Attenzione",
      text: [
        {
          title: "BIS!",
        },
        {
          title: "BIS!",
          description:
            "Quando questo personaggio viene esiliato in una sfida, riprendi in mano questa carta.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Encanto",
  set: "008",
  cardNumber: 75,
  rarity: "common",
  cost: 5,
  strength: 4,
  willpower: 4,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_0d9e3acb5cc6406c9d6965fa60d58ff6",
    tcgPlayer: 631345,
  },
  text: [
    {
      title: "ENCORE!",
    },
    {
      title: "ENCORE!",
      description: "When this character is banished in a challenge, return this card to your hand.",
    },
  ],
  classifications: ["Storyborn", "Ally", "Madrigal"],
  abilities: [
    {
      effect: {
        target: "SELF",
        type: "return-to-hand",
      },
      id: "p4d-1",
      name: "ENCORE! ENCORE!",
      text: "ENCORE! ENCORE! When this character is banished in a challenge, return this card to your hand.",
      trigger: {
        event: "banish",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
