import type { CharacterCard } from "@tcg/lorcana-types";

export const merlinRabbit: CharacterCard = {
  id: "LZe",
  canonicalId: "ci_LZe",
  reprints: ["set2-052"],
  cardType: "character",
  name: "Merlin",
  version: "Rabbit",
  i18n: {
    en: {
      name: "Merlin",
      version: "Rabbit",
      text: [
        {
          title: "HOPPITY HIP!",
          description: "When you play this character and when he leaves play, you may draw a card.",
        },
      ],
    },
    de: {
      name: "Merlin",
      version: "Hase",
      text: [
        {
          title: "HOPPEDI HIPPEDI!",
          description:
            "Wenn du diesen Charakter ausspielst und wenn er das Spiel verlässt, darfst du 1 Karte ziehen.",
        },
      ],
    },
    fr: {
      name: "Merlin",
      version: "En lapin",
      text: [
        {
          title: "HOPPITY HIP!",
          description:
            "Lorsque vous jouez ce personnage et lorsqu'il quitte la zone de jeu, vous pouvez piocher une carte.",
        },
      ],
    },
    it: {
      name: "Merlino",
      version: "Coniglio",
      text: [
        {
          title: "HOPPITI HIP!",
          description:
            "Quando giochi questo personaggio e quando lascia il gioco, puoi pescare una carta.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Sword in the Stone",
  set: "002",
  cardNumber: 52,
  rarity: "rare",
  cost: 4,
  strength: 2,
  willpower: 3,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_6ebf8ca0c6b848e992e9927bf0d93d2b",
    tcgPlayer: 520939,
  },
  text: [
    {
      title: "HOPPITY HIP!",
      description: "When you play this character and when he leaves play, you may draw a card.",
    },
  ],
  classifications: ["Storyborn", "Mentor", "Sorcerer"],
  missingTests: true,
  abilities: [
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
      id: "11g-1",
      name: "HOPPITY HIP! When you play this character and",
      text: "HOPPITY HIP! When you play this character and when he leaves play, you may draw a card.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
