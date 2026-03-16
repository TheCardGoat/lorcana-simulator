import type { ActionCard } from "@tcg/lorcana-types";

export const butImMuchFaster: ActionCard = {
  id: "BQt",
  canonicalId: "ci_BQt",
  reprints: ["set10-195"],
  cardType: "action",
  name: "But I'm Much Faster",
  i18n: {
    en: {
      name: "But I'm Much Faster",
      text: "Chosen character gains Alert and Challenger +2 this turn. (They can challenge as if they had Evasive. They get +2 {S} while challenging.)",
    },
    de: {
      name: "Doch ich bin schneller",
      text: "Ein Charakter deiner Wahl erhält in diesem Zug Alarmiert und Herausfordern +2. (Der Charakter kann herausfordern, als hätte er Wendig. Während er herausfordert, erhält er +2.)",
    },
    fr: {
      name: "Quelle poursuite infernale",
      text: "Choisissez un personnage qui gagne Agilité et Offensif +2 pour le reste de ce tour. (Il peut défier comme s'il avait Insaisissable. Lorsqu'il défie, ce personnage gagne +2.)",
    },
    it: {
      name: "Scappiamo da Qui",
      text: "(Un personaggio con costo 1 o superiore può per cantare questa canzone gratis.) Un personaggio a tua scelta ottiene Vigile e Sfidante +2 per questo turno. (Può sfidare come se avesse Sfuggente. Riceve +2 mentre sta sfidando.)",
    },
  },
  inkType: ["steel"],
  franchise: "Aladdin",
  set: "010",
  cardNumber: 195,
  rarity: "common",
  cost: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_194c57c22f0c46a5a7ec456ac28c7bfa",
    tcgPlayer: 658867,
  },
  text: "Chosen character gains Alert and Challenger +2 this turn. (They can challenge as if they had Evasive. They get +2 {S} while challenging.)",
  actionSubtype: "song",
  abilities: [
    {
      effect: {
        steps: [
          {
            duration: "this-turn",
            keyword: "Alert",
            target: {
              cardTypes: ["character"],
              count: 1,
              owner: "any",
              selector: "chosen",
              zones: ["play"],
            },
            type: "gain-keyword",
          },
          {
            duration: "this-turn",
            keyword: "Challenger",
            target: {
              cardTypes: ["character"],
              count: 1,
              owner: "any",
              selector: "chosen",
              zones: ["play"],
            },
            type: "gain-keyword",
            value: 2,
          },
        ],
        type: "sequence",
      },
      type: "action",
    },
  ],
};
