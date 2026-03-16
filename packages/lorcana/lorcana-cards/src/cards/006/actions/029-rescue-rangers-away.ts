import type { ActionCard } from "@tcg/lorcana-types";

export const rescueRangersAway: ActionCard = {
  id: "wx1",
  canonicalId: "ci_wx1",
  reprints: ["set6-029"],
  cardType: "action",
  name: "Rescue Rangers Away!",
  i18n: {
    en: {
      name: "Rescue Rangers Away!",
      text: "Count the number of characters you have in play. Chosen character loses {S} equal to that number until the start of your next turn.",
    },
    de: {
      name: "Rettungstruppe! Auf geht’s!",
      text: "Zähle deine Charaktere im Spiel. Ein Charakter deiner Wahl verliert so viel wie diese Anzahl bis zu Beginn deines nächsten Zuges.",
    },
    fr: {
      name: "Rangers du risque à la rescousse !",
      text: "Comptez le nombre de personnages que vous avez en jeu, puis choisissez un personnage qui perd autant de jusqu'au début de votre prochain tour.",
    },
    it: {
      name: "Agenti Speciali all'Attacco!",
      text: "Conta il numero di personaggi che hai in gioco. Un personaggio a tua scelta perde pari a quel numero fino all'inizio del tuo prossimo turno.",
    },
  },
  inkType: ["amber"],
  franchise: "Rescue Rangers",
  set: "006",
  cardNumber: 29,
  rarity: "uncommon",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_be7a93b4b99b4a8b9da63fd956fa3c86",
    tcgPlayer: 578172,
  },
  text: "Count the number of characters you have in play. Chosen character loses {S} equal to that number until the start of your next turn.",
  abilities: [
    {
      type: "action",
      effect: {
        type: "modify-stat",
        target: "CHOSEN_CHARACTER",
        stat: "strength",
        duration: "until-start-of-next-turn",
        modifier: {
          type: "difference",
          left: 0,
          right: {
            type: "characters-in-play",
            controller: "you",
          },
        },
      },
    },
  ],
};
