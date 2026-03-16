import type { ActionCard } from "@tcg/lorcana-types";

export const _99Puppies: ActionCard = {
  id: "V75",
  canonicalId: "ci_V75",
  reprints: ["set3-024"],
  cardType: "action",
  name: "99 Puppies",
  i18n: {
    en: {
      name: "99 Puppies",
      text: "Whenever one of your characters quests this turn, gain 1 lore.",
    },
    de: {
      name: "99 Welpen",
      text: "Jedes Mal, wenn einer deiner Charaktere in diesem Zug erkundet, sammelst du 1 Legende.",
    },
    fr: {
      name: "99 chiots",
      text: "Chaque fois que l'un de vos personnages est envoyé à l'aventure durant ce tour, gagnez 1 éclat de Lore.",
    },
    it: {
      name: "99 Cuccioli",
      text: "Ogni volta che uno dei tuoi personaggi va all'avventura per questo turno, ottieni 1 leggenda.",
    },
  },
  inkType: ["amber"],
  franchise: "101 Dalmatians",
  set: "003",
  cardNumber: 24,
  rarity: "uncommon",
  cost: 5,
  inkable: false,
  externalIds: {
    lorcast: "crd_56003cfee81148e9a2ceebe4136e4e06",
    tcgPlayer: 534480,
  },
  text: "Whenever one of your characters quests this turn, gain 1 lore.",
  abilities: [
    {
      type: "action",
      effect: {
        type: "create-triggered-ability",
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
            amount: 1,
            target: "CONTROLLER",
            type: "gain-lore",
          },
        },
      },
    },
  ],
};
