import type { ActionCard } from "@tcg/lorcana-types";

export const stealFromTheRich: ActionCard = {
  id: "mkJ",
  canonicalId: "ci_mkJ",
  reprints: ["set1-097"],
  cardType: "action",
  name: "Steal from the Rich",
  i18n: {
    en: {
      name: "Steal from the Rich",
      text: "Whenever one of your characters quests this turn, each opponent loses 1 lore.",
    },
    de: {
      name: "Nimm von den Reichen",
      text: "Jedes Mal, wenn einer deiner Charaktere in diesem Zug erkundet, verlieren alle gegnerischen Mitspielenden je 1 Legende.",
    },
    fr: {
      name: "VOLER AUX RICHES",
      text: "Chaque fois que l'un de vos personnages est envoyé à l'aventure durant ce tour, chaque adversaire perd 1 éclat de Lore.",
    },
    it: {
      name: "Steal from the Rich",
      text: "Whenever one of your characters quests this turn, each opponent loses 1 lore.",
    },
  },
  inkType: ["emerald"],
  franchise: "Robin Hood",
  set: "001",
  cardNumber: 97,
  rarity: "rare",
  cost: 5,
  inkable: false,
  externalIds: {
    lorcast: "crd_cc2d13ea26124968b44151ab66a7a343",
    tcgPlayer: 508773,
  },
  text: "Whenever one of your characters quests this turn, each opponent loses 1 lore.",
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
            target: "EACH_OPPONENT",
            type: "lose-lore",
          },
        },
      },
    },
  ],
};
