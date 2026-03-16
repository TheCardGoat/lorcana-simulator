import type { ActionCard } from "@tcg/lorcana-types";

export const theHorsemanStrikesEpic: ActionCard = {
  id: "Zv7",
  canonicalId: "ci_0mj",
  reprints: ["set10-029"],
  cardType: "action",
  name: "The Horseman Strikes!",
  i18n: {
    en: {
      name: "The Horseman Strikes!",
      text: "Draw a card. You may banish chosen character with Evasive.",
    },
    de: {
      name: "Der Reiter schlägt zu!",
      text: "Ziehe 1 Karte. Du darfst einen Charakter deiner Wahl mit Wendig verbannen.",
    },
    fr: {
      name: "Le Cavalier attaque !",
      text: "Piochez une carte. Vous pouvez choisir un personnage avec Insaisissable et le bannir.",
    },
    it: {
      name: "Il Cavaliere Colpisce!",
      text: "Pesca una carta. Puoi esiliare un personaggio a tua scelta con Sfuggente.",
    },
  },
  inkType: ["amber"],
  franchise: "Sleepy Hollow",
  set: "010",
  cardNumber: 207,
  rarity: "common",
  specialRarity: "epic",
  cost: 3,
  inkable: true,
  externalIds: {
    lorcast: "crd_faf17cc51b9748daa7187f81103430d0",
    tcgPlayer: 660013,
  },
  text: "Draw a card. You may banish chosen character with Evasive.",
  abilities: [
    {
      effect: {
        steps: [
          {
            amount: 1,
            target: "CONTROLLER",
            type: "draw",
          },
          {
            chooser: "CONTROLLER",
            effect: {
              target: "CHOSEN_OPPOSING_CHARACTER",
              type: "banish",
            },
            type: "optional",
          },
        ],
        type: "sequence",
      },
      type: "action",
    },
  ],
};
