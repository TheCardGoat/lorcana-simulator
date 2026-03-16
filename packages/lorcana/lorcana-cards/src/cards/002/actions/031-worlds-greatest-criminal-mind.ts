import type { ActionCard } from "@tcg/lorcana-types";

export const worldsGreatestCriminalMind: ActionCard = {
  id: "KVh",
  canonicalId: "ci_NsP",
  reprints: ["set2-031", "set9-030"],
  cardType: "action",
  name: "World's Greatest Criminal Mind",
  i18n: {
    en: {
      name: "World's Greatest Criminal Mind",
      text: "Banish chosen character with 5 {S} or more.",
    },
    de: {
      name: "Oh, Rattenzahn!",
      text: "Verbanne einen Charakter deiner Wahl mit 5 oder mehr.",
    },
    fr: {
      name: "Le Grand Génie du Mal",
      text: "Choisissez un personnage ayant au moins 5 et bannissez-le.",
    },
    it: {
      name: "Oh, Rattigan!",
      text: "(Un personaggio con costo 3 o superiore può per cantare questa canzone gratis.) Esilia un personaggio a tua scelta con 5 o superiore.",
    },
  },
  inkType: ["amber"],
  franchise: "Great Mouse Detective",
  set: "002",
  cardNumber: 31,
  rarity: "rare",
  cost: 3,
  inkable: true,
  externalIds: {
    lorcast: "crd_772b7e1de7024e47bdbe47e672f35d2f",
    tcgPlayer: 649977,
  },
  text: "Banish chosen character with 5 {S} or more.",
  actionSubtype: "song",
  abilities: [
    {
      type: "action",
      effect: {
        type: "banish",
        target: {
          selector: "chosen",
          count: 1,
          owner: "any",
          zones: ["play"],
          cardTypes: ["character"],
          filter: [
            {
              type: "strength-comparison",
              comparison: "greater-or-equal",
              value: 5,
            },
          ],
        },
      },
    },
  ],
};
