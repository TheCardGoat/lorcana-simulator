import type { CharacterCard } from "@tcg/lorcana-types";

export const clarabelleContentedWallflower: CharacterCard = {
  id: "gxZ",
  canonicalId: "ci_gxZ",
  reprints: ["set5-090"],
  cardType: "character",
  name: "Clarabelle",
  version: "Contented Wallflower",
  i18n: {
    en: {
      name: "Clarabelle",
      version: "Contented Wallflower",
      text: [
        {
          title: "ONE STEP BEHIND",
          description:
            "When you play this character, if an opponent has more cards in their hand than you, you may draw a card.",
        },
      ],
    },
    de: {
      name: "Klarabella",
      version: "Zufriedenes Mauerblümchen",
      text: [
        {
          title: "EINEN SCHRITT HINTERHER",
          description:
            "Wenn du diesen Charakter ausspielst und mindestens eine gegnerische Person mehr Karten auf der Hand hat als du, darfst du 1 Karte ziehen.",
        },
      ],
    },
    fr: {
      name: "Clarabelle",
      version: "Introvertie mais heureuse",
      text: [
        {
          title: "JUSTE DERRIÈRE TOI",
          description:
            "Lorsque vous jouez ce personnage, si un adversaire a plus de cartes en main que vous, vous pouvez piocher une carte.",
        },
      ],
    },
    it: {
      name: "Clarabella",
      version: "Timidona Soddisfatta",
      text: [
        {
          title: "UN PASSO INDIETRO",
          description:
            "Quando giochi questo personaggio, se un avversario ha in mano più carte di te, puoi pescare una carta.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  set: "005",
  cardNumber: 90,
  rarity: "uncommon",
  cost: 3,
  strength: 2,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_12fad68b6919451cb7165478fec5aee7",
    tcgPlayer: 559513,
  },
  text: [
    {
      title: "ONE STEP BEHIND",
      description:
        "When you play this character, if an opponent has more cards in their hand than you, you may draw a card.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      effect: {
        condition: {
          expression: "an opponent has more cards in their hand than you",
          type: "if",
        },
        then: {
          amount: 1,
          target: "CONTROLLER",
          type: "draw",
        },
        type: "conditional",
      },
      id: "1v9-1",
      name: "ONE STEP BEHIND",
      text: "ONE STEP BEHIND When you play this character, if an opponent has more cards in their hand than you, you may draw a card.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
