import type { CharacterCard } from "@tcg/lorcana-types";

export const pepperQuickthinkingPuppy: CharacterCard = {
  id: "C36",
  canonicalId: "ci_C36",
  reprints: ["set7-167"],
  cardType: "character",
  name: "Pepper",
  version: "Quick-Thinking Puppy",
  i18n: {
    en: {
      name: "Pepper",
      version: "Quick-Thinking Puppy",
      text: [
        {
          title: "IN THE NICK OF TIME",
          description:
            "Whenever one of your Puppy characters is banished, you may put that card into your inkwell facedown and exerted.",
        },
      ],
    },
    de: {
      name: "Pepper",
      version: "Schnelldenker",
      text: [
        {
          title: "AUF DEN PUNKT GEBRACHT",
          description:
            "Jedes Mal, wenn einer deiner Welpen verbannt wird, darfst du jenen verdeckt und erschöpft in deinen Tintenvorrat legen.",
        },
      ],
    },
    fr: {
      name: "Pepper",
      version: "Chiot vif d’esprit",
      text: [
        {
          title: "JUSTE À TEMPS",
          description:
            "Chaque fois que l'un de vos personnages Chiot est banni, vous pouvez le placer dans votre réserve d'encre, face cachée et épuisé.",
        },
      ],
    },
    it: {
      name: "Pepe",
      version: "Cucciolo Reattivo",
      text: [
        {
          title: "GIUSTO IN TEMPO",
          description:
            "Ogni volta che uno dei tuoi personaggi Cucciolo viene esiliato, puoi aggiungere quella carta al tuo calamaio, a faccia in giù e impegnata.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "101 Dalmatians",
  set: "007",
  cardNumber: 167,
  rarity: "common",
  cost: 3,
  strength: 2,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_eddf6a4eb7af4098997b5e91e4a763e7",
    tcgPlayer: 618249,
  },
  text: [
    {
      title: "IN THE NICK OF TIME",
      description:
        "Whenever one of your Puppy characters is banished, you may put that card into your inkwell facedown and exerted.",
    },
  ],
  classifications: ["Storyborn", "Puppy"],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          exerted: true,
          facedown: true,
          source: "hand",
          target: "CONTROLLER",
          type: "put-into-inkwell",
        },
        type: "optional",
      },
      id: "15w-1",
      name: "IN THE NICK OF TIME",
      text: "IN THE NICK OF TIME Whenever one of your Puppy characters is banished, you may put that card into your inkwell facedown and exerted.",
      trigger: {
        event: "banish",
        on: "YOUR_OTHER_CHARACTERS",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
