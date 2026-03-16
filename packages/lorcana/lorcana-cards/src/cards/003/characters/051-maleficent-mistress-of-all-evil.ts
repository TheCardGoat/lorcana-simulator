import type { CharacterCard } from "@tcg/lorcana-types";

export const maleficentMistressOfAllEvil: CharacterCard = {
  id: "rHc",
  canonicalId: "ci_FwY",
  reprints: ["set3-051"],
  cardType: "character",
  name: "Maleficent",
  version: "Mistress of All Evil",
  i18n: {
    en: {
      name: "Maleficent",
      version: "Mistress of All Evil",
      text: [
        {
          title: "DARK KNOWLEDGE",
          description: "Whenever this character quests, you may draw a card.",
        },
        {
          title: "DIVINATION",
          description:
            "During your turn, whenever you draw a card, you may move 1 damage counter from chosen character to chosen opposing character.",
        },
      ],
    },
    de: {
      name: "Malefiz",
      version: "Herrin des Bösen",
      text: [
        {
          title: "FINSTERES WISSEN",
          description: "Jedes Mal, wenn dieser Charakter erkundet, darfst du 1 Karte ziehen.",
        },
        {
          title: "WAHRSAGUNG",
          description:
            "Jedes Mal, wenn du in deinem Zug 1 Karte ziehst, darfst du 1 Schadensmarker von einem Charakter deiner Wahl zu einem gegnerischen Charakter deiner Wahl verschieben.",
        },
      ],
    },
    fr: {
      name: "Maléfique",
      version: "Maîtresse du Mal",
      text: [
        {
          title: "SAVOIR OBSCUR",
          description:
            "Chaque fois que ce personnage est envoyé à l'aventure, vous pouvez piocher une carte.",
        },
        {
          title: "DIVINATION",
          description:
            "Chaque fois que vous piochez une carte durant votre tour, vous pouvez choisir un personnage et déplacer 1 de ses jetons Dommage sur un personnage adverse de votre choix.",
        },
      ],
    },
    it: {
      name: "Malefica",
      version: "Signora di Ogni Male",
      text: [
        {
          title: "SAPERE OSCURO",
          description:
            "Ogni volta che questo personaggio va all'avventura, puoi pescare una carta.",
        },
        {
          title: "DIVINAZIONE",
          description:
            "Durante il tuo turno, ogni volta che peschi una carta, puoi spostare 1 segnalino danno da un personaggio a tua scelta a un personaggio avversario a tua scelta.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Sleeping Beauty",
  set: "003",
  cardNumber: 51,
  rarity: "legendary",
  cost: 5,
  strength: 2,
  willpower: 3,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_40690491af114f2e810a6fd1c6ddcafa",
    tcgPlayer: 539159,
  },
  text: [
    {
      title: "DARK KNOWLEDGE",
      description: "Whenever this character quests, you may draw a card.",
    },
    {
      title: "DIVINATION",
      description:
        "During your turn, whenever you draw a card, you may move 1 damage counter from chosen character to chosen opposing character.",
    },
  ],
  classifications: ["Storyborn", "Villain", "Sorcerer"],
  missingTests: true,
  abilities: [
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
      id: "277-1",
      name: "DARK KNOWLEDGE",
      text: "DARK KNOWLEDGE Whenever this character quests, you may draw a card DIVINATION During your turn, whenever you draw a card, you may move 1 damage counter from chosen character to chosen opposing character.",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
