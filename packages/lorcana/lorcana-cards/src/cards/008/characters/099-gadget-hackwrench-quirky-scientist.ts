import type { CharacterCard } from "@tcg/lorcana-types";

export const gadgetHackwrenchQuirkyScientist: CharacterCard = {
  id: "rbr",
  canonicalId: "ci_rbr",
  reprints: ["set8-099"],
  cardType: "character",
  name: "Gadget Hackwrench",
  version: "Quirky Scientist",
  i18n: {
    en: {
      name: "Gadget Hackwrench",
      version: "Quirky Scientist",
      text: [
        {
          title: "GOLLY!",
          description:
            "When you play this character, if an opponent has more cards in their hand than you, you may draw a card.",
        },
      ],
    },
    de: {
      name: "Trixi",
      version: "Eigenwillige Wissenschaftlerin",
      text: [
        {
          title: "DONNERWETTER!",
          description:
            "Wenn du diesen Charakter ausspielst und mindestens eine gegnerische Person mehr Karten auf der Hand hat als du, darfst du 1 Karte ziehen.",
        },
      ],
    },
    fr: {
      name: "Gadget",
      version: "Scientifique excentrique",
      text: [
        {
          title: "MINCE ALORS!",
          description:
            "Lorsque vous jouez ce personnage, si un adversaire a plus de cartes en main que vous, vous pouvez piocher une carte.",
        },
      ],
    },
    it: {
      name: "Scheggia Hackwrench",
      version: "Scienziata Peculiare",
      text: [
        {
          title: "PERBACCO!",
          description:
            "Quando giochi questo personaggio, se un avversario ha in mano più carte di te, puoi pescare una carta.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Rescue Rangers",
  set: "008",
  cardNumber: 99,
  rarity: "rare",
  cost: 4,
  strength: 3,
  willpower: 2,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_d09689076d3344cd9a6fb53f2790c103",
    tcgPlayer: 631412,
  },
  text: [
    {
      title: "GOLLY!",
      description:
        "When you play this character, if an opponent has more cards in their hand than you, you may draw a card.",
    },
  ],
  classifications: ["Storyborn", "Ally", "Inventor"],
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
      id: "1xg-1",
      name: "GOLLY!",
      text: "GOLLY! When you play this character, if an opponent has more cards in their hand than you, you may draw a card.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
