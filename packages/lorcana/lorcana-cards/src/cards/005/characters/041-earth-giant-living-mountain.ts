import type { CharacterCard } from "@tcg/lorcana-types";

export const earthGiantLivingMountain: CharacterCard = {
  id: "hC5",
  canonicalId: "ci_hC5",
  reprints: ["set5-041"],
  cardType: "character",
  name: "Earth Giant",
  version: "Living Mountain",
  i18n: {
    en: {
      name: "Earth Giant",
      version: "Living Mountain",
      text: [
        {
          title: "UNEARTHED",
          description: "When you play this character, each opponent draws a card.",
        },
      ],
    },
    de: {
      name: "Erdriese",
      version: "Lebendiger Berg",
      text: [
        {
          title: "AUSGEGRABEN",
          description:
            "Wenn du diesen Charakter ausspielst, ziehen alle gegnerischen Mitspielenden je 1 Karte.",
        },
      ],
    },
    fr: {
      name: "Géant de la Terre",
      version: "Montagne vivante",
      text: [
        {
          title: "DÉTERRÉ",
          description: "Lorsque vous jouez ce personnage, chaque adversaire pioche une carte.",
        },
      ],
    },
    it: {
      name: "Gigante di Terra",
      version: "Montagna Vivente",
      text: [
        {
          title: "DISSOTTERRATO",
          description: "Quando giochi questo personaggio, ogni avversario pesca una carta.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Frozen",
  set: "005",
  cardNumber: 41,
  rarity: "common",
  cost: 4,
  strength: 4,
  willpower: 5,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_314343a109e74d31bb84143aeb72d25f",
    tcgPlayer: 561487,
  },
  text: [
    {
      title: "UNEARTHED",
      description: "When you play this character, each opponent draws a card.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      id: "1xh-1",
      effect: {
        amount: 1,
        target: "EACH_OPPONENT",
        type: "draw",
      },
      name: "UNEARTHED",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
      text: "UNEARTHED When you play this character, each opponent draws a card.",
    },
  ],
};
