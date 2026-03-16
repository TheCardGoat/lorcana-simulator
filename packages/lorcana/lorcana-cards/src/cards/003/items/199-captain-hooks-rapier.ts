import type { ItemCard } from "@tcg/lorcana-types";

export const captainHooksRapier: ItemCard = {
  id: "tET",
  canonicalId: "ci_tET",
  reprints: ["set3-199"],
  cardType: "item",
  name: "Captain Hook's Rapier",
  i18n: {
    en: {
      name: "Captain Hook's Rapier",
      text: [
        {
          title: "GET THOSE SCURVY BRATS!",
          description:
            "During your turn, whenever one of your characters banishes another character in a challenge, you may pay 1 {I} to draw a card.",
        },
        {
          title: "LET'S HAVE AT IT!",
          description:
            "Your characters named Captain Hook gain Challenger +1. (They get +1 {S} while challenging.)",
        },
      ],
    },
    de: {
      name: "Käpt'n Hooks Degen",
      text: [
        {
          title: "FANGT DIESE TEUFELSBRATEN WIEDER EIN!",
          description:
            "Jedes Mal, wenn einer deiner Charaktere in deinem Zug durch eine Herausforderung einen anderen Charakter verbannt, darfst du 1 bezahlen, um 1 Karte zu ziehen.",
        },
        {
          title: "LOS GEHT'S!",
          description:
            "Deine Käpt'n-Hook-Charaktere erhalten Herausfordern +1. (Während sie herausfordern, erhalten sie +1.)",
        },
      ],
    },
    fr: {
      name: "Rapière du Capitaine Crochet",
      text: [
        {
          title: "RATTRAPEZ CES IMMONDES GAMINS!",
          description:
            "Chaque fois que l'un de vos personnages en bannit un autre via un défi durant votre tour, vous pouvez payer 1 pour piocher une carte.",
        },
        {
          title: "À L'ATTAQUE!",
          description:
            "Vos personnages Capitaine Crochet gagnent Offensif + 1. (Lorsqu'ils défient, ces personnages gagnent +1.)",
        },
      ],
    },
    it: {
      name: "Stocco di Capitan Uncino",
      text: [
        {
          title: "INSEGUITELI, PRESTO!",
          description:
            "Durante il tuo turno, ogni volta che uno dei tuoi personaggi esilia un altro personaggio in una sfida, puoi pagare 1 per pescare una carta.",
        },
        {
          title: "INCOMINCIAMO!",
        },
        {
          title: "I",
          description:
            "tuoi personaggi chiamati Capitan Uncino ottengono Sfidante +1. (Ricevono +1 mentre stanno sfidando.)",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Peter Pan",
  set: "003",
  cardNumber: 199,
  rarity: "uncommon",
  cost: 3,
  inkable: false,
  externalIds: {
    lorcast: "crd_3c6f007d30714e5183dc6d9da8b200ae",
    tcgPlayer: 537759,
  },
  text: [
    {
      title: "GET THOSE SCURVY BRATS!",
      description:
        "During your turn, whenever one of your characters banishes another character in a challenge, you may pay 1 {I} to draw a card.",
    },
    {
      title: "LET'S HAVE AT IT!",
      description:
        "Your characters named Captain Hook gain Challenger +1. (They get +1 {S} while challenging.)",
    },
  ],
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
      id: "1wl-1",
      name: "GET THOSE SCURVY BRATS!",
      text: "GET THOSE SCURVY BRATS! During your turn, whenever one of your characters banishes another character in a challenge, you may pay 1 {I} to draw a card.",
      trigger: {
        event: "banish",
        on: "YOUR_OTHER_CHARACTERS",
        timing: "whenever",
      },
      type: "triggered",
    },
    {
      effect: {
        keyword: "Challenger",
        target: "YOUR_CHARACTERS",
        type: "gain-keyword",
        value: 1,
      },
      id: "1wl-2",
      text: "LET'S HAVE AT IT! Your characters named Captain Hook gain Challenger +1.",
      type: "action",
    },
  ],
};
