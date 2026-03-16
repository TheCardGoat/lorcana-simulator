import type { ActionCard } from "@tcg/lorcana-types";

export const standOutEpic: ActionCard = {
  id: "Ca2",
  canonicalId: "ci_h90",
  reprints: ["set9-094"],
  cardType: "action",
  name: "Stand Out",
  i18n: {
    en: {
      name: "Stand Out",
      text: "Chosen character gets +3 {S} and gains Evasive until the start of your next turn.",
    },
    de: {
      name: "Stand Out",
      text: "Gib einem Charakter deiner Wahl bis zu Beginn deines nächsten Zuges +3 und Wendig.",
    },
    fr: {
      name: "Stand Out",
      text: "Choisissez un personnage qui gagne +3 et Insaisissable jusqu'au début de votre prochain tour.",
    },
    it: {
      name: "Stand Out",
      text: "(Un personaggio con costo 3 o superiore può per cantare questa canzone gratis.) Un personaggio a tua scelta riceve +3 e ottiene Sfuggente fino all'inizio del tuo prossimo turno. (Solo altri personaggi con Sfuggente possono sfidarlo.)",
    },
  },
  inkType: ["emerald"],
  franchise: "Goofy Movie",
  set: "009",
  cardNumber: 213,
  rarity: "common",
  specialRarity: "epic",
  cost: 3,
  inkable: true,
  externalIds: {
    lorcast: "crd_7b7cb2bd63084cf6942b7174b07be8c0",
    tcgPlayer: 647659,
  },
  text: "Chosen character gets +3 {S} and gains Evasive until the start of your next turn.",
  actionSubtype: "song",
  abilities: [
    {
      type: "action",
      effect: {
        type: "sequence",
        steps: [
          {
            type: "modify-stat",
            stat: "strength",
            modifier: 3,
            duration: "until-start-of-next-turn",
            target: {
              selector: "chosen",
              count: 1,
              owner: "any",
              zones: ["play"],
              cardTypes: ["character"],
            },
          },
          {
            type: "gain-keyword",
            keyword: "Evasive",
            duration: "until-start-of-next-turn",
            target: {
              ref: "previous-target",
            },
          },
        ],
      },
    },
  ],
};
