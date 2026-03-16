import type { CharacterCard } from "@tcg/lorcana-types";

export const stitchCarefreeSnowboarder: CharacterCard = {
  id: "7zq",
  canonicalId: "ci_vWQ",
  reprints: ["set11-007"],
  cardType: "character",
  name: "Stitch",
  version: "Carefree Snowboarder",
  i18n: {
    en: {
      name: "Stitch",
      version: "Carefree Snowboarder",
      text: [
        {
          title: "BRING YOUR FRIENDS",
          description:
            "Whenever this character quests, if you have 2 or more other characters in play, you may draw a card.",
        },
      ],
    },
    de: {
      name: "Stitch",
      version: "Sorgloser Snowboarder",
      text: [
        {
          title: "BRINGT EURE FREUNDE MIT",
          description:
            "Jedes Mal, wenn dieser Charakter erkundet und du mindestens 2 weitere Charaktere im Spiel hast, darfst du 1 Karte ziehen.",
        },
      ],
    },
    fr: {
      name: "Stitch",
      version: "Snowboardeur insouciant",
      text: [
        {
          title: "AMÈNE TES AMIS",
          description:
            "Chaque fois que ce personnage est envoyé à l'aventure, si vous avez 2 autres personnages ou plus en jeu, vous pouvez piocher une carte.",
        },
      ],
    },
    it: {
      name: "Stitch",
      version: "Snowboarder Spensierato",
      text: [
        {
          title: "PORTA I TUOI AMICI",
          description:
            "Ogni volta che questo personaggio va all'avventura, se hai in gioco 2 o più altri personaggi, puoi pescare una carta.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Lilo and Stitch",
  set: "011",
  cardNumber: 7,
  rarity: "rare",
  cost: 5,
  strength: 4,
  willpower: 5,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_adca393d2367497aac99f2c4dd29b8ce",
  },
  text: [
    {
      title: "BRING YOUR FRIENDS",
      description:
        "Whenever this character quests, if you have 2 or more other characters in play, you may draw a card.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Alien"],
  abilities: [
    {
      id: "1hd-1",
      effect: {
        condition: {
          expression: "you have 2 or more other characters in play",
          type: "if",
        },
        then: {
          amount: 1,
          target: "CONTROLLER",
          type: "draw",
        },
        type: "conditional",
      },
      name: "BRING YOUR FRIENDS",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
      text: "BRING YOUR FRIENDS Whenever this character quests, if you have 2 or more other characters in play, you may draw a card.",
    },
  ],
};
