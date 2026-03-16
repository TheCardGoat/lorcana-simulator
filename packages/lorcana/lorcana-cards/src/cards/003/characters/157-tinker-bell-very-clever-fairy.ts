import type { CharacterCard } from "@tcg/lorcana-types";

export const tinkerBellVeryCleverFairy: CharacterCard = {
  id: "bd1",
  canonicalId: "ci_bd1",
  reprints: ["set3-157"],
  cardType: "character",
  name: "Tinker Bell",
  version: "Very Clever Fairy",
  i18n: {
    en: {
      name: "Tinker Bell",
      version: "Very Clever Fairy",
      text: [
        {
          title: "I CAN USE THAT",
          description:
            "Whenever one of your items is banished, you may put that card into your inkwell facedown and exerted.",
        },
      ],
    },
    de: {
      name: "Naseweis",
      version: "Sehr kluge Fee",
      text: [
        {
          title: "DAS KANN ICH GUT GEBRAUCHEN",
          description:
            "Jedes Mal, wenn einer deiner Gegenstände verbannt wird, darfst du jenen verdeckt und erschöpft in deinen Tintenvorrat legen.",
        },
      ],
    },
    fr: {
      name: "La Fée Clochette",
      version: "Fée très maline",
      text: [
        {
          title: "JE PEUX UTILISER CECI",
          description:
            "Chaque fois que l'un de vos objets est banni, vous pouvez le placer dans votre réserve d'encre, face cachée et épuisé.",
        },
      ],
    },
    it: {
      name: "Trilli",
      version: "Fata Molto in Gamba",
      text: [
        {
          title: "POSSO USARLO IO",
          description:
            "Ogni volta che uno dei tuoi oggetti viene esiliato, puoi aggiungere quella carta al tuo calamaio, a faccia in giù e impegnata.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Peter Pan",
  set: "003",
  cardNumber: 157,
  rarity: "common",
  cost: 5,
  strength: 3,
  willpower: 4,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_62d821004e3d483a8d3d91a220cada53",
    tcgPlayer: 536268,
  },
  text: [
    {
      title: "I CAN USE THAT",
      description:
        "Whenever one of your items is banished, you may put that card into your inkwell facedown and exerted.",
    },
  ],
  classifications: ["Dreamborn", "Ally", "Fairy"],
  missingTests: true,
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
      id: "1y4-1",
      name: "I CAN USE THAT",
      text: "I CAN USE THAT Whenever one of your items is banished, you may put that card into your inkwell facedown and exerted.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
