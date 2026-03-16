import type { ActionCard } from "@tcg/lorcana-types";

export const youreWelcomeEnchanted: ActionCard = {
  id: "huo",
  canonicalId: "ci_IPh",
  reprints: ["set5-096"],
  cardType: "action",
  name: "You're Welcome",
  i18n: {
    en: {
      name: "You're Welcome",
      text: "Shuffle chosen character, item, or location into their player's deck. That player draws 2 cards.",
    },
    de: {
      name: "Voll gerne",
      text: "Mische einen Charakter, Gegenstand oder Ort deiner Wahl zurück in das zugehörige Deck. Wer jenen im Spiel hatte, zieht 2 Karten.",
    },
    fr: {
      name: "Pour les hommes",
      text: "Choisissez un personnage, un objet ou un lieu et mélangez-le dans la pioche de son propriétaire. Ce joueur pioche 2 cartes.",
    },
    it: {
      name: "Tranquilla",
      text: "(Un personaggio con costo 4 o superiore può per cantare questa canzone gratis.) Rimescola un personaggio, un oggetto o un luogo a tua scelta nel mazzo del suo giocatore. Quel giocatore pesca 2 carte.",
    },
  },
  inkType: ["emerald"],
  franchise: "Moana",
  set: "005",
  cardNumber: 213,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 4,
  inkable: true,
  externalIds: {
    lorcast: "crd_f799b47b4b894912a8d83942d0fa4d22",
    tcgPlayer: 561983,
  },
  text: "Shuffle chosen character, item, or location into their player's deck. That player draws 2 cards.",
  actionSubtype: "song",
  abilities: [
    {
      id: "1my-1",
      effect: {
        type: "sequence",
        steps: [
          {
            type: "shuffle-into-deck",
            target: {
              selector: "chosen",
              count: 1,
              owner: "any",
              zones: ["play"],
              cardTypes: ["character", "item", "location"],
            },
          },
          {
            type: "draw",
            amount: 2,
            target: "CARD_OWNER",
          },
        ],
      },
      type: "action",
      text: "Shuffle chosen character, item, or location into their player's deck. That player draws 2 cards.",
    },
  ],
};
