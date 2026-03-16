import type { CharacterCard } from "@tcg/lorcana-types";

export const goofySetForAdventure: CharacterCard = {
  id: "RnM",
  canonicalId: "ci_vZ9",
  reprints: ["set9-074"],
  cardType: "character",
  name: "Goofy",
  version: "Set for Adventure",
  i18n: {
    en: {
      name: "Goofy",
      version: "Set for Adventure",
      text: [
        {
          title: "FAMILY VACATION",
          description:
            "Once during your turn, whenever this character moves to a location, you may move one of your other characters to that location for free. If you do, draw a card.",
        },
      ],
    },
    de: {
      name: "Goofy",
      version: "Set for Adventure",
    },
    fr: {
      name: "Goofy",
      version: "Set for Adventure",
    },
    it: {
      name: "Goofy",
      version: "Set for Adventure",
    },
  },
  inkType: ["emerald"],
  franchise: "Goofy Movie",
  set: "009",
  cardNumber: 74,
  rarity: "rare",
  cost: 2,
  strength: 2,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_bc96b5e1045e45a38da57c302c634ba2",
    tcgPlayer: 650147,
  },
  text: [
    {
      title: "FAMILY VACATION",
      description:
        "Once during your turn, whenever this character moves to a location, you may move one of your other characters to that location for free. If you do, draw a card.",
    },
  ],
  classifications: ["Storyborn", "Hero"],
  abilities: [
    {
      id: "1yc-1",
      effect: {
        amount: 1,
        target: "CONTROLLER",
        type: "draw",
      },
      name: "FAMILY VACATION Once",
      trigger: {
        event: "banish",
        timing: "whenever",
        on: "YOUR_OTHER_CHARACTERS",
      },
      type: "triggered",
      text: "FAMILY VACATION Once during your turn, whenever this character moves to a location, you may move one of your other characters to that location for free. If you do, draw a card.",
    },
  ],
};
