import type { CharacterCard } from "@tcg/lorcana-types";

export const buckyNuttyRascal: CharacterCard = {
  id: "SiS",
  canonicalId: "ci_SiS",
  reprints: ["set7-060"],
  cardType: "character",
  name: "Bucky",
  version: "Nutty Rascal",
  i18n: {
    en: {
      name: "Bucky",
      version: "Nutty Rascal",
      text: [
        {
          title: "POP!",
          description: "When this character is banished in a challenge, you may draw a card.",
        },
      ],
    },
    de: {
      name: "Bucky",
      version: "Nussiger Schlingel",
      text: [
        {
          title: "POP!",
          description:
            "Wenn dieser Charakter durch eine Herausforderung verbannt wird, darfst du 1 Karte ziehen.",
        },
      ],
    },
    fr: {
      name: "Bucky",
      version: "Chenapan à la noix",
      text: [
        {
          title: "BANG!",
          description:
            "Lorsque ce personnage est banni via un défi, vous pouvez piocher une carte.",
        },
      ],
    },
    it: {
      name: "Bucky",
      version: "Bricconcello Svitato",
      text: [
        {
          title: "POP!",
          description:
            "Quando questo personaggio viene esiliato in una sfida, puoi pescare una carta.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Emperors New Groove",
  set: "007",
  cardNumber: 60,
  rarity: "common",
  cost: 3,
  strength: 3,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_e8ae850c18614645b9458dbca01b1f14",
    tcgPlayer: 619438,
  },
  text: [
    {
      title: "POP!",
      description: "When this character is banished in a challenge, you may draw a card.",
    },
  ],
  classifications: ["Dreamborn", "Ally"],
  abilities: [
    {
      id: "17v-1",
      effect: {
        chooser: "CONTROLLER",
        effect: {
          amount: 1,
          target: "CONTROLLER",
          type: "draw",
        },
        type: "optional",
      },
      name: "POP!",
      trigger: {
        event: "banish",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
      text: "POP! When this character is banished in a challenge, you may draw a card.",
    },
  ],
};
