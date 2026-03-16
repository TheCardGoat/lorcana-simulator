import type { CharacterCard } from "@tcg/lorcana-types";

export const simbaPrideProtector: CharacterCard = {
  id: "pBr",
  canonicalId: "ci_pBr",
  reprints: ["set6-020"],
  cardType: "character",
  name: "Simba",
  version: "Pride Protector",
  i18n: {
    en: {
      name: "Simba",
      version: "Pride Protector",
      text: [
        {
          title: "Shift 3",
        },
        {
          title: "UNDERSTAND THE BALANCE",
          description:
            "At the end of your turn, if this character is exerted, you may ready your other characters.",
        },
      ],
    },
    de: {
      name: "Simba",
      version: "Pride Protector",
      text: [
        {
          title: "Shift 3",
          description:
            "(You may pay 3 to play this on top of one of your characters named Simba.) UNDERSTAND THE BALANCE At the end of your turn, if this character is exerted, you may ready your other characters.",
        },
      ],
    },
    fr: {
      name: "Simba",
      version: "Pride Protector",
      text: [
        {
          title: "Shift 3",
          description:
            "(You may pay 3 to play this on top of one of your characters named Simba.) UNDERSTAND THE BALANCE At the end of your turn, if this character is exerted, you may ready your other characters.",
        },
      ],
    },
    it: {
      name: "Simba",
      version: "Pride Protector",
      text: [
        {
          title: "Shift 3",
          description:
            "(You may pay 3 to play this on top of one of your characters named Simba.) UNDERSTAND THE BALANCE At the end of your turn, if this character is exerted, you may ready your other characters.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Lion King",
  set: "006",
  cardNumber: 20,
  rarity: "legendary",
  cost: 5,
  strength: 4,
  willpower: 4,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_a94b5e02de4a43bdba60303fffe3d20f",
    tcgPlayer: 591991,
  },
  text: [
    {
      title: "Shift 3",
    },
    {
      title: "UNDERSTAND THE BALANCE",
      description:
        "At the end of your turn, if this character is exerted, you may ready your other characters.",
    },
  ],
  classifications: ["Floodborn", "Hero", "Prince"],
  abilities: [
    {
      cost: {
        ink: 3,
      },
      id: "1i7-1",
      keyword: "Shift",
      text: "Shift 3",
      type: "keyword",
    },
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          target: {
            selector: "all",
            count: "all",
            owner: "any",
            zones: ["play"],
            cardTypes: ["character"],
          },
          type: "ready",
        },
        type: "optional",
      },
      id: "1i7-2",
      text: "UNDERSTAND THE BALANCE At the end of your turn, if this character is exerted, you may ready your other characters.",
      type: "action",
    },
  ],
};
