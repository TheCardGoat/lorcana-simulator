import type { ActionCard } from "@tcg/lorcana-types";

export const grabYourBow: ActionCard = {
  id: "EtL",
  canonicalId: "ci_EtL",
  reprints: ["set11-131"],
  cardType: "action",
  name: "Grab Your Bow",
  i18n: {
    en: {
      name: "Grab Your Bow",
      text: "Banish up to 2 chosen characters with 2 {S} or less.",
    },
    de: {
      name: "Nehmt den Pfeil",
      text: "Verbanne bis zu 2 Charaktere deiner Wahl mit 2 oder weniger.",
    },
    fr: {
      name: "À vos flèches",
      text: "Choisissez jusqu'à 2 personnages ayant 2 ou moins et bannissez-les.",
    },
    it: {
      name: "Siamo Eroi",
      text: "(Un personaggio con costo 5 o superiore può per cantare questa canzone gratis.) Esilia fino a 2 personaggi a tua scelta con 2 o inferiore.",
    },
  },
  inkType: ["ruby"],
  franchise: "Beauty and the Beast",
  set: "011",
  cardNumber: 131,
  rarity: "uncommon",
  cost: 5,
  inkable: false,
  externalIds: {
    lorcast: "crd_4bf208bd16b043ac8eb27209b522c3c6",
    tcgPlayer: 675343,
  },
  text: "Banish up to 2 chosen characters with 2 {S} or less.",
  actionSubtype: "song",
  abilities: [
    {
      type: "action",
      text: "Banish up to 2 chosen characters with 2 {S} or less.",
      effect: {
        type: "banish",
        target: {
          selector: "chosen",
          count: {
            upTo: 2,
          },
          owner: "any",
          zones: ["play"],
          cardTypes: ["character"],
          filter: [
            {
              type: "strength-comparison",
              comparison: "less-or-equal",
              value: 2,
            },
          ],
        },
      },
    },
  ],
};
