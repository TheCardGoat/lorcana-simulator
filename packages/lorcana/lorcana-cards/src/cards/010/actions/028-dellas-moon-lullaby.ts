import type { ActionCard } from "@tcg/lorcana-types";

export const dellasMoonLullaby: ActionCard = {
  id: "VOg",
  canonicalId: "ci_VOg",
  reprints: ["set10-028"],
  cardType: "action",
  name: "Della's Moon Lullaby",
  i18n: {
    en: {
      name: "Della's Moon Lullaby",
      text: "Chosen opposing character gets -2 {S} until the start of your next turn. Draw a card.",
    },
    de: {
      name: "Dellas Schlaflied",
      text: "Gib einem gegnerischen Charakter deiner Wahl bis zu Beginn deines nächsten Zuges -2. Ziehe 1 Karte.",
    },
    fr: {
      name: "Berceuse de la Lune de Della",
      text: "Choisissez un personnage adverse qui subit -2 jusqu'au début de votre prochain tour. Piochez une carte.",
    },
    it: {
      name: "Ninna Nanna Lunare di Della",
      text: "(Un personaggio con costo 2 o superiore può per cantare questa canzone gratis.) Un personaggio avversario a tua scelta riceve -2 fino all'inizio del tuo prossimo turno. Pesca una carta.",
    },
  },
  inkType: ["amber"],
  franchise: "Ducktales",
  set: "010",
  cardNumber: 28,
  rarity: "common",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_ebc01607e02e4421b658f6fbe90a97ca",
    tcgPlayer: 658444,
  },
  text: "Chosen opposing character gets -2 {S} until the start of your next turn. Draw a card.",
  actionSubtype: "song",
  abilities: [
    {
      effect: {
        steps: [
          {
            duration: "until-start-of-next-turn",
            modifier: -2,
            stat: "strength",
            target: "CHOSEN_OPPOSING_CHARACTER",
            type: "modify-stat",
          },
          {
            amount: 1,
            target: "CONTROLLER",
            type: "draw",
          },
        ],
        type: "sequence",
      },
      type: "action",
    },
  ],
};
