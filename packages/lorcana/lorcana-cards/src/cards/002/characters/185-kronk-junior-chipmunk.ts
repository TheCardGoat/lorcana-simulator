import type { CharacterCard } from "@tcg/lorcana-types";

export const kronkJuniorChipmunk: CharacterCard = {
  id: "XpE",
  canonicalId: "ci_XpE",
  reprints: ["set2-185"],
  cardType: "character",
  name: "Kronk",
  version: "Junior Chipmunk",
  i18n: {
    en: {
      name: "Kronk",
      version: "Junior Chipmunk",
      text: [
        {
          title: "Resist +1",
        },
        {
          title: "SCOUT LEADER",
          description:
            "During your turn, whenever this character banishes another character in a challenge, you may deal 2 damage to chosen character.",
        },
      ],
    },
    de: {
      name: "Kronk",
      version: "Junior Chipmunk",
      text: "Robust +1 (Reduziere jeglichen Schaden, der diesem Charakter zugefügt wird, um 1.) PFADFINDER Jedes Mal, wenn dieser Charakter in deinem Zug durch eine Herausforderung einen anderen Charakter verbannt, darfst du einem Charakter deiner Wahl 2 Schaden zufügen.",
    },
    fr: {
      name: "Kronk",
      version: "Ragondin junior",
      text: "Résistance +1 CHEF SCOUT Lorsque ce personnage en bannit un autre via un défi durant votre tour, vous pouvez choisir un personnage et lui infliger 2 dommages.",
    },
    it: {
      name: "Kronk",
      version: "Junior Chipmunk",
      text: "Resist +1 (Damage dealt to this character is reduced by 1.) SCOUT LEADER During your turn, whenever this character banishes another character in a challenge, you may deal 2 damage to chosen character.",
    },
  },
  inkType: ["steel"],
  franchise: "Emperors New Groove",
  set: "002",
  cardNumber: 185,
  rarity: "rare",
  cost: 6,
  strength: 4,
  willpower: 5,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_452868f6888045018e50e2b4e41e0f7b",
    tcgPlayer: 527775,
  },
  text: [
    {
      title: "Resist +1",
    },
    {
      title: "SCOUT LEADER",
      description:
        "During your turn, whenever this character banishes another character in a challenge, you may deal 2 damage to chosen character.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  missingTests: true,
  abilities: [
    {
      id: "6z5-1",
      keyword: "Resist",
      text: "Resist +1",
      type: "keyword",
      value: 1,
    },
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          amount: 2,
          target: {
            selector: "chosen",
            count: 1,
            owner: "any",
            zones: ["play"],
            cardTypes: ["character"],
          },
          type: "deal-damage",
        },
        type: "optional",
      },
      id: "6z5-2",
      name: "SCOUT LEADER",
      text: "SCOUT LEADER During your turn, whenever this character banishes another character in a challenge, you may deal 2 damage to chosen character.",
      trigger: {
        event: "banish",
        on: "OPPONENT_CHARACTERS",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
