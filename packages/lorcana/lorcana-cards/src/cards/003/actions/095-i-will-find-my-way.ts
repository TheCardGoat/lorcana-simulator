import type { ActionCard } from "@tcg/lorcana-types";

export const iWillFindMyWay: ActionCard = {
  id: "iQ6",
  canonicalId: "ci_iQ6",
  reprints: ["set3-095"],
  cardType: "action",
  name: "I Will Find My Way",
  i18n: {
    en: {
      name: "I Will Find My Way",
      text: "Chosen character of yours gets +2 {S} this turn. They may move to a location for free.",
    },
    de: {
      name: "Es wird einst gescheh’n",
      text: "Wähle einen deiner Charaktere und gib ihm in diesem Zug +2. Du darfst ihn kostenlos zu einem Ort bewegen.",
    },
    fr: {
      name: "Je prends le chemin",
      text: "Choisissez l'un de vos personnages, il gagne +2 pour le reste de ce tour. Puis vous pouvez le déplacer gratuitement sur un lieu.",
    },
    it: {
      name: "È Una Meta Che",
      text: "(Un personaggio con costo 1 o superiore può per giocare questa canzone gratis.) Un personaggio a tua scelta riceve +2 per questo turno. Può spostarsi in un luogo gratis.",
    },
  },
  inkType: ["emerald"],
  franchise: "Hercules",
  set: "003",
  cardNumber: 95,
  rarity: "common",
  cost: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_699c0e28637945e0a2ad8698e9695bb0",
    tcgPlayer: 538723,
  },
  text: "Chosen character of yours gets +2 {S} this turn. They may move to a location for free.",
  actionSubtype: "song",
  abilities: [
    {
      type: "action",
      effect: {
        type: "sequence",
        steps: [
          {
            type: "modify-stat",
            duration: "this-turn",
            stat: "strength",
            modifier: 2,
            target: {
              cardTypes: ["character"],
              count: 1,
              owner: "you",
              selector: "chosen",
              zones: ["play"],
            },
          },
          {
            type: "optional",
            effect: {
              type: "move-to-location",
              cost: "free",
              character: {
                ref: "previous-target",
              },
              location: {
                cardTypes: ["location"],
                count: 1,
                owner: "you",
                selector: "chosen",
                zones: ["play"],
              },
            },
          },
        ],
      },
    },
  ],
};
