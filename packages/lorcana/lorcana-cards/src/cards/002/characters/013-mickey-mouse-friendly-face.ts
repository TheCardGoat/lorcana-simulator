import type { CharacterCard } from "@tcg/lorcana-types";

export const mickeyMouseFriendlyFace: CharacterCard = {
  id: "igT",
  canonicalId: "ci_igT",
  reprints: ["set2-013"],
  cardType: "character",
  name: "Mickey Mouse",
  version: "Friendly Face",
  i18n: {
    en: {
      name: "Mickey Mouse",
      version: "Friendly Face",
      text: [
        {
          title: "GLAD YOU'RE HERE!",
          description:
            "Whenever this character quests, you pay 3 {I} less for the next character you play this turn.",
        },
      ],
    },
    de: {
      name: "Micky Maus",
      version: "Freundliches Gesicht",
      text: [
        {
          title: "SCHÖN, DASS DU DA BIST!",
          description:
            "Jedes Mal, wenn dieser Charakter erkundet, zahlst du 3 weniger für den nächsten Charakter, den du in diesem Zug ausspielst.",
        },
      ],
    },
    fr: {
      name: "Mickey Mouse",
      version: "Visage amical",
      text: [
        {
          title: "BIENVENUE DANS MA MAISON",
          description:
            "Lorsque ce personnage est envoyé à l'aventure, le prochain personnage que vous jouez durant ce tour vous coûte 3 de moins.",
        },
      ],
    },
    it: {
      name: "Mickey Mouse",
      version: "Friendly Face",
      text: [
        {
          title: "GLAD YOU'RE HERE!",
          description:
            "Whenever this character quests, you pay 3 less for the next character you play this turn.",
        },
      ],
    },
  },
  inkType: ["amber"],
  set: "002",
  cardNumber: 13,
  rarity: "common",
  cost: 6,
  strength: 1,
  willpower: 6,
  lore: 3,
  inkable: true,
  externalIds: {
    lorcast: "crd_e32380ac2e3f4e69b385cad4b3c3df11",
    tcgPlayer: 516384,
  },
  text: [
    {
      title: "GLAD YOU'RE HERE!",
      description:
        "Whenever this character quests, you pay 3 {I} less for the next character you play this turn.",
    },
  ],
  classifications: ["Storyborn", "Hero"],
  abilities: [
    {
      effect: {
        amount: 3,
        cardType: "character",
        duration: "next-play-this-turn",
        target: "CONTROLLER",
        type: "cost-reduction",
      },
      id: "1xe-1",
      name: "GLAD YOU'RE HERE!",
      text: "GLAD YOU'RE HERE! Whenever this character quests, you pay 3 {I} less for the next character you play this turn.",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
