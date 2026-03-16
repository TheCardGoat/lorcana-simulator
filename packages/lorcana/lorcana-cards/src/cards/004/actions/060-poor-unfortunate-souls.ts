import type { ActionCard } from "@tcg/lorcana-types";

export const poorUnfortunateSouls: ActionCard = {
  id: "ysE",
  canonicalId: "ci_smr",
  reprints: ["set4-060", "set9-061"],
  cardType: "action",
  name: "Poor Unfortunate Souls",
  i18n: {
    en: {
      name: "Poor Unfortunate Souls",
      text: "Return chosen character, item, or location with cost 2 or less to their player's hand.",
    },
    de: {
      name: "Arme Seelen in Not",
      text: "Schicke einen Charakter, Gegenstand oder Ort deiner Wahl, der 2 oder weniger kostet, auf die zugehörige Hand zurück.",
    },
    fr: {
      name: "Pauvres âmes en perdition",
      text: "Choisissez un personnage, un objet ou un lieu coûtant 2 ou moins et renvoyez-le dans la main de son propriétaire.",
    },
    it: {
      name: "Mia Triste Anima Sola",
      text: "(Un personaggio con costo 2 o superiore può per cantare questa canzone gratis.) Fai riprendere in mano al suo giocatore un personaggio, un oggetto o un luogo a tua scelta con costo 2 o inferiore.",
    },
  },
  inkType: ["amethyst"],
  franchise: "Little Mermaid",
  set: "004",
  cardNumber: 60,
  rarity: "common",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_06c998317b6d45d0abc056cea429ad13",
    tcgPlayer: 650005,
  },
  text: "Return chosen character, item, or location with cost 2 or less to their player's hand.",
  actionSubtype: "song",
  abilities: [
    {
      type: "action",
      effect: {
        type: "return-to-hand",
        target: {
          selector: "chosen",
          count: 1,
          owner: "any",
          zones: ["play"],
          cardTypes: ["character", "item", "location"],
          filter: [
            {
              type: "cost-comparison",
              comparison: "less-or-equal",
              value: 2,
            },
          ],
        },
      },
    },
  ],
};
