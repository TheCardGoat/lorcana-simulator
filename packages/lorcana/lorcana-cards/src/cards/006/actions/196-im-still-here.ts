import type { ActionCard } from "@tcg/lorcana-types";

export const imStillHere: ActionCard = {
  id: "HdJ",
  canonicalId: "ci_HdJ",
  reprints: ["set6-196"],
  cardType: "action",
  name: "I'm Still Here",
  i18n: {
    en: {
      name: "I'm Still Here",
      text: "Chosen character gains Resist +2 until the start of your next turn. Draw a card.",
    },
    de: {
      name: "I'm Still Here",
      text: "Ein Charakter deiner Wahl erhält bis zu Beginn deines nächsten Zuges Robust +2. Ziehe 1 Karte. (Reduziere jeglichen Schaden, der dem Charakter zugefügt wird, um 2.)",
    },
    fr: {
      name: "Un homme libre",
      text: "Choisissez un personnage qui gagne Résistance +2 jusqu'au début de votre prochain tour. Piochez une carte.",
    },
    it: {
      name: "Ci sono Anch'Io",
      text: "(Un personaggio con costo 3 o superiore può per cantare questa canzone gratis.) Un personaggio a tua scelta ottiene Resistere +2 fino all'inizio del tuo prossimo turno. Pesca una carta.",
    },
  },
  inkType: ["steel"],
  franchise: "Treasure Planet",
  set: "006",
  cardNumber: 196,
  rarity: "common",
  cost: 3,
  inkable: true,
  externalIds: {
    lorcast: "crd_139b6ae1e1c04ea0aef5ef864e8ed14b",
    tcgPlayer: 588151,
  },
  text: "Chosen character gains Resist +2 until the start of your next turn. Draw a card.",
  actionSubtype: "song",
  abilities: [
    {
      effect: {
        steps: [
          {
            duration: "until-start-of-next-turn",
            keyword: "Resist",
            target: {
              selector: "chosen",
              count: 1,
              owner: "any",
              zones: ["play"],
              cardTypes: ["character"],
            },
            type: "gain-keyword",
            value: 2,
          },
          {
            amount: 1,
            target: "CONTROLLER",
            type: "draw",
          },
        ],
        type: "sequence",
      },
      id: "7tt-1",
      text: "Chosen character gains Resist +2 until the start of your next turn. Draw a card.",
      type: "action",
    },
  ],
};
