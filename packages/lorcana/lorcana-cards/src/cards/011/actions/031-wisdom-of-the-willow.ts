import type { ActionCard } from "@tcg/lorcana-types";

export const wisdomOfTheWillow: ActionCard = {
  id: "aZ8",
  canonicalId: "ci_aZ8",
  reprints: ["set11-031"],
  cardType: "action",
  name: "Wisdom of the Willow",
  i18n: {
    en: {
      name: "Wisdom of the Willow",
      text: "For the rest of this turn, whenever one of your characters quests, you may draw a card.",
    },
    de: {
      name: "Weisheit der Weide",
      text: "Jedes Mal, wenn in diesem Zug einer deiner Charaktere erkundet, darfst du 1 Karte ziehen.",
    },
    fr: {
      name: "La sagesse du saule",
      text: "Pour le reste de ce tour, chaque fois que l'un de vos personnages est envoyé à l'aventure, vous pouvez piocher une carte.",
    },
    it: {
      name: "Saggezza del Salice",
      text: "Per il resto di questo turno, ogni volta che uno dei tuoi personaggi va all'avventura, puoi pescare una carta.",
    },
  },
  inkType: ["amber"],
  franchise: "Pocahontas",
  set: "011",
  cardNumber: 31,
  rarity: "uncommon",
  cost: 4,
  inkable: false,
  externalIds: {
    lorcast: "crd_9efb436da763484ba54c2b75e1e0fcd9",
    tcgPlayer: 674831,
  },
  text: "For the rest of this turn, whenever one of your characters quests, you may draw a card.",
  abilities: [
    {
      id: "1aj-1",
      effect: {
        lifecycle: {
          kind: "floating",
          duration: "this-turn",
        },
        ability: {
          trigger: {
            event: "quest",
            on: "YOUR_CHARACTERS",
            timing: "whenever",
          },
          effect: {
            chooser: "CONTROLLER",
            effect: {
              amount: 1,
              target: "CONTROLLER",
              type: "draw",
            },
            type: "optional",
          },
        },
        type: "create-triggered-ability",
      },
      type: "action",
      text: "For the rest of this turn, whenever one of your characters quests, you may draw a card.",
    },
  ],
};
