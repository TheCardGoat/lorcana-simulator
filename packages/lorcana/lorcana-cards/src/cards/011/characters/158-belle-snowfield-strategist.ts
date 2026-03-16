import type { CharacterCard } from "@tcg/lorcana-types";

export const belleSnowfieldStrategist: CharacterCard = {
  id: "u0b",
  canonicalId: "ci_byy",
  reprints: ["set11-158"],
  cardType: "character",
  name: "Belle",
  version: "Snowfield Strategist",
  i18n: {
    en: {
      name: "Belle",
      version: "Snowfield Strategist",
      text: [
        {
          title: "WINTER STOCKPILE",
          description:
            "Whenever one of your characters is banished, you may put that card from your discard into your inkwell facedown and exerted.",
        },
      ],
    },
    de: {
      name: "Belle",
      version: "Schneefeld-Strategin",
      text: [
        {
          title: "WINTERVORRAT",
          description:
            "Jedes Mal, wenn einer deiner Charaktere verbannt wird, darfst du jenen aus deinem Ablagestapel verdeckt und erschöpft in deinen Tintenvorrat legen.",
        },
      ],
    },
    fr: {
      name: "Belle",
      version: "Stratège du champ de neige",
      text: [
        {
          title: "RÉSERVES HIVERNALES",
          description:
            "Chaque fois que l'un de vos personnages est banni, vous pouvez le placer de votre défausse dans votre réserve d'encre, face cachée et épuisé.",
        },
      ],
    },
    it: {
      name: "Belle",
      version: "Stratega del Campo Innevato",
      text: [
        {
          title: "RISERVA INVERNALE",
          description:
            "Ogni volta che uno dei tuoi personaggi viene esiliato, puoi aggiungere quella carta dai tuoi scarti al tuo calamaio, a faccia in giù e impegnata.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Beauty and the Beast",
  set: "011",
  cardNumber: 158,
  rarity: "common",
  cost: 4,
  strength: 2,
  willpower: 3,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_9652fdf2822645ee91302352c74c9d6a",
    tcgPlayer: 677167,
  },
  text: [
    {
      title: "WINTER STOCKPILE",
      description:
        "Whenever one of your characters is banished, you may put that card from your discard into your inkwell facedown and exerted.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Princess"],
  abilities: [
    {
      id: "psq-1",
      effect: {
        chooser: "CONTROLLER",
        effect: {
          source: "discard",
          target: "CONTROLLER",
          type: "put-into-inkwell",
          exerted: true,
          facedown: true,
        },
        type: "optional",
      },
      name: "WINTER STOCKPILE",
      trigger: {
        event: "banish",
        timing: "whenever",
        on: "YOUR_OTHER_CHARACTERS",
      },
      type: "triggered",
      text: "WINTER STOCKPILE Whenever one of your characters is banished, you may put that card from your discard into your inkwell facedown and exerted.",
    },
  ],
};
