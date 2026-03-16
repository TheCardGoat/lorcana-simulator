import type { ActionCard } from "@tcg/lorcana-types";

export const comeOutAndFight: ActionCard = {
  id: "H72",
  canonicalId: "ci_H72",
  reprints: ["set11-062"],
  cardType: "action",
  name: "Come Out and Fight!",
  i18n: {
    en: {
      name: "Come Out and Fight!",
      text: "Put all cards from under chosen character, item, or location on the bottom of their player's deck in a random order. Draw a card.",
    },
    de: {
      name: "Komm heraus und kämpfe!",
      text: "Wähle einen Charakter, Gegenstand oder Ort und lege alle Karten, welche darunter liegen, in zufälliger Reihenfolge unter das Deck der Person, die ihn im Spiel hat. Ziehe 1 Karte.",
    },
    fr: {
      name: "Viens te battre !",
      text: "Choisissez un personnage, un objet ou un lieu et placez toutes les cartes qui sont sous lui, sous la pioche de son propriétaire, dans un ordre aléatoire. Piochez une carte.",
    },
    it: {
      name: "Vieni Fuori e Combatti!",
      text: "Metti tutte le carte sotto a un personaggio, un oggetto o un luogo a tua scelta in fondo al mazzo del suo giocatore, in ordine casuale. Pesca una carta.",
    },
  },
  inkType: ["amethyst"],
  set: "011",
  cardNumber: 62,
  rarity: "common",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_9d9eb44aa6324c2ebce958cbf92a2d31",
    tcgPlayer: 675298,
  },
  text: "Put all cards from under chosen character, item, or location on the bottom of their player's deck in a random order. Draw a card.",
  abilities: [
    {
      id: "qk5-1",
      type: "action",
      text: "Put all cards from under chosen character, item, or location on the bottom of their player's deck in a random order. Draw a card.",
      effect: {
        type: "sequence",
        steps: [
          {
            type: "move-cards-from-under",
            destination: "deck-bottom-random",
            target: "CHOSEN_CHARACTER_ITEM_OR_LOCATION",
          },
          {
            type: "draw",
            amount: 1,
            target: "CONTROLLER",
          },
        ],
      },
    },
  ],
};
