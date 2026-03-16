import type { CharacterCard } from "@tcg/lorcana-types";

export const puaProtectivePig: CharacterCard = {
  id: "Ai2",
  canonicalId: "ci_Ai2",
  reprints: ["set8-019"],
  cardType: "character",
  name: "Pua",
  version: "Protective Pig",
  i18n: {
    en: {
      name: "Pua",
      version: "Protective Pig",
      text: [
        {
          title: "Bodyguard",
        },
        {
          title: "FREE FRUIT",
          description: "When this character is banished, you may draw a card.",
        },
      ],
    },
    de: {
      name: "Pua",
      version: "Beschützendes Schwein",
      text: "Beschützen (Du darfst diesen Charakter erschöpft ausspielen. Gegnerische Charaktere müssen beim Herausfordern deiner Charaktere zuerst deine Charaktere mit Beschützen wählen, wenn möglich.) GRATIS OBST Wenn dieser Charakter verbannt wird, darfst du 1 Karte ziehen.",
    },
    fr: {
      name: "Pua",
      version: "Cochon protecteur",
      text: [
        {
          title: "Rempart",
          description:
            "(Ce personnage peut entrer en jeu épuisé. Lorsqu'il défie l'un de vos personnages, un personnage adverse doit, s'il le peut, choisir l'un de vos personnages avec Rempart.) FRUITS GRATUITS Lorsque ce personnage est banni, vous pouvez piocher une carte.",
        },
      ],
    },
    it: {
      name: "Pua",
      version: "Maiale Protettivo",
      text: "Guardiano FRUTTA GRATIS Quando questo personaggio viene esiliato, puoi pescare una carta.",
    },
  },
  inkType: ["amber", "amethyst"],
  franchise: "Moana",
  set: "008",
  cardNumber: 19,
  rarity: "uncommon",
  cost: 3,
  strength: 2,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_dec273aa1bbc492dafa914363265979c",
    tcgPlayer: 631363,
  },
  text: [
    {
      title: "Bodyguard",
    },
    {
      title: "FREE FRUIT",
      description: "When this character is banished, you may draw a card.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      id: "1x6-1",
      keyword: "Bodyguard",
      text: "Bodyguard",
      type: "keyword",
    },
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          amount: 1,
          target: "CONTROLLER",
          type: "draw",
        },
        type: "optional",
      },
      id: "1x6-2",
      name: "FREE FRUIT",
      text: "FREE FRUIT When this character is banished, you may draw a card.",
      trigger: {
        event: "banish",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
