import type { ActionCard } from "@tcg/lorcana-types";

export const begone: ActionCard = {
  id: "zPN",
  canonicalId: "ci_zPN",
  reprints: ["set10-061"],
  cardType: "action",
  name: "Begone!",
  i18n: {
    en: {
      name: "Begone!",
      text: "Return chosen character, item, or location with cost 3 or less to their player's hand.",
    },
    de: {
      name: "Hinfort!",
      text: "Schicke einen gegnerischen Charakter, Gegenstand oder Ort deiner Wahl, der 3 oder weniger kostet, auf die zugehörige Hand zurück.",
    },
    fr: {
      name: "Ouste !",
      text: "Choisissez un objet, un lieu ou un personnage coûtant 3 ou moins et renvoyez-le dans la main de son propriétaire.",
    },
    it: {
      name: "Sparisci!",
      text: "Fai riprendere in mano al suo giocatore un personaggio, un oggetto o un luogo a tua scelta con costo 3 o inferiore.",
    },
  },
  inkType: ["amethyst"],
  franchise: "Sword in the Stone",
  set: "010",
  cardNumber: 61,
  rarity: "common",
  cost: 3,
  inkable: true,
  externalIds: {
    lorcast: "crd_34f44dc8dcef41ba9b4c4f23f9720ff6",
    tcgPlayer: 659420,
  },
  text: "Return chosen character, item, or location with cost 3 or less to their player's hand.",
  abilities: [
    {
      effect: {
        target: {
          cardTypes: ["character", "item", "location"],
          count: 1,
          filter: [
            {
              type: "cost-comparison",
              comparison: "less-or-equal",
              value: 3,
            },
          ],
          owner: "any",
          selector: "chosen",
          zones: ["play"],
        },
        type: "return-to-hand",
      },
      type: "action",
    },
  ],
};
